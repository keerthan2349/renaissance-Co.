// developers.ts — THE BUILDERS STRIP (M16). One list, one place it appears:
// the crawling row between Qualifications and Contact on the homepage.
//
// ============================================================================
// NOTHING HERE MAY BE GUESSED — not a name, not a logo, not a relationship.
// While this array is empty the section RENDERS NOTHING AT ALL: no heading, no
// empty band, no placeholder marks. A half-built strip cannot ship by accident,
// exactly as a blank properties shelf cannot (see projects.ts).
// ============================================================================
//
// OUTSTANDING BEFORE THIS CAN BE FILLED — all client input, all standing since
// 28 July 2026:
//   1. BELLAVIERRE'S WRITTEN APPROVAL to name developers publicly. The same
//      gate that holds the property list. Naming builders on a public page is
//      the thing that approval exists to cover.
//   2. THE LIST itself, from the client.
//   3. THE LOGO FILES, and the right to display them. A developer's logo is
//      their trademark; a wall of them reads as an endorsement claim, which is
//      a stronger statement than "we deal with these builders".
//   4. THE WORDING (see content.ts): "partners" asserts a relationship that
//      "builders we work with" does not. Brand §10 — say only what is true.
//
// LOGOS: drop files into `public/developers/` and reference them as
// '/developers/your-file.svg'. SVG is strongly preferred (sharp at any size,
// a couple of kB); otherwise a compressed PNG with a transparent background.
// They are served as-is, so COMPRESS FIRST — this site has a hard performance
// floor and the strip loads on the homepage.
//
// A developer with no logo file falls back to their name set in the site's own
// type. That is deliberate: a missing file must never leave a broken frame.

export type Developer = {
  /** The builder's name, exactly as they publish it. Requires the written OK. */
  name: string;
  /** Path to the logo in public/, e.g. '/developers/name.svg'. Optional —
   *  without it the name renders as type. */
  logo?: string;
};

/** THE PASTE-IN POINT. Add entries here and the strip appears on the homepage;
 *  leave it empty and the section does not exist. */
export const developers: Developer[] = [
  // Nothing here yet — see the four gates above.
];
