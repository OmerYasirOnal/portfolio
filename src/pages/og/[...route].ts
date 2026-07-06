/**
 * Build-time OpenGraph image generator.
 *
 * Emits one branded 1200x630 PNG for the home page and one per project (both
 * EN and TR variants), rendered with `astro-og-canvas`. The visual language
 * matches the site's "dev-tools minimal" tokens: near-black gradient, off-white
 * heading (Inter), muted monospace sub-line (JetBrains Mono) and an accent
 * (#a78bfa) edge stripe.
 *
 * Generated routes (the `pages` keys become the file path, `.png` appended):
 *   /og/home.png              /og/home-tr.png
 *   /og/projects/<id>.png     /og/projects/<id>-tr.png
 *   /og/projects-index.png    /og/projects-index-tr.png
 *   /og/writing.png           /og/writing-tr.png
 *   /og/writing/<id>.png      /og/writing/<id>-tr.png
 *   /og/courses-index.png     /og/courses-index-tr.png
 *   /og/courses/<slug>.png    /og/courses/<slug>-tr.png
 *   /og/packages.png          /og/packages-tr.png
 *
 * Route keys and the matching public paths live in `src/lib/og.ts` so the
 * emitted files and the `og:image` <meta> URLs stay in lockstep.
 */
import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import { profile } from '../../data/profile';
import { locales, t } from '../../data/i18n';
import {
  ogHomeKey,
  ogProjectKey,
  ogProjectsKey,
  ogWritingKey,
  ogCvKey,
  ogPostKey,
  ogCoursesKey,
  ogCourseKey,
  ogPackagesKey,
} from '../../lib/og';
import { courseSlugOf } from '../../lib/courses';

// Design tokens mirrored from src/styles/global.css (RGB triples).
const BG_DARK: [number, number, number] = [10, 10, 11]; //  --color-bg    #0a0a0b
const BG_CARD: [number, number, number] = [20, 20, 23]; //  --color-card  #141417
const FG: [number, number, number] = [237, 237, 239]; //    --color-fg    #ededef
const MUTED: [number, number, number] = [155, 155, 163]; // --color-muted #9b9ba3
const ACCENT: [number, number, number] = [167, 139, 250]; // --color-accent #a78bfa

interface OgPage {
  /** Large heading line. */
  heading: string;
  /** Muted monospace sub-line. */
  sub: string;
}

const projects = await getCollection('projects', (e) => !e.data.draft);
const posts = await getCollection('posts', (e) => !e.data.draft);
const courses = await getCollection('courses', (e) => !e.data.draft);

const pages: Record<string, OgPage> = {};

for (const locale of locales) {
  // Home: name + role.
  pages[ogHomeKey(locale)] = {
    heading: profile.name,
    sub: profile.role[locale],
  };

  // Listing pages: section title + localized intro (mirrors the on-page h1 + lede).
  pages[ogProjectsKey(locale)] = {
    heading: t(locale, 'projects.title'),
    sub: t(locale, 'projects.intro'),
  };
  pages[ogWritingKey(locale)] = {
    heading: t(locale, 'section.writing'),
    sub: t(locale, 'writing.intro'),
  };
  pages[ogCvKey(locale)] = {
    heading: t(locale, 'cv.title'),
    sub: profile.role[locale],
  };

  pages[ogCoursesKey(locale)] = {
    heading: t(locale, 'courses.title'),
    sub: t(locale, 'courses.intro'),
  };

  pages[ogPackagesKey(locale)] = {
    heading: t(locale, 'packages.title'),
    sub: t(locale, 'packages.intro'),
  };

  // Per-project: title + localized tagline.
  for (const entry of projects) {
    pages[ogProjectKey(locale, entry.id)] = {
      heading: entry.data.title,
      sub: locale === 'en' ? entry.data.tagline_en : entry.data.tagline_tr,
    };
  }
  // Per-post and per-course: title + description.
  for (const entry of posts) {
    pages[ogPostKey(locale, entry.id)] = {
      heading: entry.data.title,
      sub: entry.data.description,
    };
  }
  for (const entry of courses) {
    pages[ogCourseKey(locale, courseSlugOf(entry.id))] = {
      heading: entry.data.title,
      sub: entry.data.description,
    };
  }
}

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page: OgPage) => ({
    title: page.heading,
    description: page.sub,
    bgGradient: [BG_DARK, BG_CARD],
    border: { color: ACCENT, width: 12, side: 'inline-start' },
    padding: 72,
    font: {
      // `families` must match each file's internal family name exactly — the
      // generator uses ParagraphBuilder.Make (no glyph-level cross-family
      // fallback), so a mismatch would silently fall back to another font.
      title: {
        color: FG,
        size: 74,
        weight: 'Bold',
        lineHeight: 1.15,
        families: ['Inter'],
      },
      description: {
        color: MUTED,
        size: 34,
        weight: 'Medium',
        lineHeight: 1.4,
        families: ['JetBrains Mono Medium'],
      },
    },
    // Each file merges the `latin` + `latin-ext` subsets into a single typeface
    // so a single family covers ASCII, Latin-1 (ö, ç) AND the Turkish glyphs
    // (ğ, ş, ı, İ) used in the TR taglines — see src/assets/og-fonts/README.md.
    fonts: [
      './src/assets/og-fonts/inter-700-full.ttf',
      './src/assets/og-fonts/jetbrains-500-full.ttf',
    ],
  }),
});
