export const SITE = {
  name: "Wesley Joseph Co.",
  shortName: "WJC",
  tagline: "Financial intelligence. Media power. Cultural influence.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wesleyjoseph.co",
  description:
    "Wesley Joseph Co. is a holding company and media ecosystem operating at the intersection of media, markets, entrepreneurship, and culture.",
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
export const INTRO_DURATION_MS = 4400;

export const ORBIT_LABELS = [
  "Media",
  "Intelligence",
  "Production",
  "Community",
  "Wealth",
  "Influence"
] as const;
