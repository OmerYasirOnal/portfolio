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

  vite: { plugins: [tailwindcss()] },
  integrations: [
    sitemap({
      // The /cv-print/* pages are noindex PDF render sources, not public pages.
      filter: (page) => !page.includes('/cv-print/'),
      // Emit <xhtml:link rel="alternate" hreflang> pairs for the TR/EN mirror.
      i18n: {
        defaultLocale: 'tr',
        locales: { tr: 'tr', en: 'en' },
      },
    }),
  ],
});