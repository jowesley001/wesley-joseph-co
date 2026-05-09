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
  { text: "Media", pos: "left-[70%] top-[14%]" },
  { text: "Wealth", pos: "left-[12%] top-[58%]" },
  { text: "Influence", pos: "left-[80%] top-[78%]" }
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

type Props = {
  revealed: boolean;
};

export function OrbitalHomepage({ revealed }: Props) {
  const time = useNYTime();

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <MovingGradient variant="center" intensity={0.13} />
        <MovingParticles count={56} intensity="med" seed={3} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-auto relative aspect-square w-[min(115vh,1280px)] max-w-[95vw]">
          <OrbitalSystem nodes={NODES} revealed={revealed} />
        </div>
      </div>

      {/* Statement, bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
        transition={{ duration: 1.4, delay: revealed ? 0.6 : 0, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-10 left-6 z-10 max-w-md md:bottom-14 md:left-12"
      >
        <h1 className="font-display text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.05] text-ink">
          <span className="sr-only">The infrastructure for modern influence.</span>
          <span aria-hidden className="flex flex-col">
            {headlineLines.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                animate={{
                  opacity: revealed ? 1 : 0,
                  y: revealed ? 0 : 16,
                  filter: revealed ? "blur(0px)" : "blur(10px)"
                }}
                transition={{
                  duration: 1.4,
                  delay: revealed ? 0.85 + i * 0.16 : 0,
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

      {/* Live ops one-liner, bottom-right (desktop+) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 12 }}
        transition={{ duration: 1.2, delay: revealed ? 1.4 : 0, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-14 right-12 z-10 hidden items-center gap-3 font-mono text-[12px] uppercase tracking-[0.32em] text-ink-soft md:flex"
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
