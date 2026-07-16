/**
 * Print-résumé OUTPUT variants and their render recipe.
 *
 * Lives in its own module (not inline in `cv-print/[variant].astro`) because
 * Astro hoists `getStaticPaths` above the component frontmatter, so the paths it
 * returns must come from an *imported* binding — a frontmatter `const` isn't yet
 * initialized when `getStaticPaths` runs.
 *
 * Recipe flags:
 *  - `lang` — which locale's copy to render (`eu` reuses the English copy).
 *  - `photo` — render the headshot in the header band.
 *  - `ascii` — ASCII-fold every rendered string (name → `Omer Yasir Onal`,
 *    `Türkiye` → `Turkiye`, smart punctuation → plain) so Workday/Greenhouse
 *    parsers survive it. The international / remote variant.
 *  - `gdpr` — append the GDPR recruitment-consent footer (may run to 2 pages).
 */
import type { Locale } from './i18n';

export interface CvVariant {
  lang: Locale;
  photo: boolean;
  ascii: boolean;
  gdpr: boolean;
}

export const cvVariants = {
  tr: { lang: 'tr', photo: true, ascii: false, gdpr: false },
  en: { lang: 'en', photo: false, ascii: true, gdpr: false },
  eu: { lang: 'en', photo: false, ascii: true, gdpr: true },
} as const satisfies Record<string, CvVariant>;

export type VariantId = keyof typeof cvVariants;
