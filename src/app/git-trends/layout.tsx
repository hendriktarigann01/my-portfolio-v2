import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Trending GitHub Repositories | Hendrik Tarigan",
  description:
    "Kurasi repositori open-source GitHub yang paling diminati hari ini, dirangkum secara ringkas oleh AI setiap pagi jam 06:00 WIB.",
  openGraph: {
    title: "Top Trending GitHub Repositories | Hendrik Tarigan",
    description:
      "Kurasi repositori open-source GitHub yang paling diminati hari ini, dirangkum secara ringkas oleh AI setiap pagi jam 06:00 WIB.",
    url: "https://htsolution.tech/git-trends",
    siteName: "Hendrik Tarigan Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Trending GitHub Repositories | Hendrik Tarigan",
    description:
      "Kurasi repositori open-source GitHub yang paling diminati hari ini, dirangkum secara ringkas oleh AI setiap pagi jam 06:00 WIB.",
  },
};

export default function GitTrendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
