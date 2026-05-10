"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MovingParticles } from "@/components/ui/MovingParticles";
import { MovingGradient } from "@/components/ui/MovingGradient";

type Props = {
  number: string;
  eyebrow: string;
  title: string;
  body?: string;
  back?: { label: string; href: string };
};

export function PageHeader({ number, eyebrow, title, body, back }: Props) {
  return (
    <section className="relative min-h-[80svh] overflow-hidden border-b border-line-subtle bg-bg pt-32 md:pt-40">
      <MovingGradient variant="left" intensity={0.08} />
      <MovingParticles count={20} intensity="low" seed={9} />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
        {back ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <Link
              href={back.href}
              className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-ink-muted transition-colors duration-500 hover:text-ink"
            >
              <span aria-hidden className="block transition-transform duration-500 group-hover:-translate-x-1">
                {"←"}
              </span>
              <span>{back.label}</span>
            </Link>
          </motion.div>
        ) : null}

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-eyebrow uppercase text-ink-subtle"
        >
          <span className="text-ink">{number}</span>
          <span className="ml-7">{eyebrow}</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 max-w-4xl font-display text-display-xl text-ink"
        >
          {title}
        </motion.h1>

        {body ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-2xl font-sans text-lg text-ink-soft leading-relaxed md:text-xl"
          >
            {body}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
