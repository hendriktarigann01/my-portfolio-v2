import type { Variants } from "framer-motion";
import type { Message } from "@/types";

export const MAX_QUESTIONS = 10;
export const LS_KEY = "ht_chat_ql";

export const TOPIC_KEYWORDS = [
  "hendrik", "tarigan", "you", "your", "he", "his", "profile", "about",
  "work", "project", "portfolio", "skill", "tech", "stack", "code", "build",
  "develop", "design", "frontend", "backend", "fullstack", "next", "react",
  "typescript", "javascript", "node", "supabase", "database", "api",
  "hire", "freelance", "collaborate", "available", "contact", "price",
  "rate", "cost", "project", "client", "work together",
  "experience", "background", "education", "career", "job", "role",
];

export const GREETING: Message = {
  id: "greeting",
  role: "model",
  content:
    "Hey! 👋 I'm Hendrik's AI assistant. Ask me anything about his projects, skills, or how to collaborate!",
  timestamp: new Date(),
};

export const QUICK_QUESTIONS = [
  "What's Hendrik's primary tech stack?",
  "Is he available for freelance projects?",
  "How can we collaborate on a project?",
];

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
  y: { duration: 0.4, repeat: Infinity, repeatType: "reverse" as const, delay },
});
