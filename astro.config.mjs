import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // updated when domain attaches
  site: 'https://omeryasironal.com',

  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  // One cached stylesheet shared by every page (inlining it cost ~80 KB per page).
  build: { inlineStylesheets: 'auto' },

  vite: { plugins: [tailwindcss()] },
  integrations: [
    sitemap({
      // The /cv-print/* pages are noindex PDF render sources, not public pages.
      filter: (page) => !page.includes('/cv-print/'),
      // Build date as lastmod so crawlers re-check pages after each deploy.
      lastmod: new Date(),
      // Emit <xhtml:link rel="alternate" hreflang> pairs for the TR/EN mirror.
      i18n: {
        defaultLocale: 'tr',
        locales: { tr: 'tr', en: 'en' },
      },
    }),
  ],
});