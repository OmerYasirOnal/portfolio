# Portfolio / CV Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. For any creative UI task, also invoke `frontend-design:frontend-design` to produce distinctive, non-generic markup/styles — the skeletons here are correct-and-minimal starting points, not the finished aesthetic.

**Goal:** Build a fast, bilingual (EN-primary + TR), "dev-tools minimal" personal portfolio/CV site for Ömer Yasir Önal, deployed on Vercel, with content driven from one typed source.

**Architecture:** Astro 5 static site + Tailwind v4. Content lives in typed Astro content collections + a `profile` data module (one source of truth for the site now and the PDF CV / GitHub README later). Interaction is limited to small client islands (theme toggle, lang toggle, optional ⌘K). Astro's built-in i18n routing serves `/` (EN) and `/tr/` (TR).

**Tech Stack:** Astro 5, Tailwind CSS v4 (`@tailwindcss/vite`), TypeScript (strict), pnpm, `@fontsource-variable/inter` + `@fontsource-variable/jetbrains-mono`, `astro-og-canvas` (OG images), `linkinator` (CI link check), Vercel (hosting).

## Global Constraints

- **Package manager:** pnpm. Node 20+.
- **Language default:** English at `/`; Turkish mirror at `/tr/` (Astro i18n, `prefixDefaultLocale: false`).
- **Theme:** dark mode is the **default**; class strategy on `<html class="dark">`, set by an inline no-flash script before first paint; light is the toggle.
- **Accessibility:** keyboard-navigable, visible focus rings, WCAG AA contrast, all images have alt text, full `prefers-reduced-motion` fallback (no motion).
- **Performance:** static HTML, zero render-blocking JS on the critical path, Astro `<Image>` for raster assets, self-hosted fonts. Lighthouse target ~100.
- **Accuracy rule (from spec §9):** never publish an unverified claim or link. Every external link must pass the CI link check. Specific guards: AKIS = boot-smoke verification only (no Playwright/Cucumber claim); akisflow.com framed as a live self-hosted instance; UniSum = Node/Express/MySQL (not Firebase); Food classification = MobileNetV2/Food-101 (kept distinct from the XGBoost/IEEE-SIU concrete-durability work); University Grade Calculator = Firebase Realtime Database (not Firestore); UsageMeter = no unverified test-count, claude.ai source framed as optional/unofficial.
- **Content source of truth:** `src/data/profile.ts` + `src/content/` collections. No hard-coded copy inside components.
- **Commits:** conventional commits, frequent (one per task minimum).

---

## File structure (created across the plan)

```
~/Projects/portfolio/
├─ astro.config.mjs            # Astro + Tailwind + i18n config
├─ tsconfig.json               # strict
├─ package.json
├─ src/
│  ├─ styles/global.css        # Tailwind + design tokens (colors, fonts, dark default)
│  ├─ data/
│  │  ├─ profile.ts            # name, role, taglines, links, about EN/TR, badges, availability
│  │  └─ i18n.ts               # locales, dictionary, t(), localizePath()
│  ├─ content.config.ts        # collection schemas (projects, experience, skills, writing, publications, certifications)
│  ├─ content/
│  │  ├─ projects/*.md         # one file per project (frontmatter = data, body = case study)
│  │  ├─ experience/*.md
│  │  ├─ writing/*.md
│  │  └─ ... (skills/publications/certifications as data files or md)
│  ├─ layouts/
│  │  └─ Base.astro            # <head>, SEO, theme no-flash script, fonts, slots
│  ├─ components/
│  │  ├─ ThemeToggle.tsx       # island
│  │  ├─ LangToggle.astro      # static (links to mirrored route)
│  │  ├─ SocialLinks.astro
│  │  ├─ Hero.astro
│  │  ├─ ProjectCard.astro
│  │  ├─ ProjectGrid.astro
│  │  ├─ About.astro
│  │  ├─ Timeline.astro
│  │  ├─ SkillGroups.astro
│  │  ├─ WritingList.astro
│  │  └─ Contact.astro
│  ├─ lib/seo.ts               # JSON-LD Person, meta/OG helpers
│  └─ pages/
│     ├─ index.astro           # EN home
│     ├─ projects/index.astro
│     ├─ projects/[...slug].astro
│     ├─ writing/index.astro
│     ├─ cv.astro              # CV download stub (Phase 2 fills it)
│     └─ tr/                   # TR mirror of the above
├─ public/                     # photo, favicon, resume.pdf (later), og assets
└─ .github/workflows/ci.yml    # build + link check
```

