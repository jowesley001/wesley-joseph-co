"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type VentureContent = {
  id: string;
  number: string;
  category: string;
  name: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
};

const VENTURE_CONTENT: VentureContent[] = [
  {
    id: "lumina",
    number: "01",
    category: "Production",
    name: "Lumina Media",
    description:
      "Visual storytelling elevated. Photo, video, and podcast production for founders, brands, and modern creators.",
    cta: "Enter Lumina Media",
    href: "/lumina"
  },
  {
    id: "network",
    number: "02",
    category: "Membership",
    name: "Wesley Insider Network",
    description:
      "Connections that create opportunity. A private multi-state membership for operators, owners, and capital allocators.",
    cta: "Enter Network",
    href: "/network"
  },
  {
    id: "insider",
    number: "03",
    category: "Editorial",
    name: "Wesley Insider",
    description:
      "Intelligence. Insight. Advantage. Independent editorial for entrepreneurs and decision makers.",
    cta: "Enter Wesley Insider",
    href: "https://wesleyinsider.com",
    external: true
  }
];

export function VenturesScene() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2);
      py.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  return (
    <div className="relative overflow-x-hidden bg-bg text-ink">
      <SpaceBackdrop px={px} py={py} />
      <Hero />
      <div className="relative z-10 mx-auto max-w-[1480px] px-6 pb-32 md:px-12">
        <div className="flex flex-col gap-12 md:gap-16">
          {VENTURE_CONTENT.map((v, i) => (
            <VenturePanel key={v.id} venture={v} index={i} />
          ))}
        </div>
      </div>
      <EcosystemClose />
      <PageFooter />
    </div>
  );
}

/* ========================================================================== */
/* Space backdrop                                                              */
/* ========================================================================== */

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
};

function makeStars(count: number, seed: number, opts: {
  sizeMin: number;
  sizeMax: number;
  opacityMin: number;
  opacityMax: number;
  driftMax: number;
  durMin: number;
  durMax: number;
}): Star[] {
  return Array.from({ length: count }, (_, i) => {
    const s = (i + 1) * 13 * seed;
    const r = (n: number) => {
      const x = Math.sin(s * n) * 10000;
      return x - Math.floor(x);
    };
    return {
      id: i,
      x: r(2.1) * 100,
      y: r(3.7) * 100,
      size: opts.sizeMin + r(7.3) * (opts.sizeMax - opts.sizeMin),
      opacity: opts.opacityMin + r(11.1) * (opts.opacityMax - opts.opacityMin),
      driftX: (r(13.3) * 2 - 1) * opts.driftMax,
      driftY: (r(17.7) * 2 - 1) * opts.driftMax,
      duration: opts.durMin + r(19.3) * (opts.durMax - opts.durMin),
      delay: r(23.5) * 8
    };
  });
}

function SpaceBackdrop({
  px,
  py
}: {
  px: ReturnType<typeof useMotionValue<number>>;
  py: ReturnType<typeof useMotionValue<number>>;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const distantStars = useMemo(
    () => makeStars(160, 3, { sizeMin: 0.4, sizeMax: 0.9, opacityMin: 0.12, opacityMax: 0.32, driftMax: 4, durMin: 28, durMax: 46 }),
    []
  );
  const farStars = useMemo(
    () => makeStars(110, 7, { sizeMin: 0.7, sizeMax: 1.4, opacityMin: 0.22, opacityMax: 0.5, driftMax: 7, durMin: 22, durMax: 38 }),
    []
  );
  const midStars = useMemo(
    () => makeStars(60, 11, { sizeMin: 1.1, sizeMax: 1.9, opacityMin: 0.35, opacityMax: 0.65, driftMax: 12, durMin: 18, durMax: 30 }),
    []
  );

  const distantX = useTransform(px, (v) => v * -2);
  const distantY = useTransform(py, (v) => v * -2);
  const farX = useTransform(px, (v) => v * -5);
  const farY = useTransform(py, (v) => v * -5);
  const midX = useTransform(px, (v) => v * -12);
  const midY = useTransform(py, (v) => v * -12);

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* Diagonal milky-way nebula band */}
      <motion.div
        className="absolute"
        style={{
          width: "180vmax",
          height: "60vmax",
          left: "-30vmax",
          top: "-10vmax",
          background:
            "linear-gradient(110deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.04) 18%, rgba(255,255,255,0.08) 28%, rgba(255,255,255,0.04) 40%, rgba(0,0,0,0) 60%)",
          transform: "rotate(-8deg)",
          filter: "blur(40px)"
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Soft secondary haze */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 30%, rgba(255,255,255,0.06), rgba(0,0,0,0) 70%)"
        }}
        animate={{ opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute inset-0" style={{ x: distantX, y: distantY }}>
        {distantStars.map((s) => (
          <StarDot key={s.id} star={s} />
        ))}
      </motion.div>
      <motion.div className="absolute inset-0" style={{ x: farX, y: farY }}>
        {farStars.map((s) => (
          <StarDot key={s.id} star={s} />
        ))}
      </motion.div>
      <motion.div className="absolute inset-0" style={{ x: midX, y: midY }}>
        {midStars.map((s) => (
          <StarDot key={s.id} star={s} glow />
        ))}
      </motion.div>
    </div>
  );
}

