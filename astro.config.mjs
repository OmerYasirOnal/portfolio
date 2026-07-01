import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

export default defineConfig({
  // updated when domain attaches
  site: 'https://omeryasironal.com',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    routing: { prefixDefaultLocale: false },
  },

  vite: { plugins: [tailwindcss()] },
  integrations: [react()],
});