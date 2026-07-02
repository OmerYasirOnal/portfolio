# Site Polish — Deferred-Backlog Burn-Down Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close every remaining site-side development item — the follow-up findings deferred by the Phase-2/Phase-3 final reviews plus the old Phase-A ledger leftovers — leaving the website backlog empty before Flutter work begins.

**Architecture:** Small, file-cohesive fix groups over the existing structure: pure-lib polish (llms/seo/courses/feed), page/style polish, tripwire upgrade (feed URLs must map to built pages), and a favicon.ico generated from the existing SVG via the already-installed `sharp` (same committed-artifact pattern as the CV PDFs).

**Tech Stack:** Existing stack only — Astro 5, Vitest, sharp, Node ESM scripts. **No new dependencies.**

## Global Constraints

- Branch `site-polish-backlog` off `master`; commit style `fix|feat|docs|test(scope): summary`; tests `pnpm vitest run` (baseline **95** green); build `pnpm build` (44 pages + `feed contract check passed`); types `pnpm astro check` (0 errors).
- Feed contract v1 stays additive-only; llms.txt/rss.xml output changes must keep all existing tests green except where a test is explicitly updated below.
- No hard-coded user-facing copy in pages (i18n `t()` only); EN/TR twin parity for any page edit.
- **Wontfix list (decided — do NOT implement, they are recorded here so nobody "helpfully" fixes them):** `→` glyph inside `writing.browseCourses` i18n value (matches the existing `work.viewAll` convention); `rssItems` lacking `updated` (RSS 2.0 has no per-item modified field); `p.body ?? ''` fallback in the llms loader (harmless type guard); `site.replace(/\/$/,'')` single-strip (Astro emits exactly one trailing slash); mobile <640px hiding the section nav (accepted single-scroll UX); `seo.ts` `updated ?? date` empty-string fallback (unreachable — Zod `isoDate` regex + `.min(1)` block empty strings).

## Backlog → task mapping

| Deferred item (source) | Task |
|---|---|
| llms.txt Writing grouped, not merged newest-first (P2 final review) | 1 |
| llms.txt "1 lessons" grammar (P2) | 1 |
| courseJsonLd: dup `authorNode` objects + empty-tags branch untested (P2) | 1 |
| `sortLessons` comparator never returns 0; multi-course mixing undocumented; `lessonSlugOf` slashless untested (P2) | 1 |
| RSS title string duplicated Base ↔ rss.xml.ts (P2) | 1 |
| RSS `<language>en</language>` on a mixed en/tr feed (P2) | 1 |
| writing-index `ldItems` comparator: no 0 on ties / can diverge from visible order (P2) | 2 |
| browse-courses link dead `group` class (P2) | 2 |
| TR post page missing one JSX comment vs EN twin (P2) | 2 |
| `--tw-prose-kbd(+shadows)` unmapped (P2) | 2 |
| `cover` schema field dead (P2 final review: wire or remove → **wire as OG override**) | 2 |
| tripwire: feed URLs should map to built pages (P3 final review recommendation) | 3 |
| vercel-config tests: named keys, not set-completeness (P3) | 3 |
| courseSchema `.min(1)` lacks dedicated empty-string test (P3 re-review residual) | 3 |
| favicon.ico 404 (Phase-A ledger) | 4 |
| home a11y spot-check: muted-text contrast / label-name mismatch (Phase-B ledger, "above target, optional") | 5 (verify + report only) |

## File structure

```
src/lib/llms.ts                      (modify: merged Writing list, lesson pluralization)
src/lib/seo.ts                       (modify: courseJsonLd single author node)
src/lib/courses.ts                   (modify: comparator 0-on-equal + doc comment)
src/lib/feed.ts                      (modify: +RSS_TITLE export)
src/pages/rss.xml.ts                 (modify: RSS_TITLE, drop <language>)
src/layouts/Base.astro               (modify: RSS_TITLE in autodiscovery; favicon.ico link in Task 4)
src/pages/writing/index.astro        (modify: ldItems order tiebreak, drop dead class)
src/pages/tr/writing/index.astro     (modify: same)
src/pages/writing/[...slug].astro    (modify: cover → ogImage override)
src/pages/tr/writing/[...slug].astro (modify: same + missing JSX comment)
src/styles/global.css                (modify: prose kbd tokens)
src/content/schemas.ts               (modify: cover doc comment only)
scripts/check-dist-contract.mjs      (modify: url→built-page mapping)
scripts/check-dist-contract.d.mts    (unchanged — exports keep signatures)
scripts/build-favicon.mjs            (create)
public/favicon.ico                   (create: committed artifact)
package.json                         (modify: +favicon script)
test/llms.test.ts, test/seo.test.ts, test/courses.test.ts,
test/feed-contract.test.ts, test/vercel-config.test.ts,
test/content-schema.test.ts          (modify: new/updated tests)
```