---

## Phase A — Foundation

### Task 1: Scaffold Astro + Tailwind v4 + strict TS

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/styles/global.css`, `src/pages/index.astro` (temporary)

- [ ] **Step 1: Scaffold a minimal Astro project (non-interactive)**

```bash
cd ~/Projects/portfolio
pnpm dlx create-astro@latest . --template minimal --no-install --no-git --skip-houston --typescript strict
pnpm add -D tailwindcss @tailwindcss/vite
pnpm add @fontsource-variable/inter @fontsource-variable/jetbrains-mono
pnpm install
```

- [ ] **Step 2: Configure Astro (Tailwind via Vite plugin + i18n)**

`astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://omeryasironal.com', // updated when domain attaches
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});
```

- [ ] **Step 3: Tailwind v4 entry + minimal tokens**

`src/styles/global.css`:
```css
@import "tailwindcss";
@import "@fontsource-variable/inter";
@import "@fontsource-variable/jetbrains-mono";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
  --color-bg: #0a0a0b;
  --color-fg: #ededef;
  --color-muted: #9b9ba3;
  --color-accent: #5b9dff;
  --color-card: #141417;
  --color-border: #232329;
}

:root { color-scheme: dark; }
html { background: var(--color-bg); color: var(--color-fg); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

- [ ] **Step 4: Temporary home page importing the stylesheet**

`src/pages/index.astro`:
```astro
---
import '../styles/global.css';
---
<html lang="en" class="dark">
  <head><meta charset="utf-8" /><title>Ömer Yasir Önal</title></head>
  <body class="font-sans"><h1 class="text-4xl font-bold p-8">it builds</h1></body>
</html>
```

- [ ] **Step 5: Verify dev + build**

Run: `pnpm build`
Expected: build succeeds, `dist/index.html` produced with the styled heading.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: scaffold Astro 5 + Tailwind v4 + strict TS + i18n config"
```

---

### Task 2: Base layout (head, SEO slot, fonts, no-flash theme)

**Files:**
- Create: `src/layouts/Base.astro`
- Modify: `src/pages/index.astro` (use Base)

**Interfaces:**
- Produces: `Base.astro` props `{ title: string; description: string; lang?: 'en'|'tr'; path: string; ogImage?: string }`. All pages render inside it.

- [ ] **Step 1: Write Base layout**

`src/layouts/Base.astro`:
```astro
---
import '../styles/global.css';
interface Props { title: string; description: string; lang?: 'en'|'tr'; path: string; ogImage?: string }
const { title, description, lang = 'en', path, ogImage } = Astro.props;
const canonical = new URL(path, Astro.site).toString();
---
<!doctype html>
<html lang={lang} class="dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {ogImage && <meta property="og:image" content={new URL(ogImage, Astro.site).toString()} />}
    <meta name="twitter:card" content="summary_large_image" />
    <script is:inline>
      // no-flash theme: dark default, honor stored choice
      const t = localStorage.getItem('theme');
      if (t === 'light') document.documentElement.classList.remove('dark');
      else document.documentElement.classList.add('dark');
    </script>
    <slot name="head" />
  </head>
  <body class="font-sans bg-bg text-fg antialiased">
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Point home at Base**

`src/pages/index.astro`:
```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="Ömer Yasir Önal — Back-End & Applied AI Engineer" description="Back-end & applied-AI engineer who ships verifiable systems." path="/">
  <main class="mx-auto max-w-3xl p-8"><h1 class="text-4xl font-bold">it builds</h1></main>
</Base>
```

- [ ] **Step 3: Verify build**

Run: `pnpm build` → Expected: PASS, `<title>` and meta present in `dist/index.html`.

- [ ] **Step 4: Commit** — `git commit -am "feat: base layout with SEO head + no-flash dark theme"`

---

### Task 3: i18n dictionary + helpers (with tests)

**Files:**
- Create: `src/data/i18n.ts`, `test/i18n.test.ts`
- Add dev dep: `pnpm add -D vitest`

**Interfaces:**
- Produces: `locales = ['en','tr'] as const`; `type Locale`; `t(locale, key)`; `localizePath(locale, path)` (EN → `/path`, TR → `/tr/path`); `altLocalePath(locale, path)`.

- [ ] **Step 1: Write failing tests**

`test/i18n.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { t, localizePath, altLocalePath } from '../src/data/i18n';

describe('i18n', () => {
  it('returns localized strings', () => {
    expect(t('en', 'nav.work')).toBe('Work');
    expect(t('tr', 'nav.work')).toBe('Projeler');
  });
  it('localizes paths (en unprefixed, tr prefixed)', () => {
    expect(localizePath('en', '/projects')).toBe('/projects');
    expect(localizePath('tr', '/projects')).toBe('/tr/projects');
    expect(localizePath('en', '/')).toBe('/');
    expect(localizePath('tr', '/')).toBe('/tr/');
  });
  it('maps a path to its other-locale twin', () => {
    expect(altLocalePath('en', '/projects')).toBe('/tr/projects');
    expect(altLocalePath('tr', '/tr/projects')).toBe('/projects');
  });
});
```

- [ ] **Step 2: Run, verify fail** — `pnpm vitest run test/i18n.test.ts` → FAIL (module not found).

- [ ] **Step 3: Implement**

`src/data/i18n.ts`:
```ts
export const locales = ['en', 'tr'] as const;
export type Locale = (typeof locales)[number];

const dict: Record<string, Record<Locale, string>> = {
  'nav.work': { en: 'Work', tr: 'Projeler' },
  'nav.about': { en: 'About', tr: 'Hakkımda' },
  'nav.writing': { en: 'Writing', tr: 'Yazılar' },
  'nav.contact': { en: 'Contact', tr: 'İletişim' },
  'hero.viewWork': { en: 'View work', tr: 'Projeleri gör' },
  'hero.resume': { en: 'Résumé', tr: 'CV' },
  'section.selectedWork': { en: 'Selected work', tr: 'Seçili işler' },
  'section.experience': { en: 'Experience', tr: 'Deneyim' },
  'section.skills': { en: 'Skills', tr: 'Yetenekler' },
  'section.writing': { en: 'Writing & publications', tr: 'Yazılar & yayınlar' },
  'section.more': { en: 'More projects', tr: 'Diğer projeler' },
  'contact.availability': {
    en: 'Open to part-time, internship, junior full-time, and freelance.',
    tr: 'Part-time, staj, junior tam zamanlı ve freelance fırsatlara açığım.',
  },
};

export function t(locale: Locale, key: string): string {
  return dict[key]?.[locale] ?? key;
}
export function localizePath(locale: Locale, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? p : `/tr${p === '/' ? '/' : p}`;
}
export function altLocalePath(locale: Locale, path: string): string {
  if (locale === 'en') return localizePath('tr', path);
  return path.replace(/^\/tr/, '') || '/';
}
```

- [ ] **Step 4: Run, verify pass** — `pnpm vitest run test/i18n.test.ts` → PASS.

- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: i18n dictionary + path helpers with tests"`

---

### Task 4: Content collections schema

**Files:**
- Create: `src/content.config.ts`, `test/content-schema.test.ts`

**Interfaces:**
- Produces: collections `projects`, `experience`, `writing`, `publications`. Each `projects` entry frontmatter: `{ title, tagline_en, tagline_tr, category, stack: string[], status_en, status_tr, links: { repo?, live?, appstore?, other? }, highlights_en: string[], highlights_tr: string[], featured: boolean, order: number, problem_en?, problem_tr?, what_i_did_en?, what_i_did_tr?, draft?: boolean }`.

- [ ] **Step 1: Write the schema**

`src/content.config.ts`:
```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const linkSet = z.object({
  repo: z.string().url().optional(),
  live: z.string().url().optional(),
  appstore: z.string().url().optional(),
  other: z.string().url().optional(),
}).default({});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline_en: z.string(),
    tagline_tr: z.string(),
    category: z.enum(['AI-Agents','Applied-AI','ML-Research','Mobile','Web','DevTool','Networking','Other']),
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
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    role_en: z.string(), role_tr: z.string(),
    org: z.string(), location: z.string().default('Istanbul'),
    start: z.string(), end: z.string(),
    bullets_en: z.array(z.string()), bullets_tr: z.array(z.string()),
    order: z.number(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({ title: z.string(), url: z.string().url(), source: z.string(), order: z.number().default(99) }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({ title_en: z.string(), title_tr: z.string(), venue: z.string(), year: z.number(), url: z.string().url().optional() }),
});

export const collections = { projects, experience, writing, publications };
```

- [ ] **Step 2: Verify schema type-checks** — `pnpm astro check` (after `pnpm add -D @astrojs/check typescript`) → Expected: no errors (collections defined, zero entries yet is fine).

- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat: typed content collections (projects/experience/writing/publications)"`

---

### Task 5: Seed real content (verified) + profile data

> All copy is the **verified** content from the spec §6/§7. Stack/links/status come from the 2026-06-30 code scan. Apply the accuracy guards in Global Constraints.

**Files:**
- Create: `src/data/profile.ts`
- Create: `src/content/projects/{akis,unisum,newbrain,a2reklam,usagemeter,studio,calistrack,ozsaye,food-classification,qrcheckin,chess,artflare,grade-calculator}.md`
- Create: `src/content/experience/{1-ai-fellow,2-exedra,3-deneyap,4-tubitak,5-freelance}.md`
- Create: `src/content/writing/{agents-1,agents-2,ai-dev-guide}.md`
- Create: `src/content/publications/ieee-siu-2025.md`

- [ ] **Step 1: Write `profile.ts`** — name, role, location, email, links (GitHub/LinkedIn/Medium/YouTube/HackerRank), `taglines.en` (3 options; index 0 = default A), `about.en`/`about.tr` (verbatim from spec §7), `badges` (AI Fellow 1,500/31,700 · IEEE SIU 2025 · Live on the App Store · Open-source author), `skillGroups` (the 6 groups from spec §6 verbatim), `availability`, `education`, `certifications`, `languages`.

- [ ] **Step 2: Write the 6 featured project files** — frontmatter from spec §6 "Featured projects", `featured: true`, `order: 1..6`. Body = case-study markdown (problem → what I did → highlights). Use the scanned taglines/highlights/links verbatim. Apply guards (e.g. AKIS body must NOT claim Playwright/Cucumber; UsageMeter must NOT cite a test count).

- [ ] **Step 3: Write the "more" project files** — CalisTrack, Özsaye, Food classification (no repo link; local-only note), QRCheckIn, Network Chess (omit the OCI IP link), ArtFlare, Grade Calculator. `featured: false`. Food/Grade-Calc/UniSum copy must reflect the corrections in Global Constraints.

- [ ] **Step 4: Write experience + writing + publication files** — from spec §6.

- [ ] **Step 5: Verify** — `pnpm astro check` → Expected: every file validates against the schema (no Zod errors). Fix any mismatch.

- [ ] **Step 6: Commit** — `git add -A && git commit -m "content: seed verified profile + projects + experience + writing"`

---

### Task 6: Theme toggle island

**Files:**
- Create: `src/components/ThemeToggle.tsx`; add React: `pnpm astro add react --yes`

- [ ] **Step 1: Implement toggle** — a button that flips `document.documentElement.classList` `dark`, persists to `localStorage('theme')`, shows sun/moon, `aria-label` localized, respects that dark is default. Hydrate with `client:load`.
- [ ] **Step 2: Mount in a temp spot on home; verify** — `pnpm build` passes; manual: toggling persists across reload with no flash (the Base inline script handles first paint).
- [ ] **Step 3: Commit** — `git commit -am "feat: theme toggle island (dark default, persisted, no flash)"`

---

## Phase B — Components & home page

> For every component task in this phase: invoke `frontend-design:frontend-design` to elevate the visuals beyond the minimal skeleton, staying within the dev-tools-minimal tokens from Task 1. Verification for visual tasks = `pnpm build` passes **and** a screenshot review via the `run` skill (or `pnpm preview` + browser) confirming the section renders with real content, is responsive at 375px/1280px, and is keyboard-navigable.

### Task 7: Hero + SocialLinks + Nav

**Files:** Create `src/components/Hero.astro`, `src/components/SocialLinks.astro`, `src/components/LangToggle.astro`; consume in `index.astro`.

**Interfaces:** `Hero` props `{ locale: Locale }` reads `profile.ts`; renders role, default tagline, `[View work]`→`#work`, `[Résumé]`→`/cv`, `<SocialLinks/>`, subtle glow. `LangToggle` props `{ locale, path }` → links to `altLocalePath`.

- [ ] **Step 1:** Build the three components with real data from `profile.ts` + `t()`; top nav with name + Work/About/Writing links + ThemeToggle + LangToggle.
- [ ] **Step 2:** Render on `index.astro`. Verify build + screenshot (responsive, focus rings).
- [ ] **Step 3:** Commit — `git commit -am "feat: hero, nav, social links, lang toggle"`

### Task 8: ProjectCard + ProjectGrid (featured on home)

**Files:** Create `src/components/ProjectCard.astro`, `src/components/ProjectGrid.astro`.

**Interfaces:** `ProjectGrid` props `{ locale, items, columns }` where `items` = sorted `projects` entries. `ProjectCard` props `{ locale, entry }` renders title, locale tagline, status pill, monospace stack tags, links (repo/live/appstore icons), hover lift; links open in new tab with `rel="noopener"`.

- [ ] **Step 1:** Implement both; in `index.astro` query `getCollection('projects', e => e.data.featured && !e.data.draft)` sorted by `order`, render a `#work` section titled `t('section.selectedWork')`.
- [ ] **Step 2:** Verify 6 cards render with correct verified data; screenshot.
- [ ] **Step 3:** Commit — `git commit -am "feat: project card + grid; featured work on home"`

### Task 9: About (photo + badges)

**Files:** Create `src/components/About.astro`. Asset: `public/omer.jpg` (owner-provided; until then use a placeholder with correct dimensions + alt).

- [ ] **Step 1:** Two-column About: locale `about` text + signal badges; `<Image>` for the photo (alt "Ömer Yasir Önal"). If photo missing, render a neutral monogram placeholder so layout is stable.
- [ ] **Step 2:** Verify; screenshot. **Step 3:** Commit — `git commit -am "feat: about section with photo + signal badges"`

### Task 10: Experience timeline

**Files:** Create `src/components/Timeline.astro`.

- [ ] **Step 1:** Vertical timeline from `experience` collection sorted by `order`; each item: role (locale), org, dates, location, bullets (locale).
- [ ] **Step 2:** Verify; screenshot. **Step 3:** Commit — `git commit -am "feat: experience timeline"`

### Task 11: Skill groups

**Files:** Create `src/components/SkillGroups.astro`.

- [ ] **Step 1:** Render `profile.skillGroups` as titled groups of monospace chips.
- [ ] **Step 2:** Verify; screenshot. **Step 3:** Commit — `git commit -am "feat: skills section"`

### Task 12: Writing & publications

**Files:** Create `src/components/WritingList.astro`.

- [ ] **Step 1:** List `writing` entries (title → external Medium URL) + `publications` (IEEE SIU 2025), locale-aware.
- [ ] **Step 2:** Verify; screenshot. **Step 3:** Commit — `git commit -am "feat: writing & publications section"`

### Task 13: Contact + availability CTA

**Files:** Create `src/components/Contact.astro`.

- [ ] **Step 1:** Email (mailto), social links, `t('contact.availability')` CTA, optional download-CV button.
- [ ] **Step 2:** Verify; screenshot. **Step 3:** Commit — `git commit -am "feat: contact section"`

### Task 14: Assemble EN home

**Files:** Modify `src/pages/index.astro`.

- [ ] **Step 1:** Compose Base → Nav → Hero → ProjectGrid(featured) → About → Timeline → SkillGroups → WritingList → Contact, with anchor ids (`#work`, `#about`, `#writing`, `#contact`) and section spacing.
- [ ] **Step 2:** Verify full page builds; screenshot at 375px + 1280px; tab through for focus order.
- [ ] **Step 3:** Commit — `git commit -am "feat: assemble EN home page"`

---

## Phase C — Sub-pages

### Task 15: /projects index + detail pages

**Files:** Create `src/pages/projects/index.astro`, `src/pages/projects/[...slug].astro`.

**Interfaces:** detail page uses `getStaticPaths()` over all non-draft `projects`; renders frontmatter (title, tagline, stack, status, links) + rendered markdown body (case study).

- [ ] **Step 1:** Index = featured grid + a "More projects" grid (`t('section.more')`) of the rest.
- [ ] **Step 2:** `[...slug].astro` renders each project's case study with `render(entry)`.
- [ ] **Step 3:** Verify all project pages build; link from each card to its detail page; screenshot one.
- [ ] **Step 4:** Commit — `git commit -am "feat: projects index + per-project case-study pages"`

### Task 16: /writing index + Task 17: /cv stub

- [ ] **Step 1:** `src/pages/writing/index.astro` = full WritingList + publications.
- [ ] **Step 2:** `src/pages/cv.astro` = a page with the headline + a "Download PDF" button pointing to `/resume.pdf` (Phase 2 produces the file; until then the button is disabled with a "coming soon" note — not a dead link).
- [ ] **Step 3:** Verify build; commit — `git commit -am "feat: writing index + cv page stub"`

---

## Phase D — Turkish mirror

### Task 18: TR routes

**Files:** Create `src/pages/tr/index.astro`, `src/pages/tr/projects/index.astro`, `src/pages/tr/projects/[...slug].astro`, `src/pages/tr/writing/index.astro`, `src/pages/tr/cv.astro`.

- [ ] **Step 1:** Each TR page reuses the same components passing `locale="tr"` and `path="/tr/..."`; all components already read `*_tr` fields + `t('tr', …)`, so no copy lives in pages.
- [ ] **Step 2:** Verify: `/tr/` and every mirror builds; the LangToggle round-trips EN↔TR on each page type (home, projects index, a project detail, writing).
- [ ] **Step 3:** Commit — `git commit -am "feat: full Turkish mirror (/tr) via shared components"`

---

## Phase E — SEO, OG, accessibility, performance

### Task 19: SEO + JSON-LD + sitemap/robots

**Files:** Create `src/lib/seo.ts`; add `pnpm astro add sitemap --yes`; modify `Base.astro` to inject JSON-LD; create `public/robots.txt`.

**Interfaces:** `personJsonLd()` returns a `Person` schema (name, jobTitle, url, sameAs = all social/profile links, alumniOf FSM).

- [ ] **Step 1:** Implement `personJsonLd()`, inject `<script type="application/ld+json">` on home; ensure each page passes a unique `title`/`description`; `@astrojs/sitemap` configured; `robots.txt` allows all + sitemap URL.
- [ ] **Step 2:** Verify build emits `sitemap-index.xml`; JSON-LD validates (paste into a structured-data linter or assert the script tag content in a quick check).
- [ ] **Step 3:** Commit — `git commit -am "feat: SEO meta + Person JSON-LD + sitemap + robots"`

### Task 20: OG images

**Files:** add `pnpm add astro-og-canvas`; create `src/pages/og/[...route].ts` (or use `getStaticPaths` to emit per-page OG PNGs); wire `ogImage` prop in pages.

- [ ] **Step 1:** Generate a branded OG image (name + role + accent) for home and per-project; set `ogImage` in each page's Base props.
- [ ] **Step 2:** Verify OG PNGs build under `dist/`; `og:image` meta resolves.
- [ ] **Step 3:** Commit — `git commit -am "feat: generated OpenGraph images"`

### Task 21: Accessibility + performance pass

- [ ] **Step 1:** Audit: every image has alt; focus rings visible; color contrast AA (check accent on bg); `prefers-reduced-motion` disables animations; nav landmarks (`<header>/<main>/<footer>`), skip-link.
- [ ] **Step 2:** Run Lighthouse (via the `run` skill / `pnpm preview` + Chrome). Expected: Performance/Best-Practices/SEO/Accessibility ≥ 95 (target ~100). Fix regressions (image sizes, font preload).
- [ ] **Step 3:** Commit — `git commit -am "chore: a11y + performance pass (Lighthouse ~100)"`

---

## Phase F — CI, repo, deploy

### Task 22: CI (build + link check)

**Files:** Create `.github/workflows/ci.yml`.

- [ ] **Step 1:** Workflow on push/PR: pnpm install → `pnpm vitest run` → `pnpm build` → `pnpm dlx linkinator ./dist --silent --skip "^https://www.linkedin.com"` (LinkedIn 999-bot-blocks are expected; skip). Fail on any broken internal/external link otherwise — this enforces the accuracy rule.
- [ ] **Step 2:** Verify the workflow file is valid YAML; run `pnpm build && pnpm dlx linkinator ./dist` locally → Expected: 0 broken links (fix any; resolve every spec §9 link guard here).
- [ ] **Step 3:** Commit — `git commit -am "ci: build + vitest + link check"`

### Task 23: Create GitHub repo + push

- [ ] **Step 1:** `gh repo create OmerYasirOnal/portfolio --public --source=. --remote=origin --description "Personal portfolio & CV site — Astro + Tailwind" --push`
- [ ] **Step 2:** Verify CI goes green on GitHub (`gh run watch`). Fix reds.
- [ ] **Step 3:** (no extra commit; the push is the deliverable)

### Task 24: Deploy to Vercel

- [ ] **Step 1:** Use the Vercel deploy skill/flow to import the repo (framework auto-detected: Astro; build `pnpm build`, output `dist`). Get the `*.vercel.app` URL.
- [ ] **Step 2:** Verify the live URL renders home (EN), `/tr/`, a project detail, and `/cv`; theme + lang toggles work; OG/SEO present.
- [ ] **Step 3:** Update `astro.config.mjs` `site` if the final domain differs; commit if changed.

---

## Pre-launch verification (spec §9 — must pass before announcing)

- [ ] Resolve every checkbox in spec §9 (akisflow reachable; UsageMeter/UniSum/Food/Grade-Calc/newBrain/Studio/chess link + claim guards).
- [ ] `linkinator` reports 0 broken links.
- [ ] Lighthouse ~100 on home (mobile + desktop).
- [ ] EN + TR parity: every section present and translated; LangToggle round-trips everywhere.
- [ ] Owner-provided inputs folded in: Content Automation Platform (once path supplied), real photo, custom domain.

## Out of scope (follow-up plans)
- **Phase 2 — PDF CV** generated from `profile.ts` + collections (replaces `/cv` stub, fills `/resume.pdf`).
- **Phase 3 — GitHub profile README** regenerated consistent with the site.

---

## Self-review notes (author)
- **Spec coverage:** design direction (T1–T2,B), tech/i18n (T1,T3,D), site map (B,C,D), content model + verified content (T4,T5), all 7 home sections (T7–T14), sub-pages (T15–T17), TR mirror (T18), SEO/OG/a11y/perf (T19–T21), CI/repo/deploy (T22–T24), accuracy guards (Global Constraints + T5 + §9 gate). ✓
- **Placeholders:** the only deferred items are genuine owner inputs (photo, Content Automation path, domain) and the PDF file (Phase 2) — each handled with a non-dead fallback (placeholder monogram, disabled CV button), not a broken link. ✓
- **Type consistency:** `profile.ts`, the `projects` schema fields, and component props use the same names across tasks (`tagline_en/tr`, `links.{repo,live,appstore,other}`, `featured`, `order`; `localizePath/altLocalePath`). ✓
