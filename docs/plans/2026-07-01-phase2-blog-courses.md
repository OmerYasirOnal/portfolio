# Phase 2 — Native Blog + Courses Implementation Plan

**Status: implemented — 2026-07-02** (all 13 tasks executed + task-reviewed; E2E verification incl. course draft-flip green)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add native `posts` + `courses` content collections with en/tr list & detail pages, tags, reading time, RSS + `feed.json` (contract v1), and per-post/per-course JSON-LD — per `docs/specs/2026-07-01-content-platform-design.md` §3–§5.

**Architecture:** Repo markdown is the single content source. Pure, Vitest-testable builders live in `src/lib/` (like the existing `seo.ts`/`llms.ts`); Astro routes load collections and hand plain objects to those builders. Every EN page gets a `/tr/` mirror twin (same body, localized chrome) so hreflang/LangToggle invariants hold.

**Tech Stack:** Astro 5 (static, content-layer glob collections), Tailwind v4 (+ `@tailwindcss/typography`), `@astrojs/rss`, Vitest, astro-og-canvas (existing OG pipeline).

## Global Constraints

- Package manager: **pnpm**. New deps: `@astrojs/rss` (runtime), `@tailwindcss/typography` (dev). No other new deps.
- Site origin: `https://omeryasironal.com`; canonical URLs are **trailing-slashed** (match sitemap).
- i18n: EN unprefixed, TR under `/tr` — **every page must have a locale twin** (LangToggle + hreflang depend on it). Use `t()`, `localizePath()` from `src/data/i18n.ts`; **no hard-coded user-facing copy in pages/components**.
- JSON-LD and feed output only via **pure builders in `src/lib/`** (no `astro:content` imports there) so Vitest covers them.
- `feed.json` contract **v1** (spec §5): items `{type, slug, lang, title, description, date?, updated?, tags, url, lessons?}` — additive changes only.
- Drafts (`draft: true`) are excluded from pages, feeds, OG and llms output — filter `(e) => !e.data.draft` like the existing `projects` collection.
- Tests: `pnpm vitest run` (48 passing at baseline). Build: `pnpm build`. Types: `pnpm astro check`.
- Commit after every task; message style `feat(scope): summary` (see git log).

## Design decisions (locked during planning)

- **Post URLs:** `/writing/<slug>/` + mirror `/tr/writing/<slug>/`. A post's body is single-language (`lang` frontmatter); the mirror renders the same body with TR chrome and `lang` attr on the article body. Filenames = slugs (language-appropriate, e.g. `writing-comes-home.md`, `yazilar-artik-burada.md`).
- **Course URLs:** `/courses/` (index), `/courses/<slug>/` (course), `/courses/<slug>/<NN-lesson>/` (lesson) + `/tr/...` mirrors. Lesson slug keeps its `NN-` prefix (stable, order-visible).
- **Writing index** merges native posts + external Medium links into one newest-first list; native rows link internally (no new-tab icon), source tag = i18n `writing.sourceSelf`.
- **Header nav unchanged** (no Courses entry while zero courses are published); `/courses` is reachable from the writing index + sitemap + llms.txt.
- **RSS** (`/rss.xml`) = native posts **and** external Medium articles (complete author feed). **`feed.json`** = native posts + courses only (per contract).
- **Seed content:** two real announcement posts (EN + TR, `home: true`) dated 2026-07-01, and a `demo-course` kept `draft: true` (documents the authoring format; never ships — final task flips it temporarily to verify the course pipeline, then reverts).
- `courses` collection loads `*/index.md`; `lessons` loads `['*/*.md', '!*/index.md']` from the same base. Course slug is derived with `courseSlugOf(entry.id)` (`id.split('/')[0]`) so it works whether or not the loader strips `index`.

## File structure

```
src/content/schemas.ts                        (modify: +postSchema, +courseSchema, +lessonSchema)
src/content.config.ts                         (modify: register posts/courses/lessons)
src/content/posts/writing-comes-home.md       (create: EN announcement)
src/content/posts/yazilar-artik-burada.md     (create: TR announcement)
src/content/courses/demo-course/index.md      (create: draft template course)
src/content/courses/demo-course/01-first-lesson.md   (create)
src/content/courses/demo-course/02-second-lesson.md  (create)
src/lib/reading-time.ts                       (create: pure estimator)
src/lib/courses.ts                            (create: id/order helpers)
src/lib/feed.ts                               (create: feed.json + RSS item builders)
src/lib/seo.ts                                (modify: +blogPostingJsonLd, +courseJsonLd)
src/lib/og.ts                                 (modify: +post/courses OG keys)
src/lib/llms.ts                               (modify: +posts/courses in llms output)
src/data/i18n.ts                              (modify: +phase-2 keys)
src/layouts/Base.astro                        (modify: +canonicalUrl prop, +RSS autodiscovery)
src/styles/global.css                         (modify: +typography plugin + prose token mapping)
src/components/WritingList.astro              (modify: merge native posts)
src/pages/og/[...route].ts                    (modify: +post/courses cards)
src/pages/writing/[...slug].astro             (create: post detail EN)
src/pages/tr/writing/[...slug].astro          (create: post detail TR)
src/pages/writing/index.astro                 (modify: JSON-LD merge + courses link)
src/pages/tr/writing/index.astro              (modify: same, TR)
src/pages/courses/index.astro                 (create: courses index EN)
src/pages/tr/courses/index.astro              (create: courses index TR)
src/pages/courses/[course]/index.astro        (create: course detail EN)
src/pages/tr/courses/[course]/index.astro     (create: course detail TR)
src/pages/courses/[course]/[lesson].astro     (create: lesson EN)
src/pages/tr/courses/[course]/[lesson].astro  (create: lesson TR)
src/pages/feed.json.ts                        (create)
src/pages/rss.xml.ts                          (create)
src/pages/llms.txt.ts                         (modify: loadLlmsData +posts/courses)
package.json                                  (modify: +"test" script, +deps)
test/content-schema.test.ts                   (modify: +3 describes)
test/reading-time.test.ts                     (create)
test/courses.test.ts                          (create)
test/feed.test.ts                             (create)
test/seo.test.ts                              (modify: +2 describes)
test/llms.test.ts                             (modify: fixture + new assertions)
```

---

### Task 1: Content schemas + collection registration

**Files:**
- Modify: `src/content/schemas.ts`
- Modify: `src/content.config.ts`
- Modify: `package.json`
- Test: `test/content-schema.test.ts`

**Interfaces:**
- Consumes: existing `z` from `astro/zod`, existing schema/test patterns.
- Produces: `postSchema`, `courseSchema`, `lessonSchema` (named exports of `src/content/schemas.ts`); collections `posts`, `courses`, `lessons` usable via `getCollection()`. Post entries: `{title, description, date, updated?, lang, tags, draft, home, cover?, canonical?}`. Course entries: `{title, description, level, lang, tags, order, draft}`. Lesson entries: `{title, description?}`.

- [ ] **Step 1: Add a `"test"` script to package.json**

In `package.json` `scripts`, after `"preview": "astro preview",` add:

```json
    "test": "vitest run",
```

- [ ] **Step 2: Write the failing tests**

Append to `test/content-schema.test.ts` (import `postSchema, courseSchema, lessonSchema` by extending the existing import from `../src/content/schemas`):

```ts
describe('post schema', () => {
  const validPost = {
    title: 'Writing comes home',
    description: 'New articles publish natively on this site.',
    date: '2026-07-01',
    lang: 'en',
  };

  it('accepts a minimal entry and applies defaults', () => {
    const parsed = postSchema.parse(validPost);
    expect(parsed.tags).toEqual([]);
    expect(parsed.draft).toBe(false);
    expect(parsed.home).toBe(false);
    expect(parsed.updated).toBeUndefined();
  });

  it('requires an ISO date and a valid lang', () => {
    expect(postSchema.safeParse({ ...validPost, date: '01-07-2026' }).success).toBe(false);
    expect(postSchema.safeParse({ ...validPost, date: undefined }).success).toBe(false);
    expect(postSchema.safeParse({ ...validPost, lang: 'de' }).success).toBe(false);
  });

  it('validates optional updated and canonical', () => {
    expect(postSchema.parse({ ...validPost, updated: '2026-07-02' }).updated).toBe('2026-07-02');
    expect(postSchema.safeParse({ ...validPost, updated: 'yesterday' }).success).toBe(false);
    expect(postSchema.safeParse({ ...validPost, canonical: 'not-a-url' }).success).toBe(false);
  });
});

describe('course schema', () => {
  const validCourse = {
    title: 'Demo course',
    description: 'A skeleton course.',
    level: 'beginner',
    lang: 'en',
  };

  it('accepts a minimal entry and applies defaults', () => {
    const parsed = courseSchema.parse(validCourse);
    expect(parsed.tags).toEqual([]);
    expect(parsed.order).toBe(99);
    expect(parsed.draft).toBe(false);
  });

  it('rejects an unknown level and a missing description', () => {
    expect(courseSchema.safeParse({ ...validCourse, level: 'expert' }).success).toBe(false);
    expect(courseSchema.safeParse({ ...validCourse, description: undefined }).success).toBe(false);
  });
});

describe('lesson schema', () => {
  it('requires only a title', () => {
    const parsed = lessonSchema.parse({ title: 'How lessons work' });
    expect(parsed.description).toBeUndefined();
  });

  it('rejects a missing title', () => {
    expect(lessonSchema.safeParse({}).success).toBe(false);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm vitest run test/content-schema.test.ts`
Expected: FAIL — `postSchema` has no exported member / is not defined.

- [ ] **Step 4: Implement the schemas**

Append to `src/content/schemas.ts`:

```ts
/** ISO calendar date, e.g. "2026-07-01". */
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD');

export const postSchema = z.object({
  title: z.string(),
  description: z.string(),
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
  /** Optional cover image path (public/ relative). */
  cover: z.string().optional(),
  /** External canonical URL when the post is a republication. */
  canonical: z.string().url().optional(),
});

export const courseSchema = z.object({
  title: z.string(),
  description: z.string(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  /** Language the course is written in. */
  lang: z.enum(['en', 'tr']),
  tags: z.array(z.string()).default([]),
  order: z.number().default(99),
  draft: z.boolean().default(false),
});

export const lessonSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});
```

- [ ] **Step 5: Register the collections**

In `src/content.config.ts`, extend the schema import and add before the final export:

```ts
import {
  projectSchema,
  experienceSchema,
  writingSchema,
  publicationSchema,
  postSchema,
  courseSchema,
  lessonSchema,
} from './content/schemas';
```

