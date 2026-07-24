// page-order.ts — ORDER IS DATA (§ architecture rule 3).
// The homepage renders exactly the sections listed here, in this order.
// Reordering the page, or removing a section, is editing this list —
// never restructuring a layout. Only ids listed here render.
//
// Each id maps to a module in src/components/modules/ via the registry in
// src/pages/index.astro. Add a module id here only once its module exists.

export const pageOrder = [
  'hero', // M01
  'founder', // M03  — Wave 2
  'refusal', // M04  — Wave 2
  'what-we-do', // M05  — Wave 2
  'contact', // M09
  // 'market' (M02) intentionally CUT by client decision — a macro-stat section
  // read as dilution next to the founder's record and the walk-away story, which
  // are the actual proof. See vault/website/wave-2-build-plan.md. Also removed the
  // only figures that needed source URLs, so content/figures/ stays empty for now.
] as const;

export type SectionId = (typeof pageOrder)[number];
