# figures/ — every number on the site

One JSON file per figure. The build **fails** if any figure is missing a `source` (a URL) or a `verifiedOn` date — that is the honesty rule (§10) enforced by the schema in `src/content.config.ts`.

There are no figures yet — Wave 1 (hero, contact, legal, footer) contains no numbers. The market counters arrive with M02, and each must be re-verified against brand-foundation §11 the morning it publishes.

Example (`dubai-h1-2026-sales.json`):

```json
{
  "value": "AED 286.4bn",
  "label": "Dubai property sales, H1 2026",
  "source": "https://example.com/verified-source",
  "verifiedOn": "2026-07-23",
  "note": "Roughly 12% below H1 2025."
}
```
