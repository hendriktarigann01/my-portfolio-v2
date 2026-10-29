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
import { LanguageProvider } from "@/lib/language-context";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://htsolution.tech"),
  title: "HT Solution • Multi-Platform Software & Business Automation",
  description:
    "HT Solution (High Trust Solution) - Engineering high performance applications (web, desktop & mobile), spreadsheet automations, and custom business software.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HT Solution • Multi-Platform Software & Business Automation",
    description:
      "HT Solution (High Trust Solution) - Engineering high performance applications (web, desktop & mobile), spreadsheet automations, and custom business software.",
    url: "https://htsolution.tech",
    siteName: "HT Solution",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HT Solution • Multi-Platform Software & Business Automation",
    description:
      "HT Solution (High Trust Solution) - Engineering high performance applications (web, desktop & mobile), spreadsheet automations, and custom business software.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={dmSans.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <SmoothScrollProvider>
            <Preloader />
            <GlobalIllustrations />
            <CursorFollow />
            <Navbar />
            {children}
            <Footer />
          </SmoothScrollProvider>
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
