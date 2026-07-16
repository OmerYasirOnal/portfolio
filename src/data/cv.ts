/**
 * CV-only data layer.
 *
 * These are the facts and framing that live ONLY on the résumé and are
 * deliberately NOT published on the public site. The public portfolio keeps its
 * own (bolder) copy in `profile.ts` and the content collections; the résumé
 * reads everything role-, summary-, skills-, experience-, project-,
 * publication- and writing-related from THIS module so the two can diverge in
 * tone without touching the site.
 *
 * Still REUSED from `profile.ts` (unchanged, shared with the site): the name,
 * contact line (email, location, social links), certifications, languages, and
 * the school + graduation of the education entry.
 *
 * Consumed only by `src/pages/cv-print/[variant].astro`, the render source for
 * the generated PDFs (`public/cv/omer-yasir-onal-{en,eu,tr}.pdf`).
 */
import type { Locale } from './i18n';

export interface CvBilingual {
  en: string;
  tr: string;
}

/** One skills line: a group title plus its comma-joined item list. */
export interface CvSkillGroup {
  title_en: string;
  title_tr: string;
  en: string;
  tr: string;
}

/** A résumé experience entry (CV-only; the site uses the `experience` collection). */
export interface CvExperience {
  role_en: string;
  role_tr: string;
  org: string;
  /** Location token localized at render time (`Istanbul` → `İstanbul` on TR). */
  location: string;
  /** Date tokens localized at render time (`Dec 2025` → `Ara. 2025`, `Present` → `Günümüz`). */
  start: string;
  end: string;
  bullets_en: string[];
  bullets_tr: string[];
}

/** A curated résumé project with its own impact note, tech line and primary link. */
export interface CvProject {
  title: string;
  /** One- to three-sentence impact note. */
  en: string;
  tr: string;
  /** Tech tokens, rendered ` · `-joined. */
  tech: string[];
  /** Primary link (shipped product > code). */
  link: string;
  /** Optional display label for the link (defaults to the bare URL). */
  linkLabel?: string;
}

/** A résumé publication line with an optional one-line note. */
export interface CvPublication {
  title_en: string;
  title_tr: string;
  venue: string;
  year: number;
  note_en: string;
  note_tr: string;
}

