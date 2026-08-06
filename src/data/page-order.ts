// page-order.ts — ORDER IS DATA (§ architecture rule 3).
// The homepage renders exactly the sections listed here, in this order.
// Reordering the page, or removing a section, is editing this list —
// never restructuring a layout. Only ids listed here render.
//
// Each id maps to a module in src/components/modules/ via the registry in
// src/pages/index.astro. Add a module id here only once its module exists.

export const pageOrder = [
  'hero', // M01  — dark
  'projects', // M10  — dark  · the carousel (renders nothing if there are no projects)
  //             SWAPPED with 'founder' 6 Aug 2026 (client's call): the shelf now
  //             follows the hero directly. The hero ends navy and the gradient's
  //             gold glow is what marks the new boundary; the gradient still
  //             resolves to exactly --navy at its bottom, which now hands off to
  //             the founder's IVORY — a clean colour change.
  // ⚠️ SWAPPED 6 Aug 2026 (client, chosen at /lab/sections/): the two BANDS did
  // not move — the ivory band is still first and the navy band second — only
  // the copy inside them traded places. That is why this reorder is paired with
  // each module's default ground being flipped: reordering alone would have
  // carried the grounds along and produced navy-then-ivory, the opposite of
  // what was asked. Change one without the other and the page inverts.
  'what-we-do', // M05  — ivory · the reading band after the shelf
  'founder', // M03  — DARK navy · the record now takes the emphasis band
  'qualifications', // M07  — ivory · Wave 3
  'developers', // M16  — ivory · the builders strip (client placement, 4 Aug).
  //                Renders NOTHING while src/data/developers.ts is empty, so
  //                listing it here cannot put a blank band on the page.
  'contact', // M09  — dark
  'showcase', // M18 — dark · the scroll-driven film (client green-light, 2 Aug)
  //
  // 'showcase' sits AFTER contact deliberately (client's placement): the film
  // is the close of the page, between "Call us" and the footer. It is a full-
  // height pinned section, not a Section primitive, so the same-ground
  // tightening rule doesn't apply — contact's navy runs straight into it,
  // which is the seamless hand-off the client approved in the lab.
  //
  // Grounds (reordered 6 Aug, client): hero(dark, ends navy) projects(NAVY)
  // founder(ivory) what-we-do(navy) qualifications(ivory) contact(navy).
  // The projects section's gold-tinted feature gradient was RETIRED the same
  // day (client): it painted a warmer, less blue field than the hero it now
  // sits under, and they asked for the match. So hero|projects are now the
  // exact same navy and that boundary is deliberately invisible — the hero is
  // not a Section, so the same-ground tightening rule doesn't reach across it
  // either. Every later boundary is still a colour change.
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
