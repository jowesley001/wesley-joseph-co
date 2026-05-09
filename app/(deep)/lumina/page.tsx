import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Lumina Media",
  description:
    "Lumina Media is the in-house photo and video production arm of Wesley Joseph Co. Visual storytelling elevated."
};

const services = [
  { name: "Editorial Campaigns", body: "Multi-asset campaigns built for print and platform." },
  { name: "Brand Films", body: "Cinematic brand documentaries and narrative spots." },
  { name: "Founder Portraiture", body: "Editorial-grade portraiture for media kits and press." },
  { name: "Product Cinematography", body: "Tabletop, motion, and product hero films." },
  { name: "Image Direction", body: "Art direction and creative for ongoing visual systems." }
];

export default function LuminaPage() {
  return (
    <>
      <PageHeader
        number="01"
        eyebrow="Lumina Media / Production"
        title="Visual storytelling elevated."
        body="Photo and video for founders, funds, and institutions. Editorial finish. Cinematic restraint. Built to license, broadcast, and last."
        back={{ label: "Back to home", href: "/" }}
      />

      <section className="relative bg-bg">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {services.map((s, i) => (
              <div key={s.name} className="border-t border-line pt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">
                  <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mx-2 inline-block h-px w-6 bg-current align-middle" />
                  Service
                </p>
                <h3 className="mt-6 font-display text-3xl text-ink">{s.name}</h3>
                <p className="mt-4 max-w-md font-sans text-base text-ink-soft leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-line pt-12">
            <Link
              href="mailto:lumina@wesleyjoseph.co"
              className="group inline-flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.32em] text-ink"
            >
              <span>Inquire about Production</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/40 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-bg">
                <span aria-hidden>{"→"}</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
