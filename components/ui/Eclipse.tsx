"use client";

import { motion } from "framer-motion";

// Eclipse — phased entry + always-on ambient motion
//
// Phase 1 (0.0–1.2s): appears blurred, slightly larger, slightly below center
// Phase 2 (1.2–2.4s): scale 1.08 → 1.0 and y +24 → 0, glow swells in
// Phase 5 (2.4s+):    breathes and drifts forever
//
// Crescent edge sweep, glow pulse, and rim shimmer run via CSS keyframes
// from globals.css so they never stop.

type Props = {
  className?: string;
  size?: string;
};

export function Eclipse({
  className = "",
  size = "h-[44vw] w-[44vw] max-h-[60vh] max-w-[60vh] md:h-[60vh] md:w-[60vh]"
}: Props) {
  return (
    <motion.div
      // Outer wrapper handles the entry choreography.
      // opacity + filter resolve in Phase 1; scale + y resolve in Phase 2.
      initial={{ opacity: 0, scale: 1.08, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        opacity: { duration: 0.9, delay: 0.0, ease: [0.22, 1, 0.36, 1] },
        filter: { duration: 1.2, delay: 0.0, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }
      }}
      className={`relative ${size} ${className}`}
      aria-hidden
    >
      {/* Inner wrapper handles the always-on ambient drift + breathing. */}
      <motion.div
        className="relative h-full w-full"
        animate={{
          x: [-8, 8, -8],
          y: [-5, 7, -5],
          scale: [1, 1.018, 1]
        }}
        transition={{
          x: { duration: 14, delay: 2.4, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 16, delay: 2.4, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 7, delay: 2.4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Soft outer corona — pulses and gently drifts via CSS */}
        <div
          className="absolute -inset-[35%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.06) 46%, rgba(255,255,255,0) 72%)",
            animation: "wjcGlowPulse 6s ease-in-out infinite"
          }}
        />

        {/* Bright rim ring — softly pulses */}
        <div
          className="absolute -inset-[2%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, transparent 47.5%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 56%)",
            animation: "wjcGlowPulse 5.6s ease-in-out infinite -1s"
          }}
        />

        {/* Crescent light sweep — rotates around the rim continuously (CSS) */}
        <div
          className="absolute -inset-[8%] rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0) 60deg, rgba(255,255,255,0.22) 100deg, rgba(255,255,255,0.06) 140deg, rgba(255,255,255,0) 200deg, rgba(255,255,255,0) 360deg)",
            maskImage:
              "radial-gradient(circle, transparent 47%, black 50%, black 56%, transparent 60%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 47%, black 50%, black 56%, transparent 60%)",
            animation: "wjcCrescentSweep 22s linear infinite"
          }}
        />

        {/* Eclipse — pure dark sphere */}
        <div className="absolute inset-0 rounded-full bg-black">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 28% 24%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 28%, transparent 50%)"
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
