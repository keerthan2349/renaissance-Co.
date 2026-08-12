/**
 * M09 · Contact — its words.
 *
 * Architecture rule 1: content never lives in a component. These two strings
 * had been sitting in `Contact.astro`, which is the one thing that stops a
 * module being reusable — dropping it into another page or project meant
 * editing the component. Moved out 12 Aug 2026 on the client's instruction
 * that every module be reusable. **Nothing rendered changed.**
 *
 * ⚠️ The channels themselves (phone · WhatsApp · email · Instagram · hours)
 * are NOT here. They are firm-wide facts used in several places, so they stay
 * in `src/data/site.ts` — the one control room — and this module reads them
 * from there. Copy belongs to the module; facts belong to the site.
 */

export const contactContent = {
  eyebrow: 'Contact',

  /**
   * The section's heading, and the client's own line (blueprint §7.9). It IS
   * the heading — "Call us" no longer appears as a visible title (their pick,
   * 3 Aug 2026, "The Invitation" layout).
   *
   * The break is deliberate and part of the layout, not punctuation: the line
   * is set in the editorial serif at display size and wraps here on purpose.
   * Give it as two parts so a different line can choose its own break, or one
   * part and no break.
   */
  line: ['We would rather talk', 'than exchange forms.'] as const,
};
