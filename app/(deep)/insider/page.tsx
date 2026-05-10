import type { Metadata } from "next";
import {
  VentureCTA,
  VentureCapabilities,
  VentureHero,
  VentureManifesto,
  VenturePageShell,
  VentureVisualPanel
} from "@/components/ventures/VenturePageSystem";

export const metadata: Metadata = {
  title: "Wesley Insider",
  description:
    "Independent editorial for entrepreneurs, decision makers, money, wealth, personal branding, and faith."
};

const cta = {
  label: "Read Wesley Insider",
  href: "https://wesleyinsider.com",
  external: true
};

const capabilities = [
  {
    title: "Daily editorial",
    icon: "editorial" as const,
    body: "Timely coverage on business, markets, and modern culture."
  },
  {
    title: "Founder intelligence",
    icon: "intelligence" as const,
    body: "Insights and lessons from top founders and operators."
  },
  {
    title: "Wealth and money insights",
    icon: "wealth" as const,
    body: "Breakdowns of wealth building, investments, and financial strategy."
  },
  {
    title: "Personal branding",
    icon: "brand" as const,
    body: "Strategies to build influence, authority, and impact."
  },
  {
    title: "Faith and leadership",
    icon: "faith" as const,
    body: "Faith-driven perspective on leadership, purpose, and calling."
  }
];

export default function InsiderPage() {
  return (
    <VenturePageShell title="Wesley Insider">
      <VentureHero
        index="03"
        name="Wesley Insider"
        positioning="Independent editorial for entrepreneurs, decision makers, money, wealth, personal branding, and faith."
        cta={cta}
        visual={{
          src: "/ventures/wesley-insider-editorial.png",
          alt: "Black and white editorial desk with city lights, laptop, notebook, and atmospheric media scene."
        }}
      />
      <VentureManifesto
        statement="We publish what matters. Clear thinking for a world that moves fast."
        visual={{
          src: "/ventures/wesley-insider-editorial.png",
          alt: "Black and white editorial layouts and media intelligence atmosphere."
        }}
      />
      <VentureCapabilities label="What we cover" items={capabilities} />
      <VentureVisualPanel
        visual={{
          src: "/ventures/wesley-insider-editorial.png",
          alt: "Cinematic black and white editorial workspace with laptop and city light."
        }}
        headline="Intelligence that builds influence."
        body="Real stories. Real people. Real impact."
        cta={{ label: "Explore articles", href: "https://wesleyinsider.com", external: true }}
      />
      <VentureCTA
        kicker="Stay informed. Stay ahead."
        line="Read Wesley Insider."
        cta={{ label: "Visit wesleyinsider.com", href: "https://wesleyinsider.com", external: true }}
      />
    </VenturePageShell>
  );
}
