"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { OrbitalSystem, type OrbitalNode } from "@/components/ui/OrbitalSystem";
import { MovingParticles } from "@/components/ui/MovingParticles";
import { MovingGradient } from "@/components/ui/MovingGradient";

const NODES: OrbitalNode[] = [
  {
    text: "Lumina Media",
    pos: "left-[16%] top-[12%]",
    number: "01",
    category: "Production",
    href: "/lumina",
    prominent: true
  },
  {
    text: "Wesley Insider Network",
    pos: "left-[78%] top-[40%]",
    number: "02",
    category: "Membership",
    href: "/network",
    prominent: true
  },
  {
    text: "Wesley Insider",
    pos: "left-[44%] top-[83%]",
    number: "03",
    category: "Editorial",
    href: "/insider",
    prominent: true
  },
  { text: "Intelligence", pos: "left-[70%] top-[14%]" },
  { text: "Capital", pos: "left-[12%] top-[58%]" },
  { text: "Faith", pos: "left-[80%] top-[78%]" }
];

const headlineLines = ["The infrastructure", "for modern", "influence."];

function useNYTime() {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    const tick = () => setLabel(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return label;
}

export function OrbitalHomepage() {
  const time = useNYTime();

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      <MovingGradient variant="center" intensity={0.13} />
      <MovingParticles count={56} intensity="med" seed={3} />

      {/* Massive orbital system — the experience itself */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square w-[min(115vh,1280px)] max-w-[95vw]"
        >
          <OrbitalSystem nodes={NODES} />
        </motion.div>
      </div>

      {/* Single statement, bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-10 left-6 z-10 max-w-md md:bottom-14 md:left-12"
      >
        <h1 className="font-display text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.05] text-ink">
          <span className="sr-only">The infrastructure for modern influence.</span>
          <span aria-hidden className="flex flex-col">
            {headlineLines.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.4,
                  delay: 0.9 + i * 0.18,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </span>
        </h1>
      </motion.div>

      {/* Live ops one-liner, bottom-right */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-10 right-6 z-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-ink-muted md:bottom-14 md:right-12"
      >
        <motion.span
          aria-hidden
          className="block h-1.5 w-1.5 rounded-full bg-white"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-ink">Online</span>
        <span className="opacity-40">·</span>
        <span>Multi-state</span>
        <span className="opacity-40">·</span>
        <span className="tabular-nums text-ink">{time ?? "--:--:--"}</span>
      </motion.div>
    </section>
  );
}
