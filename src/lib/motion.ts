/**
 * Motion layer. Progressive enhancement only: every element is fully visible
 * and usable without this script, and nothing here runs when the visitor asks
 * for reduced motion (except the cheap one-shot reveals, which become instant).
 *
 * Hooks (data attributes):
 *   [data-reveal="up|scale|left|right|clip|blur"]  one-shot reveal on enter
 *   [data-parallax="0.15"]          translateY by scroll offset * factor
 *   [data-float]                    icon that fades/scales/rotates in and out
 *                                   with its section's scroll progress
 *   [data-count="7238"]             count up once on enter
 *   [data-spotlight]                pointer-following glow (--mx/--my)
 *   [data-magnetic]                 button leans toward the pointer
 *   [data-autoplay]                 <video> plays only while on screen
 *   [data-hscroll]                  sticky horizontal scroll stage (desktop)
 *   [data-progress]                 page scroll progress bar (scaleX)
 */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const root = document.documentElement;

/* ---------- One-shot reveals ---------- */
const pendingReveal = new Set<HTMLElement>();

function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  root.classList.add('reveal-ready');
  els.forEach((el) => pendingReveal.add(el));
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          pendingReveal.delete(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0, rootMargin: '0px 0px -8% 0px' },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Counters ---------- */
function initCounters() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!els.length) return;
  const fmt = new Intl.NumberFormat(root.lang === 'en' ? 'en-US' : 'tr-TR');
  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    if (reduce || !Number.isFinite(target)) {
      el.textContent = fmt.format(target) + suffix;
      return;
    }
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = fmt.format(Math.round(target * eased)) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          run(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.6 },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Videos that play only on screen ---------- */
function initAutoplay() {
  const vids = document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]');
  if (!vids.length || reduce) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) {
          if (v.preload === 'none') v.preload = 'auto';
          v.play().catch(() => {});
        } else v.pause();
      }
    },
    { threshold: 0.25 },
  );
  vids.forEach((v) => io.observe(v));
}

/* ---------- Scroll-linked effects (single rAF loop) ---------- */
type Item = { el: HTMLElement; kind: 'parallax' | 'float' | 'hscroll'; f: number; host?: HTMLElement };

function initScrollFx() {
  const progress = document.querySelector<HTMLElement>('[data-progress]');
  // Parallax and floating icons are desktop-only: phones get the content, not the CPU cost.
  const heavyFx = window.innerWidth >= 768 && finePointer;
  const header = document.querySelector<HTMLElement>('#top');
  const items: Item[] = [];
  if (!reduce && heavyFx) {
    document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) =>
      items.push({ el, kind: 'parallax', f: Number(el.dataset.parallax) || 0.15 }),
    );
    document.querySelectorAll<HTMLElement>('[data-float]').forEach((el) =>
      items.push({ el, kind: 'float', f: Number(el.dataset.float) || 1, host: el.closest('section') ?? el }),
    );
  }
  if (!reduce) {
    document.querySelectorAll<HTMLElement>('[data-hscroll]').forEach((el) =>
      items.push({ el, kind: 'hscroll', f: 0 }),
    );
  }

  // Pause infinite CSS animations in sections that are off screen.
  if ('IntersectionObserver' in window) {
    const offIo = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle('is-off', !e.isIntersecting);
    });
    document.querySelectorAll('.stage, .marquee').forEach((el) => offIo.observe(el));
  }

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    const y = window.scrollY;
    if (progress) {
      const max = document.documentElement.scrollHeight - vh;
      progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    }
    header?.classList.toggle('is-scrolled', y > 24);

    // Safety net: anything already scrolled past is revealed even if the
    // observer missed it (fast flings, anchor jumps, restored scroll).
    if (pendingReveal.size) {
      for (const el of pendingReveal) {
        if (el.getBoundingClientRect().top < vh) {
          el.classList.add('is-visible');
          pendingReveal.delete(el);
        }
      }
    }

    for (const it of items) {
      if (it.kind === 'parallax') {
        const r = it.el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const offset = r.top + r.height / 2 - vh / 2;
        it.el.style.transform = `translate3d(0, ${(-offset * it.f).toFixed(1)}px, 0)`;
      } else if (it.kind === 'float') {
        const r = it.host!.getBoundingClientRect();
        // 0 when the section's top hits the viewport bottom, 1 when its bottom leaves the top.
        const p = (vh - r.top) / (vh + r.height);
        if (p < -0.1 || p > 1.1) continue;
        const c = Math.min(1, Math.max(0, p));
        const vis = Math.sin(Math.PI * c); // 0 -> 1 -> 0 across the section
        const drift = (c - 0.5) * 160 * it.f;
        it.el.style.opacity = String(Math.min(1, vis * 1.4).toFixed(3));
        it.el.style.transform = `translate3d(0, ${drift.toFixed(1)}px, 0) scale(${(0.6 + vis * 0.4).toFixed(3)}) rotate(${((c - 0.5) * 40 * it.f).toFixed(1)}deg)`;
      } else if (it.kind === 'hscroll') {
        const track = it.el.querySelector<HTMLElement>('[data-hscroll-track]');
        if (!track || window.innerWidth < 1024) {
          if (track) track.style.transform = '';
          continue;
        }
        const r = it.el.getBoundingClientRect();
        const total = it.el.offsetHeight - vh;
        const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
        const dist = track.scrollWidth - track.clientWidth;
        track.style.transform = `translate3d(${(-p * dist).toFixed(1)}px, 0, 0)`;
        it.el.style.setProperty('--hp', p.toFixed(3));
      }
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  // Size the sticky stage so its vertical scroll length matches the track.
  const sizeStages = () => {
    document.querySelectorAll<HTMLElement>('[data-hscroll]').forEach((el) => {
      const track = el.querySelector<HTMLElement>('[data-hscroll-track]');
      if (!track || reduce || window.innerWidth < 1024) {
        el.style.height = '';
        return;
      }
      const dist = track.scrollWidth - track.clientWidth;
      el.style.height = `${window.innerHeight + dist}px`;
    });
    update();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', sizeStages);
  window.addEventListener('load', sizeStages);
  sizeStages();
}

/* ---------- Pointer effects ---------- */
function initPointer() {
  if (reduce || !finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.22;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });
}

/* ---------- Intro curtain (home only, once per session) ---------- */
function initIntro() {
  const intro = document.querySelector<HTMLElement>('[data-intro]');
  if (!intro || !root.classList.contains('intro-on')) return;
  const done = () => {
    root.classList.remove('intro-on');
    root.classList.add('intro-done');
    try {
      sessionStorage.setItem('intro-seen', '1');
    } catch (_) {}
    setTimeout(() => intro.remove(), 900);
  };
  setTimeout(done, 1500);
  intro.addEventListener('click', done, { once: true });
}

export function initMotion() {
  initIntro();
  initReveal();
  initCounters();
  initAutoplay();
  initScrollFx();
  initPointer();
}
