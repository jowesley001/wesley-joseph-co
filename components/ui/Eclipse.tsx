"use client";

import { motion } from "framer-motion";

// Eclipse — purely presentational. The parent owns the entry choreography
// (opacity / scale / x drift / blur). This component only renders the
// visual layers and runs the always-on ambient motion.

type Props = {
  className?: string;
  size?: string;
  ambientDelay?: number;
};

export function Eclipse({
  className = "",
  size = "h-[44vw] w-[44vw] max-h-[60vh] max-w-[60vh] md:h-[60vh] md:w-[60vh]",
  ambientDelay = 9.0
}: Props) {
  return (
    <div className={`relative ${size} ${className}`} aria-hidden>
      <motion.div
        className="relative h-full w-full"
        animate={{
          x: [-6, 6, -6],
          y: [-4, 5, -4],
          scale: [1, 1.018, 1]
        }}
        transition={{
          x: { duration: 14, delay: ambientDelay, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 16, delay: ambientDelay, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 7, delay: ambientDelay, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Soft outer corona */}
        <div
          className="absolute -inset-[35%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.06) 46%, rgba(255,255,255,0) 72%)",
            animation: "wjcGlowPulse 6s ease-in-out infinite"
          }}
        />

        {/* Bright rim */}
        <div
          className="absolute -inset-[2%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, transparent 47.5%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 56%)",
            animation: "wjcGlowPulse 5.6s ease-in-out infinite -1s"
          }}
        />

        {/* Crescent light sweep */}
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

        {/* Dark sphere */}
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
    </div>
  );
}
