/**
 * CV-only data layer.
 *
 * These are the facts that live ONLY on the résumé and are deliberately not
 * published on the site (contact phone, the long-form professional summary,
 * and the CV's own section labels). Everything else the PDF needs — name,
 * role, location, email, links, skill groups, education, certifications and
 * languages — is REUSED from `profile.ts` and the content collections; it is
 * never duplicated here.
 *
 * Consumed by `src/pages/cv-print/[lang].astro`, the render source for the two
 * generated PDFs (`public/cv/omer-yasir-onal-{en,tr}.pdf`).
 */
import type { Locale } from './i18n';

export interface CvSummary {
  en: string;
  tr: string;
}

export const cv = {
  /** Not published on the public site — résumé contact line only. */
  phone: '+90 532 309 0261',

  /** Extra contact endpoints shown on the CV contact line (spec note). */
  website: 'https://omeryasironal.com',

  /** Long-form professional summary (résumé opener). */
  summary: {
    en: 'Back-end & applied-AI engineer with hands-on experience building production-oriented systems, LLM integrations, and workflow automation. Comfortable across Node.js/Python backends, SQL, and multi-agent/agentic architectures, with React and native mobile (SwiftUI, Flutter) delivery. A fast learner who ships applicable solutions within real constraints. Open to part-time, internship, or junior full-time roles working on AI agents, agentic workflows, and back-end systems within an established team.',
    tr: 'Üretim ortamına yönelik back-end geliştirme, uygulamalı yapay zeka ve iş akışı otomasyonu alanlarında uygulamalı deneyime sahip. Node.js, Python ve SQL ile üretim odaklı sistemler ve LLM entegrasyonları geliştirdi; React ve mobil (SwiftUI, Flutter) deneyimiyle uçtan uca katkı sağlar. Bilmediği konuları hızla öğrenip kısıtlar içinde uygulanabilir çözümler üretir. Yerleşik bir ekipte AI agent’lar, agentic workflow’lar ve back-end sistemler üzerinde part-time, staj veya junior tam zamanlı fırsatlar arıyor.',
  } satisfies CvSummary,

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
