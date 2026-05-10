"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

export function Footer() {
  const pathname = usePathname();
  const hideForFramedVenturePage =
    pathname === "/lumina" || pathname === "/network" || pathname === "/insider";

  if (hideForFramedVenturePage) {
    return null;
  }

  return (
    <footer className="relative z-20 bg-black">
      <div className="mx-auto grid max-w-[1536px] grid-cols-1 items-center gap-5 border-t border-white/[0.12] px-6 py-6 md:grid-cols-3 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.38em] text-white/82 transition-colors duration-500 hover:text-white"
          aria-label={SITE.name}
        >
          <motion.span
            aria-hidden
            className="block h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)]"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>{SITE.name}</span>
        </Link>

        <p className="justify-self-start font-mono text-[10px] uppercase tracking-[0.34em] text-white/62 md:justify-self-center">
          The infrastructure for modern influence
        </p>

        <p className="justify-self-start font-mono text-[10px] uppercase tracking-[0.34em] text-white/62 md:justify-self-end">
          © 2024 All rights reserved
        </p>
      </div>
    </footer>
  );
}
