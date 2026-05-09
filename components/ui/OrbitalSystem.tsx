"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ORBIT_LABELS } from "@/lib/constants";

export type OrbitalNode = {
  text: string;
  pos: string;
  category?: string;
  href?: string;
  external?: boolean;
  number?: string;
  prominent?: boolean;
};

type Props = {
  className?: string;
  showLabels?: boolean;
  nodes?: OrbitalNode[];
};

const DEFAULT_LABEL_POSITIONS = [
  "left-[55%] top-[8%]",
  "left-[24%] top-[26%]",
  "left-[78%] top-[40%]",
  "left-[47%] top-[78%]",
  "left-[14%] top-[64%]",
  "left-[78%] top-[64%]"
];

export function OrbitalSystem({ className = "", showLabels = true, nodes }: Props) {
  const resolvedNodes: OrbitalNode[] = nodes
    ? nodes
    : ORBIT_LABELS.map((label, i) => ({
        text: label,
        pos: DEFAULT_LABEL_POSITIONS[i]
      }));

  return (
    <div className={`relative h-full w-full [perspective:1200px] ${className}`} aria-hidden>
      <motion.div
        className="absolute inset-[3%] rounded-full border border-white/30 shadow-[0_0_80px_rgba(255,255,255,0.06)]"
        style={{ transform: "rotateX(66deg) rotateZ(-18deg)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[12%] rounded-full border border-white/20"
        style={{ transform: "rotateX(66deg) rotateZ(20deg)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[22%] rounded-full border border-white/35"
        style={{ transform: "rotateX(66deg) rotateZ(-42deg)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[31%] rounded-full border border-white/15"
        style={{ transform: "rotateX(66deg) rotateZ(10deg)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#040404]"
        animate={{
          scale: [1, 1.04, 1],
          boxShadow: [
            "0 0 60px rgba(255,255,255,0.18)",
            "0 0 110px rgba(255,255,255,0.32)",
            "0 0 60px rgba(255,255,255,0.18)"
          ]
        }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute -right-1 top-[16%] h-2/3 w-4 rounded-full bg-white/85 blur-md" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.22),transparent_38%)]" />
      </motion.div>

      <motion.div
        className="absolute left-[20%] top-[68%] h-2 w-2 rounded-full bg-white shadow-[0_0_18px_white]"
        animate={{
          x: [0, 80, 210, 0],
          y: [0, -90, -22, 0],
          opacity: [0.5, 1, 0.7, 0.5]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[72%] top-[34%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_16px_white]"
        animate={{
          x: [0, -100, -180, 0],
          y: [0, 80, -15, 0],
          opacity: [0.4, 1, 0.55, 0.4]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[40%] top-[18%] h-1 w-1 rounded-full bg-white shadow-[0_0_14px_white]"
        animate={{
          x: [0, 60, 120, 60, 0],
          y: [0, 30, 70, 110, 0],
          opacity: [0.35, 0.9, 0.55, 0.85, 0.35]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {showLabels
        ? resolvedNodes.map((node, i) => (
            <NodeLabel key={`${node.text}-${i}`} node={node} index={i} />
          ))
        : null}
    </div>
  );
}

function NodeLabel({ node, index }: { node: OrbitalNode; index: number }) {
  const driftDuration = 12 + index * 1.7;
  const driftDelay = index * 0.4;

  const inner = (
    <motion.span
      className="flex flex-col items-start gap-3"
      animate={{
        y: [0, -6, 2, -3, 0],
        x: [0, 3, -2, 4, 0]
      }}
      transition={{
        duration: driftDuration,
        delay: driftDelay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.span
        aria-hidden
        className={`block rounded-full bg-white ${
          node.prominent ? "h-2 w-2 shadow-[0_0_18px_white]" : "h-1.5 w-1.5"
        }`}
        animate={{
          scale: node.prominent ? [1, 1.45, 1] : [1, 1.2, 1],
          opacity: node.prominent ? [0.7, 1, 0.7] : [0.5, 0.85, 0.5]
        }}
        transition={{
          duration: 2.6 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {node.number ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-subtle">
          {node.number}
        </span>
      ) : null}

      <span
        className={`font-mono uppercase ${
          node.prominent
            ? "text-[12px] tracking-[0.28em] text-ink"
            : "text-[10px] tracking-[0.32em] text-ink-subtle"
        }`}
      >
        {node.text}
      </span>

      {node.category ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-muted opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {node.category}
          <span aria-hidden className="ml-2">{"→"}</span>
        </span>
      ) : null}
    </motion.span>
  );

  if (node.href) {
    if (node.external) {
      return (
        <a
          href={node.href}
          target="_blank"
          rel="noreferrer noopener"
          className={`group absolute ${node.pos} pointer-events-auto`}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={node.href} className={`group absolute ${node.pos} pointer-events-auto`}>
        {inner}
      </Link>
    );
  }

  return <div className={`group absolute ${node.pos} pointer-events-none`}>{inner}</div>;
}
