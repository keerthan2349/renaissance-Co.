// site.ts — THE CONTROL ROOM.
// Site-wide settings a non-coder should be able to change without touching
// components. When a real value is unknown, it stays `null` and the site shows
// a clear placeholder instead of inventing one (CLAUDE.md: never invent).
//
// A plain-language mirror of this lives in the vault:
// vault/website/customizations.md — edit there in words, I apply it here.

export const site = {
  name: 'Renaissance & Co. Investments',
  shortName: 'Renaissance & Co.',
  tagline: 'Dubai property. Advised, not sold.',

  // Founder (§13). The face of the brand; used for attribution in the founder
  // module (Wave 2). Not shown anywhere in Wave 1 yet.
  founderName: 'Ram Charan Rao' as string | null,

  contact: {
    // Business phone. `phone` is the dial string (tel:), `phoneDisplay` is what
    // the visitor reads. CONFIRMED by the client (28 Jul 2026) as the firm's
    // official, permanent number — this is not a placeholder and is not changing.
    phone: '+919059062636' as string | null,
    phoneDisplay: '+91 90590 62636' as string | null,

    // WhatsApp Business number, international format, DIGITS ONLY (for wa.me).
    whatsapp: '919059062636' as string | null,

    // Shown to visitors. The founder takes leads directly at first (brand §1),
    // so this is a real commitment — soften here if it should read differently.
    hours: 'Available 24/7',

    // Business email. CONFIRMED by the client (28 Jul 2026) as the firm's
    // official address — not a placeholder, and staying as-is even once a
    // domain exists. Do not flag it as one again.
    email: 'renaissanceandco.investments@gmail.com' as string | null,

    // ---------------------------------------------------------------------
    // INSTAGRAM — real account, confirmed by the client 28 Jul 2026.
    // `instagramHandle` is the single source of truth; the URL is built from it,
    // so there is only ever one place to change.
    // Set the handle to null and every Instagram link disappears from the site
    // cleanly — same behaviour as an unset phone number.
    instagramHandle: 'renaissanceandco.investments' as string | null,
    instagramUrl: 'https://www.instagram.com/renaissanceandco.investments/' as string | null,
    // What visitors READ. The client's call (28 Jul): the word "Instagram",
    // not the @handle — quieter, and the phone stays the conversion. Change this
    // one line to show the handle instead.
    instagramLabel: 'Instagram',
  },

  // The partner line (§7.10). Bellavierre is a partner, not our company (§3).
  partner: {
    line: 'Renaissance & Co. Investments is the exclusive India partner of Bellavierre, Dubai. UAE transactions are completed through Bellavierre.',
  },

  // ── THE HEADER'S SINGLE CONTACT BUTTON (client's settings, 11 Aug 2026,
  // chosen at /lab/contact-button/) ──────────────────────────────────────
  // It REPLACES the header's Instagram, WhatsApp and phone buttons on every
  // page. `enabled: false` brings all three straight back and removes this
  // button — the whole change is one word, which is the revert path.
  //
  // ⚠️ The phone was the header's conversion from Wave 1 until now. All four
  // channels still live in the contact section, and this button's job is to
  // take people there. Their explicit call.
  headerCta: {
    enabled: true,

    // Set in normal case; the button uppercases it in CSS, as the rest of the
    // site's small labels do. Their words, 11 Aug: "BEGIN A CONVERSATION".
    label: 'Begin a conversation',

    // How the page travels to the contact section when the section is ON THIS
    // page (the homepage and /judgment). Their numbers: settle · 2400ms.
    //   settle  — the site's own curve family: fast away, settling into the end
    //   glide   — eases in and out
    //   browser — the browser's native smooth scroll (sets its own speed)
    scrollMs: 2400,
    scrollEase: 'settle' as 'settle' | 'glide' | 'browser',

    // ⚠️ ON A PAGE WITH NO CONTACT SECTION (every property page, the shelf,
    // the legal pages) THERE IS NO SCROLL AT ALL — the button is a real link
    // to `/#contact`, so the site's own page transition cross-fades and the
    // browser lands directly on the section. Their instruction, 11 Aug:
    // "no scroll animation, simply redirect with seamless fade to contact us
    // section of main page." Nothing needs configuring for it; it is what an
    // honest <a href> does, which is why the button was built as one.
  },
} as const;
