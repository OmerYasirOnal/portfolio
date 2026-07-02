import { z } from 'astro/zod';

/**
 * Plain Zod schemas for the site's content collections.
 *
 * These are defined here (independent of `astro:content`) so they can be
 * unit-tested directly with Vitest. `src/content.config.ts` wraps each one in
 * `defineCollection` — this module stays the single source of truth for the
 * frontmatter shape.
 */

const linkSet = z
  .object({
    repo: z.string().url().optional(),
    live: z.string().url().optional(),
    appstore: z.string().url().optional(),
    other: z.string().url().optional(),
  })
  .default({});

export const projectSchema = z.object({
  title: z.string(),
  tagline_en: z.string(),
  tagline_tr: z.string(),
  category: z.enum([
    'AI-Agents',
    'Applied-AI',
    'ML-Research',
    'Mobile',
    'Web',
    'DevTool',
    'Networking',
    'Other',
  ]),
  stack: z.array(z.string()).min(1),
  status_en: z.string(),
  status_tr: z.string(),
  links: linkSet,
  highlights_en: z.array(z.string()).default([]),
  highlights_tr: z.array(z.string()).default([]),
  problem_en: z.string().optional(),
  problem_tr: z.string().optional(),
  what_i_did_en: z.string().optional(),
  what_i_did_tr: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(99),
  draft: z.boolean().default(false),
});

export const experienceSchema = z.object({
  role_en: z.string(),
  role_tr: z.string(),
  org: z.string(),
  location: z.string().default('Istanbul'),
  start: z.string(),
  end: z.string(),
  bullets_en: z.array(z.string()),
  bullets_tr: z.array(z.string()),
  order: z.number(),
});

export const writingSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  source: z.string(),
  /** ISO date the article was published, e.g. "2025-12-19". Drives newest-first ordering. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  /** Language the article is written in. Surfaced as a TR/EN tag. */
  lang: z.enum(['tr', 'en']),
  order: z.number().default(99),
  /**
   * When true, this article is surfaced in the curated home-page writing
   * section (newest-first among the flagged entries). `/writing` always lists
   * every article regardless of this flag.
   */
  home: z.boolean().default(false),
});

export const publicationSchema = z.object({
  title_en: z.string(),
  title_tr: z.string(),
  venue: z.string(),
  year: z.number(),
  url: z.string().url().optional(),
});

/** ISO calendar date, e.g. "2026-07-01". */
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD');

export const postSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  /** Publish date — drives newest-first ordering and datePublished. */
  date: isoDate,
  /** Last substantive revision — feeds dateModified when present. */
  updated: isoDate.optional(),
  /** Language the post body is written in. */
  lang: z.enum(['en', 'tr']),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  /** Surfaced in the curated home-page writing section when true. */
  home: z.boolean().default(false),
  /** Optional cover image path (public/-relative); replaces the generated OG card when set. */
  cover: z.string().optional(),
  /**
   * External canonical URL when the post is a republication. Setting this
   * makes the page defer to that URL (rel=canonical + og:url) and suppresses
   * its hreflang alternates.
   */
  canonical: z.string().url().optional(),
});

export const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  /** Language the course is written in. */
  lang: z.enum(['en', 'tr']),
  tags: z.array(z.string()).default([]),
  order: z.number().default(99),
  draft: z.boolean().default(false),
});

export const lessonSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});
