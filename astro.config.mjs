import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
// import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import { SITE } from './src/config.js';

export default defineConfig({
  site: SITE.url,
  outDir: './dist',
  integrations: [
    tailwind(), 
    mdx(), 
    // sitemap(),  // Comentado temporalmente por bug en Windows
    robotsTxt({
      policy: [
        {
          userAgent: '*',  // Aplica a todos los bots
          allow: '/',      // Permite crawlear todo
        }
      ],
      sitemap: true,  // Agrega automáticamente la referencia al sitemap
    })
  ],
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  }
});
