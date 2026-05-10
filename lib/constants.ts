export const SITE = {
  name: "Wesley Joseph",
  shortName: "WJ",
  tagline: "Financial intelligence. Media power. Cultural influence.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wesleyjoseph.co",
  description:
    "Wesley Joseph is a holding company and media ecosystem operating at the intersection of media, markets, entrepreneurship, and culture.",
  ogImage: "/og.png"
} as const;

export type NavLink = { label: string; href: string; external?: boolean };

export const NAV_LINKS: NavLink[] = [
  { label: "Ventures", href: "/ventures" },
  { label: "Insider", href: "/insider" },
  { label: "Network", href: "/network" },
  { label: "Lumina", href: "/lumina" }
];

export const FOOTER_LINKS = {
  ventures: [
    { label: "Lumina Media", href: "/lumina" },
    { label: "Wesley Insider Network", href: "/network" },
    { label: "Wesley Insider", href: "/insider" }
  ],
  company: [
    { label: "All Ventures", href: "/ventures" },
    { label: "Sign In", href: "/login" },
    { label: "Contact", href: "mailto:hello@wesleyjoseph.co" }
  ]
} as const;

export const INTRO_STORAGE_KEY = "wjc:intro:v1:seen";
// Cinematic eclipse welcome sequence runs for ~3.8s before transitioning
// into the orbital homepage. Total user-visible duration with the 1.0s
// cross-fade lands at ~4.6s, within the 3-5s spec.
export const INTRO_DURATION_MS = 3800;

export const ORBIT_LABELS = [
  "Media",
  "Wealth",
  "Influence",
  "Intelligence",
  "Capital",
  "Culture"
] as const;