function StarDot({ star, glow = false }: { star: Star; glow?: boolean }) {
  return (
    <motion.span
      className="absolute rounded-full bg-white"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: star.size,
        height: star.size,
        opacity: star.opacity,
        boxShadow: glow ? "0 0 6px rgba(255,255,255,0.4)" : undefined
      }}
      animate={{
        x: [-star.driftX, star.driftX, -star.driftX],
        y: [-star.driftY, star.driftY, -star.driftY],
        opacity: [star.opacity, star.opacity * 0.4, star.opacity]
      }}
      transition={{
        duration: star.duration,
        delay: star.delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

/* ========================================================================== */
/* Hero — back link, eyebrow, big headline, sub-copy, Saturn-tilted eclipse.   */
/* ========================================================================== */

function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-[1480px] px-6 pb-12 pt-28 md:px-12 md:pb-20 md:pt-36">
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.34em] text-white/70 transition-colors duration-500 hover:text-white"
        >
          <span aria-hidden className="block transition-transform duration-500 group-hover:-translate-x-1">
            ←
          </span>
          <span>Back to home</span>
        </Link>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 0.85, letterSpacing: "0.42em" }}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
            className="font-mono text-[11px] uppercase tracking-[0.42em] text-white md:text-[12px]"
          >
            <span className="text-white">00</span>
            <span className="ml-7 text-white/85">Ventures</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
            className="mt-8 font-display text-[clamp(2.75rem,7.6vw,7.5rem)] font-light leading-[0.96] text-white"
            style={{ textShadow: "0 2px 32px rgba(0,0,0,0.55)" }}
          >
            Three companies.
            <br />
            One thesis.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
            className="mt-8 font-sans text-base leading-relaxed text-white/85"
          >
            Production. Membership. Editorial.
            <br />
            Three pillars. One mission.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, delay: 0.6, ease: EASE }}
          className="relative h-[clamp(280px,38vw,520px)] w-full"
        >
          <SaturnEclipse />
        </motion.div>
      </div>
    </section>
  );
}

