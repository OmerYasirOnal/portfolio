/**
 * Visual project-showcase data layer (print-only).
 *
 * Drives `src/pages/cv-print/showcase.astro`, the render source for the
 * one-page visual companion PDF (`public/cv/omer-yasir-onal-showcase.pdf`).
 */

export interface ShowcaseVisualCard {
  slug?: string;
  image: string;
  desc: string;
  title?: string;
  stack?: string[];
  link?: string;
}

export interface ShowcaseTextCard {
  slug: string;
  desc: string;
}

export const showcase = {
  header: {
    name: 'Ömer Yasir Önal',
    tagline: 'Selected Work',
    site: 'omeryasironal.com',
  },

  /** Flagship, visual-first projects with screenshots. */
  visual: [
    {
      slug: 'odak',
      image: 'odak.jpg',
      desc: 'Native SwiftUI task, planning & Pomodoro app on the App Store for iOS, iPadOS & macOS.',
    },
    {
      slug: 'parladeniz',
      image: 'parladeniz.jpg',
      desc: 'End-to-end corporate web, brand setup & SEO/AIO architecture for Parla Deniz in Nisantasi.',
    },
    {
      slug: 'akis',
      image: 'akis.jpg',
      desc: 'Open-source multi-agent AI software platform with 4 structural human-approval gates.',
    },
  ] satisfies ShowcaseVisualCard[],

  /** Compact text cards for additional flagship projects. */
  text: [
    {
      slug: 'unisum',
      desc: 'AI-powered lecture summarization & academic tracker on the App Store (Flutter/SwiftUI + FastAPI/MySQL).',
    },
    {
      slug: 'ozsaye',
      desc: 'Full-stack psychotherapy clinic platform at ozsaye.com with Next.js 16, PostgreSQL & custom CMS.',
    },
  ] satisfies ShowcaseTextCard[],
} as const;

export type Showcase = typeof showcase;
