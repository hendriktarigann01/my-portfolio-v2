"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    try {
      if (sessionStorage.getItem("preloader_shown")) {
        setLoading(false);
        return;
      }
    } catch {
      // ignore storage error
    }

    let delayTimer: ReturnType<typeof setTimeout> | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

    const handleLoad = () => {
      delayTimer = setTimeout(() => {
        setLoading(false);
        try {
          sessionStorage.setItem("preloader_shown", "true");
        } catch {
          /* ignore */
        }
      }, 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
      fallbackTimer = setTimeout(handleLoad, 3000);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      if (delayTimer) clearTimeout(delayTimer);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)]"
        >
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/logo.webp"
                alt="HT Logo"
                width={140}
                height={140}
                priority
                className="object-contain"
              />
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
