export type Venture = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  href: string;
  external?: boolean;
};

export const ventures: Venture[] = [
  {
    id: "lumina",
    name: "Lumina Media",
    category: "Production",
    tagline: "Visual storytelling elevated.",
    description:
      "Editorial campaigns, brand films, and image direction for founders, funds, and institutions.",
    href: "/lumina"
  },
  {
    id: "network",
    name: "Wesley Insider Network",
    category: "Membership",
    tagline: "Connections that create opportunity.",
    description:
      "A private multi-state membership for operators, owners, and capital allocators.",
    href: "/network"
  },
  {
    id: "insider",
    name: "Wesley Insider",
    category: "Editorial",
    tagline: "Sixty plus articles every day.",
    description:
      "Entrepreneurship. Personal branding. Money and wealth. Faith. Intelligence published daily.",
    href: "https://wesleyinsider.com",
    external: true
  }
];
