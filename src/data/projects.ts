// projects.ts — THE PROJECTS DATA. One list, three places it appears:
//   · the homepage carousel      (M10-Projects/Carousel.astro)
//   · the full list at /properties (M10-Projects/Shelf.astro)
//   · one detail page per property at /properties/<slug>  (M10-Projects/Detail.astro)
//
// ADDRESS RENAMED 4 Aug 2026 (client): /projects → /properties, so the URL says
// what every visitor already reads. Old addresses still resolve — see the
// `redirects` block in astro.config.mjs. The INTERNAL names here (this file, the
// M10-Projects folder, the `project` field) are deliberately unchanged.
//
// It lives in src/data/ rather than inside the module because the footer also
// needs to know whether there are any projects (to decide whether to show the
// link), and modules are not allowed to import from each other.
//
// ============================================================================
// NOTHING HERE MAY BE GUESSED. Not a developer, not a project, not an area, not
// a handover quarter. If a project isn't in this array it does not exist on the
// site — and while the array is empty, /properties and every detail page are NOT
// GENERATED AT ALL, so nothing blank can ship.
// ============================================================================
//
// OUTSTANDING BEFORE THIS CAN BE FILLED FOR REAL:
//   1. Bellavierre's WRITTEN approval to name developers and projects publicly.
//   2. Their answer on whether Dubai advertising permit numbers (Trakheesi) must
//      appear on our side — hence the optional `permit` field.
//   3. The images, and the right to use them.
//
// IMAGES: drop files into `public/properties/` and reference them as
// '/properties/your-file.jpg'. They are served as-is, so COMPRESS THEM FIRST —
// a raw developer render is often several MB and this site has a hard
// performance floor (Lighthouse 95+ mobile, LCP under 2s) against paid traffic
// on Indian mobile networks. Portrait crops (4:5) suit the cards best.
// A project with no image renders on a plain navy panel — never a broken frame.

export type Project = {
  /** URL segment, lowercase and hyphenated. Becomes /properties/<slug>. Must be unique. */
  slug: string;
  /** Developer name. Requires Bellavierre's written OK. Never guess. */
  developer: string;
  /** Project name as the developer publishes it. Requires the same OK. */
  project: string;
  /** Area / community. */
  area: string;
  /** Handover quarter as the developer states it, e.g. 'Q4 2027'. */
  handover: string;
  /** Unit types offered, e.g. 'Studios to 2-bed'. */
  unitTypes: string;
  /** ONE line: why this is on our shelf. This sentence IS the feature — the only
   *  thing on the page a competitor can't copy. The client's words. */
  why: string;
  /** Starting price, EXACTLY as it should appear on the card — including the
   *  currency, e.g. 'AED 1,250,000'. It is printed verbatim: never calculated,
   *  never converted between currencies, never rounded or reformatted. Optional;
   *  a project without one simply shows no price row.
   *
   *  ADDED 28 Jul 2026 at the client's request. Note it reverses the blueprint's
   *  original "no prices on the shelf" line. The reason that line existed is
   *  still real: developer launch prices move between phases, and a stale price
   *  sitting on the site is exactly the kind of wrongness this brand is built
   *  against. Hence `priceAsOf` below — and re-check these when a phase sells out. */
  priceFrom?: string;
  /** When that price was true, e.g. 'July 2026'. Shown on the property's own page
   *  so the figure is dated rather than presented as permanent (§10). Optional,
   *  but strongly recommended wherever priceFrom is set. */
  priceAsOf?: string;
  /** Path under public/, e.g. '/properties/name.jpg'. Optional — navy panel if absent. */
  image?: string;
  /** Describe the image for screen readers and for when it fails to load. */
  imageAlt?: string;
  /** Detail-page paragraphs. Optional; the detail page stands without them. */
  detail?: string[];
  /** Dubai advertising permit number. ONLY if Bellavierre confirms one must
   *  appear on our side. Omitted entirely otherwise — never invented. */
  permit?: string;
};

