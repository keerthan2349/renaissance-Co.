/**
 * M19 · Scroll — the engine. The eased wheel.
 *
 * Client's ask, 12 Aug 2026: "smooth scrolling that co relates to the scroll
 * length motion from the user but scrolling should be easing out smoothly not
 * a straight line."
 *
 * ⚠️ OFF BY DEFAULT ON THE SHIPPING PATH. `Scroll.astro` only fetches this
 * file when `content.ts → enabled` is true; the bench at /lab/scroll/ imports
 * it directly. With it off nothing here is even downloaded, and if it is
 * loaded with no configuration it attaches NOTHING — no listener, no rAF — so
 * the site's scrolling is byte-for-byte native.
 *
 * ⚠️ SELF-CONTAINED ON PURPOSE (the client's reusability instruction, 12 Aug):
 * it imports nothing, from this module or any other. Its configuration arrives
 * as `data-smooth*` attributes on `<html>`, so the same file serves the
 * shipping path, the bench, and any other project it is dropped into. The one
 * thing it reads from the host is the `--ease` token — and it falls back to
 * that token's own value when the token does not exist.
 *
 * ⚠️ THIS IS THE BANNED THING, AND IT IS DELIBERATE. `docs/blueprint.md` §4.2
 * bans scroll-jacking by name, the no-libraries rule names Lenis specifically,
 * and a global `scroll-behavior: smooth` caused a real reported bug on 28 Jul
 * 2026 (the page appearing to race to the bottom on a hash landing). Turning
 * this on is a SIXTH motion exception and needs the client's explicit word,
 * the same way the other five were taken. Nothing here is a library: no
 * dependency was added.
 *
 * ── HOW IT WORKS, AND WHY THIS WAY ──────────────────────────────────────────
 * It moves the REAL scroll position (`window.scrollTo`) every frame toward an
 * eased target. It does NOT translate a wrapper element, which is how most
 * smooth-scroll libraries do it — that approach would break this site
 * outright:
 *   · `position: sticky` stops working inside a transformed ancestor, and the
 *     hero's 280svh pinned rail, M18's pinned film stage and the properties
 *     band all depend on it;
 *   · CSS scroll-driven animations (`animation-timeline`) read the real
 *     scroller, so M18's whole choreography would freeze;
 *   · the header's ground probe and the hero's `--p` both sample real scroll.
 * Because the real position still moves, all of that keeps working and simply
 * follows the eased motion.
 *
 * ── WHAT IT DELIBERATELY DOES NOT TOUCH ─────────────────────────────────────
 * · TOUCH, unless explicitly switched on. A phone's own momentum scrolling is
 *   already smooth and native; intercepting it is the version of this that
 *   genuinely earns the "scroll-jacking" name — it fights the finger, breaks
 *   overscroll and pull-to-refresh, and feels worse than doing nothing.
 * · Anything inside a scrollable element (the properties carousel, the bench's
 *   own panel). The wheel is handed straight back.
 * · Horizontal wheel/trackpad movement — that belongs to the carousel.
 * · Programmatic scrolls: the contact button's glide and anchor landings run
 *   their own way and this yields to them.
 * · Anyone with `prefers-reduced-motion` — it never attaches at all.
 */

type Mode = 'off' | 'lerp' | 'settle' | 'momentum';

interface Config {
  mode: Mode;
  /** exponential ease-out: fraction of the remaining distance per 60fps frame */
  lerp: number;
  /** 'settle' mode: how long one impulse takes to come to rest */
  duration: number;
  /** 'momentum' mode: velocity retained per 60fps frame */
  friction: number;
  /** how far one wheel notch travels, against native */
  multiplier: number;
  touch: boolean;
  keys: boolean;
}

const DEFAULTS: Config = {
  mode: 'off',
  lerp: 0.12,
  duration: 900,
  friction: 0.92,
  multiplier: 1,
  touch: false,
  keys: true,
};

const root = document.documentElement;

const num = (name: string, fallback: number) => {
  const v = parseFloat(root.dataset[name] ?? '');
  return Number.isFinite(v) ? v : fallback;
};

/** Read live, so the bench's controls take effect without a reload. */
function readConfig(): Config {
  const mode = (root.dataset.smooth ?? DEFAULTS.mode) as Mode;
  return {
    mode: ['lerp', 'settle', 'momentum'].includes(mode) ? mode : 'off',
    lerp: num('smoothLerp', DEFAULTS.lerp),
    duration: num('smoothDur', DEFAULTS.duration),
    friction: num('smoothFriction', DEFAULTS.friction),
    multiplier: num('smoothMult', DEFAULTS.multiplier),
    touch: root.dataset.smoothTouch === 'on',
    keys: root.dataset.smoothKeys !== 'off',
  };
}

