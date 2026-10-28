import type { PricingPlan } from "@/types";

export const SERVICE_PLANS_BY_LANG: Record<"id" | "en", PricingPlan[]> = {
  id: [
    {
      id: "web-kilat",
      name: "Website Kilat Usaha",
      price: "399k-499k",
      priceSub: "1-3 hari kerja",
      description:
        "Landing page profil usaha siap jualan. Langsung tayang di Google dengan tombol order WhatsApp & integrasi Google Maps.",
      isPopular: true,
      features: [
        "Desain responsif & sangat cepat di HP",
        "Tombol direct order WhatsApp & QRIS",
        "Integrasi lokasi Google Maps & jam buka",
        "Gratis perapihan logo & banner promosi (Canva)",
        "Sudah termasuk hosting & domain (.my.id / .web.id)",
        "Siap pakai dalam 1-3 hari kerja",
      ],
      waText:
        "Halo Mas Hendrik, saya tertarik dengan paket *Website Kilat Usaha (Rp399k-499k)*. Mau konsultasi kebutuhan website untuk usaha saya.",
      videoSrc: "/assets/landing-pages/in-lite/example.webm",
    },
    {
      id: "otomasi-data",
      name: "Otomasi Excel & Spreadsheet",
      price: "250k-600k",
      priceSub: "1-2 hari kerja",
      description:
        "Otomasi pencatatan data dan rekap omset otomatis tanpa salin manual tiap hari. Hemat waktu kerja berjam-jam.",
      features: [
        "Rumus otomatis & Google Apps Script cerdas",
        "Rekap omset harian/bulanan tanpa ketik ulang",
        "Auto-generate invoice PDF siap kirim ke WA",
        "Sinkronisasi otomatis antar sheet & cabang",
        "Cocok untuk admin kantor, toko grosir & agen",
        "Video panduan singkat penggunaan",
      ],
      waText:
        "Halo Mas Hendrik, saya mau tanya soal jasa *Otomasi Excel / Spreadsheet*. Kebutuhan saya untuk merapikan data transaksi usaha.",
    },
    {
      id: "web-custom",
      name: "Website Custom & Branding",
      price: "850k-1.200k",
      priceSub: "4-7 hari kerja",
      description:
        "Desain eksklusif dibangun sesuai karakter brand Anda. Tampilan kredibel, animasi halus, dan optimasi SEO Google.",
      features: [
        "Desain unik 100% custom (bukan template pasaran)",
        "Animasi interaktif halus & tampilan elegan",
        "Optimasi SEO agar mudah dicari di Google",
        "Gratis domain .com selama 1 tahun",
        "Cocok untuk ruko, klinik, supplier, kontraktor",
        "Garansi gratis perbaikan bug 30 hari",
      ],
      waText:
        "Halo Mas Hendrik, saya ingin berkonsultasi mengenai paket *Website Custom & Branding*. Mau diskusi konsep dan kebutuhan spesifik usaha saya.",
    },
    {
      id: "sistem-kasir",
      name: "Sistem Kasir & Dashboard (PWA)",
      price: "Mulai 1.500k",
      priceSub: "1-2 minggu",
      description:
        "Sistem kasir (POS), stok barang, dan dashboard omset. Bisa dibuka di HP tanpa biaya langganan bulanan.",
      features: [
        "Pencatatan kasir, stok barang & riwayat penjualan",
        "Dashboard omset & laba usaha real-time",
        "Bisa di-install di HP (PWA) tanpa download Play Store",
        "Beli putus: data milik Anda, tanpa sewa bulanan",
        "Hak akses berjenjang (Kasir / Owner)",
        "Pendampingan awal & garansi bugfix 30 hari",
      ],
      waText:
        "Halo Mas Hendrik, saya butuh *Sistem Kasir / Dashboard Bisnis*. Mau tanya estimasi dan alur pembuatannya untuk usaha saya.",
    },
    {
      id: "riset-it",
      name: "Konsultasi & Prototipe Riset IT",
      price: "Mulai 500k",
      priceSub: "fleksibel",
      description:
        "Bantuan perancangan arsitektur, pengerjaan modul coding, dan bimbingan teknis proyek software/tugas akhir IT.",
      features: [
        "Pembuatan modul sistem (Fullstack, API, Database, ML)",
        "Clean code terstruktur, rapi & mudah dipelajari",
        "Sesi penjelasan teknis alur kode via Google Meet",
        "Dokumentasi kode & petunjuk instalasi lengkap",
        "Kerahasiaan & privasi data 100% terjamin",
        "Konsultasi penentuan lingkup & budget gratis",
      ],
      waText:
        "Halo Mas Hendrik, saya mau konsultasi bantuan teknis / modul untuk *Proyek Software / Riset IT* saya.",
    },
  ],
  en: [
    {
      id: "web-kilat",
      name: "Launch (Quick Website)",
      price: "399k-499k",
      priceSub: "1-3 business days",
      description:
        "Ready-to-sell business landing page. Fast turnaround with direct WhatsApp order & QRIS integration.",
      isPopular: true,
      features: [
        "Clean, responsive & ultra-fast on mobile devices",
        "Direct WhatsApp ordering & QRIS payment",
        "Google Maps & business profile integration",
        "Free logo & banner touch-up included (Canva)",
        "Includes hosting & domain (.my.id / .web.id)",
        "Ready in 1-3 business days",
      ],
      waText:
        "Hi Hendrik, I am interested in the *Quick Business Website (Rp399k-499k)* package. I would like to consult about website options for my business.",
      videoSrc: "/assets/landing-pages/in-lite/example.webm",
    },
    {
      id: "otomasi-data",
      name: "Spreadsheet & Data Automation",
      price: "250k-600k",
      priceSub: "1-2 business days",
      description:
        "Automate spreadsheet entries, daily revenue reports, and invoices. Eliminate hours of tedious manual data entry.",
      features: [
        "Smart formulas & custom Google Apps Scripts",
        "Automated daily/monthly sales summaries",
        "One-click PDF invoice generation via WhatsApp",
        "Instant sync across sheets & branch records",
        "Perfect for admins, distributors & retail shops",
        "Short video walkthrough included",
      ],
      waText:
        "Hi Hendrik, I would like to inquire about *Spreadsheet Automation* for my business operations.",
    },
    {
      id: "web-custom",
      name: "Signature (Custom Branding)",
      price: "850k-1,200k",
      priceSub: "4-7 business days",
      description:
        "Bespoke web presence crafted to match your brand identity. Smooth interactions, high credibility, and SEO-ready.",
      features: [
        "100% bespoke design, built from scratch",
        "Fluid, interactive micro-animations",
        "Google SEO optimization & meta setup",
        "Free .com domain for 1 full year",
        "Ideal for clinics, suppliers & modern businesses",
        "30-day bugfix guarantee included",
      ],
      waText:
        "Hi Hendrik, I would like to discuss the *Custom Branding Web* package for my company.",
    },
    {
      id: "sistem-kasir",
      name: "Platform (POS & Dashboard PWA)",
      price: "From 1,500k",
      priceSub: "1-2 weeks",
      description:
        "Web-based POS, inventory tracking, and revenue dashboard. Mobile-ready (PWA) with zero recurring software fees.",
      features: [
        "POS checkout, inventory tracking & sales records",
        "Real-time revenue & profit analytics dashboard",
        "Installable on mobile (PWA) without app store hassle",
        "One-time payment: you own the system & data",
        "Role-based access (Cashier / Owner)",
        "Hands-on onboarding & 30-day bugfix warranty",
      ],
      waText:
        "Hi Hendrik, I would like to discuss a *POS / Custom Dashboard System* for my business.",
    },
    {
      id: "riset-it",
      name: "IT Research & Software Prototyping",
      price: "From 500k",
      priceSub: "flexible",
      description:
        "Architectural design, module coding, and technical mentoring for IT software projects, academic research, or startups.",
      features: [
        "Custom module development (Fullstack, API, ML)",
        "Clean, modular architecture & easy-to-read code",
        "1-on-1 technical walkthrough via Google Meet",
        "Comprehensive setup documentation & runbooks",
        "100% confidential & strictly protected privacy",
        "Free scope & requirement consultation",
      ],
      waText:
        "Hi Hendrik, I would like to consult about technical assistance / module build for my *Software Research Project*.",
    },
  ],
};

export const SERVICE_PLANS = SERVICE_PLANS_BY_LANG.id;
