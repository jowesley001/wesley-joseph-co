"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MovingParticles } from "@/components/ui/MovingParticles";

// Cinematic sequence:
//
//   0.0 – 13.0s   The Spline eclipse plays alone, undisturbed. Full
//                 formation: moon drifts across the sun, corona
//                 forms, totality lands and holds. Nothing else
//                 moves.
//   13.0s+        Tagline rises in. Header lands. Eclipse keeps
//                 breathing forever in its native composition.

const EASE = [0.22, 1, 0.36, 1] as const;

const EclipseScene = dynamic(
  () => import("@/components/ui/EclipseScene").then((m) => m.EclipseScene),
  { ssr: false, loading: () => null }
);

export function CinematicHomepage() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setIntroComplete(true), 13500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      {/* Spline eclipse — plays at native composition */}
      <div className="absolute inset-0 z-0">
        <EclipseScene />
      </div>

      {/* HTML particles supplement the WebGL atmosphere */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <MovingParticles count={18} intensity="low" seed={3} />
      </motion.div>

      {/* Tagline arrives after the eclipse fully forms */}
      <motion.p
        initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
        animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.4, delay: 13.0, ease: EASE }}
        className="pointer-events-none absolute bottom-12 left-0 right-0 z-30 px-6 text-center md:bottom-16"
      >
        <motion.span
          className="inline-block font-mono text-[clamp(0.7rem,0.95vw,0.85rem)] uppercase tracking-[0.45em] text-ink-soft"
          animate={introComplete ? { opacity: [0.85, 1, 0.85] } : { opacity: 1 }}
          transition={
            introComplete
              ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0 }
          }
        >
          Financial intelligence · Media power · Cultural influence
        </motion.span>
      </motion.p>
    </section>
  );
}
