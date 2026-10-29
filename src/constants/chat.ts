import type { Variants } from "framer-motion";
import type { Message } from "@/types";

export const MAX_QUESTIONS = 10;
export const LS_KEY = "ht_chat_ql";

export const TOPIC_KEYWORDS = [
  "ht", "solution", "high", "trust", "hendrik", "tarigan", "you", "your", "he", "his", "profile", "about",
  "work", "project", "portfolio", "skill", "tech", "stack", "code", "build",
  "develop", "design", "frontend", "backend", "fullstack", "next", "react",
  "typescript", "javascript", "node", "supabase", "database", "api",
  "hire", "freelance", "collaborate", "available", "contact", "price",
  "rate", "cost", "project", "client", "work together",
  "experience", "background", "education", "career", "job", "role",
  // Indonesian keywords
  "jasa", "layanan", "harga", "biaya", "paket", "kasir", "toko", "otomasi",
  "excel", "spreadsheet", "garansi", "cikarang", "bekasi", "skripsi", "wa",
  "whatsapp", "pesan", "order", "alur", "cara kerja", "bikin", "buat", "website",
  "web", "desktop", "mobile", "aplikasi", "android", "sistem", "dashboard", "dp", "uang muka", "bantuan", "konsultasi",
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
