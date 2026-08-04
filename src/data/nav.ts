// nav.ts — the site's page navigation. ORDER IS DATA, like page-order.ts.
//
// TWO lists, deliberately, since 28 Jul 2026: the header and the footer no
// longer carry the same links.
//
// /properties appears ONLY when there are properties — while the list is empty
// that page is not generated at all, and linking to it would be a 404.
import { projects } from '@/data/projects';

type Link = { label: string; href: string };

// "Properties", never "Projects", in anything the client's clients see
// (client, 3 Aug 2026) — and since 4 Aug the address says it too.
const projectsLink: Link[] = projects.length > 0 ? [{ label: 'Properties', href: '/properties' }] : [];

/**
 * HEADER — top-level destinations only.
 * The header carried no navigation at all until 28 Jul 2026 (§4.3: none until
 * there is somewhere to navigate).
 */
export const headerLinks: Link[] = [...projectsLink];

/**
 * FOOTER — everything the header carries, plus the quieter pages.
 *
 * 'Judgment' is deliberately FOOTER-ONLY (client, 28 Jul). It is the walk-away
 * story, reached at the end of a visit rather than offered as a destination at
 * the top. Note the trade-off already recorded in the vault: this page lost its
 * homepage placement to the projects carousel, and is now one step further from
 * the reader again — it is reachable only from the bottom of a page.
 */
export const footerLinks: Link[] = [...projectsLink, { label: 'Judgment', href: '/judgment' }];
