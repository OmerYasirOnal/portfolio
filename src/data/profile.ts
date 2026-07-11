/**
 * Single source of truth for the person behind the site.
 *
 * All copy here is verified against the 2026-06-30 code scan + design spec §6/§7.
 * Components read this module + `i18n.ts` + the content collections — no copy is
 * ever hard-coded inside a component. This same data feeds the PDF CV and the
 * GitHub profile README in later phases, so it must stay accurate.
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
    en: 'Back-End & Applied AI Engineer',
    tr: 'Back-End & Uygulamalı Yapay Zeka Mühendisi',
  },
  location: {
    en: 'Istanbul, Türkiye',
    tr: 'İstanbul, Türkiye',
  },
  email: 'engomeryasironal@gmail.com',
  /**
   * WhatsApp number in E.164 digits (no `+`/spaces) for wa.me links. Used by
   * the freelance packages CTA; intentionally not a public social profile.
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
   * Hero one-liners from spec §7. Index 0 is the approved default (option A).
   * TR entries are translations of the same approved copy.
   */
  taglines: {
    en: [
      'Back-end & applied-AI engineer who ships verifiable systems — from a multi-agent AI platform with human-gated, provable build steps to apps live on the App Store.',
      'I build AI you can trust: multi-agent backends, real verification instead of false green, and products shipped end-to-end.',
      'Back-End & Applied AI Engineer in Istanbul — agentic systems, full-stack products, and an engineering bias toward provenance and trust.',
    ],
    tr: [
      'Doğrulanabilir sistemler geliştiren bir back-end ve uygulamalı yapay zeka mühendisi — insan onaylı, kanıtlanabilir derleme adımlarına sahip çok ajanlı bir yapay zeka platformundan App Store’da yayında olan uygulamalara kadar.',
      'Güvenebileceğiniz yapay zeka geliştiriyorum: çok ajanlı backend’ler, sahte “yeşil” yerine gerçek doğrulama ve uçtan uca yayınlanan ürünler.',
      'İstanbul’da Back-End & Uygulamalı Yapay Zeka Mühendisi — ajanlı sistemler, full-stack ürünler ve provenans ile güvene yönelik bir mühendislik yaklaşımı.',
    ],
  },

  /** Verbatim from spec §7. Do not paraphrase. */
  about: {
    en: 'Ömer Yasir Önal is a back-end and applied-AI engineer based in Istanbul who builds verifiable, multi-agent AI systems and ships full-stack products end to end — from AKIS, an open-source platform where AI agents can’t ship code past a human and a real passing test, to UniSum, a GPA tracker live on the App Store with its own Node/MySQL API. He works across TypeScript/Node and Python backends, LLM and agent orchestration (RAG, MCP, multi-model), and native mobile (SwiftUI, Flutter). A selected AI Fellow (1,500 of 31,700), TÜBİTAK 2209-A researcher with an IEEE SIU 2025 paper, and freelancer, a recent Computer Engineering graduate from FSM (2026).',
    tr: 'Ömer Yasir Önal, İstanbul merkezli bir back-end ve uygulamalı yapay zeka mühendisidir; doğrulanabilir çok ajanlı yapay zeka sistemleri kurar ve ürünleri uçtan uca yayına alır — yapay zeka ajanlarının insan onayı ve gerçek bir test geçmeden kod yayınlayamadığı açık kaynak platform AKIS’ten, kendi Node/MySQL API’siyle App Store’da yayında olan not ortalaması uygulaması UniSum’a kadar. TypeScript/Node ve Python backend’leri, LLM ve ajan orkestrasyonu (RAG, MCP, çok modelli) ile native mobil (SwiftUI, Flutter) arasında rahatça çalışır. Seçilmiş bir AI Fellow (31.700 içinden 1.500), IEEE SIU 2025 bildirili TÜBİTAK 2209-A araştırmacısı ve freelancer’dır; Haziran 2026’da FSM Bilgisayar Mühendisliği’nden mezun oldu.',
  },

  /** Signal badges for the About section (spec §5). */
  badges: [
    { en: 'AI Fellow — 1,500 of 31,700', tr: 'AI Fellow — 31.700 içinden 1.500' },
    { en: 'IEEE SIU 2025 paper', tr: 'IEEE SIU 2025 bildirisi' },
    { en: 'Live on the App Store', tr: 'App Store’da yayında' },
    { en: 'Open-source author', tr: 'Açık kaynak geliştiricisi' },
  ] satisfies Badge[],

  /** Six skill groups, verbatim from spec §6. */
  skillGroups: [
    {
      title_en: 'Backend & APIs',
      title_tr: 'Backend & API’ler',
      items: [
        'Node.js',
        'Express',
        'TypeScript',
        'FastAPI (Python)',
        'PostgreSQL',
        'MySQL/Sequelize',
        'SQLite',
        'REST',
        'JWT & bcrypt',
        'WebSocket',
      ],
    },
    {
      title_en: 'AI & LLM Engineering',
      title_tr: 'Yapay Zeka & LLM Mühendisliği',
      items: [
        'multi-agent orchestration',
        'RAG (pgvector, ChromaDB)',
        'Model Context Protocol (MCP)',
        'Anthropic/OpenAI/Gemini/OpenRouter APIs',
        'PyTorch (GPT/transformer from scratch)',
        'MLX LoRA fine-tuning',
        'transfer learning (TensorFlow/Keras)',
      ],
    },
    {
      title_en: 'Frontend & Web',
      title_tr: 'Frontend & Web',
      items: [
        'React 19',
        'Next.js 16 (App Router)',
        'Astro 5',
        'Tailwind CSS v4',
        'Three.js / R3F',
        'Vite',
      ],
    },
    {
      title_en: 'Mobile & Native',
      title_tr: 'Mobil & Native',
      items: [
        'Swift 6 / SwiftUI',
        'Flutter / Dart',
        'Capacitor',
        'Firebase',
        'App Store delivery',
      ],
    },
    {
      title_en: 'DevOps & Infra',
      title_tr: 'DevOps & Altyapı',
      items: [
        'Docker',
        'GitHub Actions CI/CD',
        'Vercel',
        'OCI self-hosting',
        'pnpm monorepo',
        'SwiftPM',
      ],
    },
    {
      title_en: 'Security & Trust',
      title_tr: 'Güvenlik & Güven',
      items: [
        'Ed25519 signing & build provenance',
        'capability-token approval gates',
        'OAuth 2.1 + Dynamic Client Registration',
        'KVKK/consent compliance',
        'honeypot & rate-limit hardening',
      ],
    },
  ] satisfies SkillGroup[],

  availability: {
    en: 'Open to part-time, internship, junior full-time, and freelance.',
    tr: 'Part-time, staj, junior tam zamanlı ve freelance fırsatlara açığım.',
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
      issuer: 'Coursera',
      title: 'Exploratory Data Analysis for Machine Learning',
      date: 'Aug 2023',
    },
  ] satisfies Certification[],

  languages: [
    { name_en: 'Turkish', name_tr: 'Türkçe', level_en: 'Native', level_tr: 'Ana dil' },
    { name_en: 'English', name_tr: 'İngilizce', level_en: 'B2', level_tr: 'B2' },
  ] satisfies LanguageSkill[],
} as const;

export type Profile = typeof profile;
