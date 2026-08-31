/**
 * Freelance service packages (brand identity + website builds).
 *
 * Single source of truth for the `/packages` page: three fixed tiers, each a
 * price-from figure (TRY), a one-line pitch, and a feature list. Nothing here
 * is content-collection material (it's not article-shaped, doesn't need
 * drafts/ordering-by-file), so it lives as plain data, same as `profile.ts`.
 */
import type { Bilingual } from './profile';

export interface RapidSprint {
  id: 'web-sprint' | 'mobile-mvp';
  eyebrow: Bilingual;
  name: Bilingual;
  tagline: Bilingual;
  price: number;
  timeline: Bilingual;
  features: Bilingual[];
  exclusions: Bilingual;
  highlighted: boolean;
}

export interface PackageTier {
  id: 'starter' | 'growth' | 'premium';
  name: Bilingual;
  tagline: Bilingual;
  /** Starting price in Turkish lira (whole numbers, no currency symbol). */
  priceFrom: number;
  timeline: Bilingual;
  /** Page-count summary for the comparison table (faithful to `features`). */
  pages: Bilingual;
  /** Brand-identity scope for the comparison table (faithful to `features`). */
  brandScope: Bilingual;
  features: Bilingual[];
  /** Surfaced as the "most popular" tier — exactly one should be true. */
  highlighted: boolean;
}

export interface PackageFaq {
  question: Bilingual;
  answer: Bilingual;
}

export interface ProcessStep {
  title: Bilingual;
  description: Bilingual;
}

/**
 * Small, sharply bounded validation offers for buyers who need a working
 * result before committing to a full product or brand build. These are kept
 * separate from the larger package tiers so neither scope nor pricing is
 * ambiguous.
 */
