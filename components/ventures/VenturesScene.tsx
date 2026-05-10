"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Venture = {
  id: "lumina" | "network" | "insider" | "creative";
  number: string;
  category: string;
  name: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
};

const VENTURES: Venture[] = [
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
  },
  {
    id: "creative",
    number: "04",
    category: "Creators",
    name: "Creative Community",
    description:
      "A community for creators building brands, content, and creative businesses.",
    cta: "Enter Creative Community",
    href: "/creative-community"
  }
];

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

export function VenturesScene() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      px.set((event.clientX / window.innerWidth - 0.5) * 2);
      py.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackdrop px={px} py={py} />
      <Hero px={px} py={py} />

      <section className="relative z-10 mx-auto max-w-[1536px] px-6 pb-12 md:px-8">
        <div className="flex flex-col gap-2">
          {VENTURES.map((venture, index) => (
            <VenturePanel key={venture.id} venture={venture} index={index} />
          ))}
        </div>
      </section>

      <EcosystemClose />
    </div>
  );
}

function seeded(seed: number, n: number) {
  const x = Math.sin(seed * n) * 10000;
  return x - Math.floor(x);
}

function makeStars(
  count: number,
  seed: number,
  opts: {
    sizeMin: number;
    sizeMax: number;
    opacityMin: number;
    opacityMax: number;
    driftMax: number;
    durMin: number;
    durMax: number;
  }
): Star[] {
  return Array.from({ length: count }, (_, index) => {
    const s = (index + 1) * seed * 17;
    return {
      id: index,
      x: seeded(s, 2.11) * 100,
      y: seeded(s, 3.73) * 100,
      size: opts.sizeMin + seeded(s, 7.39) * (opts.sizeMax - opts.sizeMin),
      opacity:
        opts.opacityMin +
        seeded(s, 11.19) * (opts.opacityMax - opts.opacityMin),
      driftX: (seeded(s, 13.31) * 2 - 1) * opts.driftMax,
      driftY: (seeded(s, 17.71) * 2 - 1) * opts.driftMax,
      duration: opts.durMin + seeded(s, 19.33) * (opts.durMax - opts.durMin),
      delay: seeded(s, 23.57) * 8
    };
  });
}

