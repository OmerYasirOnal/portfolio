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

export interface PackageFaq {
  question: Bilingual;
  answer: Bilingual;
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

/**
 * FAQ shown on the /packages page and mirrored as FAQPage JSON-LD.
 *
 * Every answer is grounded in the tier data above (prices, timelines,
 * features, the tailor-the-scope note) — no claim here goes beyond what the
 * packages already state, so the visible copy and the structured data can't
 * drift into anything unverifiable.
 */
export const packageFaqs: PackageFaq[] = [
  {
    question: {
      en: 'Are these the final prices?',
      tr: 'Bu fiyatlar kesin mi?',
    },
    answer: {
      en: 'The figures are starting points in Turkish lira (TRY) and depend on the final scope we agree on. Tell me what you need and I’ll send an exact quote.',
      tr: 'Rakamlar Türk lirası (TL) cinsinden başlangıç noktalarıdır ve üzerinde anlaştığımız nihai kapsama göre değişir. İhtiyacını anlat, sana net bir teklif göndereyim.',
    },
  },
  {
    question: {
      en: 'How long does a project take?',
      tr: 'Bir proje ne kadar sürede teslim edilir?',
    },
    answer: {
      en: 'Roughly one week for Starter, two to three weeks for Growth, and four to six weeks for Premium — the exact timeline is confirmed once the scope is set.',
      tr: 'Başlangıç için yaklaşık bir hafta, Büyüme için iki-üç hafta, Premium için dört-altı hafta — kesin süre kapsam netleştiğinde belirlenir.',
    },
  },
  {
    question: {
      en: 'Which package should I choose?',
      tr: 'Hangi paketi seçmeliyim?',
    },
    answer: {
      en: 'Starter is a single credible page to get online fast; Growth adds a multi-page site with a full brand identity; Premium is an end-to-end brand and web system for a growing business. If you’re unsure, start from the closest one and we tailor the scope together.',
      tr: 'Başlangıç, hızlıca çevrimiçi olmak için tek ve güvenilir bir sayfadır; Büyüme, tam marka kimliğiyle çok sayfalı bir site ekler; Premium ise büyüyen bir işletme için uçtan uca marka ve web sistemidir. Emin değilsen en yakınından başla, kapsamı birlikte netleştiririz.',
    },
  },
  {
    question: {
      en: 'Do you provide support and maintenance after launch?',
      tr: 'Yayın sonrası destek ve bakım sağlıyor musunuz?',
    },
    answer: {
      en: 'The Premium package includes priority support and three months of maintenance. For the other packages, ongoing support can be added to the quote.',
      tr: 'Premium paketi öncelikli destek ve üç ay bakım içerir. Diğer paketler için sürekli destek teklife eklenebilir.',
    },
  },
];
