"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/constants";

type Props = {
  cinematic?: boolean;
};

export function Header({ cinematic = false }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      setTime(formatter.format(now));
    };
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  // Header lands late only on the homepage intro. Deep pages should read
  // like editorial chrome immediately.
  const isHome = pathname === "/";
  const reveal = cinematic && isHome ? 7.4 : 0.4;

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: reveal, ease: [0.22, 1, 0.36, 1] }}
      className={`${isHome ? "fixed" : "absolute"} inset-x-0 top-0 z-40 transition-all duration-700 ease-cinematic ${
        isHome && scrolled ? "border-b border-line-subtle bg-bg/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-[1680px] grid-cols-[1fr_auto_1fr] items-center px-6 py-6 md:px-12">
        <Link
          href="/"
          className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.34em] text-white md:text-[12.5px]"
          aria-label={SITE.name}
        >
          <motion.span
            aria-hidden
            className="block h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>{SITE.name}</span>
        </Link>

        <span
          className="hidden justify-self-center font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-ink-soft md:inline-flex md:text-[12px]"
          suppressHydrationWarning
        >
          (NY) {time || "——:——"}
        </span>

        <nav
          aria-label="Primary"
          className="hidden items-center justify-end gap-7 font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-ink-soft md:flex md:text-[12px]"
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors duration-500 hover:text-white ${
                  active ? "text-white" : "text-ink-soft"
                }`}
              >
                {link.label}
                <motion.span
                  aria-hidden
                  className="absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-white"
                  initial={false}
                  animate={{ width: active ? "72%" : "0%", opacity: active ? 0.9 : 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </Link>
            );
          })}
          <span
            aria-hidden
            className="grid grid-cols-3 gap-[3px] pl-2"
          >
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={index} className="h-[2px] w-[2px] rounded-full bg-white/75" />
            ))}
          </span>
        </nav>

        <Link
          href="/ventures"
          className="justify-self-end font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-ink-soft transition-colors duration-500 hover:text-white md:hidden"
        >
          Ventures
        </Link>
      </div>
    </motion.header>
  );
}
