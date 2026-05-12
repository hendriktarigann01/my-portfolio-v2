// Tujuan      : Root layout — wraps semua halaman dengan providers global
// Caller      : Next.js App Router (otomatis)
// Dependensi  : SmoothScrollProvider, CursorFollow, Preloader, GlobalIllustrations,
//               ChatWidget, Navbar, Footer, AudioProvider
// Main Exports: RootLayout (default)
// Side Effects: Font load, audio init

import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CursorFollow } from "@/components/CursorFollow";
import { Preloader } from "@/components/Preloader";
import { GlobalIllustrations } from "@/components/GlobalIllustrations";
import { ChatWidget } from "@/components/ChatWidget";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AudioProvider } from "@/lib/audio-context";

export const metadata: Metadata = {
  title: "Hendrik Tarigan",
  description: "From whiteboard to working product. End to end, solo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* AudioProvider di luar SmoothScrollProvider agar persist saat navigasi */}
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
