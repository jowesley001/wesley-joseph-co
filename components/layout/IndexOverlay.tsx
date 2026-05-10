"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ROUTES = [
  { label: "Ventures", href: "/ventures", number: "01" },
  { label: "Lumina Media", href: "/lumina", number: "02" },
  { label: "The Network", href: "/network", number: "03" },
  { label: "Wesley Insider", href: "/insider", number: "04" },
  { label: "Sign In", href: "/login", number: "05" }
];

export function IndexOverlay({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="index-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] bg-bg"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.06), transparent 60%)"
            }}
          />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-6 md:px-12">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.32em] text-ink"
            >
              <motion.span
                aria-hidden
                className="block h-1.5 w-1.5 rounded-full bg-ink"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
              Wesley Joseph
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close index"
              className="font-mono text-[12px] uppercase tracking-[0.32em] text-ink-soft transition-colors duration-500 hover:text-ink"
            >
              Close
            </button>
          </div>

          <nav className="mx-auto flex h-full max-w-[1080px] flex-col items-start justify-center gap-6 px-6 md:px-12">
            {ROUTES.map((route, i) => (
              <motion.div
                key={route.href}
                initial={{ opacity: 0, x: -16, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -8 }}
                transition={{
                  duration: 1,
                  delay: 0.15 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="w-full"
              >
                <Link
                  href={route.href}
                  onClick={onClose}
                  className="group flex w-full items-baseline gap-6 border-b border-line-subtle pb-4 transition-colors duration-700 ease-cinematic hover:text-ink-soft md:gap-12"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-subtle">
                    {route.number}
                  </span>
                  <span className="font-display text-[clamp(2rem,6vw,5rem)] font-light leading-[1] text-ink transition-transform duration-700 ease-cinematic group-hover:translate-x-3">
                    {route.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