/**
 * The site's own easing curve, solved. The motion rules say use the tokens and
 * never a raw curve or a hardcoded duration — `--ease` is
 * cubic-bezier(0.16, 1, 0.3, 1), so 'settle' mode uses exactly the curve every
 * other transition on this site uses, read from the token rather than copied.
 */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const A = (a: number, b: number) => 1 - 3 * b + 3 * a;
  const B = (a: number, b: number) => 3 * b - 6 * a;
  const C = (a: number) => 3 * a;
  const calc = (t: number, a: number, b: number) => ((A(a, b) * t + B(a, b)) * t + C(a)) * t;
  const slope = (t: number, a: number, b: number) => 3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a);
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const d = slope(t, x1, x2);
      if (d === 0) break;
      const err = calc(t, x1, x2) - x;
      if (Math.abs(err) < 1e-5) break;
      t -= err / d;
    }
    return calc(t, y1, y2);
  };
}

function readEaseToken(): (x: number) => number {
  const raw = getComputedStyle(root).getPropertyValue('--ease').trim();
  const m = raw.match(/cubic-bezier\(([^)]+)\)/);
  if (m) {
    const p = m[1].split(',').map((n) => parseFloat(n));
    if (p.length === 4 && p.every(Number.isFinite)) return bezier(p[0], p[1], p[2], p[3]);
  }
  return bezier(0.16, 1, 0.3, 1); // the token's own value, as the fallback
}

/**
 * Hand the wheel back if anything under the pointer can absorb it — the
 * properties carousel, the bench panel, any future scrollable box. Without
 * this the page would steal every one of those gestures.
 */
function absorbedBySubScroller(target: EventTarget | null, delta: number): boolean {
  let el = target instanceof Element ? target : null;
  while (el && el !== document.body && el !== root) {
    const s = getComputedStyle(el);
    const scrollableY = /(auto|scroll|overlay)/.test(s.overflowY) && el.scrollHeight > el.clientHeight + 1;
    if (scrollableY) {
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if (!((delta < 0 && atTop) || (delta > 0 && atBottom))) return true;
    }
    el = el.parentElement;
  }
  return false;
}

let teardown: (() => void) | null = null;

