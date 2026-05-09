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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: enterDuration, delay: enterDelay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${size} ${className}`}
      aria-hidden
    >
      {/* Soft outer corona — the light leak around the eclipse */}
      <motion.div
        className="absolute -inset-[35%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.14) 30%, rgba(255,255,255,0.06) 46%, rgba(255,255,255,0.0) 72%)"
        }}
        animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.02, 1] }}
        transition={{ duration: 8.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Inner rim — the bright eclipse edge */}
      <motion.div
        className="absolute -inset-[2%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, transparent 47.5%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.0) 56%)"
        }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* The eclipse itself — pure dark sphere with a hint of surface */}
      <motion.div
        className="absolute inset-0 rounded-full bg-black"
        animate={{ scale: [1, 1.018, 1] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 28% 24%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 28%, transparent 50%)"
          }}
        />
      </motion.div>
    </motion.div>
  );
}
