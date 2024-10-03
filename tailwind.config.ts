import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        mobile: { min: "320px", max: "639px" },
      },
      fontFamily: {
        aguafina: ['var(--font-aguafina)', 'cursive'], 
        nunito: ['var(--font-nunito)', 'sans-serif'], 
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
