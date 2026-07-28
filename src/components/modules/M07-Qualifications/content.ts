// M07 · The qualifications (blueprint §7.7, REDUCED under the no-CA policy).
//
// THE POLICY THIS OBEYS (vault/website/no-ca-figures-policy.md, 28 Jul 2026):
// there is no CA and there will not be one, so we publish the fewest figures
// that still make the section useful and skip anything we cannot source. This
// section therefore differs from the blueprint's original §7.7 draft:
//
//   ✅ KEPT   AED 2 million golden-visa threshold — verified 28 Jul 2026 against
//             FOUR official UAE government sources (Dubai Land Department, GDRFA,
//             the federal ICP, and the u.ae government portal). Full quotes and
//             URLs in vault/website/golden-visa-verified.md.
//   ✅ KEPT   "The UAE levies no personal income tax" — an officially published
//             fact about a foreign government's own regime, not tax advice.
//   ❌ CUT    Any claim about INDIAN tax. The section names the question and
//             sends the reader to their own accountant. That framing needs no
//             sign-off precisely because it gives no advice.
//   ❌ CUT    The residency duration in years, and any mortgage rule. The UAE
//             authorities themselves publish different answers (GDRFA and DLD
//             say 10 years, the federal ICP says 5; GDRFA accepts mortgaged
//             property, ICP says "without loans"). We state neither.
//   ❌ CUT    The rupee conversion. AED is pegged to the dollar, so a ₹ figure
//             drifts with USD/INR and would go stale on the page. AED only —
//             it never needs correcting. (Client's instruction: do what won't
//             cause problems later.)
//
// The lien point is the one nobody else publishes and it is sourced: GDRFA
// states a lien is placed to "ensure the continuity of ownership throughout the
// validity of the Golden Residency."
export const qualificationsContent = {
  eyebrow: 'Qualifications',
  heading: 'The parts that get left out',
  points: [
    {
      // Typographic quotes, not straight ones — the rest of the site's prose uses
      // proper curly punctuation and a serif shows the difference plainly.
      label: '“Tax-free.”',
      text: 'The UAE levies no personal income tax. That is true, and it is where most people stop telling you things. It says nothing about what you owe in India — that turns on your own residency and circumstances, and it is a question for your accountant. We are not tax advisors.',
    },
    {
      label: 'The golden visa.',
      text: 'It starts at AED 2 million of property, which may be one unit or several combined. That is not entry-level pricing, and anyone implying otherwise is being careless with your expectations.',
    },
    {
      label: 'And the part that gets left out.',
      text: 'A lien is placed on the property to hold the ownership in place for as long as the residency runs — it is not bought and flipped. How long that residency lasts, and whether a mortgaged property counts, are stated differently by different UAE authorities. We will not give you one confident answer on those, and we would be careful with anyone who does.',
    },
  ],
  // Rendered on the page. The whole point of the section is that it can be checked.
  source:
    'AED 2 million threshold per the Dubai Land Department, the General Directorate of Residency and Foreigners Affairs, and the Federal Authority for Identity, Citizenship, Customs and Port Security. Verified July 2026.',
};
