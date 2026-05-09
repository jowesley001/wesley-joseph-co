"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FOOTER_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line-subtle bg-bg">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.32em] text-ink"
              aria-label={SITE.name}
            >
              <motion.span
                aria-hidden
                className="block h-1.5 w-1.5 rounded-full bg-ink"
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
              {SITE.name}
            </Link>
            <p className="mt-10 max-w-md font-display text-3xl leading-snug text-ink md:text-4xl">
              The infrastructure for modern influence.
            </p>
            <p className="mt-6 max-w-md font-sans text-base text-ink-soft leading-relaxed">
              Media, markets, entrepreneurship, and culture. One house.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-10">
              <FooterColumn label="Ventures" links={FOOTER_LINKS.ventures} />
              <FooterColumn label="Company" links={FOOTER_LINKS.company} />
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-line-subtle pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">
            Holding company. Media ecosystem.
          </p>
        </div>
      </div>
    </footer>
  );
}

type ColumnProps = {
  label: string;
  links: ReadonlyArray<{ label: string; href: string }>;
};

function FooterColumn({ label, links }: ColumnProps) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">{label}</p>
      <ul className="mt-6 space-y-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group relative inline-block font-sans text-sm text-ink-soft transition-colors duration-500 hover:text-ink"
            >
              <span>{link.label}</span>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-0 bg-ink transition-all duration-500 ease-cinematic group-hover:w-full"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
