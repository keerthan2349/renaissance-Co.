/**
 * M10 · Projects — how the shelf behaves ON A PHONE.
 *
 * Client's ask and settings, 12 August 2026, chosen at `/lab/carousel-mobile/`:
 *   "i want cards to have extra height … only one card to shown along with
 *    slide preview just border of another card just to know that there are
 *    more cards … however much strength that swipe has it should show one card
 *    at a time … also give some animations to choose … and i dont want
 *    automatic movement of carousel in mobile version"
 *
 * ⚠️ PHONE ONLY, AND THAT IS ENFORCED IN CSS, NOT HERE. Every rule these
 * values feed sits inside a `max-width: 51.999rem` media query in
 * `Carousel.astro`. **The desktop carousel is untouched by all of it** — same
 * 26px/s crawl, same 24rem cards, same 4:5 ratio — which the client restated
 * explicitly when choosing these numbers. Verified by `verify-carousel-mobile`
 * with the gate still switched on at 1280px.
 *
 * ⚠️ `enabled` AND THE CRAWL ARE A PAIR, NOT TWO SETTINGS. This layout uses
 * mandatory scroll-snap, and snap fights a continuous crawl every frame — the
 * same incompatibility that took snapping off the carousel when the crawl
 * first shipped on 28 Jul. Turning this on is what stops the crawl on phones
 * (`phoneOneCard()` in the component's script). Never separate them.
 *
 * Revert the whole thing in one word: `enabled: false`.
 */

export interface ShelfMobile {
  /** Off = the phone gets exactly what desktop gets, at 78% card width. */
  enabled: boolean;
  /**
   * Card height as a multiple of the card's own width.
   * Desktop is 1.25 (a 4:5 crop). **The client's pick: 1.60.**
   */
  height: number;
  /**
   * Card width as a share of the screen. The rest is the sliver of the next
   * card that says "there is more". **The client's pick: 86%** — about a 14%
   * sliver. Below roughly 80% it starts to read as two cards rather than one.
   */
  width: number;
  /**
   * `start` puts the whole sliver on one side (**the client's pick**);
   * `center` splits it into a thinner sliver on both.
   */
  align: 'start' | 'center';
  /**
   * How one card becomes the next. Each option is driven by the card's own
   * position in the scrollport, so the motion follows the finger rather than
   * playing a timed animation at it.
   *   slide — the native track scroll, nothing added
   *   fade  — **the client's pick**
   *   lift  — smaller and dimmer off-centre
   *   depth — the next card comes forward from further back
   */
  anim: 'slide' | 'fade' | 'lift' | 'depth';
  /** How far the off-card recedes, for anything but `slide`. Their pick: 0.50. */
  dim: number;
}

export const shelfMobile: ShelfMobile = {
  enabled: true,
  height: 1.6,
  width: 86,
  align: 'start',
  anim: 'fade',
  dim: 0.5,
};

/**
 * The settings as the attributes and custom properties the component emits.
 * Exported so the bench and the shipping path write the identical set —
 * one source, no second copy to drift.
 */
export function shelfMobileVars(s: ShelfMobile = shelfMobile): string {
  return [
    `--mob-card-h:${s.height}`,
    `--mob-card-w:${s.width}%`,
    `--mob-align:${s.align}`,
    `--mob-dim:${s.dim}`,
  ].join(';');
}
