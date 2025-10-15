import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { Nunito, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HTML to Markdown Studio",
  description:
    "A hyper-modern studio that transforms HTML snippets into elegant Markdown in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${spaceGrotesk.variable} antialiased transition-colors duration-300`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 light:from-slate-50 light:via-white light:to-slate-100">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18)_0,transparent_45%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.2)_0,transparent_45%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.18)_0,transparent_40%)] dark:opacity-100 light:opacity-30" />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
