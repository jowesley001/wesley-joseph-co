import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#000000",
          elevated: "#0A0A0A",
          inset: "#050505"
        },
        ink: {
          DEFAULT: "#FFFFFF",
          soft: "#EEEEEE",
          muted: "#B5B5B5",
          subtle: "#7A7A7A",
          faint: "#4A4A4A"
        },
        line: {
          DEFAULT: "#262626",
          subtle: "#1A1A1A",
          faint: "#0F0F0F"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      letterSpacing: {
        wider: "0.18em",
        widest: "0.28em",
        ultra: "0.4em"
      },
      fontSize: {
        "display-2xl": ["clamp(4rem, 11vw, 11rem)", { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        "display-xl": ["clamp(3.5rem, 8.5vw, 8rem)", { lineHeight: "0.94", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        eyebrow: ["0.78rem", { lineHeight: "1", letterSpacing: "0.3em" }],
        "label-sm": ["0.7rem", { lineHeight: "1", letterSpacing: "0.28em" }]
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
        steady: "cubic-bezier(0.65, 0, 0.35, 1)"
      },
      animation: {
        "spin-slow": "spin 32s linear infinite",
        "spin-slower": "spin 60s linear infinite",
        "spin-reverse": "spin 24s linear infinite reverse",
        drift: "drift 18s ease-in-out infinite",
        breathe: "breathe 7s ease-in-out infinite",
        "pulse-slow": "pulseSlow 6s ease-in-out infinite",
        "scan-line": "scanLine 8s ease-in-out infinite",
        shimmer: "shimmer 3.6s ease-in-out infinite"
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(0, -8px)" }
        },
        breathe: {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" }
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" }
        },
        scanLine: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.0" },
          "10%": { opacity: "0.7" },
          "90%": { opacity: "0.7" },
          "50%": { transform: "translateY(8px)", opacity: "0.85" }
        },
        shimmer: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" }
        }
      }
    }
  },
  plugins: []
};

export default config;
