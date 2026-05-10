"use client";

import Link from "next/link";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useMemo, type ReactNode } from "react";

type VentureLink = {
  label: string;
  href: string;
  external?: boolean;
};

type IconName =
  | "camera"
  | "video"
  | "podcast"
  | "clips"
  | "kit"
  | "event"
  | "connection"
  | "opportunity"
  | "intro"
  | "resource"
  | "editorial"
  | "intelligence"
  | "wealth"
  | "brand"
  | "faith"
  | "community"
  | "education"
  | "visibility"
  | "lightning";

type Capability = {
  title: string;
  body: string;
  icon: IconName;
};

type Visual = {
  src: string;
  alt: string;
  position?: string;
};

type ShellProps = {
  children: ReactNode;
  title: string;
};

type HeroProps = {
  index: string;
  name: string;
  positioning: string;
  cta: VentureLink;
  visual: Visual;
  kicker?: string;
};

type ManifestoProps = {
  statement: string;
  visual?: Visual;
  body?: string;
  label?: string;
  centered?: boolean;
};

type CapabilitiesProps = {
  label: string;
  items: Capability[];
};

type VisualPanelProps = {
  visual: Visual;
  headline: string;
  body: string;
  cta?: VentureLink;
};

type CollagePanelProps = {
  label: string;
  headline: string;
  visuals: Visual[];
};

type CTAProps = {
  kicker: string;
  line: string;
  cta: VentureLink;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  { label: "Ventures", href: "/ventures" },
  { label: "About", href: "/" },
  { label: "Journal", href: "/insider" },
  { label: "Contact", href: "mailto:hello@wesleyjoseph.co" }
];

function ExternalLink({
  href,
  external,
  className,
  children
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  if (external || href.startsWith("http")) {
    return (
      <Link href={href} target="_blank" rel="noreferrer noopener" className={className}>
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Arrow() {
  return (
    <motion.span
      aria-hidden
      className="inline-block"
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      {"→"}
    </motion.span>
  );
}

function TextCTA({ cta, className = "" }: { cta: VentureLink; className?: string }) {
  return (
    <ExternalLink
      href={cta.href}
      external={cta.external}
      className={`group inline-flex w-fit items-center gap-5 border-b border-white/28 pb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white transition-all duration-500 hover:border-white hover:tracking-[0.32em] md:text-[11px] ${className}`}
    >
      <span>{cta.label}</span>
      <Arrow />
    </ExternalLink>
  );
}

function BoxCTA({ cta, className = "" }: { cta: VentureLink; className?: string }) {
  return (
    <ExternalLink
      href={cta.href}
      external={cta.external}
      className={`group inline-flex min-h-14 items-center justify-center gap-6 border border-white/28 bg-white/[0.035] px-7 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-black md:px-10 md:text-[11px] ${className}`}
    >
      <span>{cta.label}</span>
      <Arrow />
    </ExternalLink>
  );
}

function PageChrome({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: EASE }}
      className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.14] bg-black/28 backdrop-blur-md"
    >
      <div className="mx-auto grid h-20 max-w-[1800px] grid-cols-[1fr_auto] items-center px-5 md:grid-cols-[1fr_auto_1fr] md:px-10 xl:px-14">
        <Link
          href="/"
          className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white md:text-[11px]"
        >
          <motion.span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.92)]"
            animate={{ opacity: [0.42, 1, 0.42] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          Wesley Joseph Co.
        </Link>

        <span className="hidden justify-self-center font-mono text-[9px] font-semibold uppercase tracking-[0.38em] text-white/55 md:block">
          {title}
        </span>

        <nav className="hidden items-center justify-end gap-8 font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-white/66 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors duration-500 hover:text-white">
              {link.label}
            </Link>
          ))}
          <span aria-hidden className="h-2 w-2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.92)]" />
        </nav>

        <Link
          href="/ventures"
          className="justify-self-end font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-white/70 transition-colors duration-500 hover:text-white md:hidden"
        >
          Ventures
        </Link>
      </div>
    </motion.div>
  );
}

