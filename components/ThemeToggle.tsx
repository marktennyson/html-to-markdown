"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/10 text-slate-100 shadow-glow backdrop-blur transition hover:-translate-y-0.5 hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-sky-400/60"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/30 via-purple-500/20 to-emerald-500/30" />
      <div className="relative flex items-center justify-center">
        {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </div>
    </button>
  );
}
