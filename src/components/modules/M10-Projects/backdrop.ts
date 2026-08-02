// M10 · Projects — the homepage carousel's marquee backdrop settings.
//
// THE WORDS live in src/data/marquee.ts — one source for every marquee on the
// site — and the visual numbers (opacity 23%, edge fade 13%, sizes) live in
// the `.projects__marquee` block in Carousel.astro. This file only decides how
// many rows the homepage backdrop carries.
//
// 20 rows is measured, not guessed: a 768px tablet is the hungriest case
// (820px-tall section, type at its floor) and needs 20 to stay full; desktop
// needs 14 and clips the surplus — exactly what the client approved.
import { darkGroundRows } from '@/data/marquee';

export const BACKDROP_ROWS = 20;

/** Copies of the phrase pool inside EACH of the two groups. 2 keeps one group
    wider than the screen at every width, including a 2560px monitor. */
export const BACKDROP_REPEAT = 2;

export const backdropRows = darkGroundRows(BACKDROP_ROWS);
