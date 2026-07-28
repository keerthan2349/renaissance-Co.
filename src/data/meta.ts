// meta.ts — the control room for M17 · Meta plumbing.
//
// THE MODULE IS NOT BUILT YET. This file exists so that switching it on is a
// one-line edit rather than a build, and so the shape is settled before any code
// depends on it. Full specification: vault/website/m17-meta-plumbing.md
//
// Nothing tracks, loads or transmits while `pixelId` is null. That is the same
// pattern the phone number and the projects list use: absent data means the
// feature is simply not there, never a broken or half-working version.

export const meta = {
  /**
   * Meta (Facebook) Pixel ID — a 15–16 digit number from
   * Events Manager → Data Sources. NOT YET SUPPLIED by the client (28 Jul 2026).
   *
   * Setting this is what switches tracking on. Leave it null and no Meta script
   * is requested, no cookie is set, and nothing is sent anywhere.
   */
  pixelId: null as string | null,

  /**
   * How the pixel may load. DEFERRED by the client 28 Jul 2026 — deliberately
   * left undecided, not overlooked. While this is 'undecided' the module must
   * refuse to load even if a pixelId is present.
   *   'always'    — load for everyone, disclosed in the privacy policy
   *   'consent'   — load only after the visitor accepts
   *   'undecided' — do not load at all (the safe default, and current state)
   *
   * Recommendation when it is time: 'always'. The trigger to reconsider is
   * deliberately advertising to NRIs in the UK or EU — at that point GDPR
   * applies squarely. See §6 of vault/website/m17-meta-plumbing.md.
   */
  consentMode: 'undecided' as 'always' | 'consent' | 'undecided',

  /**
   * Load only after the page has painted. The site is currently ~150kB with no
   * blocking JavaScript; Meta's fbevents.js is 70–100kB and would become the
   * heaviest thing on it. Deferring keeps the first paint untouched.
   */
  deferUntilIdle: true,

  /**
   * The stable hooks already present in the markup, so the module never has to
   * edit a content module to attach itself (modules never import each other).
   * Each maps a `data-track` value to the Meta event it should fire.
   *
   * Standard Meta events wherever possible — campaign optimisation can only
   * target standard events, not custom ones.
   */
  events: {
    call: { event: 'Contact', params: { contact_method: 'phone' } },
    whatsapp: { event: 'Contact', params: { contact_method: 'whatsapp' } },
    email: { event: 'Contact', params: { contact_method: 'email' } },
    instagram: { event: 'Contact', params: { contact_method: 'instagram' } },
  },

  /**
   * Property pages carry `data-project` / `data-project-name` on their <article>.
   * The module reads those to fire ViewContent, which builds the "people who
   * looked at this development" audience.
   */
  viewContentSelector: '[data-project]',
} as const;
