import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Wesley Insider",
  description:
    "Wesley Insider is a digital editorial publication on entrepreneurship, personal branding, money and wealth, and faith. Sixty plus articles every day."
};

const beats = [
  "Entrepreneurship",
  "Personal Branding",
  "Money and Wealth",
  "Faith"
];

export default function InsiderPage() {
  return (
    <>
      <PageHeader
        number="03"
        eyebrow="Wesley Insider / Editorial"
        title="Intelligence, published daily."
        body="Sixty plus articles every day on entrepreneurship, personal branding, money and wealth, and faith. The signal operators read before the cycle catches it."
        back={{ label: "Back to home", href: "/" }}
      />

      <section className="relative bg-bg">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {beats.map((beat, i) => (
              <div key={beat} className="border-t border-line pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">
                  <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mx-2 inline-block h-px w-6 bg-current align-middle" />
                  Beat
                </p>
                <h3 className="mt-6 font-display text-2xl text-ink md:text-3xl">{beat}</h3>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-line pt-12">
            <Link
              href="https://wesleyinsider.com"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.32em] text-ink"
            >
              <span>Visit wesleyinsider.com</span>
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