---

### Task 1: Pure-lib polish (llms, seo, courses, feed/rss)

**Files:**
- Modify: `src/lib/llms.ts`, `src/lib/seo.ts`, `src/lib/courses.ts`, `src/lib/feed.ts`, `src/pages/rss.xml.ts`, `src/layouts/Base.astro`
- Test: `test/llms.test.ts`, `test/seo.test.ts`, `test/courses.test.ts`

**Interfaces:**
- Produces: `RSS_TITLE` (string const, named export of `src/lib/feed.ts`) consumed by `rss.xml.ts` and `Base.astro`. No signature changes anywhere else.

- [ ] **Step 1: Create the branch**

```bash
git checkout master && git pull --ff-only && git checkout -b site-polish-backlog
```

- [ ] **Step 2: Write the failing/updated tests**

In `test/llms.test.ts`, add to the `llmsTxt phase-2 content` describe:

```ts
  it('interleaves native and external writing newest-first', () => {
    const out = llmsTxt({
      ...data,
      writing: [
        {
          title: 'Newest external',
          url: 'https://medium.com/new',
          source: 'Medium',
          date: '2026-08-01',
          lang: 'en',
        },
        ...data.writing,
      ],
    });
    const newest = out.indexOf('Newest external');
    const native = out.indexOf('Writing comes home');
    const oldest = out.indexOf('RxDart');
    expect(newest).toBeGreaterThan(-1);
    expect(newest).toBeLessThan(native);
    expect(native).toBeLessThan(oldest);
  });
```

and change the existing course-line assertion from `(beginner, 1 lessons, en)` to:

```ts
      '- [Demo](https://omeryasironal.com/courses/demo-course/): CD (beginner, 1 lesson, en)',
```

In `test/seo.test.ts`, add to the `courseJsonLd` describe:

```ts
  it('omits keywords when tags are empty and shares one author node', () => {
    const c = courseJsonLd(
      {
        title: 'C',
        description: 'D',
        url: SITE + '/courses/c/',
        lang: 'en',
        level: 'beginner',
        tags: [],
        lessons: [],
      },
      SITE,
    );
    expect('keywords' in c).toBe(false);
    expect(c.provider).toBe(c.author);
  });
```

In `test/courses.test.ts`, add to the `course id helpers` describe:

```ts
  it('returns 0 for equal ids (valid comparator, no reorder)', () => {
    const sorted = sortLessons([{ id: 'c/01-a' }, { id: 'c/01-a' }]);
    expect(sorted.map((l) => l.id)).toEqual(['c/01-a', 'c/01-a']);
  });

  it('returns an empty lesson slug for a slashless id (documented behavior)', () => {
    expect(lessonSlugOf('demo-course')).toBe('');
  });
```

- [ ] **Step 3: Run tests to verify the new ones fail**

Run: `pnpm vitest run test/llms.test.ts test/seo.test.ts test/courses.test.ts`
Expected: FAIL — interleave test (native listed before newer external), "1 lessons" vs "1 lesson", `provider` !== `author` (two distinct objects), plus the two courses tests pass/fail as follows: the equal-ids test may already pass behaviorally; the `lessonSlugOf` test passes already (documenting). At minimum the llms and seo assertions must be red.

- [ ] **Step 4: Implement the lib changes**

`src/lib/llms.ts` — in `llmsTxt`, replace the `## Writing` section's two loops with a merged, newest-first list:

```ts
  lines.push('## Writing');
  const writingLines = [
    ...data.posts.map((p) => ({
      date: p.date,
      line: `- [${p.title}](${abs(site, `/writing/${p.slug}/`)}): ${p.description} (${p.date}, ${p.lang})`,
    })),
    ...data.writing.map((w) => ({
      date: w.date,
      line: `- [${w.title}](${w.url}): ${w.source}, ${w.date} (${w.lang})`,
    })),
  ].sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? 1 : -1));
  for (const { line } of writingLines) lines.push(line);
```

and in the `## Courses` branch, pluralize the lesson count:

```ts
      lines.push(
        `- [${c.title}](${abs(site, `/courses/${c.slug}/`)}): ${c.description} (${c.level}, ${c.lessons.length} lesson${c.lessons.length === 1 ? '' : 's'}, ${c.lang})`,
      );
```

