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
    // the visitor reads. NOTE: this is a personal mobile; once published it is
    // scraped/called permanently (§9). Swap here if a dedicated business line
    // is set up later — no other file needs to change.
    phone: '+919059062636' as string | null,
    phoneDisplay: '+91 90590 62636' as string | null,

    // WhatsApp Business number, international format, DIGITS ONLY (for wa.me).
    whatsapp: '919059062636' as string | null,

    // Shown to visitors. The founder takes leads directly at first (brand §1),
    // so this is a real commitment — soften here if it should read differently.
    hours: 'Available 24/7',

    // Business email. NOTE: a gmail address reads below the firm's positioning
    // (§4 voice). Move to an address on the firm's own domain once it's fixed (§9).
    email: 'renaissanceandco.investments@gmail.com' as string | null,
  },

  // The partner line (§7.10). Bellavierre is a partner, not our company (§3).
  partner: {
    line: 'Renaissance & Co. Investments is the exclusive India partner of Bellavierre, Dubai. UAE transactions are completed through Bellavierre.',
  },
} as const;
