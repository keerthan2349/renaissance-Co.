// M10 · Projects — the marquee backdrop's content and its settings.
//
// ── THE SETTINGS THE CLIENT APPROVED (2 Aug 2026) ────────────────────────────
// Tuned live at /lab/marquee and signed off from the control panel they sent.
// Everything a non-coder might want changed is a named constant below.
//
// Approved: Mixed words · 18 rows · outline · "·" after each phrase · spread
// down the section · 38% strength · loop 41–65s · text 2.65rem · word spacing
// 3.25rem · letter spacing 0.02em · row spacing 0.60em · edge fade 3%.
//
// ── WHY THE NUMBERS BELOW ARE NOT ALL LITERALLY THOSE ────────────────────────
// The client asked for it to look the same on mobile and at every size. Their
// values were tuned at desktop width, and three of them cannot be carried over
// as fixed numbers without the look changing:
//
//   TEXT SIZE   a fixed 2.65rem does not shrink, so on a 390px screen the same
//               letters are proportionally ~3x larger. It is now a clamp whose
//               middle term (3.3vw) reproduces 2.65rem exactly at 1280px, the
//               width they tuned at, and scales from there.
//   SPACING     word spacing moves to `em` so the rhythm between phrases stays
//               identical as the type scales. 3.25rem at 2.65rem type = 1.23em.
//               Letter and row spacing were already in `em`.
//   ROW COUNT   18 rows overflows and is clipped at desktop, which is what
//               makes it read as full. Measured against the real section at
//               every width, the hungriest case is a 768px tablet (820px tall
//               section, type at its floor) which needs 20. Desktop needs 14.
//               So 20 rows fills every size; the surplus is clipped, exactly as
//               it already was on the desktop they approved.

import type { MarqueeRow } from './Marquee.astro';

/** Rows rendered. 20 fills every breakpoint; the surplus is clipped. */
export const BACKDROP_ROWS = 20;

/** Copies of the phrase pool inside EACH of the two groups. 2 keeps one group
    wider than the screen at every width — including a 2560px monitor, where
    the type has hit its cap but the viewport has not. */
export const BACKDROP_REPEAT = 2;

/** Seconds per loop, cycled across the rows. The client's 41–65s range.
    Non-harmonic on purpose so rows drift apart instead of marching in step. */
const DURATIONS = [52, 41, 61, 45, 65, 50, 56, 43];

/**
 * The phrases. EVERY ONE IS SOURCED — nothing here was written for the
 * marquee. A phrase repeated across a screen is the most-read text on the
 * page even when nobody consciously reads it, so "never invent" applies to
 * decoration exactly as it applies to body copy.
 *
 *   RENAISSANCE & CO. · INVESTMENTS   the logo wordmark and subline, brand §8.1
 *   OFF-PLAN SPECIALIST               brand §5.2, verbatim
 *   STRATEGY, NOT JUST SALE           brand §5.3, verbatim
 *   END TO END                        §7.5 "We work end to end"
 *   AFTER THE KEYS                    M05's live heading
 *   WE STAY                           §7.5 "We stay for that part" / brand §5.8
 *   DUBAI · ABU DHABI · RAS AL KHAIMAH · HYDERABAD   brand §9 geography
 *
 * Deliberately absent: any figure, price or percentage (those need a source and
 * a verified date through the content schema), anything about returns, the word
 * "guaranteed", and anything implying registered or licensed status.
 */
const POOLS: string[][] = [
  ['RENAISSANCE & CO.', 'INVESTMENTS', 'HYDERABAD', 'DUBAI', 'ABU DHABI', 'RAS AL KHAIMAH'],
  // "ADVISED, NOT SOLD" was removed at the client's request, 2 Aug 2026.
  // Do not reinstate it without them asking.
  ['OFF-PLAN SPECIALIST', 'END TO END', 'AFTER THE KEYS', 'STRATEGY, NOT JUST SALE', 'WE STAY'],
];

/**
 * Build the rows. Row i takes the pool for its place in the alternating
 * pattern, then rotates that pool by how many times the pattern has come
 * round — so no two rows start on the same phrase until a pool is exhausted.
 * Without the rotation, 20 rows would be ten identical pairs, and that reads as
 * a rendering fault rather than as texture.
 */
export const backdropRows: MarqueeRow[] = Array.from({ length: BACKDROP_ROWS }, (_, i) => {
  const pool = POOLS[i % POOLS.length];
  const turn = Math.floor(i / POOLS.length);
  return {
    text: pool.map((_, j) => pool[(j + turn) % pool.length]),
    duration: DURATIONS[i % DURATIONS.length],
    variant: 'outline',
    // Alternating voice, as approved: Cinzel in ivory against Inter in gold.
    ...(i % 2 === 1 ? { font: 'util' as const, tone: 'gold' as const } : {}),
  };
});
