"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState, type CSSProperties } from "react";
import { MovingParticles } from "@/components/ui/MovingParticles";

// Cinematic sequence (single 9s timeline):
//
//   0.0 – 4.0s   The full eclipse plays alone. No text. The viewer
//                watches the Spline scene — moon drifts in front of
//                the sun, corona ring forms.
//   4.0 – 7.0s   Two things happen in parallel:
//                  • "WESLEY JOSEPH CO.COM" slowly appears
//                    (mask reveals, blur sharpens, opacity 0 → 1,
//                    letter-spacing tightens, scale grows).
//                  • The eclipse simultaneously shrinks and travels
//                    rightward, landing inside the O of CO at scale
//                    0.075 and x = +320px.
//   7.0 – 9.0s   Tagline rises in. Header lands. Eclipse holds its
//                tiny position inside the O. Brand mark settles.
//   9.0s+       introComplete = true; ambient breathing forever.

const HEADLINE = ["Wesley", "Joseph", "Co.com"];

// Times normalized to 9.0s:
//   0.0s  → 0       eclipse playing alone
//   4.0s  → 0.444   transition begins
//   5.5s  → 0.611   midpoint — eclipse half-shrunk, text half-visible
//   7.0s  → 0.778   transition complete
//   9.0s  → 1       homepage active
const TIMES = [0, 0.444, 0.611, 0.778, 1] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

const EclipseScene = dynamic(
  () => import("@/components/ui/EclipseScene").then((m) => m.EclipseScene),
  { ssr: false, loading: () => null }
);

export function CinematicHomepage() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setIntroComplete(true), 9000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      {/* Spline eclipse — full-screen, then visibly shrinks and travels
          into the second O. Both transformations animate over 3s so the
          journey is felt, not cut. */}
      <motion.div
        initial={{ scale: 1, x: 0, y: 0 }}
        animate={{
          scale: [1, 1, 0.4, 0.075, 0.075],
          x: [0, 0, 180, 320, 320],
          y: [0, 0, -4, -8, -8]
        }}
        transition={{
          duration: 9.0,
          times: [...TIMES],
          ease: EASE
        }}
        style={{ transformOrigin: "center", willChange: "transform" }}
        className="absolute inset-0 z-0"
      >
        <EclipseScene />
      </motion.div>

      {/* HTML particles for atmospheric depth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <MovingParticles count={18} intensity="low" seed={3} />
      </motion.div>

      {/* Brand mark — slowly appears in parallel with the eclipse shrinking */}
      <BrandTypography introComplete={introComplete} />

      {/* Tagline emerges last, after the eclipse has settled into the O */}
      <motion.p
        initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
        animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 7.2, ease: EASE }}
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
      <motion.div
        initial={
          {
            "--reveal": "0%",
            opacity: 0,
            scale: 0.92,
            filter: "blur(14px)"
          } as never
        }
        animate={
          {
            // 5 keyframes synchronized to the master TIMES
            "--reveal": ["0%", "0%", "60%", "110%", "110%"],
            opacity: [0, 0, 0.55, 1, 1],
            scale: [0.92, 0.92, 0.97, 1.06, 1.06],
            letterSpacing: ["0.45em", "0.45em", "0.32em", "0.18em", "0.18em"],
            filter: [
              "blur(14px)",
              "blur(14px)",
              "blur(4px)",
              "blur(0px)",
              "blur(0px)"
            ]
          } as never
        }
        transition={{ duration: 9.0, times: [...TIMES], ease: EASE }}
        style={
          {
            maskImage:
              "linear-gradient(to right, black 0%, black calc(var(--reveal) - 8%), transparent var(--reveal), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black calc(var(--reveal) - 8%), transparent var(--reveal), transparent 100%)"
          } as CSSProperties
        }
        className="text-center"
      >
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
            <span
              aria-hidden
              className="flex flex-col items-center gap-2 font-display text-[clamp(2.5rem,11vw,5.5rem)] font-light uppercase leading-[0.95] text-ink md:flex-row md:gap-[0.4em] md:whitespace-nowrap"
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.18)" }}
            >
              {HEADLINE.map((word) => (
                <span key={word} className="inline-block">
                  {word}
                </span>
              ))}
            </span>
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
}
