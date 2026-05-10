"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MovingParticles } from "@/components/ui/MovingParticles";

// Cinematic sequence (single 17s timeline):
//
//   0.0 – 13.0s   The Spline eclipse plays alone, undisturbed. Full
//                 13 seconds so the entire 3D animation completes:
//                 moon drifts across the sun, corona forms, totality
//                 lands and holds. Nothing else moves on the page.
//   13.0 – 15.0s  "WESLEY JOSEPH" begins to fade in as a ring of
//                 typography circling the eclipse.
//   15.0s+        The ring continues to rotate slowly forever.
//                 Tagline arrives at 15.5s; header at 15.5s.
//                 Eclipse keeps breathing and the page stays alive.

const EASE = [0.22, 1, 0.36, 1] as const;

const EclipseScene = dynamic(
  () => import("@/components/ui/EclipseScene").then((m) => m.EclipseScene),
  { ssr: false, loading: () => null }
);

export function CinematicHomepage() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setIntroComplete(true), 15000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      {/* Spline eclipse — plays at native composition; no shrink */}
      <div className="absolute inset-0 z-0">
        <EclipseScene />
      </div>

      {/* HTML particles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <MovingParticles count={18} intensity="low" seed={3} />
      </motion.div>

      {/* WESLEY JOSEPH circling the eclipse */}
      <CircularBrandText />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
        animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.4, delay: 15.5, ease: EASE }}
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

function CircularBrandText() {
  // Repeated text fills the circle so it reads continuously as it rotates.
  const text =
    "WESLEY JOSEPH · WESLEY JOSEPH · WESLEY JOSEPH · WESLEY JOSEPH · ";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.4, delay: 13.0, ease: EASE }}
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
    >
      {/* Wrapper handles rotation via CSS so textPath inside the SVG
          stays untouched by framer-motion (which can interfere with
          textPath layout). */}
      <div
        className="h-[80vh] max-h-[800px] w-[80vh] max-w-[800px]"
        style={{ animation: "wjcRingSpin 90s linear infinite" }}
      >
        <svg
          viewBox="0 0 800 800"
          className="h-full w-full"
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="wjc-circle-path"
              d="M 400 400 m -340 0 a 340 340 0 1 1 680 0 a 340 340 0 1 1 -680 0"
              fill="none"
            />
          </defs>
          <text
            fill="#ffffff"
            fontSize="38"
            letterSpacing="10"
            fontWeight="300"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <textPath href="#wjc-circle-path" startOffset="0">
              {text + text}
            </textPath>
          </text>
        </svg>
      </div>
      <span className="sr-only">Wesley Joseph Co.com</span>
    </motion.div>
  );
}
