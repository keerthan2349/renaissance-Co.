// LAB · the reworked hero — copy only. Every word here is the CLIENT'S, supplied
// 4 Aug 2026, verbatim. Nothing may be added to it or rephrased.
//
// Two statements, in scroll order:
//   1. what the firm is        — reveals on load, the way the hero always has
//   2. conviction & continuity — resolves as the ground shifts navy → navy
//
// ⚠️ NOTE FOR THE PROMOTION DECISION: statement 1 REPLACES the live hero
// ("Dubai is correcting. Most people selling it to you won't say so."), which is
// blueprint §7.1 Option A and was chosen deliberately — it is the only place the
// site names the correction in the first screen. If this ships, that position
// needs somewhere else to live, or it leaves the site. The client's call, and it
// must be a conscious one.

export const heroScrollContent = {
  /** Statement one — the opening. Each line reveals in sequence. */
  openingLines: [
    'Renaissance & Co. is a property investment advisory firm.',
    'Based in Hyderabad. Advising on residential property across the seas.',
  ],

  /** Statement two — the headline the scroll resolves. */
  headline: 'Conviction and continuity',

  /**
   * The same two words, set as the reference layout the client sent on 4 Aug
   * (two big words stacked and right-aligned, each closed with a full stop).
   *
   * ⚠️ The words are the client's. The LOWERCASE and the full stops are a
   * layout choice taken from their reference image, not from their copy — one
   * edit here changes both, and nothing else needs touching.
   */
  headlineWords: ['conviction.', 'continuity.'],

  /**
   * The paragraph, split for the reveal. The WORD variant splits this further at
   * render; the CLAUSE variant reveals these units as written. Keeping the split
   * here (not in the component) means the copy and its rhythm stay together.
   */
  clauses: [
    'Conviction shapes what we advise;',
    'continuity shapes what remains after the advice.',
    'Together, they balance judgement and patience,',
    'creating a relationship that is understood at the start',
    'and felt for years after.',
  ],
};

/** The paragraph as one string — for the word split, and for screen readers. */
export const heroScrollParagraph = heroScrollContent.clauses.join(' ');
