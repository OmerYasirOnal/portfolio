# Portfolio / CV Site — Design Spec

**Owner:** Ömer Yasir Önal · **Date:** 2026-06-30 · **Status:** approved design, pre-implementation

> First of three deliverables. This spec covers the **CV/portfolio website**. The **PDF CV** and
> **GitHub profile README** are explicit follow-up phases that reuse this site's single content
> source (see §11). Project content here is grounded in a code-level scan of every project
> (workflow `portfolio-content-scan`, 2026-06-30), which is authoritative over the older CV where
> they disagree.

---

## 1. Goal & audience

A fast, polished personal site that works for **four audiences at once**: tech recruiters /
hiring managers, freelance clients, international/remote employers, and a general personal-brand
audience (LinkedIn/Medium/YouTube). Primary call: *"open to part-time / internship / junior
full-time"* + freelance.

- **Language:** English-primary with a **TR toggle** (full parallel `/tr/` tree).
- **Positioning:** Back-End & Applied AI Engineer who **ships verifiable systems**.

## 2. Design direction — "dev-tools minimal"

Vercel/Linear-adjacent: **dark mode default** (light toggle), generous whitespace, restrained
palette with one accent, subtle glow/gradient, **monospace accents** for tech tags and metadata.
Professional to recruiters, credible to clients, native-feeling to a technical audience.

- **Type:** a clean grotesk/sans for UI + headings (e.g. Inter / Geist / General Sans), a
  monospace (e.g. Geist Mono / JetBrains Mono) for tags, kbd, metadata, code.
- **Color:** near-black background, off-white text, **one accent** (cool — cyan/indigo) used
  sparingly for links, focus, the glow. WCAG AA contrast minimum.
- **Motion:** tasteful, GPU-cheap (fade/slide on scroll, hover lifts). Full `prefers-reduced-motion`
  fallback (no motion). No heavy animation libraries on the critical path.
- **Tone:** confident, specific, no buzzword fluff.

## 3. Tech architecture

- **Astro 5 + Tailwind CSS v4**, static output (zero JS by default). Owner already ships Astro
  (A2 Reklam) — lowest-risk, best Lighthouse/SEO fit for a content site.
- **React islands** only where interaction is real: theme toggle, language toggle, optional ⌘K
  command palette, a few scroll/hover micro-interactions. Everything else is static HTML.
- **Content is data-driven** via Astro **content collections** (typed Markdown/MDX + a typed data
  file). One source of truth feeds the site now and the PDF CV + GitHub README later — the site
  and CV can never drift.
- **i18n:** EN default at `/`, TR at `/tr/`; a shared typed `t()`/dictionary + per-collection
  locale fields. Lang toggle preserves the current route.
- **Deploy:** Vercel (git push → preview + prod). Start on `*.vercel.app`; attach custom domain
  (`omeryasironal.com` preferred) when registered.
- **Repo:** new, independent, **public** GitHub repo `portfolio`; local `~/Projects/portfolio`.

### Component boundaries (each unit one purpose, testable in isolation)
- `content/` collections: `projects`, `experience`, `skills`, `writing`, `publications`,
  `certifications`, plus a `profile` data file (name, taglines, links, about EN/TR).
- `layouts/` Base (head/SEO/theme), Section wrapper.
- `components/` Hero, ProjectCard, ProjectGrid, Timeline, SkillGroup, WritingList, ContactBlock,
  ThemeToggle (island), LangToggle (island), CommandPalette (island, optional), SocialLinks.
- `pages/` `index`, `projects/index`, `projects/[slug]`, `writing/index`, `cv`, mirrored under `tr/`.
- `lib/` `i18n.ts`, `seo.ts` (JSON-LD `Person`, OG), `theme.ts`.

## 4. Information architecture

Scannable long landing + deep sub-pages:

- `/` — Hero → Selected work (6) → About + photo + signal badges → Experience timeline → Skills →
  Writing & Publications → Contact.
- `/projects` + `/projects/[slug]` — all projects; each featured one gets a mini case study
  (problem → what I did → stack → highlights → links).
- `/writing` — Medium articles now; owner blog later.
- `/cv` — download PDF CV + web view (Phase 2).
- `/tr/...` — full mirror.

## 5. Page sections (home)

1. **Hero** — name, role "Back-End & Applied AI Engineer", one-line positioning (see §7),
   `[View work]` + `[Résumé ↓]`, social icons (GitHub/LinkedIn/Medium/YouTube), subtle glow.
