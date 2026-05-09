import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ventures } from "@/content/ventures";

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "The three ventures of Wesley Joseph Co.: Lumina Media, Wesley Insider Network, and Wesley Insider."
};

export default function VenturesPage() {
  return (
    <>
      <PageHeader
        number="00"
        eyebrow="The Ventures"
        title="Three companies. One thesis."
        body="Wesley Joseph Co. operates three ventures across production, membership, and editorial. Each is a standalone business. Together they compound."
        back={{ label: "Back to home", href: "/" }}
      />

      <section className="relative bg-bg">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <div className="flex flex-col gap-16">
            {ventures.map((v, i) => (
              <article
                key={v.id}
                className="grid grid-cols-1 gap-8 border-t border-line pt-12 md:grid-cols-12"
              >
                <div className="md:col-span-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">
                    <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mx-2 inline-block h-px w-6 bg-current align-middle" />
                    {v.category}
                  </p>
                  <h2 className="mt-6 font-display text-display-md text-ink">{v.name}</h2>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="font-sans text-lg text-ink-soft leading-relaxed">
                    {v.tagline} {v.description}
                  </p>
                  <Link
                    href={v.href}
                    {...(v.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                    className="group mt-10 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink transition-colors duration-500 hover:text-ink-soft"
                  >
                    <span>Enter {v.name}</span>
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                    >
                      {"→"}
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
