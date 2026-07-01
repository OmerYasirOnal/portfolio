/**
 * Structured-data (JSON-LD) helpers.
 *
 * Everything here is derived from `profile.ts` — the single source of truth —
 * so the schema.org markup can never drift from the visible content. The output
 * is injected once, on the home page, inside a `<script type="application/ld+json">`.
 */
import { profile } from '../data/profile';

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
export function personJsonLd(site?: URL | string): PersonJsonLd {
  const origin = site ? new URL(site).origin : 'https://omeryasironal.com';

  // Every public profile/social link from the single source of truth.
  const sameAs = Object.values(profile.links).map((link) => link.url);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role.en,
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
