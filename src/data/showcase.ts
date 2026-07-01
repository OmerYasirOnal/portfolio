/**
 * Visual project-showcase data layer (print-only).
 *
 * Drives `src/pages/cv-print/showcase.astro`, the render source for the
 * one-page visual companion PDF (`public/cv/omer-yasir-onal-showcase.pdf`).
 * Unlike the text CV, this page is a VISUAL piece — image cards are fine here
 * (it is not an ATS document).
 *
 * Each card mostly REUSES the content-collection project entry (title, tech
 * stack, primary link) via its `slug`; only the one-line showcase description
 * and the screenshot filename live here. The portfolio card has no collection
 * entry, so its title / stack / link are defined inline.
 */

/** A card that features a full-width screenshot. */
export interface ShowcaseVisualCard {
  /** Content-collection project id, when the card is backed by one. */
  slug?: string;
  /** Screenshot filename under `src/assets/showcase/`. */
  image: string;
  /** One-line, verified description shown under the title. */
  desc: string;
  /** Inline fields for a card with no collection entry (the portfolio itself). */
  title?: string;
  stack?: string[];
  link?: string;
}

/** A compact card with no screenshot, backed by a collection entry. */
export interface ShowcaseTextCard {
  slug: string;
  desc: string;
}

export const showcase = {
  header: {
    /** ASCII-folded at render time for a clean, print-safe header. */
    name: 'Ömer Yasir Önal',
    tagline: 'Selected Work',
    site: 'omeryasironal.com',
  },

  /** Flagship, visual-first projects — screenshot on top. */
  visual: [
    {
      slug: 'akis',
      image: 'akis.jpg',
      desc: 'Live, open-source multi-agent AI build platform behind 4 structural human-approval gates.',
    },
    {
      slug: 'a2reklam',
      image: 'a2reklam.jpg',
      desc: 'Freelance corporate site, live in production — 341-page trilingual (TR/EN/AR) Astro build.',
    },
    {
      // No collection entry: this portfolio site itself.
      image: 'portfolio.jpg',
      title: 'Portfolio',
      desc: 'This site — a bilingual (EN/TR), data-driven Astro build that also generates its own PDF CVs.',
      stack: ['Astro 5', 'Tailwind CSS', 'TypeScript'],
      link: 'https://omeryasironal.com',
    },
  ] satisfies ShowcaseVisualCard[],

  /** Compact text cards so the top 5 projects are all represented. */
  text: [
    {
      slug: 'unisum',
      desc: 'Native SwiftUI iOS app, live on the App Store, on a self-built Node/Express/MySQL API.',
    },
    {
      slug: 'newbrain',
      desc: 'A ~42M-parameter causal GPT built from scratch in PyTorch (own BPE tokenizer, RoPE/SwiGLU).',
    },
  ] satisfies ShowcaseTextCard[],
} as const;

export type Showcase = typeof showcase;
