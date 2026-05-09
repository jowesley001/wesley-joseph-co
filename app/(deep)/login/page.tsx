"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { MovingParticles } from "@/components/ui/MovingParticles";
import { MovingGradient } from "@/components/ui/MovingGradient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "info">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    setTimeout(() => {
      setStatus("info");
      setMessage("Authentication is not yet wired. Connect Supabase or another auth provider.");
    }, 600);
  }

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-bg pt-24">
      <MovingGradient variant="center" intensity={0.08} />
      <MovingParticles count={20} intensity="low" seed={11} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md px-6 py-16"
      >
        <p className="font-mono text-eyebrow uppercase text-ink-subtle">
          <span className="text-ink">00</span>
          <span aria-hidden className="mx-3 inline-block h-px w-10 bg-current align-middle" />
          Member Access
        </p>

        <h1 className="mt-10 font-display text-display-md text-ink">Sign in</h1>
        <p className="mt-4 font-sans text-base text-ink-soft leading-relaxed">
          Member access for the Wesley Insider Network and editorial back office.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3 w-full border-b border-line bg-transparent py-3 font-sans text-base text-ink outline-none transition-colors duration-500 placeholder:text-ink-faint focus:border-ink"
              placeholder="you@domain.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3 w-full border-b border-line bg-transparent py-3 font-sans text-base text-ink outline-none transition-colors duration-500 placeholder:text-ink-faint focus:border-ink"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="group inline-flex items-center gap-4 border border-ink px-8 py-4 font-mono text-[12px] uppercase tracking-[0.32em] text-ink transition-all duration-500 hover:bg-ink hover:text-bg disabled:opacity-40"
            >
              <span>{status === "loading" ? "Signing in..." : "Sign In"}</span>
              <span aria-hidden className="block transition-transform duration-500 group-hover:translate-x-1">
                {"→"}
              </span>
            </button>
          </div>

          {message ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">{message}</p>
          ) : null}
        </form>

        <div className="mt-12 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">
          <Link href="/" className="transition-colors duration-500 hover:text-ink">
            ← Back to home
          </Link>
          <Link
            href="mailto:network@wesleyjoseph.co"
            className="transition-colors duration-500 hover:text-ink"
          >
            Request access
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