function PageFooter() {
  return (
    <footer className="relative border-t border-white/[0.14] bg-black">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 items-center gap-5 px-5 py-6 md:grid-cols-3 md:px-10 xl:px-14">
        <Link
          href="/"
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white/78 transition-colors duration-500 hover:text-white"
        >
          Wesley Joseph Co.
        </Link>
        <nav className="flex flex-wrap gap-6 font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-white/50 md:justify-center">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors duration-500 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-white/50 md:justify-self-end">
          © 2024 All rights reserved
        </p>
      </div>
    </footer>
  );
}

function seededItems(count: number, seed: number) {
  return Array.from({ length: count }, (_, i) => {
    const s = (i + 1) * seed;
    const rand = (n: number) => {
      const x = Math.sin(s * n) * 10000;
      return x - Math.floor(x);
    };
    return {
      id: i,
      left: `${(rand(2.1) * 100).toFixed(2)}%`,
      top: `${(rand(4.8) * 100).toFixed(2)}%`,
      size: 0.6 + rand(7.2) * 1.8,
      opacity: 0.12 + rand(11.4) * 0.42,
      delay: rand(13.2) * 10,
      duration: 18 + rand(15.5) * 26,
      driftX: rand(17.9) * 18 - 9,
      driftY: rand(19.1) * 22 - 11
    };
  });
}

