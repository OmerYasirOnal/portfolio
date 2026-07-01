/**
 * Structured-data (JSON-LD) helpers.
 *
 * Everything here is derived from `profile.ts` — the single source of truth —
 * so the schema.org markup can never drift from the visible content. The output
 * is injected once, on the home page, inside a `<script type="application/ld+json">`.
 */
import { profile } from '../data/profile';
import { altLocalePath, type Locale } from '../data/i18n';

/** Normalize a path to a trailing slash (root stays "/"). Matches sitemap loc. */
export function withTrailingSlash(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (p === '/') return '/';
  return p.endsWith('/') ? p : `${p}/`;
}

/** Absolute self-canonical URL, trailing-slashed to match the sitemap. */
export function canonicalHref(path: string, site: URL | string): string {
  return new URL(withTrailingSlash(path), site).toString();
}

/** en / tr / x-default alternate links for the current page's mirror pair. */
export function hreflangLinks(
  lang: Locale,
  path: string,
  site: URL | string,
): { hreflang: string; href: string }[] {
  const enPath = lang === 'en' ? path : altLocalePath(lang, path);
  const trPath = lang === 'tr' ? path : altLocalePath(lang, path);
  const enUrl = canonicalHref(enPath, site);
  const trUrl = canonicalHref(trPath, site);
  return [
    { hreflang: 'en', href: enUrl },
    { hreflang: 'tr', href: trUrl },
    { hreflang: 'x-default', href: enUrl },
  ];
}

/** Minimal shape of the schema.org Person object we emit. */
export interface PersonJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  jobTitle: string;
  url: string;
  email: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressCountry: string;
  };
  sameAs: string[];
  alumniOf: {
    '@type': 'CollegeOrUniversity';
    name: string;
  };
}

/**
 * Build the schema.org `Person` node for Ömer Yasir Önal.
 *
 * @param site - The absolute site origin (`Astro.site`). When omitted, `url`
 *   falls back to the canonical production domain so the function stays pure and
 *   testable outside an Astro render context.
 */
export function personJsonLd(site?: URL | string, locale: Locale = 'en'): PersonJsonLd {
  const origin = site ? new URL(site).origin : 'https://omeryasironal.com';

  // Every public profile/social link from the single source of truth.
  const sameAs = Object.values(profile.links).map((link) => link.url);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role[locale],
    url: origin,
    email: `mailto:${profile.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Istanbul',
      addressCountry: 'TR',
    },
    sameAs,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: profile.education.school_en,
    },
  };
}

const origin = (site?: URL | string) =>
  site ? new URL(site).origin : 'https://omeryasironal.com';

const authorNode = (site?: URL | string) => ({
  '@type': 'Person' as const,
  name: profile.name,
  url: origin(site),
});

/** schema.org WebSite node for the site root. */
export function webSiteJsonLd(site?: URL | string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: profile.name,
    url: origin(site),
    inLanguage: ['en', 'tr'],
    author: authorNode(site),
  };
}

/** schema.org BreadcrumbList from an ordered list of {name, url}. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** A single project as an author-bound CreativeWork. */
export function creativeWorkJsonLd(
  input: { title: string; description: string; category: string; url: string; stack: string[] },
  site?: URL | string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.title,
    description: input.description,
    genre: input.category,
    url: input.url,
    keywords: input.stack.join(', '),
    author: authorNode(site),
  };
}

/** The writing collection as an ItemList of author-bound BlogPostings. */
export function writingItemListJsonLd(
  items: { title: string; url: string; date: string }[],
  site?: URL | string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'BlogPosting',
        headline: it.title,
        url: it.url,
        datePublished: it.date,
        author: authorNode(site),
      },
    })),
  };
}

/** A peer-reviewed publication as a ScholarlyArticle. */
export function scholarlyArticleJsonLd(
  input: { title: string; venue: string; year: number; url?: string },
  site?: URL | string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: input.title,
    ...(input.url ? { url: input.url } : {}),
    datePublished: String(input.year),
    publication: { '@type': 'PublicationEvent', name: input.venue },
    author: authorNode(site),
  };
}
