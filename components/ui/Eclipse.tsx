"use client";

import { motion } from "framer-motion";

type Props = {
  delay?: number;
  className?: string;
  size?: string;
  skipIntro?: boolean;
};

export function Eclipse({
  delay = 0.8,
  className = "",
  size = "h-[44vw] w-[44vw] max-h-[60vh] max-w-[60vh] md:h-[60vh] md:w-[60vh]",
  skipIntro = false
}: Props) {
  const enterDelay = skipIntro ? 0 : delay;
  const enterDuration = skipIntro ? 1 : 2.6;
  const ambientStart = enterDelay + (skipIntro ? 0.4 : 1.6);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [0, 6, 0, -4, 0],
        y: [0, -5, 0, 3, 0]
      }}
      transition={{
        opacity: { duration: enterDuration, delay: enterDelay, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: enterDuration, delay: enterDelay, ease: [0.22, 1, 0.36, 1] },
        x: {
          duration: 34,
          delay: ambientStart,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        },
        y: {
          duration: 30,
          delay: ambientStart,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }
      }}
      className={`relative ${size} ${className}`}
      aria-hidden
    >
      {/* Soft outer corona — drifts independently for parallax depth */}
      <motion.div
        className="absolute -inset-[35%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.06) 46%, rgba(255,255,255,0.0) 72%)"
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.025, 1],
          x: [0, -4, 0, 5, 0],
          y: [0, 4, 0, -4, 0]
        }}
        transition={{
          opacity: { duration: 9.4, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 9.4, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 24, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 28, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Bright rim light — soft pulse */}
      <motion.div
        className="absolute -inset-[2%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, transparent 47.5%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.0) 56%)"
        }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft moving light wrap — a slow soft halo travels around the eclipse rim */}
      <motion.div
        className="absolute -inset-[8%] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0) 70deg, rgba(255,255,255,0.16) 100deg, rgba(255,255,255,0.04) 130deg, rgba(255,255,255,0) 200deg, rgba(255,255,255,0) 360deg)",
          maskImage:
            "radial-gradient(circle, transparent 47%, black 50%, black 56%, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 47%, black 50%, black 56%, transparent 60%)"
        }}
        animate={{ rotate: 360, opacity: [0.55, 0.85, 0.55] }}
        transition={{
          rotate: { duration: 64, repeat: Infinity, ease: "linear" },
          opacity: { duration: 11, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Eclipse — dark sphere with breathing scale */}
      <motion.div
        className="absolute inset-0 rounded-full bg-black"
        animate={{ scale: [1, 1.018, 1] }}
        transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Surface highlight — extremely slow rotation gives the hint of a turning body */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 28% 24%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 28%, transparent 50%)"
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 260, repeat: Infinity, ease: "linear" }}
        />
        {/* Secondary subtle shading layer — drifts at a different cadence */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 70% 78%, rgba(255,255,255,0.04) 0%, transparent 35%)"
          }}
          animate={{ rotate: -360, opacity: [0.5, 0.85, 0.5] }}
          transition={{
            rotate: { duration: 380, repeat: Infinity, ease: "linear" },
            opacity: { duration: 13, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </motion.div>
    </motion.div>
  );
}