function init() {
  teardown?.();
  teardown = null;

  // Never for a visitor who has asked for less motion. Checked at attach time
  // AND watched, so switching it mid-visit takes effect (the same standard the
  // carousel is held to).
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) return;

  if (readConfig().mode === 'off') return;

  const ease = readEaseToken();

  let target = window.scrollY;
  let current = window.scrollY;
  let velocity = 0;
  let raf = 0;
  let last = 0;
  // 'settle' mode tweens from a fixed origin, restarted on every impulse.
  let tweenFrom = 0;
  let tweenStart = 0;

  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const clamp = (v: number) => Math.min(maxScroll(), Math.max(0, v));

  const stop = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    velocity = 0;
  };

  const frame = (now: number) => {
    const cfg = readConfig();
    if (cfg.mode === 'off') { stop(); return; }
    const dt = last ? Math.min(64, now - last) : 16.67;
    last = now;

    if (cfg.mode === 'lerp') {
      // Frame-rate normalised, so a 60Hz and a 165Hz screen ease identically.
      // (The carousel's own recorded rule: derive from elapsed time, never
      // from a per-frame constant.)
      const k = 1 - Math.pow(1 - Math.min(0.95, Math.max(0.01, cfg.lerp)), dt / 16.67);
      current += (target - current) * k;
    } else if (cfg.mode === 'settle') {
      const t = Math.min(1, (now - tweenStart) / Math.max(120, cfg.duration));
      current = tweenFrom + (target - tweenFrom) * ease(t);
    } else {
      // momentum: friction decays velocity per unit time, not per frame.
      velocity *= Math.pow(Math.min(0.995, Math.max(0.5, cfg.friction)), dt / 16.67);
      current += velocity * (dt / 16.67);
      current = clamp(current);
      target = current;
      if (Math.abs(velocity) < 0.08) {
        current = Math.round(current);
        window.scrollTo(0, current);
        stop();
        return;
      }
    }

    const done = cfg.mode !== 'momentum' && Math.abs(target - current) < 0.25;
    if (done) current = target;
    window.scrollTo(0, current);
    if (done) { stop(); return; }
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (raf) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  };

  const impulse = (delta: number, cfg: Config) => {
    if (cfg.mode === 'momentum') {
      velocity += delta * 0.28 * cfg.multiplier;
      current = window.scrollY;
    } else {
      // ⚠️ IF WE ARE NOT ANIMATING, THE PAGE'S POSITION IS THE TRUTH — always.
      // While idle we never write, so anything that moved it was somebody
      // else: an anchor landing, the contact button's glide, the browser
      // restoring a position, a page swap. An earlier version compared against
      // the last value we wrote and only resynced past a 2px threshold, which
      // silently failed from the initial state (nothing written yet) and left
      // the engine believing the page was somewhere it was not — the next
      // wheel then jumped from that stale point.
      if (!raf) { current = window.scrollY; target = current; }
      target = clamp(target + delta * cfg.multiplier);
      if (cfg.mode === 'settle') {
        tweenFrom = current;
        tweenStart = performance.now();
      }
    }
    start();
  };

  const onWheel = (e: WheelEvent) => {
    const cfg = readConfig();
    if (cfg.mode === 'off') return;
    if (e.ctrlKey) return;                       // pinch-zoom belongs to the browser
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // horizontal is the carousel's
    if (absorbedBySubScroller(e.target, e.deltaY)) return;

    // deltaMode 1 is lines (Windows mice report this), 2 is pages.
    const px = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
    e.preventDefault();
    impulse(px, cfg);
  };

  const onKey = (e: KeyboardEvent) => {
    const cfg = readConfig();
    if (cfg.mode === 'off' || !cfg.keys) return;
    const t = e.target as HTMLElement | null;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const page = window.innerHeight * 0.9;
    const step: Record<string, number> = {
      ArrowDown: 120, ArrowUp: -120,
      PageDown: page, PageUp: -page,
      ' ': e.shiftKey ? -page : page,
    };
    let delta = step[e.key];
    if (e.key === 'Home') { e.preventDefault(); impulse(-maxScroll() - window.scrollY, cfg); return; }
    if (e.key === 'End') { e.preventDefault(); impulse(maxScroll() - window.scrollY, cfg); return; }
    if (delta === undefined) return;
    e.preventDefault();
    impulse(delta, cfg);
  };

  // Touch is opt-in and off by default — see the note at the top of this file.
  // ⚠️ SECTION SNAPPING ON A PHONE WAS BUILT HERE AND REMOVED AT THE CLIENT'S
  // WORD (12 Aug 2026: "remove the section swiping on a phone and the toggle
  // option i dont like that"). It is deleted rather than parked, along with its
  // header toggle — the same way the four seam treatments went on 6 Aug. Do not
  // rebuild it speculatively. It worked and was fully verified; they simply did
  // not want it.
  let touchY = 0;
  const onTouchStart = (e: TouchEvent) => {
    if (!readConfig().touch) return;
    stop();
    touchY = e.touches[0].clientY;
    current = window.scrollY;
    target = current;
  };
  const onTouchMove = (e: TouchEvent) => {
    const cfg = readConfig();
    if (!cfg.touch || cfg.mode === 'off') return;
    if (absorbedBySubScroller(e.target, 0)) return;
    const y = e.touches[0].clientY;
    const delta = touchY - y;
    touchY = y;
    e.preventDefault();
    impulse(delta, cfg);
  };

  // Something else moved the page (a link's anchor landing, the contact
  // button's glide, the browser restoring a position): adopt it rather than
  // fighting it. While `raf` is 0 we are not writing, so any movement is
  // theirs by definition — no threshold, no guessing.
  const onScroll = () => {
    if (raf) return;
    current = window.scrollY;
    target = current;
    velocity = 0;
  };

  const onResize = () => { target = clamp(target); };
  const onReduce = () => { if (mq.matches) { stop(); teardown?.(); } };

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKey);
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  mq.addEventListener('change', onReduce);

  teardown = () => {
    stop();
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    mq.removeEventListener('change', onReduce);
    teardown = null;
  };
}

/** The bench calls this after changing a setting, so nothing needs a reload. */
(window as unknown as { __smoothScrollRefresh?: () => void }).__smoothScrollRefresh = init;

init();

// This site navigates without a full reload (View Transitions), so the
// listeners must come down with the page and go back up on the next one —
// otherwise a stale rAF keeps scrolling a page that no longer exists. Same
// teardown discipline the header and the contact button's glide already use.
document.addEventListener('astro:before-swap', () => teardown?.());
document.addEventListener('astro:page-load', () => init());

export {};
