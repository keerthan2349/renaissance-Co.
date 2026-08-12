/**
 * M19 · Scroll — settings.
 *
 * Everything this module does is configured from this one file, the same way
 * M01's hero, M18's film and M10's backdrop are. Nothing here is read from
 * anywhere else, and nothing outside this folder needs editing to change how
 * the site scrolls.
 *
 * ⚠️ `enabled: false` IS THE SHIPPING STATE UNTIL THE CLIENT GREEN-LIGHTS IT.
 * While it is false the engine is never even fetched (`Scroll.astro` imports
 * it dynamically behind this flag), so the live site's scrolling is exactly
 * the browser's own. The bench at /lab/scroll/ switches it on at runtime.
 *
 * ⚠️ SWITCHING IT ON IS A SIXTH MOTION EXCEPTION, and a wider one than the
 * other five: they each live in one section, this touches every page and every
 * visitor. Scroll-jacking is banned by name in the blueprint (§4.2) and Lenis
 * is named in the no-libraries rule. Nothing was installed — the engine is
 * `scroll.ts` beside this file, about 200 lines.
 */

export type ScrollMode = 'off' | 'lerp' | 'settle' | 'momentum';

export interface ScrollSettings {
  /** The whole module's on/off switch. False = the browser's own scrolling. */
  enabled: boolean;
  /**
   * off       — native
   * lerp      — always easing toward where the push landed ("Glide")
   * settle    — one impulse on the site's OWN easing curve ("Settle")
   * momentum  — velocity + friction, a fling with a long tail
   */
  mode: ScrollMode;
  /** 'lerp': 0.05–0.35 — how fast it closes the remaining distance */
  lerp: number;
  /** 'settle': 300–1600ms — how long one impulse takes to come to rest */
  duration: number;
  /** 'momentum': 0.80–0.98 — how much speed survives each frame */
  friction: number;
  /** 0.5–2.0 — how far one wheel notch travels */
  multiplier: number;
  /**
   * ⚠️ Leave false. A phone's momentum scrolling is already native and smooth;
   * intercepting it fights the finger and breaks pull-to-refresh. This is the
   * version that genuinely earns the "scroll-jacking" name.
   */
  touch: boolean;
  /** Arrow / page keys / space follow the same easing. */
  keys: boolean;
}

export const scroll: ScrollSettings = {
  // ✅ LIVE at the client's explicit word, 12 Aug 2026: "yes push it as the new
  // version in git and make it the current new version too with the glide -
  // ease: 0.09, arrow/page keys on, touch off".
  // ⚠️ THIS IS THE SIXTH MOTION EXCEPTION, taken knowingly — they were shown
  // the standing "do not add a sixth" note and that this one, unlike the other
  // five, touches every page and every visitor. Recorded in repo/CLAUDE.md,
  // the blueprint §4.2 and vault/website/smooth-scrolling.md.
  // Revert is one word: set this back to false.
  enabled: true,
  // ── THEIR PICK (chosen at /lab/scroll/):
  //    "lets go with glide - ease 0.09, also arrow/page keys, but not touch too"
  mode: 'lerp',
  lerp: 0.09,
  duration: 900,
  friction: 0.92,
  multiplier: 1,
  touch: false,
  keys: true,
};

/**
 * ⚠️ SECTION SNAPPING ON A PHONE WAS BUILT HERE AND REMOVED (12 Aug 2026).
 * The client asked for a swipe to glide to the next section, saw it, and said:
 * "remove the section swiping on a phone and the toggle option i dont like
 * that". Its settings, its engine code and its header toggle are all DELETED
 * rather than parked — the same call they made about the four seam treatments
 * on 6 Aug. It worked and was fully verified; they simply did not want it.
 * Do not rebuild it speculatively.
 */

/**
 * The settings as the attributes the engine reads. Exported so the bench and
 * the component write the identical set — one source, no second copy to drift.
 */
export function scrollAttrs(s: ScrollSettings = scroll): Record<string, string> {
  return {
    'data-smooth': s.mode,
    'data-smooth-lerp': String(s.lerp),
    'data-smooth-dur': String(s.duration),
    'data-smooth-friction': String(s.friction),
    'data-smooth-mult': String(s.multiplier),
    'data-smooth-touch': s.touch ? 'on' : 'off',
    'data-smooth-keys': s.keys ? 'on' : 'off',
  };
}