function SpaceBackdrop({
  px,
  py
}: {
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  const distantStars = useMemo(
    () =>
      makeStars(190, 3, {
        sizeMin: 0.35,
        sizeMax: 0.95,
        opacityMin: 0.12,
        opacityMax: 0.34,
        driftMax: 5,
        durMin: 28,
        durMax: 52
      }),
    []
  );
  const nearStars = useMemo(
    () =>
      makeStars(115, 11, {
        sizeMin: 0.8,
        sizeMax: 1.8,
        opacityMin: 0.26,
        opacityMax: 0.72,
        driftMax: 14,
        durMin: 18,
        durMax: 34
      }),
    []
  );
  const dust = useMemo(
    () =>
      makeStars(100, 37, {
        sizeMin: 0.4,
        sizeMax: 1.2,
        opacityMin: 0.05,
        opacityMax: 0.22,
        driftMax: 24,
        durMin: 32,
        durMax: 68
      }),
    []
  );

  const distantX = useTransform(px, (value) => value * -2);
  const distantY = useTransform(py, (value) => value * -2);
  const nearX = useTransform(px, (value) => value * -10);
  const nearY = useTransform(py, (value) => value * -8);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-black">
      <motion.div
        className="absolute"
        style={{
          width: "190vmax",
          height: "58vmax",
          left: "-46vmax",
          top: "5vmax",
          rotate: "-28deg",
          background:
            "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.025) 28%, rgba(255,255,255,0.10) 44%, rgba(255,255,255,0.035) 58%, rgba(255,255,255,0) 78%)",
          filter: "blur(34px)"
        }}
        animate={{ x: [-18, 22, -18], opacity: [0.56, 0.9, 0.56] }}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 42% at 66% 12%, rgba(255,255,255,0.075), rgba(0,0,0,0) 65%), radial-gradient(ellipse 42% 48% at 45% 92%, rgba(255,255,255,0.045), rgba(0,0,0,0) 70%)"
        }}
        animate={{ opacity: [0.64, 1, 0.64] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div className="absolute inset-0" style={{ x: distantX, y: distantY }}>
        {distantStars.map((star) => (
          <StarDot key={star.id} star={star} />
        ))}
      </motion.div>

      <motion.div className="absolute inset-0" style={{ x: nearX, y: nearY }}>
        {nearStars.map((star) => (
          <StarDot key={star.id} star={star} glow />
        ))}
      </motion.div>

      <div className="absolute inset-0">
        {dust.map((star) => (
          <StarDot key={star.id} star={star} />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.14)_52%,rgba(0,0,0,0.86)_100%)]" />
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
        boxShadow: glow ? "0 0 8px rgba(255,255,255,0.48)" : undefined
      }}
      animate={{
        x: [-star.driftX, star.driftX, -star.driftX],
        y: [-star.driftY, star.driftY, -star.driftY],
        opacity: [star.opacity, star.opacity * 0.42, star.opacity]
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

function Hero({
  px,
  py
}: {
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  const orbitX = useTransform(px, (value) => value * -18);
  const orbitY = useTransform(py, (value) => value * -10);

  return (
    <section className="relative z-10 mx-auto max-w-[1536px] px-6 pb-5 pt-[86px] md:px-8 md:pb-6 md:pt-[90px]">
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.34em] text-white/72 transition-colors duration-500 hover:text-white"
        >
          <span
            aria-hidden
            className="transition-transform duration-500 group-hover:-translate-x-1"
          >
            ←
          </span>
          <span>Back to home</span>
        </Link>
      </motion.div>

      <div className="mt-7 grid min-h-[220px] grid-cols-1 items-start gap-8 md:grid-cols-[0.76fr_1.24fr] lg:min-h-[220px]">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
            className="font-mono text-[10px] uppercase tracking-[0.42em] text-white/84"
          >
            <span className="text-white">00</span>
            <span className="ml-7">Ventures</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.45, delay: 0.24, ease: EASE }}
            className="mt-7 max-w-[720px] font-display text-[clamp(3.15rem,4.45vw,5.55rem)] font-light leading-[0.92] text-white"
          >
            Four ventures.
            <br />
            One thesis.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.62, ease: EASE }}
            className="mt-8 max-w-sm text-[13px] leading-relaxed text-white/82 md:text-sm"
          >
            Production. Membership. Editorial. Creators.
            <br />
            Four vehicles. One standard.
          </motion.p>
        </div>

        <motion.div
          className="relative h-[230px] md:h-[260px] lg:h-[276px]"
          style={{ x: orbitX, y: orbitY }}
          initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.9, delay: 0.36, ease: EASE }}
        >
          <HeroOrbit />
        </motion.div>
      </div>
    </section>
  );
}

function HeroOrbit() {
  const orbitDots = [
    { x: 17, y: 62, size: 5 },
    { x: 42, y: 30, size: 4 },
    { x: 65, y: 76, size: 3 },
    { x: 88, y: 52, size: 5 }
  ];

  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[68%] w-[108%] -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: [-2, 1.5, -2], scale: [1, 1.018, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      >
        {[0, 1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute left-1/2 top-1/2 rounded-full border border-white/20"
            style={{
              width: `${92 - ring * 14}%`,
              height: `${46 - ring * 6}%`,
              transform: `translate(-50%, -50%) rotate(${-8 + ring * 5}deg)`,
              opacity: 0.46 - ring * 0.055
            }}
            animate={{ opacity: [0.24, 0.48 - ring * 0.05, 0.24] }}
            transition={{
              duration: 7 + ring * 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: ring * 0.35
            }}
          />
        ))}

        {orbitDots.map((dot, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
              boxShadow:
                "0 0 14px rgba(255,255,255,0.95), 0 0 36px rgba(255,255,255,0.36)"
            }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.18, 1] }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.7
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute left-[54%] top-[49%] h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[190px] md:w-[190px]"
        animate={{ scale: [1, 1.035, 1] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute -inset-[30%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.20),rgba(255,255,255,0.04)_36%,rgba(0,0,0,0)_68%)] blur-xl" />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 8deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.02) 154deg, rgba(255,255,255,0.92) 182deg, rgba(255,255,255,0) 218deg, rgba(255,255,255,0) 360deg)"
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-[4px] rounded-full bg-[radial-gradient(circle_at_35%_28%,#171717_0%,#060606_48%,#000_78%)] shadow-[inset_-18px_-10px_40px_rgba(255,255,255,0.025),inset_22px_18px_70px_rgba(0,0,0,0.98),0_20px_70px_rgba(0,0,0,0.8)]" />
      </motion.div>
    </div>
  );
}

function VenturePanel({ venture, index }: { venture: Venture; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      id={venture.id}
      initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 1.15, delay: index * 0.06, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative min-h-[520px] overflow-hidden rounded-[6px] border border-white/[0.14] bg-black/54 shadow-[0_24px_90px_-60px_rgba(255,255,255,0.28)] transition-colors duration-700 hover:border-white/[0.28] md:min-h-0 md:h-[288px]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.92)_26%,rgba(0,0,0,0.52)_48%,rgba(0,0,0,0.16)_100%)]" />

      <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-[36%_64%]">
        <PanelCopy venture={venture} hovered={hovered} />
        <div className="relative min-h-[260px] overflow-hidden md:min-h-0">
          <VentureVisual id={venture.id} hovered={hovered} />
        </div>
      </div>

      <PanelOrbit hovered={hovered} />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-7 right-7 z-20 font-mono text-lg text-white/55 transition-colors duration-500 group-hover:text-white"
      >
        +
      </span>
    </motion.article>
  );
}

