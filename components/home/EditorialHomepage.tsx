"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MovingParticles } from "@/components/ui/MovingParticles";
import { Footer } from "@/components/layout/Footer";
import { ventures } from "@/content/ventures";

type Props = {
  active: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function EditorialHomepage({ active }: Props) {
  return (
    <main className="relative bg-bg text-ink">
      {/* Subtle ambient particle drift across the entire homepage */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <MovingParticles count={22} intensity="low" seed={5} />
      </div>

      <Hero active={active} />
      <Mission active={active} />
      <Ventures active={active} />
      <FinalStatement active={active} />
      <Footer />
    </main>
  );
}

function Hero({ active }: { active: boolean }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 md:px-12">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(255,255,255,0.08), rgba(0,0,0,0) 60%)",
            "radial-gradient(ellipse 70% 65% at 53% 52%, rgba(255,255,255,0.10), rgba(0,0,0,0) 64%)",
            "radial-gradient(ellipse 65% 60% at 47% 50%, rgba(255,255,255,0.08), rgba(0,0,0,0) 60%)"
          ]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12, letterSpacing: "0.6em" }}
          animate={
            active
              ? { opacity: 1, y: 0, letterSpacing: "0.32em" }
              : { opacity: 0, y: 12, letterSpacing: "0.6em" }
          }
          transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          className="font-mono text-[clamp(0.65rem,0.85vw,0.78rem)] uppercase text-ink-soft"
        >
          Est. 2026 / A Media Holding Company
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={
            active
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 24, filter: "blur(12px)" }
          }
          transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
          className="mt-12 font-display text-[clamp(3rem,9vw,7.5rem)] font-light uppercase leading-[0.95] tracking-[0.04em] text-ink md:tracking-[0.05em]"
        >
          Wesley Joseph Co.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={
            active ? { opacity: 0.95, y: 0 } : { opacity: 0, y: 16 }
          }
          transition={{ duration: 1.4, delay: 1.0, ease: EASE }}
          className="mx-auto mt-12 max-w-2xl font-display text-[clamp(1.25rem,1.6vw,1.6rem)] font-light leading-relaxed text-ink-soft"
        >
          A holding company building the infrastructure for modern influence.
          Media, markets, entrepreneurship, and culture — under one house.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1, y: [0, 6, 0] } : { opacity: 0 }}
        transition={{
          opacity: { duration: 1.2, delay: 1.6 },
          y: { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.32em] text-ink-muted"
      >
        Scroll
      </motion.div>
    </section>
  );
}

function Mission({ active }: { active: boolean }) {
  return (
    <section className="relative border-t border-line-subtle px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 md:grid-cols-12 md:gap-24">
        <div className="md:col-span-4">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: EASE }}
            className="font-mono text-[11px] uppercase tracking-[0.32em] text-ink-soft"
          >
            <span className="text-ink">01</span>
            <span aria-hidden className="mx-3 inline-block h-px w-10 bg-current align-middle" />
            The Mission
          </motion.p>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.1] text-ink"
          >
            We operate at the intersection of media, markets,
            entrepreneurship, and culture.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            className="mt-12 max-w-xl font-sans text-base text-ink-soft leading-relaxed md:text-lg"
          >
            Wesley Joseph Co. is a holding company and media ecosystem.
            We build, publish, and convene — operating three companies
            that compound together. Each property is built on a thesis;
            together they form an ecosystem of attention, capital, and
            craft.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Ventures({ active }: { active: boolean }) {
  return (
    <section
      id="ventures"
      className="relative border-t border-line-subtle px-6 py-32 md:px-12 md:py-48"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: EASE }}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-ink-soft"
        >
          <span className="text-ink">02</span>
          <span aria-hidden className="mx-3 inline-block h-px w-10 bg-current align-middle" />
          The Ventures
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
          className="mt-10 max-w-3xl font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] text-ink"
        >
          Three companies. One house.
        </motion.h2>

        <div className="mt-20 flex flex-col gap-0">
          {ventures.map((v, i) => (
            <motion.article
              key={v.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0, delay: i * 0.1, ease: EASE }}
              className="group grid grid-cols-1 gap-8 border-t border-line py-12 md:grid-cols-12 md:gap-16 md:py-16"
            >
              <div className="md:col-span-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-ink-soft">
                  <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    aria-hidden
                    className="mx-2 inline-block h-px w-6 bg-current align-middle"
                  />
                  {v.category}
                </p>
                <h3 className="mt-6 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-[1.05] text-ink">
                  {v.name}
                </h3>
              </div>

              <div className="md:col-span-7 md:col-start-6">
                <p className="font-sans text-base text-ink-soft leading-relaxed md:text-lg">
                  {v.tagline} {v.description}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-8">
                  <Link
                    href={v.href}
                    {...(v.external
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    className="group/link inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-ink transition-colors duration-500 hover:text-ink-soft"
                  >
                    <span>Enter {v.name.split(" ")[0]}</span>
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-500 group-hover/link:translate-x-1"
                    >
                      {"→"}
                    </span>
                  </Link>
                  {v.external ? (
                    <a
                      href={v.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-mono text-[11px] uppercase tracking-[0.32em] text-ink-muted transition-colors duration-500 hover:text-ink"
                    >
                      {v.href.replace("https://", "")}
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalStatement({ active }: { active: boolean }) {
  return (
    <section className="relative border-t border-line-subtle px-6 py-40 md:px-12 md:py-56">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%)"
        }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[1.1] text-ink"
        >
          Financial intelligence. Media power. Cultural influence.
        </motion.p>
      </div>
    </section>
  );
}
