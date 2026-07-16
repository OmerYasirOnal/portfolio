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
 *  - `photo` — headshot to render in the header band: a filename under
 *    `src/assets/`, or `null` for no photo. The TR résumé keeps the site's
 *    About portrait; the EN one carries its own CV-only headshot.
 *  - `ascii` — ASCII-fold every rendered string (`Türkiye` → `Turkiye`, smart
 *    punctuation → plain; the NAME is exempt and keeps its diacritics) so
 *    Workday/Greenhouse parsers survive it. The international / remote variant.
 *  - `gdpr` — append the GDPR recruitment-consent footer (may run to 2 pages).
 */
import type { Locale } from './i18n';

export interface CvVariant {
  lang: Locale;
  photo: string | null;
  ascii: boolean;
  gdpr: boolean;
}

export const cvVariants = {
  tr: { lang: 'tr', photo: 'omer-yasir-onal.jpg', ascii: false, gdpr: false },
  en: { lang: 'en', photo: 'cv-headshot.jpg', ascii: true, gdpr: false },
  eu: { lang: 'en', photo: null, ascii: true, gdpr: true },
} as const satisfies Record<string, CvVariant>;

export type VariantId = keyof typeof cvVariants;
