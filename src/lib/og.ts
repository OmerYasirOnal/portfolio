/**
 * OpenGraph image route helpers — the single source of truth for the mapping
 * between a page and its generated OG PNG. Both the generator endpoint
 * (`src/pages/og/[...route].ts`) and the pages that reference `og:image` import
 * from here, so the produced files and the `<meta>` URLs can never drift.
 *
 * astro-og-canvas strips the last dotted segment of a key as a file extension,
 * so the locale marker is a `-tr` suffix (never `.tr`) to keep EN/TR distinct.
 */
import type { Locale } from '../data/i18n';

/** Locale suffix used in both the route key and the public path. */
function suffix(locale: Locale): string {
  return locale === 'en' ? '' : '-tr';
}

/** Route key (no extension) consumed by `OGImageRoute`'s `pages` map. */
export function ogHomeKey(locale: Locale): string {
  return `home${suffix(locale)}`;
}

export function ogProjectKey(locale: Locale, id: string): string {
  return `projects/${id}${suffix(locale)}`;
}

/** Route key for the /projects listing page. */
export function ogProjectsKey(locale: Locale): string {
  return `projects-index${suffix(locale)}`;
}

/** Route key for the /writing listing page. */
export function ogWritingKey(locale: Locale): string {
  return `writing${suffix(locale)}`;
}

/** Public, root-relative path to the emitted PNG (what goes in `og:image`). */
export function ogHomePath(locale: Locale): string {
  return `/og/${ogHomeKey(locale)}.png`;
}

export function ogProjectPath(locale: Locale, id: string): string {
  return `/og/${ogProjectKey(locale, id)}.png`;
}

export function ogProjectsPath(locale: Locale): string {
  return `/og/${ogProjectsKey(locale)}.png`;
}

export function ogWritingPath(locale: Locale): string {
  return `/og/${ogWritingKey(locale)}.png`;
}
