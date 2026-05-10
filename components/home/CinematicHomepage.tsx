"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState, type CSSProperties } from "react";
import { MovingParticles } from "@/components/ui/MovingParticles";

// Cinematic intro-to-homepage sequence (9s, runs every refresh).
// The eclipse is now a real 3D object inside a WebGL canvas; the
// typography layer animates as an HTML overlay on top.
//
//   0.0–1.5s   The Void           black + grain only
//   1.5–3.0s   The Presence       3D eclipse fades in, drifts in from left
//   3.0–5.2s   The Reveal         eclipse drifts horizontally, brand mark
//                                 unmasked behind it
//   5.2–6.4s   The Distortion     subtle gravity bend on the typography
//   6.4–7.6s   The Alignment      eclipse locks between JOSEPH and CO,
//                                 typography sharpens
//   7.6–9.0s   The Identity       eclipse recedes, brand mark dominates,
//                                 tagline + header arrive
//   9.0s+      ambient loop forever (camera drift, particle drift,
//              breathing brand mark, gradient pan)

const HEADLINE = ["Wesley", "Joseph", "Co.com"];

const TIMES = [0, 0.167, 0.333, 0.444, 0.578, 0.756, 1] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

// EclipseScene is a WebGL canvas — must run client-only.
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
      {/* Layer 1 — Three.js cinematic environment */}
      <div className="absolute inset-0 z-0">
        <EclipseScene />
      </div>

      {/* Atmospheric HTML particles supplement the WebGL layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <MovingParticles count={18} intensity="low" seed={3} />
      </motion.div>

      {/* Layer 2 — HTML typography overlay */}
      <BrandTypography introComplete={introComplete} />

      {/* Tagline emerges in Scene 5 */}
      <motion.p
        initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
        animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.4, delay: 7.0, ease: EASE }}
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
        initial={{ "--reveal": "0%" } as never}
        animate={
          {
            "--reveal": ["0%", "0%", "110%", "110%", "110%", "110%", "110%"],
            scale: [0.92, 0.92, 1.0, 1.012, 1.0, 1.0, 1.06],
            letterSpacing: [
              "0.45em",
              "0.45em",
              "0.45em",
              "0.4em",
              "0.18em",
              "0.18em",
              "0.18em"
            ],
            filter: [
              "blur(0px)",
              "blur(0px)",
              "blur(0px)",
              "blur(2px)",
              "blur(0.4px)",
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
