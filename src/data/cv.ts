/**
 * CV-only data layer.
 *
 * Synced with the user's latest 2-page CV (Oct 2026) and zero em dashes.
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

  availabilityRemote: 'Open to remote / international and freelance roles (UTC+3)',
  gdprConsent:
    'I consent to the processing of my personal data for recruitment purposes (GDPR).',

  /** Long-form professional summary matching the latest CV. */
  summary: {
    en: 'Final-year Computer Engineering background (graduated June 2026) with a focus on backend services and applied AI systems. I built AKIS, an agent-assisted software workflow platform with human approval gates and cryptographic build provenance, and shipped Odak (native SwiftUI iOS/iPadOS/macOS) and UniSum (Flutter/SwiftUI + FastAPI/Node + MySQL) to the App Store. I also deliver end-to-end corporate web, brand infrastructure, and SEO/AIO solutions (Parla Deniz, Öz & Saye, A2 Reklam). Author of an IEEE SIU 2025 paper produced from a TÜBİTAK 2209-A research project.',
    tr: 'Backend servisleri, mobil uygulama geliştirme, kurumsal web altyapıları ve uygulamalı yapay zeka sistemleri odağında çalışan Bilgisayar Mühendisi. İnsan onay kapıları ve kriptografik build provenance içeren çok ajanlı yazılım platformu AKIS’i geliştirdim; native SwiftUI ile geliştirdiğim Odak (iOS, iPadOS, macOS) ve UniSum uygulamalarını App Store’da yayınladım. Kurumsal markalar için uçtan uca web sitesi, yönetim paneli ve SEO/AIO altyapıları (Parla Deniz, Öz & Saye, A2 Reklam) kuruyorum. TÜBİTAK 2209-A araştırma projesinden üretilen IEEE SIU 2025 bildirisinin ilk yazarıyım.',
  } satisfies CvSummary,

  /**
   * Curated, ordered résumé projects matching the CV + client highlights.
   */
  projects: [
    {
      slug: 'odak',
      en: 'Native SwiftUI task, planning, and Pomodoro focus app live on the App Store across iOS, iPadOS, and macOS. Shared SwiftPM core (OdakKit), SwiftData + CloudKit iCloud sync, ActivityKit Live Activity & Dynamic Island, WidgetKit, and native macOS menu bar timer.',
      tr: 'iOS, iPadOS ve macOS için App Store’da yayında olan native SwiftUI görev, planlama ve Pomodoro odak uygulaması. Ortak SwiftPM çekirdeği (OdakKit), SwiftData ve CloudKit ile iCloud senkronizasyonu, ActivityKit Canlı Etkinlik / Dynamic Island, WidgetKit ve macOS menü çubuğu sayacı.',
    },
    {
      slug: 'unisum',
      en: 'AI-powered university course summarization and academic tracking platform live on the App Store. Combines mobile client, asynchronous Python/FastAPI and Node/Express REST APIs, MySQL persistence, and LLM-based structured lecture summarization.',
      tr: 'App Store’da yayında olan yapay zeka destekli üniversite ders özetleme ve akademik takip platformu. Mobil istemci, Python/FastAPI ve Node/Express tabanlı REST API, MySQL veri katmanı ve LLM tabanlı yapılandırılmış ders özetleme akışı.',
    },
    {
      slug: 'akis',
      en: 'Open-source (Apache-2.0) multi-agent AI software platform: an orchestrator dispatching 5 role-separated agents behind 4 structural human-approval gates and a verification loop; Ed25519-signed build provenance and OWASP-LLM guardrails.',
      tr: 'Açık kaynak (Apache-2.0) çok ajanlı yapay zeka yazılım platformu: 5 rol ayrık ajanı 4 yapısal insan onay kapısı ve doğrulama döngüsü ardında yöneten orkestratör; Ed25519 imzalı build provenance ve OWASP-LLM güvenlik katmanları.',
    },
    {
      slug: 'parladeniz',
      en: 'End-to-end corporate web and brand infrastructure for Parla Deniz Aesthetic in Nişantaşı (parladeniz.com): bilingual TR/EN Astro + Tailwind site, BeautySalon Schema.org JSON-LD, llms.txt AIO corpus, Cloudflare DNS/Email Routing, and Google Business Profile.',
      tr: 'Nişantaşı Parla Deniz Güzellik Merkezi (parladeniz.com) için uçtan uca kurumsal web ve marka kurulumu: iki dilli (TR/EN) Astro + Tailwind sitesi, BeautySalon Schema.org JSON-LD, llms.txt AIO mimarisi, Cloudflare DNS/E-posta ve Google İşletme Profili.',
    },
    {
      slug: 'ozsaye',
      en: 'Full-stack psychotherapy clinic platform live at ozsaye.com: Next.js 16 + React 19 + PostgreSQL/Prisma with a custom RBAC admin CMS, dynamic clinical test scoring engine, appointment leads, and automated sitemap/SEO.',
      tr: 'ozsaye.com adresinde yayında olan full-stack psikoterapi kliniği platformu: Next.js 16, React 19 ve PostgreSQL/Prisma üzerinde rol bazlı özel yönetim paneli, dinamik klinik ölçek puanlama motoru, randevu yönetimi ve teknik SEO.',
    },
    {
      slug: 'a2reklam',
      en: 'Corporate web and local SEO infrastructure live at a2reklam.com: 341-page trilingual (TR/EN/AR) Astro static platform covering 39 Istanbul districts, Schema.org JSON-LD, GTM/GA4 conversion tracking, and hardened contact endpoint.',
      tr: 'a2reklam.com adresinde yayında olan kurumsal web ve yerel SEO platformu: İstanbul’un 39 ilçesini kapsayan 341 sayfalık üç dilli (TR/EN/AR) Astro mimarisi, Schema.org JSON-LD, GTM/GA4 dönüşüm takibi ve güvenli teklif uç noktası.',
    },
  ] satisfies CvProject[],

  skills: {
    order: ['Backend & APIs', 'AI & LLM Engineering', 'Brand, SEO & AIO', 'DevOps & Infra'],
    frontendMobile: {
      title_en: 'Mobile & Web',
      title_tr: 'Mobil & Web',
      en: 'Swift 6 / SwiftUI (iOS, iPadOS, macOS), Flutter / Dart, SwiftData, CloudKit · Astro, Next.js, React, TypeScript, Tailwind CSS',
      tr: 'Swift 6 / SwiftUI (iOS, iPadOS, macOS), Flutter / Dart, SwiftData, CloudKit · Astro, Next.js, React, TypeScript, Tailwind CSS',
    },
  },

  education: {
    degree: {
      en: 'B.Sc. Computer Engineering (50% English-medium)',
      tr: 'Bilgisayar Mühendisliği (Lisans, %50 İngilizce)',
    },
  },

  writing: {
    en: 'Author of {n} Medium articles on software architecture and AI agents',
    tr: 'Yazılım mimarisi ve yapay zeka ajanları üzerine {n} Medium yazısının yazarı',
  },

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
