"use client";

import { motion } from "framer-motion";

// Eclipse — phased entry that fades and recedes as the brand mark grows
// forward.
//
//   0.0s – 0.8s   invisible (atmospheric ground only)
//   0.8s – 1.8s   eclipse fades in to opacity 1, scale 1.15
//   1.8s – 3.2s   dissolves completely:
//                   opacity 1     → 0
//                   scale   1.15  → 0.88
//                   filter  blur(0) → blur(4px)
//   3.2s +        gone; brand mark stands alone with atmospheric ground
//
// The crescent edge sweep, glow pulse and rim shimmer run as CSS keyframes
// so they never stop, even after introComplete.

type Props = {
  className?: string;
  size?: string;
};

const ENTRY_TIMES = [0, 0.19, 0.43, 0.76, 1] as const; // 0s, 0.8s, 1.8s, 3.2s, 4.2s

export function Eclipse({
  className = "",
  size = "h-[44vw] w-[44vw] max-h-[60vh] max-w-[60vh] md:h-[60vh] md:w-[60vh]"
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.15, filter: "blur(0px)" }}
      animate={{
        opacity: [0, 0, 1, 0, 0],
        scale: [1.15, 1.15, 1.15, 0.88, 0.88],
        filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(4px)", "blur(4px)"]
      }}
      transition={{
        duration: 4.2,
        times: [...ENTRY_TIMES],
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`relative ${size} ${className}`}
      aria-hidden
    >
      <motion.div
        className="relative h-full w-full"
        animate={{
          x: [-6, 6, -6],
          y: [-4, 5, -4],
          scale: [1, 1.018, 1]
        }}
        transition={{
          x: { duration: 14, delay: 4.2, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 16, delay: 4.2, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 7, delay: 4.2, repeat: Infinity, ease: "easeInOut" }
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

        {/* The dark sphere */}
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
