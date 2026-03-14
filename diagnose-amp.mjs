import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';

const DEFAULT_SITE = 'https://bitcoinforwifi.com';

function fetchUrl(url, { maxRedirects = 10, timeoutMs = 10000 } = {}) {
  return new Promise((resolve, reject) => {
    const visited = [];

    const requestOnce = (currentUrl, redirectsLeft) => {
      visited.push(currentUrl);
      const u = new URL(currentUrl);
      const client = u.protocol === 'https:' ? https : http;

      const req = client.request(
        {
          protocol: u.protocol,
          hostname: u.hostname,
          port: u.port || (u.protocol === 'https:' ? 443 : 80),
          path: u.pathname + u.search,
          method: 'GET',
          headers: {
            'User-Agent': 'bitcoinforwifi-amp-diagnose/1.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
        },
        (res) => {
          const status = res.statusCode || 0;
          const location = res.headers.location;

          if (status >= 300 && status < 400 && location && redirectsLeft > 0) {
            const next = new URL(location, currentUrl).href;
            res.resume();
            return requestOnce(next, redirectsLeft - 1);
          }

          let data = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            resolve({
              url: currentUrl,
              finalUrl: currentUrl,
              status,
              headers: res.headers,
              body: data,
              chain: visited.slice(),
            });
          });
        }
      );

      req.on('error', reject);
      req.setTimeout(timeoutMs, () => {
        req.destroy(new Error(`Timeout after ${timeoutMs}ms`));
      });
      req.end();
    };

    requestOnce(url, maxRedirects);
  });
}

function extractAmphtmlHref(html) {
  const m = html.match(/<link[^>]+rel=["']amphtml["'][^>]*>/i);
  if (!m) return null;
  const tag = m[0];
  const href = tag.match(/href=["']([^"']+)["']/i);
  return href ? href[1] : null;
}

function extractCanonicalHref(html) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  if (!m) return null;
  const tag = m[0];
  const href = tag.match(/href=["']([^"']+)["']/i);
  return href ? href[1] : null;
}

function isBasicAmpHtml(html) {
  const hasHtmlAmp = /<html[^>]*(\samp\b|\s⚡\b)[^>]*>/i.test(html);
  const hasAmpRuntime = /https:\/\/cdn\.ampproject\.org\/v0\.js/i.test(html);
  const hasBoilerplate = /<style\s+amp-boilerplate/i.test(html);
  return hasHtmlAmp && hasAmpRuntime && hasBoilerplate;
}

function pickSampleUrlsFromSitemap(xml, limit = 30) {
  const locs = [];
  const re = /<loc>([^<]+)<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) && locs.length < limit) {
    locs.push(m[1].trim());
  }
  return locs;
}

function toAmpFromCanonical(u) {
  const url = new URL(u);
  const p = url.pathname.replace(/\/$/, '');
  if (p === '') url.pathname = '/amp';
  else if (p === '/blog') url.pathname = '/blog/amp';
  else if (p.startsWith('/blog/')) url.pathname = `${p}/amp`;
  else url.pathname = `${p}/amp`;
  url.search = '';
  return url.href;
}

async function checkCanonical(url) {
  const res = await fetchUrl(url);
  const ampHrefRaw = extractAmphtmlHref(res.body);
  const canonicalHref = extractCanonicalHref(res.body);

  const ampHref = ampHrefRaw ? new URL(ampHrefRaw, res.finalUrl).href : null;

  const okAmpLink = Boolean(ampHref);

  return {
    canonicalUrl: url,
    status: res.status,
    chain: res.chain,
    canonicalTag: canonicalHref,
    amphtml: ampHref,
    okAmpLink,
  };
}

