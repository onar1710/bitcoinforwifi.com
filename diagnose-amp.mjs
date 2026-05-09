import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';

const DEFAULT_SITE = 'https://bitcoinforwifi.com';

const DEFAULT_SITEMAP_PATHS = [
  '/sitemap.xml',
  '/sitemap-0.xml',
  '/sitemap_index.xml',
  '/sitemap-index.xml',
];

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

function looksLikeSitemapIndex(xml) {
  return /<sitemapindex[\s>]/i.test(xml);
}

async function fetchFirstWorkingSitemap(site) {
  for (const p of DEFAULT_SITEMAP_PATHS) {
    const url = new URL(p, site).href;
    const res = await fetchUrl(url);
    if (res.status === 200 && /<urlset[\s>]|<sitemapindex[\s>]/i.test(res.body)) {
      return { url, res };
    }
  }
  return null;
}

async function fetchFromSitemapIndex(indexXml, baseUrl) {
  const sitemapUrls = pickSampleUrlsFromSitemap(indexXml, 50);
  for (const smUrl of sitemapUrls) {
    const abs = new URL(smUrl, baseUrl).href;
    const res = await fetchUrl(abs);
    if (res.status === 200 && /<urlset[\s>]/i.test(res.body)) {
      return { url: abs, res };
    }
  }
  return null;
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

function stripAmpQuery(u) {
  const url = new URL(u);
  if (url.search === '?amp' || url.searchParams.has('amp')) url.search = '';
  return url.href;
}

function isAmpQueryUrl(u) {
  try {
    const url = new URL(u);
    return url.search === '?amp' || url.searchParams.has('amp');
  } catch {
    return false;
  }
}

async function checkAmp(ampUrl, expectedCanonical) {
  const res = await fetchUrl(ampUrl);
  const canonicalHrefRaw = extractCanonicalHref(res.body);
  const canonicalHref = canonicalHrefRaw ? new URL(canonicalHrefRaw, res.finalUrl).href : null;

  const okAmp = res.status === 200 && isBasicAmpHtml(res.body);
  const okCanonical = expectedCanonical ? canonicalHref === expectedCanonical : Boolean(canonicalHref);

  const ampSignals = {
    hasHtmlAmp: /<html[^>]*(\samp\b|\s⚡\b)[^>]*>/i.test(res.body),
    hasAmpRuntime: /https:\/\/cdn\.ampproject\.org\/v0\.js/i.test(res.body),
    hasBoilerplate: /<style\s+amp-boilerplate/i.test(res.body),
  };

  return {
    ampUrl,
    status: res.status,
    chain: res.chain,
    canonical: canonicalHref,
    okAmp,
    okCanonical,
    ampSignals,
    contentType: String(res.headers['content-type'] || ''),
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
  const argv = process.argv.slice(2);
  const site = argv[0] || DEFAULT_SITE;
  const urlArgs = argv.slice(1).filter((x) => /^https?:\/\//i.test(x));

  console.log(`# AMP Diagnose`);
  console.log(`site: ${site}`);

  let urls = urlArgs;
  let sitemapInfo = null;

  if (urls.length === 0) {
    sitemapInfo = await fetchFirstWorkingSitemap(site);
    if (!sitemapInfo) {
      console.log(`FAIL could not find sitemap at: ${DEFAULT_SITEMAP_PATHS.join(', ')}`);
      console.log(`Tip: run: node diagnose-amp.mjs ${site} https://bitcoinforwifi.com/ https://bitcoinforwifi.com/blog`);
      process.exitCode = 2;
      return;
    }

    let { url: sitemapUrl, res: sitemap } = sitemapInfo;

    if (looksLikeSitemapIndex(sitemap.body)) {
      const sub = await fetchFromSitemapIndex(sitemap.body, sitemapUrl);
      if (sub) {
        sitemapUrl = sub.url;
        sitemap = sub.res;
        sitemapInfo = sub;
      }
    }

    console.log(`sitemap: ${sitemapUrl}`);
    urls = pickSampleUrlsFromSitemap(sitemap.body, 25);
  } else {
    console.log(`sitemap: (skipped, using CLI URLs)`);
  }

  if (urls.length === 0) {
    console.log('FAIL sitemap has no <loc>');
    process.exitCode = 2;
    return;
  }

  console.log(`\nFound ${urls.length} sample URLs from sitemap`);

  let failures = 0;

  for (const u of urls) {
    const isQueryAmp = isAmpQueryUrl(u);
    const canonicalExpectedForAmp = isQueryAmp ? stripAmpQuery(u) : u;

    const canon = await checkCanonical(u);

    if (canon.status !== 200) {
      failures++;
      console.log(`\nFAIL canonical ${u} status=${canon.status}`);
      console.log(` chain:`);
      canon.chain.forEach((c) => console.log(`  - ${c}`));
      continue;
    }

    const expectedAmp = toAmpFromCanonical(canonicalExpectedForAmp);
    const ampUrl = isQueryAmp ? u : (canon.amphtml || expectedAmp);

    const amp = await checkAmp(ampUrl, canonicalExpectedForAmp);
    const q = await checkAmpQueryRedirect(u);

    const okAmpLinkRequirement = isQueryAmp ? true : canon.okAmpLink;
    const ok = okAmpLinkRequirement && amp.okAmp && amp.okCanonical && q.ok;

    if (!ok) failures++;

    console.log(`\n${ok ? 'OK' : 'FAIL'} ${u}`);
    console.log(` amphtml: ${canon.amphtml || '(missing)'} (expected ${expectedAmp})`);
    console.log(` amp status=${amp.status} content-type=${amp.contentType || '(none)'} okAmp=${amp.okAmp} canonicalOnAmp=${amp.canonical} okCanonical=${amp.okCanonical}`);
    console.log(` ?amp final=${q.final} expected=${q.expected} ok=${q.ok}`);

    if (!isQueryAmp && !canon.okAmpLink) {
      console.log(`  - missing <link rel=amphtml> on canonical`);
    }
    if (!amp.okAmp) {
      console.log(`  - AMP URL is not basic-valid AMP HTML (missing html amp/runtime/boilerplate)`);
      console.log(`    signals: htmlAmp=${amp.ampSignals.hasHtmlAmp} runtime=${amp.ampSignals.hasAmpRuntime} boilerplate=${amp.ampSignals.hasBoilerplate}`);
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