2. **Selected work** — the 6 featured project cards (monospace stack tags, status pill, hover
   detail) → `/projects`.
3. **About** — about blurb (EN/TR, §7) + **professional photo** + signal badges: *AI Fellow —
   1,500 of 31,700*, *IEEE SIU 2025 paper*, *Live on the App Store*, *Open-source author*.
4. **Experience** — vertical timeline (§6).
5. **Skills** — grouped monospace chip grid (§6).
6. **Writing & Publications** — Medium selected articles + IEEE SIU 2025.
7. **Contact** — email, socials, availability CTA (part-time / internship / junior full-time +
   freelance).

## 6. Content model — verified facts

### Profile
- **Name:** Ömer Yasir Önal · **Role:** Back-End & Applied AI Engineer · **Location:** Istanbul, Türkiye
- **Email:** engomeryasironal@gmail.com · **Phone:** +90 532 309 0261 (CV only; site uses email/form)
- **Links:** GitHub OmerYasirOnal · LinkedIn omeryasironal · Medium @engomeryasironal ·
  YouTube (channel UCPWhVfCy6XdM3IuRhZ_oEhg) · HackerRank engomeryasironal
- **Languages:** Turkish (native), English (B2–C1), German (A1)
- **Education:** B.Sc. Computer Engineering, Fatih Sultan Mehmet Vakıf University — grad **June 2026**

### Experience (timeline)
1. **AI Fellow** — Yapay Zeka ve Teknoloji Akademisi · Dec 2025 – present · Istanbul. Selected
   among **1,500 of 31,700** applicants; Google Türkiye / Girişimcilik Vakfı / T3 + Ministry of
   Industry & Technology. AKIS is the program's applied output.
2. **Software Engineer Intern** — Exedra HRTech · Jul–Aug 2025. Built web product features + tests
   in a production HRTech env; shipped QRCheckIn side project; Agile + code review.
3. **Instructor / Mentor** — T3 Foundation – Deneyap Technology Workshops · 2024–2025.
4. **Researcher (lead contributor)** — TÜBİTAK 2209-A · Jun 2023 – Jun 2024. ML (XGBoost / Random
   Forest) on sensor data for **structural/concrete durability** → **IEEE SIU 2025** paper.
5. **Freelance Software Developer** · May 2024 – Jan 2025. End-to-end client web projects; scope,
   timeline, SEO/Google Ads.

### Skills (groups, grounded in scanned stacks)
- **Backend & APIs:** Node.js, Express, TypeScript, FastAPI (Python), PostgreSQL, MySQL/Sequelize,
  SQLite, REST, JWT & bcrypt, WebSocket
- **AI & LLM Engineering:** multi-agent orchestration, RAG (pgvector, ChromaDB), Model Context
  Protocol (MCP), Anthropic/OpenAI/Gemini/OpenRouter APIs, PyTorch (GPT/transformer from scratch),
  MLX LoRA fine-tuning, transfer learning (TensorFlow/Keras)
- **Frontend & Web:** React 19, Next.js 16 (App Router), Astro 5, Tailwind CSS v4, Three.js / R3F, Vite
- **Mobile & Native:** Swift 6 / SwiftUI, Flutter / Dart, Capacitor, Firebase, App Store delivery
- **DevOps & Infra:** Docker, GitHub Actions CI/CD, Vercel, OCI self-hosting, pnpm monorepo, SwiftPM
- **Security & Trust:** Ed25519 signing & build provenance, capability-token approval gates,
  OAuth 2.1 + Dynamic Client Registration, KVKK/consent compliance, honeypot & rate-limit hardening

### Featured projects (6, approved order)
1. **AKIS** — *Verifiable AI software-development platform.* Multi-agent engine where nothing ships
   until a human approves and a real test proves it (4 structural gates). Stack: TypeScript,
   Node.js, React 19, PostgreSQL/pgvector, Docker, multi-LLM, Ed25519/MCP. Status: open source
   (Apache-2.0), self-hostable. Links: repo `github.com/OmerYasirOnal/akis`, **live demo
   `akisflow.com`** (self-hosted instance; signup gated — frame as live instance). *Do not claim
   the Playwright/Cucumber runner; default verification is boot-smoke.*
2. **UniSum** — *GPA/grade tracker, live on the App Store.* Native SwiftUI iOS client (MVVM) +
   self-built **Node/Express/MySQL** REST API (JWT/bcrypt, Nodemailer, helmet/CORS/rate-limit).
   Links: App Store `apps.apple.com/tr/app/unisum/id6742401580`, repos `UniSum` + `UniSum-Backend`.
   *(Correction: not Firebase.)*
