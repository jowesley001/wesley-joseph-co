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
  | "faith";

type Capability = {
  title: string;
  body: string;
  icon: IconName;
};

type Visual = {
  src: string;
  alt: string;
  label?: string;
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
};

type ManifestoProps = {
  statement: string;
  visual?: Visual;
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

function Arrow() {
  return (
    <motion.span
      aria-hidden
      className="inline-block"
      animate={{ x: [0, 4, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      {"→"}
    </motion.span>
  );
}

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

function TextCTA({ cta, className = "" }: { cta: VentureLink; className?: string }) {
  return (
    <ExternalLink
      href={cta.href}
      external={cta.external}
      className={`group inline-flex items-center gap-5 border-b border-white/28 pb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white transition-colors duration-500 hover:border-white hover:text-white md:text-[11px] ${className}`}
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
      className={`group inline-flex items-center justify-center gap-7 border border-white/24 bg-black/35 px-8 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-black md:text-[11px] ${className}`}
    >
      <span>{cta.label}</span>
      <Arrow />
    </ExternalLink>
  );
}

function PageChrome({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE }}
      className="flex h-[68px] items-center justify-between border-b border-white/18 px-5 md:px-8"
    >
      <Link
        href="/"
        className="font-mono text-[10px] font-semibold uppercase tracking-[0.23em] text-white md:text-[11px]"
      >
        Wesley Joseph Co.
      </Link>
      <nav className="hidden items-center gap-9 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-white/72 md:flex">
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href} className="transition-colors duration-500 hover:text-white">
            {link.label}
          </Link>
        ))}
        <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.95)]" />
      </nav>
      <Link
        href="/ventures"
        className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-white/72 md:hidden"
      >
        Ventures
      </Link>
      <span className="sr-only">{title}</span>
    </motion.div>
  );
}

function PageFooter() {
  return (
    <footer className="grid min-h-16 grid-cols-1 items-center gap-4 border-t border-white/18 px-5 py-5 md:grid-cols-3 md:px-8">
      <Link
        href="/"
        className="font-mono text-[10px] font-semibold uppercase tracking-[0.23em] text-white/78 transition-colors duration-500 hover:text-white"
      >
        Wesley Joseph Co.
      </Link>
      <nav className="flex flex-wrap gap-6 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-white/62 md:justify-center">
        {navLinks.slice(0, 4).map((link) => (
          <Link key={link.label} href={link.href} className="transition-colors duration-500 hover:text-white">
            {link.label}
          </Link>
        ))}
      </nav>
      <span className="hidden justify-self-end h-2 w-2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.95)] md:block" />
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

function OrbitLines({ compact = false }: { compact?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={`absolute rounded-full border border-white/12 ${compact ? "right-[-12%] top-[2%] h-[76%] w-[52%]" : "right-[5%] top-[10%] h-[78%] w-[46%]"}`}
        animate={{ rotate: 360, scale: [1, 1.025, 1] }}
        transition={{ rotate: { duration: 76, repeat: Infinity, ease: "linear" }, scale: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
        style={{ transform: "rotate(-24deg)" }}
      />
      <motion.div
        className={`absolute rounded-full border border-white/[0.08] ${compact ? "left-[18%] top-[26%] h-[42%] w-[68%]" : "right-[0%] top-[20%] h-[52%] w-[62%]"}`}
        animate={{ rotate: -360 }}
        transition={{ duration: 92, repeat: Infinity, ease: "linear" }}
        style={{ transform: "rotate(14deg)" }}
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
    default:
      return null;
  }
}

export function VenturePageShell({ children, title }: ShellProps) {
  return (
    <div className="relative isolate bg-black px-3 py-4 text-white md:px-6 md:py-8">
      <StarLayer count={140} seed={17} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.62)_78%,rgba(0,0,0,0.96)_100%)]" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.075] mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "100% 3px"
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1536px] border border-white/24 bg-black/62 shadow-[0_0_80px_rgba(255,255,255,0.06)] backdrop-blur-[2px]">
        <PageChrome title={title} />
        {children}
        <PageFooter />
      </div>
    </div>
  );
}

