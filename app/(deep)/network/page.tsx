import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Wesley Insider Network",
  description:
    "A private multi-state business membership for owners, operators, and capital allocators."
};

const pillars = [
  {
    title: "Curated Rooms",
    body: "Members are vetted for outcomes, not optics. Every room is built around a thesis."
  },
  {
    title: "Shared Deal Flow",
    body: "Operating opportunities, real estate, and capital introductions move inside the network first."
  },
  {
    title: "Real Introductions",
    body: "Warm, accountable, two-sided. The opposite of networking."
  }
];

export default function NetworkPage() {
  return (
    <>
      <PageHeader
        number="02"
        eyebrow="The Network / Membership"
        title="Connections that create real opportunities."
        body="The Wesley Insider Network is a private multi-state business membership for owners, operators, and capital allocators."
        back={{ label: "Back to home", href: "/" }}
      />

      <section className="relative bg-bg">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-x-12 md:gap-y-20">
            {pillars.map((p, i) => (
              <div key={p.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">
                  <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ml-6">Pillar</span>
                </p>
                <h3 className="mt-6 font-display text-3xl text-ink">{p.title}</h3>
                <p className="mt-4 font-sans text-base text-ink-soft leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-32">
            <Link
              href="mailto:network@wesleyjoseph.co"
              className="group inline-flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.32em] text-ink"
            >
              <span>Apply for Membership</span>
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
