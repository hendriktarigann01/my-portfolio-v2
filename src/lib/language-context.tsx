"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  ReactNode,
} from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "id",
  setLang: () => {},
  toggleLang: () => {},
});

let currentLang: Language = "id";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Language {
  return currentLang;
}

function getServerSnapshot(): Language {
  return "id";
}

function setLanguageStore(newLang: Language) {
  if (currentLang === newLang) return;
  currentLang = newLang;
  try {
    localStorage.setItem("preferred_lang", newLang);
  } catch {
    // ignore storage error
  }
  listeners.forEach((listener) => listener());
}

if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("preferred_lang") as Language | null;
    if (saved === "id" || saved === "en") {
      currentLang = saved;
    } else {
      const browserLang = navigator.language?.toLowerCase() || "";
      currentLang = browserLang.startsWith("en") ? "en" : "id";
    }
  } catch {
    // fallback
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = (newLang: Language) => {
    setLanguageStore(newLang);
  };

  const toggleLang = () => {
    setLanguageStore(lang === "id" ? "en" : "id");
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