function StarLayer({ count = 90, seed = 11 }: { count?: number; seed?: number }) {
  const stars = useMemo(() => seededItems(count, seed), [count, seed]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity
          }}
          animate={{
            x: [-star.driftX, star.driftX, -star.driftX],
            y: [-star.driftY, star.driftY, -star.driftY],
            opacity: [star.opacity, star.opacity * 0.38, star.opacity]
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

function NebulaHaze() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-[18%] top-[8%] h-[50rem] w-[50rem] rounded-full bg-white/[0.055] blur-[120px]"
        animate={{ x: [0, 32, -18, 0], y: [0, -24, 18, 0], opacity: [0.28, 0.5, 0.32, 0.28] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[12%] bottom-[4%] h-[42rem] w-[42rem] rounded-full bg-white/[0.045] blur-[110px]"
        animate={{ x: [0, -22, 18, 0], y: [0, 26, -16, 0], opacity: [0.22, 0.42, 0.25, 0.22] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function OrbitLines({ compact = false }: { compact?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={`absolute rounded-full border border-white/[0.13] ${
          compact ? "left-1/2 top-1/2 h-[22rem] w-[46rem]" : "right-[-6%] top-[13%] h-[28rem] w-[54rem]"
        }`}
        animate={{ rotate: 360, scale: [1, 1.03, 1] }}
        transition={{
          rotate: { duration: 78, repeat: Infinity, ease: "linear" },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ x: compact ? "-50%" : 0, y: compact ? "-50%" : 0 }}
      />
      <motion.div
        className={`absolute rounded-full border border-white/[0.08] ${
          compact ? "left-1/2 top-1/2 h-[16rem] w-[34rem]" : "right-[2%] top-[26%] h-[18rem] w-[44rem]"
        }`}
        animate={{ rotate: -360 }}
        transition={{ duration: 94, repeat: Infinity, ease: "linear" }}
        style={{ x: compact ? "-50%" : 0, y: compact ? "-50%" : 0 }}
      />
      <motion.span
        className={`absolute h-2 w-2 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.95)] ${
          compact ? "left-[68%] top-[42%]" : "right-[13%] top-[33%]"
        }`}
        animate={{ opacity: [0.35, 1, 0.35], scale: [0.8, 1.18, 0.8] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function IconGlyph({ name }: { name: IconName }) {
  const common = "stroke-current";

  switch (name) {
    case "camera":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <path className={common} d="M5 11h6l2-3h6l2 3h6v14H5z" fill="none" strokeWidth="1.2" />
          <circle className={common} cx="16" cy="18" r="4.5" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "video":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <rect className={common} x="5" y="9" width="16" height="14" fill="none" strokeWidth="1.2" />
          <path className={common} d="m21 14 6-4v12l-6-4z" fill="none" strokeWidth="1.2" />
          <path className={common} d="M10 13h6M10 18h4" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "podcast":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <circle className={common} cx="16" cy="14" r="4" fill="none" strokeWidth="1.2" />
          <path className={common} d="M10 15a6 6 0 0 0 12 0M16 20v7M12 27h8" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "clips":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <path className={common} d="M9 6v20M23 6v20M7 11h18M7 21h18" fill="none" strokeWidth="1.2" />
          <path className={common} d="m14 13 6 3-6 3z" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "kit":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <rect className={common} x="7" y="9" width="18" height="16" fill="none" strokeWidth="1.2" />
          <path className={common} d="M12 9V7h8v2M11 15h10M11 20h7" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "event":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <path className={common} d="M16 5v22M5 16h22M9 9l14 14M23 9 9 23" fill="none" strokeWidth="1.2" />
          <circle className={common} cx="16" cy="16" r="6" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "connection":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <circle className={common} cx="9" cy="17" r="3" fill="none" strokeWidth="1.2" />
          <circle className={common} cx="23" cy="10" r="3" fill="none" strokeWidth="1.2" />
          <circle className={common} cx="23" cy="24" r="3" fill="none" strokeWidth="1.2" />
          <path className={common} d="m12 16 8-4M12 18l8 5" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "opportunity":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <path className={common} d="M7 20 16 7l9 13H7zM10 20v6h12v-6" fill="none" strokeWidth="1.2" />
          <path className={common} d="M16 13v7" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "intro":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <path className={common} d="M6 18c4-7 9-7 14 0M12 22c4 4 8 4 12 0M9 10h5M18 10h5" fill="none" strokeWidth="1.2" />
          <circle className={common} cx="16" cy="16" r="10" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "resource":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <path className={common} d="M9 7h11l3 3v15H9z" fill="none" strokeWidth="1.2" />
          <path className={common} d="M20 7v4h4M12 16h8M12 20h8" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "editorial":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <path className={common} d="M8 7h16v18H8zM12 12h8M12 16h8M12 20h5" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "intelligence":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <circle className={common} cx="16" cy="16" r="9" fill="none" strokeWidth="1.2" />
          <path className={common} d="M16 8v16M8 16h16M11 11l10 10M21 11 11 21" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "wealth":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <path className={common} d="M7 23h18M9 20V9M16 20V6M23 20V12" fill="none" strokeWidth="1.2" />
          <path className={common} d="m9 9 4 3 3-6 7 6" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "brand":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <path className={common} d="m16 5 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "faith":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <path className={common} d="M16 5v22M10 11h12" fill="none" strokeWidth="1.2" />
          <path className={common} d="M8 25c3-4 13-4 16 0" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "community":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <circle className={common} cx="11" cy="12" r="3.5" fill="none" strokeWidth="1.2" />
          <circle className={common} cx="21" cy="12" r="3.5" fill="none" strokeWidth="1.2" />
          <circle className={common} cx="16" cy="21" r="3.5" fill="none" strokeWidth="1.2" />
          <path className={common} d="M8 25c1.8-3 4.8-4.5 8-4.5s6.2 1.5 8 4.5M5 17c1.3-2.2 3.4-3.3 6-3.3M21 13.7c2.6 0 4.7 1.1 6 3.3" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "education":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <path className={common} d="m5 12 11-6 11 6-11 6z" fill="none" strokeWidth="1.2" />
          <path className={common} d="M10 15v6c3.6 2.4 8.4 2.4 12 0v-6M27 12v7" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "visibility":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <path className={common} d="M5 16c3.2-5.2 6.9-7.8 11-7.8S23.8 10.8 27 16c-3.2 5.2-6.9 7.8-11 7.8S8.2 21.2 5 16z" fill="none" strokeWidth="1.2" />
          <circle className={common} cx="16" cy="16" r="4" fill="none" strokeWidth="1.2" />
        </svg>
      );
    case "lightning":
      return (
        <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7">
          <path className={common} d="m18 4-9 14h7l-2 10 9-14h-7z" fill="none" strokeWidth="1.2" />
        </svg>
      );
    default:
      return null;
  }
}

export function VenturePageShell({ children, title }: ShellProps) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-black text-white">
      <PageChrome title={title} />
      <StarLayer count={170} seed={17} />
      <NebulaHaze />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.055] mix-blend-screen"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.11) 1px, transparent 1px)",
          backgroundSize: "100% 4px"
        }}
      />
      <div className="relative z-20">{children}</div>
      <PageFooter />
    </div>
  );
}

export function VentureHero({ index, name, positioning, cta, visual, kicker }: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden border-b border-white/[0.14] pt-20">
      <motion.div
        className="absolute inset-0 bg-cover grayscale"
        style={{
          backgroundImage: `url(${visual.src})`,
          backgroundPosition: visual.position ?? "center"
        }}
        initial={{ scale: 1.1, opacity: 0.64 }}
        animate={{
          scale: [1.08, 1.02, 1.06],
          opacity: [0.72, 0.96, 0.78],
          filter: ["contrast(1.05) grayscale(1)", "contrast(1.24) grayscale(1)", "contrast(1.08) grayscale(1)"]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        role="img"
        aria-label={visual.alt}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.72)_35%,rgba(0,0,0,0.34)_68%,rgba(0,0,0,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.08)_48%,rgba(0,0,0,0.86)_100%)]" />
      <OrbitLines />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1800px] items-center px-5 py-20 md:px-10 xl:px-14">
        <div className="max-w-[46rem]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="font-display text-3xl text-white/86 md:text-4xl"
          >
            {index}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.12, ease: EASE }}
            className="mt-6 font-display text-[clamp(4.8rem,10vw,12rem)] font-light uppercase leading-[0.85] tracking-normal text-white"
          >
            {name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.34, ease: EASE }}
            className={`${kicker ? "mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white/86 md:text-[11px]" : "mt-8 max-w-[33rem] text-base leading-relaxed text-white/82 md:text-lg"}`}
          >
            {kicker ?? positioning}
          </motion.p>
          {kicker ? (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.15, delay: 0.44, ease: EASE }}
              className="mt-6 max-w-[38rem] text-base leading-relaxed text-white/82 md:text-lg"
            >
              {positioning}
            </motion.p>
          ) : null}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.58, ease: EASE }}
          >
            <TextCTA cta={cta} className="mt-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function VentureManifesto({
  statement,
  visual,
  body,
  label = "Our Manifesto",
  centered = false
}: ManifestoProps) {
  return (
    <section className="relative min-h-[34rem] overflow-hidden border-b border-white/[0.14]">
      {visual ? (
        <motion.div
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{ backgroundImage: `url(${visual.src})`, backgroundPosition: visual.position ?? "center" }}
          animate={{ scale: [1.06, 1.12, 1.06], opacity: [0.22, 0.36, 0.22] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          role="img"
          aria-label={visual.alt}
        />
      ) : null}
      <StarLayer count={90} seed={23} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_92%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.58),rgba(0,0,0,0.88))]" />

      <div className="relative z-10 mx-auto grid min-h-[34rem] max-w-[1800px] items-center gap-10 px-5 py-20 md:grid-cols-[0.24fr_1fr] md:px-10 xl:px-14">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className={`font-mono text-[9px] font-semibold uppercase tracking-[0.34em] text-white/48 ${centered ? "md:col-span-2 md:text-center" : ""}`}
        >
          {label}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 1.15, ease: EASE }}
          className={centered ? "md:col-span-2 md:mx-auto md:max-w-5xl md:text-center" : ""}
        >
          <h2 className="max-w-6xl font-display text-[clamp(2.8rem,5vw,6.6rem)] font-light leading-[0.98] tracking-normal text-white">
            {statement}
          </h2>
          {body ? (
            <p className={`mt-8 max-w-3xl text-base leading-relaxed text-white/76 md:text-lg ${centered ? "mx-auto" : ""}`}>
              {body}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

export function VentureCapabilities({ label, items }: CapabilitiesProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.14] bg-black">
      <div className="mx-auto max-w-[1800px] px-5 py-20 md:px-10 md:py-24 xl:px-14">
        <p className="mb-12 font-mono text-[9px] font-semibold uppercase tracking-[0.34em] text-white/48">
          {label}
        </p>
        <div className="grid border-t border-white/[0.14] md:grid-cols-5">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: index * 0.06, ease: EASE }}
              whileHover={{ y: -8 }}
              className="group relative min-h-[19rem] overflow-hidden border-b border-white/[0.14] py-9 pr-7 md:border-b-0 md:border-r md:border-white/[0.14] md:pl-7 md:last:border-r-0"
            >
              <motion.div
                aria-hidden
                className="absolute inset-0 bg-white/[0.055] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative z-10">
                <div className="text-white/70 transition-all duration-500 group-hover:text-white">
                  <IconGlyph name={item.icon} />
                </div>
                <h3 className="mt-9 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-[18rem] text-sm leading-relaxed text-white/58 transition-colors duration-500 group-hover:text-white/82">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VentureVisualPanel({ visual, headline, body, cta }: VisualPanelProps) {
  const pointer = useMotionValue(0);
  const imageY = useTransform(pointer, [-0.5, 0.5], [-24, 24]);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);

  return (
    <section
      className="relative min-h-[42rem] overflow-hidden border-b border-white/[0.14] md:min-h-[48rem]"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => pointer.set(0)}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center grayscale"
        style={{
          backgroundImage: `url(${visual.src})`,
          backgroundPosition: visual.position ?? "center",
          scale,
          y: imageY
        }}
        role="img"
        aria-label={visual.alt}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.62)_42%,rgba(0,0,0,0.2)_78%,rgba(0,0,0,0.74)_100%),linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.62))]" />
      <OrbitLines compact />

      <div className="relative z-10 mx-auto flex min-h-[42rem] max-w-[1800px] items-center px-5 py-20 md:min-h-[48rem] md:px-10 xl:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.15, ease: EASE }}
          className="max-w-[44rem]"
        >
          <h2 className="font-display text-[clamp(3rem,5.2vw,7rem)] font-light uppercase leading-[0.94] tracking-normal text-white">
            {headline}
          </h2>
          <p className="mt-7 max-w-[32rem] text-base leading-relaxed text-white/74 md:text-lg">
            {body}
          </p>
          {cta ? <TextCTA cta={cta} className="mt-9" /> : null}
        </motion.div>
      </div>
    </section>
  );
}

