import type { Metadata } from "next";
import { VentureReplicaPage } from "@/components/ventures/VenturePageSystem";

export const metadata: Metadata = {
  title: "Wesley Insider Network",
  description:
    "A private multi-state business membership for operators, owners, and capital allocators."
};

const links = [
  {
    label: "Wesley Joseph Co.",
    href: "/",
    rect: { left: 5.3, top: 5.3, width: 23, height: 2.5 }
  },
  {
    label: "Ventures",
    href: "/ventures",
    rect: { left: 51.5, top: 5.3, width: 8.5, height: 2.5 }
  },
  {
    label: "About",
    href: "/",
    rect: { left: 63.5, top: 5.3, width: 7, height: 2.5 }
  },
  {
    label: "Journal",
    href: "/insider",
    rect: { left: 74.2, top: 5.3, width: 8, height: 2.5 }
  },
  {
    label: "Contact",
    href: "mailto:hello@wesleyjoseph.co",
    rect: { left: 85.5, top: 5.3, width: 8.5, height: 2.5 }
  },
  {
    label: "Apply to the network",
    href: "mailto:network@wesleyjoseph.co",
    rect: { left: 7.3, top: 31, width: 32, height: 3.2 }
  },
  {
    label: "Learn more",
    href: "/ventures",
    rect: { left: 7.3, top: 78.1, width: 18, height: 3 }
  },
  {
    label: "Apply now",
    href: "mailto:network@wesleyjoseph.co",
    rect: { left: 36, top: 90, width: 28, height: 4 }
  },
  {
    label: "Wesley Joseph Co.",
    href: "/",
    rect: { left: 5.3, top: 96.2, width: 23, height: 2.5 }
  },
  {
    label: "Footer ventures",
    href: "/ventures",
    rect: { left: 54.5, top: 96.2, width: 8.2, height: 2.4 }
  },
  {
    label: "Footer about",
    href: "/",
    rect: { left: 65, top: 96.2, width: 6.8, height: 2.4 }
  },
  {
    label: "Footer journal",
    href: "/insider",
    rect: { left: 75.3, top: 96.2, width: 7.8, height: 2.4 }
  },
  {
    label: "Footer contact",
    href: "mailto:hello@wesleyjoseph.co",
    rect: { left: 86.2, top: 96.2, width: 8, height: 2.4 }
  }
];

export default function NetworkPage() {
  return (
    <VentureReplicaPage
      column={1}
      title="Wesley Insider Network"
      links={links}
    />
  );
}
