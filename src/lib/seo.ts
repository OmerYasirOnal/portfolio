/**
 * Structured-data (JSON-LD) helpers.
 *
 * Everything here is derived from `profile.ts` - the single source of truth - * so the schema.org markup can never drift from the visible content. The output
 * is injected once, on the home page, inside a `<script type="application/ld+json">`.
 */
import { profile } from '../data/profile';
import { altLocalePath, type Locale } from '../data/i18n';

/**
 * Serialize a JSON-LD node for inline <script> injection. JSON.stringify
 * leaves `<` untouched, so a string like "</script>" would terminate the
 * script element; escaping to < keeps the payload inert and still
 * parses back to the same JSON.
 */
export function jsonLdScript(node: unknown): string {
  return JSON.stringify(node).replace(/</g, '\\u003c');
}

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
  const trPath = lang === 'tr' ? path : altLocalePath(lang, path);
  const enPath = lang === 'en' ? path : altLocalePath(lang, path);
  const trUrl = canonicalHref(trPath, site);
  const enUrl = canonicalHref(enPath, site);
  return [
    { hreflang: 'tr', href: trUrl },
    { hreflang: 'en', href: enUrl },
    { hreflang: 'x-default', href: trUrl },
  ];
}

/** Minimal shape of the schema.org Person object we emit. */
export interface PersonJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Person';
  '@id': string;
  image: string;
  description: string;
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
  knowsAbout: string[];
  alumniOf: {
    '@type': 'CollegeOrUniversity';
    name: string;
  };
}

/**
 * Build the schema.org `Person` node for Ömer Yasir Önal.
 */
export function personJsonLd(site?: URL | string, locale: Locale = 'tr'): PersonJsonLd {
  const origin = site ? new URL(site).origin : 'https://omeryasironal.com';

  // Every public profile/social link from the single source of truth.
  const sameAs = [
    ...Object.values(profile.links).map((link) => link.url),
    ...(profile.instagram.url ? [profile.instagram.url] : []),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${origin}/#person`,
    name: profile.name,
    jobTitle: locale === 'tr' ? 'Bilgisayar Mühendisi' : 'Computer Engineer',
    description: profile.role[locale],
    image: `${origin}/og/home${locale === 'tr' ? '-tr' : ''}.png`,
    url: origin,
    email: `mailto:${profile.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Istanbul',
      addressCountry: 'TR',
    },
    sameAs,
    knowsAbout:
      locale === 'tr'
        ? ['Yazılım geliştirme', 'Web geliştirme', 'Mobil uygulama geliştirme', 'Yapay zekâ', 'Google Ads', 'Meta reklamları', 'SEO', 'Yapay zekâ destekli içerik üretimi']
        : ['Software development', 'Web development', 'Mobile app development', 'Artificial intelligence', 'Google Ads', 'Meta ads', 'SEO', 'AI-assisted content production'],
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
  '@id': `${origin(site)}/#person`,
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
    inLanguage: ['tr', 'en'],
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

/**
 * A list of Service nodes provided by the Person. No prices (every job is
 * quoted) and no business address: the provider is an individual, so only
 * areaServed is stated.
 */
export function serviceListJsonLd(
  services: { name: string; description: string; url: string; category: string }[],
  site?: URL | string,
) {
  return {
    '@context': 'https://schema.org',
    '@graph': services.map((s) => ({
      '@type': 'Service',
      name: s.name,
      description: s.description,
      url: s.url,
      category: s.category,
      serviceType: s.name,
      provider: authorNode(site),
      areaServed: { '@type': 'Country', name: 'Türkiye' },
    })),
  };
}

/** A FAQPage node from question/answer pairs (must mirror visible on-page copy). */
export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}

/** A native article as a schema.org BlogPosting (post detail pages). */
export function blogPostingJsonLd(
  input: {
    title: string;
    description: string;
    url: string;
    date: string;
    updated?: string;
    lang: string;
    tags: string[];
  },
  site?: URL | string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    url: input.url,
    mainEntityOfPage: input.url,
    datePublished: input.date,
    dateModified: input.updated ?? input.date,
    inLanguage: input.lang,
    ...(input.tags.length ? { keywords: input.tags.join(', ') } : {}),
    author: authorNode(site),
  };
}

/** A course as schema.org Course + CourseInstance, lessons as hasPart. */
export function courseJsonLd(
  input: {
    title: string;
    description: string;
    url: string;
    lang: string;
    level: string;
    tags: string[];
    lessons: { title: string; url: string }[];
  },
  site?: URL | string,
) {
  const author = authorNode(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: input.title,
    description: input.description,
    url: input.url,
    inLanguage: input.lang,
    educationalLevel: input.level,
    ...(input.tags.length ? { keywords: input.tags.join(', ') } : {}),
    isAccessibleForFree: true,
    provider: author,
    author,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
    },
    hasPart: input.lessons.map((l) => ({
      '@type': 'CreativeWork',
      name: l.title,
      url: l.url,
    })),
  };
}
