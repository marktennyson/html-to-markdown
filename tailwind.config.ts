import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
      },
      screens: {
        mobile: { min: "320px", max: "639px" },
        "3xl": "1920px",
        "4xl": "2560px",
      },
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
        geist: ["var(--font-geist-sans)", "system-ui"],
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        neon: "0 0 30px rgba(56, 189, 248, 0.35)",
        glow: "0 0 45px rgba(236, 72, 153, 0.25)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
