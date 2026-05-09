"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eclipse } from "@/components/ui/Eclipse";
import { MovingParticles } from "@/components/ui/MovingParticles";

// Cinematic intro-to-homepage sequence (runs on every refresh).
//
//   0.0 – 0.8s   black screen, faint grain only
//   0.8 – 1.8s   eclipse fades in at center; brand mark still hidden
//   1.8 – 3.2s   eclipse recedes (opacity 1 → 0.35, scale 1.15 → 0.92,
//                blur 0 → 2px). Brand mark grows forward at the same time
//                (opacity 0 → 1, scale 0.72 → 1.0, blur 16 → 0,
//                letter-spacing 0.4em → 0.18em).
//   3.2 – 4.2s   brand mark continues growing (scale 1.0 → 1.12). Tagline
//                rises 8px and sharpens. Header fades in last.
//   4.2s +       ambient loop forever.
//
// `introComplete` is the source of truth for "the homepage is now live."
// The deeper layers do not start their ambient loops until then.

const HEADLINE = ["Wesley", "Joseph", "Co.com"];
const ENTRY_TIMES = [0, 0.19, 0.43, 0.76, 1] as const;

export function CinematicHomepage() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroComplete(true), 4200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      {/* Atmospheric ground — gradient drifts via CSS forever */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.0, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(ellipse 70% 64% at 50% 50%, rgba(255,255,255,0.08), rgba(0,0,0,0) 60%)",
          backgroundSize: "180% 180%",
          animation: "wjcAmbientGradient 18s ease-in-out infinite"
        }}
      />

      {/* Drifting dust particles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0"
      >
        <MovingParticles count={32} intensity="low" seed={3} />
      </motion.div>

      {/* Floating light leaks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 32% 32% at 78% 18%, rgba(255,255,255,0.18), transparent 55%)",
          animation: "wjcLeakA 24s ease-in-out infinite -6s"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 36% 30% at 18% 82%, rgba(255,255,255,0.12), transparent 55%)",
          animation: "wjcLeakB 28s ease-in-out infinite -10s"
        }}
      />

      {/* Eclipse — fades back as the brand mark grows */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <Eclipse />
      </div>

      {/* Brand mark — comes forward, IN FRONT of the eclipse at z-20 */}
      <BrandTypography introComplete={introComplete} />

      {/* Tagline — appears in Phase 4 */}
      <motion.p
        initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
        animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 3.4, ease: [0.22, 1, 0.36, 1] }}
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

function BrandTypography({ introComplete }: { introComplete: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
      {/* Outer wrapper handles the entry timeline.
          - Hidden for 0-1.8s
          - Grows from scale 0.72 → 1.0 with opacity/blur sharpening (1.8-3.2s)
          - Continues to scale 1.0 → 1.12 (3.2-4.2s) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.72, filter: "blur(16px)" }}
        animate={{
          opacity: [0, 0, 0, 1, 1],
          scale: [0.72, 0.72, 0.72, 1.0, 1.12],
          filter: ["blur(16px)", "blur(16px)", "blur(16px)", "blur(0px)", "blur(0px)"]
        }}
        transition={{
          duration: 4.2,
          times: [...ENTRY_TIMES],
          ease: [0.22, 1, 0.36, 1]
        }}
        className="text-center"
      >
        {/* Inner wrapper handles ambient breathing — only after introComplete */}
        <motion.div
          animate={
            introComplete
              ? { opacity: [0.92, 1, 0.92], y: [-2, 2, -2] }
              : { opacity: 1, y: 0 }
          }
          transition={
            introComplete
              ? {
                  opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }
              : { duration: 0 }
          }
        >
          <h1>
            <span className="sr-only">Wesley Joseph Co.com</span>
            <motion.span
              aria-hidden
              initial={{ letterSpacing: "0.4em" }}
              animate={{
                letterSpacing: ["0.4em", "0.4em", "0.4em", "0.18em", "0.18em"]
              }}
              transition={{
                duration: 4.2,
                times: [...ENTRY_TIMES],
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex flex-col items-center gap-2 font-display text-[clamp(2.5rem,11vw,5.5rem)] font-light uppercase leading-[0.95] text-ink md:flex-row md:gap-[0.4em] md:whitespace-nowrap"
            >
              {HEADLINE.map((word) => (
                <span key={word} className="inline-block">
                  {word}
                </span>
              ))}
            </motion.span>
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
}
