import type { Metadata } from "next";
import { VenturesScene } from "@/components/ventures/VenturesScene";

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "The three ventures of Wesley Joseph: Lumina Media, Wesley Insider Network, and Wesley Insider."
};

export default function VenturesPage() {
  return <VenturesScene />;
}
