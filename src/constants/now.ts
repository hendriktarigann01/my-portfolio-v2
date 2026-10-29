import type { NowItem } from "@/types";

export const NOW_ITEMS_BY_LANG: Record<"id" | "en", NowItem[]> = {
  id: [
    {
      label: "Status Layanan",
      value: "Menerima Proyek Baru",
      note: "Kapasitas tersedia untuk rekayasa aplikasi (web, desktop, mobile), otomasi spreadsheet, sistem kasir, dan bimbingan IT.",
      rotation: "rotate-1",
    },
    {
      label: "Fokus Solusi",
      value: "Sistem & Otomasi Bisnis",
      note: "Membantu UMKM, toko, dan kantor merapikan operasional, otomasi data, dan memiliki sistem handal di berbagai perangkat.",
      rotation: "-rotate-1",
    },
    {
      label: "Basis & Jangkauan",
      value: "Cikarang & Seluruh Indonesia",
      note: "Berbasis di Cikarang (Jababeka, Lippo, MM2100). Komunikasi lancar via WhatsApp & Google Meet dari mana saja.",
      rotation: "rotate-1",
    },
    {
      label: "Komitmen Jam Kerja",
      value: "Malam & Akhir Pekan",
      note: "Senin-Jumat 18.00-21.00 WIB, Sabtu-Minggu 08.00-21.00 WIB. Pengerjaan fokus, transparan, dan bergaransi.",
      rotation: "rotate-0",
    },
  ],
  en: [
    {
      label: "Availability",
      value: "Open for New Projects",
      note: "Ready to take on new software projects across web, desktop, and mobile, spreadsheet automations, and custom dashboards.",
      rotation: "rotate-1",
    },
    {
      label: "Core Focus",
      value: "Systems & Data Automation",
      note: "Modernizing operational workflows, automating spreadsheets, and crafting reliable multi-platform software.",
      rotation: "-rotate-1",
    },
    {
      label: "Location & Coverage",
      value: "Cikarang & Remote Worldwide",
      note: "Based in Cikarang industrial hub, Indonesia. Delivering software solutions seamlessly via WhatsApp & Meet.",
      rotation: "rotate-1",
    },
    {
      label: "Active Schedule",
      value: "Evenings & Weekends",
      note: "Mon-Fri 18:00-21:00 WIB, Sat-Sun 08:00-21:00 WIB. Dedicated deep work with transparent milestone updates.",
      rotation: "rotate-0",
    },
  ],
};

export const NOW_ITEMS: NowItem[] = NOW_ITEMS_BY_LANG.id;
