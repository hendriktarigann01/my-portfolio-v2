"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useEffect,
  useState,
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("preferred_lang") as Language | null;
      if (saved === "id" || saved === "en") {
        setLanguageStore(saved);
      }
    } catch {
      // ignore storage error
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLanguageStore(newLang);
  };

  const toggleLang = () => {
    setLanguageStore(lang === "id" ? "en" : "id");
  };

  const value = {
    lang: mounted ? lang : "id",
    setLang,
    toggleLang,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
