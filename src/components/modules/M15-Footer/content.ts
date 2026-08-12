/**
 * M15 · Footer — its words.
 *
 * Architecture rule 1: content never lives in a component. The closing line
 * had been written into `Footer.astro`, which is the one thing that stops a
 * module being reusable. Moved out 12 Aug 2026 on the client's instruction
 * that every module be reusable. **Nothing rendered changed.**
 *
 * ⚠️ The partner line, the firm's name, the legal pages and the footer's own
 * link list are NOT here. They are site-wide facts used in more than one
 * place and stay in `src/data/site.ts`, `src/data/legal.ts` and
 * `src/data/nav.ts`. Copy belongs to the module; facts belong to the site.
 */

export const footerContent = {
  /**
   * The closing line, after the © and the firm's name.
   *
   * ⚠️ THIS IS PART OF THE HONESTY LAYER, NOT DECORATION (blueprint §4.6, §10):
   * it states that figures are indicative and dated and that nothing on the
   * site is a return promise, and it points at the disclaimer — the page where
   * the material protecting the firm lives. Reword it if the client wants, but
   * it may not simply be dropped, and it may never imply a registered or
   * licensed status while registration is in progress.
   */
  meta: 'Figures are indicative and dated; nothing here is a return promise. See the',
  metaLinkLabel: 'disclaimer',
  metaLinkHref: '/disclaimer',
};
