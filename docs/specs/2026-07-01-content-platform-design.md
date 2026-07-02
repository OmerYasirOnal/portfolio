# omeryasironal.com — Content Platform & Multi-Surface Design Spec

**Owner:** Ömer Yasir Önal · **Date:** 2026-07-01 · **Status:** proposed design, pre-implementation

> Builds on `2026-06-30-portfolio-site-design.md` (the Astro portfolio, already live on
> **Cloudflare Pages**). This spec turns the site into a **content platform** — articles + small
> courses — that feeds **three surfaces from one source**: the website, AI/LLM crawlers (AIO), and
> a future **Flutter mobile app**. It is decomposed into four phases; each phase gets its own
> implementation plan.

---

## 1. Goal

One content source in the repo, consumed everywhere:

- **Website** (Astro static on Cloudflare Pages) — renders articles & courses, SEO-strong.
- **AI / LLM discovery (AIO)** — `llms.txt`, JSON-LD, clean feeds so LLMs cite the work correctly.
- **Flutter app** (separate repo, later) — consumes the same JSON/RSS feed; Firebase only for
  dynamic per-user data (auth + course progress).

Principle: **web stays static** (fast, free, crawlable). Firebase is added *only* where genuinely
dynamic data exists (the app's course progress), never bolted onto the static site.

## 2. Architecture decisions (conflicts resolved)

> **Amendment (2026-07-02):** live-header + DNS evidence showed production is hosted on
> **Vercel** (GitHub integration, Vercel DNS nameservers) — not Cloudflare Pages as this
> section originally assumed. Decision: **stay on Vercel**. Phase 3 is re-scoped to
> "delivery optimization on Vercel" (`vercel.json` security/cache headers + a build-gating
> feed-contract check); the Cloudflare-specific items (`_headers`/`_redirects`, CF edge
> config) are superseded. Vercel provides HSTS, immutable `/_astro/*` caching, edge caching
> with ETag revalidation for feeds, and per-PR preview deploys out of the box.

- **Vercel** = hosting/CDN for the website (see 2026-07-02 amendment above; originally
  written as Cloudflare). No serverless functions needed for v1 — fully static.
- **Firebase** = backend for the **Flutter app only** (Auth + Firestore for course progress /
  bookmarks). Not wired into the website.
- **Content source of truth** = repo markdown (Astro content collections). Build emits feeds that
  both the app and AI crawlers consume. No external CMS.
- **Feeds** = `/rss.xml` (articles), `/feed.json` (articles + courses, app-friendly), `/llms.txt`
  (+ `/llms-full.txt`) for AIO.

## 3. Content model

Current `writing` collection stores **external Medium links only** (url + source, no body). Keep it
as a "links" list. Add native content:

- **`posts`** (new) — native articles written in-repo. Frontmatter: `title`, `description`,
  `date`, `updated?`, `lang` (en/tr), `tags[]`, `draft`, `cover?`, `canonical?`. Body = markdown.
- **`courses`** (new) — a course = directory `courses/<slug>/` with `index.md` (course meta:
  `title`, `description`, `level`, `lang`, `tags[]`, `order`) + `NN-lesson.md` files (lesson body).
- Both are bilingual via the existing `lang` convention + `/tr/` mirror tree.
- **Course progress** (which lessons completed) is per-user dynamic state → lives in Firebase,
  read only by the app. The website renders courses statically with no auth.

## 4. Phases (each = its own implementation plan)

| Phase | Scope | Infra | Risk |
|-------|-------|-------|------|
| **1 · SEO/AIO** | JSON-LD (Person, Article, BreadcrumbList, Course), `llms.txt` + `llms-full.txt`, meta/robots/canonical audit, sitemap validation, Lighthouse pass (perf/a11y/SEO) | none (existing Astro) | low |
| **2 · Native blog + courses** | `posts` + `courses` collections, list/detail pages (en+tr), tags, reading time, RSS + `feed.json`, per-post & per-course JSON-LD | none | low–med |
| **3 · Delivery optimization (Vercel)** | `vercel.json` security headers + og/cv cache rules, build-gating feed-contract check in CI, verify edge caching of feeds + preview deploys | Vercel | low |
| **4 · Flutter app** | Separate repo; consumes `feed.json`; Firebase Auth + Firestore for progress/bookmarks; article + course reader; offline cache | Firebase | high |

Phases 1–3 live in this repo. Phase 4 is a **separate repo** (own spec/plan) that only depends on
the stable `feed.json` contract defined here.

## 5. Feed contract (the app + AI depend on this)

`feed.json` (stable, versioned) — array of items:

```jsonc
{
  "version": "1",
  "site": "https://omeryasironal.com",
  "items": [
    {
      "type": "post" | "course",
      "slug": "…",
      "lang": "en" | "tr",
      "title": "…",
      "description": "…",
      "date": "YYYY-MM-DD",
      "updated": "YYYY-MM-DD",
      "tags": ["…"],
      "url": "https://omeryasironal.com/…",
      "lessons": [ { "slug": "…", "title": "…", "url": "…" } ]  // courses only
    }
  ]
}
```

Contract rule: additive changes only within a `version`; breaking changes bump `version`.

## 6. AIO (AI optimization) specifics — Phase 1

- `llms.txt` — concise index (who, what, key links, feeds) per the llms.txt convention.
- `llms-full.txt` — expanded profile + content index for models that ingest more.
- JSON-LD: `Person` (home/about), `Article`/`BlogPosting` (posts), `Course` + `CourseInstance`
  (courses), `BreadcrumbList` (nav), `WebSite` + `SearchAction`.
- Canonical + hreflang correct across the en/tr mirror (sitemap already emits hreflang).
- `robots.txt` explicitly allows major AI crawlers; sitemap referenced.

## 7. Testing

- Zod schema unit tests (Vitest) for `posts` + `courses`, mirroring existing `schemas.ts` tests.
- Build-time validation: `feed.json` shape test; JSON-LD emitted & valid; `llms.txt` present.
- Lighthouse CI budget (Phase 1/3) for perf/SEO/a11y ≥ target.

## 8. Out of scope (YAGNI for v1)

Comments, newsletter, paid courses/payments, full search backend, external CMS, Cloudflare
Workers/D1, server-rendered web. Revisit only if a concrete need appears.

## 9. Open decision carried into Phase 2

Course interactivity depth on **web**: v1 = static multi-lesson reading (SEO-friendly, free).
Progress tracking / quizzes are **app-only** (Firebase) in Phase 4. Web stays static.
