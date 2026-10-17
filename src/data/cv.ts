/**
 * CV-only data layer.
 *
 * Synced 100% with the user's latest 2-page CV (Oct 2026) and zero em dashes.
 */
import type { Locale } from './i18n';

export interface CvSummary {
  en: string;
  tr: string;
}

export interface CvProject {
  slug: string;
  en: string;
  tr: string;
}

export const cv = {
  /** Not published on the public site; résumé contact line only. */
  phone: '+90 532 309 0261',

  /** Extra contact endpoints shown on the CV contact line. */
  website: 'https://omeryasironal.com',

  availabilityRemote: 'Open to relocation, remote/international, and freelance roles (UTC+3)',
  gdprConsent:
    'I consent to the processing of my personal data for recruitment purposes (GDPR).',

  /** Long-form professional summary matching the uploaded CV. */
  summary: {
    en: 'Computer Engineer focused on developing APIs and databases with Node.js and Python. Published UniSum on the App Store with its own backend and Odak across iPhone, iPad, and Mac; took full responsibility for scope, implementation, testing, and delivery in client projects (Öz & Saye Psikoloji, A2 Reklam, Parla Deniz). Built AKIS for AI agent orchestration as my university capstone project, and co-authored an IEEE SIU 2025 paper from a TÜBİTAK 2209-A research project.',
    tr: 'Node.js ve Python ile API ve veri tabanı geliştirmeye odaklanan bilgisayar mühendisiyim. UniSum’u kendi backend’iyle App Store’da yayımladım; müşteri projelerinde kapsam, uygulama, test ve teslim sorumluluğu aldım. Yeni teknolojileri proje ihtiyaçlarına göre öğreniyor; geliştirdiğim çözümleri gereksinimlere uygunluk, otomatik testler ve uygulama kontrolleriyle doğruluyorum.',
  } satisfies CvSummary,

  /**
   * Curated, ordered résumé projects matching the CV.
   */
  projects: [
    {
      slug: 'unisum',
      en: 'App Store published product: Developed a SwiftUI application and Node.js/Express/MySQL REST API for academic performance tracking. Implemented JWT/bcrypt authentication, CORS, and rate limiting.',
      tr: 'App Store’da yayımlanan ürün: Akademik performans takibi için SwiftUI uygulaması ve Node.js/Express/MySQL REST API geliştirdim. JWT/bcrypt ile kimlik doğrulama, CORS ve istek sınırlama uyguladım.',
    },
    {
      slug: 'akis',
      en: 'University capstone project | AI agent orchestration: Built agent task lifecycle, traceable logs, and human-approved execution flows with TypeScript/Node.js and PostgreSQL. Combined MCP and LLM API integrations, Dockerized execution, and test/build checks verifying that generated applications boot.',
      tr: 'Üniversite bitirme projesi | AI ajan orkestrasyonu: TypeScript/Node.js ve PostgreSQL ile ajan görev yaşam döngüsü, izlenebilir kayıtlar ve insan onaylı yürütme akışları geliştirdim. MCP ve LLM API entegrasyonlarını, Docker tabanlı çalıştırmayı ve test/derleme kontrollerini bir araya getirdim.',
    },
    {
      slug: 'odak',
      en: 'Multi-platform product: Built a SwiftUI task and Pomodoro application for iPhone, iPad, and Mac using shared SwiftPM business logic, SwiftData, and iCloud sync.',
      tr: 'Çok platformlu ürün: iPhone, iPad ve Mac için SwiftUI görev ve Pomodoro uygulaması geliştirdim; ortak SwiftPM iş mantığı, SwiftData ve iCloud eşitlemesi kullandım.',
    },
    {
      slug: 'ozsaye',
      en: 'Built an SEO/AIO-focused corporate website and custom management panel supporting content management and application workflows using Next.js and PostgreSQL (ozsaye.com).',
      tr: 'Next.js ve PostgreSQL ile SEO/AIO odaklı kurumsal web sitesi, içerik yönetimi ve başvuru süreçlerini destekleyen yönetim paneli geliştirdim (ozsaye.com).',
    },
    {
      slug: 'a2reklam',
      en: 'Built a multi-language corporate website with Astro and Cloudflare, established SEO and GTM/GA4 analytics infrastructure, and manage Google Ads campaigns (a2reklam.com).',
      tr: 'Astro ve Cloudflare ile çok dilli kurumsal web sitesi geliştirdim; SEO ve GTM/GA4 ölçüm altyapısını kurdum. Google Ads kampanya yönetimini sürdürüyorum (a2reklam.com).',
    },
    {
      slug: 'parladeniz',
      en: 'Built an SEO/AIO-focused Turkish and English website; managed service/blog content presentation, domain/email configuration, and launch processes (parladeniz.com).',
      tr: 'SEO/AIO odaklı Türkçe ve İngilizce web sitesi geliştirdim; hizmet ve blog içeriklerinin sunumu, alan adı/e-posta yapılandırması ve yayına alma süreçlerini yürüttüm (parladeniz.com).',
    },
  ] satisfies CvProject[],

  skills: {
    order: ['Backend & APIs', 'AI & LLM Engineering', 'Brand, SEO & AIO', 'DevOps & Infra'],
    frontendMobile: {
      title_en: 'Web & Mobile',
      title_tr: 'Web ve Mobil',
      en: 'Next.js, React, Astro, Tailwind CSS, SwiftUI',
      tr: 'Next.js, React, Astro, Tailwind CSS, SwiftUI',
    },
  },

  education: {
    degree: {
      en: 'B.Sc. Computer Engineering',
      tr: 'Bilgisayar Mühendisliği Lisans',
    },
  },

  writing: {
    en: 'Author of {n} Medium articles on software architecture and AI systems',
    tr: 'Yazılım mimarisi ve yapay zeka sistemleri üzerine {n} Medium yazısının yazarı',
  },

  sections: {
    summary: { en: 'Profile', tr: 'Profil' },
    skills: { en: 'Technical Skills', tr: 'Teknik Yetkinlikler' },
    experience: { en: 'Experience', tr: 'Deneyim' },
    projects: { en: 'Selected Projects', tr: 'Seçili Projeler' },
    publications: { en: 'Publications', tr: 'Yayınlar' },
    writing: { en: 'Writing', tr: 'Yazılar' },
    certifications: { en: 'Certifications', tr: 'Sertifikalar' },
    education: { en: 'Education', tr: 'Eğitim' },
    languages: { en: 'Languages', tr: 'Diller' },
  } satisfies Record<string, Record<Locale, string>>,
} as const;

export type Cv = typeof cv;
