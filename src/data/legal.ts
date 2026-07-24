// legal.ts — the formality layer (§4.6). Reserved now, filled later.
// Registration is in progress; no numbers exist yet. Leave these commented
// until real values exist. LegalBlock renders nothing while the array is empty,
// and nothing on the site may imply a registered/licensed status (§2).

export const registrations: { label: string; value: string }[] = [
  // { label: 'CIN',              value: '' },
  // { label: 'GSTIN',            value: '' },
  // { label: 'RERA / Trakheesi', value: '' },
];

export const legalPages = [
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Terms of use', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
];
