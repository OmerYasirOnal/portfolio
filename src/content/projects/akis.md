---
title: AKIS
tagline_en: Verifiable AI software-development platform.
tagline_tr: Doğrulanabilir yapay zeka yazılım geliştirme platformu.
category: AI-Agents
stack:
  - TypeScript
  - Node.js
  - React 19
  - PostgreSQL/pgvector
  - Docker
  - Multi-LLM
  - MCP
status_en: Open source (Apache-2.0), self-hostable
status_tr: Açık kaynak (Apache-2.0), self-hostable
links:
  repo: https://github.com/OmerYasirOnal/akis
  live: https://akisflow.com
highlights_en:
  - Multi-agent engine — Scribe, Proto, Critic and Trace — orchestrated behind 4 structural human-approval gates.
  - Nothing ships until a human approves and a real boot-smoke test proves the build actually runs.
  - MCP-based approval gates guard every external write — no agent acts unsupervised.
highlights_tr:
  - Scribe, Proto, Critic ve Trace ajanları, 4 yapısal insan-onay kapısı ardında orkestre edilir.
  - Bir insan onaylamadan ve gerçek bir boot-smoke testi derlemenin çalıştığını kanıtlamadan hiçbir şey yayınlanmaz.
  - Her dış yazma işlemi MCP tabanlı onay kapılarından geçer — hiçbir ajan gözetimsiz hareket edemez.
problem_en: AI coding agents routinely report success without proof — "false green" — and can push unreviewed changes straight into real systems.
problem_tr: Yapay zeka kodlama ajanları çoğu zaman kanıt olmadan başarı bildirir — "sahte yeşil" — ve gözden geçirilmemiş değişiklikleri doğrudan gerçek sistemlere gönderebilir.
what_i_did_en: Built a multi-agent platform where every build passes four structural gates (spec approval, verify, push confirm, external write) and can only be marked done once a real boot-smoke test passes.
what_i_did_tr: Her derlemenin dört yapısal kapıdan (spec onayı, doğrulama, push onayı, dış yazma) geçtiği ve yalnızca gerçek bir boot-smoke testi geçtiğinde tamamlanmış sayılabildiği çok ajanlı bir platform geliştirdim.
featured: true
order: 1
---