async function checkAmp(ampUrl, expectedCanonical) {
  const res = await fetchUrl(ampUrl);
  const canonicalHrefRaw = extractCanonicalHref(res.body);
  const canonicalHref = canonicalHrefRaw ? new URL(canonicalHrefRaw, res.finalUrl).href : null;

  const okAmp = res.status === 200 && isBasicAmpHtml(res.body);
  const okCanonical = expectedCanonical ? canonicalHref === expectedCanonical : Boolean(canonicalHref);

  return {
    ampUrl,
    status: res.status,
    chain: res.chain,
    canonical: canonicalHref,
    okAmp,
    okCanonical,
  };
}

async function checkAmpQueryRedirect(canonicalUrl) {
  const u = new URL(canonicalUrl);
  u.search = 'amp';
  const res = await fetchUrl(u.href);
  const expectedAmp = toAmpFromCanonical(canonicalUrl);
  const final = res.chain[res.chain.length - 1];

  // Two acceptable behaviors:
  // 1) Redirect: ?amp -> /.../amp
  // 2) Rewrite: ?amp serves AMP HTML directly (status 200) while keeping the URL
  const isRewriteServingAmp = res.status === 200 && isBasicAmpHtml(res.body);
  const isRedirectToAmp = final === expectedAmp;
  const ok = isRewriteServingAmp || isRedirectToAmp;

  return {
    queryUrl: u.href,
    chain: res.chain,
    final,
    expected: expectedAmp,
    ok,
  };
}

async function main() {
  const site = process.argv[2] || DEFAULT_SITE;
  const sitemapUrl = new URL('/sitemap.xml', site).href;

  console.log(`# AMP Diagnose`);
  console.log(`site: ${site}`);
  console.log(`sitemap: ${sitemapUrl}`);

  const sitemap = await fetchUrl(sitemapUrl);
  if (sitemap.status !== 200) {
    console.log(`FAIL sitemap status=${sitemap.status}`);
    process.exitCode = 2;
    return;
  }

  const urls = pickSampleUrlsFromSitemap(sitemap.body, 25);
  if (urls.length === 0) {
    console.log('FAIL sitemap has no <loc>');
    process.exitCode = 2;
    return;
  }

  console.log(`\nFound ${urls.length} sample URLs from sitemap`);

  let failures = 0;

  for (const u of urls) {
    const canon = await checkCanonical(u);

    if (canon.status !== 200) {
      failures++;
      console.log(`\nFAIL canonical ${u} status=${canon.status}`);
      console.log(` chain:`);
      canon.chain.forEach((c) => console.log(`  - ${c}`));
      continue;
    }

    const expectedAmp = toAmpFromCanonical(u);
    const ampUrl = canon.amphtml || expectedAmp;

    const amp = await checkAmp(ampUrl, u);
    const q = await checkAmpQueryRedirect(u);

    const ok = canon.okAmpLink && amp.okAmp && amp.okCanonical && q.ok;

    if (!ok) failures++;

    console.log(`\n${ok ? 'OK' : 'FAIL'} ${u}`);
    console.log(` amphtml: ${canon.amphtml || '(missing)'} (expected ${expectedAmp})`);
    console.log(` amp status=${amp.status} okAmp=${amp.okAmp} canonicalOnAmp=${amp.canonical} okCanonical=${amp.okCanonical}`);
    console.log(` ?amp final=${q.final} expected=${q.expected} ok=${q.ok}`);

    if (!canon.okAmpLink) {
      console.log(`  - missing <link rel=amphtml> on canonical`);
    }
    if (!amp.okAmp) {
      console.log(`  - AMP URL is not basic-valid AMP HTML (missing html amp/runtime/boilerplate)`);
    }
    if (!amp.okCanonical) {
      console.log(`  - AMP canonical mismatch`);
    }
    if (!q.ok) {
      console.log(`  - ?amp redirect mismatch`);
      console.log(`    chain:`);
      q.chain.forEach((c) => console.log(`     - ${c}`));
    }
  }

  console.log(`\nDone. failures=${failures}`);
  process.exitCode = failures ? 1 : 0;
}

main().catch((err) => {
  console.error('FATAL', err);
  process.exitCode = 2;
});
