/**
 * Freelance service packages (brand identity + website builds).
 *
 * Single source of truth for the `/packages` page: three fixed tiers, each a
 * price-from figure (TRY), a one-line pitch, and a feature list. Nothing here
 * is content-collection material (it's not article-shaped, doesn't need
 * drafts/ordering-by-file), so it lives as plain data, same as `profile.ts`.
 */
import type { Bilingual } from './profile';

export interface PackageTier {
  id: 'starter' | 'growth' | 'premium';
  name: Bilingual;
  tagline: Bilingual;
  /** Starting price in Turkish lira (whole numbers, no currency symbol). */
  priceFrom: number;
  timeline: Bilingual;
  features: Bilingual[];
  /** Surfaced as the "most popular" tier — exactly one should be true. */
  highlighted: boolean;
}

export const packageTiers: PackageTier[] = [
  {
    id: 'starter',
    name: { en: 'Starter', tr: 'Başlangıç' },
    tagline: {
      en: 'A fast, credible one-page site to get a brand online.',
      tr: 'Bir markayı hızlıca ve güvenilir şekilde internete taşıyan tek sayfalık site.',
    },
    priceFrom: 15000,
    timeline: { en: '~1 week', tr: '~1 hafta' },
    features: [
      { en: 'One-page landing site, designed and built', tr: 'Tek sayfa (landing page) tasarım ve geliştirme' },
      { en: 'Basic logo + color palette', tr: 'Temel logo ve renk paleti' },
      { en: 'Mobile-friendly, fast-loading build', tr: 'Mobil uyumlu, hızlı yüklenen site' },
      { en: 'One round of revisions', tr: '1 revizyon turu' },
    ],
    highlighted: false,
  },
  {
    id: 'growth',
    name: { en: 'Growth', tr: 'Büyüme' },
    tagline: {
      en: 'A multi-page site with a full brand identity behind it.',
      tr: 'Tam bir marka kimliğiyle desteklenen çok sayfalı web sitesi.',
    },
    priceFrom: 35000,
    timeline: { en: '~2–3 weeks', tr: '~2-3 hafta' },
    features: [
      { en: '5–7 page custom-designed website', tr: '5-7 sayfalık özel tasarım web sitesi' },
      {
        en: 'Full brand identity (logo, palette, typography, brand guide)',
        tr: 'Tam marka kimliği (logo, renk paleti, tipografi, marka rehberi)',
      },
      { en: 'SEO fundamentals + Google visibility setup', tr: 'SEO temelleri ve Google’da görünürlük kurulumu' },
      { en: 'Two rounds of revisions', tr: '2 revizyon turu' },
    ],
    highlighted: true,
  },
  {
    id: 'premium',
    name: { en: 'Premium', tr: 'Premium' },
    tagline: {
      en: 'An end-to-end brand and web experience for a growing business.',
      tr: 'Büyüyen bir işletme için uçtan uca marka ve web deneyimi.',
    },
    priceFrom: 65000,
    timeline: { en: '~4–6 weeks', tr: '~4-6 hafta' },
    features: [
      { en: 'Unlimited pages, custom design + interactions', tr: 'Sınırsız sayfa, özel tasarım ve etkileşimler' },
      {
        en: 'Full brand system (incl. deck + social media templates)',
        tr: 'Kapsamlı marka kimliği sistemi (sunum ve sosyal medya şablonları dahil)',
      },
      { en: 'Blog/CMS integration, multi-language support', tr: 'Blog/CMS entegrasyonu, çoklu dil desteği' },
      { en: 'Priority support + 3 months of maintenance', tr: 'Öncelikli destek ve 3 ay bakım' },
    ],
    highlighted: false,
  },
];
