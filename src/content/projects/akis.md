---
title: AKIS
tagline_en: Multi-agent AI software development platform with human-approval gates and build provenance.
tagline_tr: İnsan onay kapıları ve kriptografik derleme kanıtına sahip çok ajanlı yapay zeka yazılım platformu.
category: AI-Agents
group: product
image: akis.jpg
stack:
  - TypeScript
  - Node.js
  - React 19
  - PostgreSQL/pgvector
  - Docker
  - Multi-LLM
  - Ed25519
  - MCP
status_en: Open source (Apache-2.0)
status_tr: Açık kaynak (Apache-2.0)
links:
  repo: https://github.com/OmerYasirOnal/akis
highlights_en:
  - Multi-agent engine (Scribe, Proto, Critic, Trace) orchestrated behind 4 structural human-approval gates.
  - Tasks are marked complete only after human approval and a real boot-smoke verification test pass.
  - Ed25519-signed build provenance and Model Context Protocol (MCP) capability-token gates for external writes.
highlights_tr:
  - Scribe, Proto, Critic ve Trace ajanlarını 4 yapısal insan onay kapısı ardında koordine eden orkestrasyon motoru.
  - Hiçbir görev, insan onayı ve gerçek bir boot-smoke doğrulama testi geçmeden tamamlanmış sayılmaz.
  - Her dış yazma işlemi için Ed25519 imzalı derleme kanıtı (build provenance) ve MCP tabanlı yetki kapıları.
problem_en: AI coding agents routinely report success without proof ("false green") and can push unreviewed changes straight into production systems.
problem_tr: Yapay zeka kodlama ajanları çoğu zaman gerçek bir doğrulama kanıtı olmadan başarı bildirir ve denetlenmemiş değişiklikleri doğrudan üretim sistemlerine gönderebilir.
what_i_did_en: Designed and built a full-stack multi-agent platform where every workflow passes four structural approval gates, verifies builds with automated smoke tests, and signs build provenance with Ed25519.
what_i_did_tr: Her iş akışının dört yapısal onay kapısından geçtiği, derlemelerin gerçek smoke testlerle doğrulandığı ve çıktıların Ed25519 ile imzalandığı açık kaynaklı çok ajanlı bir platform geliştirdim.
featured: true
order: 3
---
