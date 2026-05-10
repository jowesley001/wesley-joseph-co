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
  title: "Wesley Insider Network",
  description:
    "A private multi-state business membership for operators, owners, and capital allocators."
};

const cta = {
  label: "Apply to the network",
  href: "mailto:network@wesleyjoseph.co"
};

const capabilities = [
  {
    title: "Private events",
    icon: "event" as const,
    body: "Exclusive events in key cities with high-level founders and investors."
  },
  {
    title: "Founder connections",
    icon: "connection" as const,
    body: "Meaningful introductions to operators, investors, and industry leaders."
  },
  {
    title: "Business opportunities",
    icon: "opportunity" as const,
    body: "Curated opportunities across industries and markets."
  },
  {
    title: "Strategic introductions",
    icon: "intro" as const,
    body: "We connect you to the right people at the right time."
  },
  {
    title: "Member resources",
    icon: "resource" as const,
    body: "Tools, templates, and resources to help you scale and lead."
  }
];

export default function NetworkPage() {
  return (
    <VenturePageShell title="Wesley Insider Network">
      <VentureHero
        index="02"
        name="Wesley Insider Network"
        positioning="A private multi-state business membership for operators, owners, and capital allocators."
        cta={cta}
        visual={{
          src: "/ventures/wesley-insider-network.png",
          alt: "Black and white map of city lights and network connection lines."
        }}
      />
      <VentureManifesto
        statement="Access changes everything. We connect exceptional people to exceptional opportunities."
        visual={{
          src: "/ventures/wesley-insider-network.png",
          alt: "Private business network atmosphere with city lights and connection arcs."
        }}
      />
      <VentureCapabilities label="What we provide" items={capabilities} />
      <VentureVisualPanel
        visual={{
          src: "/ventures/wesley-insider-network.png",
          alt: "Cinematic black and white network system over city lights."
        }}
        headline="A global network built on trust."
        body="Different backgrounds. Same standard."
        cta={{ label: "Learn more", href: "/ventures" }}
      />
      <VentureCTA
        kicker="Ready to join the inner circle?"
        line="Apply to the network."
        cta={cta}
      />
    </VenturePageShell>
  );
}