`src/lib/seo.ts` — in `courseJsonLd`, build the author node once:

```ts
  const author = authorNode(site);
```

(first line of the function body) and use `provider: author,` and `author,` in the returned object.

`src/lib/courses.ts` — replace `sortLessons` (comment + comparator):

```ts
/**
 * Lessons ordered by their zero-padded `NN-` filename prefix. Expects entries
 * from a single course: ids from different courses would sort by course slug
 * before lesson number, so filter to one course before calling.
 */
export function sortLessons<T extends { id: string }>(lessons: T[]): T[] {
  return [...lessons].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
```

`src/lib/feed.ts` — add above `buildFeedJson`:

```ts
/** Feed title shared by the rss.xml channel and Base's autodiscovery link. */
export const RSS_TITLE = 'Ömer Yasir Önal — Writing';
```

`src/pages/rss.xml.ts` — import `RSS_TITLE` alongside `rssItems`, use `title: RSS_TITLE,` and DELETE the `customData: '<language>en</language>',` line (the feed mixes en and tr items; a channel-level `en` claim is wrong).

`src/layouts/Base.astro` — add `import { RSS_TITLE } from '../lib/feed';` and change the autodiscovery link's `title="Ömer Yasir Önal — Writing"` to `title={RSS_TITLE}`.

- [ ] **Step 5: Run the full suite**

Run: `pnpm vitest run`
Expected: PASS — 99 tests (95 + 4 new; one llms assertion updated in place).

- [ ] **Step 6: Commit**

```bash
git add src/lib/llms.ts src/lib/seo.ts src/lib/courses.ts src/lib/feed.ts src/pages/rss.xml.ts src/layouts/Base.astro test/llms.test.ts test/seo.test.ts test/courses.test.ts
git commit -m "fix(lib): merged llms writing list, lesson pluralization, shared author node + rss title, comparator hygiene"
```

---

### Task 2: Page & style polish (ldItems order, cover wiring, kbd tokens, twin parity)

**Files:**
- Modify: `src/pages/writing/index.astro`, `src/pages/tr/writing/index.astro`
- Modify: `src/pages/writing/[...slug].astro`, `src/pages/tr/writing/[...slug].astro`
- Modify: `src/styles/global.css`, `src/content/schemas.ts`

**Interfaces:**
- Consumes: `ogPostPath(locale, id)` (existing). No new interfaces.

- [ ] **Step 1: Align the writing-index JSON-LD order with the visible list**

In BOTH `src/pages/writing/index.astro` and `src/pages/tr/writing/index.astro`, replace the `ldItems` computation with (identical in both — `locale` differs per file):

```ts
const ldItems = [
  ...articles.map((a) => ({
    title: a.data.title,
    url: a.data.url,
    date: a.data.date,
    order: a.data.order,
  })),
  ...posts.map((p) => ({
    title: p.data.title,
    url: canonicalHref(localizePath(locale, `/writing/${p.id}`), Astro.site!),
    date: p.data.date,
    order: 99,
  })),
]
  .sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.order - b.order;
  })
  .map(({ title, url, date }) => ({ title, url, date }));
```

- [ ] **Step 2: Remove the dead `group` class from the browse-courses link**

In the same two index files, the courses link `<a ...>` has `class="group mt-4 inline-flex ..."` with no `group-*` descendant — delete the `group ` token (keep everything else).

- [ ] **Step 3: Wire `cover` as the OG override on post pages**

In BOTH `src/pages/writing/[...slug].astro` and `src/pages/tr/writing/[...slug].astro`, change the Base prop:

```astro
  ogImage={data.cover ?? ogPostPath(locale, entry.id)}
```

In `src/content/schemas.ts`, update the `cover` doc comment to:

```ts
  /** Optional cover image path (public/-relative); replaces the generated OG card when set. */
```

- [ ] **Step 4: Restore twin comment parity**

In `src/pages/tr/writing/[...slug].astro`, add the missing JSX comment directly above the back-link `<a`:

```astro
      {/* breadcrumb back to the writing index */}
```

- [ ] **Step 5: Map the prose kbd tokens**

In `src/styles/global.css`, inside the existing `.prose {` block (after `--tw-prose-td-borders`), add:

```css
  --tw-prose-kbd: var(--color-fg);
  /* kbd box-shadow channels (plugin expects space-separated RGB) — neutral gray works on both palettes. */
  --tw-prose-kbd-shadows: 128 128 128;
```

- [ ] **Step 6: Verify**

