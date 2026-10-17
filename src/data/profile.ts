/**
 * Single source of truth for the person behind the site.
 *
 * Synced 100% with the user's latest CV (Oct 2026).
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
  summary_en?: string;
  summary_tr?: string;
  items: string[];
  items_tr?: string[];
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
    en: 'Computer Engineer | Mobile, Web, Backend & AI Solutions',
    tr: 'Bilgisayar Mühendisi | Mobil, Web, Backend ve AI Çözümleri',
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
      'Computer Engineer building end-to-end mobile apps (App Store), high-performance corporate web platforms, digital brand infrastructure, SEO / AIO visibility, and backend & AI systems.',
      'From App Store products like Odak and UniSum to complete corporate web and SEO/AIO systems like Öz & Saye Psikoloji, A2 Reklam, and Parla Deniz.',
      'Computer Engineer in Istanbul delivering mobile applications, modern web platforms, SEO / AIO optimization, and applied AI engineering.',
    ],
    tr: [
      'Müşteri ihtiyaçlarının analizinden teknik planlama, geliştirme ve yayına almaya kadar; mobil uygulama, kurumsal web sitesi, dijital marka kurulumu, SEO / AIO görünürlüğü ve backend & yapay zeka süreçlerini uçtan uca yöneten Bilgisayar Mühendisi.',
      'App Store’da yayında olan Odak ve UniSum ürünlerimden; Öz & Saye Psikoloji, A2 Reklam ve Parla Deniz gibi kurumsal web ve marka sistemlerine kadar doğrulanmış teslimat.',
      'İstanbul merkezli Bilgisayar Mühendisi: mobil uygulama, kurumsal web, dijital marka altyapısı, SEO / AIO ve yapay zeka çözümleri.',
    ],
  },

  about: {
    en: 'Ömer Yasir Önal is a Computer Engineer based in Istanbul focused on building end-to-end digital products, backend APIs, databases, and applied AI systems. He built and published UniSum and Odak (native SwiftUI for iPhone, iPad, and Mac) on the App Store, and engineered AKIS, a multi-agent AI orchestration platform with human-approved execution flows. Across client projects (Öz & Saye Psikoloji, A2 Reklam, Parla Deniz), he owns the complete lifecycle from requirements analysis and technical planning to corporate web development, custom admin panels, SEO and AI Search (AIO) visibility, Google Ads management, and post-launch support. He is a Computer Engineering graduate from Fatih Sultan Mehmet Vakıf University (June 2026), TÜBİTAK 2209-A Project Lead & Researcher, and co-author of an IEEE SIU 2025 paper.',
    tr: 'Node.js, Python, SwiftUI ve modern web teknolojileriyle uçtan uca dijital ürünler, API ve veri tabanı sistemleri geliştiren Bilgisayar Mühendisiyim. UniSum ve Odak (iPhone, iPad, Mac) uygulamalarını sıfırdan geliştirip App Store’da yayımladım; üniversite bitirme projem olarak insan onaylı çok ajanlı yapay zeka orkestrasyon platformu AKIS’i hayata geçirdim. Müşteri projelerinde (Öz & Saye Psikoloji, A2 Reklam, Parla Deniz) ihtiyaç analizinden teknik planlama, geliştirme, kurumsal marka kurulumu, SEO / yapay zeka araması (AIO), Google Ads yönetimi ve yayına almaya kadar tüm süreçlerin sorumluluğunu üstleniyor; teslim sonrasında bakım ve teknik desteği sürdürüyorum. Fatih Sultan Mehmet Vakıf Üniversitesi Bilgisayar Mühendisliği (Haziran 2026) mezunu, TÜBİTAK 2209-A proje yöneticisi/araştırmacısı ve IEEE SIU 2025 ortak yazarlı bildiri sahibiyim.',
  },

  /** Signal badges for the About section. */
  badges: [
    { en: 'UniSum & Odak Live on the App Store', tr: 'App Store’da Yayında 2 Ürün (Odak & UniSum)' },
    { en: 'Corporate Web, Admin CMS & SEO / AIO', tr: 'Kurumsal Web, Yönetim Paneli ve SEO / AIO' },
    { en: 'TÜBİTAK 2209-A Lead & IEEE SIU 2025 Author', tr: 'TÜBİTAK 2209-A Yöneticisi ve IEEE SIU 2025 Yazarı' },
    { en: 'Backend, Database & AI Orchestration', tr: 'Backend API, Veri Tabanı ve AI Orkestrasyonu' },
  ] satisfies Badge[],

  /** Six capability groups synced with the CV's exact technical stack and client solutions. */
  skillGroups: [
    {
      title_en: 'Mobile & Native',
      title_tr: 'Mobil Uygulama (iOS, iPadOS & macOS)',
      summary_en: 'Multi-platform native Apple apps and mobile products shipped to the App Store with custom backends.',
      summary_tr: 'Kendi sunucu altyapısıyla veya iCloud eşitlemesiyle App Store’da yayımlanan çok platformlu uygulamalar.',
      items: [
        'SwiftUI (iPhone, iPad & Mac)',
        'Shared SwiftPM Architecture',
        'SwiftData & iCloud (CloudKit) Sync',
        'Live Activities & Interactive Widgets',
        'Mobile REST API Integration',
        'App Store Release & Delivery',
      ],
      items_tr: [
        'SwiftUI ile iPhone, iPad ve Mac Uygulamaları',
        'Ortak SwiftPM İş Mantığı ve Mimari',
        'SwiftData ve iCloud Eşitlemesi',
        'Canlı Etkinlikler (Live Activity) ve Widget’lar',
        'Mobil REST API ve Kimlik Doğrulama',
        'App Store Mağaza Yayını ve Süreç Yönetimi',
      ],
    },
    {
      title_en: 'Frontend & Web',
      title_tr: 'Kurumsal Web ve Yönetim Panelleri',
      summary_en: 'High-speed, multi-language corporate websites and custom content/application management panels.',
      summary_tr: 'Yüksek hızlı, çok dilli kurumsal web siteleri ve içerik/başvuru süreçlerini destekleyen yönetim panelleri.',
      items: [
        'Next.js & React',
        'Astro & Tailwind CSS',
        'Custom Content & Application Admin Panels',
        'Multi-Language Corporate Websites (TR / EN / AR)',
        'Cross-Device Usability & Automated Checks',
        'Post-Launch Maintenance & Technical Support',
      ],
      items_tr: [
        'Next.js, React, Astro ve Tailwind CSS',
        'İçerik ve Başvuru Yönetimi İçin Özel Paneller',
        'Çok Dilli Kurumsal Web Siteleri (TR / EN / AR)',
        'Farklı Cihazlarda İşlevsellik ve Otomatik Kontroller',
        'Hizmet, Blog ve Dönüşüm Odaklı Sayfa Kurgusu',
        'Teslim Sonrası Bakım ve Teknik Destek',
      ],
    },
    {
      title_en: 'Brand, SEO & AIO',
      title_tr: 'SEO, Yapay Zeka Araması (AIO) ve Dijital Marka',
      summary_en: 'Visibility in Google and AI search systems, analytics measurement, Google Ads, and domain/email setup.',
      summary_tr: 'Google ve yapay zeka destekli arama sistemlerinde görünürlük (AIO), ölçüm altyapısı ve reklam yönetimi.',
      items: [
        'SEO & AI Search Visibility (AIO)',
        'Google Tag Manager (GTM) & GA4 Analytics',
        'Google Ads Campaign Management',
        'Domain, Cloudflare DNS & Corporate Email Setup',
        'Schema.org JSON-LD & llms.txt Architecture',
        'Google Business Profile & Search Console',
      ],
      items_tr: [
        'SEO ve Yapay Zeka Araması Görünürlüğü (AIO)',
        'GTM / GA4 Ölçüm ve Dönüşüm Altyapısı',
        'Google Ads Kampanya Yönetimi',
        'Alan Adı, Cloudflare ve Kurumsal E-posta Yapılandırması',
        'Schema.org Yapısal Veri ve llms.txt Mimarisi',
        'Google İşletme Profili ve Search Console',
      ],
    },
    {
      title_en: 'Backend & APIs',
      title_tr: 'Backend, API ve Veri Tabanı',
      summary_en: 'API and relational database engineering with Node.js, TypeScript, Python, PostgreSQL, and MySQL.',
      summary_tr: 'Node.js, TypeScript ve Python ile güvenli API, ilişkisel veri tabanı ve kimlik doğrulama sistemleri.',
      items: [
        'TypeScript, Node.js & Express',
        'Python & FastAPI',
        'REST API & WebSocket',
        'PostgreSQL, MySQL, Drizzle & SQL',
        'Oracle PL/SQL',
        'JWT, bcrypt, CORS & Rate Limiting',
      ],
      items_tr: [
        'TypeScript, Node.js ve Express',
        'Python ve FastAPI',
        'REST API ve WebSocket Servisleri',
        'PostgreSQL, MySQL, Drizzle ve SQL',
        'Oracle PL/SQL ve Veri Tabanı Temelleri',
        'JWT / bcrypt Kimlik Doğrulama, CORS ve İstek Sınırlama',
      ],
    },
    {
      title_en: 'AI & LLM Engineering',
      title_tr: 'Yapay Zeka ve Ajan Orkestrasyonu',
      summary_en: 'Agent task lifecycles, human-approved execution flows, MCP, RAG, and machine learning models.',
      summary_tr: 'Ajan görev yaşam döngüsü, insan onaylı yürütme akışları, LLM API, MCP, RAG ve makine öğrenmesi.',
      items: [
        'AI Agent Orchestration & Task Lifecycles',
        'Human-Approved Execution & Traceable Logs',
        'LLM API, Model Context Protocol (MCP) & RAG',
        'XGBoost & Random Forest ML Models',
        'Audio Transcription & Lecture Summarization',
        'Sensor Data Analysis & Prediction',
      ],
      items_tr: [
        'AI Ajan Orkestrasyonu ve Görev Yaşam Döngüsü',
        'İnsan Onaylı Yürütme Akışları ve İzlenebilir Kayıtlar',
        'LLM API, MCP ve RAG Entegrasyonları',
        'XGBoost ve Random Forest Makine Öğrenmesi Modelleri',
        'Yapay Zeka Destekli İçerik ve Ders Özetleme',
        'Sensör Verisi Analizi ve Tahminleme Sistemleri',
      ],
    },
    {
      title_en: 'DevOps & Infra',
      title_tr: 'Geliştirme, Doğrulama ve Bulut Altyapısı',
      summary_en: 'Dockerized execution, CI/CD pipelines, automated test plans, and cloud deployment on Vercel & Cloudflare.',
      summary_tr: 'Docker tabanlı çalıştırma, otomatik test ve derleme kontrolleri, Vercel ve Cloudflare yayın süreçleri.',
      items: [
        'Git, Docker & Containerized Execution',
        'GitHub Actions CI/CD',
        'Vercel & Cloudflare Deployment',
        'Automated Test Plans & Build Checks',
        'Boot / Application Verification Controls',
        'KVKK / Security & Spam Protection',
      ],
      items_tr: [
        'Git ve Docker Tabanlı Çalıştırma',
        'GitHub Actions ile Sürekli Entegrasyon (CI/CD)',
        'Vercel ve Cloudflare Yayın Altyapısı',
        'Test Planları, Otomatik Test ve Derleme Kontrolleri',
        'Uygulama Başlatma ve Gereksinim Doğrulama Kontrolleri',
        'Güvenlik, KVKK Uyumu ve Spam Koruması',
      ],
    },
  ] satisfies SkillGroup[],

  availability: {
    en: 'Available for corporate web, mobile app, backend/AI projects, and engineering collaborations (open to relocation).',
    tr: 'Kurumsal web, mobil uygulama, backend/yapay zeka projeleri ve mühendislik iş birlikleri için uygun (şehir değişikliğine açık).',
  },

  education: {
    degree_en: 'B.Sc. Computer Engineering',
    degree_tr: 'Bilgisayar Mühendisliği Lisans',
    school_en: 'Fatih Sultan Mehmet Vakıf University',
    school_tr: 'Fatih Sultan Mehmet Vakıf Üniversitesi',
    graduation_en: 'June 2026',
    graduation_tr: 'Haziran 2026',
  } satisfies Education,

  certifications: [
    {
      issuer: 'Google',
      title: 'Foundations of Project Management',
      date: 'Jan 2026',
    },
    {
      issuer: 'DeepLearning.AI',
      title: 'Supervised Machine Learning: Regression and Classification',
      date: 'Nov 2025',
    },
  ] satisfies Certification[],

  languages: [
    { name_en: 'Turkish', name_tr: 'Türkçe', level_en: 'Native', level_tr: 'ana dil' },
    { name_en: 'English', name_tr: 'İngilizce', level_en: 'B2', level_tr: 'B2' },
  ] satisfies LanguageSkill[],
} as const;

export type Profile = typeof profile;
