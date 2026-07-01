import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // updated when domain attaches
  site: 'https://portfolio-one-black-59.vercel.app', // TODO: switch to https://omeryasironal.com when the custom domain is attached

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    routing: { prefixDefaultLocale: false },
  },

  vite: { plugins: [tailwindcss()] },
  integrations: [
    sitemap({
      // Emit <xhtml:link rel="alternate" hreflang> pairs for the EN/TR mirror.
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', tr: 'tr' },
      },
    }),
  ],
});