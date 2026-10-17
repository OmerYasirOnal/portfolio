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
    en: 'Computer Engineer | Digital Product, Web & Mobile Solutions',
    tr: 'Bilgisayar Mühendisi | Dijital Ürün, Web ve Mobil Çözümler',
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
      'As a Computer Engineer, I help businesses and founders turn ideas into polished mobile apps, high-trust corporate websites, complete digital brand setups, and strong Google & AI search visibility.',
      'From App Store products like Odak and UniSum to full corporate web and brand platforms like Parla Deniz, Öz & Saye, and A2 Reklam.',
      'Computer Engineer in Istanbul delivering mobile applications, corporate web platforms, SEO / AIO optimization, and applied AI solutions.',
    ],
    tr: [
      'İşletmeler, markalar ve girişimler için mobil uygulama geliştirmeden kurumsal web sitelerine, dijital marka kurulumundan Google SEO ve yapay zeka araması (AIO) görünürlüğüne kadar tüm yazılım süreçlerini uçtan uca yönetiyorum.',
      'App Store’da yayında olan Odak ve UniSum gibi kendi ürünlerimden; Parla Deniz, Öz & Saye ve A2 Reklam gibi kurumsal marka projelerine kadar güven veren dijital çözümler üretiyorum.',
      'İstanbul merkezli Bilgisayar Mühendisi: mobil uygulama, kurumsal web, dijital marka altyapısı, SEO / AIO ve yapay zeka çözümleri.',
    ],
  },

  about: {
    en: 'Ömer Yasir Önal is a Computer Engineer based in Istanbul who builds and delivers digital products end to end. Beyond developing his own App Store products such as Odak (iOS, iPadOS, macOS) and UniSum, as well as the multi-agent AI platform AKIS, he partners with businesses like Parla Deniz, Öz & Saye Psikoloji, and A2 Reklam to establish their complete digital presence: high-speed corporate websites, custom management panels, corporate email and domain infrastructure, and next-generation Google SEO & AI Search Optimization (AIO). Rather than handing over disconnected pieces of code, he takes ownership of the entire journey so brands look prestigious, load instantly, and attract real clients. He is a Computer Engineering graduate from Fatih Sultan Mehmet Vakıf University (2026), a TÜBİTAK researcher, and an IEEE SIU 2025 published author.',
    tr: 'Ömer Yasir Önal, fikirleri ve markaları güçlü dijital ürünlere dönüştüren İstanbul merkezli bir bilgisayar mühendisidir. App Store’da yayında olan Odak (iPhone, iPad, Mac) ve UniSum uygulamalarını sıfırdan geliştirip kullanıma sunmuş; Parla Deniz, Öz & Saye Psikoloji ve A2 Reklam gibi farklı sektörlerdeki işletmeler için kurumsal web sitesi, özel yönetim sistemleri, dijital marka kurulumu ve Google / yapay zeka arama (AIO) altyapılarını uçtan uca hayata geçirmiştir. Bir projenin yalnızca yazılımını değil; markanın dijitalde güven vermesini, hızlı açılmasını, doğru müşteriye ulaşmasını ve uzun vadede sorunsuz çalışmasını tek muhatap olarak sahiplenir. Fatih Sultan Mehmet Vakıf Üniversitesi Bilgisayar Mühendisliği mezunu, TÜBİTAK araştırmacısı ve IEEE hakemli yayın yazarıdır.',
  },

  /** Signal badges for the About section. */
  badges: [
    { en: 'Published Apps on the App Store', tr: 'App Store’da Yayında Ürünler' },
    { en: 'Corporate Web & Brand Solutions', tr: 'Kurumsal Web ve Marka Çözümleri' },
    { en: 'Google SEO & AI Search (AIO)', tr: 'Google SEO ve Yapay Zeka Görünürlüğü' },
    { en: 'IEEE Published Computer Engineer', tr: 'IEEE Yayın Sahibi Bilgisayar Mühendisi' },
  ] satisfies Badge[],

  /** Six capability groups covering both client solutions and engineering depth. */
  skillGroups: [
    {
      title_en: 'Mobile & Native',
      title_tr: 'Mobil Uygulama Geliştirme',
      summary_en: 'Native iOS/macOS and cross-platform iOS & Android applications from concept to App Store launch.',
      summary_tr: 'Fikir aşamasından App Store ve Google Play yayınına kadar iPhone, iPad, Mac ve Android uygulamaları.',
      items: [
        'iOS, iPadOS & macOS Apps (Swift / SwiftUI)',
        'iOS & Android Cross-Platform (Flutter)',
        'iCloud Sync & Offline-First Architecture',
        'Live Activities, Dynamic Island & Widgets',
        'In-App Subscriptions & StoreKit',
        'App Store & Google Play Launch Management',
      ],
      items_tr: [
        'iPhone, iPad ve Mac Uygulamaları (SwiftUI)',
        'iOS ve Android Ortak Uygulama (Flutter)',
        'iCloud Senkronizasyonu ve Çevrimdışı Çalışma',
        'Kilit Ekranı Canlı Etkinlikler ve Widget’lar',
        'Uygulama İçi Satın Alma ve Abonelik Sistemleri',
        'App Store ve Google Play Mağaza Yayın Yönetimi',
      ],
    },
    {
      title_en: 'Frontend & Web',
      title_tr: 'Kurumsal Web ve Özel Sistemler',
      summary_en: 'Fast, prestigious corporate websites, multi-language platforms, and easy-to-use admin panels.',
      summary_tr: 'Markanıza güven kazandıran, saniyenin altında açılan web siteleri ve işinize özel yönetim panelleri.',
      items: [
        'High-Speed Corporate Websites (Astro & Next.js)',
        'Multi-Language Architecture (TR / EN / AR)',
        'Custom Admin & Content Management Panels',
        'Mobile-First & Conversion-Focused UI/UX',
        'Interactive Forms, WhatsApp & Lead Flows',
        'Appointment, Assessment & Portal Systems',
      ],
      items_tr: [
        'Yüksek Hızlı Kurumsal Web Siteleri',
        'Çok Dilli Site Mimarisi (Türkçe / İngilizce / Arapça)',
        'Size Özel Yönetim ve İçerik Panelleri',
        'Mobil Uyumlu ve Dönüşüm Odaklı Tasarım',
        'Teklif Formu, Randevu ve WhatsApp Akışları',
        'Online Ölçek, Blog ve Müşteri Portalları',
      ],
    },
    {
      title_en: 'Brand, SEO & AIO',
      title_tr: 'Dijital Marka, SEO ve Yapay Zeka Araması',
      summary_en: 'Complete digital brand setup and top visibility across Google Search, Maps, and AI assistants.',
      summary_tr: 'Sıfırdan dijital marka kurulumu; Google, Haritalar ve ChatGPT/Gemini gibi yapay zeka aramalarında öne çıkma.',
      items: [
        'Google SEO & Local Search Dominance',
        'AI Search Optimization / AIO (ChatGPT, Gemini)',
        'Domain, DNS & SSL Security Setup',
        'Corporate Email Setup (info@yourbrand.com)',
        'Google Business Profile (Maps) & Reviews',
        'Google Analytics (GA4) & Ads Conversion Setup',
      ],
      items_tr: [
        'Google Arama ve Yerel SEO Optimizasyonu',
        'Yapay Zeka Araması / AIO (ChatGPT, Gemini, Perplexity)',
        'Alan Adı (Domain), DNS ve Güvenlik Kurulumu',
        'Kurumsal E-posta Kurulumu (info@markaniz.com)',
        'Google İşletme Profili (Haritalar) Kaydı',
        'Google Analytics (GA4) ve Reklam Dönüşüm Takibi',
      ],
    },
    {
      title_en: 'AI & LLM Engineering',
      title_tr: 'Yapay Zeka ve İş Otomasyonu',
      summary_en: 'Intelligent assistants, document/audio summarization, and automated workflows tailored to your operations.',
      summary_tr: 'İş süreçlerinizi hızlandıran yapay zeka asistanları, belge/ses özetleme ve akıllı otomasyon sistemleri.',
      items: [
        'Custom AI Assistants & Chatbots',
        'Audio Transcription & Document Summarization',
        'Multi-Agent Workflow Automation',
        'Knowledge-Base Search (RAG Systems)',
        'OpenAI, Claude & Gemini Integrations',
        'Applied Machine Learning & Data Analysis',
      ],
      items_tr: [
        'Kuruma Özel Yapay Zeka Asistanları',
        'Ses Kaydı ve Doküman Özetleme Sistemleri',
        'Çok Ajanlı İş Akışı Otomasyonu',
        'Kurumsal Bilgi Bankası Arama (RAG)',
        'OpenAI, Claude ve Gemini Entegrasyonları',
        'Makine Öğrenmesi ve Veri Analizi',
      ],
    },
    {
      title_en: 'Backend & APIs',
      title_tr: 'Özel Yazılım ve Veritabanı Altyapısı',
      summary_en: 'Secure, scalable server architectures and databases that keep your applications running smoothly.',
      summary_tr: 'Web ve mobil ürünlerinizin arkasında güvenli, hızlı ve kesintisiz çalışan sunucu ve veritabanı sistemleri.',
      items: [
        'Node.js & Python (FastAPI) Backends',
        'PostgreSQL, MySQL & Oracle Databases',
        'REST APIs & Third-Party Integrations',
        'Role-Based Access & User Authentication',
        'Automated Email & Notification Pipelines',
        'Data Modeling & Query Optimization',
      ],
      items_tr: [
        'Güvenli Sunucu ve API Geliştirme (Node.js, Python)',
        'Kurumsal Veritabanı Mimarisi (PostgreSQL, MySQL)',
        'Rol Bazlı Yetkilendirme ve Güvenli Giriş',
        'Otomatik E-posta ve Bildirim Sistemleri',
        'Dış Servis ve Ödeme Entegrasyonları',
        'Performans ve Veri Güvenliği Optimizasyonu',
      ],
    },
    {
      title_en: 'DevOps & Infra',
      title_tr: 'Yayın, Güvenlik ve Süreklilik',
      summary_en: 'Cloud hosting, security protection, KVKK compliance, and ongoing technical maintenance.',
      summary_tr: 'Sitenizin ve uygulamanızın her zaman hızlı, güvenli ve güncel kalmasını sağlayan yayın ve bakım altyapısı.',
      items: [
        'Cloudflare Edge Security & CDN',
        'Automated Testing & Continuous Delivery',
        'KVKK / GDPR Compliant Forms & Privacy',
        'Spam Protection & Rate Limiting',
        'Docker & Cloud Server Management',
        'Post-Launch Maintenance & Support',
      ],
      items_tr: [
        'Cloudflare Güvenlik Duvarı ve Hızlandırma (CDN)',
        'KVKK Uyumlu Form ve Veri Akışları',
        'Spam Koruması ve Güvenlik Katmanları',
        'Kesintisiz Bulut Sunucu ve Yayın Yönetimi',
        'Otomatik Yedekleme ve Kalite Kontrolleri',
        'Yayın Sonrası Teknik Destek ve Bakım',
      ],
    },
  ] satisfies SkillGroup[],

  availability: {
    en: 'Available for corporate web, mobile app, brand setup, and custom software projects.',
    tr: 'Kurumsal web sitesi, mobil uygulama, dijital marka kurulumu ve özel yazılım projeleriniz için iletişime geçebilirsiniz.',
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
