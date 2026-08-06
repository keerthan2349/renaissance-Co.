// M01 · Hero copy and settings — the control room for the opening of the site.
// Editing these words never requires opening the component.
//
// ⚠️ REPLACED THE PREVIOUS HERO ON 5 AUG 2026, at the client's explicit
// instruction. What used to open the site was blueprint §7.1 Option A:
//
//     "Dubai is correcting."
//     "Most people selling it to you won't say so."
//
// That was the only place the site named the correction in the first screen. It
// has NOT been deleted — the client was given three options and chose to let the
// hero go while keeping the correction where the properties actually are: it now
// opens **M06 Off-plan** at the bottom of /properties, and **/judgment**. Its old
// sub-line ("Renaissance & Co. is a Hyderabad advisory for Indian buyers and
// NRIs…") is retired rather than moved — the new opening below says the same
// thing in the client's own newer words.
//
// Every word here is the CLIENT'S, supplied 4 Aug 2026, verbatim.
//
// THE OPENING WAS FINALISED BY THE CLIENT ON 6 AUG 2026 — conviction /
// continuity is the site's opening, and the correction line's new placement is
// settled with it. Do not re-raise either.
import { projects } from '@/data/projects';

/**
 * THE TWO PERSISTENT BUTTONS — ✅ layout LOCKED by the client 6 Aug 2026
 * (corners · arrow · switch · soft) and switched ON for the site the same day.
 * One pinned at the top left, one at the bottom right, both holding their place
 * for the whole hero while their colours switch with the ground beneath them.
 *
 * ⚠️ A BUTTON WITH NO DESTINATION NEVER RENDERS ON THE LIVE SITE. It appears in
 * the lab (which passes `preview`) as a clearly-marked pending chip — but the
 * shipping path renders nothing at all. That is the same structural guarantee
 * the properties shelf and the builders strip give: a dead link cannot reach a
 * live page by accident, rather than relying on somebody remembering. Today
 * that means the homepage carries "Browse properties" alone; "Our work" arms
 * itself the moment its page ships.
 */
export const heroActions = {
  /**
   * ⚠️ `/our-work` DOES NOT EXIST YET (6 Aug 2026). The client's plan: this page
   * carries the founder's expertise and his record — his portfolio. It is to be
   * built AFTER the button layout is settled. **Set `href` to '/our-work' the
   * moment that page ships, and not before.** Until then this button is
   * lab-only, by construction.
   */
  lead: { label: 'Our work', href: null as string | null, track: 'hero-our-work' },

  /**
   * Gated exactly as `nav.ts` gates the menu link: `/properties` is not
   * generated at all while the list is empty, so linking to it would be a 404.
   * Today the four EXAMPLE properties keep it alive; when they are deleted and
   * before the real list lands, this button correctly disappears on its own.
   */
  trail: {
    label: 'Browse properties',
    href: projects.length > 0 ? '/properties' : null,
    track: 'hero-properties',
  },
};

export const heroContent = {
  /** Statement one — holds the first screen on ivory, in navy. */
  openingLines: [
    'Renaissance & Co. is a property investment advisory firm.',
    'Based in Hyderabad. Advising on residential property across the seas.',
  ],

  /**
   * Statement two — the two words, set as the client's reference layout (4 Aug):
   * stacked, right-aligned, each closed with a full stop.
   *
   * ⚠️ The words are the client's. The LOWERCASE and the full stops are a
   * LAYOUT choice taken from their reference image, not from their copy. One
   * edit here changes both.
   */
  headlineWords: ['conviction.', 'continuity.'],

  /** The plain-text form of the pair, used by the alternative layout. */
  headline: 'Conviction and continuity',

  /**
   * The sentence, split for the reveal. The WORD setting splits this further at
   * render; the CLAUSE setting reveals these units as written. The split lives
   * here, with the copy, so the rhythm and the words stay together.
   */
  clauses: [
    'Conviction shapes what we advise;',
    'continuity shapes what remains after the advice.',
    'Together, they balance judgement and patience,',
    'creating a relationship that is understood at the start',
    'and felt for years after.',
  ],

  /**
   * THE CLIENT'S FINAL SETTINGS, chosen in the lab 4–5 Aug 2026. Each is a
   * single value here, and the bench at /lab/hero drives these same variables —
   * so the lab and the live hero can never show different truths.
   */
  settings: {
    /** 'word' | 'clause' | 'whole' — how much resolves at a time. */
    variant: 'word' as const,
    /** 'panel' = their reference layout. 'editorial' = the first version. */
    layout: 'panel' as const,
    /** Face for the two big words: 'sans' | 'display' | 'editorial'. */
    face: 'sans' as const,
    /** How statement one becomes two: 'curtain' | 'sweep' | 'dissolve' | 'fade'. */
    transition: 'curtain' as const,
    /** How each word arrives: 'rise' | 'wipe' | 'blur' | 'weight'. */
    reveal: 'rise' as const,
    /** How much scrolling the hero occupies, in svh. */
    rail: 280,
    /** How far the reveal eases behind the scroll. 0 = locked to the scrollbar. */
    glide: 0.35,

    /**
     * THE PERSISTENT BUTTONS — ✅ LOCKED BY THE CLIENT, 6 Aug 2026:
     * **corners placement · arrow style · switch colour change · soft corners.**
     * Chosen in the lab against the measured readout; do not re-litigate.
     *
     * `true` puts them on the site — but a button still renders ONLY if it has
     * somewhere real to go: `heroActions.lead.href` is null until /our-work
     * ships, so today the homepage carries "Browse properties" alone, and
     * "Our work" appears by itself the moment its page exists. A dead link
     * cannot ship — that gate is structural, not procedural.
     */
    buttons: true,
    /** 'corners' | 'column' | 'edge' | 'top' — where the pair sits. LOCKED. */
    placement: 'corners' as const,
    /** 'plate' | 'veil' | 'outline' | 'text' | 'arrow' — what a button looks
     *  like. 'arrow' is the client's own reference (6 Aug): a bare label with a
     *  drawn arrow, the line growing into the full plate on hover. A bordered
     *  variant was built, then taken back out before the lock — the LOCKED look
     *  is borderless. LOCKED. */
    btnStyle: 'arrow' as const,
    /** 'snap' | 'follow' — how the colour changes as the ground crosses.
     *  LOCKED on snap ('Switch'): follow measures 1.0:1 mid-crossing. */
    swap: 'snap' as const,
    /** 'soft' | 'sharp' — corner treatment. LOCKED. */
    btnCorners: 'soft' as const,
  },
};

/** The sentence as one string — used by the word split and by screen readers. */
export const heroParagraph = heroContent.clauses.join(' ');
