import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // updated when domain attaches
  site: 'https://omeryasironal.com',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    routing: { prefixDefaultLocale: false },
  },

  vite: { plugins: [tailwindcss()] },
  integrations: [
    react(),
    sitemap({
      // Emit <xhtml:link rel="alternate" hreflang> pairs for the EN/TR mirror.
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', tr: 'tr' },
      },
    }),
  ],
});