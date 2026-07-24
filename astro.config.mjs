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
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'te', 'hi'],
    routing: { prefixDefaultLocale: false },
  },
  build: { inlineStylesheets: 'auto' },
});
