"use client";

import { motion } from "framer-motion";

type Props = {
  className?: string;
  showFooter?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function seededStars(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const noise = (seed: number) => {
      const value = Math.sin((index + 1) * seed) * 10000;
      return value - Math.floor(value);
    };

    return {
      id: index,
      left: `${(noise(12.91) * 100).toFixed(2)}%`,
      top: `${(noise(27.17) * 100).toFixed(2)}%`,
      size: 0.7 + noise(7.33) * 1.8,
      opacity: 0.18 + noise(3.67) * 0.6,
      duration: 9 + noise(19.13) * 14,
      delay: noise(5.77) * 5
    };
  });
}

const stars = seededStars(120);

export function EclipseIntroFallback({ className = "", showFooter = true }: Props) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 58% 48%, rgba(255,255,255,0.18), rgba(255,255,255,0.055) 17%, rgba(0,0,0,0) 43%), radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.07), rgba(0,0,0,0) 34%), radial-gradient(ellipse at center, rgba(0,0,0,0) 42%, rgba(0,0,0,0.92) 100%)"
        }}
      />

      {stars.map((star) => (
        <motion.span
          key={star.id}
          aria-hidden
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity
          }}
          animate={{ opacity: [star.opacity, star.opacity * 0.35, star.opacity] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div
        aria-hidden
        className="absolute left-[58%] top-1/2"
        style={{
          width: "min(44vw, 34rem)",
          height: "min(44vw, 34rem)"
        }}
        initial={{ opacity: 0, scale: 0.86, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        transition={{ duration: 3.2, ease: EASE }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-[58%] w-[170%] rounded-full border border-white/[0.16]"
          style={{ x: "-50%", y: "-50%", rotate: -11 }}
          animate={{ rotate: 349, scale: [1, 1.025, 1] }}
          transition={{
            rotate: { duration: 70, repeat: Infinity, ease: "linear" },
            scale: { duration: 9, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[42%] w-[142%] rounded-full border border-white/[0.1]"
          style={{ x: "-50%", y: "-50%", rotate: 9 }}
          animate={{ rotate: -351 }}
          transition={{ duration: 88, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[30%] w-[118%] rounded-full border border-white/[0.075]"
          style={{ x: "-50%", y: "-50%", rotate: 23 }}
          animate={{ rotate: 383 }}
          transition={{ duration: 104, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 aspect-square w-[42%] rounded-full bg-black"
          style={{
            x: "-50%",
            y: "-50%",
            boxShadow:
              "inset 34px 0 58px rgba(255,255,255,0.08), inset -42px -32px 70px rgba(255,255,255,0.03), 0 0 80px rgba(255,255,255,0.08)"
          }}
          animate={{ scale: [1, 1.025, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="absolute right-[5%] top-1/2 h-[92%] w-[16%] -translate-y-1/2 rounded-full bg-white blur-[2px]"
            style={{ boxShadow: "0 0 34px rgba(255,255,255,0.82)" }}
            animate={{ opacity: [0.56, 0.92, 0.56] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="absolute inset-[2%] rounded-full bg-[radial-gradient(circle_at_62%_42%,rgba(255,255,255,0.12),rgba(0,0,0,0.32)_34%,rgba(0,0,0,0.94)_70%)]" />
        </motion.div>
      </motion.div>

      {showFooter ? (
        <motion.div
          className="pointer-events-none absolute bottom-10 left-8 right-8 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.34em] text-white/55 md:left-12 md:right-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.2, ease: EASE }}
        >
          <span>Wesley Joseph</span>
          <span className="hidden md:inline">The Infrastructure For Modern Influence</span>
        </motion.div>
      ) : null}
    </div>
  );
}
