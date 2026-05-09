"use client";

import { motion } from "framer-motion";

type Props = {
  className?: string;
  variant?: "center" | "right" | "left";
  intensity?: number;
};

export function MovingGradient({
  className = "",
  variant = "center",
  intensity = 0.12
}: Props) {
  const positions: Record<string, string[]> = {
    center: ["50% 45%", "55% 50%", "45% 55%", "50% 45%"],
    right: ["62% 45%", "65% 52%", "58% 50%", "62% 45%"],
    left: ["38% 45%", "35% 52%", "42% 50%", "38% 45%"]
  };

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      animate={{
        background: positions[variant].map(
          (pos) =>
            `radial-gradient(ellipse 60% 55% at ${pos}, rgba(255,255,255,${intensity}), rgba(0,0,0,0) 60%)`
        )
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
