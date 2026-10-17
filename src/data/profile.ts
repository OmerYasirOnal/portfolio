/**
 * Single source of truth for the person behind the site.
 *
 * Components read this module + `i18n.ts` + the content collections.
 * This same data feeds the PDF CV and the structured data.
 */

export interface Bilingual {
  en: string;
  tr: string;
}

export interface SocialLink {
  /** Display label, e.g. "GitHub" */
  label: string;
  /** Public handle, e.g. "OmerYasirOnal" */
  handle: string;
  /** Absolute profile URL */
  url: string;
}

export interface Badge extends Bilingual {}

export interface SkillGroup {
  title_en: string;
  title_tr: string;
  items: string[];
}

export interface Certification {
  issuer: string;
  title: string;
  /** Platform/provider, when distinct from the issuer */
  platform?: string;
  date: string;
}

export interface LanguageSkill {
  name_en: string;
  name_tr: string;
  level_en: string;
  level_tr: string;
}

export interface Education {
  degree_en: string;
  degree_tr: string;
  school_en: string;
  school_tr: string;
  graduation_en: string;
  graduation_tr: string;
}

export const profile = {
  name: 'Ömer Yasir Önal',
  role: {
    en: 'Computer Engineer | Mobile, Web, AI & Digital Infrastructure',
    tr: 'Bilgisayar Mühendisi | Mobil, Web, Yapay Zeka ve Dijital Altyapı',
  },
  location: {
    en: 'Istanbul, Türkiye',
    tr: 'İstanbul, Türkiye',
  },
  email: 'engomeryasironal@gmail.com',
  /**
   * WhatsApp number in E.164 digits (no `+`/spaces) for wa.me links.
   */
  whatsapp: '905323090261',

  links: {
    github: {
      label: 'GitHub',
      handle: 'OmerYasirOnal',
      url: 'https://github.com/OmerYasirOnal',
    },
    linkedin: {
      label: 'LinkedIn',
      handle: 'omeryasironal',
      url: 'https://www.linkedin.com/in/omeryasironal',
    },
    medium: {
      label: 'Medium',
      handle: '@engomeryasironal',
      url: 'https://medium.com/@engomeryasironal',
    },
    youtube: {
      label: 'YouTube',
      handle: 'YouTube',
      url: 'https://www.youtube.com/channel/UCPWhVfCy6XdM3IuRhZ_oEhg',
    },
    hackerrank: {
      label: 'HackerRank',
      handle: 'engomeryasironal',
      url: 'https://www.hackerrank.com/engomeryasironal',
    },
  } satisfies Record<string, SocialLink>,

  /**
   * Hero one-liners. Index 0 is the default.
   */
  taglines: {
    en: [
      'A full-spectrum Computer Engineer building native mobile apps, high-conversion corporate websites, brand digital infrastructure, SEO / AIO systems, and verifiable AI backends end to end.',
      'From App Store products like Odak and UniSum to full corporate web and brand systems like Parla Deniz, Öz & Saye, and A2 Reklam.',
      'Computer Engineer in Istanbul delivering mobile applications, modern web platforms, SEO / AIO optimization, and applied AI engineering.',
    ],
    tr: [
      'Mobil uygulama geliştirmeden kurumsal web sitelerine, dijital marka kurulumundan SEO / AIO optimizasyonu ve yapay zeka sistemlerine kadar yazılım süreçlerinizi uçtan uca üstlenen bilgisayar mühendisi.',
      'App Store’da yayında olan Odak ve UniSum gibi kendi ürünlerimden; Parla Deniz, Öz & Saye ve A2 Reklam gibi kurumsal marka ve web sistemlerine kadar uçtan uca mühendislik.',
      'İstanbul merkezli Bilgisayar Mühendisi: mobil uygulama, modern web teknolojileri, dijital marka altyapısı, SEO / AIO ve doğrulanabilir yapay zeka sistemleri.',
    ],
  },

  about: {
    en: 'Ömer Yasir Önal is a Computer Engineer based in Istanbul who delivers software projects end to end: from native iOS/macOS and cross-platform mobile apps (Odak and UniSum on the App Store) and multi-agent AI platforms (AKIS) to corporate websites, brand digital infrastructure, and SEO / AIO optimization for businesses (Parla Deniz, Öz & Saye, A2 Reklam). He works across SwiftUI and Flutter for mobile, Astro and Next.js for high-performance web, Node.js and Python/FastAPI for backend APIs, and technical SEO / AI Search Optimization (Schema.org JSON-LD, llms.txt, Google Business Profile, GTM/GA4). A TÜBİTAK 2209-A researcher with an IEEE SIU 2025 paper and a Computer Engineering graduate from Fatih Sultan Mehmet Vakıf University (2026).',
    tr: 'Ömer Yasir Önal, İstanbul merkezli bir bilgisayar mühendisidir; yazılım projelerini fikir aşamasından canlı yayına kadar uçtan uca hayata geçirir. App Store’da yayında olan Odak (iOS, iPadOS, macOS) ve UniSum gibi mobil ürünlerin yanı sıra çok ajanlı yapay zeka platformu AKIS’i geliştirmiş; Parla Deniz, Öz & Saye Psikoloji ve A2 Reklam gibi işletmeler için kurumsal web sitesi, dijital marka kurulumu, özel yönetim paneli ve SEO / AIO (Yapay Zeka Arama Optimizasyonu) altyapılarını kurmuştur. Mobil tarafta SwiftUI ve Flutter, web tarafında Astro ve Next.js, backend tarafında Node.js, Python/FastAPI ve PostgreSQL/MySQL, dijital büyüme tarafında ise teknik SEO, Schema.org JSON-LD, llms.txt, Cloudflare ve Google ekosistemleriyle çalışır. IEEE SIU 2025 bildirisi yazarı, TÜBİTAK 2209-A araştırmacısı ve Fatih Sultan Mehmet Vakıf Üniversitesi Bilgisayar Mühendisliği (2026) mezunudur.',
  },

  /** Signal badges for the About section. */
  badges: [
    { en: 'Apps Live on the App Store', tr: 'App Store’da Yayında Uygulamalar' },
    { en: 'Corporate Web, Brand & SEO / AIO', tr: 'Kurumsal Web, Marka & SEO / AIO' },
    { en: 'IEEE SIU 2025 Paper Author', tr: 'IEEE SIU 2025 Bildirisi Yazarı' },
    { en: 'End-to-End Software Engineering', tr: 'Uçtan Uca Yazılım Mühendisliği' },
  ] satisfies Badge[],

  /** Six skill groups covering the full engineering spectrum. */
  skillGroups: [
    {
      title_en: 'Mobile & Native',
      title_tr: 'Mobil Uygulama Geliştirme',
      items: [
        'Swift 6 / SwiftUI (iOS, iPadOS, macOS)',
        'Flutter / Dart',
        'SwiftData & CloudKit (iCloud Sync)',
        'ActivityKit (Live Activity & Dynamic Island)',
        'WidgetKit & StoreKit 2',
        'App Store & TestFlight Delivery',
      ],
    },
    {
      title_en: 'Frontend & Web',
      title_tr: 'Web Teknolojileri & Kurumsal Site',
      items: [
        'Astro 5',
        'Next.js 16 (App Router)',
        'React 19',
        'TypeScript',
        'Tailwind CSS v4',
        'Custom Admin & CMS Panels',
      ],
    },
    {
      title_en: 'Brand, SEO & AIO',
      title_tr: 'Marka Kurulumu, SEO & AIO',
      items: [
        'Technical SEO & Schema.org JSON-LD',
        'AIO (llms.txt, AI Search Optimization)',
        'Domain, DNS & Cloudflare Infrastructure',
        'Corporate Email Routing (SPF/DKIM/DMARC)',
        'Google Business Profile & Search Console',
        'GTM / GA4 & Conversion Tracking',
      ],
    },
    {
      title_en: 'Backend & APIs',
      title_tr: 'Backend, API & Veritabanı',
      items: [
        'Node.js & Express',
        'Python & FastAPI',
        'PostgreSQL (Prisma, pgvector)',
        'MySQL & Oracle PL/SQL',
        'REST APIs & WebSocket',
        'JWT, OAuth 2.1 & RBAC',
      ],
    },
    {
      title_en: 'AI & LLM Engineering',
      title_tr: 'Yapay Zeka & Ajan Sistemleri',
      items: [
        'Multi-Agent Orchestration',
        'Model Context Protocol (MCP)',
        'RAG (pgvector, ChromaDB)',
        'OpenAI / Anthropic / Gemini APIs',
        'PyTorch & Transfer Learning',
        'Prompt & Context Engineering',
      ],
    },
    {
      title_en: 'DevOps & Infra',
      title_tr: 'DevOps, Güvenlik & Altyapı',
      items: [
        'Docker & Linux',
        'GitHub Actions CI/CD',
        'Vercel & Cloudflare Pages',
        'Ed25519 Build Provenance',
        'Rate-Limit, Honeypot & KVKK Compliance',
        'pnpm Monorepo & SwiftPM',
      ],
    },
  ] satisfies SkillGroup[],

  availability: {
    en: 'Available for software development projects, mobile/web builds, and technical consulting.',
    tr: 'Mobil uygulama, kurumsal web, marka altyapısı ve özel yazılım projeleri için iletişime geçebilirsiniz.',
  },

  education: {
    degree_en: 'B.Sc. Computer Engineering',
    degree_tr: 'Bilgisayar Mühendisliği (Lisans)',
    school_en: 'Fatih Sultan Mehmet Vakıf University',
    school_tr: 'Fatih Sultan Mehmet Vakıf Üniversitesi',
    graduation_en: 'June 2026',
    graduation_tr: 'Haziran 2026',
  } satisfies Education,

  certifications: [
    {
      issuer: 'Google',
      title: 'Foundations of Project Management',
      platform: 'Coursera',
      date: 'Jan 2026',
    },
    {
      issuer: 'DeepLearning.AI',
      title: 'Supervised Machine Learning: Regression and Classification',
      platform: 'Coursera',
      date: 'Nov 2025',
    },
    {
      issuer: 'IBM',
      title: 'Exploratory Data Analysis for Machine Learning',
      platform: 'Coursera',
      date: 'Aug 2023',
    },
  ] satisfies Certification[],

  languages: [
    { name_en: 'Turkish', name_tr: 'Türkçe', level_en: 'Native', level_tr: 'Ana dil' },
    { name_en: 'English', name_tr: 'İngilizce', level_en: 'B2', level_tr: 'B2' },
  ] satisfies LanguageSkill[],
} as const;

export type Profile = typeof profile;
