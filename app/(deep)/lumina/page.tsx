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
  title: "Lumina Media",
  description:
    "Photo, video, and podcast production for founders, brands, and modern creators."
};

const cta = {
  label: "Start a Lumina project",
  href: "mailto:lumina@wesleyjoseph.co"
};

const capabilities = [
  {
    title: "Photography",
    icon: "camera" as const,
    body: "Cinematic photography that captures your story with intention."
  },
  {
    title: "Video production",
    icon: "video" as const,
    body: "High-end video production built for founders and modern brands."
  },
  {
    title: "Podcast production",
    icon: "podcast" as const,
    body: "Podcast production that sounds incredible and looks iconic."
  },
  {
    title: "Short-form clips",
    icon: "clips" as const,
    body: "Viral-ready clips that extend your reach and grow your audience."
  },
  {
    title: "Founder media kits",
    icon: "kit" as const,
    body: "Strategic media kits that position you for bigger opportunities."
  }
];

const visual = {
  src: "/ventures/lumina-media.png",
  alt: "Black and white cinema camera on a production set with studio lighting.",
  position: "62% center"
};

export default function LuminaPage() {
  return (
    <VenturePageShell title="Lumina Media">
      <VentureHero
        index="01"
        name="Lumina Media"
        positioning="Photo, video, and podcast production for founders, brands, and modern creators."
        cta={cta}
        visual={visual}
      />
      <VentureManifesto
        statement="We create visual stories that build influence, inspire trust, and stand the test of time."
        visual={{ ...visual, position: "50% center" }}
      />
      <VentureCapabilities label="What we do" items={capabilities} />
      <VentureVisualPanel
        visual={{ ...visual, position: "58% center" }}
        headline="Visuals that move culture."
        body="From concept to final cut, we handle every detail."
        cta={{ label: "Watch showreel", href: "mailto:lumina@wesleyjoseph.co" }}
      />
      <VentureCTA
        kicker="Ready to create something iconic?"
        line="Let's build your story."
        cta={cta}
      />
    </VenturePageShell>
  );
}
