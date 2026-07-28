// M06 · Off-plan copy (blueprint §7.6). The substance nobody else publishes:
// what actually protects the buyer, then what actually goes wrong — stated by
// the firm that sells the thing. The risk list is the point of the section.
//
// NOTHING HERE IS INVENTED. Every fact is stable regulatory mechanics carried
// verbatim from §7.6:
//   · "Law No. 8 of 2007" — the UAE escrow law. Stable, not a market stat.
//   · "Oqood" — the interim off-plan registration. Stable.
//   · "around 10% down" — a prose-stated stable entry mechanic, same class as the
//     founder's "approximately AED 70M". NOT a volatile market figure, so it does
//     not belong in content/figures/ (that schema exists for the counters that were
//     cut with M02, which need a source URL + verified date).
// No price, no yield, no return, no appreciation claim, and never "guaranteed" (§10).
//
// The closing risk line ("a correction reaches first ... doing so now") is a claim
// about the current market with no figure behind it. Kept because it is approved
// §7.6 copy, it is stated AGAINST the firm's own interest, and the live hero
// already says "Dubai is correcting" — the two lines are one position and would
// change together. Flagged in vault/website/wave-3-build-plan.md.
export const offPlanContent = {
  eyebrow: 'Off-plan',
  heading: 'The protections, and the risks',
  paras: [
    'Your payments sit in independent escrow under Law No. 8 of 2007, and the developer can only draw against them at verified construction milestones. Oqood registration protects your ownership during construction. Entry starts from around 10% down, on interest-free developer payment plans, priced below ready property.',
  ],
  // The hinge. One word, then the section turns on itself.
  hinge: 'And:',
  risks: [
    'Handover dates move. Build the delay into your plan.',
    'What is delivered does not always match what was rendered.',
    'If rent is meant to cover instalments, budget for a vacancy gap.',
    'Off-plan is the segment a correction reaches first. It is doing so now.',
  ],
};
