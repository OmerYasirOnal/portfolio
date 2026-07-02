# Phase 1 — SEO / AIO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close every high/medium SEO & AI-optimization (AIO) gap on the existing Astro portfolio without changing its static architecture.

**Architecture:** All changes are build-time only (zero client runtime added). Pure, testable helpers live in `src/lib/*` and `src/data/*` (unit-tested with Vitest, mirroring `test/i18n.test.ts`); `.astro` layouts/pages consume them and are verified by building and grepping `dist/`. Structured data, feeds, and the llms.txt corpus are all derived from the existing single sources of truth (`src/data/profile.ts` + content collections), so they can never drift from the visible site.

**Tech Stack:** Astro 5, Tailwind v4, TypeScript, Vitest 4, `@fontsource-variable/*`. No new runtime dependencies. Chrome DevTools MCP (Brave) for the Lighthouse verification pass.

## Global Constraints

- **Site origin:** `https://omeryasironal.com` (from `astro.config.mjs` `site`). All emitted absolute URLs use `Astro.site`, never a hardcoded literal, except pure-function fallbacks that already default to this string in `src/lib/seo.ts`.
- **Locales:** `en` (default, no prefix) + `tr` (`/tr/`). Every public route is mirrored; edits to an EN page MUST be mirrored in its `/tr/` twin.
- **Served URLs use a trailing slash** (Astro `build.format: 'directory'`; sitemap emits `…/cv/`). Canonical + hreflang hrefs MUST be byte-identical to the sitemap loc → normalize to a trailing slash.
- **Single source of truth:** copy comes from `src/data/profile.ts` and `src/data/i18n.ts`; structured data / feeds read content collections. Never hardcode bio/role/link strings in a component or route.
- **No new client JS.** All work is SSG/build-time. The only `<head>` additions are `<meta>`/`<link>`/`<script type="application/ld+json">` (inert) tags.
- **cv-print pages bypass `Base.astro`** and already emit `<meta name="robots" content="noindex">` — do not touch them; they must never receive hreflang/JSON-LD.
- **Deferred to later phases (do NOT build here):** RSS (`rss.xml`) + JSON Feed (`feed.json`) land in **Phase 2** with native posts/courses (the `feed.json` contract is defined in the spec). `public/_headers`/`_redirects` (Cloudflare security/cache headers) land in **Phase 3**. This plan reserves a `## Courses` placeholder in `llms.txt` and references future feeds, but does not create the feeds. *(superseded 2026-07-02 — hosting is Vercel; see spec §2 amendment and the phase-3 plan)*

---

## File Structure

**Modified**
- `src/lib/seo.ts` — add pure JSON-LD builders + hreflang/canonical URL helpers (currently only `personJsonLd`).
- `src/lib/og.ts` — add `ogCvKey`/`ogCvPath` for a CV social card.
- `src/pages/og/[...route].ts` — register the CV OG image page.
- `src/layouts/Base.astro` — hreflang/x-default links, canonical trailing-slash fix, `ogType`/`robots` props, `theme-color`, `author`, `og:locale:alternate`, `og:image:alt/width/height`, Inter latin woff2 preload.
- `src/pages/{index,cv,projects/index,projects/[...slug],writing/index}.astro` + all `/tr/` twins — inject page-appropriate JSON-LD; pass `ogType`/`ogImage` where relevant.
- `public/robots.txt` — explicit AI-crawler allow groups.

**Created**
- `src/lib/llms.ts` — pure builders `llmsTxt()` + `llmsFullTxt()`.
- `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts` — static text routes wrapping the builders.
- `test/seo.test.ts` — unit tests for the new `seo.ts` builders/helpers.
- `test/llms.test.ts` — unit tests for the llms.txt builders.

---

## Task 1: hreflang alternates, x-default, and canonical trailing-slash fix

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/layouts/Base.astro:13-14,26`
- Test: `test/seo.test.ts` (create)

**Interfaces:**
- Produces: `withTrailingSlash(path: string): string`; `canonicalHref(path: string, site: URL | string): string`; `hreflangLinks(lang: 'en'|'tr', path: string, site: URL | string): { hreflang: string; href: string }[]` — consumed by `Base.astro` (Task 1) and reused by later tasks.

- [ ] **Step 1: Write the failing test** — create `test/seo.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { withTrailingSlash, canonicalHref, hreflangLinks } from '../src/lib/seo';

const SITE = 'https://omeryasironal.com';

describe('withTrailingSlash', () => {
  it('adds a trailing slash and is idempotent on non-root paths', () => {
    expect(withTrailingSlash('/cv')).toBe('/cv/');
    expect(withTrailingSlash('/cv/')).toBe('/cv/');
    expect(withTrailingSlash('/projects/akis')).toBe('/projects/akis/');
  });
  it('leaves the root untouched', () => {
    expect(withTrailingSlash('/')).toBe('/');
  });
});

describe('canonicalHref', () => {
  it('builds an absolute, trailing-slashed URL matching the sitemap loc', () => {
    expect(canonicalHref('/cv', SITE)).toBe('https://omeryasironal.com/cv/');
    expect(canonicalHref('/', SITE)).toBe('https://omeryasironal.com/');
    expect(canonicalHref('/tr/projects/akis', SITE)).toBe(
      'https://omeryasironal.com/tr/projects/akis/',
    );
  });
});

