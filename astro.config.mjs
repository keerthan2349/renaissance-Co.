// @ts-check
import { defineConfig } from 'astro/config';

// Static output — no adapter needed. Any static host serves dist/ directly
// (deploying to Vercel now; also works on Cloudflare Pages, Netlify, etc.).
// i18n routing is scaffolded now (§3, M13); English ships first, Telugu/Hindi are translation work later.
export default defineConfig({
  // TODO: set to the LIVE URL. After the first Vercel deploy, change this to the
  // vercel.app URL (then the real domain) so canonical + link-preview URLs resolve.
  site: 'https://renaissance-and-co.example',
  output: 'static',
  // THE OLD ADDRESSES, KEPT ALIVE (client decision, 4 Aug 2026: /projects →
  // /properties). Anything shared or bookmarked before the rename still lands on
  // the right page. In a static build Astro emits a small redirect page at each
  // old address, so this works on the local preview and on any host — it does
  // not depend on Vercel. DO NOT DELETE: removing it silently 404s every old
  // link, and there is no way to know who holds one.
  redirects: {
    '/projects': '/properties',
    '/projects/[...slug]': '/properties/[...slug]',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'te', 'hi'],
    routing: { prefixDefaultLocale: false },
  },
  build: { inlineStylesheets: 'auto' },
});
