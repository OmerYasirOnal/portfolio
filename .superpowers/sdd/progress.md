# Portfolio build — progress ledger
Phase A: complete (tasks 1-6, commits ca5f792..196aa3d, review clean spec+quality)
Phase B: complete (tasks 7-14, commits 39ed335..d7d870a, review spec+quality OK)
Deferred findings (for final review / next phase):
- [Important] Light theme non-functional — global.css only defines dark tokens; toggle flips .dark but light shows ~no change. FIX in Phase C styling.
- [Minor] Mobile (<640px) hides in-page section nav (Work/About/Writing/Contact) via hidden sm:flex — consider a mobile menu or keep (single-scroll ok).
- [Minor] altLocalePath prefix-not-segment match (`/^\/tr/`) — harden to `/^\/tr(?=\/|$)/` before Phase D TR routes.
- [trivial] favicon.ico 404 — add favicon asset.
