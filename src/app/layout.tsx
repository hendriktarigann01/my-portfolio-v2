import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { AppShell } from "@/components/AppShell";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.htsolution.my.id"),
  title: "HT Solution • Multi-Platform Software & Business Automation",
  description:
    "HT Solution (High Trust Solution) - Engineering high performance applications (web, desktop & mobile), spreadsheet automations, and custom business software.",
  alternates: {
    canonical: "https://www.htsolution.my.id",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "HT Solution • Multi-Platform Software & Business Automation",
    description:
      "HT Solution (High Trust Solution) - Engineering high performance applications (web, desktop & mobile), spreadsheet automations, and custom business software.",
    url: "https://www.htsolution.my.id",
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
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
