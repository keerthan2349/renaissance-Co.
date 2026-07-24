/**
 * reveal.ts — the site's only scroll behaviour (blueprint §4.2).
 * IntersectionObserver, threshold 0.15, fires once, adds `.is-in`.
 * Applies to `.reveal` (rise + fade) and `.drawn-rule` (scaleX draw).
 *
 * Above-the-fold reliability: the observer's *initial* callback is unreliable on
 * a cold first paint — it can miss elements already in view and never re-fire
 * without a scroll. So we also sweep for in-view elements at every moment layout
 * could settle (after paint, on load, on fonts.ready, and timed fallbacks).
 * Below-the-fold elements reveal on scroll as usual.
 *
 * Re-initialises on Astro page loads so View Transitions keep working.
 * Nothing here loops or runs after the user has stopped scrolling.
 */
const SELECTOR = '.reveal:not([data-observed]), .drawn-rule:not([data-observed])';
let observer: IntersectionObserver | null = null;

function inView(el: Element): boolean {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return r.height > 0 && r.top < vh * 0.95 && r.bottom > 0;
}

function reveal(el: Element): void {
  el.classList.add('is-in');
  observer?.unobserve(el);
}

// Reveal anything already on screen that hasn't fired yet.
function sweepInView(): void {
  document
    .querySelectorAll('.reveal[data-observed]:not(.is-in), .drawn-rule[data-observed]:not(.is-in)')
    .forEach((el) => {
      if (inView(el)) reveal(el);
    });
}

function initReveal(): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .drawn-rule').forEach((el) => {
      el.classList.add('is-in');
      el.setAttribute('data-observed', '');
    });
    return;
  }

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) reveal(entry.target);
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
    );
  }

  document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
    el.setAttribute('data-observed', '');
    observer!.observe(el);
  });

  // Safety net #1: after two frames, once the first layout is done.
  requestAnimationFrame(() => requestAnimationFrame(sweepInView));
}

document.addEventListener('astro:page-load', initReveal);
// Safety nets #2–#5: every later moment layout can finalise on a cold load.
window.addEventListener('load', sweepInView);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(sweepInView);
setTimeout(sweepInView, 500);
setTimeout(sweepInView, 1400);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal);
} else {
  initReveal();
}
