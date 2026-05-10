import type { Metadata } from "next";
import { VenturesScene } from "@/components/ventures/VenturesScene";

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "The four ventures of Wesley Joseph: Lumina Media, Wesley Insider Network, Wesley Insider, and Creative Community."
};

export default function VenturesPage() {
  return <VenturesScene />;
}
