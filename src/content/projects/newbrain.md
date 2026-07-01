---
title: newBrain
tagline_en: A Turkish LLM built from scratch.
tagline_tr: Sıfırdan geliştirilmiş bir Türkçe LLM.
category: Applied-AI
stack:
  - Python
  - PyTorch
  - MLX
  - FastAPI
  - Three.js
  - ChromaDB
status_en: Open source, research / educational
status_tr: Açık kaynak, araştırma / eğitim amaçlı
links:
  repo: https://github.com/OmerYasirOnal/newbrain
highlights_en:
  - Custom BPE tokenizer and a causal GPT transformer implemented in PyTorch (RoPE, SwiGLU, SDPA).
  - LoRA fine-tuning on Apple MLX.
  - FastAPI + Three.js workspace with RAG (ChromaDB) and multi-agent chat.
highlights_tr:
  - PyTorch ile yazılmış özel BPE tokenizer ve nedensel GPT transformer (RoPE, SwiGLU, SDPA).
  - Apple MLX üzerinde LoRA ince ayarı.
  - RAG (ChromaDB) ve çok ajanlı sohbet içeren FastAPI + Three.js çalışma alanı.
problem_en: Understanding modern language models deeply means building one end to end — tokenizer, architecture, training and fine-tuning — rather than only calling an API.
problem_tr: Modern dil modellerini derinlemesine anlamak, yalnızca bir API çağırmak yerine tokenizer, mimari, eğitim ve ince ayar dâhil baştan sona bir model kurmayı gerektirir.
what_i_did_en: Implemented a causal GPT transformer and its BPE tokenizer from scratch in PyTorch, added MLX LoRA fine-tuning, and wrapped it in a FastAPI/Three.js workspace with RAG and multi-agent chat.
what_i_did_tr: PyTorch ile sıfırdan nedensel bir GPT transformer ve BPE tokenizer’ını yazdım, MLX LoRA ince ayarı ekledim ve bunu RAG ile çok ajanlı sohbet içeren bir FastAPI/Three.js çalışma alanına sardım.
featured: true
order: 3
---

## The problem

Really understanding a modern language model means building one end to end —
tokenizer, architecture, training loop and fine-tuning — not just calling
someone else's API.

## What I did

newBrain is a Turkish LLM built from scratch: a custom **BPE tokenizer** and a
**causal GPT transformer** implemented in **PyTorch** with RoPE positional
encoding, SwiGLU activations and scaled-dot-product attention. Fine-tuning runs
as **LoRA on Apple MLX**. Around the model sits a FastAPI + Three.js workspace
with retrieval-augmented generation (ChromaDB) and multi-agent chat.

## Highlights

- A complete, readable from-scratch transformer stack for study and reuse.
- On-device fine-tuning path via MLX.
- Open source and framed as a research / educational project.