/** Hero eclipse with a tilted Saturn-style ring band. */
function SaturnEclipse() {
  // Multiple thin rings stacked with slight vertical offsets to give a
  // Saturn-band feel. Each ring tilts on rotateX so it appears as an
  // ellipse rather than a circle.
  const RING_BANDS = [
    { tilt: 76, sizeY: 32, opacity: 0.32, dur: 110, dotsAt: [-10, 70, 200, 290] },
    { tilt: 76, sizeY: 36, opacity: 0.45, dur: 95, dotsAt: [40, 130, 210, 320] },
    { tilt: 76, sizeY: 40, opacity: 0.55, dur: 80, dotsAt: [60, 180, 260] },
    { tilt: 76, sizeY: 44, opacity: 0.32, dur: 130, dotsAt: [20, 240] }
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Halo behind eclipse */}
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: "55%",
          height: "55%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 35%, rgba(0,0,0,0) 65%)",
          filter: "blur(24px)"
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Saturn-style ring system tilted at 76° on X (read as a thin
          ellipse) — each band is a circle that we squash with scaleY. */}
      {RING_BANDS.map((band, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute"
          style={{
            width: "100%",
            height: "100%",
            transform: `rotateX(${band.tilt}deg) rotateZ(-12deg)`,
            transformStyle: "preserve-3d",
            perspective: "1200px"
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: band.dur, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: `${band.sizeY * 2}%`,
              height: `${band.sizeY * 2}%`,
              border: `1px solid rgba(255,255,255,${band.opacity})`,
              transform: "translate(-50%, -50%)"
            }}
          />
          {/* Dots scattered along the ring */}
          {band.dotsAt.map((deg, j) => {
            const rad = (deg * Math.PI) / 180;
            const cx = 50 + Math.cos(rad) * band.sizeY;
            const cy = 50 + Math.sin(rad) * band.sizeY;
            return (
              <span
                key={j}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${cx}%`,
                  top: `${cy}%`,
                  width: 3,
                  height: 3,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 8px rgba(255,255,255,0.7)",
                  opacity: 0.9
                }}
              />
            );
          })}
        </motion.div>
      ))}

      {/* Eclipse core sits in front of the rings */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10"
        style={{
          width: "26%",
          height: "26%",
          transform: "translate(-50%, -50%)"
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Crescent sun rim (right side) */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 60deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.85) 18deg, rgba(255,255,255,1) 30deg, rgba(255,255,255,0.85) 42deg, rgba(255,255,255,0) 70deg, rgba(255,255,255,0) 360deg)",
            animation: "wjcCrescentSweep 90s linear infinite"
          }}
        />
        {/* Dark sphere */}
        <div
          aria-hidden
          className="absolute rounded-full"
          style={{
            inset: "4%",
            background:
              "radial-gradient(circle at 35% 30%, #1c1c1c 0%, #0b0b0b 45%, #000 75%)",
            boxShadow:
              "0 0 60px 4px rgba(0,0,0,0.9) inset, 0 12px 60px 8px rgba(0,0,0,0.8)"
          }}
        />
      </motion.div>
    </div>
  );
}

/* ========================================================================== */
/* Venture panel — full-width dark card, vertical rail, cinematic visual.      */
/* ========================================================================== */

function VenturePanel({ venture, index }: { venture: VentureContent; index: number }) {
  const [hover, setHover] = useState(false);

  const linkProps = venture.external
    ? { target: "_blank" as const, rel: "noreferrer noopener" }
    : {};

  return (
    <motion.article
      id={venture.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, delay: index * 0.08, ease: EASE }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative overflow-hidden rounded-[2px] border border-white/[0.07] bg-black/40"
      style={{
        boxShadow: hover
          ? "0 24px 80px -32px rgba(255,255,255,0.08), inset 0 0 80px rgba(255,255,255,0.02)"
          : "0 12px 60px -32px rgba(255,255,255,0.04)",
        transition: "box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
      }}
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(360px,46%)_1fr]">
        {/* Left: copy column with vertical rail */}
        <div className="relative px-8 py-12 md:px-14 md:py-20 lg:py-24">
          {/* Vertical rail with dot */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-8 top-12 hidden md:left-14 md:top-20 md:block"
            style={{ height: "calc(100% - 8rem)" }}
          >
            <span className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-[3px] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
            <span className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-white/40 via-white/15 to-transparent" />
          </div>

          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.42em] text-white md:pl-7 md:text-[12px]">
            <span className="text-white">{venture.number}</span>
            <span className="ml-7 text-white/80">{venture.category}</span>
          </p>

          <h2 className="mt-12 font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-light leading-[0.98] text-white md:pl-7">
            {venture.name}
          </h2>

          <p className="mt-7 max-w-md font-sans text-[15px] leading-relaxed text-white/72 md:pl-7 md:text-base">
            {venture.description}
          </p>

          <Link
            href={venture.href}
            {...linkProps}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            className="group mt-12 inline-flex items-center gap-4 outline-none focus-visible:ring-1 focus-visible:ring-white/60 md:pl-7"
          >
            <motion.span
              className="font-mono text-[11px] font-medium uppercase tracking-[0.42em] text-white md:text-[12px]"
              animate={{
                letterSpacing: hover ? "0.48em" : "0.42em",
                textShadow: hover
                  ? "0 0 18px rgba(255,255,255,0.55)"
                  : "0 0 0px rgba(255,255,255,0)"
              }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {venture.cta}
            </motion.span>
            <motion.span
              aria-hidden
              className="font-mono text-[14px] text-white"
              animate={{ x: hover ? 6 : 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              →
            </motion.span>
          </Link>
        </div>

        {/* Right: cinematic visual */}
        <div className="relative aspect-[5/4] w-full overflow-hidden lg:aspect-auto">
          <VentureVisual id={venture.id} hover={hover} />
        </div>
      </div>

      {/* Glowing edge node on the right vertical center */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 rounded-full bg-white"
        style={{ width: 10, height: 10 }}
        animate={{
          scale: hover ? [1, 1.6, 1] : [1, 1.25, 1],
          boxShadow: hover
            ? "0 0 22px rgba(255,255,255,0.95), 0 0 44px rgba(255,255,255,0.5)"
            : "0 0 14px rgba(255,255,255,0.7)"
        }}
        transition={{
          scale: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 0.6, ease: EASE }
        }}
      />

      {/* Plus mark in bottom-right corner */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-4 right-5 z-20 font-mono text-[14px] font-light text-white/55 md:bottom-5 md:right-7"
      >
        +
      </span>
    </motion.article>
  );
}

/* ========================================================================== */
/* Per-venture cinematic visual — abstract greyscale scenes.                   */
/* ========================================================================== */

function VentureVisual({ id, hover }: { id: string; hover: boolean }) {
  if (id === "lumina") return <LuminaVisual hover={hover} />;
  if (id === "network") return <NetworkVisual hover={hover} />;
  return <InsiderVisual hover={hover} />;
}

/** Lumina — cinematic studio with camera silhouette and rim light. */
function LuminaVisual({ hover }: { hover: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_50%_60%,_rgba(255,255,255,0.05)_0%,_rgba(0,0,0,1)_75%)]">
      {/* Soft rim light from upper-right */}
      <motion.div
        className="absolute"
        style={{
          width: "90%",
          height: "90%",
          right: "-10%",
          top: "-10%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 30%, rgba(0,0,0,0) 60%)",
          filter: "blur(28px)"
        }}
        animate={{ opacity: hover ? [0.85, 1, 0.85] : [0.6, 0.85, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Floor light pool */}
      <div
        className="absolute"
        style={{
          inset: "auto 0 -10% 0",
          height: "55%",
          background:
            "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0) 70%)"
        }}
      />

      {/* Camera silhouette + tripod, centered slightly right */}
      <svg
        viewBox="0 0 800 640"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="lumina-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" />
            <stop offset="55%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#3a3a3a" />
          </linearGradient>
          <radialGradient id="lumina-screen" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* Camera body */}
        <g transform="translate(360 220)">
          {/* Lens */}
          <ellipse cx="0" cy="80" rx="120" ry="95" fill="url(#lumina-rim)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
          <ellipse cx="0" cy="80" rx="92" ry="72" fill="#000" stroke="rgba(255,255,255,0.32)" strokeWidth="1" />
          <ellipse cx="0" cy="80" rx="60" ry="48" fill="#050505" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
          {/* Glint on lens */}
          <ellipse cx="-20" cy="60" rx="14" ry="10" fill="rgba(255,255,255,0.18)" />

          {/* Body (right of lens) */}
          <rect x="100" y="-10" width="180" height="180" fill="url(#lumina-rim)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {/* Viewfinder screen flipped out left */}
          <rect x="-280" y="-30" width="170" height="120" fill="#000" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <rect x="-272" y="-22" width="154" height="104" fill="url(#lumina-screen)" />
          {/* Subject silhouette inside the screen */}
          <g transform="translate(-242 6)">
            <circle cx="40" cy="34" r="20" fill="rgba(0,0,0,0.85)" />
            <path d="M0 110 Q40 60 80 110 L80 90 Q40 50 0 90 Z" fill="rgba(0,0,0,0.85)" />
          </g>
          {/* Top mount */}
          <rect x="80" y="-44" width="80" height="40" fill="#0a0a0a" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          {/* Side button */}
          <circle cx="220" cy="40" r="8" fill="rgba(255,255,255,0.2)" />
          <circle cx="220" cy="40" r="3" fill="rgba(255,255,255,0.85)" />
        </g>

        {/* Tripod legs */}
        <g stroke="rgba(255,255,255,0.4)" strokeWidth="2.4" fill="none" strokeLinecap="round">
          <line x1="365" y1="395" x2="270" y2="610" />
          <line x1="395" y1="395" x2="395" y2="610" />
          <line x1="425" y1="395" x2="520" y2="610" />
        </g>
        <circle cx="395" cy="392" r="8" fill="#0a0a0a" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />

        {/* Distant secondary tripod silhouette on the right */}
        <g stroke="rgba(255,255,255,0.18)" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <line x1="700" y1="370" x2="660" y2="600" />
          <line x1="720" y1="370" x2="720" y2="600" />
          <line x1="740" y1="370" x2="780" y2="600" />
        </g>
        <circle cx="720" cy="365" r="6" fill="#0a0a0a" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      </svg>

      <CornerCrop />
    </div>
  );
}

/** Network — earth-night curve with city lights and arcing connections. */
function NetworkVisual({ hover }: { hover: boolean }) {
  // Clusters of "city lights" at the bottom curve, with arcs going up.
  const cities = useMemo(
    () =>
      makeStars(120, 23, {
        sizeMin: 0.7,
        sizeMax: 2.4,
        opacityMin: 0.4,
        opacityMax: 1,
        driftMax: 0,
        durMin: 4,
        durMax: 9
      }),
    []
  );

  // Hand-picked arc endpoints across the bottom band — give the
  // composition a sense of intentional global routes.
  const arcs = [
    { from: { x: 18, y: 78 }, to: { x: 52, y: 60 } },
    { from: { x: 30, y: 82 }, to: { x: 70, y: 64 } },
    { from: { x: 12, y: 70 }, to: { x: 84, y: 70 } },
    { from: { x: 55, y: 80 }, to: { x: 88, y: 58 } },
    { from: { x: 40, y: 84 }, to: { x: 78, y: 76 } },
    { from: { x: 22, y: 86 }, to: { x: 92, y: 78 } }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#040404]">
      {/* Atmospheric glow above the horizon */}
      <motion.div
        className="absolute"
        style={{
          inset: "auto 0 35% 0",
          height: "55%",
          background:
            "radial-gradient(ellipse 90% 100% at 50% 100%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 35%, rgba(0,0,0,0) 70%)",
          filter: "blur(20px)"
        }}
        animate={{ opacity: hover ? [0.9, 1, 0.9] : [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Earth horizon curve — tilted ellipse capping the bottom */}
      <div
        className="absolute"
        style={{
          inset: "55% -10% -40% -10%",
          borderTop: "1px solid rgba(255,255,255,0.18)",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          background:
            "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,1) 100%)"
        }}
      />

      {/* City light dots clustered along the curve */}
      <div className="absolute inset-0">
        {cities.map((c) => {
          // Bias points toward the lower half by squishing y.
          const y = 50 + c.y * 0.5; // 50–100
          return (
            <motion.span
              key={c.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${c.x}%`,
                top: `${y}%`,
                width: c.size,
                height: c.size,
                opacity: c.opacity,
                boxShadow:
                  c.size > 1.6
                    ? "0 0 6px rgba(255,255,255,0.7)"
                    : "0 0 3px rgba(255,255,255,0.4)"
              }}
              animate={{ opacity: [c.opacity, c.opacity * 0.4, c.opacity] }}
              transition={{
                duration: c.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: c.delay
              }}
            />
          );
        })}
      </div>

      {/* Connection arcs */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {arcs.map((a, i) => {
          const midX = (a.from.x + a.to.x) / 2;
          const midY = Math.min(a.from.y, a.to.y) - 20;
          return (
            <g key={i}>
              <motion.path
                d={`M ${a.from.x} ${a.from.y} Q ${midX} ${midY} ${a.to.x} ${a.to.y}`}
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="0.18"
                fill="none"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 2.4, delay: 0.4 + i * 0.18, ease: "easeOut" }}
              />
              {/* Endpoint highlights */}
              <circle cx={a.from.x} cy={a.from.y} r="0.5" fill="white" opacity="0.95" />
              <circle cx={a.to.x} cy={a.to.y} r="0.5" fill="white" opacity="0.95" />
            </g>
          );
        })}
      </svg>

      <CornerCrop />
    </div>
  );
}

