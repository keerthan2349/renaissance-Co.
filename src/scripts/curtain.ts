/**
 * curtain.ts — the RE-TRIGGERING entrance for `[data-curtain]` containers
 * (client's instruction, 3 Aug 2026: cards "should animate every time they go
 * off the screen"). Counterpart to reveal.ts, which deliberately fires once.
 *
 * An item earns `.is-in` when 15% of it is on screen and LOSES it only once it
 * has left the viewport entirely — two thresholds, so an item grazing the edge
 * never flickers. The reverse transition plays off-screen, invisibly, which is
 * what re-arms the entrance for the next pass. Both scroll directions.
 *
 * The clip lives on each item's first element CHILD (see base.css): a target
 * clipped to nothing never intersects, so observing the clipped element itself
 * would deadlock — the entrance that unhides it could never fire.
 *
 * Under reduced motion base.css removes the clip entirely; the observer is not
 * even started. Re-initialises on Astro page loads for View Transitions.
 */
let curtainObserver: IntersectionObserver | null = null;

function initCurtain(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-curtain] > *');
  if (items.length === 0) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  if (!curtainObserver) {
    curtainObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.intersectionRatio >= 0.15) e.target.classList.add('is-in');
          else if (!e.isIntersecting) e.target.classList.remove('is-in');
        }
      },
      { threshold: [0, 0.15], rootMargin: '0px 0px -5% 0px' },
    );
  }

  // DEFER the first observation until after the first paint. Observed the hard
  // way (client report, 3 Aug): entries fire before the initial frame commits,
  // .is-in lands in the same style pass as the clipped from-state, and a
  // transition with no previous frame DOESN'T RUN — above-the-fold cards
  // appeared already open, no curtain at all. Two rAFs put us after the first
  // painted frame; the 150ms hold makes the rise legible rather than
  // subliminal. Same lesson as the hero's fonts-ready gate (24 Jul).
  const register = () =>
    items.forEach((el) => {
      if (el.hasAttribute('data-curtain-observed')) return;
      el.setAttribute('data-curtain-observed', '');
      curtainObserver!.observe(el);
    });
  requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(register, 150)));
}

document.addEventListener('astro:page-load', initCurtain);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCurtain);
} else {
  initCurtain();
}
