import type { APIRoute } from 'astro';
import { blogPosts } from '../data/blog-posts';

const SITE = 'https://www.bitcoinforwifi.com';

// Generar lista de páginas estáticas
const staticPages = [
  { slug: '', priority: '1.0' },           // Home
  { slug: 'blog', priority: '0.9' },       // Blog
  { slug: 'about', priority: '0.4' },       // About
  { slug: 'contact', priority: '0.4' },     // Contact
  { slug: 'privacy', priority: '0.3' },     // Privacy
  { slug: 'terms', priority: '0.3' },       // Terms
  { slug: 'cookies', priority: '0.3' },     // Cookies
  { slug: 'disclaimer', priority: '0.3' }   // Disclaimer
];

// Generar URLs de posts del blog
const blogPages = blogPosts
  .filter(post => post.published)
  .map(post => ({
    slug: `blog/${post.slug}`,
    priority: '0.8'  // Todos los posts tienen priority 0.8
  }));

// Combinar todas las páginas
const allPages = [...staticPages, ...blogPages];

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => {
  const url = page.slug === '' ? SITE : `${SITE}/${page.slug}`;
  const changefreq = page.slug === 'blog' ? 'daily' : 'weekly';
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
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
