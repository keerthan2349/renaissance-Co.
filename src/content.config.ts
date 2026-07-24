// content.config.ts — the schema that enforces honesty (§4.5 / §10).
// Every number on the site lives in src/content/figures/ as a JSON file, and
// the schema REQUIRES a source URL and a verified date. A figure without them
// fails the build. §11 goes stale fast and must be re-verified before public
// use — this turns that instruction into something the codebase enforces.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const figures = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/figures' }),
  schema: z.object({
    value: z.string(), // e.g. 'AED 286.4bn' — a string, so it renders exactly as verified
    label: z.string(), // what the number is
    source: z.string().url(), // required — where it was verified
    verifiedOn: z.coerce.date(), // required — when it was verified
    note: z.string().optional(),
  }),
});

export const collections = { figures };
