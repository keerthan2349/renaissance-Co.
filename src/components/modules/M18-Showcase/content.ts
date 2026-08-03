// M18 · Showcase — the control room. Every setting a non-coder might want
// changed lives here; the component reads only this file.
//
// THE FILM: the client's clip (received 2 Aug 2026, 15.72MB master), compressed
// to 2.23MB WebM / 2.82MB MP4 at full 1080p — see ./encoding-notes.md. The
// master lives at assets-incoming/video/showcase-master.mp4 (git-ignored).
// The client has said this clip is interim and will be replaced with another
// landscape video; when it lands, re-encode per the notes and update nothing
// here unless the filenames change.
export const showcase = {
  /** WebM offered first (smaller); MP4 is the Safari/iPhone fallback. */
  webm: '/showcase/showcase.webm',
  mp4: '/showcase/showcase.mp4',
  /** Shown instantly while the film downloads, and instead of it under
      reduced motion. */
  poster: '/showcase/poster.jpg',

  /** MUST match the footage or object-fit:cover crops the edges away.
      The current film is exactly 16:9. (Framed layout only — the background
      layout fills the screen and cover-crops whatever it is given.) */
  ratio: '16 / 9',

  /** 'background' (client green light, 3 Aug 2026): the film waits
      full-screen UNDER the page — Call us scrolls away and reveals it, it
      holds, then the footer rides up over it. 'framed' is the previous look
      (centred rounded frame on a 420vh rail), kept for comparison in the lab.
      ⚠️ A 9:16 portrait film for phones is promised and gets wired in when it
      lands — until then the landscape film centre-crops on mobile (client's
      informed call, 3 Aug). */
  layout: 'background' as 'framed' | 'background',

  /** Background layout: how long the film holds the screen ALONE, after the
      reveal and before the footer rises, in screen-heights of scroll.
      150svh = 1.5 screens (client-approved 3 Aug). */
  hold: '150svh',

  /** Background layout: the caption line on the film — 'left' starts at the
      film's edge (client-approved 3 Aug); 'center' centres it. */
  captionAlign: 'left' as 'left' | 'center',

  /** Framed layout only: how much scroll the pinned stage holds for.
      More = slower, heavier. 420vh approved by the client 2 Aug. */
  rail: '420vh',

  // ── The words ─────────────────────────────────────────────────────────────
  // eyebrow/heading: DELIBERATELY EMPTY (client, 2 Aug 2026) — film only above.
  // caption: the client asked (3 Aug) for a small centred line UNDER the film,
  // animating in sync with it, with a visible TODO holding the spot until they
  // supply the words. It is loudly marked so it cannot pass as real copy.
  // ⚠️ DEPLOY GATE: this placeholder must be replaced (or emptied) before any
  // push to the live site — same class of blocker as the EXAMPLE projects.
  // Never invent the line; it is the client's to give.
  eyebrow: '',
  heading: '',
  caption: 'TODO — your line goes here',
};