function PanelCopy({
  venture,
  hovered
}: {
  venture: Venture;
  hovered: boolean;
}) {
  return (
    <div className="relative z-20 flex h-full flex-col px-8 py-10 md:px-10 md:py-9 lg:px-12">
      <div
        aria-hidden
        className="absolute left-10 top-[72px] hidden h-[168px] w-px bg-gradient-to-b from-white/55 via-white/25 to-transparent md:block lg:left-12"
      >
        <motion.span
          className="absolute left-1/2 top-[42px] h-4 w-4 -translate-x-1/2 rounded-full border border-white/55 bg-black shadow-[0_0_18px_rgba(255,255,255,0.72)]"
          animate={{ scale: hovered ? [1, 1.15, 1] : [1, 1.08, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,1)]" />
        </motion.span>
      </div>

      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.42em] text-white/82 md:pl-12"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <span className="text-white">{venture.number}</span>
        <span className="ml-7">{venture.category}</span>
      </motion.p>

      <motion.h2
        className="mt-9 max-w-[390px] font-display text-[clamp(2.35rem,3.1vw,3.85rem)] font-light leading-[0.96] text-white md:pl-12"
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 1.08, delay: 0.08, ease: EASE }}
      >
        {venture.name}
      </motion.h2>

      <motion.p
        className="mt-7 max-w-[330px] text-[13px] leading-relaxed text-white/78 md:pl-12"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 1, delay: 0.15, ease: EASE }}
      >
        {venture.description}
      </motion.p>

      <Link
        href={venture.href}
        {...(venture.external
          ? { target: "_blank" as const, rel: "noreferrer noopener" }
          : {})}
        className="mt-auto inline-flex w-fit items-center gap-4 pb-1 pt-10 font-mono text-[10px] uppercase tracking-[0.42em] text-white outline-none transition-colors duration-500 hover:text-white/80 focus-visible:ring-1 focus-visible:ring-white/70 md:pl-12"
      >
        <motion.span
          animate={{
            textShadow: hovered
              ? "0 0 18px rgba(255,255,255,0.55)"
              : "0 0 0 rgba(255,255,255,0)"
          }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {venture.cta}
        </motion.span>
        <motion.span
          aria-hidden
          animate={{ x: hovered ? 7 : 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          →
        </motion.span>
      </Link>
    </div>
  );
}

function VentureVisual({
  id,
  hovered
}: {
  id: Venture["id"];
  hovered: boolean;
}) {
  if (id === "network") return <NetworkVisual hovered={hovered} />;
  if (id === "insider") return <InsiderVisual hovered={hovered} />;
  if (id === "creative") return <CreativeVisual hovered={hovered} />;
  return <LuminaVisual hovered={hovered} />;
}

function ImagePlate({
  src,
  hovered,
  position = "center"
}: {
  src: string;
  hovered: boolean;
  position?: string;
}) {
  return (
    <motion.div
      className="absolute inset-0 bg-cover bg-center grayscale"
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: position,
        filter: hovered
          ? "grayscale(1) contrast(1.18) brightness(0.86)"
          : "grayscale(1) contrast(1.06) brightness(0.68)"
      }}
      animate={{
        scale: hovered ? 1.075 : 1.035,
        x: hovered ? -8 : 0,
        y: hovered ? -3 : 0
      }}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}

