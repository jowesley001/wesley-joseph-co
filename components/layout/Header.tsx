"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { IndexOverlay } from "./IndexOverlay";

type Props = {
  // When true, header reveal is delayed so it lands at the end of Phase 4.
  // Deeper routes pass false to mount the chrome immediately.
  cinematic?: boolean;
};

export function Header({ cinematic = false }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reveal = cinematic ? 4.0 : 0.4;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: reveal, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ease-cinematic ${
          scrolled ? "border-b border-line-subtle bg-bg/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-12">
          <Link
            href="/"
            className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.32em] text-ink"
            aria-label={SITE.name}
          >
            <motion.span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full bg-ink"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span>{SITE.name}</span>
          </Link>

          <button
            type="button"
            onClick={() => setIndexOpen(true)}
            aria-label="Open index"
            className="group flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.32em] text-ink-soft transition-colors duration-500 hover:text-ink"
          >
            <span>Index</span>
            <span
              aria-hidden
              className="text-[14px] leading-none transition-transform duration-500 group-hover:rotate-45"
            >
              +
            </span>
          </button>
        </div>
      </motion.header>

      <IndexOverlay open={indexOpen} onClose={() => setIndexOpen(false)} />
    </>
  );
}
