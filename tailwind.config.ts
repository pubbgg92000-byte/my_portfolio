import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        elevated: "rgb(var(--color-elevated) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        primary: "rgb(var(--color-text-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
        muted: "rgb(var(--color-text-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        highlight: "rgb(var(--color-highlight) / <alpha-value>)",
        frame: "rgb(var(--color-frame) / <alpha-value>)",
        glow: "rgb(var(--color-glow) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 80px rgb(var(--color-glow) / 0.22)",
        card: "0 24px 80px rgb(0 0 0 / 0.28)",
        frame: "inset 0 1px 0 rgb(255 255 255 / 0.07), 0 24px 80px rgb(0 0 0 / 0.28)",
      },
      backgroundImage: {
        "radial-soft":
          "radial-gradient(circle at 20% 20%, rgb(var(--color-accent) / 0.16), transparent 34%), radial-gradient(circle at 80% 8%, rgb(var(--color-highlight) / 0.13), transparent 28%)",
      },
    },
  },
  plugins: [],
};

export default config;
