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
  },
};

/** The sentence as one string — used by the word split and by screen readers. */
export const heroParagraph = heroContent.clauses.join(' ');
