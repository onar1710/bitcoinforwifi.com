import type { APIRoute } from 'astro';
import { blogPosts } from '../data/blog-posts';
import { getPostUrl } from '../utils/editorialRouting';

import { SITE as SITE_CONFIG } from '../config.js';

const SITE = SITE_CONFIG.url;

type SitemapEntry = {
	slug: string;
	priority: string;
	changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	lastmod?: string;
};

const normalizeIsoDate = (dateString?: string) => {
	if (!dateString) return undefined;
	const d = new Date(dateString);
	return Number.isNaN(d.getTime()) ? undefined : d.toISOString().split('T')[0];
};

const toPriorityNumber = (p: string) => {
	const n = Number.parseFloat(p);
	return Number.isFinite(n) ? n : 0;
};

const buildDate = normalizeIsoDate(new Date().toISOString());

// Only include Home + Articles
const staticPages: SitemapEntry[] = [{ slug: '', priority: '1.0', changefreq: 'weekly', lastmod: buildDate }];

// Generate URLs for blog posts
const blogPages: SitemapEntry[] = blogPosts
	.filter((post) => post.published)
	.map((post) => ({
		// Strip leading slash so it joins correctly with SITE below.
		slug: getPostUrl(post).replace(/^\//, ''),
		priority: '0.9',
		changefreq: 'monthly',
		lastmod: normalizeIsoDate(post.modifiedTime || post.date)
	}));

// Combine all pages
const allPages = (() => {
	const combined = [...staticPages, ...blogPages];
	const bySlug = new Map<string, SitemapEntry>();

	for (const page of combined) {
		const existing = bySlug.get(page.slug);
		if (!existing) {
			bySlug.set(page.slug, page);
			continue;
		}
		// Keep the highest priority when duplicates exist.
		if (toPriorityNumber(page.priority) > toPriorityNumber(existing.priority)) {
			bySlug.set(page.slug, page);
			continue;
		}

		// If priority is the same, keep the newest lastmod.
		const existingLastmod = existing.lastmod ? new Date(existing.lastmod).getTime() : 0;
		const pageLastmod = page.lastmod ? new Date(page.lastmod).getTime() : 0;
		if (pageLastmod > existingLastmod) {
			bySlug.set(page.slug, { ...existing, ...page });
		}
	}

	return Array.from(bySlug.values());
})();

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => {
  const base = SITE.replace(/\/$/, '');
  const url = page.slug === '' ? base : `${base}/${page.slug}`;

  if (!url.startsWith('http')) {
	throw new Error(`Invalid URL: ${url}`);
  }

  const lastmod = page.lastmod;
  
  return `  <url>
    <loc>${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