```bash
pnpm vitest run && pnpm astro check && pnpm build
grep -c 'class="group mt-4' src/pages/writing/index.astro src/pages/tr/writing/index.astro || echo "dead class gone"
grep -o 'tw-prose-kbd' src/styles/global.css | head -2
```
Expected: 99 tests green, 0 type errors, build + tripwire pass, dead class gone, kbd tokens present.

- [ ] **Step 7: Commit**

```bash
git add src/pages/writing/ src/pages/tr/writing/ src/styles/global.css src/content/schemas.ts
git commit -m "fix(pages): ldItems order parity, cover OG override, prose kbd tokens, twin comment parity"
```

---

### Task 3: Tripwire URL-mapping upgrade + test-completeness

**Files:**
- Modify: `scripts/check-dist-contract.mjs`
- Test: `test/feed-contract.test.ts`, `test/vercel-config.test.ts`, `test/content-schema.test.ts`

**Interfaces:**
- `checkDist(distDir): string[]` signature unchanged; it now additionally reports feed URLs with no built page.

- [ ] **Step 1: Write the failing tests**

In `test/feed-contract.test.ts`, extend the import to include `checkDist` and add at the end of the file:

```ts
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

function scaffoldDist(feed: unknown): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'dist-'));
  writeFileSync(path.join(dir, 'feed.json'), JSON.stringify(feed));
  writeFileSync(path.join(dir, 'rss.xml'), '<rss version="2.0"></rss>');
  writeFileSync(path.join(dir, 'llms.txt'), 'x');
  writeFileSync(path.join(dir, 'llms-full.txt'), 'x');
  writeFileSync(path.join(dir, 'sitemap-index.xml'), 'x');
  return dir;
}

function addPage(dir: string, rel: string): void {
  mkdirSync(path.join(dir, rel), { recursive: true });
  writeFileSync(path.join(dir, rel, 'index.html'), 'x');
}

describe('checkDist url→page mapping', () => {
  it('passes when every feed url has a built page', () => {
    const dir = scaffoldDist(validFeed);
    addPage(dir, 'writing/writing-comes-home');
    addPage(dir, 'courses/demo-course');
    addPage(dir, 'courses/demo-course/01-first-lesson');
    expect(checkDist(dir)).toEqual([]);
  });

  it('flags feed urls with no built page', () => {
    const dir = scaffoldDist(validFeed);
    const out = checkDist(dir).join('\n');
    expect(out).toMatch(/writing\/writing-comes-home.*no built page/);
    expect(out).toMatch(/courses\/demo-course\/01-first-lesson.*no built page/);
  });
});
```