3. **newBrain** — *Turkish LLM built from scratch.* Custom BPE tokenizer + causal GPT transformer
   in PyTorch (RoPE/SwiGLU/SDPA), MLX LoRA fine-tuning, + FastAPI/Three.js workspace with RAG
   (ChromaDB) and multi-agent chat. Status: open source, research/educational. Repo `newbrain`.
   *Do not quote model benchmark numbers (checkpoints gitignored).*
4. **A2 Reklam** — *Freelance corporate site, live in production.* Astro 5 + Tailwind, **341 static
   pages**, **TR/EN/AR** i18n, Schema.org local-SEO, hardened PHP contact endpoint, GTM/GA4. Links:
   live `a2reklam.com`, repo `a2reklam-website`.
5. **UsageMeter** — *Free, private macOS menu-bar app for Claude usage* (a free alternative to the
   paid "Usage for Claude"). Swift 6 / SwiftUI; 3 data sources behind protocols, on-device, zero
   telemetry; dashboard with charts/heatmap. Status: in progress, open source (MIT). Links: repo
   `UsageMeter`, live `omeryasironal.github.io/UsageMeter`. *Frame the claude.ai source as
   optional/unofficial; don't quote the README test count unconfirmed.*
6. **Studio** — *Multi-agent game-development framework for Claude Code.* Orchestrates 16
   specialist agents coordinating via the filesystem; Three.js + R3F + Capacitor; FastAPI observer
   dashboard; CC0 asset pipeline. Status: open source (MIT), alpha. Repo `studio`.

### More projects (grid)
- **CalisTrack** — Flutter+Firebase calisthenics tracker, AI-generated programs (OpenAI Cloud
  Function), offline-first Hive/Firestore. Repo `calistrack`. Early MVP, no store link.
- **Özsaye Psikoloji** — freelance Next.js 16 clinic site; static export → shared hosting; SEO +
  KVKK consent. Repo `ozsaye-psikoloji`. *No verified live URL yet (data not ready).*
- **Food Image Classification (TÜBİTAK 2209-A)** — MobileNetV2 transfer learning on Food-101
  (~73–80% val acc), TensorFlow/Keras. *Local only, no public repo.* *(Correction: this is the
  food/MobileNetV2 work; the XGBoost concrete-durability model + IEEE SIU 2025 is the separate
  2209 project — both tie to the TÜBİTAK line, keep them distinct.)*
- **QRCheckIn** — QR attendance web app (Express/SQLite/vanilla JS); built during Exedra internship.
  Repo `QRCheckIn`. Demo-grade auth.
- **Network Chess** — Java client-server multiplayer chess (sockets, Swing, heartbeat, DMG).
  Repo `chess-client-server`. *README references a possibly-dead OCI IP — verify or omit.*
- **ArtFlare** — Flutter + OpenAI DALL·E 2 text-to-image app. Repo `ArtFlare_OpenAI_API_Integration`.
- **University Grade Calculator** — Flutter + Firebase **Realtime DB** GPA app (2★). Repo
  `University-Grade-Calculator-App---Flutter`.
- **Content Automation Platform** — *pending owner-provided repo/path* (see §10). Multi-platform AI
  content automation (Express/Playwright/OpenAI/DALL-E/SQLite); not located in the scan.

### Writing & publications
- **IEEE SIU 2025** — conference paper: ML (XGBoost / Random Forest) for durability prediction
  (TÜBİTAK 2209-A output).
- **Medium** — "What Are AI Agents? The Next Evolution in Coding"; "How Do AI Agents Work? (And
  Let's Build One)"; "AI Destekli Yazılım Geliştirme Rehberi".

### Certifications
- Google — Foundations of Project Management (Coursera, Jan 2026)
- DeepLearning.AI — Supervised ML: Regression and Classification (Nov 2025)
- Coursera — Exploratory Data Analysis for ML (Aug 2023)

## 7. Approved copy

- **Hero positioning (pick one at build; default = A):**
  - A. "Back-end & applied-AI engineer who ships verifiable systems — from a multi-agent AI
    platform with human-gated, provable build steps to apps live on the App Store."
  - B. "I build AI you can trust: multi-agent backends, real verification instead of false green,
    and products shipped end-to-end."
  - C. "Back-End & Applied AI Engineer in Istanbul — agentic systems, full-stack products, and an
    engineering bias toward provenance and trust."
