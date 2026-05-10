import type { Metadata } from "next";
import {
  VentureCTA,
  VentureCapabilities,
  VentureCollagePanel,
  VentureHero,
  VentureManifesto,
  VenturePageShell
} from "@/components/ventures/VenturePageSystem";

export const metadata: Metadata = {
  title: "Creative Community",
  description:
    "A community for creators, photographers, videographers, podcasters, designers, and creative entrepreneurs."
};

const cta = {
  label: "Enter Creative Community",
  href: "mailto:creative@wesleyjoseph.co"
};

const creativeVisual = {
  src: "/ventures/creative-community.png",
  alt: "Black and white production studio with cameras, podcast microphones, editing monitors, and creators collaborating.",
  position: "62% center"
};

const capabilities = [
  {
    title: "Connect",
    icon: "community" as const,
    body: "Meet and collaborate with like-minded creatives worldwide."
  },
  {
    title: "Resources",
    icon: "resource" as const,
    body: "Access tools, guides, discounts, and creative business resources."
  },
  {
    title: "Education",
    icon: "education" as const,
    body: "Learn from industry experts through workshops and content."
  },
  {
    title: "Visibility",
    icon: "visibility" as const,
    body: "Showcase your work and grow your personal brand and audience."
  },
  {
    title: "Opportunity",
    icon: "lightning" as const,
    body: "Find gigs, projects, collaborations, and career opportunities."
  }
];

const collageVisuals = [
  {
    src: "/ventures/creative-community.png",
    alt: "Creator studio with cameras and collaborative production energy.",
    position: "27% center"
  },
  {
    src: "/ventures/lumina-media.png",
    alt: "Cinema camera and founder production set.",
    position: "44% center"
  },
  {
    src: "/ventures/wesley-insider-editorial.png",
    alt: "Editorial desk with laptop and atmospheric media intelligence scene.",
    position: "64% center"
  },
  {
    src: "/ventures/wesley-insider-network.png",
    alt: "Business network lights and connection systems.",
    position: "70% center"
  }
];

export default function CreativeCommunityPage() {
  return (
    <VenturePageShell title="Creative Community">
      <VentureHero
        index="04"
        name="Creative Community"
        kicker="Creators. Collaboration. Opportunity."
        positioning="A community for creators, photographers, videographers, podcasters, designers, and creative entrepreneurs."
        cta={cta}
        visual={creativeVisual}
      />
      <VentureManifesto
        label="Our Purpose"
        statement="We build each other. We create the future."
        body="Creative Community connects ambitious creatives with resources, collaboration, visibility, education, and opportunity."
        visual={{ ...creativeVisual, position: "50% bottom" }}
        centered
      />
      <VentureCapabilities label="What you get" items={capabilities} />
      <VentureCollagePanel
        label="A community of creators"
        headline="Different crafts. Same vision."
        visuals={collageVisuals}
      />
      <VentureCTA
        kicker="Ready to join?"
        line="Create. Connect. Elevate. This is your community."
        cta={cta}
      />
    </VenturePageShell>
  );
}
