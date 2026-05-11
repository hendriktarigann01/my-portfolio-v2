"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { label: "WORK", href: "#work" },
  { label: "PROCESS", href: "#process" },
  { label: "NOW", href: "#now" },
  { label: "CONTACT", href: "#contact" },
];

export function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/backsound.mp3");
    audioRef.current.loop = true;

    // Try to autoplay
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Autoplay prevented by browser. User must interact first.");
      }
    };
    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
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
      {/* --- LEFT SIDEBAR --- */}
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

      {/* --- RIGHT SIDEBAR --- */}
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

      {/* --- MOBILE NAVBAR --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 p-6 flex items-center justify-between pointer-events-none">
        <motion.a
          href="#"
          onClick={(e) => handleClick(e, "#")}
          className="pointer-events-auto"
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

        <motion.nav
          className="pointer-events-auto flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {navLinks.slice(0, 2).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                color: "rgba(239,209,195,0.65)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {link.label}
            </a>
          ))}
        </motion.nav>
      </div>

      {/* Bottom Left Audio Control (FAB) */}
      <motion.button
        className="pointer-events-auto"
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
          display: "flex",
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
