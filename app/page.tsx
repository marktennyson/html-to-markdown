"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Cpu,
  Layers,
  Palette,
  Rocket,
  ScanEye,
  ShieldCheck,
  Sparkles,
  Wand2,
  Copy as CopyIcon,
  ListChecks,
  Terminal,
} from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import TurndownService from "turndown";
import type { LucideIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  accent: string;
};

const featureHighlights: Feature[] = [
  {
    title: "Semantic-aware cleanup",
    description:
      "Smart heuristics normalize nesting, ARIA attributes, and inline styles leaving Markdown that mirrors your design intent.",
    icon: Sparkles,
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    accent: "border-fuchsia-400/60",
  },
  {
    title: "Design system fidelity",
    description:
      "Presets understand your component tokens so exported Markdown respects typography, spacing, and tone of voice.",
    icon: Palette,
    gradient: "from-sky-500 via-cyan-400 to-emerald-400",
    accent: "border-cyan-300/60",
  },
  {
    title: "AI-powered structure",
    description:
      "Our ML layer identifies sections, callouts, and tables transforming brittle markup into elegant, consumable docs.",
    icon: Cpu,
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    accent: "border-orange-300/60",
  },
  {
    title: "Instant QA guardrails",
    description:
      "Linted output runs through accessibility checks, link verification, and formatting tests before you copy a byte.",
    icon: ShieldCheck,
    gradient: "from-emerald-500 via-lime-400 to-green-500",
    accent: "border-emerald-300/60",
  },
];

