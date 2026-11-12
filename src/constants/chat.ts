import type { Variants } from "framer-motion";
import type { Message } from "@/types";

export const MAX_QUESTIONS = 10;
export const LS_KEY = "ht_chat_ql";

export const TOPIC_KEYWORDS = [
  // Brand & Identity
  "ht", "solution", "high trust", "hendrik", "tarigan", "you", "your", "who", "profile", "about",
  "founder", "developer", "engineer", "tim", "siapa", "profil",

  // Greetings & Conversation Starters
  "halo", "hai", "hello", "hi", "hey", "pagi", "siang", "sore", "malam", "salam",
  "permisi", "tanya", "ask", "mau tanya", "bisa", "tolong", "bantu", "bantuan", "help",

  // Business & Operational Needs
  "bisnis", "usaha", "umkm", "toko", "kantor", "perusahaan", "dagang", "jual", "jualan",
  "masalah", "solusi", "kendala", "stok", "barang", "omset", "laba", "rugi", "pencatatan",
  "rekap", "laporan", "invoice", "faktur", "struk", "nota", "kasir", "pos", "katalog",

  // Development, Tech & Platforms
  "website", "web", "landing page", "desktop", "mobile", "aplikasi", "app", "apps",
  "android", "ios", "pwa", "software", "sistem", "program", "tool", "otomasi", "automation",
  "excel", "spreadsheet", "google sheets", "apps script", "dashboard", "database", "api",
  "coding", "code", "dev", "develop", "skripsi", "riset", "tugas akhir",

  // Pricing, Process & Guarantees
  "jasa", "layanan", "service", "paket", "harga", "biaya", "rate", "cost", "price", "pricing",
  "budget", "murah", "bayar", "dp", "uang muka", "garansi", "warranty", "alur", "cara kerja",
  "berapa lama", "estimasi", "durasi", "waktu", "konsultasi", "cikarang", "bekasi", "remote",
  "wa", "whatsapp", "kontak", "contact", "order", "pesan", "portofolio", "portfolio", "contoh",
];

export const GREETING_BY_LANG: Record<"id" | "en", Message> = {
  id: {
    id: "greeting",
    role: "model",
    content:
      "Halo! Saya asisten AI HT Solution (High Trust Solution). Mau tanya seputar rekayasa aplikasi (web, desktop, mobile), otomasi spreadsheet, paket harga, atau alur kerja?",
    timestamp: new Date(),
  },
  en: {
    id: "greeting",
    role: "model",
    content:
      "Hello! I am HT Solution's AI assistant. Ask me anything about our software engineering services (web, desktop & mobile), spreadsheet automations, or pricing packages.",
    timestamp: new Date(),
  },
};

export const QUICK_QUESTIONS_BY_LANG: Record<"id" | "en", string[]> = {
  id: [
    "Berapa harga pembuatan website usaha?",
    "Bisa bantu otomasi spreadsheet / Excel?",
    "Bagaimana alur kerja dan garansi 30 hari?",
  ],
  en: [
    "What services and packages do you offer?",
    "How does spreadsheet automation work?",
    "How does the 30-day warranty work?",
  ],
};

export const GREETING: Message = GREETING_BY_LANG.id;
export const QUICK_QUESTIONS = QUICK_QUESTIONS_BY_LANG.id;

// ─── Chat Animation Variants ─────────────────────────────────────────────────

export const panelVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.92, transformOrigin: "bottom right" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 26, stiffness: 320 },
  },
  exit: { opacity: 0, y: 16, scale: 0.95, transition: { duration: 0.18 } },
};

export const msgVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 32 },
  },
};

export const dotTransition = (delay: number) => ({
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeInOut" as const,
  delay,
});