function LuminaVisual({ hovered }: { hovered: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <ImagePlate
        src="/ventures/lumina-media.png"
        hovered={hovered}
        position="center right"
      />
      <VisualTreatment hovered={hovered} />
      <motion.div
        className="absolute left-[6%] top-[12%] h-20 w-20 rounded-full bg-white/10 blur-3xl"
        animate={{ opacity: [0.28, 0.58, 0.28], scale: [1, 1.16, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function NetworkVisual({ hovered }: { hovered: boolean }) {
  const arcs = [
    { start: [12, 74], end: [48, 52], peak: [30, 35] },
    { start: [20, 68], end: [73, 48], peak: [44, 27] },
    { start: [31, 78], end: [91, 58], peak: [63, 26] },
    { start: [44, 73], end: [79, 78], peak: [62, 53] },
    { start: [57, 62], end: [24, 83], peak: [43, 50] },
    { start: [72, 70], end: [96, 46], peak: [86, 42] }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <ImagePlate
        src="/ventures/wesley-insider-network.png"
        hovered={hovered}
        position="center right"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.58)_34%,rgba(0,0,0,0.12)_68%,rgba(0,0,0,0.04)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_58%,rgba(255,255,255,0.16),rgba(255,255,255,0.035)_34%,rgba(0,0,0,0)_72%)]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {arcs.map((arc, index) => (
          <motion.path
            key={index}
            d={`M ${arc.start[0]} ${arc.start[1]} Q ${arc.peak[0]} ${arc.peak[1]} ${arc.end[0]} ${arc.end[1]}`}
            fill="none"
            stroke="rgba(255,255,255,0.72)"
            strokeWidth="0.22"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 2.6, delay: 0.18 + index * 0.17, ease: "easeOut" }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 72% 48%, rgba(255,255,255,0.14), rgba(255,255,255,0.03) 36%, rgba(0,0,0,0) 70%)",
          mixBlendMode: "screen"
        }}
        animate={{ opacity: hovered ? [0.3, 0.55, 0.3] : [0.16, 0.32, 0.16] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function InsiderVisual({ hovered }: { hovered: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <ImagePlate
        src="/ventures/wesley-insider-editorial.png"
        hovered={hovered}
        position="center"
      />
      <div className="absolute inset-0 bg-black/34" />
      <ArticleStack hovered={hovered} />
      <VisualTreatment hovered={hovered} />
    </div>
  );
}

function CreativeVisual({ hovered }: { hovered: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <ImagePlate
        src="/ventures/creative-community.png"
        hovered={hovered}
        position="center right"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.48)_36%,rgba(0,0,0,0.12)_72%,rgba(0,0,0,0.04)_100%)]" />
      <VisualTreatment hovered={hovered} />
      <motion.div
        className="absolute right-[10%] top-[20%] h-28 w-28 rounded-full border border-white/24"
        animate={{ rotate: 360, scale: hovered ? [1, 1.07, 1] : [1, 1.035, 1] }}
        transition={{
          rotate: { duration: 34, repeat: Infinity, ease: "linear" },
          scale: { duration: 6.4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      <motion.div
        className="absolute bottom-[18%] left-[42%] h-px w-[45%] bg-gradient-to-r from-transparent via-white/34 to-transparent"
        animate={{ opacity: hovered ? [0.26, 0.72, 0.26] : [0.16, 0.38, 0.16] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ArticleStack({ hovered }: { hovered: boolean }) {
  const cards = [
    {
      className:
        "left-[10%] top-[10%] h-[72%] w-[39%] -rotate-[8deg] md:left-[6%]",
      kicker: "Wesley Insider / May 15, 2024",
      title: "The leverage layer most founders ignore.",
      deck: "Systems over tactics. Always."
    },
    {
      className: "right-[8%] top-[12%] h-[42%] w-[31%] rotate-[4deg]",
      kicker: "Capital",
      title: "Capital moves in silence. Position out loud.",
      deck: "Signals before consensus."
    },
    {
      className: "right-[2%] bottom-[8%] h-[38%] w-[37%] -rotate-[5deg]",
      kicker: "Ownership",
      title: "Ownership is the ultimate multiplier.",
      deck: "Control the asset. Compound the signal."
    }
  ];

  return (
    <motion.div
      className="absolute inset-0"
      animate={{ x: hovered ? -6 : 0, y: hovered ? -2 : 0, scale: hovered ? 1.035 : 1 }}
      transition={{ duration: 1.15, ease: EASE }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          className={`absolute border border-white/[0.16] bg-black/68 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.76)] backdrop-blur-[2px] ${card.className}`}
          animate={{
            y: index % 2 === 0 ? [-3, 4, -3] : [4, -3, 4],
            rotate: index === 0 ? [-8, -7.25, -8] : index === 1 ? [4, 3.35, 4] : [-5, -5.8, -5]
          }}
          transition={{
            duration: 13 + index * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <p className="font-mono text-[6px] uppercase tracking-[0.28em] text-white/52 md:text-[7px]">
            {card.kicker}
          </p>
          <p className="mt-4 font-display text-[clamp(1rem,1.85vw,1.55rem)] leading-[1.02] text-white">
            {card.title}
          </p>
          <p className="mt-5 max-w-[13rem] font-display text-sm leading-tight text-white/62">
            {card.deck}
          </p>
          <div className="mt-4 space-y-1.5">
            {[84, 68, 78].map((width) => (
              <span
                key={width}
                className="block h-px bg-white/14"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function VisualTreatment({ hovered }: { hovered: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_33%,rgba(0,0,0,0)_68%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.24)_36%,rgba(0,0,0,0.34)_100%)]" />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 68% 44%, rgba(255,255,255,0.18), rgba(255,255,255,0.03) 32%, rgba(0,0,0,0) 70%)",
          mixBlendMode: "screen"
        }}
        animate={{ opacity: hovered ? [0.42, 0.74, 0.42] : [0.18, 0.38, 0.18] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function PanelOrbit({ hovered }: { hovered: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <svg
        className="absolute -right-8 top-1/2 h-[235px] w-[235px] -translate-y-1/2 md:h-[260px] md:w-[260px]"
        viewBox="0 0 260 260"
        fill="none"
      >
        <motion.ellipse
          cx="132"
          cy="130"
          rx="115"
          ry="72"
          transform="rotate(-16 132 130)"
          stroke="rgba(255,255,255,0.34)"
          strokeWidth="0.8"
          strokeDasharray="1 0"
          animate={{ opacity: hovered ? [0.42, 0.86, 0.42] : [0.22, 0.46, 0.22] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <motion.span
        className="absolute right-8 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border border-white/38 bg-black/40 shadow-[0_0_26px_rgba(255,255,255,0.28)] backdrop-blur-sm"
        animate={{ scale: hovered ? [1, 1.1, 1] : [1, 1.04, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,1),0_0_34px_rgba(255,255,255,0.55)]" />
      </motion.span>
    </div>
  );
}

function EcosystemClose() {
  return (
    <section className="relative z-10 mx-auto max-w-[1536px] px-6 pb-20 pt-16 md:px-8 md:pb-24 md:pt-20">
      <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.05fr_0.9fr]">
        <motion.h2
          className="font-mono text-[17px] uppercase leading-[1.85] tracking-[0.42em] text-white md:pl-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          One ecosystem
          <br />
          built to compound.
        </motion.h2>

        <MiniOrbit />

        <motion.p
          className="max-w-sm text-base leading-relaxed text-white/82 md:justify-self-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.1, delay: 0.12, ease: EASE }}
        >
          Different vehicles.
          <br />
          Same standard.
          <br />
          Long term impact.
        </motion.p>
      </div>
    </section>
  );
}

function MiniOrbit() {
  return (
    <motion.div
      className="relative mx-auto h-[190px] w-full max-w-[420px]"
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      {[0, 1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute left-1/2 top-1/2 rounded-full border border-white/20"
          style={{
            width: `${90 - ring * 16}%`,
            height: `${50 - ring * 8}%`,
            transform: "translate(-50%, -50%)"
          }}
          animate={{ opacity: [0.28, 0.62, 0.28] }}
          transition={{
            duration: 7 + ring * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ring * 0.32
          }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 h-px w-[88%] -translate-x-1/2 bg-white/16" />
      <div className="absolute left-1/2 top-[15%] h-[70%] w-px -translate-x-1/2 bg-white/12" />
      <motion.span
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,1),0_0_48px_rgba(255,255,255,0.42)]"
        animate={{ scale: [1, 1.35, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {[18, 36, 64, 82].map((x, index) => (
        <motion.span
          key={x}
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/90 shadow-[0_0_14px_rgba(255,255,255,0.8)]"
          style={{ left: `${x}%` }}
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.6
          }}
        />
      ))}
    </motion.div>
  );
}
