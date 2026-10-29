import type { NavLink } from "@/types";

export const NAV_LINKS_BY_LANG: Record<"id" | "en", NavLink[]> = {
  id: [
    { label: "BERANDA", href: "/" },
    { label: "PROYEK", href: "#projects" },
    { label: "LAYANAN", href: "#services" },
    { label: "LAB", href: "/lab" },
    { label: "KONTAK", href: "#contact" },
  ],
  en: [
    { label: "HOME", href: "/" },
    { label: "PROJECTS", href: "#projects" },
    { label: "SERVICES", href: "#services" },
    { label: "LAB", href: "/lab" },
    { label: "CONTACT", href: "#contact" },
  ],
};

export const NAV_LINKS: NavLink[] = NAV_LINKS_BY_LANG.en;
