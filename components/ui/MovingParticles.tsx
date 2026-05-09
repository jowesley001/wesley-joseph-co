"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  count?: number;
  className?: string;
  intensity?: "low" | "med" | "high";
  seed?: number;
};

export function MovingParticles({
  count = 22,
  className = "",
  intensity = "low",
  seed = 1
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const max = intensity === "low" ? 0.32 : intensity === "med" ? 0.5 : 0.7;

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const s = (i + 1) * 13 * seed;
      const r = (n: number) => {
        const x = Math.sin(s * n) * 10000;
        return x - Math.floor(x);
      };
      return {
        id: i,
        left: `${(r(2.1) * 100).toFixed(3)}%`,
        top: `${(r(3.7) * 100).toFixed(3)}%`,
        delay: Number((r(5.3) * 9).toFixed(3)),
        duration: Number((11 + r(7.9) * 16).toFixed(3)),
        size: Number((1 + r(11.1) * 1.6).toFixed(3)),
        opacity: Number((0.12 + r(13.3) * max).toFixed(3)),
        driftX: Number((r(17.7) * 18 - 9).toFixed(2)),
        driftY: Number((r(19.3) * 22 - 11).toFixed(2))
      };
    });
  }, [count, max, seed]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity
          }}
          animate={{
            y: [-p.driftY, p.driftY, -p.driftY],
            x: [-p.driftX, p.driftX, -p.driftX],
            opacity: [p.opacity, p.opacity * 0.25, p.opacity]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
