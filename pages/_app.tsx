import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";
import { Nunito } from '@next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'], // Choose weights as needed (e.g., regular and bold)
  variable: "--font-nunito",
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${nunito.variable} font-nunito`}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
    </main>
  );
}
