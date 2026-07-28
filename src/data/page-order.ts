// page-order.ts — ORDER IS DATA (§ architecture rule 3).
// The homepage renders exactly the sections listed here, in this order.
// Reordering the page, or removing a section, is editing this list —
// never restructuring a layout. Only ids listed here render.
//
// Each id maps to a module in src/components/modules/ via the registry in
// src/pages/index.astro. Add a module id here only once its module exists.

export const pageOrder = [
  'hero', // M01  — dark
  'founder', // M03  — ivory · Wave 2
  'projects', // M10  — dark  · the carousel (renders nothing if there are no projects)
  'what-we-do', // M05  — DARK navy · Wave 2
  'qualifications', // M07  — ivory · Wave 3
  'contact', // M09  — dark
  //
  // Grounds (28 Jul, client): hero(dark) founder(ivory) projects(GRADIENT)
  // what-we-do(navy) qualifications(ivory) contact(navy). The projects section
  // carries a gold-tinted gradient because it is the feature; what-we-do is flat
  // navy beneath it. Those two are the only same-ground neighbours, and the
  // gradient-to-flat change is what marks the boundary between them.
  //
  // ---------------------------------------------------------------------------
  // 'off-plan' (M06) was REMOVED from the homepage on 28 Jul 2026 and now sits at
  // the BOTTOM OF /projects. Every project on that shelf is off-plan, so the
  // escrow/Oqood mechanics and the four risks belong where someone is browsing
  // off-plan units. It was deliberately NOT sent to /judgment: that would have
  // put a second honest section behind a footer link and left the homepage
  // reading like a broker's. The module is composed by the projects page.
  //
  // ---------------------------------------------------------------------------
  // 'refusal' (M04) was REMOVED from the homepage on 28 Jul 2026 and now lives on
  // its own page at /judgment. It may not share a page with the projects module
  // (blueprint §6 build rule) — an unnamed developer as the cautionary tale
  // beside named partner developers is a collision. The client chose to keep the
  // carousel on the homepage. Do NOT re-add 'refusal' here while 'projects' is
  // listed. The module itself is untouched and still builds.
  //
  // 'discretion' (M08) intentionally CUT by client decision (28 Jul 2026) — a
  // section explaining why there are no testimonials names a gap the visitor was
  // never going to notice. The rule it described stays structural: this site has
  // no testimonials section and never will (§6).
  //
  // 'market' (M02) intentionally CUT by client decision — a macro-stat section
  // read as dilution next to the founder's record and the walk-away story, which
  // are the actual proof. See vault/website/wave-2-build-plan.md. Also removed the
  // only figures that needed source URLs, so content/figures/ stays empty for now.
] as const;

export type SectionId = (typeof pageOrder)[number];
