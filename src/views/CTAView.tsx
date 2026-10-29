"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MessageSquare } from "lucide-react";
import { getWhatsAppUrl } from "@/helpers";
import { useLanguage } from "@/lib/language-context";

const LocationMap = dynamic(
  () => import("@/components/LocationMap").then((m) => m.LocationMap),
  { ssr: false },
);

export function CTAView() {
  const { lang } = useLanguage();

  const handleWAConnect = () => {
    const text =
      lang === "id"
        ? "Halo HT Solution, saya tertarik konsultasi kebutuhan aplikasi (web/desktop/mobile) atau otomasi sistem untuk usaha saya."
        : "Hi HT Solution, I'm interested in discussing an application (web/desktop/mobile) or automation project for my business.";
    window.open(getWhatsAppUrl(text), "_blank");
  };

  return (
    <section
      id="contact"
      className="py-12 md:py-24 scroll-mt-20 md:scroll-mt-0"
    >
      <div className="container-main">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            <div style={{ position: "relative", zIndex: 1 }} className="h-full">
              <LocationMap />
            </div>

            <div
              style={{ position: "relative", zIndex: 1 }}
              className="flex flex-col justify-center h-full"
            >
              <motion.div
                onClick={handleWAConnect}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="glass glass-interactive relative overflow-hidden rounded-2xl p-8 md:p-12 cursor-pointer flex flex-col justify-between gap-8 h-full"
              >
                <div className="flex flex-col gap-3 z-10">
                  <span
                    className="text-[11px] tracking-[0.25em] uppercase font-semibold block"
                    style={{ color: "var(--text-subtle)", fontFamily: "var(--font-body)" }}
                  >
                    {lang === "id" ? "Hubungi Langsung" : "Direct Contact"}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                      color: "var(--accent)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                    }}
                  >
                    {lang === "id"
                      ? "Punya Kebutuhan IT atau Proyek Usaha?"
                      : "Have a Project in Mind?"}
                  </h3>
                  <p
                    className="text-xs md:text-sm text-[var(--text-muted)] font-light leading-relaxed max-w-md mt-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {lang === "id"
                      ? "Konsultasikan langsung dengan tim HT Solution. Diskusi awal 100% gratis, santai, dan tanpa komitmen."
                      : "Discuss directly with HT Solution. Initial consultation is 100% free and zero obligation."}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4 border-t border-[rgba(var(--accent-rgb),0.1)] z-10">
                  <div
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--bg)",
                    }}
                  >
                    <MessageSquare size={15} />
                    <span>{lang === "id" ? "Chat via WhatsApp" : "Chat on WhatsApp"}</span>
                  </div>

                  <div className="w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/illustration/ht-illustration-telp.webp"
                      alt="WhatsApp Contact Illustration"
                      width={80}
                      height={80}
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default CTAView;
