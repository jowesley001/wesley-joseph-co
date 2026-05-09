"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";

function useNYTimeShort() {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    const tick = () => setLabel(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30 * 1000);
    return () => window.clearInterval(id);
  }, []);
  return label;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const time = useNYTimeShort();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ease-cinematic ${
          scrolled
            ? "border-b border-line-subtle bg-bg/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-12">
          <Link
            href="/"
            className="group flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.32em] text-ink"
            aria-label={SITE.name}
          >
            <motion.span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full bg-ink"
              animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.2, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <span>{SITE.name}</span>
          </Link>

          <div className="hidden font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted md:block">
            <span>(NY)</span>
            <span className="ml-3 tabular-nums text-ink">{time ?? "--:--"}</span>
          </div>

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => {
              const isExternal = "external" in link && link.external;
              const cls =
                "group relative font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted transition-colors duration-500 hover:text-ink";
              const inner = (
                <>
                  <span>{link.label}</span>
                  <span
                    aria-hidden
                    className="absolute bottom-[-6px] left-0 h-px w-0 bg-ink transition-all duration-500 ease-cinematic group-hover:w-full"
                  />
                </>
              );
              if (isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cls}
                  >
                    {inner}
                  </a>
                );
              }
              return (
                <Link key={link.href} href={link.href} className={cls}>
                  {inner}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink lg:hidden"
          >
            <span>Menu</span>
            <span aria-hidden className="block h-px w-8 bg-ink-muted" />
          </button>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
