# Phase 3 — Vercel Delivery Optimization Implementation Plan

**Status: implemented — 2026-07-02** (all tasks executed + reviewed; headers curl-verified on the PR #2 Vercel preview via share link)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden and formalize the site's delivery on Vercel — security headers + targeted cache rules via `vercel.json`, a build-gating feed-contract tripwire, a corrected spec, and preview-deploy verification.

**Architecture:** The site is a static Astro build deployed by Vercel's GitHub integration (master → production, PR → preview; Vercel DNS). Delivery config lives in a repo-tracked `vercel.json` (headers only — no functions/rewrites). The feed contract (spec §5) gets a pure, unit-tested validator that runs at the end of every `pnpm build`, so a contract break fails CI and any Vercel build that runs the package build script.

**Tech Stack:** Vercel static hosting, `vercel.json` headers, Node ESM script (`scripts/*.mjs` pattern like `build-cv.mjs`), Vitest, GitHub Actions (existing `ci.yml`), `gh` CLI + Vercel preview for verification.

## Global Constraints

- **Hosting fact (verified live 2026-07-02):** Vercel serves production (`server: Vercel`, Vercel DNS nameservers); Cloudflare is NOT in the path. The spec's "Cloudflare Pages hosting" premise is superseded — user decision: stay on Vercel.
- **Do not duplicate platform headers:** Vercel already sends `Strict-Transport-Security: max-age=63072000` and serves `/_astro/*` with `public, max-age=31536000, immutable` — `vercel.json` must NOT set HSTS and must NOT target `/_astro/`.
- Feed contract v1 (spec §5): `{version:'1', site:<origin, no trailing slash>, items:[{type:'post'|'course', slug, lang:'en'|'tr', title, description, date?, updated?, tags[], url, lessons?}]}` — URLs absolute + trailing-slashed; posts carry `date`, never `lessons`; courses carry non-empty `lessons` (each `slug`/`title`/`url` under the course URL). **Additive evolution:** unknown extra fields must NOT be violations.
- Work on branch `phase3-vercel-delivery` off `master`; commit style `feat|fix|docs|ci(scope): summary`; tests `pnpm vitest run` (baseline 81 green); build `pnpm build` (44 pages).
- Package manager pnpm; no new dependencies at all.

## Design decisions (locked during planning)

- **Security headers** (global `/(.*)`): `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Content-Security-Policy: frame-ancestors 'none'` (frame-ancestors only — a full CSP would need auditing every inline script and is out of scope), `Permissions-Policy: camera=(), microphone=(), geolocation=()`. No HSTS (platform provides).
- **Cache rules:** `/og/*` and `/cv/*` get `public, max-age=3600` (stable names, rarely-changing content; currently `max-age=0`). Feeds (`/feed.json`, `/rss.xml`, `/llms*.txt`) keep the platform default `max-age=0, must-revalidate` — Vercel's edge already caches them (observed `x-vercel-cache: HIT`, `age` header, ETag revalidation), which satisfies the spec's "edge cache for feeds" without risking staleness. This is verified, not configured.
- **Tripwire enforcement point:** appended to the package `build` script (`astro build && node scripts/check-dist-contract.mjs`). This gates GitHub Actions CI (which runs `pnpm build`) and any Vercel build using the package script. pnpm does NOT auto-run `postbuild` scripts, so chaining inside `build` is the reliable wiring.
- **`_redirects`:** none needed (Vercel handles trailing slashes; no moved URLs). Explicitly out of scope.
- **Preview-deploy verification is the controller's Task 4** (needs `gh`, possibly Vercel MCP for protected previews) — not a subagent task.

## File structure

```
scripts/check-dist-contract.mjs      (create: pure validators + CLI over dist/)
test/feed-contract.test.ts           (create: validator unit tests)
vercel.json                          (create: headers config)
test/vercel-config.test.ts           (create: config sanity tests)
package.json                         (modify: build script chains the tripwire)
.github/workflows/ci.yml             (modify: refresh stale linkinator comment)
docs/specs/2026-07-01-content-platform-design.md  (modify: dated Vercel amendment)
```

---

### Task 1: Feed-contract tripwire (validator + build wiring)

**Files:**
- Create: `scripts/check-dist-contract.mjs`
- Test: `test/feed-contract.test.ts`
- Modify: `package.json` (build script)
- Modify: `.github/workflows/ci.yml` (comment only)

**Interfaces:**
- Produces: `validateFeed(feed: unknown): string[]` and `checkDist(distDir: string): string[]` (named exports of `scripts/check-dist-contract.mjs`; empty array = pass). CLI: `node scripts/check-dist-contract.mjs [distDir=dist]` exits 1 and prints violations on failure, prints `feed contract check passed` on success.

- [ ] **Step 1: Create the feature branch**

```bash
git checkout master && git pull --ff-only && git checkout -b phase3-vercel-delivery
```

- [ ] **Step 2: Write the failing tests**

`test/feed-contract.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { validateFeed } from '../scripts/check-dist-contract.mjs';

const SITE = 'https://omeryasironal.com';

const validPost = {
  type: 'post',
  slug: 'writing-comes-home',
  lang: 'en',
  title: 'Writing comes home',
  description: 'D',
  date: '2026-07-01',
  tags: ['meta'],
  url: `${SITE}/writing/writing-comes-home/`,
};

const validCourse = {
  type: 'course',
  slug: 'demo-course',
  lang: 'en',
  title: 'Demo',
  description: 'CD',
  tags: [],
  url: `${SITE}/courses/demo-course/`,
  lessons: [
    { slug: '01-first-lesson', title: 'L1', url: `${SITE}/courses/demo-course/01-first-lesson/` },
  ],
};

const validFeed = { version: '1', site: SITE, items: [validPost, validCourse] };

describe('validateFeed', () => {
  it('passes a contract-v1 feed with a post and a course', () => {
    expect(validateFeed(validFeed)).toEqual([]);
  });

  it('rejects a wrong version and a trailing-slashed site', () => {
    expect(validateFeed({ ...validFeed, version: '2' }).join()).toMatch(/version/);
    expect(validateFeed({ ...validFeed, site: `${SITE}/` }).join()).toMatch(/site/);
  });

  it('rejects a post carrying lessons and a missing post date', () => {
    const withLessons = { ...validPost, lessons: [] };
    expect(validateFeed({ ...validFeed, items: [withLessons] }).join()).toMatch(/lessons/);
    const { date: _drop, ...noDate } = validPost;
    expect(validateFeed({ ...validFeed, items: [noDate] }).join()).toMatch(/date/);
  });

  it('rejects non-trailing-slash and off-site URLs', () => {
    const badUrl = { ...validPost, url: `${SITE}/writing/writing-comes-home` };
    expect(validateFeed({ ...validFeed, items: [badUrl] }).join()).toMatch(/url/);
    const offSite = { ...validPost, url: 'https://example.com/writing/x/' };
    expect(validateFeed({ ...validFeed, items: [offSite] }).join()).toMatch(/url/);
  });

  it('rejects a course without lessons and a lesson URL outside the course', () => {
    const noLessons = { ...validCourse, lessons: [] };
    expect(validateFeed({ ...validFeed, items: [noLessons] }).join()).toMatch(/lessons/);
    const strayLesson = {
      ...validCourse,
      lessons: [{ slug: 'x', title: 'X', url: `${SITE}/writing/x/` }],
    };
    expect(validateFeed({ ...validFeed, items: [strayLesson] }).join()).toMatch(/lessons\[0\]/);
  });

  it('tolerates unknown extra fields (additive evolution within v1)', () => {
    const extended = {
      ...validFeed,
      generator: 'astro',
      items: [{ ...validPost, readingMinutes: 3 }, { ...validCourse, level: 'beginner' }],
    };
    expect(validateFeed(extended)).toEqual([]);
  });

  it('rejects an empty items array and a non-object feed', () => {
    expect(validateFeed({ ...validFeed, items: [] }).join()).toMatch(/items/);
    expect(validateFeed(null).length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm vitest run test/feed-contract.test.ts`
Expected: FAIL — cannot resolve `../scripts/check-dist-contract.mjs`.

- [ ] **Step 4: Implement the validator + CLI**

`scripts/check-dist-contract.mjs`:

```js
/**
 * Build-time tripwire for the machine-feed contract (spec §5, contract v1).
 * The Flutter app and AI crawlers consume /feed.json — a contract break must
 * fail the build, not ship. Runs as the tail of `pnpm build`; also directly:
 *   node scripts/check-dist-contract.mjs [distDir=dist]
 *
 * Unknown extra fields are tolerated by design: contract v1 evolves
 * additively, so the checker only asserts what consumers rely on.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LANGS = new Set(['en', 'tr']);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Validate a parsed feed.json against contract v1. Empty array = pass. */
export function validateFeed(feed) {
  if (!feed || typeof feed !== 'object' || Array.isArray(feed)) {
    return ['feed.json: expected a JSON object'];
  }
  const errors = [];
  if (feed.version !== '1') {
    errors.push(`version: expected "1", got ${JSON.stringify(feed.version)}`);
  }
  if (typeof feed.site !== 'string' || !/^https:\/\/[^/]+$/.test(feed.site)) {
    errors.push(`site: expected an https origin without trailing slash, got ${JSON.stringify(feed.site)}`);
  }
  if (!Array.isArray(feed.items) || feed.items.length === 0) {
    errors.push('items: expected a non-empty array');
    return errors;
  }
  feed.items.forEach((item, i) => {
    const at = `items[${i}] (${item?.slug ?? '?'})`;
    if (item.type !== 'post' && item.type !== 'course') {
      errors.push(`${at}: type must be "post" or "course"`);
    }
    for (const key of ['slug', 'title', 'description']) {
      if (typeof item[key] !== 'string' || item[key] === '') {
        errors.push(`${at}: ${key} must be a non-empty string`);
      }
    }
    if (!LANGS.has(item.lang)) errors.push(`${at}: lang must be "en" or "tr"`);
    if (!Array.isArray(item.tags) || item.tags.some((t) => typeof t !== 'string')) {
      errors.push(`${at}: tags must be an array of strings`);
    }
    if (
      typeof item.url !== 'string' ||
      !item.url.startsWith(`${feed.site}/`) ||
      !item.url.endsWith('/')
    ) {
      errors.push(`${at}: url must be absolute under site and trailing-slashed`);
    }
    if (item.type === 'post') {
      if (!ISO_DATE.test(item.date ?? '')) errors.push(`${at}: post date must be YYYY-MM-DD`);
      if (item.updated !== undefined && !ISO_DATE.test(item.updated)) {
        errors.push(`${at}: updated must be YYYY-MM-DD when present`);
      }
      if ('lessons' in item) errors.push(`${at}: a post must not carry lessons`);
    } else if (item.type === 'course') {
      if (item.date !== undefined && !ISO_DATE.test(item.date)) {
        errors.push(`${at}: course date must be YYYY-MM-DD when present`);
      }
      if (!Array.isArray(item.lessons) || item.lessons.length === 0) {
        errors.push(`${at}: a course must carry a non-empty lessons array`);
      } else {
        item.lessons.forEach((lesson, j) => {
          const lat = `${at}.lessons[${j}]`;
          if (typeof lesson.slug !== 'string' || lesson.slug === '') {
            errors.push(`${lat}: slug must be a non-empty string`);
          }
          if (typeof lesson.title !== 'string' || lesson.title === '') {
            errors.push(`${lat}: title must be a non-empty string`);
          }
          if (
            typeof lesson.url !== 'string' ||
            !lesson.url.startsWith(`${feed.site}/courses/${item.slug}/`) ||
            !lesson.url.endsWith('/')
          ) {
            errors.push(`${lat}: url must live under the course URL and be trailing-slashed`);
          }
        });
      }
    }
  });
  return errors;
}

/** Validate the built dist/ surface: feed contract + companion feeds exist. */
export function checkDist(distDir) {
  const errors = [];
  const feedPath = path.join(distDir, 'feed.json');
  if (!existsSync(feedPath)) {
    errors.push('dist/feed.json missing');
  } else {
    try {
      errors.push(...validateFeed(JSON.parse(readFileSync(feedPath, 'utf8'))));
    } catch (e) {
      errors.push(`dist/feed.json is not valid JSON: ${e.message}`);
    }
  }
  const rssPath = path.join(distDir, 'rss.xml');
  if (!existsSync(rssPath)) errors.push('dist/rss.xml missing');
  else if (!readFileSync(rssPath, 'utf8').includes('<rss')) {
    errors.push('dist/rss.xml has no <rss> element');
  }
  for (const name of ['llms.txt', 'llms-full.txt', 'sitemap-index.xml']) {
    const p = path.join(distDir, name);
    if (!existsSync(p) || readFileSync(p, 'utf8').trim() === '') {
      errors.push(`dist/${name} missing or empty`);
    }
  }
  return errors;
}

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const distDir = path.resolve(process.argv[2] ?? 'dist');
  const errors = checkDist(distDir);
  if (errors.length > 0) {
    console.error(`feed contract check FAILED (${errors.length} violation${errors.length === 1 ? '' : 's'}):`);
    for (const e of errors) console.error(` - ${e}`);
    process.exit(1);
  }
  console.log('feed contract check passed');
}
```

Also create `scripts/check-dist-contract.d.mts` so the TypeScript test (and `astro check`) sees typed exports for the `.mjs` module:

```ts
export function validateFeed(feed: unknown): string[];
export function checkDist(distDir: string): string[];
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm vitest run test/feed-contract.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 6: Wire the tripwire into the build**

In `package.json`, change:

```json
    "build": "astro build",
```

to:

```json
    "build": "astro build && node scripts/check-dist-contract.mjs",
```

- [ ] **Step 7: Refresh the stale CI comment**

In `.github/workflows/ci.yml`, the link-check comment block still says the production domain "is not attached yet". Replace the line:

```
      #   - The canonical/OG absolute URLs point at the production domain
      #     (https://omeryasironal.com), which is not attached yet, so those
      #     self-references are skipped rather than resolved over the network.
```

with:

```
      #   - The canonical/OG absolute URLs point at the production domain
      #     (https://omeryasironal.com, live on Vercel); crawling them from CI
      #     would just hammer the live site, so self-references are skipped —
      #     dist/ itself is what's being checked.
```

- [ ] **Step 8: Verify the wired build end-to-end (pass AND fail paths)**

```bash
pnpm build 2>&1 | tail -3          # expect: "feed contract check passed" after the astro build lines
node scripts/check-dist-contract.mjs dist   # expect: feed contract check passed
node -e "
const fs=require('fs');
const f=JSON.parse(fs.readFileSync('dist/feed.json','utf8'));
f.version='9';
fs.writeFileSync('dist/feed.json', JSON.stringify(f));
"
node scripts/check-dist-contract.mjs dist; echo "exit=$?"   # expect: FAILED ... version ... exit=1
pnpm build 2>&1 | tail -2          # regenerate a clean dist; expect pass again
pnpm vitest run                    # expect 88 tests green (81 + 7)
```

- [ ] **Step 9: Commit**

```bash
git add scripts/check-dist-contract.mjs scripts/check-dist-contract.d.mts test/feed-contract.test.ts package.json .github/workflows/ci.yml
git commit -m "ci(feeds): build-gating feed-contract tripwire (contract v1)"
```

---

### Task 2: vercel.json — security headers + cache rules

**Files:**
- Create: `vercel.json`
- Test: `test/vercel-config.test.ts`

**Interfaces:**
- Produces: repo-tracked Vercel delivery config; consumed by Vercel at deploy time (headers apply on preview + production).

- [ ] **Step 1: Write the failing test**

`test/vercel-config.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const raw = readFileSync(new URL('../vercel.json', import.meta.url), 'utf8');
const config = JSON.parse(raw);
type HeaderRule = { source: string; headers: { key: string; value: string }[] };
const rules: HeaderRule[] = config.headers;

describe('vercel.json', () => {
  it('contains only a headers config (no functions/rewrites/redirects)', () => {
    const keys = Object.keys(config).filter((k) => k !== '$schema');
    expect(keys).toEqual(['headers']);
  });

  it('applies the full security header set to every route', () => {
    const all = rules.find((r) => r.source === '/(.*)');
    expect(all).toBeDefined();
    const byKey = Object.fromEntries(all!.headers.map((h) => [h.key, h.value]));
    expect(byKey['X-Content-Type-Options']).toBe('nosniff');
    expect(byKey['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
    expect(byKey['X-Frame-Options']).toBe('DENY');
    expect(byKey['Content-Security-Policy']).toBe("frame-ancestors 'none'");
    expect(byKey['Permissions-Policy']).toBe('camera=(), microphone=(), geolocation=()');
  });

  it('gives OG images and CV PDFs a one-hour browser cache', () => {
    for (const source of ['/og/(.*)', '/cv/(.*)']) {
      const rule = rules.find((r) => r.source === source);
      expect(rule, source).toBeDefined();
      const cache = rule!.headers.find((h) => h.key === 'Cache-Control');
      expect(cache?.value).toBe('public, max-age=3600');
    }
  });

  it('does not duplicate platform behavior (no HSTS, no /_astro override)', () => {
    const allHeaderKeys = rules.flatMap((r) => r.headers.map((h) => h.key.toLowerCase()));
    expect(allHeaderKeys).not.toContain('strict-transport-security');
    expect(rules.some((r) => r.source.includes('_astro'))).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run test/vercel-config.test.ts`
Expected: FAIL — `vercel.json` does not exist (readFileSync ENOENT).

- [ ] **Step 3: Create vercel.json**

`vercel.json`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Content-Security-Policy", "value": "frame-ancestors 'none'" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/og/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=3600" }]
    },
    {
      "source": "/cv/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=3600" }]
    }
  ]
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run test/vercel-config.test.ts`
Expected: PASS (4 tests). Then `pnpm vitest run` — 92 tests green.

- [ ] **Step 5: Commit**

```bash
git add vercel.json test/vercel-config.test.ts
git commit -m "feat(delivery): security headers + og/cv cache rules via vercel.json"
```

---

### Task 3: Spec amendment — hosting is Vercel

**Files:**
- Modify: `docs/specs/2026-07-01-content-platform-design.md`

**Interfaces:**
- Produces: spec §2/§4 no longer claim Cloudflare hosting; a dated amendment records the correction and decision.

- [ ] **Step 1: Add the amendment block**

In `docs/specs/2026-07-01-content-platform-design.md`, directly under the `## 2. Architecture decisions (conflicts resolved)` heading, insert:

```markdown
> **Amendment (2026-07-02):** live-header + DNS evidence showed production is hosted on
> **Vercel** (GitHub integration, Vercel DNS nameservers) — not Cloudflare Pages as this
> section originally assumed. Decision: **stay on Vercel**. Phase 3 is re-scoped to
> "delivery optimization on Vercel" (`vercel.json` security/cache headers + a build-gating
> feed-contract check); the Cloudflare-specific items (`_headers`/`_redirects`, CF edge
> config) are superseded. Vercel provides HSTS, immutable `/_astro/*` caching, edge caching
> with ETag revalidation for feeds, and per-PR preview deploys out of the box.
```

- [ ] **Step 2: Correct the §2 hosting bullet**

Replace:

```markdown
- **Cloudflare** = hosting/CDN for the website (already in place). No Workers/D1 needed for v1.
```

with:

```markdown
- **Vercel** = hosting/CDN for the website (see 2026-07-02 amendment above; originally
  written as Cloudflare). No serverless functions needed for v1 — fully static.
```

- [ ] **Step 3: Correct the §4 Phase-3 row**

Replace the Phase 3 table row:

```markdown
| **3 · Cloudflare optimization** | Confirm CF Pages build, headers/caching, `_headers`/`_redirects`, edge cache for feeds, preview deploys | Cloudflare | med |
```

with:

```markdown
| **3 · Delivery optimization (Vercel)** | `vercel.json` security headers + og/cv cache rules, build-gating feed-contract check in CI, verify edge caching of feeds + preview deploys | Vercel | low |
```

- [ ] **Step 4: Verify and commit**

```bash
grep -n 'Vercel' docs/specs/2026-07-01-content-platform-design.md | head -5   # amendment + bullet + row present
grep -cn 'Cloudflare Pages hosting' docs/specs/2026-07-01-content-platform-design.md || true
git add docs/specs/2026-07-01-content-platform-design.md
git commit -m "docs(spec): amend hosting to Vercel; re-scope phase 3 delivery"
```

---

### Task 4 (controller-executed): PR + preview-deploy verification

**Files:** none (verification only). This task is executed by the controller directly (needs `gh` and possibly the Vercel MCP for protected preview URLs) — do NOT dispatch a subagent.

- [ ] **Step 1: Push the branch and open a PR**

```bash
git push -u origin phase3-vercel-delivery
gh pr create --title "Phase 3: Vercel delivery optimization" --body "..."
```

- [ ] **Step 2: Wait for CI green** (`gh pr checks --watch`) — the build step now includes the feed-contract tripwire.

- [ ] **Step 3: Verify headers on the Vercel preview deployment**

Find the preview URL (Vercel bot PR comment or Vercel MCP `list_deployments`). Then:

```bash
curl -sI <preview>/ | grep -iE 'x-content-type-options|referrer-policy|x-frame-options|content-security-policy|permissions-policy'
curl -sI <preview>/og/home.png | grep -i cache-control      # expect public, max-age=3600
curl -sI <preview>/feed.json | grep -iE 'cache-control|access-control'  # unchanged defaults + CORS *
```

If the preview returns 401 (Vercel deployment protection), obtain access via the Vercel MCP (`get_access_to_vercel_url`) or defer header verification to production immediately after merge (revert is one `git revert` away).

- [ ] **Step 4: Hand off the merge decision to the user** (finishing-a-development-branch), then after merge verify production:

```bash
curl -sI https://omeryasironal.com/ | grep -iE 'x-content-type-options|x-frame-options'
curl -sI https://omeryasironal.com/og/home.png | grep -i cache-control
curl -sI https://omeryasironal.com/feed.json | grep -iE 'x-vercel-cache|etag'   # edge cache still active
```