export const cv = {
  /** Not published on the public site — résumé contact line only. */
  phone: '+90 532 309 0261',

  /** Extra contact endpoint shown on the CV contact line. */
  website: 'https://omeryasironal.com',

  /**
   * The role line printed in the résumé header band. CV-only so the site header
   * can keep `profile.role` ("Back-End & Applied AI Engineer") while the résumé
   * leads with a junior framing. The em dash ASCII-folds to "-" on the en/eu
   * variants.
   */
  role: {
    en: 'Junior Software Engineer — Backend & Applied AI',
    tr: 'Junior Yazılım Mühendisi — Backend & Uygulamalı Yapay Zeka',
  } satisfies CvBilingual,

  /**
   * English-only line shown ONLY on the EU `eu` PDF variant: the
   * recruitment-data consent footer required for GDPR-compliant applications.
   */
  gdprConsent:
    'I consent to the processing of my personal data for recruitment purposes (GDPR).',

  /** Long-form professional summary (résumé opener) — new-grad, product-led. */
  summary: {
    en: 'Computer Engineering graduate with hands-on experience in backend development, applied AI projects, and full-stack product delivery. I have built and shipped real projects, including a multi-agent AI platform, an App Store application, freelance production websites, and research work accepted to IEEE SIU 2025. I am most comfortable working with Node.js, TypeScript, Python, SQL databases, Docker, and LLM-based systems. As a new graduate, I am looking for junior software engineering roles where I can contribute to real products, keep improving technically, and take ownership of the work I deliver.',
    tr: 'Bilgisayar Mühendisliği mezunu; backend geliştirme, uygulamalı yapay zeka projeleri ve full-stack ürün teslimi konularında uygulamalı deneyime sahibim. Çok-ajanlı bir yapay zeka platformu, App Store’da yayında bir uygulama, freelance üretim web siteleri ve IEEE SIU 2025’e kabul edilen bir araştırma dâhil olmak üzere gerçek projeler geliştirip yayına aldım. En rahat çalıştığım teknolojiler Node.js, TypeScript, Python, SQL veritabanları, Docker ve LLM tabanlı sistemler. Yeni mezun biri olarak; gerçek ürünlere katkı sunabileceğim, teknik olarak gelişmeye devam edebileceğim ve teslim ettiğim işin sorumluluğunu üstlenebileceğim junior yazılım mühendisliği rollerine açığım.',
  } satisfies CvBilingual,

  /**
   * Résumé skills — an ordered list of lines, CV-only so the site's
   * `profile.skillGroups` stays richer. Leads with Backend, then AI, Frontend &
   * Mobile, DevOps and finally Security & Reliability.
   */
  skills: [
    {
      title_en: 'Backend & APIs',
      title_tr: 'Backend & API’ler',
      en: 'Node.js, Express, TypeScript, FastAPI, REST APIs, PostgreSQL, MySQL, SQLite, Sequelize, JWT, bcrypt, WebSocket',
      tr: 'Node.js, Express, TypeScript, FastAPI, REST API’ler, PostgreSQL, MySQL, SQLite, Sequelize, JWT, bcrypt, WebSocket',
    },
    {
      title_en: 'AI & LLM Engineering',
      title_tr: 'Yapay Zeka & LLM Mühendisliği',
      en: 'Multi-agent systems, RAG, pgvector, ChromaDB, OpenAI / Anthropic / Gemini / OpenRouter APIs, Model Context Protocol, PyTorch, MLX LoRA fine-tuning',
      tr: 'Çok-ajanlı sistemler, RAG, pgvector, ChromaDB, OpenAI / Anthropic / Gemini / OpenRouter API’leri, Model Context Protocol, PyTorch, MLX LoRA ince ayarı',
    },
    {
      title_en: 'Frontend & Mobile',
      title_tr: 'Frontend & Mobil',
      en: 'React, Next.js, Astro, Tailwind CSS, Three.js / React Three Fiber, SwiftUI, Flutter, Dart, Capacitor, Firebase, App Store delivery',
      tr: 'React, Next.js, Astro, Tailwind CSS, Three.js / React Three Fiber, SwiftUI, Flutter, Dart, Capacitor, Firebase, App Store teslimi',
    },
    {
      title_en: 'DevOps & Tools',
      title_tr: 'DevOps & Araçlar',
      en: 'Docker, GitHub Actions, Vercel, OCI self-hosting, pnpm monorepo, Git',
      tr: 'Docker, GitHub Actions, Vercel, OCI self-hosting, pnpm monorepo, Git',
    },
    {
      title_en: 'Security & Reliability',
      title_tr: 'Güvenlik & Güvenilirlik',
      en: 'JWT authentication, rate limiting, CORS, Helmet, approval gates',
      tr: 'JWT kimlik doğrulama, rate limiting, CORS, Helmet, onay kapıları',
    },
  ] satisfies CvSkillGroup[],

  /** Résumé experience (CV-only; ordered top-to-bottom as printed). */
  experience: [
    {
      role_en: 'AI Fellow',
      role_tr: 'AI Fellow',
      org: 'Yapay Zeka ve Teknoloji Akademisi',
      location: 'Istanbul',
      start: 'Dec 2025',
      end: 'Present',
      bullets_en: [
        'Selected for the AI Fellowship program among 31,700 applicants; following a practical curriculum in generative AI, ML/DL fundamentals, and end-to-end project development.',
        'Participating in AI training and project work as part of a program run with Google Türkiye, Girişimcilik Vakfı, T3 Foundation, and the Ministry of Industry & Technology.',
      ],
      bullets_tr: [
        '31.700 başvuru arasından AI Fellowship programına seçildim; üretken yapay zeka, ML/DL temelleri ve uçtan uca proje geliştirme üzerine uygulamalı bir müfredatı takip ediyorum.',
        'Google Türkiye, Girişimcilik Vakfı, T3 Vakfı ve Sanayi ve Teknoloji Bakanlığı iş birliğiyle yürütülen bir programın parçası olarak yapay zeka eğitimlerine ve proje çalışmalarına katılıyorum.',
      ],
    },
    {
      role_en: 'Software Engineer Intern',
      role_tr: 'Yazılım Mühendisi Stajyeri',
      org: 'Exedra HRTech',
      location: 'Istanbul',
      start: 'Jul 2025',
      end: 'Aug 2025',
      bullets_en: [
        'Contributed to web product features and tests in a production HRTech environment.',
        'Worked as part of an Agile software team and gained experience with code review, team communication, and product delivery.',
      ],
      bullets_tr: [
        'Üretim ortamındaki bir HRTech ürününde web özelliklerine ve testlere katkıda bulundum.',
        'Agile bir yazılım ekibinin parçası olarak çalıştım; kod incelemesi, ekip içi iletişim ve ürün teslimi konularında deneyim kazandım.',
      ],
    },
    {
      role_en: 'Instructor / Mentor',
      role_tr: 'Eğitmen / Mentor',
      org: 'T3 Foundation — Deneyap Technology Workshops',
      location: 'Istanbul',
      start: '2024',
      end: '2025',
      bullets_en: [
        'Taught and mentored students in Deneyap technology workshops through practical software and technology exercises.',
      ],
      bullets_tr: [
        'Deneyap teknoloji atölyelerinde öğrencilere uygulamalı yazılım ve teknoloji çalışmalarıyla eğitim verdim ve mentorluk yaptım.',
      ],
    },
    {
      role_en: 'Freelance Software Developer',
      role_tr: 'Freelance Yazılım Geliştirici',
      org: 'Freelance',
      location: 'Istanbul',
      start: 'May 2024',
      end: 'Jan 2025',
      bullets_en: [
        'Delivered production websites for clients, including a trilingual corporate website for A2 Reklam.',
        'Took responsibility for implementation, delivery timeline, SEO-related structure, and client communication.',
      ],
      bullets_tr: [
        'Müşteriler için üretim web siteleri teslim ettim; bunların arasında A2 Reklam için üç dilli bir kurumsal web sitesi de yer alıyor.',
        'Uygulama, teslim takvimi, SEO odaklı yapı ve müşteri iletişimi sorumluluğunu üstlendim.',
      ],
    },
    {
      role_en: 'Researcher',
      role_tr: 'Araştırmacı',
      org: 'TÜBİTAK 2209-A',
      location: 'Istanbul',
      start: 'Jun 2023',
      end: 'Jun 2024',
      bullets_en: [
        'Worked on machine learning models for structural / concrete durability prediction using sensor data.',
        'Used XGBoost and Random Forest models; the research led to a paper accepted at IEEE SIU 2025.',
      ],
      bullets_tr: [
        'Sensör verisi kullanarak yapısal / beton dayanıklılığı tahmini için makine öğrenmesi modelleri üzerinde çalıştım.',
        'XGBoost ve Random Forest modellerini kullandım; araştırma, IEEE SIU 2025’te kabul edilen bir bildiriye dönüştü.',
      ],
    },
  ] satisfies CvExperience[],

  /**
   * Curated, ordered résumé projects — CV-only, self-contained (title, impact
   * note, tech line and primary link). `cv-print/[variant].astro` renders these
   * in order.
   */
  projects: [
    {
      title: 'AKIS',
      en: 'Built a live multi-agent AI platform that coordinates role-separated agents with human approval gates and reviewer loops. The project focuses on making AI-assisted development more controlled, verifiable, and safer to run. Worked on backend orchestration, approval flow design, automated tests, Docker-based deployment, build provenance, and LLM safety guardrails.',
      tr: 'İnsan-onay kapıları ve reviewer döngüleriyle rol-ayrık ajanları koordine eden, canlı bir çok-ajanlı yapay zeka platformu geliştirdim. Proje; yapay zeka destekli geliştirmeyi daha kontrollü, doğrulanabilir ve güvenli çalıştırılabilir hâle getirmeye odaklanıyor. Backend orkestrasyonu, onay akışı tasarımı, otomatik testler, Docker tabanlı dağıtım, build provenance ve LLM güvenlik korumaları üzerinde çalıştım.',
      tech: ['TypeScript', 'Node.js', 'React', 'PostgreSQL / pgvector', 'Docker', 'Multi-LLM APIs', 'MCP'],
      link: 'https://akisflow.com',
    },
    {
      title: 'UniSum',
      en: 'Built and shipped an iOS application to the App Store with a native SwiftUI client and a self-built Node.js / Express / MySQL backend. Implemented REST APIs, authentication, and basic hardening such as CORS, Helmet, and rate limiting.',
      tr: 'Native bir SwiftUI istemcisi ve kendi geliştirdiğim Node.js / Express / MySQL backend’i ile bir iOS uygulamasını geliştirip App Store’da yayınladım. REST API’ler, kimlik doğrulama ve CORS, Helmet, rate limiting gibi temel sertleştirmeleri uyguladım.',
      tech: ['SwiftUI', 'Node.js', 'Express', 'MySQL', 'JWT', 'bcrypt', 'REST'],
      link: 'https://apps.apple.com/tr/app/unisum/id6742401580',
      linkLabel: 'App Store',
    },
    {
      title: 'A2 Reklam',
      en: 'Delivered a production corporate website with Turkish, English, and Arabic pages. Worked on the Astro build, local SEO structure, analytics setup, and a hardened PHP endpoint.',
      tr: 'Türkçe, İngilizce ve Arapça sayfaları olan, yayında bir kurumsal web sitesi teslim ettim. Astro derlemesi, yerel SEO yapısı, analitik kurulumu ve sertleştirilmiş bir PHP uç noktası üzerinde çalıştım.',
      tech: ['Astro', 'Tailwind CSS', 'PHP', 'Schema.org', 'GTM / GA4'],
      link: 'https://a2reklam.com',
    },
  ] satisfies CvProject[],

  /**
   * Compact "also live on the App Store" line rendered at the tail of the
   * Projects section — every OTHER app currently published under the developer
   * account (UniSum has its own entry above). Published apps only; in-review /
   * unreleased apps are deliberately absent. Links verified against the App
   * Store developer page (id1797082029).
   */
  appStoreApps: {
    intro: { en: 'Also live on the App Store', tr: 'App Store’da ayrıca yayında' },
    apps: [
      {
        name: 'Hoppala: Zıpla ve Tırman',
        platform: 'iOS',
        link: 'https://apps.apple.com/tr/app/hoppala-z%C4%B1pla-ve-t%C4%B1rman/id6786738365',
      },
      {
        name: 'Snake Grow.io: Battle Arena',
        platform: 'iOS',
        link: 'https://apps.apple.com/tr/app/snake-grow-io-battle-arena/id6762146110',
      },
      {
        name: 'Odak: Görev & Pomodoro',
        platform: 'iOS / macOS',
        link: 'https://apps.apple.com/tr/app/odak-g%C3%B6rev-pomodoro/id6787764117',
      },
      {
        name: 'UsageMeter',
        platform: 'macOS',
        link: 'https://apps.apple.com/tr/app/usagemeter/id6786227263',
      },
    ],
  },

  /** Résumé publications (CV-only). */
  publications: [
    {
      title_en: 'Machine learning for structural / concrete durability prediction',
      title_tr: 'Yapısal / beton dayanıklılığı tahmini için makine öğrenmesi',
      venue: 'IEEE SIU 2025',
      year: 2025,
      note_en: 'Research work using XGBoost and Random Forest models for durability prediction.',
      note_tr:
        'Dayanıklılık tahmini için XGBoost ve Random Forest modelleri kullanan araştırma çalışması.',
    },
  ] satisfies CvPublication[],

  /**
   * CV-only education framing: the degree line carries the medium-of-instruction
   * detail (which also evidences the English level). School + graduation are
   * reused from `profile.education`.
   */
  education: {
    degree: {
      en: 'B.Sc. Computer Engineering (70% English)',
      tr: 'Bilgisayar Mühendisliği (Lisans, %70 İngilizce)',
    } satisfies CvBilingual,
  },

  /** Writing collapses to a single line. */
  writing: {
    en: 'Author of 3 Medium articles on AI agents',
    tr: 'AI ajanları üzerine 3 Medium yazısının yazarı',
  } satisfies CvBilingual,

  /** CV section headings (print-only strings; the public pages use i18n.ts). */
  sections: {
    summary: { en: 'Summary', tr: 'Özet' },
    skills: { en: 'Skills', tr: 'Yetenekler' },
    experience: { en: 'Experience', tr: 'Deneyim' },
    projects: { en: 'Projects', tr: 'Projeler' },
    publications: { en: 'Publications', tr: 'Yayınlar' },
    writing: { en: 'Writing', tr: 'Yazılar' },
    certifications: { en: 'Certifications', tr: 'Sertifikalar' },
    education: { en: 'Education', tr: 'Eğitim' },
    languages: { en: 'Languages', tr: 'Diller' },
  } satisfies Record<string, Record<Locale, string>>,
} as const;

export type Cv = typeof cv;