- **About (EN):** Ömer Yasir Önal is a back-end and applied-AI engineer based in Istanbul who
  builds verifiable, multi-agent AI systems and ships full-stack products end to end — from AKIS,
  an open-source platform where AI agents can't ship code past a human and a real passing test, to
  UniSum, a GPA tracker live on the App Store with its own Node/MySQL API. He works across
  TypeScript/Node and Python backends, LLM and agent orchestration (RAG, MCP, multi-model), and
  native mobile (SwiftUI, Flutter). A selected AI Fellow (1,500 of 31,700), TÜBİTAK 2209-A
  researcher with an IEEE SIU 2025 paper, and freelancer, graduating in Computer Engineering from
  FSM in June 2026.
- **About (TR):** Ömer Yasir Önal, İstanbul merkezli bir back-end ve uygulamalı yapay zeka
  mühendisidir; doğrulanabilir çok ajanlı yapay zeka sistemleri kurar ve ürünleri uçtan uca yayına
  alır — yapay zeka ajanlarının insan onayı ve gerçek bir test geçmeden kod yayınlayamadığı açık
  kaynak platform AKIS'ten, kendi Node/MySQL API'siyle App Store'da yayında olan not ortalaması
  uygulaması UniSum'a kadar. TypeScript/Node ve Python backend'leri, LLM ve ajan orkestrasyonu
  (RAG, MCP, çok modelli) ile native mobil (SwiftUI, Flutter) arasında rahatça çalışır. Seçilmiş
  bir AI Fellow (31.700 içinden 1.500), IEEE SIU 2025 bildirili TÜBİTAK 2209-A araştırmacısı ve
  freelancer'dır; Haziran 2026'da FSM Bilgisayar Mühendisliği'nden mezun olacaktır.

## 8. Cross-cutting quality

- **SEO:** per-page meta + OpenGraph images, sitemap, robots, JSON-LD `Person` (name, role,
  sameAs links, alumniOf). Site must be the top result for the owner's name.
- **Performance:** Lighthouse ~100 target; static HTML, zero render-blocking JS, optimized images
  (Astro `<Image>`), system/preloaded fonts.
- **Accessibility:** keyboard-navigable, visible focus, AA contrast, alt text, reduced-motion.
- **Analytics:** Vercel Analytics (privacy-friendly).

## 9. Pre-publish verification checklist (resolve before going live)

These are accuracy guards surfaced by the scan; each must be confirmed before the relevant claim/
link is published (none block the build, but the site does not launch with an unverified one):

- [ ] akisflow.com reachable and acceptable to show publicly (signup gated).
- [ ] UsageMeter: test-count claim removed or confirmed; claude.ai source framed as unofficial.
- [ ] UniSum: link the canonical client repo; hide older `UniSum-IOS` if redundant.
- [ ] Food classification: headline accuracy + dataset wording confirmed; kept distinct from the
      XGBoost/IEEE-SIU concrete-durability project.
- [ ] Özsaye: only link a live URL if launched (else "in progress, repo only").
- [ ] newBrain: license confirmed; no model-quality numbers claimed.
- [ ] Studio: Brave Bunny status current; link TestFlight only if available.
- [ ] University Grade Calc: "Realtime Database" (not Firestore); license confirmed.
- [ ] Network Chess: OCI server IP verified live or removed.
- [ ] All external links return 200 (CI link-check).

## 10. Open inputs (owner)

- **Content Automation Platform** repo URL or local path — owner to provide; will be scanned and
  added (featured/more decided by what it turns out to be). Until provided, it ships as a
  text-only "More" entry without links, or is omitted (owner's call at add time).
- **Custom domain** — confirm/registers `omeryasironal.com` (or alternative); attached post-launch.
- **Photo asset** — professional headshot file for the About section.

## 11. Out of scope (this spec) / follow-up phases

- **Phase 2 — PDF CV:** generated from the same content source; polished EN + TR; fixes the old
  CV's stale AKIS link and the Firebase/XGBoost inaccuracies; `/cv` download.
- **Phase 3 — GitHub profile README:** restyled consistent with the site; featured projects + live
  site link.

## 12. Success criteria

- Loads fast (Lighthouse ~100), looks distinctly "dev-tools minimal", works EN+TR, mobile-first.
- A recruiter/client lands and within 10s understands who he is, sees proof (App Store + live sites
  + open source), and can reach him / download the CV.
- Every published claim and link is accurate and verified (§9). Nothing invented.