export const rapidSprints: RapidSprint[] = [
  {
    id: 'web-sprint',
    eyebrow: { en: '72-hour web sprint', tr: '72 saatlik web sprinti' },
    name: { en: 'WhatsApp Lead Page', tr: 'WhatsApp Müşteri Sayfası' },
    tagline: {
      en: 'A focused one-page site that turns mobile visitors into calls and WhatsApp conversations.',
      tr: 'Mobil ziyaretçileri aramaya ve WhatsApp görüşmesine yönlendiren odaklı tek sayfalık site.',
    },
    price: 2500,
    timeline: { en: '72 hours', tr: '72 saat' },
    features: [
      { en: 'One responsive, fast-loading landing page', tr: 'Mobil uyumlu, hızlı yüklenen tek sayfalık site' },
      { en: 'WhatsApp, call, map, and contact actions', tr: 'WhatsApp, arama, konum ve iletişim aksiyonları' },
      { en: 'Basic SEO and AI-assisted page copy', tr: 'Temel SEO ve yapay zekâ destekli sayfa metinleri' },
      { en: 'One revision round and source-code handoff', tr: '1 revizyon turu ve kaynak kod teslimi' },
    ],
    exclusions: {
      en: 'Domain, hosting, CMS, e-commerce, and custom back-end work are quoted separately.',
      tr: 'Alan adı, hosting, CMS, e-ticaret ve özel back-end çalışmaları ayrıca fiyatlandırılır.',
    },
    highlighted: false,
  },
  {
    id: 'mobile-mvp',
    eyebrow: { en: '72-hour mobile sprint', tr: '72 saatlik mobil sprint' },
    name: { en: 'Working Mobile MVP', tr: 'Çalışan Mobil MVP' },
    tagline: {
      en: 'Turn one clear app idea into a testable mobile MVP you can put in front of real users.',
      tr: 'Net bir uygulama fikrini gerçek kullanıcılara gösterebileceğin, test edilebilir mobil MVP’ye dönüştür.',
    },
    price: 4500,
    timeline: { en: '72 hours', tr: '72 saat' },
    features: [
      { en: 'Up to 3–4 focused screens', tr: 'En fazla 3-4 odaklı ekran' },
      { en: 'React Native + Expo implementation', tr: 'React Native + Expo ile geliştirme' },
      { en: 'Navigation plus simple Firebase/Supabase data flow', tr: 'Navigasyon ve basit Firebase/Supabase veri akışı' },
      { en: 'Testable demo, source code, and one revision round', tr: 'Test edilebilir demo, kaynak kod ve 1 revizyon turu' },
    ],
    exclusions: {
      en: 'Store review, payments, live chat, complex integrations, and admin panels are outside this sprint.',
      tr: 'Mağaza onayı, ödeme, canlı mesajlaşma, karmaşık entegrasyonlar ve yönetim paneli bu sprintin dışındadır.',
    },
    highlighted: true,
  },
];

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
    pages: { en: '1 page', tr: '1 sayfa' },
    brandScope: { en: 'Basic logo + palette', tr: 'Temel logo + palet' },
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
    pages: { en: '5–7 pages', tr: '5-7 sayfa' },
    brandScope: { en: 'Full brand identity', tr: 'Tam marka kimliği' },
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
    pages: { en: 'Unlimited', tr: 'Sınırsız' },
    brandScope: { en: 'Full brand system', tr: 'Kapsamlı marka sistemi' },
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
      en: 'What can realistically be delivered in 72 hours?',
      tr: '72 saatte gerçekçi olarak ne teslim edilebilir?',
    },
    answer: {
      en: 'One tightly scoped result: either a one-page WhatsApp lead site or a testable 3–4 screen mobile MVP. The clock starts after the scope, content, and required access are confirmed.',
      tr: 'Sınırları net tek bir sonuç: WhatsApp odaklı tek sayfalık site veya test edilebilir 3-4 ekranlı mobil MVP. Süre; kapsam, içerik ve gerekli erişimler netleştikten sonra başlar.',
    },
  },
  {
    question: {
      en: 'Does the mobile MVP include App Store or Play Store publishing?',
      tr: 'Mobil MVP, App Store veya Play Store’da yayınlamayı içeriyor mu?',
    },
    answer: {
      en: 'No. The sprint includes a testable demo and source code. Store preparation and review depend on store accounts and external approval timelines, so they are quoted separately.',
      tr: 'Hayır. Sprint, test edilebilir demo ve kaynak kod teslimini içerir. Mağaza hazırlığı ve inceleme süreci mağaza hesaplarına ve dış onay sürelerine bağlı olduğu için ayrıca fiyatlandırılır.',
    },
  },
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
      en: 'Choose a 72-hour sprint to validate one idea quickly. Starter is a complete one-page brand site; Growth adds multiple pages and a full identity; Premium is an end-to-end brand and web system. If you are unsure, describe the result you need and we will choose the smallest sensible scope.',
      tr: 'Tek bir fikri hızla doğrulamak için 72 saatlik sprinti seçin. Başlangıç, eksiksiz tek sayfalık marka sitesidir; Büyüme, çoklu sayfa ve tam marka kimliği ekler; Premium ise uçtan uca marka ve web sistemidir. Emin değilseniz ihtiyacınız olan sonucu anlatın, en küçük mantıklı kapsamı birlikte seçelim.',
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

/**
 * The four-step delivery process shown on /packages. Generic-but-accurate
 * freelance workflow — each step maps to work the packages already describe
 * (SEO setup ships in Growth+, support/maintenance in Premium).
 */
export const packageProcess: ProcessStep[] = [
  {
    title: { en: 'Discovery', tr: 'Keşif' },
    description: {
      en: 'A short call to understand your business, goals, and audience, and to agree on the scope and package.',
      tr: 'İşini, hedeflerini ve hedef kitleni anlamak, kapsam ve paket üzerinde anlaşmak için kısa bir görüşme.',
    },
  },
  {
    title: { en: 'Design', tr: 'Tasarım' },
    description: {
      en: 'Brand direction and page layouts — logo, palette, and typography where the package includes them — reviewed before a line of code.',
      tr: 'Marka yönü ve sayfa tasarımları — paket kapsıyorsa logo, renk paleti ve tipografi — kod yazılmadan önce onayına sunulur.',
    },
  },
  {
    title: { en: 'Build', tr: 'Geliştirme' },
    description: {
      en: 'The site is developed to be fast, mobile-friendly, and SEO-ready, with revision rounds along the way.',
      tr: 'Site hızlı, mobil uyumlu ve SEO’ya hazır şekilde geliştirilir; süreç boyunca revizyon turları yapılır.',
    },
  },
  {
    title: { en: 'Launch', tr: 'Yayın' },
    description: {
      en: 'Deployment, Google visibility setup, and handover — with priority support and maintenance on the Premium package.',
      tr: 'Yayına alma, Google görünürlük kurulumu ve teslim — Premium pakette öncelikli destek ve bakım ile birlikte.',
    },
  },
];
