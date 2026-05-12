// Tujuan      : Navbar global — sidebar desktop + mobile fullscreen overlay menu
// Caller      : src/app/layout.tsx
// Dependensi  : framer-motion, lucide-react, useAudio (lib/audio-context)
// Main Exports: Navbar
// Side Effects: Audio toggle via AudioContext

"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAudio } from "@/lib/audio-context";

const navLinks = [
  { label: "WORK", href: "#work" },
  { label: "PROCESS", href: "#process" },
  { label: "NOW", href: "#now" },
  { label: "CONTACT", href: "#contact" },
];

export function Navbar() {
  const { isPlaying, toggleSound } = useAudio();
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* --- LEFT SIDEBAR (desktop only) --- */}
      <div className="hidden md:block fixed left-0 top-0 bottom-0 w-24 z-50 pointer-events-none" style={{ borderColor: "rgba(239,209,195,0.05)" }}>

        {/* Logo */}
        <motion.div
          className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a href="#" onClick={(e) => handleClick(e, "#")}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </a>
        </motion.div>

        {/* Middle Vertical Text */}
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
              color: "rgba(239,209,195,0.4)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            © {new Date().getFullYear()} Hendrik Tarigan
          </span>
        </motion.div>
      </div>

      {/* --- RIGHT SIDEBAR (desktop only) --- */}
      <div className="hidden md:block fixed right-0 top-0 bottom-0 w-24 z-50 pointer-events-none" style={{ borderColor: "rgba(239,209,195,0.05)" }}>
        <motion.nav
          className="absolute top-1/2 right-1/2 pointer-events-auto flex items-center gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            transform: "translate(50%, -50%) rotate(-90deg)",
            whiteSpace: "nowrap",
          }}
        >
          {navLinks.slice().reverse().map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="hover-underline"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "rgba(239,209,195,0.65)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 500,
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#efd1c3")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(239,209,195,0.65)")}
            >
              {link.label}
            </a>
          ))}
        </motion.nav>
      </div>

      {/* --- MOBILE TOP BAR --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between">
        {/* Logo text */}
        <motion.a
          href="#"
          onClick={(e) => handleClick(e, "#")}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "#efd1c3",
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          HT<span style={{ color: "rgba(239,209,195,0.35)" }}>.</span>
        </motion.a>

        {/* Hamburger button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            background: "transparent",
            border: "none",
            color: "#efd1c3",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4px",
          }}
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background: "rgba(2,20,21,0.97)", backdropFilter: "blur(20px)" }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "#efd1c3",
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(239,209,195,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#efd1c3")}
              >
                {link.label}
              </motion.a>
            ))}

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              style={{ width: 48, height: 1, background: "rgba(239,209,195,0.15)" }}
            />

            {/* Audio toggle */}
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              onClick={toggleSound}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                border: "1px solid rgba(239,209,195,0.2)",
                borderRadius: "9999px",
                padding: "10px 20px",
                color: "rgba(239,209,195,0.7)",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
              {isPlaying ? "Sound On" : "Sound Off"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Left Audio Control FAB (all screens) */}
      <motion.button
        className="pointer-events-auto hidden md:flex"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleSound}
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "none",
          background: isPlaying ? "rgba(239,209,195,0.15)" : "#efd1c3",
          color: isPlaying ? "#efd1c3" : "#024244",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 9999,
          transition: "background 0.3s, color 0.3s",
        }}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.span
              key="playing"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <Volume2 size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="muted"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <VolumeX size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