describe('hreflangLinks', () => {
  it('emits en, tr, and x-default with x-default pointing at the EN twin', () => {
    const links = hreflangLinks('en', '/cv', SITE);
    expect(links).toEqual([
      { hreflang: 'en', href: 'https://omeryasironal.com/cv/' },
      { hreflang: 'tr', href: 'https://omeryasironal.com/tr/cv/' },
      { hreflang: 'x-default', href: 'https://omeryasironal.com/cv/' },
    ]);
  });
  it('computes the EN twin from a TR page', () => {
    const links = hreflangLinks('tr', '/tr/cv', SITE);
    expect(links[0]).toEqual({ hreflang: 'en', href: 'https://omeryasironal.com/cv/' });
    expect(links[1]).toEqual({ hreflang: 'tr', href: 'https://omeryasironal.com/tr/cv/' });
  });
  it('handles the home pair', () => {
    const links = hreflangLinks('en', '/', SITE);
    expect(links[0].href).toBe('https://omeryasironal.com/');
    expect(links[1].href).toBe('https://omeryasironal.com/tr/');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run test/seo.test.ts`
Expected: FAIL — `withTrailingSlash`/`canonicalHref`/`hreflangLinks` are not exported.

- [ ] **Step 3: Implement the helpers** — add to the top of `src/lib/seo.ts` (after the existing `import { profile }` line add the i18n import, then append the functions):

```ts
import { altLocalePath, type Locale } from '../data/i18n';

/** Normalize a path to a trailing slash (root stays "/"). Matches sitemap loc. */
export function withTrailingSlash(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (p === '/') return '/';
  return p.endsWith('/') ? p : `${p}/`;
}

/** Absolute self-canonical URL, trailing-slashed to match the sitemap. */
export function canonicalHref(path: string, site: URL | string): string {
  return new URL(withTrailingSlash(path), site).toString();
}

/** en / tr / x-default alternate links for the current page's mirror pair. */
export function hreflangLinks(
  lang: Locale,
  path: string,
  site: URL | string,
): { hreflang: string; href: string }[] {
  const enPath = lang === 'en' ? path : altLocalePath(lang, path);
  const trPath = lang === 'tr' ? path : altLocalePath(lang, path);
  const enUrl = canonicalHref(enPath, site);
  const trUrl = canonicalHref(trPath, site);
  return [
    { hreflang: 'en', href: enUrl },
    { hreflang: 'tr', href: trUrl },
    { hreflang: 'x-default', href: enUrl },
  ];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run test/seo.test.ts`
Expected: PASS.

- [ ] **Step 5: Wire into `Base.astro`** — replace the frontmatter canonical line and the `<link rel="canonical">` block.

In `src/layouts/Base.astro` frontmatter, replace line 14:

```astro
const canonical = new URL(path, Astro.site).toString();
```

with:

```astro
import { canonicalHref, hreflangLinks } from '../lib/seo';
const canonical = canonicalHref(path, Astro.site!);
const alternates = hreflangLinks(lang, path, Astro.site!);
```

Then, immediately after the existing `<link rel="canonical" href={canonical} />` (line 26), add:

```astro
    {alternates.map((a) => <link rel="alternate" hreflang={a.hreflang} href={a.href} />)}
```

- [ ] **Step 6: Verify in the build**

Run: `pnpm build && grep -o 'rel="alternate" hreflang="[^"]*" href="[^"]*"' dist/cv/index.html`
Expected: three lines — `hreflang="en" href="…/cv/"`, `hreflang="tr" href="…/tr/cv/"`, `hreflang="x-default" href="…/cv/"`.

Run: `grep -o 'rel="canonical" href="[^"]*"' dist/cv/index.html`
Expected: `…/cv/` (trailing slash, matching `dist/sitemap-0.xml`).

- [ ] **Step 7: Commit**

```bash
git add src/lib/seo.ts src/layouts/Base.astro test/seo.test.ts
git commit -m "feat(seo): per-page hreflang + x-default and trailing-slash canonical"
```

---

## Task 2: Structured-data (JSON-LD) builders in `seo.ts`

**Files:**
- Modify: `src/lib/seo.ts`
- Test: `test/seo.test.ts` (extend)

**Interfaces:**
- Consumes: `profile` (already imported), `Locale`.
- Produces (all pure, all `@context: 'https://schema.org'`):
  - `personJsonLd(site?, locale?: Locale)` — **locale-aware `jobTitle`** (fixes the TR-home bug where EN role was used).
  - `webSiteJsonLd(site?)` → `WebSite`.
  - `breadcrumbJsonLd(items: { name: string; url: string }[])` → `BreadcrumbList`.
  - `creativeWorkJsonLd(input: { title: string; description: string; category: string; url: string; stack: string[] }, site?)` → `CreativeWork` (author-bound).
  - `writingItemListJsonLd(items: { title: string; url: string; date: string }[], site?)` → `ItemList` of `BlogPosting`.
  - `scholarlyArticleJsonLd(input: { title: string; venue: string; year: number; url?: string }, site?)` → `ScholarlyArticle`.

- [ ] **Step 1: Write the failing tests** — append to `test/seo.test.ts`:

```ts
import {
  personJsonLd,
  webSiteJsonLd,
  breadcrumbJsonLd,
  creativeWorkJsonLd,
  writingItemListJsonLd,
  scholarlyArticleJsonLd,
} from '../src/lib/seo';

describe('personJsonLd', () => {
  it('uses the locale-specific jobTitle', () => {
    expect(personJsonLd(SITE, 'en').jobTitle).toBe('Back-End & Applied AI Engineer');
    expect(personJsonLd(SITE, 'tr').jobTitle).toContain('Yapay Zeka');
  });
  it('defaults to English and lists social profiles in sameAs', () => {
    const p = personJsonLd(SITE);
    expect(p['@type']).toBe('Person');
    expect(p.sameAs).toContain('https://github.com/OmerYasirOnal');
  });
});

describe('webSiteJsonLd', () => {
  it('emits a WebSite node bound to the origin', () => {
    const w = webSiteJsonLd(SITE);
    expect(w['@type']).toBe('WebSite');
    expect(w.url).toBe('https://omeryasironal.com');
    expect(w.inLanguage).toEqual(['en', 'tr']);
  });
});

describe('breadcrumbJsonLd', () => {
  it('numbers positions from 1', () => {
    const b = breadcrumbJsonLd([
      { name: 'Home', url: SITE + '/' },
      { name: 'Projects', url: SITE + '/projects/' },
    ]);
    expect(b['@type']).toBe('BreadcrumbList');
    expect(b.itemListElement[0].position).toBe(1);
    expect(b.itemListElement[1].item).toBe(SITE + '/projects/');
  });
});

describe('creativeWorkJsonLd', () => {
  it('binds the work to the person as author', () => {
    const c = creativeWorkJsonLd(
      { title: 'AKIS', description: 'Multi-agent platform.', category: 'AI-Agents', url: SITE + '/projects/akis/', stack: ['TypeScript', 'Node'] },
      SITE,
    );
    expect(c['@type']).toBe('CreativeWork');
    expect(c.name).toBe('AKIS');
    expect(c.author.name).toBe('Ömer Yasir Önal');
    expect(c.keywords).toBe('TypeScript, Node');
  });
});

describe('writingItemListJsonLd', () => {
  it('wraps each article as a positioned BlogPosting', () => {
    const l = writingItemListJsonLd(
      [{ title: 'RxDart', url: 'https://medium.com/x', date: '2025-01-02' }],
      SITE,
    );
    expect(l['@type']).toBe('ItemList');
    expect(l.itemListElement[0].item['@type']).toBe('BlogPosting');
    expect(l.itemListElement[0].item.datePublished).toBe('2025-01-02');
  });
});

describe('scholarlyArticleJsonLd', () => {
  it('emits a ScholarlyArticle with venue + year', () => {
    const s = scholarlyArticleJsonLd({ title: 'Paper', venue: 'IEEE SIU 2025', year: 2025 }, SITE);
    expect(s['@type']).toBe('ScholarlyArticle');
    expect(s.publication.name).toBe('IEEE SIU 2025');
    expect(s.datePublished).toBe('2025');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `pnpm exec vitest run test/seo.test.ts`
Expected: FAIL — new builders not exported; `personJsonLd` has no 2nd arg.

- [ ] **Step 3: Implement** — in `src/lib/seo.ts`, change the `personJsonLd` signature/body to be locale-aware and append the new builders.

Change the function signature line and the `jobTitle` line:

```ts
export function personJsonLd(site?: URL | string, locale: Locale = 'en'): PersonJsonLd {
```
```ts
    jobTitle: profile.role[locale],
```

Then append:

```ts
const origin = (site?: URL | string) =>
  site ? new URL(site).origin : 'https://omeryasironal.com';

const authorNode = (site?: URL | string) => ({
  '@type': 'Person' as const,
  name: profile.name,
  url: origin(site),
});

export function webSiteJsonLd(site?: URL | string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: profile.name,
    url: origin(site),
    inLanguage: ['en', 'tr'],
    author: authorNode(site),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function creativeWorkJsonLd(
  input: { title: string; description: string; category: string; url: string; stack: string[] },
  site?: URL | string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.title,
    description: input.description,
    genre: input.category,
    url: input.url,
    keywords: input.stack.join(', '),
    author: authorNode(site),
  };
}

export function writingItemListJsonLd(
  items: { title: string; url: string; date: string }[],
  site?: URL | string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'BlogPosting',
        headline: it.title,
        url: it.url,
        datePublished: it.date,
        author: authorNode(site),
      },
    })),
  };
}

export function scholarlyArticleJsonLd(
  input: { title: string; venue: string; year: number; url?: string },
  site?: URL | string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: input.title,
    ...(input.url ? { url: input.url } : {}),
    datePublished: String(input.year),
    publication: { '@type': 'PublicationEvent', name: input.venue },
    author: authorNode(site),
  };
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `pnpm exec vitest run test/seo.test.ts`
Expected: PASS (all describe blocks).

- [ ] **Step 5: Commit**

```bash
git add src/lib/seo.ts test/seo.test.ts
git commit -m "feat(seo): JSON-LD builders (WebSite, Breadcrumb, CreativeWork, ItemList, ScholarlyArticle)"
```

---

## Task 3: Inject JSON-LD into pages (EN + TR)

**Files:**
- Modify: `src/pages/index.astro`, `src/pages/tr/index.astro`
- Modify: `src/pages/projects/index.astro`, `src/pages/tr/projects/index.astro`
- Modify: `src/pages/projects/[...slug].astro`, `src/pages/tr/projects/[...slug].astro`
- Modify: `src/pages/writing/index.astro`, `src/pages/tr/writing/index.astro`

**Interfaces:**
- Consumes: builders from Task 2, `canonicalHref` from Task 1, `localizePath` from `i18n.ts`.

Pattern: each page computes its JSON-LD object(s) in frontmatter and emits them via the existing `<script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(x)} />` mechanism (already used in `index.astro:37-42`). Multiple objects → emit multiple scripts, or one script with an array. Use one script per object for clarity.

- [ ] **Step 1: Home — add `WebSite` + locale-aware `Person`.** In `src/pages/index.astro` change the import + jsonLd line:

Replace line 15 (`import { personJsonLd } from '../lib/seo';`) with:
```astro
import { personJsonLd, webSiteJsonLd } from '../lib/seo';
```
Replace line 22 (`const jsonLd = personJsonLd(Astro.site);`) with:
```astro
const personLd = personJsonLd(Astro.site, locale);
const siteLd = webSiteJsonLd(Astro.site);
```
Replace the single head script (lines 37-42) with:
```astro
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(personLd)} />
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(siteLd)} />
```
Apply the **same change** to `src/pages/tr/index.astro` (its `locale` is `'tr'`, so `personJsonLd(Astro.site, locale)` now correctly emits the Turkish `jobTitle`).

- [ ] **Step 2: Projects index — add `BreadcrumbList`.** In `src/pages/projects/index.astro`, add to imports:
```astro
import { breadcrumbJsonLd, canonicalHref } from '../../lib/seo';
import { localizePath } from '../../data/i18n';
```
After the `more` const (line 20), add:
```astro
const breadcrumbLd = breadcrumbJsonLd([
  { name: t(locale, 'nav.work'), url: canonicalHref(localizePath(locale, '/projects'), Astro.site!) },
]);
```
Add the head-slot script as the first child inside `<Base …>`:
```astro
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(breadcrumbLd)} />
```
Mirror in `src/pages/tr/projects/index.astro` (already `locale='tr'`; import paths identical since it is at the same depth).

- [ ] **Step 3: Project detail — add `CreativeWork` + `BreadcrumbList`.** In `src/pages/projects/[...slug].astro`, add to imports:
```astro
import { creativeWorkJsonLd, breadcrumbJsonLd, canonicalHref } from '../../lib/seo';
```
After `const hint = …` (line 36), add:
```astro
const url = canonicalHref(path, Astro.site!);
const workLd = creativeWorkJsonLd(
  { title: data.title, description: tagline, category: data.category, url, stack: data.stack },
  Astro.site!,
);
const breadcrumbLd = breadcrumbJsonLd([
  { name: t(locale, 'projects.title'), url: canonicalHref(localizePath(locale, '/projects'), Astro.site!) },
  { name: data.title, url },
]);
```
Add both scripts as the first children inside `<Base …>` (right after the opening tag, before `<SiteHeader …>`):
```astro
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(workLd)} />
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(breadcrumbLd)} />
```
Mirror in `src/pages/tr/projects/[...slug].astro`.

- [ ] **Step 4: Writing index — add `BreadcrumbList` + articles `ItemList` + publications `ScholarlyArticle`.** In `src/pages/writing/index.astro`, replace imports (lines 1-7) additions:
```astro
import { getCollection } from 'astro:content';
import { breadcrumbJsonLd, writingItemListJsonLd, scholarlyArticleJsonLd, canonicalHref } from '../../lib/seo';
import { t, localizePath, type Locale } from '../../data/i18n';
```
After `const path = '/writing';` add:
```astro
const articles = (await getCollection('writing')).sort(
  (a, b) => (a.data.date < b.data.date ? 1 : -1),
);
const pubs = await getCollection('publications');
const breadcrumbLd = breadcrumbJsonLd([
  { name: t(locale, 'section.writing'), url: canonicalHref(localizePath(locale, '/writing'), Astro.site!) },
]);
const articlesLd = writingItemListJsonLd(
  articles.map((a) => ({ title: a.data.title, url: a.data.url, date: a.data.date })),
  Astro.site!,
);
const pubsLd = pubs.map((p) =>
  scholarlyArticleJsonLd(
    { title: locale === 'en' ? p.data.title_en : p.data.title_tr, venue: p.data.venue, year: p.data.year, url: p.data.url },
    Astro.site!,
  ),
);
```
Add scripts as the first children inside `<Base …>`:
```astro
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(breadcrumbLd)} />
  <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(articlesLd)} />
  {pubsLd.map((p) => <script slot="head" type="application/ld+json" is:inline set:html={JSON.stringify(p)} />)}
```
Mirror in `src/pages/tr/writing/index.astro`.

- [ ] **Step 5: Build + verify JSON-LD is present and well-formed.**

Run: `pnpm build`
Then verify each page emits its JSON-LD types:
```bash
grep -c 'application/ld+json' dist/index.html            # expect 2 (Person + WebSite)
grep -o '"@type":"[A-Za-z]*"' dist/projects/akis/index.html   # expect CreativeWork + BreadcrumbList
grep -o '"@type":"[A-Za-z]*"' dist/writing/index.html         # expect BreadcrumbList + ItemList + ScholarlyArticle
grep -o '"jobTitle":"[^"]*"' dist/tr/index.html               # expect the Turkish role string
```
Expected: counts/types as annotated; the TR home `jobTitle` is Turkish (regression fixed).

- [ ] **Step 6: Validate JSON-LD parses** (catch any interpolation issue):
```bash
node -e "const fs=require('fs');for(const f of ['dist/index.html','dist/projects/akis/index.html','dist/writing/index.html']){const m=[...fs.readFileSync(f,'utf8').matchAll(/<script type=\"application\/ld\+json\"[^>]*>([\s\S]*?)<\/script>/g)];m.forEach(x=>JSON.parse(x[1]));console.log(f,'ok',m.length)}"
```
Expected: `… ok N` per file, no `SyntaxError`.

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro src/pages/tr/index.astro src/pages/projects src/pages/tr/projects src/pages/writing src/pages/tr/writing
git commit -m "feat(seo): inject page-level JSON-LD (WebSite, Breadcrumb, CreativeWork, ItemList, ScholarlyArticle) across en+tr"
```

---

## Task 4: `Base.astro` meta polish + CV social card

**Files:**
- Modify: `src/lib/og.ts`
- Modify: `src/pages/og/[...route].ts:23,45-58`
- Modify: `src/layouts/Base.astro`
- Modify: `src/pages/cv.astro:23-30`, `src/pages/tr/cv.astro`
- Modify: `src/pages/projects/[...slug].astro:39-45`, `src/pages/tr/projects/[...slug].astro`

**Interfaces:**
- Produces: `ogCvKey(locale)`, `ogCvPath(locale)` in `og.ts`; new `Base.astro` props `ogType?: 'website' | 'article'` (default `'website'`) and `robots?: string` (default `'index, follow'`).

- [ ] **Step 1: Add CV OG helpers** — append to `src/lib/og.ts`:
```ts
/** Route key + path for the /cv social card. */
export function ogCvKey(locale: Locale): string {
  return `cv${suffix(locale)}`;
}
export function ogCvPath(locale: Locale): string {
  return `/og/${ogCvKey(locale)}.png`;
}
```

- [ ] **Step 2: Register the CV OG page** — in `src/pages/og/[...route].ts`, add `ogCvKey` to the import on line 23:
```ts
import { ogHomeKey, ogProjectKey, ogProjectsKey, ogWritingKey, ogCvKey } from '../../lib/og';
```
Inside the `for (const locale of locales)` loop, after the `ogWritingKey` block (line 58), add:
```ts
  pages[ogCvKey(locale)] = {
    heading: t(locale, 'cv.title'),
    sub: profile.role[locale],
  };
```

- [ ] **Step 3: Extend `Base.astro` head.** Update the `Props` interface and destructure (lines 5-13) to add `ogType` + `robots`:
```astro
interface Props {
  title: string;
  description: string;
  lang?: 'en' | 'tr';
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  robots?: string;
}

const { title, description, lang = 'en', path, ogImage, ogType = 'website', robots = 'index, follow' } = Astro.props;
```
Then update the head. Replace the `og:type` line (29) with `{ogType}`; add `theme-color`, `author`, `robots`, `og:locale:alternate`, and image dimension/alt tags. The head block from line 24 becomes:
```astro
    <meta name="description" content={description} />
    <meta name="author" content="Ömer Yasir Önal" />
    <meta name="robots" content={robots} />
    <meta name="theme-color" content="#0a0a0b" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonical} />
    {alternates.map((a) => <link rel="alternate" hreflang={a.hreflang} href={a.href} />)}

    <!-- Open Graph -->
    <meta property="og:type" content={ogType} />
    <meta property="og:url" content={canonical} />
    <meta property="og:site_name" content="Ömer Yasir Önal" />
    <meta property="og:locale" content={lang === 'tr' ? 'tr_TR' : 'en_US'} />
    <meta property="og:locale:alternate" content={lang === 'tr' ? 'en_US' : 'tr_TR'} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
    {ogImageUrl && <meta property="og:image:alt" content={title} />}
    {ogImageUrl && <meta property="og:image:width" content="1200" />}
    {ogImageUrl && <meta property="og:image:height" content="630" />}
```
(Keep the existing Twitter block. No `twitter:site`/`twitter:creator` — the profile has no X/Twitter handle; do not invent one.)

- [ ] **Step 4: Give the CV pages a social card.** In `src/pages/cv.astro`, add to imports (line 6 area):
```astro
import { ogCvPath } from '../lib/og';
```
Add `ogImage={ogCvPath(locale)}` to the `<Base …>` props (after `lang={locale}` on line 29). Mirror in `src/pages/tr/cv.astro` (import path `../../lib/og`).

- [ ] **Step 5: Mark project case studies as `article`.** In `src/pages/projects/[...slug].astro`, add `ogType="article"` to the `<Base …>` props (after `ogImage=…` on line 44). Mirror in `src/pages/tr/projects/[...slug].astro`.

- [ ] **Step 6: Build + verify.**

Run: `pnpm build`
```bash
ls dist/og/cv.png dist/og/cv-tr.png                                 # CV cards generated
grep -o 'property="og:image" content="[^"]*"' dist/cv/index.html    # points at /og/cv.png
grep -o 'property="og:type" content="[^"]*"' dist/projects/akis/index.html   # "article"
grep -o 'name="theme-color" content="[^"]*"' dist/index.html        # "#0a0a0b"
grep -c 'name="author"' dist/index.html                             # 1
```
Expected: all present; project detail `og:type` is `article`; home stays `website`.

- [ ] **Step 7: Commit**

```bash
git add src/lib/og.ts src/pages/og src/layouts/Base.astro src/pages/cv.astro src/pages/tr/cv.astro src/pages/projects src/pages/tr/projects
git commit -m "feat(seo): og:type=article for case studies, CV social card, theme-color/author/og polish"
```

---

## Task 5: robots.txt — explicit AI-crawler allow groups

**Files:**
- Modify: `public/robots.txt`

- [ ] **Step 1: Rewrite `public/robots.txt`** to name the major AI crawlers explicitly above the wildcard (belt-and-suspenders against a future restrictive edit), keeping the wildcard and sitemap:
```
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: OAI-SearchBot
User-agent: ClaudeBot
User-agent: Claude-Web
User-agent: anthropic-ai
User-agent: PerplexityBot
User-agent: Google-Extended
User-agent: CCBot
User-agent: Applebot-Extended
Allow: /

User-agent: *
Allow: /

Sitemap: https://omeryasironal.com/sitemap-index.xml
```

- [ ] **Step 2: Verify it ships verbatim.**

Run: `pnpm build && grep -E 'GPTBot|ClaudeBot|PerplexityBot|Sitemap:' dist/robots.txt`
Expected: the AI-crawler lines + the sitemap line are present in `dist/robots.txt`.

- [ ] **Step 3: Commit**

```bash
git add public/robots.txt
git commit -m "feat(seo): explicitly allow major AI crawlers in robots.txt"
```

---

## Task 6: `llms.txt` + `llms-full.txt` (AIO corpus)

**Files:**
- Create: `src/lib/llms.ts`
- Create: `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`
- Test: `test/llms.test.ts` (create)

**Interfaces:**
- Consumes: `profile`; the routes pass in already-loaded collection data so the builders stay pure/testable.
- Produces:
  - `llmsTxt(data: LlmsData): string` — the concise llms.txt index.
  - `llmsFullTxt(data: LlmsFullData): string` — the expanded corpus.
  - Types `LlmsData`/`LlmsFullData` describing the inputs (projects, writing, publications).

- [ ] **Step 1: Write the failing test** — create `test/llms.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { llmsTxt, llmsFullTxt } from '../src/lib/llms';

const data = {
  site: 'https://omeryasironal.com',
  projects: [
    { slug: 'akis', title: 'AKIS', tagline: 'Multi-agent platform.', category: 'AI-Agents', stack: ['TypeScript'], status: 'Live', problem: 'P', whatIDid: 'W', highlights: ['H'], links: {} },
  ],
  writing: [{ title: 'RxDart', url: 'https://medium.com/x', source: 'Medium', date: '2025-01-02', lang: 'en' }],
  publications: [{ title: 'Paper', venue: 'IEEE SIU 2025', year: 2025, url: 'https://x' }],
};

describe('llmsTxt', () => {
  const out = llmsTxt(data);
  it('starts with the H1 name and a blockquote summary', () => {
    expect(out.startsWith('# Ömer Yasir Önal')).toBe(true);
    expect(out).toMatch(/\n> /);
  });
  it('lists projects with absolute URLs and taglines', () => {
    expect(out).toContain('- [AKIS](https://omeryasironal.com/projects/akis/): Multi-agent platform.');
  });
  it('links writing to its external URL', () => {
    expect(out).toContain('[RxDart](https://medium.com/x)');
  });
  it('reserves a Courses section for Phase 2', () => {
    expect(out).toContain('## Courses');
  });
  it('references the CV PDFs', () => {
    expect(out).toContain('/cv/omer-yasir-onal-en.pdf');
  });
});

describe('llmsFullTxt', () => {
  const out = llmsFullTxt(data);
  it('inlines the full bio and per-project problem/what-I-did', () => {
    expect(out).toContain(data.projects[0].problem);
    expect(out).toContain('Ömer Yasir Önal is a back-end');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `pnpm exec vitest run test/llms.test.ts`
Expected: FAIL — module `src/lib/llms.ts` does not exist.

- [ ] **Step 3: Implement `src/lib/llms.ts`:**

```ts
/**
 * Pure builders for the llms.txt AIO corpus. Kept independent of astro:content
 * so they unit-test with Vitest; the routes (src/pages/llms*.txt.ts) load the
 * collections and hand plain objects in, guaranteeing the output never drifts
 * from the visible site.
 */
import { profile } from '../data/profile';

export interface LlmsProject {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  stack: string[];
  status: string;
  problem?: string;
  whatIDid?: string;
  highlights: string[];
  links: Record<string, string | undefined>;
}
export interface LlmsWriting {
  title: string;
  url: string;
  source: string;
  date: string;
  lang: string;
}
export interface LlmsPublication {
  title: string;
  venue: string;
  year: number;
  url?: string;
}
export interface LlmsData {
  site: string;
  projects: LlmsProject[];
  writing: LlmsWriting[];
  publications: LlmsPublication[];
}

const abs = (site: string, path: string) => new URL(path, site).toString();

export function llmsTxt(data: LlmsData): string {
  const { site } = data;
  const lines: string[] = [];
  lines.push('# Ömer Yasir Önal');
  lines.push('');
  lines.push(`> ${profile.role.en} in Istanbul, Türkiye — ${profile.availability.en}`);
  lines.push('');
  lines.push(profile.about.en);
  lines.push('');
  lines.push('## Projects');
  for (const p of data.projects) {
    lines.push(`- [${p.title}](${abs(site, `/projects/${p.slug}/`)}): ${p.tagline}`);
  }
  lines.push('');
  lines.push('## Writing');
  for (const w of data.writing) {
    lines.push(`- [${w.title}](${w.url}): ${w.source}, ${w.date} (${w.lang})`);
  }
  lines.push('');
  lines.push('## Publications');
  for (const pub of data.publications) {
    lines.push(`- ${pub.title} — ${pub.venue}, ${pub.year}${pub.url ? ` (${pub.url})` : ''}`);
  }
  lines.push('');
  lines.push('## Courses');
  lines.push('_Coming soon — small, focused courses will be published here and in the mobile app._');
  lines.push('');
  lines.push('## CV');
  lines.push(`- [Résumé (English)](${abs(site, '/cv/omer-yasir-onal-en.pdf')})`);
  lines.push(`- [Résumé (EU / GDPR)](${abs(site, '/cv/omer-yasir-onal-eu.pdf')})`);
  lines.push(`- [Résumé (Türkçe)](${abs(site, '/cv/omer-yasir-onal-tr.pdf')})`);
  lines.push('');
  lines.push('## Contact');
  lines.push(`- Email: ${profile.email}`);
  for (const [, link] of Object.entries(profile.links)) {
    lines.push(`- ${link.label}: ${link.url}`);
  }
  lines.push('');
  return lines.join('\n');
}

export function llmsFullTxt(data: LlmsData): string {
  const { site } = data;
  const s: string[] = [];
  s.push('# Ömer Yasir Önal — Full Profile');
  s.push('');
  s.push(`## About`);
  s.push(profile.about.en);
  s.push('');
  s.push('### Taglines');
  for (const tl of profile.taglines.en) s.push(`- ${tl}`);
  s.push('');
  s.push('### Skills');
  for (const g of profile.skillGroups) s.push(`- ${g.title_en}: ${g.items.join(', ')}`);
  s.push('');
  s.push(`### Education`);
  s.push(`${profile.education.degree_en}, ${profile.education.school_en} (${profile.education.graduation_en})`);
  s.push('');
  s.push('## Projects');
  for (const p of data.projects) {
    s.push(`### ${p.title} — ${abs(site, `/projects/${p.slug}/`)}`);
    s.push(`${p.tagline}`);
    s.push(`Status: ${p.status}. Stack: ${p.stack.join(', ')}.`);
    if (p.problem) s.push(`Problem: ${p.problem}`);
    if (p.whatIDid) s.push(`What I did: ${p.whatIDid}`);
    if (p.highlights.length) s.push(`Highlights: ${p.highlights.join('; ')}`);
    const links = Object.entries(p.links).filter(([, v]) => v);
    if (links.length) s.push(`Links: ${links.map(([k, v]) => `${k}: ${v}`).join(', ')}`);
    s.push('');
  }
  s.push('## Writing');
  for (const w of data.writing) s.push(`- ${w.title} (${w.source}, ${w.date}): ${w.url}`);
  s.push('');
  s.push('## Publications');
  for (const pub of data.publications) s.push(`- ${pub.title} — ${pub.venue}, ${pub.year}`);
  s.push('');
  return s.join('\n');
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `pnpm exec vitest run test/llms.test.ts`
Expected: PASS.

- [ ] **Step 5: Create the routes.** `src/pages/llms.txt.ts`:
```ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { llmsTxt, type LlmsData } from '../lib/llms';

export const GET: APIRoute = async ({ site }) => {
  const data = await loadLlmsData(site!.toString());
  return new Response(llmsTxt(data), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

export async function loadLlmsData(site: string): Promise<LlmsData> {
  const projects = (await getCollection('projects', (e) => !e.data.draft)).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const writing = (await getCollection('writing')).sort((a, b) =>
    a.data.date < b.data.date ? 1 : -1,
  );
  const publications = await getCollection('publications');
  return {
    site,
    projects: projects.map((p) => ({
      slug: p.id,
      title: p.data.title,
      tagline: p.data.tagline_en,
      category: p.data.category,
      stack: p.data.stack,
      status: p.data.status_en,
      problem: p.data.problem_en,
      whatIDid: p.data.what_i_did_en,
      highlights: p.data.highlights_en,
      links: p.data.links,
    })),
    writing: writing.map((w) => ({
      title: w.data.title,
      url: w.data.url,
      source: w.data.source,
      date: w.data.date,
      lang: w.data.lang,
    })),
    publications: publications.map((p) => ({
      title: p.data.title_en,
      venue: p.data.venue,
      year: p.data.year,
      url: p.data.url,
    })),
  };
}
```
`src/pages/llms-full.txt.ts`:
```ts
import type { APIRoute } from 'astro';
import { llmsFullTxt } from '../lib/llms';
import { loadLlmsData } from './llms.txt';

export const GET: APIRoute = async ({ site }) => {
  const data = await loadLlmsData(site!.toString());
  return new Response(llmsFullTxt(data), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
```

- [ ] **Step 6: Build + verify the routes emit static files.**

Run: `pnpm build`
```bash
head -5 dist/llms.txt                                  # H1 + blockquote
grep -c 'omeryasironal.com/projects/' dist/llms.txt    # >= number of non-draft projects
grep -c 'Ömer Yasir Önal is a back-end' dist/llms-full.txt   # 1
```
Expected: `dist/llms.txt` and `dist/llms-full.txt` exist with the expected content.

- [ ] **Step 7: Reference llms.txt from robots.txt** (discoverability) — append to `public/robots.txt` after the `Sitemap:` line:
```
# AI: see /llms.txt and /llms-full.txt for a machine-readable profile.
```

- [ ] **Step 8: Commit**

```bash
git add src/lib/llms.ts src/pages/llms.txt.ts src/pages/llms-full.txt.ts test/llms.test.ts public/robots.txt
git commit -m "feat(aio): generate llms.txt + llms-full.txt from profile + collections"
```

---

## Task 7: Font preload for LCP

**Files:**
- Modify: `src/layouts/Base.astro`

**Interfaces:** none (self-contained head addition).

- [ ] **Step 1: Preload the primary Inter latin woff2.** In `src/layouts/Base.astro` frontmatter, add a Vite `?url` import so the hashed build path resolves automatically:
```astro
import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
```
In the head, immediately before `<link rel="canonical" …>`, add:
```astro
    <link rel="preload" href={interLatin} as="font" type="font/woff2" crossorigin />
```
(Preload only Inter latin — the LCP heading/body font. JetBrains Mono is used for small metadata only; preloading it too would compete for bandwidth and hurt LCP.)

- [ ] **Step 2: Build + verify the preload resolves to a hashed asset.**

Run: `pnpm build && grep -o 'rel="preload"[^>]*as="font"[^>]*' dist/index.html`
Expected: a `<link rel="preload" href="/_astro/inter-latin-wght-normal.<hash>.woff2" as="font" type="font/woff2" crossorigin>`; the referenced file exists under `dist/_astro/`.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "perf(fonts): preload Inter latin woff2 to cut LCP font swap"
```

---

## Task 8: Final verification pass (typecheck, tests, Lighthouse, sitemap)

**Files:** none (verification only).

- [ ] **Step 1: Typecheck + full test suite.**

Run: `pnpm astro check && pnpm exec vitest run`
Expected: 0 errors; all tests pass (existing + new `seo`/`llms` suites).

- [ ] **Step 2: Clean build + sitemap sanity.**

Run: `pnpm build`
```bash
grep -c '<url>' dist/sitemap-0.xml                    # unchanged count (no cv-print, no llms.txt-as-page)
grep -c 'hreflang="x-default"' dist/cv/index.html     # 1 (head-level x-default now present)
```
Expected: sitemap URL count unchanged from before this plan; x-default present in-head.

- [ ] **Step 3: Lighthouse audit (Brave, automation profile).** Serve the build and run Lighthouse via the Chrome DevTools MCP against the home + a project detail page.

Run (background): `pnpm preview --port 4321`
Then, via the chrome-devtools MCP: `navigate_page` to `http://localhost:4321/`, run `lighthouse_audit` for categories `performance, accessibility, seo, best-practices`; repeat for `http://localhost:4321/projects/akis/`.
Expected targets: **SEO ≥ 100, Accessibility ≥ 95, Performance ≥ 95, Best-Practices ≥ 95**. Record scores in the commit / PR body.

- [ ] **Step 4: If any Lighthouse target is missed**, capture the specific audit (e.g. LCP element, unused CSS, contrast) and open a follow-up step; do not silently accept a miss. Re-run after the fix.

- [ ] **Step 5: Final commit / summary** (if Step 4 produced changes; otherwise nothing to commit — verification only).

```bash
git commit --allow-empty -m "chore(seo): Phase 1 verification — Lighthouse SEO/perf/a11y pass"
```

---

## Self-Review

**Spec coverage** (`docs/specs/2026-07-01-content-platform-design.md` §6 AIO + Phase 1 row):
- JSON-LD Person/Article/BreadcrumbList/Course/WebSite → Tasks 2-3 (Course JSON-LD deferred with courses to Phase 2; Person/WebSite/Breadcrumb/CreativeWork/BlogPosting/ScholarlyArticle done now). ✅
- `llms.txt` + `llms-full.txt` → Task 6. ✅
- Canonical + hreflang across en/tr mirror → Task 1. ✅
- `robots.txt` allows AI crawlers + references sitemap → Task 5 (+ Task 6 Step 7). ✅
- Lighthouse perf/SEO/a11y pass → Tasks 7-8. ✅
- Meta/robots/canonical audit polish (theme-color, author, og:type, CV card) → Task 4. ✅

**Deferred (documented, not gaps):** RSS/`feed.json` → Phase 2; `_headers`/`_redirects` → Phase 3; `Course` JSON-LD → Phase 2 (needs the courses collection). SearchAction omitted (no site search).

**Placeholder scan:** none — every step has concrete code/commands.

**Type consistency:** `personJsonLd(site?, locale?)` signature change propagated to both home pages (Task 3 Step 1). `hreflangLinks`/`canonicalHref` (Task 1) reused verbatim in Tasks 3-4. `loadLlmsData` defined in `llms.txt.ts` and imported by `llms-full.txt.ts` (Task 6). `ogCvKey`/`ogCvPath` defined in `og.ts` (Task 4 Step 1) before use (Steps 2, 4).