export function VentureHero({ index, name, positioning, cta, visual }: HeroProps) {
  return (
    <section className="relative min-h-[620px] overflow-hidden border-b border-white/18 md:min-h-[720px]">
      <motion.div
        className="absolute inset-0 bg-cover bg-center grayscale"
        style={{ backgroundImage: `url(${visual.src})` }}
        initial={{ scale: 1.08, opacity: 0.72 }}
        animate={{ scale: 1.02, opacity: 1, backgroundPosition: ["50% 50%", "52% 48%", "50% 50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        role="img"
        aria-label={visual.alt}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.58)_37%,rgba(0,0,0,0.22)_70%,rgba(0,0,0,0.68)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.74)_100%)]" />
      <OrbitLines />

      <div className="relative z-10 flex min-h-[620px] max-w-3xl flex-col justify-center px-8 py-20 md:min-h-[720px] md:px-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="font-display text-2xl text-white/82"
        >
          {index}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
          className="mt-6 font-display text-[clamp(4rem,9vw,9.4rem)] font-light uppercase leading-[0.9] tracking-normal text-white"
        >
          {name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.38, ease: EASE }}
          className="mt-8 max-w-md font-sans text-base leading-relaxed text-white/84 md:text-lg"
        >
          {positioning}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.62, ease: EASE }}
        >
          <TextCTA cta={cta} className="mt-10" />
        </motion.div>
      </div>
    </section>
  );
}

export function VentureManifesto({ statement, visual }: ManifestoProps) {
  return (
    <section className="relative min-h-[260px] overflow-hidden border-b border-white/18">
      {visual ? (
        <motion.div
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{ backgroundImage: `url(${visual.src})` }}
          animate={{ scale: [1.03, 1.08, 1.03], backgroundPosition: ["50% 52%", "52% 48%", "50% 52%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          role="img"
          aria-label={visual.alt}
        />
      ) : null}
      <StarLayer count={80} seed={23} />
      <div className="absolute inset-0 bg-black/62" />
      <div className="relative z-10 grid min-h-[260px] items-center gap-8 px-8 py-14 md:grid-cols-[0.28fr_1fr] md:px-14">
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.32em] text-white/44">
          Our Manifesto
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="max-w-4xl font-display text-[clamp(2.4rem,4vw,4.8rem)] font-light leading-[1.03] tracking-normal text-white"
        >
          {statement}
        </motion.h2>
      </div>
    </section>
  );
}

export function VentureCapabilities({ label, items }: CapabilitiesProps) {
  return (
    <section className="relative border-b border-white/18 bg-black/72 px-8 py-16 md:px-14 md:py-20">
      <p className="mb-11 font-mono text-[9px] font-semibold uppercase tracking-[0.32em] text-white/44">
        {label}
      </p>
      <div className="grid gap-x-8 gap-y-12 md:grid-cols-5">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: index * 0.06, ease: EASE }}
            className="group"
          >
            <div className="text-white/74 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-white">
              <IconGlyph name={item.icon} />
            </div>
            <h3 className="mt-7 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
              {item.title}
            </h3>
            <p className="mt-4 max-w-[17rem] font-sans text-sm leading-relaxed text-white/58 transition-colors duration-500 group-hover:text-white/78">
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function VentureVisualPanel({ visual, headline, body, cta }: VisualPanelProps) {
  const pointer = useMotionValue(0);
  const imageY = useTransform(pointer, [-0.5, 0.5], [-16, 16]);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);

  return (
    <section
      className="relative min-h-[340px] overflow-hidden border-b border-white/18 md:min-h-[420px]"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => pointer.set(0)}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center grayscale"
        style={{ backgroundImage: `url(${visual.src})`, scale, y: imageY }}
        role="img"
        aria-label={visual.alt}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.52)_42%,rgba(0,0,0,0.28)_72%,rgba(0,0,0,0.74)_100%),linear-gradient(180deg,rgba(0,0,0,0.24),rgba(0,0,0,0.2))]" />
      <div className="relative z-10 flex min-h-[340px] max-w-xl flex-col justify-center px-8 py-12 md:min-h-[420px] md:px-14">
        <motion.h2
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="font-display text-[clamp(2.4rem,4.2vw,5rem)] font-light uppercase leading-[0.98] tracking-normal text-white"
        >
          {headline}
        </motion.h2>
        <p className="mt-7 max-w-md font-sans text-base leading-relaxed text-white/74">
          {body}
        </p>
        {cta ? <TextCTA cta={cta} className="mt-8" /> : null}
      </div>
    </section>
  );
}

export function VentureCTA({ kicker, line, cta }: CTAProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/18 px-8 py-20 text-center md:px-14 md:py-24">
      <StarLayer count={130} seed={31} />
      <OrbitLines compact />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.38),rgba(0,0,0,0.84))]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative z-10 mx-auto max-w-4xl"
      >
        <p className="font-sans text-base text-white/64 md:text-lg">{kicker}</p>
        <h2 className="mt-5 font-display text-[clamp(2.6rem,4.6vw,5.8rem)] font-light uppercase leading-none tracking-normal text-white">
          {line}
        </h2>
        <BoxCTA cta={cta} className="mt-10" />
      </motion.div>
    </section>
  );
}
