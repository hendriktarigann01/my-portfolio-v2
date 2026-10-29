"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { NAV_LINKS } from "@/constants";
import { NAV_LINKS_BY_LANG } from "@/constants/navigation";
import { globalLenis } from "@/components/SmoothScrollProvider";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md text-[0.7rem] font-medium tracking-wider select-none ${className}`}
      style={{ fontFamily: "var(--font-body)" }}
      role="group"
      aria-label="Pilih Bahasa"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => setLang("id")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLang("id");
          }
        }}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer select-none ${
          lang === "id"
            ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow-sm"
            : "text-[var(--text-subtle)] hover:text-[var(--text-primary)]"
        }`}
        aria-label="Bahasa Indonesia"
        aria-pressed={lang === "id"}
      >
        ID
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setLang("en")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLang("en");
          }
        }}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer select-none ${
          lang === "en"
            ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow-sm"
            : "text-[var(--text-subtle)] hover:text-[var(--text-primary)]"
        }`}
        aria-label="English"
        aria-pressed={lang === "en"}
      >
        EN
      </div>
    </div>
  );
}

export function VerticalLanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`flex flex-col items-center p-1 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md text-[0.7rem] font-bold tracking-wider select-none shadow-lg gap-1 ${className}`}
      style={{ fontFamily: "var(--font-body)" }}
      role="group"
      aria-label="Pilih Bahasa"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => setLang("id")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLang("id");
          }
        }}
        className={`w-9 h-9 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center select-none ${
          lang === "id"
            ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-sm font-bold"
            : "text-[var(--text-subtle)] hover:text-[var(--text-primary)]"
        }`}
        aria-label="Bahasa Indonesia"
        aria-pressed={lang === "id"}
      >
        ID
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setLang("en")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLang("en");
          }
        }}
        className={`w-9 h-9 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center select-none ${
          lang === "en"
            ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-sm font-bold"
            : "text-[var(--text-subtle)] hover:text-[var(--text-primary)]"
        }`}
        aria-label="English"
        aria-pressed={lang === "en"}
      >
        EN
      </div>
    </div>
  );
}

export function Navbar() {
  const { lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const currentNavLinks = NAV_LINKS_BY_LANG[lang] || NAV_LINKS;
  const reversedNavLinks = [...currentNavLinks].reverse();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);

    if (href === "/") {
      if (pathname === "/") {
        if (globalLenis) {
          globalLenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        router.push("/");
      }
      return;
    }

    if (href.startsWith("/")) {
      router.push(href);
      return;
    }

    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    if (href === "#") {
      if (globalLenis) {
        globalLenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    if (globalLenis) {
      globalLenis.scrollTo(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Left Sidebar: Logo & Copyright */}
      <div
        className="hidden md:block fixed left-0 top-0 bottom-0 w-24 z-50 pointer-events-none"
        style={{ borderColor: "rgba(var(--accent-rgb),0.05)" }}
      >
        <motion.div
          className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a href="#" onClick={(e) => handleClick(e, "#")}>
            <Image
              src="/logo.webp"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </a>
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            transform: "translate(-50%, -50%) rotate(-90deg)",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "rgba(var(--accent-rgb),0.4)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            © 2026 HT Solution
          </span>
        </motion.div>
      </div>

      {/* Desktop Right Sidebar: Navigation Links */}
      <div
        className="hidden md:block fixed right-0 top-0 bottom-0 w-24 z-50 pointer-events-none"
        style={{ borderColor: "rgba(var(--accent-rgb),0.05)" }}
      >
        <motion.nav
          className="absolute top-1/2 right-1/2 pointer-events-auto flex items-center gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            transform: "translate(50%, -50%) rotate(-90deg)",
            whiteSpace: "nowrap",
          }}
        >
          {reversedNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="hover-underline text-[rgba(var(--accent-rgb),0.65)] hover:text-[var(--accent)] transition-colors duration-300 uppercase font-medium tracking-[0.2em] text-[0.75rem]"
              style={{
                fontFamily: "var(--font-body)",
              }}
            >
              {link.label}
            </a>
          ))}
        </motion.nav>
      </div>

      {/* Mobile Header Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between pointer-events-none">
        <motion.a
          href="#"
          onClick={(e) => handleClick(e, "#")}
          className="pointer-events-auto"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "var(--accent)",
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          HT<span style={{ color: "rgba(var(--accent-rgb),0.35)" }}>.</span>
        </motion.a>

        <div className="flex items-center gap-3 pointer-events-auto">
          <LanguageToggle />
          <motion.button
            type="button"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--accent)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
            }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Fullscreen Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 z-40 flex flex-col justify-center items-center gap-8"
            style={{
              background: "rgba(2, 66, 68, 0.98)",
              backdropFilter: "blur(20px)",
            }}
          >
            {currentNavLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                className="text-[var(--accent)] hover:text-[rgba(var(--accent-rgb),0.5)] transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Vertical Language Toggle di Kiri Bawah (Layout Bekas Fitur Sound) */}
      <motion.div
        className="pointer-events-auto hidden md:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 9999,
        }}
      >
        <VerticalLanguageToggle />
      </motion.div>
    </>
  );
}
