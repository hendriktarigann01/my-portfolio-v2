import type { NavLink } from "@/types";

export const NAV_LINKS_BY_LANG: Record<"id" | "en", NavLink[]> = {
  id: [
    { label: "PROYEK", href: "#projects" },
    { label: "PROSES", href: "#process" },
    { label: "LAYANAN", href: "#services" },
    { label: "GIT TRENDS", href: "git-trends" },
    { label: "FAQ & GARANSI", href: "#faq" },
    { label: "KONTAK", href: "#contact" },
  ],
  en: [
    { label: "PROJECTS", href: "#projects" },
    { label: "PROCESS", href: "#process" },
    { label: "SERVICES", href: "#services" },
    { label: "GIT TRENDS", href: "git-trends" },
    { label: "FAQ & TERMS", href: "#faq" },
    { label: "CONTACT", href: "#contact" },
  ],
};

export const NAV_LINKS: NavLink[] = NAV_LINKS_BY_LANG.en;
