"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/helpers/cn";
import { getWhatsAppUrl } from "@/helpers/text";
import {
  Check,
  ArrowRight,
  SquarePlay,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
} from "lucide-react";
import { globalLenis } from "@/components/SmoothScrollProvider";
import { useLanguage } from "@/lib/language-context";
import type { PricingPlan } from "@/types";

export const PricingHeader = () => {
  const { lang } = useLanguage();

  return (
    <div className="text-center mb-8 relative z-10 px-4">
      <h2
        className="mb-4"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: "var(--accent)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}
      >
        {lang === "id" ? "Paket Layanan & Harga" : "Services & Pricing"}
      </h2>
      <p
        className="text-sm max-w-2xl mx-auto mt-4"
        style={{
          fontFamily: "var(--font-body)",
          color: "rgba(var(--accent-rgb), 0.65)",
          lineHeight: 1.6,
        }}
      >
        {lang === "id"
          ? "Biaya pasti tanpa biaya tersembunyi, pengerjaan cepat, dan garansi bug 30 hari. Konsultasi awal gratis."
          : "Fixed upfront pricing, fast turnaround, and 30-day bug warranty. Free initial consultation."}
      </p>
    </div>
  );
};

export const BackgroundEffects = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage:
        "linear-gradient(rgba(239, 209, 195, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 209, 195, 0.015) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  />
);

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title: string;
}

export const VideoModal = ({
  isOpen,
  onClose,
  videoSrc,
  title,
}: VideoModalProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      globalLenis?.stop();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      globalLenis?.start();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#011415]/90 backdrop-blur-md cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-[rgba(var(--accent-rgb),0.25)] bg-[#011d1e] cursor-default"
          >
            <div className="absolute top-0 inset-x-0 h-14 flex items-center justify-between px-6 z-20 pointer-events-none">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] font-body">
                {title} - Live Preview
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-[var(--accent)] border border-[rgba(var(--accent-rgb),0.15)] transition-all pointer-events-auto hover:scale-105"
              >
                <X size={14} />
              </button>
            </div>

            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded bg-black/40 hover:bg-black/60 text-[var(--accent)] border border-[rgba(var(--accent-rgb),0.15)] transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded bg-black/40 hover:bg-black/60 text-[var(--accent)] border border-[rgba(var(--accent-rgb),0.15)] transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
              </div>

              <button
                onClick={handleFullscreen}
                className="p-2 rounded bg-black/40 hover:bg-black/60 text-[var(--accent)] border border-[rgba(var(--accent-rgb),0.15)] transition-colors cursor-pointer"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lang } = useLanguage();

  const handleContact = () => {
    window.open(getWhatsAppUrl(plan.waText), "_blank");
  };

  const getButtonLabel = (id: string) => {
    if (lang === "id") {
      if (id === "web-kilat") return "Pesan Sekarang";
      if (id === "otomasi-data") return "Konsultasi Otomasi";
      if (id === "sistem-kasir") return "Diskusi Sistem";
      return "Tanya via WhatsApp";
    }
    if (id === "web-kilat") return "Order Now";
    if (id === "otomasi-data") return "Automate Now";
    if (id === "sistem-kasir") return "Discuss System";
    return "Inquire via WhatsApp";
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
        className={cn(
          "glass glass-interactive relative flex flex-col justify-between h-full rounded-2xl p-6 lg:p-5 xl:p-8 overflow-hidden",
          plan.isPopular && "border-[var(--accent)]"
        )}
      >
        <div className="flex flex-1 flex-col space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "1rem",
                  color: "var(--accent)",
                  letterSpacing: "-0.01em",
                }}
              >
                {plan.name}
              </h3>
              {plan.isPopular && (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] uppercase select-none">
                  {lang === "id" ? "Terpopuler" : "Popular"}
                </span>
              )}
            </div>

            {plan.videoSrc && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[rgba(var(--accent-rgb),0.06)] hover:bg-[rgba(var(--accent-rgb),0.15)] border border-[rgba(var(--accent-rgb),0.15)] hover:border-[rgba(var(--accent-rgb),0.35)] text-[9px] font-bold tracking-wider text-[var(--accent)] transition-all duration-300 cursor-pointer select-none"
              >
                <SquarePlay
                  size={10}
                  className="animate-pulse text-[var(--accent)]"
                />
                <span>DEMO</span>
              </button>
            )}
          </div>

          <div className="flex items-baseline gap-1 select-none">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "var(--accent)",
                letterSpacing: "-0.02em",
              }}
            >
              {plan.price}
            </span>
            {plan.priceSub && (
              <span
                className="text-xs lowercase opacity-50"
                style={{ color: "var(--accent)" }}
              >
                / {plan.priceSub}
              </span>
            )}
          </div>

          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(var(--accent-rgb), 0.5)",
              lineHeight: 1.6,
            }}
          >
            {plan.description}
          </p>

          <ul className="flex flex-1 flex-col gap-4 mb-3">
            {plan.features.map((feature, fIdx) => (
              <li key={fIdx} className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "rgba(var(--accent-rgb), 0.08)",
                    border: "1px solid rgba(var(--accent-rgb), 0.12)",
                  }}
                >
                  <Check size={11} className="text-[var(--accent)]" />
                </div>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(var(--accent-rgb), 0.65)",
                    lineHeight: 1.4,
                  }}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleContact}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer"
          style={{
            backgroundColor: plan.isPopular
              ? "var(--btn-primary-bg)"
              : "var(--card-bg)",
            color: plan.isPopular ? "var(--btn-primary-text)" : "var(--accent)",
            border: plan.isPopular
              ? "none"
              : "1px solid var(--card-border)",
          }}
        >
          <span>{getButtonLabel(plan.id)}</span>
          <ArrowRight size={14} />
        </button>
      </motion.div>

      {plan.videoSrc && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoSrc={plan.videoSrc}
          title={plan.name}
        />
      )}
    </>
  );
};
