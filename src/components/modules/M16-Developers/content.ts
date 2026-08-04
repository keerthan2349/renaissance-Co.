// M16 · Developers — the control room. Every setting a non-coder might want
// changed lives here; the component reads only this file and src/data/developers.ts.
//
// The LOOK is the client's own, chosen at /lab/developers/ on 4 Aug 2026:
// option A (crawl, boxed) · 60s per loop · edge fade OFF · boxes 190px wide,
// 4:3, sharp corners · 39px between them · running edge to edge.
export const developersStrip = {
  // ── The words ─────────────────────────────────────────────────────────────
  // ⚠️ The heading line is a DEPLOY GATE, like M18's caption was: it must carry
  // the client's own words before this ships, and the wording matters —
  // "partners" claims a relationship that "builders we work with" does not
  // (brand §10). Never invent it.
  eyebrow: 'Developers',
  /** Set to '' to render no line at all. */
  line: '' as string,

  // ── The look ──────────────────────────────────────────────────────────────
  /** Seconds for one full loop of the row. Higher = slower. */
  speedSeconds: 60,
  /** Soft dissolve at the left/right screen edges. The client chose OFF —
   *  the boxes run straight to the edges and are cut by the screen. */
  edgeFade: false,
  /** Box width in px. Real logos vary a lot in weight; expect to re-tune this
   *  once actual files land. */
  boxWidth: 190,
  /** Box proportions. '4 / 3' is the client's pick. */
  boxRatio: '4 / 3',
  /** Gap between boxes in px. */
  gap: 39,
  /** Corner radius. '0px' = sharp, the client's pick. */
  corner: '0px',
};