export function VentureCollagePanel({ label, headline, visuals }: CollagePanelProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.14] bg-black">
      <div className="grid min-h-[34rem] grid-cols-1 md:grid-cols-4">
        {visuals.map((visual, index) => (
          <motion.div
            key={`${visual.src}-${index}`}
            className="relative min-h-[16rem] overflow-hidden border-b border-white/[0.12] md:min-h-[34rem] md:border-b-0 md:border-r md:border-white/[0.12] md:last:border-r-0"
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: index * 0.08, ease: EASE }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center grayscale"
              style={{
                backgroundImage: `url(${visual.src})`,
                backgroundPosition: visual.position ?? "center"
              }}
              animate={{
                scale: [1.08, 1.16, 1.08],
                x: index % 2 === 0 ? [-10, 8, -10] : [8, -10, 8],
                filter: ["grayscale(1) contrast(1.05) brightness(0.62)", "grayscale(1) contrast(1.24) brightness(0.82)", "grayscale(1) contrast(1.05) brightness(0.62)"]
              }}
              transition={{ duration: 18 + index * 2, repeat: Infinity, ease: "easeInOut" }}
              role="img"
              aria-label={visual.alt}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.64)),linear-gradient(90deg,rgba(0,0,0,0.28),rgba(0,0,0,0.1))]" />
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.15, ease: EASE }}
          className="max-w-5xl"
        >
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.34em] text-white/72">
            {label}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.7rem,5vw,6.6rem)] font-light leading-[0.98] text-white drop-shadow-[0_12px_38px_rgba(0,0,0,0.82)]">
            {headline}
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

export function VentureCTA({ kicker, line, cta }: CTAProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.14] px-5 py-24 text-center md:px-10 md:py-28 xl:px-14">
      <StarLayer count={145} seed={31} />
      <NebulaHaze />
      <OrbitLines compact />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.3),rgba(0,0,0,0.9))]" />
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.15, ease: EASE }}
        className="relative z-10 mx-auto max-w-5xl"
      >
        <p className="text-base text-white/62 md:text-lg">{kicker}</p>
        <h2 className="mt-5 font-display text-[clamp(3rem,5vw,7rem)] font-light uppercase leading-none tracking-normal text-white">
          {line}
        </h2>
        <BoxCTA cta={cta} className="mt-10" />
      </motion.div>
    </section>
  );
}
