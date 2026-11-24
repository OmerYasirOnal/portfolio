/**
 * Motion layer. Deliberately small: the site is calm and content-first.
 * Progressive enhancement only, every element is fully visible and usable
 * without this script.
 *
 * Hooks:
 *   [data-reveal]          one-shot subtle fade-up when the element enters view
 *                          (skipped entirely for reduced motion)
 *   video[data-autoplay]   muted preview that plays only while on screen
 *   #top                   header gets .is-scrolled once the page scrolls
 */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

/* ---------- One-shot reveals ---------- */
function initReveal() {
  if (reduce || !('IntersectionObserver' in window)) return;
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!els.length) return;
  const vh = window.innerHeight;
  // Anything already on (or above) the first screen stays visible: no flash.
  const pending = els.filter((el) => el.getBoundingClientRect().top > vh * 0.9);
  if (!pending.length) return;
  root.classList.add('reveal-ready');
  els.forEach((el) => {
    if (!pending.includes(el)) el.classList.add('is-visible');
  });
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0, rootMargin: '0px 0px -6% 0px' },
  );
  pending.forEach((el) => io.observe(el));
  // Safety net for fast flings and anchor jumps: reveal anything scrolled past.
  const sweep = () => {
    for (const el of pending) {
      if (!el.classList.contains('is-visible') && el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('is-visible');
        io.unobserve(el);
      }
    }
  };
  window.addEventListener('scroll', sweep, { passive: true });
  window.addEventListener('hashchange', sweep);
}

/* ---------- Videos that play only on screen ---------- */
function initAutoplay() {
  const vids = document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]');
  if (!vids.length || reduce || !('IntersectionObserver' in window)) return;
  // No flash while a clip loads: the poster sits behind as a background, the
  // video stays transparent until its first frame is actually playing.
  vids.forEach((v) => {
    const box = v.parentElement;
    if (box && v.poster) {
      box.style.backgroundImage = `url("${v.poster}")`;
      box.classList.add('has-poster');
    }
    v.classList.add('v-wait');
    v.addEventListener('playing', () => v.classList.remove('v-wait'), { once: true });
  });
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) {
          if (v.preload === 'none') v.preload = 'auto';
          v.play().catch(() => v.classList.remove('v-wait'));
        } else v.pause();
      }
    },
    { threshold: 0.25, rootMargin: '200px 0px' },
  );
  vids.forEach((v) => io.observe(v));
}

/* ---------- Header shadow once scrolled ---------- */
function initHeader() {
  const header = document.querySelector<HTMLElement>('#top');
  if (!header) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

export function initMotion() {
  initReveal();
  initAutoplay();
  initHeader();
}