/** Insider — layered editorial spreads with sample article energy. */
function InsiderVisual({ hover }: { hover: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_60%_70%_at_30%_60%,_rgba(255,255,255,0.07)_0%,_rgba(0,0,0,1)_75%)]">
      {/* Soft glow behind */}
      <motion.div
        className="absolute"
        style={{
          inset: "10% 5% 10% 5%",
          background:
            "radial-gradient(ellipse 70% 90% at 30% 50%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(24px)"
        }}
        animate={{ opacity: hover ? [0.85, 1, 0.85] : [0.55, 0.85, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Faint orbital ring across the panel */}
      <motion.div
        aria-hidden
        className="absolute"
        style={{
          width: "150%",
          height: "150%",
          left: "-25%",
          top: "-25%",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "50%"
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 220, repeat: Infinity, ease: "linear" }}
      />

      {/* Layered article spreads */}
      <div className="absolute inset-0">
        {/* Primary — large left card */}
        <motion.div
          className="absolute overflow-hidden border border-white/[0.12] bg-black/60 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.9)]"
          style={{ left: "8%", top: "16%", width: "48%", height: "62%" }}
          animate={{ y: [-3, 4, -3] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Header band */}
          <div className="absolute inset-x-3 top-3 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.32em] text-white/55 md:text-[8px]">
            <span>Wesley Insider</span>
            <span>May 21, 2026</span>
          </div>
          <div className="absolute inset-x-3 top-9 h-px bg-white/15" />

          {/* Headline */}
          <p className="absolute inset-x-3 top-12 font-display text-[clamp(0.95rem,1.6vw,1.3rem)] font-normal leading-[1.05] text-white">
            The signal beneath the cycle.
          </p>

          {/* Body lines */}
          <div className="absolute inset-x-3" style={{ top: "55%" }}>
            <p className="font-display text-[10px] italic leading-snug text-white/70">
              Discipline over urgency.
              <br />
              Always.
            </p>
            <div className="mt-3 space-y-1.5">
              {[78, 92, 82, 70, 88, 64].map((w, i) => (
                <div
                  key={i}
                  className="h-[1.5px]"
                  style={{
                    width: `${w}%`,
                    background: `rgba(255,255,255,${0.16 + (i % 3) * 0.06})`
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Secondary — top-right card */}
        <motion.div
          className="absolute overflow-hidden border border-white/[0.10] bg-black/60 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.9)]"
          style={{
            left: "60%",
            top: "10%",
            width: "34%",
            height: "38%",
            transform: "rotate(2deg)"
          }}
          animate={{ y: [4, -3, 4], rotate: [2, 1.4, 2] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-x-3 top-3 font-mono text-[7px] uppercase tracking-[0.32em] text-white/55 md:text-[8px]">
            Markets
          </div>
          <p className="absolute inset-x-3 top-7 font-display text-[clamp(0.85rem,1.3vw,1.1rem)] font-normal leading-[1.05] text-white">
            Patience is
            <br />
            a position. Stillness
            <br />
            is leverage.
          </p>
          <div className="absolute bottom-3 left-3 right-3 space-y-1">
            {[68, 80, 56].map((w, i) => (
              <div
                key={i}
                className="h-[1.5px]"
                style={{
                  width: `${w}%`,
                  background: "rgba(255,255,255,0.18)"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Tertiary — bottom-right card */}
        <motion.div
          className="absolute overflow-hidden border border-white/[0.08] bg-black/55 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.9)]"
          style={{
            left: "62%",
            top: "54%",
            width: "32%",
            height: "32%",
            transform: "rotate(-1.5deg)"
          }}
          animate={{ y: [-2, 4, -2], rotate: [-1.5, -2.2, -1.5] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-x-3 top-3 font-mono text-[7px] uppercase tracking-[0.32em] text-white/55 md:text-[8px]">
            Operators
          </div>
          <p className="absolute inset-x-3 top-7 font-display text-[clamp(0.78rem,1.2vw,1rem)] font-normal leading-[1.05] text-white">
            Distribution decides
            <br />
            everything.
          </p>
          <div className="absolute bottom-3 left-3 right-3 space-y-1">
            {[60, 72, 48, 80].map((w, i) => (
              <div
                key={i}
                className="h-[1.5px]"
                style={{
                  width: `${w}%`,
                  background: "rgba(255,255,255,0.15)"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <CornerCrop />
    </div>
  );
}

function CornerCrop() {
  // Subtle corner crop marks for editorial framing inside each panel.
  return (
    <>
      {(
        [
          { top: 0, left: 0, brT: true, brL: true },
          { top: 0, right: 0, brT: true, brR: true },
          { bottom: 0, left: 0, brB: true, brL: true },
          { bottom: 0, right: 0, brB: true, brR: true }
        ] as Array<{
          top?: number;
          right?: number;
          bottom?: number;
          left?: number;
          brT?: boolean;
          brR?: boolean;
          brB?: boolean;
          brL?: boolean;
        }>
      ).map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute"
          style={{
            top: c.top,
            right: c.right,
            bottom: c.bottom,
            left: c.left,
            width: 14,
            height: 14,
            borderTop: c.brT ? "1px solid rgba(255,255,255,0.4)" : undefined,
            borderRight: c.brR ? "1px solid rgba(255,255,255,0.4)" : undefined,
            borderBottom: c.brB ? "1px solid rgba(255,255,255,0.4)" : undefined,
            borderLeft: c.brL ? "1px solid rgba(255,255,255,0.4)" : undefined
          }}
        />
      ))}
    </>
  );
}

/* ========================================================================== */
/* Ecosystem close — small orbital diagram + closing manifesto.                */
/* ========================================================================== */

function EcosystemClose() {
  return (
    <section className="relative z-10 mx-auto max-w-[1480px] px-6 pb-32 pt-16 md:px-12 md:pb-40 md:pt-24">
      {/* Small centered orbital diagram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="relative mx-auto"
        style={{ width: "min(48vmin, 420px)", height: "min(20vmin, 180px)" }}
      >
        {/* Concentric ring ellipses */}
        {[1, 0.78, 0.55, 0.32].map((s, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: `${s * 100}%`,
              height: `${s * 50}%`,
              border: `1px solid rgba(255,255,255,${0.18 + i * 0.04})`,
              transform: "translate(-50%, -50%)"
            }}
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}
        {/* Central bright dot */}
        <motion.span
          aria-hidden
          className="absolute left-1/2 top-1/2 rounded-full bg-white"
          style={{
            width: 6,
            height: 6,
            transform: "translate(-50%, -50%)",
            boxShadow:
              "0 0 16px rgba(255,255,255,0.95), 0 0 36px rgba(255,255,255,0.5)"
          }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr] md:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <h2 className="font-mono text-[clamp(1.4rem,2.8vw,2.6rem)] font-medium uppercase leading-[1.05] tracking-[0.18em] text-white">
            One Ecosystem
            <br />
            Built to Compound.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          className="self-end"
        >
          <p className="font-display text-[clamp(1.2rem,1.8vw,1.85rem)] font-light leading-snug text-white/95">
            Different vehicles.
            <br />
            <span className="text-white/75">Same standard.</span>
            <br />
            <span className="text-white/55">Long term impact.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Footer — three-column page footer.                                          */
/* ========================================================================== */

function PageFooter() {
  return (
    <footer className="relative z-10 mx-auto max-w-[1680px] px-6 pb-12 md:px-12">
      <div className="grid grid-cols-2 items-center gap-4 border-t border-white/[0.08] pt-8 md:grid-cols-3">
        <Link
          href="/"
          className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.34em] text-white"
        >
          <motion.span
            aria-hidden
            className="block h-1.5 w-1.5 rounded-full bg-white"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>Wesley Joseph</span>
        </Link>
        <p className="hidden justify-self-center font-mono text-[11px] uppercase tracking-[0.32em] text-white/65 md:block">
          The infrastructure for modern influence
        </p>
        <p className="justify-self-end font-mono text-[10px] uppercase tracking-[0.28em] text-white/55 md:text-[11px]">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}
