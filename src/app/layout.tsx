// Tujuan      : Root layout — wraps semua halaman dengan providers global
// Caller      : Next.js App Router (otomatis)
// Dependensi  : SmoothScrollProvider, CursorFollow, Preloader, GlobalIllustrations,
//               ChatWidget, Navbar, Footer, AudioProvider
// Main Exports: RootLayout (default)
// Side Effects: Font load, audio init

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CursorFollow } from "@/components/CursorFollow";
import { Preloader } from "@/components/Preloader";
import { GlobalIllustrations } from "@/components/GlobalIllustrations";
import { ChatWidget } from "@/components/ChatWidget";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AudioProvider } from "@/lib/audio-context";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://htsolution.tech"),
  title: "Hendrik Tarigan",
  description:
    "Fullstack developer crafting high performance digital systems and turning complex workflows into elegant web and desktop applications.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hendrik Tarigan",
    description:
      "Fullstack developer crafting high performance digital systems and turning complex workflows into elegant web and desktop applications.",
    url: "https://htsolution.tech",
    siteName: "Hendrik Tarigan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hendrik Tarigan",
    description:
      "Fullstack developer crafting high performance digital systems and turning complex workflows into elegant web and desktop applications.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <AudioProvider>
          <SmoothScrollProvider>
            <Preloader />
            <GlobalIllustrations />
            <CursorFollow />
            <Navbar />
            {children}
            <Footer />
          </SmoothScrollProvider>
          <ChatWidget />
        </AudioProvider>
      </body>
    </html>
  );
}
