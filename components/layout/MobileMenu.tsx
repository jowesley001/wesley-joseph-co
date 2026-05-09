"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-bg lg:hidden"
        >
          <div className="flex items-center justify-between px-6 py-6">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.32em] text-ink"
            >
              <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-ink" />
              {SITE.name}
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-col gap-2 px-6 pt-12">
            {NAV_LINKS.map((link, idx) => {
              const isExternal = "external" in link && link.external;
              const child = (
                <span className="block border-b border-line-subtle py-6 font-display text-5xl text-ink">
                  {link.label}
                </span>
              );
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + idx * 0.06,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={onClose}
                    >
                      {child}
                    </a>
                  ) : (
                    <Link href={link.href} onClick={onClose}>
                      {child}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