```ts
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: postSchema,
});

// A course = directory `src/content/courses/<slug>/` with `index.md` (meta)
// plus `NN-*.md` lesson files. Two collections over the same base: `courses`
// loads only the index files, `lessons` everything else.
const courses = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/courses' }),
  schema: courseSchema,
});

const lessons = defineCollection({
  loader: glob({ pattern: ['*/*.md', '!*/index.md'], base: './src/content/courses' }),
  schema: lessonSchema,
});
```

and change the export to:

```ts
export const collections = { projects, experience, writing, publications, posts, courses, lessons };
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `pnpm vitest run test/content-schema.test.ts`
Expected: PASS (all describes, including the 4 pre-existing).

- [ ] **Step 7: Commit**

```bash
git add src/content/schemas.ts src/content.config.ts package.json test/content-schema.test.ts
git commit -m "feat(content): posts, courses, lessons collection schemas"
```

---

### Task 2: Seed content — announcement posts + draft demo course

**Files:**
- Create: `src/content/posts/writing-comes-home.md`
- Create: `src/content/posts/yazilar-artik-burada.md`
- Create: `src/content/courses/demo-course/index.md`
- Create: `src/content/courses/demo-course/01-first-lesson.md`
- Create: `src/content/courses/demo-course/02-second-lesson.md`

**Interfaces:**
- Consumes: schemas/collections from Task 1.
- Produces: two published posts (ids `writing-comes-home`, `yazilar-artik-burada`) and one draft course (`demo-course` with two lessons) that later tasks render and feed.

- [ ] **Step 1: Create the EN announcement post**

`src/content/posts/writing-comes-home.md`:

```markdown
---
title: "Writing comes home"
description: "New articles now publish natively on this site — with RSS, a JSON feed, and an AI-readable index. The Medium archive stays put."
date: "2026-07-01"
lang: en
tags: ["meta", "site"]
home: true
---