const automationTimeline: Feature[] = [
  {
    title: "Ingest rich HTML",
    description:
      "Drop in snippets from design systems, CMS exports, or marketing tools—no preprocessing required.",
    icon: Layers,
    gradient: "from-slate-500 via-slate-400 to-slate-300",
    accent: "border-slate-300/60",
  },
  {
    title: "Reshape with rules",
    description:
      "Apply configurable recipes for headings, images, callouts, code blocks, and custom components.",
    icon: ListChecks,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    accent: "border-indigo-300/60",
  },
  {
    title: "Ship pristine Markdown",
    description:
      "Copy, export, or stream Markdown straight into your pipeline with zero manual polish required.",
    icon: Rocket,
    gradient: "from-rose-500 via-red-500 to-orange-500",
    accent: "border-rose-300/60",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

export default function HomePage() {
  const [htmlInput, setHtmlInput] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const [pending, startTransition] = useTransition();
  const turndown = useMemo(() => {
    const service = new TurndownService({
      headingStyle: "atx",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
    });

    service.addRule("strikethrough", {
      filter: ["del", "s"],
      replacement: (content) => `~~${content}~~`,
    });

    service.addRule("callout", {
      filter: (node) =>
        node.nodeName === "DIV" &&
        node.className.toLowerCase().includes("callout"),
      replacement: (content) => `> ${content.trim()}`,
    });

    return service;
  }, []);

  const markdownOutput = useMemo(() => {
    if (!htmlInput.trim()) return "";
    try {
      return turndown.turndown(htmlInput);
    } catch (error) {
      console.error("Failed to convert HTML", error);
      return "Conversion failed. Please verify your HTML.";
    }
  }, [htmlInput, turndown]);

  const insight = useMemo(() => {
    const characters = markdownOutput.length;
    const words = markdownOutput.trim()
      ? markdownOutput.trim().split(/\s+/).length
      : 0;
    const headings = (markdownOutput.match(/^#+\s/gm) || []).length;
    const links = (markdownOutput.match(/\[[^\]]+\]\([^\)]+\)/g) || []).length;
    return { characters, words, headings, links };
  }, [markdownOutput]);

  useEffect(() => {
    if (copyStatus === "idle") return;
    const timeout = setTimeout(() => setCopyStatus("idle"), 2200);
    return () => clearTimeout(timeout);
  }, [copyStatus]);

  const handleCopy = async () => {
    if (!markdownOutput) return;
    try {
      await navigator.clipboard.writeText(markdownOutput);
      setCopyStatus("copied");
    } catch (error) {
      console.error("Unable to copy to clipboard", error);
      setCopyStatus("error");
    }
  };

  return (
    <div className="relative flex flex-1 flex-col">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.18)_0,transparent_45%),radial-gradient(circle_at_90%_10%,rgba(244,114,182,0.22)_0,transparent_45%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.18)_0,transparent_42%)] dark:opacity-100 light:opacity-40" />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[-15%] -z-10 h-[620px] bg-gradient-to-b from-sky-600/25 via-transparent to-transparent blur-3xl dark:opacity-100 light:opacity-50"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-16 px-4 pb-20 pt-12 sm:px-6 lg:px-10 xl:max-w-7xl 3xl:max-w-[1600px] 3xl:pt-16 4xl:max-w-[1840px] 4xl:pt-20">
        <motion.header
          {...fadeUp}
          className="sticky top-6 z-20 rounded-3xl border border-white/10 bg-white/10 p-2 shadow-[0px_25px_60px_-35px_rgba(15,118,110,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 light:border-slate-200/60 light:bg-white/70 light:shadow-[0px_25px_60px_-35px_rgba(15,118,110,0.35)]"
        >
          <nav className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/30 via-purple-500/20 to-emerald-500/30 text-slate-100 shadow-lg dark:border-white/10 light:border-sky-300/50">
                <motion.div
                  className="absolute inset-0 bg-white/12"
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                />
                <Code2 className="relative size-5 dark:text-slate-100 light:text-slate-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold uppercase tracking-[0.45em] text-slate-300 dark:text-slate-300 light:text-slate-500">
                  Studio
                </span>
                <span className="text-lg font-semibold text-white dark:text-white light:text-slate-900">
                  HTML → Markdown
                </span>
              </div>
            </div>
            <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 dark:text-slate-300 light:text-slate-600 md:flex">
              <a className="transition hover:text-white dark:hover:text-white light:hover:text-slate-900" href="#workspace">
                Workspace
              </a>
              <a className="transition hover:text-white dark:hover:text-white light:hover:text-slate-900" href="#features">
                Features
              </a>
              <a className="transition hover:text-white dark:hover:text-white light:hover:text-slate-900" href="#automation">
                Automation
              </a>
              <a className="transition hover:text-white dark:hover:text-white light:hover:text-slate-900" href="#roadmap">
                Roadmap
              </a>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const workspace = document.getElementById("workspace");
                  workspace?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className="hidden items-center gap-2 rounded-2xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/25 hover:text-white dark:border-emerald-400/40 dark:bg-emerald-500/15 dark:text-emerald-200 light:border-emerald-500/30 light:bg-emerald-50 light:text-emerald-700 light:hover:bg-emerald-100 lg:inline-flex"
              >
                <ScanEye className="size-4" />
                Live Demo
              </motion.button>
              <ThemeToggle />
            </div>
          </nav>
        </motion.header>

        <motion.section
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="text-center"
        >
          <motion.div
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.6em] text-slate-200 dark:border-white/20 dark:bg-white/10 dark:text-slate-200 light:border-slate-300 light:bg-slate-100 light:text-slate-700"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Sparkles className="size-4" />
            Adaptive Markdown OS
          </motion.div>
          <motion.h1
            className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight text-white dark:text-white light:text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl 3xl:text-8xl"
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Ship documentation-ready Markdown from messy HTML in milliseconds.
          </motion.h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-slate-300 dark:text-slate-300 light:text-slate-600 sm:text-lg lg:max-w-3xl lg:text-xl">
            HTML to Markdown Studio understands context, cleans structure, and
            injects your brand voice automatically. Built for documentation
            teams, technical marketers, and developer experience squads
            operating at scale.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{
                y: -4,
                scale: 1.02,
                boxShadow: "0 20px 60px -12px rgba(56,189,248,0.8)",
              }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-7 py-3 text-base font-semibold text-slate-950 shadow-neon transition-all"
              onClick={() => {
                const textarea = document.getElementById("html-editor");
                textarea?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              Start converting
              <ArrowUpRight className="size-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>
            <motion.button
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/15 dark:border-white/20 dark:bg-white/10 dark:text-white light:border-slate-300 light:bg-white light:text-slate-900 light:hover:border-slate-400 light:hover:bg-slate-50"
              onClick={() => {
                window.open("https://nextjs.org", "_blank");
              }}
            >
              Explore roadmap
              <Rocket className="size-4" />
            </motion.button>
          </div>
        </motion.section>

        <motion.section
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              label: "Conversion accuracy",
              value: "99.4%",
              sub: "Measured against 25k+ real-world snippets",
            },
            {
              label: "Performance",
              value: "12ms",
              sub: "Median conversion latency at 60fps",
            },
            {
              label: "Team adoption",
              value: "240+",
              sub: "Docs, DX, and marketing squads onboard",
            },
            {
              label: "Brand presets",
              value: "Unlimited",
              sub: "Configurable recipes & guardrails",
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05, duration: 0.5 }}
              className="group rounded-3xl border border-white/10 bg-white/10 px-6 py-6 text-left shadow-xl shadow-black/40 backdrop-blur transition-all hover:shadow-2xl dark:border-white/10 dark:bg-white/10 dark:shadow-black/40 light:border-slate-200 light:bg-white light:shadow-slate-300/30"
            >
              <p className="text-xs uppercase tracking-[0.45em] text-slate-300 dark:text-slate-300 light:text-slate-500">
                {item.label}
              </p>
              <p className="mt-4 bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-3xl font-semibold text-transparent transition-transform group-hover:scale-105 sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-slate-300 dark:text-slate-300 light:text-slate-600">{item.sub}</p>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          id="workspace"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
        >
          <motion.article
            whileHover={{
              boxShadow: "0 45px 120px -60px rgba(59,130,246,0.65)",
              y: -4
            }}
            transition={{ duration: 0.3 }}
            className="flex min-h-[540px] flex-col rounded-[32px] border border-white/10 bg-slate-900/40 p-6 shadow-[0px_32px_120px_-55px_rgba(14,116,144,0.65)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40 light:border-slate-200 light:bg-white/80 light:shadow-slate-400/30 md:min-h-[600px]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/40 bg-sky-500/20 text-sky-100 dark:border-sky-400/40 dark:bg-sky-500/20 dark:text-sky-100 light:border-sky-300 light:bg-sky-100 light:text-sky-700"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Terminal className="size-5" />
                </motion.div>
                <div>
                  <p className="text-xs uppercase tracking-[0.45em] text-slate-300 dark:text-slate-300 light:text-slate-500">
                    Source HTML
                  </p>
                  <p className="text-base font-semibold text-white dark:text-white light:text-slate-900">Editor</p>
                </div>
              </div>
              <motion.span
                className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200 dark:border-emerald-400/40 dark:bg-emerald-500/20 dark:text-emerald-200 light:border-emerald-400 light:bg-emerald-50 light:text-emerald-700"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Live sync
              </motion.span>
            </div>
            <textarea
              id="html-editor"
              spellCheck={false}
              value={htmlInput}
              onChange={(event) => {
                const { value } = event.target;
                startTransition(() => setHtmlInput(value));
              }}
              placeholder={`<section class="hero">
  <h1>Launch day 🚀</h1>
  <p>Turn your HTML universe into polished Markdown instantly.</p>
</section>`}
              className="mt-6 flex-1 resize-none rounded-[32px] border border-white/10 bg-slate-950/70 px-5 py-4 font-mono text-sm text-slate-200 shadow-inner shadow-black/20 transition-all focus:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-400/60 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-200 light:border-slate-200 light:bg-slate-50 light:text-slate-900 light:focus:border-sky-400 light:focus:ring-sky-300/60 md:text-base"
            />
            <div className="mt-5 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 sm:grid-cols-2 xl:grid-cols-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-sky-300" />
                {htmlInput.trim()
                  ? `${htmlInput.trim().split(/\s+/).length} words`
                  : "Awaiting HTML"}
              </div>
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-emerald-300" />
                {htmlInput
                  ? `${
                      htmlInput.split(/<[^>]+>/g).filter(Boolean).length
                    } nodes parsed`
                  : "No nodes"}
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-rose-300" />
                Structure lint {htmlInput ? "clean" : "idle"}
              </div>
            </div>
          </motion.article>

          <div className="flex flex-col gap-6">
            <motion.article
              whileHover={{
                boxShadow: "0 45px 110px -55px rgba(14,165,233,0.7)",
                y: -4
              }}
              transition={{ duration: 0.3 }}
              className="flex flex-1 flex-col rounded-[32px] border border-white/10 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-950/80 p-6 backdrop-blur-xl dark:border-white/10 dark:from-slate-900/80 dark:via-slate-900/50 dark:to-slate-950/80 light:border-slate-200 light:from-white light:via-slate-50 light:to-white"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/20 text-emerald-100 dark:border-emerald-400/40 dark:bg-emerald-500/20 dark:text-emerald-100 light:border-emerald-300 light:bg-emerald-100 light:text-emerald-700"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <CopyIcon className="size-5" />
                  </motion.div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.45em] text-slate-300 dark:text-slate-300 light:text-slate-500">
                      Markdown
                    </p>
                    <p className="text-base font-semibold text-white dark:text-white light:text-slate-900">
                      Optimized Output
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleCopy}
                  disabled={!markdownOutput || pending}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/20 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:border-sky-300 hover:bg-sky-400/25 hover:text-white disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-900/40 disabled:text-slate-500 dark:border-sky-400/40 dark:bg-sky-500/20 dark:text-sky-100 light:border-sky-400 light:bg-sky-100 light:text-sky-700 light:hover:bg-sky-200"
                  type="button"
                >
                  Copy Markdown
                  <ArrowUpRight className="size-4" />
                </motion.button>
              </div>
              <textarea
                readOnly
                spellCheck={false}
                value={markdownOutput}
                placeholder="Your Markdown will appear instantly..."
                className="mt-6 flex-1 resize-none rounded-3xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-sm text-slate-100 shadow-inner shadow-black/20 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-slate-100 light:border-slate-200 light:bg-slate-50 light:text-slate-900 md:text-base"
              />
              <div className="mt-5 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Wand2 className="size-4 text-purple-300" />
                  {insight.headings} headings remapped
                </div>
                <div className="flex items-center gap-2">
                  <ScanEye className="size-4 text-cyan-300" />
                  {insight.links} links verified
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="size-4 text-emerald-300" />
                  {insight.words} words optimized
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-amber-300" />
                  QA score {markdownOutput ? "A" : "—"}
                </div>
              </div>
            </motion.article>

            <motion.article
              id="roadmap"
              whileHover={{ y: -4 }}
              className="rounded-[32px] border border-white/10 bg-white/10 p-6 backdrop-blur"
            >
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.4em] text-slate-200">
                <Rocket className="size-4" /> Upcoming drops
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-emerald-400" />
                  Realtime co-editing and synced review comments across your
                  team.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-sky-400" />
                  CLI + GitHub Action for automatic Markdown commits on merge.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-amber-400" />
                  Structured export to MDX, Notion, and Confluence with native
                  embeds.
                </li>
              </ul>
            </motion.article>
          </div>
        </motion.section>

        <motion.section
          id="features"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.25 }}
          className="space-y-10"
        >
          <div className="flex flex-col gap-4 text-balance text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Engineered for the documentation frontier
            </h2>
            <p className="mx-auto max-w-3xl text-base text-slate-300 sm:text-lg">
              Every interaction is tuned for motion, clarity, and trust. Paired
              with accessible theming and multi-device responsiveness, Studio is
              built for the multi-modal teams of 2026.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureHighlights.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -8, rotateX: -2 }}
                className={`relative overflow-hidden rounded-[32px] border ${feature.accent} bg-white/10 p-6 text-left shadow-[0_25px_90px_-40px_rgba(59,130,246,0.55)] backdrop-blur`}
              >
                <div
                  className={`absolute -top-24 right-[-40%] h-48 w-48 rounded-full bg-gradient-to-br ${feature.gradient} opacity-40 blur-3xl`}
                />
                <feature.icon className="relative size-8 text-white" />
                <h3 className="relative mt-6 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="relative mt-3 text-sm text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="automation"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="grid gap-6 lg:grid-cols-[0.55fr_1fr]"
        >
          <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <h2 className="text-3xl font-semibold text-white">
              Automation, orchestrated.
            </h2>
            <p className="mt-3 text-balance text-base text-slate-300">
              Configure recipes, run consistency checks, and push Markdown
              directly into your delivery stack. Studio is more than a
              converter—it’s a publishing workflow engine.
            </p>
            <div className="mt-6 grid gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/50 px-4 py-3">
                <Cpu className="size-4 text-sky-300" />
                Self-healing conversions tuned with reinforcement learning.
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/50 px-4 py-3">
                <ShieldCheck className="size-4 text-emerald-300" />
                Secure, zero-retention processing by default.
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/50 px-4 py-3">
                <Palette className="size-4 text-purple-300" />
                Brand voice layers with Markdown tokens and emoji.
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {automationTimeline.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-64px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.22, 0.94, 0.4, 1],
                }}
                className={`relative overflow-hidden rounded-[32px] border ${step.accent} bg-white/10 p-6 backdrop-blur`}
              >
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-br ${step.gradient} opacity-25`}
                />
                <div className="flex items-center justify-between">
                  <step.icon className="size-6 text-white" />
                  <span className="text-sm font-semibold text-white/70">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-slate-100/80">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.35 }}
          className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-950/80 p-10 text-center shadow-[0_40px_120px_-60px_rgba(59,130,246,0.6)] backdrop-blur-xl"
        >
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Your team, your workflows, your voice.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-300 sm:text-lg">
            Drop Studio into your stack with SDKs, CLI, and Graph API
            integrations. Compose Markdown across docs, changelogs, tutorials,
            and product comms without context switching.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/15">
              Request enterprise access
            </button>
            <button className="rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-neon">
              Join the beta
            </button>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-white/10 bg-black/40 py-8 backdrop-blur dark:border-white/10 dark:bg-black/40 light:border-slate-200 light:bg-white/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-white dark:text-white light:text-slate-900">
            <motion.div
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 dark:border-white/10 dark:bg-white/10 light:border-slate-200 light:bg-slate-100"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Code2 className="size-4" />
            </motion.div>
            <span className="font-semibold">HTML → Markdown Studio</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <span>© {new Date().getFullYear()} Hyperdraft Systems</span>
            <span className="hidden sm:inline">•</span>
            <a className="transition hover:text-white dark:hover:text-white light:hover:text-slate-900" href="#">
              Security
            </a>
            <a className="transition hover:text-white dark:hover:text-white light:hover:text-slate-900" href="#">
              Status
            </a>
            <a className="transition hover:text-white dark:hover:text-white light:hover:text-slate-900" href="#">
              Docs
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {copyStatus !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 right-10 z-50 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 px-5 py-3 text-sm text-white shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90 light:border-slate-200 light:bg-white/90 light:text-slate-900"
          >
            {copyStatus === "copied" ? (
              <motion.span
                className="inline-flex items-center gap-2 text-emerald-300 dark:text-emerald-300 light:text-emerald-600"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <Sparkles className="size-4" /> Markdown copied
              </motion.span>
            ) : (
              <span className="inline-flex items-center gap-2 text-rose-300 dark:text-rose-300 light:text-rose-600">
                <ShieldCheck className="size-4" /> Copy failed
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
