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
      The current film is exactly 16:9. */
  ratio: '16 / 9',

  /** How much scroll the pinned stage holds for. More = slower, heavier.
      420vh approved by the client 2 Aug ("time spent in this section is
      perfect"). */
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
