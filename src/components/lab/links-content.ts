// LAB · the link-in-bio page ("LinkStack") — its destinations.
//
// WHY THIS FILE EXISTS RATHER THAN THE LINKSTACK APP: LinkStack 4.8.6 is a PHP 8
// / Laravel 9 application with its own database. This site is a static Astro
// build served by Vercel, which runs no PHP — so LinkStack cannot live inside
// the website. It could only ever be a separate install on its own host that we
// link out to. This page is the same job done natively: one page, no second
// system, no login screen to secure, and the site's own brand.
//
// ⚠️ NOTHING HERE IS INVENTED. Every destination is either a channel already in
// src/data/site.ts (so clearing it there removes the row here too) or a page
// this site already builds. No handle, no address and no destination has been
// guessed — the rule that governs the rest of the site governs this.
//
// Every row carries its M17 `track` hook from birth (standing rule): a new
// conversion point gets one when it is built, never retrofitted.
import { site } from '@/data/site';
import { projects } from '@/data/projects';

export type LinkRow = {
  /** What the visitor reads. */
  label: string;
  /** The quiet line beneath it. Optional. */
  note?: string;
  href: string;
  /** Icon from the existing set, or none. */
  icon?: 'phone' | 'whatsapp' | 'mail' | 'instagram';
  /** M17 hook. Omitted for internal pages, which ViewContent already covers. */
  track?: string;
  /** Leaves the site. */
  external?: boolean;
  /** The one row that gets weight — the conversion. */
  primary?: boolean;
};

const c = site.contact;

export const linksContent = {
  /** The page's own words. Kept short: this is read on a phone, standing up. */
  intro: 'Dubai property. Advised, not sold.',
  /** Hours are a real promise already made on the site — repeated, not invented. */
  hours: c.hours,

  rows: [
    c.phone && {
      label: 'Call us',
      note: c.phoneDisplay ?? undefined,
      href: `tel:${c.phone}`,
      icon: 'phone' as const,
      track: 'call',
      primary: true,
    },
    c.whatsapp && {
      label: 'WhatsApp',
      note: 'Message us any time',
      href: `https://wa.me/${c.whatsapp}`,
      icon: 'whatsapp' as const,
      track: 'whatsapp',
      external: true,
    },
    // Only offered while there are properties — the same guarantee the nav gives,
    // so this can never point at a page that does not exist.
    projects.length > 0 && {
      label: 'The properties',
      note: 'What is on the shelf, and why',
      href: '/properties',
    },
    {
      label: 'The last time we said no',
      note: 'A deal we walked away from',
      href: '/judgment',
    },
    c.instagramUrl && {
      label: c.instagramLabel ?? 'Instagram',
      href: c.instagramUrl,
      icon: 'instagram' as const,
      track: 'instagram',
      external: true,
    },
    c.email && {
      label: 'Email',
      note: c.email,
      href: `mailto:${c.email}`,
      icon: 'mail' as const,
      track: 'email',
    },
  ].filter(Boolean) as LinkRow[],
};