/** Four to six at a time (blueprint §6). A short list, not a catalogue. */
export const projects: Project[] = [
  // ==========================================================================
  // ⚠️ TEMPORARY LAYOUT PLACEHOLDERS — NOT REAL PROJECTS.
  //
  // STATUS 29 Jul 2026: LIVE ON THE DEPLOYED SITE, by the client's explicit
  // decision. I advised against deploying them; the client chose to keep the
  // carousel and /projects visible "for the time being" rather than have those
  // surfaces (and M06 off-plan with them) disappear until the real list lands.
  // Every value is loudly marked EXAMPLE / NOT REAL precisely so it cannot be
  // read as a real listing.
  //
  //   >>> REPLACE WITH THE REAL PROJECT LIST AT THE FIRST OPPORTUNITY. <<<
  //
  // ==========================================================================
  {
    slug: 'example-project-one',
    developer: 'EXAMPLE DEVELOPER — NOT REAL',
    project: 'Example Property One',
    area: 'Example area',
    handover: 'Q0 0000',
    unitTypes: 'Example unit types',
    why: 'EXAMPLE PLACEHOLDER — this is where your one line goes: the actual reason this property is on your shelf. It is the only thing here a competitor cannot copy, so it carries the whole section.',
    priceFrom: 'AED 0,000,000',
    priceAsOf: 'EXAMPLE MONTH 0000',
    detail: [
      'EXAMPLE PLACEHOLDER — the detail page takes as many paragraphs as you want to give it, or none at all. With none, the page still stands on the facts above and the reason it is on the shelf.',
      'EXAMPLE PLACEHOLDER — a second paragraph, to show how they sit together.',
    ],
  },
  {
    slug: 'example-project-two',
    developer: 'EXAMPLE DEVELOPER TWO — NOT REAL',
    project: 'Example Property Two',
    area: 'Example area',
    handover: 'Q0 0000',
    unitTypes: 'Example unit types',
    why: 'EXAMPLE PLACEHOLDER — a second card, so you can see how the carousel moves and how two properties sit apart in the full list.',
    priceFrom: 'AED 0,000,000',
    priceAsOf: 'EXAMPLE MONTH 0000',
  },
  {
    slug: 'example-project-three',
    developer: 'EXAMPLE DEVELOPER THREE — NOT REAL',
    project: 'Example Property Three',
    area: 'Example area',
    handover: 'Q0 0000',
    unitTypes: 'Example unit types',
    why: 'EXAMPLE PLACEHOLDER — this one also carries the optional permit line, which appears only if Bellavierre confirms a Dubai advertising permit must show on our side.',
    permit: 'EXAMPLE-PERMIT-NUMBER',
  },
  {
    slug: 'example-project-four',
    developer: 'EXAMPLE DEVELOPER FOUR — NOT REAL',
    project: 'Example Property Four',
    area: 'Example area',
    handover: 'Q0 0000',
    unitTypes: 'Example unit types',
    why: 'EXAMPLE PLACEHOLDER — a fourth card, so the carousel has something to scroll to on a wide screen. This one and property three carry NO price, to show that the price row simply drops away rather than leaving a blank.',
  },
];

/** Copy for the projects module.
 *  WORDING (client, 3 Aug 2026): the client-facing word is "properties", never
 *  "projects" — they dislike how "projects" sounds when presenting. Internal
 *  names (this file, fields, slugs, the /projects URL) are unchanged; the URL
 *  rename is a separately-pending client decision. */
export const projectsContent = {
  // Homepage carousel
  carouselEyebrow: 'Curated',
  carouselHeading: 'On the shelf',
  carouselAll: 'See all properties',
  // /projects listing
  shelfEyebrow: 'Curated',
  shelfHeading: 'The shelf',
  shelfIntro:
    'A short list, not a catalogue. Four to six properties at a time, and next to each one the reason it is on the list.',
  // Detail pages
  detailBack: 'All properties',
  labels: {
    area: 'Area',
    handover: 'Handover',
    unitTypes: 'Units',
    permit: 'Permit',
    why: 'Why it is on the shelf',
    // Card + detail price strings
    completion: 'Completion',
    priceFrom: 'Starting price',
    priceAsOf: 'as at', // renders as e.g. "as at July 2026" beside the price on the detail page
  },
};

/** Look one up by slug. Used by the detail route. */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