(Note: the top-level imports must be merged with the file's existing imports — one `import`, no duplicates.)

In `test/vercel-config.test.ts`, add:

```ts
  it('keeps each rule exactly as specified (no stray headers)', () => {
    expect(rules).toHaveLength(3);
    expect(rules.find((r) => r.source === '/(.*)')!.headers).toHaveLength(5);
    expect(rules.find((r) => r.source === '/og/(.*)')!.headers).toHaveLength(1);
    expect(rules.find((r) => r.source === '/cv/(.*\\.pdf)')!.headers).toHaveLength(1);
  });
```

In `test/content-schema.test.ts`, add to the `course schema` describe:

```ts
  it('rejects empty title/description strings', () => {
    expect(courseSchema.safeParse({ ...validCourse, title: '' }).success).toBe(false);
    expect(courseSchema.safeParse({ ...validCourse, description: '' }).success).toBe(false);
  });
```

- [ ] **Step 2: Run tests to verify the mapping tests fail**

Run: `pnpm vitest run test/feed-contract.test.ts test/vercel-config.test.ts test/content-schema.test.ts`
Expected: the two `checkDist url→page mapping` tests FAIL (first: passes trivially? No — the URLs aren't checked yet, so test 1 passes but test 2 FAILS with no `no built page` violations). The vercel/schema additions should pass immediately (they pin current state). At minimum the "flags feed urls" test must be red.

- [ ] **Step 3: Implement the URL-mapping check**

In `scripts/check-dist-contract.mjs`, add a helper above `checkDist`:

```js
/** A feed URL must map to a built page: <dist>/<url path>/index.html. */
function pageFileErrors(distDir, site, url) {
  const rel = url.slice(site.length).replace(/^\/+|\/+$/g, '');
  const page = path.join(distDir, rel, 'index.html');
  return existsSync(page) ? [] : [`feed url ${url} has no built page at dist/${rel}/index.html`];
}
```

and in `checkDist`, replace the `if (feed !== undefined) errors.push(...validateFeed(feed));` line with:

```js
    if (feed !== undefined) {
      const feedErrors = validateFeed(feed);
      errors.push(...feedErrors);
      // Only map URLs to pages when the shape is valid — bad shapes already failed.
      if (feedErrors.length === 0) {
        for (const item of feed.items) {
          errors.push(...pageFileErrors(distDir, feed.site, item.url));
          for (const lesson of item.lessons ?? []) {
            errors.push(...pageFileErrors(distDir, feed.site, lesson.url));
          }
        }
      }
    }
```

- [ ] **Step 4: Run tests to verify they pass, then the real build**

```bash
pnpm vitest run           # expect 103 (99 + 4)
pnpm build                # tripwire now also validates real dist URLs → "feed contract check passed"
```

- [ ] **Step 5: Commit**

```bash
git add scripts/check-dist-contract.mjs test/feed-contract.test.ts test/vercel-config.test.ts test/content-schema.test.ts
git commit -m "test(ci): tripwire maps feed urls to built pages; config/schema completeness tests"
```

---

### Task 4: favicon.ico (kills the implicit-request 404)

**Files:**
- Create: `scripts/build-favicon.mjs`
- Create: `public/favicon.ico` (generated, committed — same pattern as the CV PDFs)
- Modify: `package.json` (script), `src/layouts/Base.astro` (link)

**Interfaces:**
- Produces: `pnpm favicon` regenerates `public/favicon.ico` from `public/favicon.svg`.

- [ ] **Step 1: Create the generator script**

`scripts/build-favicon.mjs`:

```js
/**
 * Renders public/favicon.svg to a 32x32 favicon.ico so the browsers' implicit
 * /favicon.ico request stops 404ing. The .ico is a single PNG-encoded entry
 * (valid per the ICO spec, universally supported by modern browsers).
 * Regenerate with `pnpm favicon` after changing favicon.svg; commit the output.
 */
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const SIZE = 32;
const png = await sharp('public/favicon.svg').resize(SIZE, SIZE).png().toBuffer();

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count

const entry = Buffer.alloc(16);
entry.writeUInt8(SIZE, 0); // width
entry.writeUInt8(SIZE, 1); // height
entry.writeUInt8(0, 2); // palette count
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // color planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(png.length, 8); // image data size
entry.writeUInt32LE(22, 12); // image data offset (6 + 16)

writeFileSync('public/favicon.ico', Buffer.concat([header, entry, png]));
console.log(`public/favicon.ico written (${22 + png.length} bytes)`);
```

- [ ] **Step 2: Add the package script**

In `package.json` scripts, after `"cv": "node scripts/build-cv.mjs",` add:

```json
    "favicon": "node scripts/build-favicon.mjs",
```

- [ ] **Step 3: Generate the artifact**

Run: `pnpm favicon`
Expected: `public/favicon.ico written (…bytes)`; then `file public/favicon.ico` reports MS Windows icon resource (or PNG-in-ICO).

- [ ] **Step 4: Reference it in Base**

In `src/layouts/Base.astro`, directly BEFORE the existing svg icon link, add:

```astro
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
```

- [ ] **Step 5: Verify**

```bash
pnpm build && test -f dist/favicon.ico && echo ICO-OK
grep -c 'favicon.ico' dist/index.html
```
Expected: `ICO-OK`; count ≥ 1.

- [ ] **Step 6: Commit**

```bash
git add scripts/build-favicon.mjs public/favicon.ico package.json src/layouts/Base.astro
git commit -m "feat(site): favicon.ico generated from favicon.svg (stops implicit-request 404)"
```

---

### Task 5 (controller-executed): verification, a11y spot-check, PR, merge handoff

**Files:** none. Controller runs this directly.

- [ ] **Step 1:** `pnpm vitest run` (103), `pnpm astro check` (0), `pnpm build` (44 pages + tripwire).
- [ ] **Step 2:** Push branch, open PR, wait for CI green.
- [ ] **Step 3:** On the Vercel preview (via `_vercel_share` if protected): `curl` `/favicon.ico` (200), `/llms.txt` (merged newest-first Writing list), `/rss.xml` (no `<language>` tag), one post page OG meta.
- [ ] **Step 4:** Best-effort a11y spot-check of the home page (Lighthouse a11y via the browser MCP on the Brave binary, or report as skipped) — the Phase-B ledger items (muted-text contrast, label/name mismatch) are "above target, optional": verify and report, fix only if trivial and confirmed.
- [ ] **Step 5:** Hand the merge decision to the user (finishing-a-development-branch); after merge, verify production (`favicon.ico` 200, llms order, rss).
