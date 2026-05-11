"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if we already loaded in this session
    if (sessionStorage.getItem("preloader_shown")) {
      setLoading(false);
      return;
    }

    // Wait for document load or simply a timeout
    const handleLoad = () => {
      // Add a slight delay for better UX if it loads too fast
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("preloader_shown", "true");
      }, 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Fallback timeout in case 'load' never fires correctly
      setTimeout(handleLoad, 3000);
    }

    return () => window.removeEventListener("load", handleLoad);
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#024244]"
        >
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/logo.png"
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