Until now, everything I wrote lived on [Medium](https://medium.com/@engomeryasironal). Those nine articles stay where they are — but starting with this post, new writing publishes here first.

Why move?

- **Ownership.** The markdown lives in the same repo as this site. No platform sits between the words and the reader.
- **Feeds.** Everything is machine-readable: [RSS](/rss.xml) for readers, [`feed.json`](/feed.json) for the upcoming mobile app, and [`llms.txt`](/llms.txt) for AI assistants.
- **Courses.** Articles are half of the plan. Small, focused [courses](/courses/) are the other half — same repo, same feeds.

The stack stays boring on purpose: Astro, markdown, static HTML on a CDN. Nothing to log into, nothing to wait for.
```

- [ ] **Step 2: Create the TR announcement post**

`src/content/posts/yazilar-artik-burada.md`:

```markdown
---
title: "Yazılar artık burada"
description: "Yeni makaleler artık doğrudan bu sitede yayımlanıyor — RSS, JSON feed ve yapay zekâ için okunabilir bir dizinle. Medium arşivi yerinde duruyor."
date: "2026-07-01"
lang: tr
tags: ["meta", "site"]
home: true
---

Şimdiye kadar yazdığım her şey [Medium](https://medium.com/@engomeryasironal)'da yaşıyordu. O dokuz makale olduğu yerde kalıyor; ama bu yazıdan itibaren yeni içerikler önce burada yayımlanacak.

Neden taşındım?

- **Sahiplik.** Markdown, bu siteyle aynı repoda duruyor. Kelimelerle okuyucu arasında bir platform yok.
- **Feed'ler.** Her şey makine tarafından okunabilir: okuyucular için [RSS](/rss.xml), yakında çıkacak mobil uygulama için [`feed.json`](/feed.json), yapay zekâ asistanları için [`llms.txt`](/llms.txt).
- **Kurslar.** Makaleler planın yarısı. Küçük, odaklı [kurslar](/tr/courses/) diğer yarısı — aynı repo, aynı feed'ler.

Teknoloji bilinçli olarak sıkıcı: Astro, markdown, CDN üzerinde statik HTML. Giriş yapılacak bir şey yok, beklenecek bir şey yok.
```

- [ ] **Step 3: Create the draft demo course**

`src/content/courses/demo-course/index.md`:

```markdown
---
title: "Demo course (structure template)"
description: "A skeleton course documenting how courses are authored in this repo. Kept as a draft — it never ships to the live site."
level: beginner
lang: en
tags: ["demo"]
order: 99
draft: true
---

A course is a directory under `src/content/courses/<slug>/`: this `index.md`
holds the course metadata, and each numbered `NN-*.md` file is one lesson,
ordered by its filename prefix.
```

`src/content/courses/demo-course/01-first-lesson.md`:

```markdown
---
title: "How lessons work"
description: "Filename prefix = order; frontmatter = title + optional description."
---

Each lesson is a plain markdown file. The `NN-` filename prefix fixes the
order; the body renders as the lesson page at `/courses/<course>/<lesson>/`.
```

`src/content/courses/demo-course/02-second-lesson.md`:

```markdown
---
title: "Publishing a course"
---

Flip `draft: false` in the course's `index.md` and the course appears on
`/courses/`, in `feed.json`, and in `llms.txt` on the next build.
```

- [ ] **Step 4: Verify the collections load and validate**

Run: `pnpm build`
Expected: build succeeds (content layer syncs + Zod-validates all five files; no schema errors). No new pages yet — that's later tasks.

- [ ] **Step 5: Commit**

```bash
git add src/content/posts src/content/courses
git commit -m "content(posts): platform announcement (en+tr) + demo course template"
```

---

### Task 3: Reading-time estimator

**Files:**
- Create: `src/lib/reading-time.ts`
- Test: `test/reading-time.test.ts`

**Interfaces:**
- Produces: `readingTimeMinutes(markdown: string): number` — ≥1, 200 wpm, fenced code excluded. Consumed by the post detail pages (Task 8).

- [ ] **Step 1: Write the failing test**

`test/reading-time.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readingTimeMinutes } from '../src/lib/reading-time';

describe('readingTimeMinutes', () => {
  it('floors at 1 minute for short or empty texts', () => {
    expect(readingTimeMinutes('a few words only')).toBe(1);
    expect(readingTimeMinutes('')).toBe(1);
  });

  it('rounds by 200 words per minute', () => {
    expect(readingTimeMinutes(Array(400).fill('word').join(' '))).toBe(2);
    expect(readingTimeMinutes(Array(500).fill('word').join(' '))).toBe(3);
  });

  it('does not count fenced code blocks', () => {
    const code = '```js\n' + Array(400).fill('token').join(' ') + '\n```';
    expect(readingTimeMinutes(`intro words here ${code}`)).toBe(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run test/reading-time.test.ts`
Expected: FAIL — cannot resolve `../src/lib/reading-time`.

- [ ] **Step 3: Implement**

`src/lib/reading-time.ts`:

```ts
/**
 * Reading-time estimate for a markdown body. Fenced code blocks are excluded —
 * they're skimmed, not read linearly — and the result never drops below one
 * minute so the label stays honest for short notes.
 */
const WORDS_PER_MINUTE = 200;

export function readingTimeMinutes(markdown: string): number {
  const prose = markdown.replace(/```[\s\S]*?```/g, ' ');
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run test/reading-time.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/reading-time.ts test/reading-time.test.ts
git commit -m "feat(lib): reading-time estimator"
```

---

### Task 4: JSON-LD builders — BlogPosting + Course

**Files:**
- Modify: `src/lib/seo.ts`
- Test: `test/seo.test.ts`

**Interfaces:**
- Consumes: existing `authorNode(site)` helper in `seo.ts`.
- Produces: `blogPostingJsonLd(input, site?)` and `courseJsonLd(input, site?)` named exports. Signatures:
  - `blogPostingJsonLd({title, description, url, date, updated?, lang, tags}: {title: string; description: string; url: string; date: string; updated?: string; lang: string; tags: string[]}, site?: URL | string)`
  - `courseJsonLd({title, description, url, lang, level, tags, lessons}: {title: string; description: string; url: string; lang: string; level: string; tags: string[]; lessons: {title: string; url: string}[]}, site?: URL | string)`

- [ ] **Step 1: Write the failing tests**

Append to `test/seo.test.ts` (extend the existing import from `../src/lib/seo` with `blogPostingJsonLd, courseJsonLd`):

```ts
describe('blogPostingJsonLd', () => {
  it('emits a BlogPosting with dates, language and keywords', () => {
    const p = blogPostingJsonLd(
      {
        title: 'T',
        description: 'D',
        url: SITE + '/writing/t/',
        date: '2026-07-01',
        updated: '2026-07-02',
        lang: 'en',
        tags: ['meta', 'site'],
      },
      SITE,
    );
    expect(p['@type']).toBe('BlogPosting');
    expect(p.datePublished).toBe('2026-07-01');
    expect(p.dateModified).toBe('2026-07-02');
    expect(p.inLanguage).toBe('en');
    expect(p.keywords).toBe('meta, site');
    expect(p.author.name).toBe('Ömer Yasir Önal');
    expect(p.mainEntityOfPage).toBe(SITE + '/writing/t/');
  });

  it('falls back dateModified to the publish date and omits empty keywords', () => {
    const p = blogPostingJsonLd(
      { title: 'T', description: 'D', url: SITE + '/writing/t/', date: '2026-07-01', lang: 'tr', tags: [] },
      SITE,
    );
    expect(p.dateModified).toBe('2026-07-01');
    expect('keywords' in p).toBe(false);
  });
});

describe('courseJsonLd', () => {
  it('emits a free online Course with an instance and lesson parts', () => {
    const c = courseJsonLd(
      {
        title: 'C',
        description: 'D',
        url: SITE + '/courses/c/',
        lang: 'en',
        level: 'beginner',
        tags: ['demo'],
        lessons: [{ title: 'L1', url: SITE + '/courses/c/01-l1/' }],
      },
      SITE,
    );
    expect(c['@type']).toBe('Course');
    expect(c.isAccessibleForFree).toBe(true);
    expect(c.hasCourseInstance.courseMode).toBe('online');
    expect(c.hasPart[0].url).toBe(SITE + '/courses/c/01-l1/');
    expect(c.educationalLevel).toBe('beginner');
    expect(c.provider.name).toBe('Ömer Yasir Önal');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run test/seo.test.ts`
Expected: FAIL — `blogPostingJsonLd` not exported.

- [ ] **Step 3: Implement the builders**

Append to `src/lib/seo.ts`:

```ts
/** A native article as a schema.org BlogPosting (post detail pages). */
export function blogPostingJsonLd(
  input: {
    title: string;
    description: string;
    url: string;
    date: string;
    updated?: string;
    lang: string;
    tags: string[];
  },
  site?: URL | string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    url: input.url,
    mainEntityOfPage: input.url,
    datePublished: input.date,
    dateModified: input.updated ?? input.date,
    inLanguage: input.lang,
    ...(input.tags.length ? { keywords: input.tags.join(', ') } : {}),
    author: authorNode(site),
  };
}

/** A course as schema.org Course + CourseInstance, lessons as hasPart. */
export function courseJsonLd(
  input: {
    title: string;
    description: string;
    url: string;
    lang: string;
    level: string;
    tags: string[];
    lessons: { title: string; url: string }[];
  },
  site?: URL | string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: input.title,
    description: input.description,
    url: input.url,
    inLanguage: input.lang,
    educationalLevel: input.level,
    ...(input.tags.length ? { keywords: input.tags.join(', ') } : {}),
    isAccessibleForFree: true,
    provider: authorNode(site),
    author: authorNode(site),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
    },
    hasPart: input.lessons.map((l) => ({
      '@type': 'CreativeWork',
      name: l.title,
      url: l.url,
    })),
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run test/seo.test.ts`
Expected: PASS (all describes).

- [ ] **Step 5: Commit**

```bash
git add src/lib/seo.ts test/seo.test.ts
git commit -m "feat(seo): BlogPosting + Course JSON-LD builders"
```

---

### Task 5: i18n keys + Base canonical override

**Files:**
- Modify: `src/data/i18n.ts`
- Modify: `src/layouts/Base.astro`

**Interfaces:**
- Produces: dictionary keys listed below (used by Tasks 7–10); `Base` accepts optional `canonicalUrl?: string` prop that replaces the computed self-canonical (for republished posts with an external canonical).

- [ ] **Step 1: Add the dictionary keys**

In `src/data/i18n.ts`, insert into `dict` after the `'seo.cv.description'` entry:

```ts
  'courses.title': { en: 'Courses', tr: 'Kurslar' },
  'courses.intro': {
    en: 'Small, focused courses — written in the open, free on the web, and synced to the upcoming mobile app.',
    tr: 'Küçük, odaklı kurslar — açıkta yazılıyor, web’de ücretsiz ve yakında mobil uygulamayla senkron.',
  },
  'courses.comingSoon': {
    en: 'The first course is in the works. Meanwhile, the articles are live:',
    tr: 'İlk kurs hazırlanıyor. Bu arada makaleler yayında:',
  },
  'courses.backToAll': { en: 'All courses', tr: 'Tüm kurslar' },
  'course.lessons': { en: 'Lessons', tr: 'Dersler' },
  'level.beginner': { en: 'Beginner', tr: 'Başlangıç' },
  'level.intermediate': { en: 'Intermediate', tr: 'Orta' },
  'level.advanced': { en: 'Advanced', tr: 'İleri' },
  'lesson.prev': { en: 'Previous', tr: 'Önceki' },
  'lesson.next': { en: 'Next', tr: 'Sonraki' },
  'writing.minRead': { en: 'min read', tr: 'dk okuma' },
  'writing.updated': { en: 'Updated', tr: 'Güncellendi' },
  'writing.backToAll': { en: 'All writing', tr: 'Tüm yazılar' },
  'writing.browseCourses': { en: 'Browse the courses →', tr: 'Kurslara göz at →' },
  'writing.sourceSelf': { en: 'This site', tr: 'Bu site' },
  'seo.courses.description': {
    en: 'Free, focused mini-courses by Ömer Yasir Önal — agentic systems, applied AI, and mobile engineering.',
    tr: 'Ömer Yasir Önal’dan ücretsiz, odaklı mini kurslar — ajan tabanlı sistemler, uygulamalı yapay zeka ve mobil geliştirme.',
  },
```

- [ ] **Step 2: Add the canonical override to Base**

In `src/layouts/Base.astro`: add to `Props`:

```ts
  /** External canonical URL override (republished content). Default: self. */
  canonicalUrl?: string;
```

destructure it (`canonicalUrl,` after `ogType = 'website',`) and change the canonical computation to:

```ts
const canonical = canonicalUrl ?? canonicalHref(path, Astro.site!);
```

- [ ] **Step 3: Verify**

Run: `pnpm vitest run && pnpm astro check`
Expected: tests PASS; astro check reports 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/i18n.ts src/layouts/Base.astro
git commit -m "feat(i18n): phase-2 dictionary keys; Base canonical override"
```

---

### Task 6: Course id/order helpers

**Files:**
- Create: `src/lib/courses.ts`
- Test: `test/courses.test.ts`

**Interfaces:**
- Produces: `courseSlugOf(id: string): string`, `lessonSlugOf(id: string): string`, `sortLessons<T extends {id: string}>(lessons: T[]): T[]`. Consumed by OG route (Task 7), course pages (Task 10), feed + llms loaders (Tasks 11–12).

- [ ] **Step 1: Write the failing test**

`test/courses.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { courseSlugOf, lessonSlugOf, sortLessons } from '../src/lib/courses';

describe('course id helpers', () => {
  it('derives the course slug from entry ids', () => {
    expect(courseSlugOf('demo-course/index')).toBe('demo-course');
    expect(courseSlugOf('demo-course/01-first-lesson')).toBe('demo-course');
    expect(courseSlugOf('demo-course')).toBe('demo-course');
  });

  it('derives the lesson slug (path under the course dir)', () => {
    expect(lessonSlugOf('demo-course/01-first-lesson')).toBe('01-first-lesson');
  });

  it('sorts lessons by their NN- filename prefix', () => {
    const sorted = sortLessons([{ id: 'c/02-b' }, { id: 'c/01-a' }, { id: 'c/10-j' }]);
    expect(sorted.map((l) => l.id)).toEqual(['c/01-a', 'c/02-b', 'c/10-j']);
  });

  it('does not mutate its input', () => {
    const input = [{ id: 'c/02-b' }, { id: 'c/01-a' }];
    sortLessons(input);
    expect(input[0].id).toBe('c/02-b');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run test/courses.test.ts`
Expected: FAIL — cannot resolve `../src/lib/courses`.

- [ ] **Step 3: Implement**

`src/lib/courses.ts`:

```ts
/**
 * Helpers for the courses/lessons collections. A course lives in
 * `src/content/courses/<slug>/` — `index.md` is the course meta and each
 * `NN-*.md` file is one lesson. Entry ids are `<slug>/index` and
 * `<slug>/NN-lesson`, so the course slug is always the first path segment
 * (robust even if a loader version strips the `index` segment).
 */
export function courseSlugOf(id: string): string {
  return id.split('/')[0];
}

/** Lesson path under the course dir, e.g. "01-first-lesson". */
export function lessonSlugOf(id: string): string {
  return id.split('/').slice(1).join('/');
}

/** Lessons ordered by their zero-padded `NN-` filename prefix. */
export function sortLessons<T extends { id: string }>(lessons: T[]): T[] {
  return [...lessons].sort((a, b) => (a.id < b.id ? -1 : 1));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run test/courses.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/courses.ts test/courses.test.ts
git commit -m "feat(lib): course id/order helpers"
```

---

### Task 7: OG social cards for posts + courses

**Files:**
- Modify: `src/lib/og.ts`
- Modify: `src/pages/og/[...route].ts`

**Interfaces:**
- Consumes: `courseSlugOf` (Task 6), i18n keys (Task 5), seeded posts (Task 2).
- Produces: `ogPostKey/ogPostPath(locale, id)`, `ogCoursesKey/ogCoursesPath(locale)`, `ogCourseKey/ogCoursePath(locale, id)` in `src/lib/og.ts`; generator emits `/og/writing/<id>[-tr].png`, `/og/courses-index[-tr].png`, `/og/courses/<slug>[-tr].png`.

- [ ] **Step 1: Add the route-key helpers**

Append to `src/lib/og.ts`:

```ts
/** Route key + path for a native post detail page. */
export function ogPostKey(locale: Locale, id: string): string {
  return `writing/${id}${suffix(locale)}`;
}

export function ogPostPath(locale: Locale, id: string): string {
  return `/og/${ogPostKey(locale, id)}.png`;
}

/** Route key + path for the /courses listing page. */
export function ogCoursesKey(locale: Locale): string {
  return `courses-index${suffix(locale)}`;
}

export function ogCoursesPath(locale: Locale): string {
  return `/og/${ogCoursesKey(locale)}.png`;
}

/** Route key + path for a course page (lesson pages reuse the course card). */
export function ogCourseKey(locale: Locale, id: string): string {
  return `courses/${id}${suffix(locale)}`;
}

export function ogCoursePath(locale: Locale, id: string): string {
  return `/og/${ogCourseKey(locale, id)}.png`;
}
```

- [ ] **Step 2: Emit the new cards**

In `src/pages/og/[...route].ts`:

Extend the `og.ts` import:

```ts
import {
  ogHomeKey,
  ogProjectKey,
  ogProjectsKey,
  ogWritingKey,
  ogCvKey,
  ogPostKey,
  ogCoursesKey,
  ogCourseKey,
} from '../../lib/og';
import { courseSlugOf } from '../../lib/courses';
```

After the `const projects = ...` line add:

```ts
const posts = await getCollection('posts', (e) => !e.data.draft);
const courses = await getCollection('courses', (e) => !e.data.draft);
```

Inside the `for (const locale of locales)` loop, after the `ogCvKey` block add:

```ts
  pages[ogCoursesKey(locale)] = {
    heading: t(locale, 'courses.title'),
    sub: t(locale, 'courses.intro'),
  };

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
```

Also update the file's header comment route list to mention `/og/writing/<id>[-tr].png` and `/og/courses-index[-tr].png` + `/og/courses/<slug>[-tr].png`.

- [ ] **Step 3: Verify via build**

Run: `pnpm build && ls dist/og/writing/ && ls dist/og/ | grep courses`
Expected: `writing-comes-home.png`, `writing-comes-home-tr.png`, `yazilar-artik-burada.png`, `yazilar-artik-burada-tr.png`; `courses-index.png`, `courses-index-tr.png` (no per-course PNG — demo course is draft).

- [ ] **Step 4: Commit**

```bash
git add src/lib/og.ts src/pages/og/
git commit -m "feat(og): social cards for posts + courses"
```

---

### Task 8: Post detail pages (en + tr) with prose styling

**Files:**
- Modify: `package.json` (dev dep), `src/styles/global.css`
- Create: `src/pages/writing/[...slug].astro`
- Create: `src/pages/tr/writing/[...slug].astro`

**Interfaces:**
- Consumes: `readingTimeMinutes` (Task 3), `blogPostingJsonLd`/`breadcrumbJsonLd`/`canonicalHref` (Task 4 + existing), `ogPostPath` (Task 7), i18n keys + `canonicalUrl` prop (Task 5).
- Produces: `/writing/<id>/` and `/tr/writing/<id>/` static pages for every non-draft post.

- [ ] **Step 1: Install the typography plugin**

Run: `pnpm add -D @tailwindcss/typography`
Expected: added to `devDependencies`.

- [ ] **Step 2: Wire prose styling to the site palette**

In `src/styles/global.css`, after the `@custom-variant dark ...` line add:

```css
@plugin "@tailwindcss/typography";
```

and append at the end of the file:

```css
/*
 * Map the typography plugin's palette onto the site tokens. The tokens flip
 * under `.dark`, so prose follows the theme without `prose-invert`.
 */
.prose {
  --tw-prose-body: var(--color-fg);
  --tw-prose-headings: var(--color-fg);
  --tw-prose-lead: var(--color-muted);
  --tw-prose-links: var(--color-accent);
  --tw-prose-bold: var(--color-fg);
  --tw-prose-counters: var(--color-muted);
  --tw-prose-bullets: var(--color-muted);
  --tw-prose-hr: var(--color-border);
  --tw-prose-quotes: var(--color-fg);
  --tw-prose-quote-borders: var(--color-accent);
  --tw-prose-captions: var(--color-muted);
  --tw-prose-code: var(--color-fg);
  --tw-prose-pre-code: var(--color-fg);
  --tw-prose-pre-bg: var(--color-card);
  --tw-prose-th-borders: var(--color-border);
  --tw-prose-td-borders: var(--color-border);
}
```

- [ ] **Step 3: Create the EN post page**

`src/pages/writing/[...slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import Base from '../../layouts/Base.astro';
import SiteHeader from '../../components/SiteHeader.astro';
import SiteFooter from '../../components/SiteFooter.astro';
import { t, localizePath, type Locale } from '../../data/i18n';
import { ogPostPath } from '../../lib/og';
import { readingTimeMinutes } from '../../lib/reading-time';
import { blogPostingJsonLd, breadcrumbJsonLd, canonicalHref } from '../../lib/seo';

// Emit one page per non-draft post. `entry.id` is the markdown filename and
// becomes the URL slug; the TR mirror at /tr/writing/<id>/ renders the same
// body with localized chrome so every path keeps its locale twin.
export async function getStaticPaths() {
  const posts = await getCollection('posts', (e) => !e.data.draft);
  return posts.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

const locale: Locale = 'en';
const { entry } = Astro.props;
const { data } = entry;
const path = localizePath(locale, `/writing/${entry.id}`);
const { Content } = await render(entry);

const minutes = readingTimeMinutes(entry.body ?? '');
const url = canonicalHref(path, Astro.site!);
const postLd = blogPostingJsonLd(
  {
    title: data.title,
    description: data.description,
    url,
    date: data.date,
    updated: data.updated,
    lang: data.lang,
    tags: data.tags,
  },
  Astro.site!,
);
const breadcrumbLd = breadcrumbJsonLd([
  { name: t(locale, 'section.writing'), url: canonicalHref(localizePath(locale, '/writing'), Astro.site!) },
  { name: data.title, url },
]);

// Full publish date in the page's locale ("1 Jul 2026" / "1 Tem 2026").
const dateFmt = new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});
const formatDate = (iso: string) => dateFmt.format(new Date(`${iso}T00:00:00`));
---

<Base
  title={`${data.title} — Ömer Yasir Önal`}
  description={data.description}
  path={path}
  lang={locale}
  ogImage={ogPostPath(locale, entry.id)}
  ogType="article"
  canonicalUrl={data.canonical}
>
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(postLd)} />
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(breadcrumbLd)} />

  <SiteHeader locale={locale} path={path} />

  <main id="main">
    <article class="mx-auto max-w-3xl px-6 pb-20 pt-12">
      {/* breadcrumb back to the writing index */}
      <a
        href={localizePath(locale, '/writing')}
        class="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        {t(locale, 'writing.backToAll')}
      </a>

      <header class="mt-6 border-b border-border/60 pb-8">
        <h1 class="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {data.title}
        </h1>

        <p class="mt-3 text-lg leading-relaxed text-muted">{data.description}</p>

        <p class="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
          <time datetime={data.date} class="tabular-nums">{formatDate(data.date)}</time>
          {
            data.updated && (
              <>
                <span aria-hidden="true" class="text-border">·</span>
                <span>
                  {t(locale, 'writing.updated')}:{' '}
                  <time datetime={data.updated} class="tabular-nums">{formatDate(data.updated)}</time>
                </span>
              </>
            )
          }
          <span aria-hidden="true" class="text-border">·</span>
          <span>{minutes} {t(locale, 'writing.minRead')}</span>
          <span aria-hidden="true" class="text-border">·</span>
          <span class="rounded border border-border/70 px-1.5 py-px text-[0.65rem] uppercase tracking-wider text-muted/80">
            {data.lang}
          </span>
        </p>

        {
          data.tags.length > 0 && (
            <ul class="mt-4 flex flex-wrap gap-1.5" role="list">
              {data.tags.map((tag) => (
                <li class="rounded border border-border/70 px-1.5 py-0.5 font-mono text-[0.7rem] text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          )
        }
      </header>

      <div class="prose mt-8 max-w-none" lang={data.lang}>
        <Content />
      </div>
    </article>
  </main>

  <SiteFooter locale={locale} />
</Base>
```

- [ ] **Step 4: Create the TR mirror**

`src/pages/tr/writing/[...slug].astro` — identical except: import depth `../../../`, `const locale: Locale = 'tr';`. Full file:

```astro
---
import { getCollection, render } from 'astro:content';
import Base from '../../../layouts/Base.astro';
import SiteHeader from '../../../components/SiteHeader.astro';
import SiteFooter from '../../../components/SiteFooter.astro';
import { t, localizePath, type Locale } from '../../../data/i18n';
import { ogPostPath } from '../../../lib/og';
import { readingTimeMinutes } from '../../../lib/reading-time';
import { blogPostingJsonLd, breadcrumbJsonLd, canonicalHref } from '../../../lib/seo';

// TR mirror of /writing/<id>/ — same body, localized chrome (see EN twin).
export async function getStaticPaths() {
  const posts = await getCollection('posts', (e) => !e.data.draft);
  return posts.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

const locale: Locale = 'tr';
const { entry } = Astro.props;
const { data } = entry;
const path = localizePath(locale, `/writing/${entry.id}`);
const { Content } = await render(entry);

const minutes = readingTimeMinutes(entry.body ?? '');
const url = canonicalHref(path, Astro.site!);
const postLd = blogPostingJsonLd(
  {
    title: data.title,
    description: data.description,
    url,
    date: data.date,
    updated: data.updated,
    lang: data.lang,
    tags: data.tags,
  },
  Astro.site!,
);
const breadcrumbLd = breadcrumbJsonLd([
  { name: t(locale, 'section.writing'), url: canonicalHref(localizePath(locale, '/writing'), Astro.site!) },
  { name: data.title, url },
]);

const dateFmt = new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});
const formatDate = (iso: string) => dateFmt.format(new Date(`${iso}T00:00:00`));
---

<Base
  title={`${data.title} — Ömer Yasir Önal`}
  description={data.description}
  path={path}
  lang={locale}
  ogImage={ogPostPath(locale, entry.id)}
  ogType="article"
  canonicalUrl={data.canonical}
>
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(postLd)} />
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(breadcrumbLd)} />

  <SiteHeader locale={locale} path={path} />

  <main id="main">
    <article class="mx-auto max-w-3xl px-6 pb-20 pt-12">
      <a
        href={localizePath(locale, '/writing')}
        class="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        {t(locale, 'writing.backToAll')}
      </a>

      <header class="mt-6 border-b border-border/60 pb-8">
        <h1 class="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {data.title}
        </h1>

        <p class="mt-3 text-lg leading-relaxed text-muted">{data.description}</p>

        <p class="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
          <time datetime={data.date} class="tabular-nums">{formatDate(data.date)}</time>
          {
            data.updated && (
              <>
                <span aria-hidden="true" class="text-border">·</span>
                <span>
                  {t(locale, 'writing.updated')}:{' '}
                  <time datetime={data.updated} class="tabular-nums">{formatDate(data.updated)}</time>
                </span>
              </>
            )
          }
          <span aria-hidden="true" class="text-border">·</span>
          <span>{minutes} {t(locale, 'writing.minRead')}</span>
          <span aria-hidden="true" class="text-border">·</span>
          <span class="rounded border border-border/70 px-1.5 py-px text-[0.65rem] uppercase tracking-wider text-muted/80">
            {data.lang}
          </span>
        </p>

        {
          data.tags.length > 0 && (
            <ul class="mt-4 flex flex-wrap gap-1.5" role="list">
              {data.tags.map((tag) => (
                <li class="rounded border border-border/70 px-1.5 py-0.5 font-mono text-[0.7rem] text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          )
        }
      </header>

      <div class="prose mt-8 max-w-none" lang={data.lang}>
        <Content />
      </div>
    </article>
  </main>

  <SiteFooter locale={locale} />
</Base>
```

- [ ] **Step 5: Verify via build**

```bash
pnpm build
test -f dist/writing/writing-comes-home/index.html && echo EN-OK
test -f dist/tr/writing/writing-comes-home/index.html && echo TR-MIRROR-OK
grep -o '"@type":"BlogPosting"' dist/writing/writing-comes-home/index.html | head -1
grep -c 'min read' dist/writing/writing-comes-home/index.html
```
Expected: `EN-OK`, `TR-MIRROR-OK`, `"@type":"BlogPosting"`, count ≥ 1.

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml src/styles/global.css src/pages/writing/ src/pages/tr/writing/
git commit -m "feat(writing): native post detail pages (en+tr) with prose styling"
```

---

### Task 9: Merge native posts into the writing index

**Files:**
- Modify: `src/components/WritingList.astro`
- Modify: `src/pages/writing/index.astro`
- Modify: `src/pages/tr/writing/index.astro`

**Interfaces:**
- Consumes: `posts` collection, i18n `writing.sourceSelf`, post pages from Task 8.
- Produces: one merged newest-first article list (native + external) on `/writing`, `/tr/writing` and the curated home section; index JSON-LD includes native posts with absolute URLs.

- [ ] **Step 1: Rewrite WritingList to merge sources**

Replace the frontmatter of `src/components/WritingList.astro` (keep `interface Props`, `home` handling, publications block, `EXTERNAL_ICON`, `dateFmt` as shown) with:

```astro
---
/**
 * WritingList — the "Writing & publications" section.
 *
 * Three sources, one list: `posts` (native articles rendered on this site),
 * `writing` (external articles, e.g. Medium) and `publications` (peer-reviewed
 * venues). Native and external articles merge into a single newest-first
 * reading list; native rows link internally (no new tab, no external glyph),
 * external rows keep target=_blank + rel=noopener. Locale-only fields are
 * selected by the incoming `locale`; sub-headings, hints and the native source
 * tag all come from the i18n dictionary — nothing is hard-coded.
 */
import { getCollection } from 'astro:content';
import { t, localizePath, type Locale } from '../data/i18n';

interface Props {
  locale: Locale;
  /**
   * When true, show only the curated home-page articles (those flagged
   * `home: true`), newest-first, plus a "See all writing" link. When omitted,
   * every article is listed (the `/writing` index).
   */
  home?: boolean;
}

const { locale, home = false } = Astro.props;

/** One row of the reading list, normalized across native + external sources. */
interface Row {
  title: string;
  href: string;
  external: boolean;
  source: string;
  date: string;
  lang: string;
  order: number;
  home: boolean;
}

const writing = await getCollection('writing');
const posts = await getCollection('posts', (e) => !e.data.draft);

// Newest first (ISO date strings sort lexically); `order` breaks ties (e.g. the
// TR/EN pair published the same day). Native posts carry no order → 99.
const allArticles: Row[] = [
  ...writing.map((e) => ({
    title: e.data.title,
    href: e.data.url,
    external: true,
    source: e.data.source,
    date: e.data.date,
    lang: e.data.lang,
    order: e.data.order,
    home: e.data.home,
  })),
  ...posts.map((e) => ({
    title: e.data.title,
    href: localizePath(locale, `/writing/${e.id}`),
    external: false,
    source: t(locale, 'writing.sourceSelf'),
    date: e.data.date,
    lang: e.data.lang,
    order: 99,
    home: e.data.home,
  })),
].sort((a, b) => {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.order - b.order;
});

const articles = home ? allArticles.filter((row) => row.home) : allArticles;
const truncated = home && allArticles.length > articles.length;
const seeAllHref = localizePath(locale, '/writing');

// Publish month/year, rendered in the page's locale ("Dec 2025" / "Ara 2025").
const dateFmt = new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
  month: 'short',
  year: 'numeric',
});
const formatDate = (iso: string) => dateFmt.format(new Date(`${iso}T00:00:00`));

// Newest research first.
const publications = (await getCollection('publications')).sort(
  (a, b) => b.data.year - a.data.year,
);

const hint = t(locale, 'social.opensNewTab');

// external-link glyph (stroke, 24×24) — matches the ProjectCard "other" icon.
const EXTERNAL_ICON = [
  'M15 3h6v6',
  'M10 14 21 3',
  'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
];
---
```

In the template's Articles block, replace `articles.map((entry, i) => (...))` so each row uses the normalized `Row` (conditional external attributes + icon):

```astro
          {articles.map((row, i) => (
            <li>
              <a
                href={row.href}
                target={row.external ? '_blank' : undefined}
                rel={row.external ? 'noopener noreferrer' : undefined}
                aria-label={row.external ? `${row.title} — ${row.source} (${hint})` : undefined}
                class="group flex items-baseline gap-4 py-4 transition-colors hover:bg-card/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span
                  class="font-mono text-xs tabular-nums text-muted"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span class="min-w-0 flex-1">
                  <span class="text-base font-medium leading-snug text-fg decoration-accent/50 decoration-1 underline-offset-4 group-hover:text-accent group-hover:underline">
                    {row.title}
                  </span>
                  <span class="mt-1.5 flex items-center gap-2 font-mono text-xs text-muted">
                    <time datetime={row.date} class="tabular-nums">
                      {formatDate(row.date)}
                    </time>
                    <span aria-hidden="true" class="text-border">
                      ·
                    </span>
                    <span class="rounded border border-border/70 px-1.5 py-px text-[0.65rem] uppercase tracking-wider text-muted/80">
                      {row.lang}
                    </span>
                  </span>
                </span>
                <span class="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted">
                  {row.source}
                  {row.external && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-muted/70 transition-colors group-hover:text-accent"
                      aria-hidden="true"
                      focusable="false"
                    >
                      {EXTERNAL_ICON.map((d) => (
                        <path d={d} />
                      ))}
                    </svg>
                  )}
                </span>
              </a>
            </li>
          ))}
```

Publications block and the `truncated` see-all link stay byte-identical.

- [ ] **Step 2: Include native posts in the index JSON-LD (EN)**

In `src/pages/writing/index.astro`, replace the `articlesLd` computation with:

```ts
const posts = await getCollection('posts', (e) => !e.data.draft);
const ldItems = [
  ...articles.map((a) => ({ title: a.data.title, url: a.data.url, date: a.data.date })),
  ...posts.map((p) => ({
    title: p.data.title,
    url: canonicalHref(localizePath(locale, `/writing/${p.id}`), Astro.site!),
    date: p.data.date,
  })),
].sort((a, b) => (a.date < b.date ? 1 : -1));
const articlesLd = writingItemListJsonLd(ldItems, Astro.site!);
```

- [ ] **Step 3: Same change in the TR index**

Apply the identical `posts`/`ldItems`/`articlesLd` replacement in `src/pages/tr/writing/index.astro` (the `locale` const there is already `'tr'`, so `localizePath` yields `/tr/writing/<id>`).

- [ ] **Step 4: Verify via build**

```bash
pnpm vitest run && pnpm build
grep -o 'writing-comes-home' dist/writing/index.html | head -1
grep -o '/tr/writing/yazilar-artik-burada' dist/tr/writing/index.html | head -1
grep -o 'writing-comes-home' dist/index.html | head -1
```
Expected: tests PASS; all three greps print a match (index rows + home curated section + JSON-LD).

- [ ] **Step 5: Commit**

```bash
git add src/components/WritingList.astro src/pages/writing/index.astro src/pages/tr/writing/index.astro
git commit -m "feat(writing): merge native posts into writing index + JSON-LD"
```

---

### Task 10: Courses pages (index, course, lesson × en/tr)

**Files:**
- Create: `src/pages/courses/index.astro`, `src/pages/tr/courses/index.astro`
- Create: `src/pages/courses/[course]/index.astro`, `src/pages/tr/courses/[course]/index.astro`
- Create: `src/pages/courses/[course]/[lesson].astro`, `src/pages/tr/courses/[course]/[lesson].astro`
- Modify: `src/pages/writing/index.astro`, `src/pages/tr/writing/index.astro` (browse-courses link)

**Interfaces:**
- Consumes: `courseSlugOf`/`lessonSlugOf`/`sortLessons` (Task 6), `courseJsonLd` (Task 4), `ogCoursesPath`/`ogCoursePath` (Task 7), i18n keys (Task 5).
- Produces: `/courses/` (+`/tr/`) always emitted (coming-soon empty state); `/courses/<slug>/` + `/courses/<slug>/<lesson>/` (+ TR mirrors) for non-draft courses.

- [ ] **Step 1: Courses index (EN)**

`src/pages/courses/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import SiteHeader from '../../components/SiteHeader.astro';
import SiteFooter from '../../components/SiteFooter.astro';
import { t, localizePath, type Locale } from '../../data/i18n';
import { ogCoursesPath } from '../../lib/og';
import { breadcrumbJsonLd, canonicalHref } from '../../lib/seo';
import { courseSlugOf } from '../../lib/courses';

const locale: Locale = 'en';
const path = '/courses';

const courses = (await getCollection('courses', (e) => !e.data.draft)).sort(
  (a, b) => a.data.order - b.data.order,
);
const lessons = await getCollection('lessons');
const lessonCount = (slug: string) =>
  lessons.filter((l) => courseSlugOf(l.id) === slug).length;

const breadcrumbLd = breadcrumbJsonLd([
  { name: t(locale, 'courses.title'), url: canonicalHref(localizePath(locale, '/courses'), Astro.site!) },
]);
---

<Base
  title={`${t(locale, 'courses.title')} — Ömer Yasir Önal`}
  description={t(locale, 'seo.courses.description')}
  path={path}
  lang={locale}
  ogImage={ogCoursesPath(locale)}
>
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(breadcrumbLd)} />

  <SiteHeader locale={locale} path={path} />

  <main id="main">
    <section class="mx-auto max-w-5xl px-6 pb-8 pt-16">
      <p class="font-mono text-sm text-accent">
        <span class="text-accent/70">/</span>{t(locale, 'courses.title').toLowerCase()}
      </p>
      <h1 class="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        {t(locale, 'courses.title')}
      </h1>
      <p class="mt-4 max-w-2xl text-balance text-base leading-relaxed text-muted">
        {t(locale, 'courses.intro')}
      </p>
    </section>

    <section class="mx-auto max-w-5xl px-6 py-8 pb-20">
      {
        courses.length === 0 ? (
          <p class="rounded-lg border border-border bg-card/40 p-6 text-sm leading-relaxed text-muted">
            {t(locale, 'courses.comingSoon')}{' '}
            <a
              href={localizePath(locale, '/writing')}
              class="text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t(locale, 'section.writing')}
            </a>
          </p>
        ) : (
          <ul class="space-y-4" role="list">
            {courses.map((entry) => {
              const slug = courseSlugOf(entry.id);
              return (
                <li class="rounded-lg border border-border bg-card/40 p-5 transition-colors hover:border-accent/50">
                  <a
                    href={localizePath(locale, `/courses/${slug}`)}
                    class="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <p class="text-lg font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
                      {entry.data.title}
                    </p>
                    <p class="mt-1.5 text-sm leading-relaxed text-muted">{entry.data.description}</p>
                    <p class="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                      <span class="rounded border border-border/70 px-1.5 py-px text-[0.65rem] uppercase tracking-wider text-muted/80">
                        {t(locale, `level.${entry.data.level}`)}
                      </span>
                      <span aria-hidden="true" class="text-border">·</span>
                      <span>
                        {lessonCount(slug)} {t(locale, 'course.lessons').toLowerCase()}
                      </span>
                      <span aria-hidden="true" class="text-border">·</span>
                      <span class="uppercase">{entry.data.lang}</span>
                    </p>
                  </a>
                </li>
              );
            })}
          </ul>
        )
      }
    </section>
  </main>

  <SiteFooter locale={locale} />
</Base>
```

- [ ] **Step 2: Courses index (TR)**

`src/pages/tr/courses/index.astro` — identical with import depth `../../../`, `const locale: Locale = 'tr';` and `const path = '/tr/courses';`. (Everything else — including `localizePath(locale, '/courses')` targets — resolves through the locale.)

- [ ] **Step 3: Course detail (EN)**

`src/pages/courses/[course]/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../../layouts/Base.astro';
import SiteHeader from '../../../components/SiteHeader.astro';
import SiteFooter from '../../../components/SiteFooter.astro';
import { t, localizePath, type Locale } from '../../../data/i18n';
import { ogCoursePath } from '../../../lib/og';
import { breadcrumbJsonLd, canonicalHref, courseJsonLd } from '../../../lib/seo';
import { courseSlugOf, lessonSlugOf, sortLessons } from '../../../lib/courses';

// One page per non-draft course; the TR twin mirrors it under /tr/.
export async function getStaticPaths() {
  const courses = await getCollection('courses', (e) => !e.data.draft);
  return courses.map((entry) => ({
    params: { course: courseSlugOf(entry.id) },
    props: { entry },
  }));
}

const locale: Locale = 'en';
const { entry } = Astro.props;
const { data } = entry;
const slug = courseSlugOf(entry.id);
const path = localizePath(locale, `/courses/${slug}`);

const lessons = sortLessons(await getCollection('lessons', (l) => courseSlugOf(l.id) === slug));
const lessonHref = (l: { id: string }) =>
  localizePath(locale, `/courses/${slug}/${lessonSlugOf(l.id)}`);

const url = canonicalHref(path, Astro.site!);
const courseLd = courseJsonLd(
  {
    title: data.title,
    description: data.description,
    url,
    lang: data.lang,
    level: data.level,
    tags: data.tags,
    lessons: lessons.map((l) => ({
      title: l.data.title,
      url: canonicalHref(lessonHref(l), Astro.site!),
    })),
  },
  Astro.site!,
);
const breadcrumbLd = breadcrumbJsonLd([
  { name: t(locale, 'courses.title'), url: canonicalHref(localizePath(locale, '/courses'), Astro.site!) },
  { name: data.title, url },
]);
---

<Base
  title={`${data.title} — Ömer Yasir Önal`}
  description={data.description}
  path={path}
  lang={locale}
  ogImage={ogCoursePath(locale, slug)}
  ogType="article"
>
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(courseLd)} />
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(breadcrumbLd)} />

  <SiteHeader locale={locale} path={path} />

  <main id="main">
    <article class="mx-auto max-w-3xl px-6 pb-20 pt-12">
      <a
        href={localizePath(locale, '/courses')}
        class="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        {t(locale, 'courses.backToAll')}
      </a>

      <header class="mt-6 border-b border-border/60 pb-8">
        <h1 class="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {data.title}
        </h1>

        <p class="mt-3 text-lg leading-relaxed text-muted">{data.description}</p>

        <p class="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
          <span class="rounded border border-border/70 px-1.5 py-px text-[0.65rem] uppercase tracking-wider text-muted/80">
            {t(locale, `level.${data.level}`)}
          </span>
          <span aria-hidden="true" class="text-border">·</span>
          <span>{lessons.length} {t(locale, 'course.lessons').toLowerCase()}</span>
          <span aria-hidden="true" class="text-border">·</span>
          <span class="uppercase">{data.lang}</span>
        </p>

        {
          data.tags.length > 0 && (
            <ul class="mt-4 flex flex-wrap gap-1.5" role="list">
              {data.tags.map((tag) => (
                <li class="rounded border border-border/70 px-1.5 py-0.5 font-mono text-[0.7rem] text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          )
        }
      </header>

      <section class="mt-8" aria-labelledby="course-lessons">
        <h2 id="course-lessons" class="font-mono text-xs uppercase tracking-widest text-accent dark:text-accent/70">
          {t(locale, 'course.lessons')}
        </h2>
        <ol class="mt-4 divide-y divide-border/60 border-y border-border/60" role="list">
          {
            lessons.map((lesson, i) => (
              <li>
                <a
                  href={lessonHref(lesson)}
                  class="group flex items-baseline gap-4 py-4 transition-colors hover:bg-card/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span class="font-mono text-xs tabular-nums text-muted" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="text-base font-medium leading-snug text-fg decoration-accent/50 decoration-1 underline-offset-4 group-hover:text-accent group-hover:underline">
                      {lesson.data.title}
                    </span>
                    {lesson.data.description && (
                      <span class="mt-1 block text-sm leading-relaxed text-muted">
                        {lesson.data.description}
                      </span>
                    )}
                  </span>
                </a>
              </li>
            ))
          }
        </ol>
      </section>
    </article>
  </main>

  <SiteFooter locale={locale} />
</Base>
```

- [ ] **Step 4: Course detail (TR)**

`src/pages/tr/courses/[course]/index.astro` — identical with import depth `../../../../` and `const locale: Locale = 'tr';`.

- [ ] **Step 5: Lesson page (EN)**

`src/pages/courses/[course]/[lesson].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import Base from '../../../layouts/Base.astro';
import SiteHeader from '../../../components/SiteHeader.astro';
import SiteFooter from '../../../components/SiteFooter.astro';
import { t, localizePath, type Locale } from '../../../data/i18n';
import { ogCoursePath } from '../../../lib/og';
import { breadcrumbJsonLd, canonicalHref } from '../../../lib/seo';
import { courseSlugOf, lessonSlugOf, sortLessons } from '../../../lib/courses';

// One page per lesson of every non-draft course. The parent course entry rides
// along in props for titles, OG card and breadcrumbs.
export async function getStaticPaths() {
  const courses = await getCollection('courses', (e) => !e.data.draft);
  const bySlug = new Map(courses.map((c) => [courseSlugOf(c.id), c]));
  const lessons = await getCollection('lessons', (l) => bySlug.has(courseSlugOf(l.id)));
  return lessons.map((entry) => ({
    params: { course: courseSlugOf(entry.id), lesson: lessonSlugOf(entry.id) },
    props: { entry, course: bySlug.get(courseSlugOf(entry.id))! },
  }));
}

const locale: Locale = 'en';
const { entry, course } = Astro.props;
const slug = courseSlugOf(entry.id);
const lessonSlug = lessonSlugOf(entry.id);
const path = localizePath(locale, `/courses/${slug}/${lessonSlug}`);
const { Content } = await render(entry);

const siblings = sortLessons(await getCollection('lessons', (l) => courseSlugOf(l.id) === slug));
const index = siblings.findIndex((l) => l.id === entry.id);
const prev = index > 0 ? siblings[index - 1] : undefined;
const next = index < siblings.length - 1 ? siblings[index + 1] : undefined;
const lessonHref = (l: { id: string }) =>
  localizePath(locale, `/courses/${slug}/${lessonSlugOf(l.id)}`);

const url = canonicalHref(path, Astro.site!);
const breadcrumbLd = breadcrumbJsonLd([
  { name: t(locale, 'courses.title'), url: canonicalHref(localizePath(locale, '/courses'), Astro.site!) },
  { name: course.data.title, url: canonicalHref(localizePath(locale, `/courses/${slug}`), Astro.site!) },
  { name: entry.data.title, url },
]);
---

<Base
  title={`${entry.data.title} — ${course.data.title} — Ömer Yasir Önal`}
  description={entry.data.description ?? course.data.description}
  path={path}
  lang={locale}
  ogImage={ogCoursePath(locale, slug)}
  ogType="article"
>
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(breadcrumbLd)} />

  <SiteHeader locale={locale} path={path} />

  <main id="main">
    <article class="mx-auto max-w-3xl px-6 pb-20 pt-12">
      <a
        href={localizePath(locale, `/courses/${slug}`)}
        class="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        {course.data.title}
      </a>

      <header class="mt-6 border-b border-border/60 pb-8">
        <p class="font-mono text-[0.7rem] uppercase tracking-widest text-muted">
          <span class="text-accent/70">/</span>{t(locale, 'course.lessons').toLowerCase()}
          <span class="ml-2 tabular-nums">{index + 1} / {siblings.length}</span>
        </p>
        <h1 class="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {entry.data.title}
        </h1>
        {
          entry.data.description && (
            <p class="mt-3 text-lg leading-relaxed text-muted">{entry.data.description}</p>
          )
        }
      </header>

      <div class="prose mt-8 max-w-none" lang={course.data.lang}>
        <Content />
      </div>

      <nav class="mt-12 flex items-center justify-between gap-4 border-t border-border/60 pt-6" aria-label={t(locale, 'course.lessons')}>
        {
          prev ? (
            <a
              href={lessonHref(prev)}
              class="group inline-flex items-center gap-1.5 font-mono text-sm text-accent transition-colors hover:text-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span aria-hidden="true">←</span>
              {t(locale, 'lesson.prev')}: {prev.data.title}
            </a>
          ) : (
            <span />
          )
        }
        {
          next && (
            <a
              href={lessonHref(next)}
              class="group inline-flex items-center gap-1.5 text-right font-mono text-sm text-accent transition-colors hover:text-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t(locale, 'lesson.next')}: {next.data.title}
              <span aria-hidden="true">→</span>
            </a>
          )
        }
      </nav>
    </article>
  </main>

  <SiteFooter locale={locale} />
</Base>
```

- [ ] **Step 6: Lesson page (TR)**

`src/pages/tr/courses/[course]/[lesson].astro` — identical with import depth `../../../../` and `const locale: Locale = 'tr';`.

- [ ] **Step 7: Link courses from the writing index**

In `src/pages/writing/index.astro` and `src/pages/tr/writing/index.astro`, directly after the `<p class="mt-4 ...">{t(locale, 'writing.intro')}</p>` line add:

```astro
      <a
        href={localizePath(locale, '/courses')}
        class="group mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-accent transition-colors hover:text-accent/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {t(locale, 'writing.browseCourses')}
      </a>
```

- [ ] **Step 8: Verify via build**

```bash
pnpm build && pnpm astro check
test -f dist/courses/index.html && test -f dist/tr/courses/index.html && echo COURSES-INDEX-OK
grep -o 'courses' dist/writing/index.html | head -1
ls dist/courses/
```
Expected: build OK, 0 type errors, `COURSES-INDEX-OK`, writing index links to courses; `dist/courses/` contains only `index.html` (demo course is draft → no detail pages yet; they're exercised in Task 13's draft-flip check).

- [ ] **Step 9: Commit**

```bash
git add src/pages/courses/ src/pages/tr/courses/ src/pages/writing/index.astro src/pages/tr/writing/index.astro
git commit -m "feat(courses): course + lesson pages (en+tr) with coming-soon index"
```

---

### Task 11: Feeds — `feed.json` (contract v1) + `rss.xml`

**Files:**
- Create: `src/lib/feed.ts`
- Create: `src/pages/feed.json.ts`
- Create: `src/pages/rss.xml.ts`
- Modify: `src/layouts/Base.astro` (RSS autodiscovery), `package.json` (dep)
- Test: `test/feed.test.ts`

**Interfaces:**
- Consumes: `courseSlugOf`/`lessonSlugOf`/`sortLessons` (Task 6); collections.
- Produces:
  - `buildFeedJson({site, posts, courses}): FeedJson` where `FeedJson = {version: '1', site: string, items: FeedItem[]}` and `FeedItem = {type: 'post'|'course', slug, lang, title, description, date?, updated?, tags, url, lessons?: {slug, title, url}[]}` — posts newest-first, then courses.
  - `rssItems({site, posts, external}): {title, link, pubDate: Date, description?}[]` — merged newest-first.
  - Input shapes: `FeedPostInput = {slug, lang, title, description, date, updated?, tags: string[]}`, `FeedCourseInput = {slug, lang, title, description, tags: string[], lessons: {slug, title}[]}`, `FeedExternalInput = {title, url, date, description?}`.
  - Static routes `/feed.json` and `/rss.xml`.

- [ ] **Step 1: Install @astrojs/rss**

Run: `pnpm add @astrojs/rss`
Expected: added to `dependencies`.

- [ ] **Step 2: Write the failing tests**

`test/feed.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { buildFeedJson, rssItems } from '../src/lib/feed';

const SITE = 'https://omeryasironal.com';
const post = {
  slug: 'writing-comes-home',
  lang: 'en',
  title: 'Writing comes home',
  description: 'D',
  date: '2026-07-01',
  tags: ['meta'],
};
const course = {
  slug: 'demo-course',
  lang: 'en',
  title: 'Demo',
  description: 'CD',
  tags: [],
  lessons: [{ slug: '01-first-lesson', title: 'L1' }],
};

describe('buildFeedJson', () => {
  const feed = buildFeedJson({ site: SITE, posts: [post], courses: [course] });

  it('pins the contract version and site (no trailing slash)', () => {
    expect(feed.version).toBe('1');
    expect(feed.site).toBe(SITE);
    const fromSlashed = buildFeedJson({ site: SITE + '/', posts: [], courses: [] });
    expect(fromSlashed.site).toBe(SITE);
  });

  it('maps posts with absolute trailing-slashed URLs and no lessons key', () => {
    const p = feed.items.find((i) => i.type === 'post')!;
    expect(p.url).toBe(`${SITE}/writing/writing-comes-home/`);
    expect(p.date).toBe('2026-07-01');
    expect(p.tags).toEqual(['meta']);
    expect('lessons' in p).toBe(false);
  });

  it('maps courses with lesson URLs', () => {
    const c = feed.items.find((i) => i.type === 'course')!;
    expect(c.url).toBe(`${SITE}/courses/demo-course/`);
    expect(c.lessons![0].url).toBe(`${SITE}/courses/demo-course/01-first-lesson/`);
    expect('date' in c).toBe(false);
  });

  it('omits updated when absent, includes it when present', () => {
    expect('updated' in feed.items.find((i) => i.type === 'post')!).toBe(false);
    const f = buildFeedJson({ site: SITE, posts: [{ ...post, updated: '2026-07-02' }], courses: [] });
    expect(f.items[0].updated).toBe('2026-07-02');
  });

  it('orders posts newest-first', () => {
    const f = buildFeedJson({
      site: SITE,
      posts: [post, { ...post, slug: 'newer', date: '2026-07-05' }],
      courses: [],
    });
    expect(f.items[0].slug).toBe('newer');
  });
});

describe('rssItems', () => {
  it('merges native posts and external articles newest-first', () => {
    const items = rssItems({
      site: SITE,
      posts: [post],
      external: [{ title: 'Old medium', url: 'https://medium.com/x', date: '2023-03-13' }],
    });
    expect(items[0].link).toBe(`${SITE}/writing/writing-comes-home/`);
    expect(items[0].description).toBe('D');
    expect(items[0].pubDate.toISOString().startsWith('2026-07-01')).toBe(true);
    expect(items[1].link).toBe('https://medium.com/x');
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm vitest run test/feed.test.ts`
Expected: FAIL — cannot resolve `../src/lib/feed`.

- [ ] **Step 4: Implement the builders**

`src/lib/feed.ts`:

```ts
/**
 * Pure builders for the machine feeds. `feed.json` implements the versioned
 * contract in docs/specs/2026-07-01-content-platform-design.md §5 — the
 * Flutter app and AI crawlers depend on it, so changes within version "1"
 * must be additive only. Kept free of astro:content (unit-tested with Vitest);
 * the routes load the collections and hand plain objects in.
 */

export interface FeedPostInput {
  slug: string;
  lang: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
}

export interface FeedCourseInput {
  slug: string;
  lang: string;
  title: string;
  description: string;
  tags: string[];
  lessons: { slug: string; title: string }[];
}

export interface FeedItem {
  type: 'post' | 'course';
  slug: string;
  lang: string;
  title: string;
  description: string;
  date?: string;
  updated?: string;
  tags: string[];
  url: string;
  lessons?: { slug: string; title: string; url: string }[];
}

export interface FeedJson {
  version: '1';
  site: string;
  items: FeedItem[];
}

const abs = (site: string, path: string) => new URL(path, site).toString();

export function buildFeedJson(input: {
  site: string;
  posts: FeedPostInput[];
  courses: FeedCourseInput[];
}): FeedJson {
  const posts = [...input.posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const postItems: FeedItem[] = posts.map((p) => ({
    type: 'post',
    slug: p.slug,
    lang: p.lang,
    title: p.title,
    description: p.description,
    date: p.date,
    ...(p.updated ? { updated: p.updated } : {}),
    tags: p.tags,
    url: abs(input.site, `/writing/${p.slug}/`),
  }));
  const courseItems: FeedItem[] = input.courses.map((c) => ({
    type: 'course',
    slug: c.slug,
    lang: c.lang,
    title: c.title,
    description: c.description,
    tags: c.tags,
    url: abs(input.site, `/courses/${c.slug}/`),
    lessons: c.lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      url: abs(input.site, `/courses/${c.slug}/${l.slug}/`),
    })),
  }));
  return {
    version: '1',
    site: input.site.replace(/\/$/, ''),
    items: [...postItems, ...courseItems],
  };
}

export interface FeedExternalInput {
  title: string;
  url: string;
  date: string;
  description?: string;
}

export interface RssItem {
  title: string;
  link: string;
  pubDate: Date;
  description?: string;
}

/** Native posts + external articles as one newest-first RSS item list. */
export function rssItems(input: {
  site: string;
  posts: FeedPostInput[];
  external: FeedExternalInput[];
}): RssItem[] {
  const native = input.posts.map((p) => ({
    title: p.title,
    link: abs(input.site, `/writing/${p.slug}/`),
    pubDate: new Date(`${p.date}T00:00:00Z`),
    description: p.description,
  }));
  const external = input.external.map((e) => ({
    title: e.title,
    link: e.url,
    pubDate: new Date(`${e.date}T00:00:00Z`),
    ...(e.description ? { description: e.description } : {}),
  }));
  return [...native, ...external].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm vitest run test/feed.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 6: Create the routes**

`src/pages/feed.json.ts`:

```ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildFeedJson } from '../lib/feed';
import { courseSlugOf, lessonSlugOf, sortLessons } from '../lib/courses';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('posts', (e) => !e.data.draft);
  const courses = (await getCollection('courses', (e) => !e.data.draft)).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const lessons = await getCollection('lessons');

  const feed = buildFeedJson({
    site: site!.toString(),
    posts: posts.map((p) => ({
      slug: p.id,
      lang: p.data.lang,
      title: p.data.title,
      description: p.data.description,
      date: p.data.date,
      updated: p.data.updated,
      tags: p.data.tags,
    })),
    courses: courses.map((c) => {
      const slug = courseSlugOf(c.id);
      return {
        slug,
        lang: c.data.lang,
        title: c.data.title,
        description: c.data.description,
        tags: c.data.tags,
        lessons: sortLessons(lessons.filter((l) => courseSlugOf(l.id) === slug)).map((l) => ({
          slug: lessonSlugOf(l.id),
          title: l.data.title,
        })),
      };
    }),
  });

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
```

`src/pages/rss.xml.ts`:

```ts
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { t } from '../data/i18n';
import { rssItems } from '../lib/feed';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', (e) => !e.data.draft);
  const writing = await getCollection('writing');

  const items = rssItems({
    site: context.site!.toString(),
    posts: posts.map((p) => ({
      slug: p.id,
      lang: p.data.lang,
      title: p.data.title,
      description: p.data.description,
      date: p.data.date,
      tags: p.data.tags,
    })),
    external: writing.map((w) => ({
      title: w.data.title,
      url: w.data.url,
      date: w.data.date,
    })),
  });

  return rss({
    title: 'Ömer Yasir Önal — Writing',
    description: t('en', 'seo.writing.description'),
    site: context.site!,
    items,
    customData: '<language>en</language>',
  });
}
```

- [ ] **Step 7: RSS autodiscovery in Base**

In `src/layouts/Base.astro` head, after the `<link rel="canonical" ...>` line add:

```astro
    <link
      rel="alternate"
      type="application/rss+xml"
      title="Ömer Yasir Önal — Writing"
      href={new URL('/rss.xml', Astro.site!).toString()}
    />
```

- [ ] **Step 8: Verify via build**

```bash
pnpm build
node -e "const f=require('./dist/feed.json'); console.log(f.version, f.items.length, f.items.map(i=>i.type+':'+i.slug).join(','))"
grep -c 'medium.com' dist/rss.xml
grep -o 'writing-comes-home' dist/rss.xml | head -1
grep -c 'application/rss+xml' dist/index.html
```
Expected: `1 2 post:writing-comes-home,post:yazilar-artik-burada` (course is draft); medium count ≥ 9; native slug present in rss.xml; autodiscovery count = 1.

- [ ] **Step 9: Commit**

```bash
git add src/lib/feed.ts src/pages/feed.json.ts src/pages/rss.xml.ts src/layouts/Base.astro package.json pnpm-lock.yaml test/feed.test.ts
git commit -m "feat(feeds): rss.xml + feed.json (contract v1) with autodiscovery"
```

---

### Task 12: llms.txt / llms-full.txt — native posts + courses

**Files:**
- Modify: `src/lib/llms.ts`
- Modify: `src/pages/llms.txt.ts` (shared `loadLlmsData`; `llms-full.txt.ts` imports it and needs no change)
- Test: `test/llms.test.ts`

**Interfaces:**
- Consumes: `courseSlugOf`/`lessonSlugOf`/`sortLessons` (Task 6).
- Produces: `LlmsData` gains `posts: LlmsPost[]` (`{slug, title, description, date, lang, body}`) and `courses: LlmsCourse[]` (`{slug, title, description, level, lang, lessons: {slug, title}[]}`). `llmsTxt` lists native posts (internal URLs) before external writing, lists courses (or keeps the coming-soon line when empty) and adds a `## Feeds` section. `llmsFullTxt` inlines full post bodies and course lesson indexes.

- [ ] **Step 1: Update the test fixture and add failing tests**

In `test/llms.test.ts`, add to the `data` fixture object (after `publications`):

```ts
  posts: [
    {
      slug: 'writing-comes-home',
      title: 'Writing comes home',
      description: 'Native now.',
      date: '2026-07-01',
      lang: 'en',
      body: 'Full body text of the announcement.',
    },
  ],
  courses: [
    {
      slug: 'demo-course',
      title: 'Demo',
      description: 'CD',
      level: 'beginner',
      lang: 'en',
      lessons: [{ slug: '01-a', title: 'L1' }],
    },
  ],
```

Append new tests:

```ts
describe('llmsTxt phase-2 content', () => {
  const out = llmsTxt(data);

  it('lists native posts with absolute internal URLs', () => {
    expect(out).toContain(
      '- [Writing comes home](https://omeryasironal.com/writing/writing-comes-home/): Native now. (2026-07-01, en)',
    );
  });

  it('lists courses when present', () => {
    expect(out).toContain(
      '- [Demo](https://omeryasironal.com/courses/demo-course/): CD (beginner, 1 lessons, en)',
    );
    expect(out).not.toContain('_Coming soon');
  });

  it('keeps the coming-soon line when no course is published', () => {
    expect(llmsTxt({ ...data, courses: [] })).toContain('_Coming soon');
  });

  it('references the feeds', () => {
    expect(out).toContain('https://omeryasironal.com/rss.xml');
    expect(out).toContain('https://omeryasironal.com/feed.json');
  });
});

describe('llmsFullTxt phase-2 content', () => {
  const out = llmsFullTxt(data);

  it('inlines the full native post body', () => {
    expect(out).toContain('Full body text of the announcement.');
  });

  it('indexes course lessons with absolute URLs', () => {
    expect(out).toContain('- L1: https://omeryasironal.com/courses/demo-course/01-a/');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run test/llms.test.ts`
Expected: FAIL — TypeScript/type errors on the new fixture fields and missing output.

- [ ] **Step 3: Extend the builders**

In `src/lib/llms.ts`, add after `LlmsPublication`:

```ts
export interface LlmsPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  lang: string;
  /** Raw markdown body — inlined into llms-full.txt. */
  body: string;
}
export interface LlmsCourse {
  slug: string;
  title: string;
  description: string;
  level: string;
  lang: string;
  lessons: { slug: string; title: string }[];
}
```

Extend `LlmsData` with:

```ts
  posts: LlmsPost[];
  courses: LlmsCourse[];
```

In `llmsTxt`, inside the `## Writing` section, before the external loop add:

```ts
  for (const p of data.posts) {
    lines.push(`- [${p.title}](${abs(site, `/writing/${p.slug}/`)}): ${p.description} (${p.date}, ${p.lang})`);
  }
```

Replace the `## Courses` block body with:

```ts
  lines.push('## Courses');
  if (data.courses.length) {
    for (const c of data.courses) {
      lines.push(
        `- [${c.title}](${abs(site, `/courses/${c.slug}/`)}): ${c.description} (${c.level}, ${c.lessons.length} lessons, ${c.lang})`,
      );
    }
  } else {
    lines.push('_Coming soon — small, focused courses will be published here and in the mobile app._');
  }
```

After the Courses block (before `## CV`) add:

```ts
  lines.push('');
  lines.push('## Feeds');
  lines.push(`- [RSS](${abs(site, '/rss.xml')}): new articles`);
  lines.push(`- [feed.json](${abs(site, '/feed.json')}): versioned JSON feed of posts + courses (contract v1)`);
```

In `llmsFullTxt`, after the `## Writing` loop add:

```ts
  s.push('## Articles (native, full text)');
  for (const p of data.posts) {
    s.push(`### ${p.title} — ${abs(site, `/writing/${p.slug}/`)}`);
    s.push(`${p.description} (${p.date}, ${p.lang})`);
    s.push('');
    s.push(p.body.trim());
    s.push('');
  }
  s.push('## Courses');
  for (const c of data.courses) {
    s.push(`### ${c.title} — ${abs(site, `/courses/${c.slug}/`)}`);
    s.push(`${c.description} (level: ${c.level}, ${c.lang})`);
    for (const l of c.lessons) {
      s.push(`- ${l.title}: ${abs(site, `/courses/${c.slug}/${l.slug}/`)}`);
    }
    s.push('');
  }
```

- [ ] **Step 4: Extend the loader**

In `src/pages/llms.txt.ts` add the import:

```ts
import { courseSlugOf, lessonSlugOf, sortLessons } from '../lib/courses';
```

and inside `loadLlmsData`, load + map the new collections (before the `return`, and add both fields to the returned object):

```ts
  const posts = (await getCollection('posts', (e) => !e.data.draft)).sort((a, b) =>
    a.data.date < b.data.date ? 1 : -1,
  );
  const courses = (await getCollection('courses', (e) => !e.data.draft)).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const lessons = await getCollection('lessons');
```

```ts
    posts: posts.map((p) => ({
      slug: p.id,
      title: p.data.title,
      description: p.data.description,
      date: p.data.date,
      lang: p.data.lang,
      body: p.body ?? '',
    })),
    courses: courses.map((c) => {
      const slug = courseSlugOf(c.id);
      return {
        slug,
        title: c.data.title,
        description: c.data.description,
        level: c.data.level,
        lang: c.data.lang,
        lessons: sortLessons(lessons.filter((l) => courseSlugOf(l.id) === slug)).map((l) => ({
          slug: lessonSlugOf(l.id),
          title: l.data.title,
        })),
      };
    }),
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm vitest run test/llms.test.ts`
Expected: PASS (old + new tests; the pre-existing "reserves a Courses section" test still passes since `## Courses` header remains).

- [ ] **Step 6: Verify via build**

```bash
pnpm build
grep -o '/writing/writing-comes-home/' dist/llms.txt | head -1
grep -o '## Feeds' dist/llms.txt
grep -o 'Articles (native, full text)' dist/llms-full.txt
```
Expected: all three greps match; `llms-full.txt` contains the announcement body.

- [ ] **Step 7: Commit**

```bash
git add src/lib/llms.ts src/pages/llms.txt.ts test/llms.test.ts
git commit -m "feat(aio): native posts + courses in llms.txt / llms-full.txt"
```

---

### Task 13: End-to-end verification (incl. course pipeline draft-flip)

**Files:**
- Modify (temporarily, then revert): `src/content/courses/demo-course/index.md`

**Interfaces:**
- Consumes: everything above. Produces: verified Phase 2. No new code.

- [ ] **Step 1: Full test + type + build pass**

```bash
pnpm vitest run
pnpm astro check
pnpm build
```
Expected: all tests PASS (baseline 48 + ~25 new), 0 type errors, build succeeds.

- [ ] **Step 2: Verify the published surface**

```bash
node -e "const f=require('./dist/feed.json'); if(f.version!=='1')throw 'bad version'; console.log('feed OK:', f.items.map(i=>i.type+':'+i.slug).join(','))"
grep -o '<item>' dist/rss.xml | wc -l
test -f dist/writing/writing-comes-home/index.html && test -f dist/tr/writing/yazilar-artik-burada/index.html && echo POSTS-OK
grep -o 'hreflang="tr"' dist/writing/writing-comes-home/index.html | head -1
grep -o '"@type":"BlogPosting"' dist/writing/writing-comes-home/index.html | head -1
test -f dist/og/writing/writing-comes-home.png && echo OG-OK
test -f dist/courses/index.html && echo COURSES-OK
grep -o 'writing-comes-home' dist/sitemap-0.xml | head -1
```
Expected: feed has exactly the 2 posts; rss has 13 items (2 native + 11 external); all OK markers print; hreflang + JSON-LD + sitemap entries present. (rss.xml is emitted single-line — count occurrences with `grep -o`, not `grep -c`.)

- [ ] **Step 3: Draft-flip — exercise the course pipeline end-to-end**

```bash
sed -i '' 's/^draft: true$/draft: false/' src/content/courses/demo-course/index.md
pnpm build
test -f dist/courses/demo-course/index.html && echo COURSE-OK
test -f dist/courses/demo-course/01-first-lesson/index.html && echo LESSON-OK
test -f dist/tr/courses/demo-course/02-second-lesson/index.html && echo TR-LESSON-OK
grep -o '"@type":"Course"' dist/courses/demo-course/index.html | head -1
node -e "const f=require('./dist/feed.json'); const c=f.items.find(i=>i.type==='course'); console.log('lessons:', c.lessons.length)"
grep -o 'demo-course' dist/llms.txt | head -1
test -f dist/og/courses/demo-course.png && echo COURSE-OG-OK
```
Expected: all markers print; Course JSON-LD emitted; feed course item has `lessons: 2`; llms.txt lists the course.

- [ ] **Step 4: Revert the flip and rebuild clean**

```bash
git checkout -- src/content/courses/demo-course/index.md
pnpm build
node -e "const f=require('./dist/feed.json'); if(f.items.some(i=>i.type==='course'))throw 'draft leaked'; console.log('clean')"
```
Expected: `clean` — the draft course is out of every surface again.

- [ ] **Step 5: Commit any verification fixes**

Only if Steps 1–4 surfaced fixes:

```bash
git add -A && git commit -m "fix(phase2): verification fixes"
```

- [ ] **Step 6: Update the roadmap plan doc status**

Add at the top of this plan file: `**Status: implemented — <date>**`, commit as `docs(plan): mark phase 2 implemented`.
