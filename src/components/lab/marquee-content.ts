// ⚠️ LAB CONTENT — used only by the dev-only lab page. Nothing here ships.
//
// EVERY PHRASE IS SOURCED. Nothing on this list was written for the marquee.
// The "never invent" rule applies to decoration exactly as it applies to body
// copy — arguably harder, because a phrase repeated forty times across a screen
// is the most-read text on the page even when nobody consciously reads it.
//
//   RENAISSANCE & CO.        the firm's name — logo wordmark, brand §8.1
//   INVESTMENTS              the logo's subline, brand §8.1
//   ADVISED, NOT SOLD        blueprint §7.1 Option B hero headline
//   OFF-PLAN SPECIALIST      brand §5.2, verbatim
//   STRATEGY, NOT JUST SALE  brand §5.3, verbatim
//   END TO END               blueprint §7.5 "We work end to end"
//   AFTER THE KEYS           M05's live heading "End to end — and after the keys"
//   WE STAY                  §7.5 "We stay for that part" / brand §5.8
//   DUBAI · ABU DHABI ·
//   RAS AL KHAIMAH           brand §9, the stated UAE geography
//   HYDERABAD                brand §9, the primary market
//
// NOT eligible, and deliberately absent: any figure, yield, price or percentage
// (they need a source + verified date through the content schema), anything
// about returns or recovery, the word "guaranteed", and any claim of registered
// or licensed status.

import type { MarqueeRow } from '@/components/modules/M10-Projects/Marquee.astro';

/** Ceiling for the lab's Rows slider. Rows are generated, not hand-written, so
    this can be raised freely — the only real cost is one composited layer per
    row, which is what the in-page frame counter is there to watch. */
export const MAX_ROWS = 20;

export interface Preset {
  id: string;
  label: string;
  note: string;
  /** One pool per row-in-the-repeating-pattern. Row i draws from
      pools[i % pools.length], so a two-pool preset alternates by row. */
  pools: string[][];
  /** Per-row look, by row index — used to alternate voice as well as speed. */
  rowStyle?: (i: number) => Partial<MarqueeRow>;
}

export const PRESETS: Preset[] = [
  {
    id: 'wordmark',
    label: 'The wordmark',
    note: 'The name and the subline only. The most restrained option, and the closest to the fashion-house references — those are almost always the brand name alone.',
    pools: [['RENAISSANCE & CO.', 'INVESTMENTS']],
  },
  {
    id: 'position',
    label: 'The position',
    note: "The firm's actual argument, in its own approved words. Says more, and asks the eye to read rather than to register a texture.",
    // "ADVISED, NOT SOLD" removed at the client's request, 2 Aug 2026 — kept out
    // of the lab too, so it cannot creep back in during a future retune.
    pools: [
      ['OFF-PLAN SPECIALIST', 'STRATEGY, NOT JUST SALE', 'END TO END', 'AFTER THE KEYS', 'WE STAY'],
    ],
  },
  {
    id: 'geography',
    label: 'The geography',
    note: 'Cities only. Reads as reach, carries no claim at all, and is the safest of the three — there is nothing in it that could ever go stale.',
    pools: [['DUBAI', 'ABU DHABI', 'RAS AL KHAIMAH', 'HYDERABAD']],
  },
  {
    id: 'mixed',
    label: 'Mixed',
    note: 'The name and the places on one set of rows, the argument on the other. Alternates Cinzel and Inter so the rows separate by voice as well as by speed.',
    pools: [
      ['RENAISSANCE & CO.', 'INVESTMENTS', 'HYDERABAD', 'DUBAI', 'ABU DHABI', 'RAS AL KHAIMAH'],
      ['OFF-PLAN SPECIALIST', 'END TO END', 'AFTER THE KEYS', 'STRATEGY, NOT JUST SALE', 'WE STAY'],
    ],
    rowStyle: (i) => (i % 2 === 1 ? { font: 'util', tone: 'gold' } : {}),
  },
];

/**
 * Build any number of rows from a preset.
 *
 * Row i takes the pool for its position in the pattern, then rotates that pool
 * by how many times the pattern has already come round — so no two rows start
 * on the same phrase until the pool is exhausted. Without the rotation, a
 * 12-row wordmark backdrop would be six identical pairs, and the repetition
 * reads as a rendering fault rather than as texture.
 */
export function buildRows(preset: Preset, count: number): MarqueeRow[] {
  const lanes = preset.pools.length;
  return Array.from({ length: count }, (_, i) => {
    const pool = preset.pools[i % lanes];
    const turn = Math.floor(i / lanes);
    const text = pool.map((_, j) => pool[(j + turn) % pool.length]);
    return { text, ...(preset.rowStyle?.(i) ?? {}) };
  });
}
