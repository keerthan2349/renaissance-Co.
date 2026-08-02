// marquee.ts — THE MARQUEE WORDS, one source of truth for every marquee on the
// site (the homepage backdrop, the page-band template, and the lab benches).
//
// EVERY PHRASE IS SOURCED — nothing here was written for a marquee. A phrase
// repeated across a screen is the most-read text on the page even when nobody
// consciously reads it, so "never invent" applies to decoration exactly as it
// applies to body copy.
//
//   RENAISSANCE & CO. · INVESTMENTS   the logo wordmark and subline, brand §8.1
//   OFF-PLAN SPECIALIST               brand §5.2, verbatim
//   STRATEGY, NOT JUST SALE           brand §5.3, verbatim
//   END TO END                        blueprint §7.5 "We work end to end"
//   AFTER THE KEYS                    M05's live heading
//   WE STAY                           §7.5 "We stay for that part" / brand §5.8
//   DUBAI · ABU DHABI · RAS AL KHAIMAH · HYDERABAD   brand §9 geography
//
// Removed at the client's request (2 Aug): "ADVISED, NOT SOLD". Do not
// reinstate it without them asking. Deliberately absent: any figure, price or
// percentage, anything about returns, "guaranteed", anything implying
// registered status.

import type { MarqueeRow } from '@/components/primitives/Marquee.astro';

/** Two alternating pools: the name & places, and the firm's own argument. */
export const MARQUEE_POOLS: string[][] = [
  ['RENAISSANCE & CO.', 'INVESTMENTS', 'HYDERABAD', 'DUBAI', 'ABU DHABI', 'RAS AL KHAIMAH'],
  ['OFF-PLAN SPECIALIST', 'END TO END', 'AFTER THE KEYS', 'STRATEGY, NOT JUST SALE', 'WE STAY'],
];

/** The site's approved loop range (41–65s), non-harmonic so rows drift apart
    instead of marching in step. */
export const MARQUEE_DURATIONS = [52, 41, 61, 45, 65, 50, 56, 43];

/**
 * Build any number of rows from the pools. Row i draws from the pool for its
 * position in the alternating pattern, then ROTATES that pool by how many
 * times the pattern has come round — so no two rows start on the same phrase
 * until a pool is exhausted. Without the rotation, a tall backdrop becomes
 * stacked identical pairs, which reads as a rendering fault, not texture.
 */
export function buildMarqueeRows(
  count: number,
  style: (rowIndex: number) => Partial<MarqueeRow> = () => ({}),
): MarqueeRow[] {
  const lanes = MARQUEE_POOLS.length;
  return Array.from({ length: count }, (_, i) => {
    const pool = MARQUEE_POOLS[i % lanes];
    const turn = Math.floor(i / lanes);
    return {
      text: pool.map((_, j) => pool[(j + turn) % pool.length]),
      duration: MARQUEE_DURATIONS[i % MARQUEE_DURATIONS.length],
      ...style(i),
    };
  });
}

/**
 * The DARK-GROUND recipe every navy surface shares (client-approved on the
 * homepage, reused by the page-band template): outline, ivory rows alternating
 * with gold Inter rows.
 */
export function darkGroundRows(count: number): MarqueeRow[] {
  return buildMarqueeRows(count, (i) => ({
    variant: 'outline',
    ...(i % 2 === 1 ? { font: 'util' as const, tone: 'gold' as const } : {}),
  }));
}
