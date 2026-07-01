/**
 * CV-only data layer.
 *
 * These are the facts and framing that live ONLY on the résumé and are
 * deliberately not published on the site: the contact phone, the long-form
 * professional summary, the CV's own section labels, the curated project set
 * with its résumé-specific impact lines, the CV-specific skill ordering, and
 * the education degree line's medium-of-instruction detail.
 *
 * Everything else the PDF needs — name, role, location, email, links, the raw
 * skill-group items, school/graduation, certifications and languages — is
 * REUSED from `profile.ts` and the content collections; it is never duplicated
 * here.
 *
 * Consumed by `src/pages/cv-print/[lang].astro`, the render source for the two
 * generated PDFs (`public/cv/omer-yasir-onal-{en,tr}.pdf`).
 */
import type { Locale } from './i18n';

export interface CvSummary {
  en: string;
  tr: string;
}

/**
 * A curated résumé project. `slug` is a content-collection entry id (the
 * project markdown filename, e.g. `akis`); the CV reuses that entry for the
 * tech line + primary link and shows `en`/`tr` as a one-line impact note.
 */
export interface CvProject {
  slug: string;
  en: string;
  tr: string;
}

export const cv = {
  /** Not published on the public site — résumé contact line only. */
  phone: '+90 532 309 0261',

  /** Extra contact endpoints shown on the CV contact line (spec note). */
  website: 'https://omeryasironal.com',

  /**
   * English-only lines shown ONLY on the international `en` / EU `eu` PDF
   * variants (never on the Turkish résumé):
   *  - `availabilityRemote` — a one-line remote/international availability note.
   *  - `gdprConsent` — the recruitment-data consent footer required on the `eu`
   *    variant for GDPR-compliant applications.
   */
  availabilityRemote: 'Open to remote / international roles (UTC+3)',
  gdprConsent:
    'I consent to the processing of my personal data for recruitment purposes (GDPR).',

  /** Long-form professional summary (résumé opener) — proof-led, security-leaning. */
  summary: {
    en: "Computer Engineering new-grad and back-end & applied-AI engineer — AI Fellow (1,500 of 31,700, ~top 5%) and IEEE SIU 2025 author. I build verifiable, security-minded systems: at AKIS — a live multi-agent AI platform (akisflow.com) — I designed four structural human-approval gates, Ed25519-signed build provenance, and OWASP-LLM safety guardrails, and I shipped UniSum to the App Store on my own Node/MySQL API. Hands-on with Node.js/Python back-ends, PostgreSQL, Docker and CI/CD, and LLM/agent orchestration. Open to junior / entry-level full-time (and freelance) roles.",
    tr: "Yeni Bilgisayar Mühendisliği mezunu, back-end & uygulamalı yapay zeka mühendisi — AI Fellow (31.700 başvuru içinden 1.500 kişi, ~ilk %5) ve IEEE SIU 2025 bildirisi yazarı. Doğrulanabilir, güvenlik odaklı sistemler kuruyorum: canlı çok-ajanlı yapay zeka platformu AKIS'te (akisflow.com) dört yapısal insan-onay kapısı, Ed25519 imzalı build provenance ve OWASP-LLM güvenlik korumaları tasarladım; UniSum'u kendi Node/MySQL API'imle App Store'a çıkardım. Node.js/Python back-end, PostgreSQL, Docker ve CI/CD ile LLM/agent orkestrasyonunda uygulamalı deneyim. Junior / entry-level tam zamanlı (ve freelance) fırsatlara açığım.",
  } satisfies CvSummary,

  /**
   * Curated, ordered résumé projects (a subset of the site's featured set),
   * each with a CV-only impact line. `cv-print/[lang].astro` renders these in
   * order and reuses the matching content-collection entry for tech + link.
   */
  projects: [
    {
      slug: 'akis',
      en: "Live, open-source (Apache-2.0) multi-agent AI build platform: an orchestrator dispatching 5 role-separated agents behind 4 structural human-approval gates and an adversarial gate-keeper/reviewer loop; a task is 'done' only after a real boot-smoke test passes. ~1,800 backend + ~700 frontend automated tests green; Ed25519-signed build provenance; OWASP-LLM06 (Excessive Agency) guardrails; Docker image −198MB. Self-hosted at akisflow.com.",
      tr: "Canlı, açık kaynak (Apache-2.0) çok-ajanlı yapay zeka derleme platformu: 5 rol-ayrık ajanı, 4 yapısal insan-onay kapısı ve rakip bir gate-keeper/reviewer döngüsü ardında yöneten bir orkestratör; bir görev ancak gerçek bir boot-smoke testi geçtikten sonra 'tamamlandı' sayılır. ~1.800 backend + ~700 frontend otomatik test yeşil; Ed25519 imzalı build provenance; OWASP-LLM06 (Aşırı Yetki) korumaları; Docker imajı −198MB. akisflow.com'da self-hosted.",
    },
    {
      slug: 'unisum',
      en: 'Shipped to the App Store — native SwiftUI client on a self-built Node/Express/MySQL REST API with JWT/bcrypt auth, hardened with helmet, CORS and rate-limiting.',
      tr: "App Store'da yayında — kendi geliştirdiğim Node/Express/MySQL REST API üzerinde JWT/bcrypt kimlik doğrulamalı native SwiftUI istemci; helmet, CORS ve rate-limiting ile sertleştirildi.",
    },
    {
      slug: 'newbrain',
      en: 'A ~42M-parameter causal GPT built from scratch in PyTorch (own BPE tokenizer, RoPE/SwiGLU) with MLX LoRA fine-tuning — the fundamentals beneath the frameworks.',
      tr: "PyTorch ile sıfırdan geliştirilmiş ~42M parametreli nedensel bir GPT (kendi BPE tokenizer'ı, RoPE/SwiGLU) ve MLX LoRA ince ayarı — framework'lerin altındaki temeller.",
    },
    {
      slug: 'a2reklam',
      en: 'Freelance corporate site live in production — 341-page trilingual (TR/EN/AR) Astro build with Schema.org local-SEO and a hardened PHP endpoint (honeypot, rate-limit).',
      tr: 'Yayında olan freelance kurumsal site — Schema.org yerel-SEO ve sertleştirilmiş PHP uç noktası (honeypot, rate-limit) içeren 341 sayfalık üç dilli (TR/EN/AR) Astro sitesi.',
    },
    {
      slug: 'studio',
      en: 'Multi-agent game-development framework (16 specialist agents coordinating via the filesystem); Three.js + Capacitor, zero paid APIs.',
      tr: 'Çok-ajanlı oyun geliştirme çatısı (dosya sistemi üzerinden koordine olan 16 uzman ajan); Three.js + Capacitor, ücretli API yok.',
    },
  ] satisfies CvProject[],

  /**
   * CV-specific skill presentation. A reviewer for a security / back-end role
   * scans top-down, so the résumé leads with Security & Trust and Backend, then
   * AI and DevOps — a different order from the site's `profile.skillGroups`.
   * `order` references those groups by their English title (each rendered as
   * its own line); Frontend + Mobile are folded into one condensed, version-free
   * line to save space.
   */
  skills: {
    order: ['Security & Trust', 'Backend & APIs', 'AI & LLM Engineering', 'DevOps & Infra'],
    frontendMobile: {
      title_en: 'Frontend & Mobile',
      title_tr: 'Frontend & Mobil',
      en: 'React, Next.js, Astro, Tailwind, Three.js / R3F, Vite · Swift 6 / SwiftUI, Flutter / Dart, Capacitor, Firebase, App Store delivery',
      tr: 'React, Next.js, Astro, Tailwind, Three.js / R3F, Vite · Swift 6 / SwiftUI, Flutter / Dart, Capacitor, Firebase, App Store teslimi',
    },
  },

  /**
   * CV-only education framing: the degree line carries the medium-of-instruction
   * detail (which also evidences the English level). No GPA is displayed
   * (best practice for a sub-3.0 GPA). School + graduation are reused from
   * `profile.education`.
   */
  education: {
    degree: {
      en: 'B.Sc. Computer Engineering (50% English-medium)',
      tr: 'Bilgisayar Mühendisliği (Lisans, %50 İngilizce)',
    },
  },

  /** Writing collapses to a single line; `{n}` is filled from the writing collection. */
  writing: {
    en: 'Author of {n} Medium articles on AI agents',
    tr: 'AI ajanları üzerine {n} Medium yazısının yazarı',
  },

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
