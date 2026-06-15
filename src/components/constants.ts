import type { Variants } from "framer-motion";
import type { NavLink, IllustrationData, Message } from "./types";

// ─── Theme ────────────────────────────────────────────────────────────────────

export const ACCENT = "rgba(239,209,195,";

// ─── Carousel ─────────────────────────────────────────────────────────────────

export const THUMB_ACTIVE_W = 110;
export const THUMB_INACTIVE_W = 32;
export const THUMB_GAP = 3;
export const THUMB_MARGIN = 2;

// ─── Navbar ───────────────────────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: "WORK", href: "#work" },
  { label: "PROCESS", href: "#process" },
  { label: "NOW", href: "#now" },
  { label: "CONTACT", href: "#contact" },
];

// ─── Global Illustrations ─────────────────────────────────────────────────────

export const ILLUSTRATIONS: IllustrationData[] = [
  { src: "/illustration/5.png",  top: 5,  left: "3%",   w: 80, rotate: -8  },
  { src: "/illustration/6.png",  top: 15, left: "80%",  w: 80, rotate: 6   },
  { src: "/illustration/1.png",  top: 35, left: "2%",   w: 80, rotate: -5  },
  { src: "/illustration/9.png",  top: 45, left: "85%",  w: 80, rotate: 8   },
  { src: "/illustration/2.png",  top: 60, left: "3%",   w: 80, rotate: 5   },
  { src: "/illustration/7.png",  top: 75, left: "83%",  w: 80, rotate: -6  },
  { src: "/illustration/3.png",  top: 85, left: "5%",   w: 80, rotate: 7   },
  { src: "/illustration/4.png",  top: 95, left: "80%",  w: 80, rotate: -4  },
  { src: "/illustration/8.png",  top: 25, left: "88%",  w: 80, rotate: -10 },
  { src: "/illustration/10.png", top: 55, left: "78%",  w: 80, rotate: 9   },
  { src: "/illustration/11.png", top: 70, left: "10%",  w: 80, rotate: -5  },
  { src: "/illustration/12.png", top: 10, left: "15%",  w: 80, rotate: 4   },
];

export const ILLUSTRATION_SPREAD = 7.5;

// ─── Location Map ─────────────────────────────────────────────────────────────

export const HOME_LOCATION = {
  lat: -6.2329298,
  lng: 107.1418222,
  city: "Cikarang",
  country: "Indonesia",
};

// ─── Chat Widget ──────────────────────────────────────────────────────────────

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
    "Hey! 👋 I'm Hendrik's AI assistant. Ask me anything about his work, skills, or how to collaborate!",
  timestamp: new Date(),
};

export const QUICK_QUESTIONS = [
  "What's Hendrik's primary tech stack?",
  "Is he available for freelance work?",
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

// ─── ProjectCard ──────────────────────────────────────────────────────────────

export const DEFAULT_ACCENT = "rgba(239,209,195,0.06)";
