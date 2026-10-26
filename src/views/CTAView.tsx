"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TextRotate } from "@/components/CTAExample";
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
        ? "Halo Mas Hendrik, saya tertarik konsultasi kebutuhan website / sistem digital untuk usaha saya."
        : "Hi Hendrik, I'm interested in discussing a project and learning how you can help achieve our business goals.";
    window.open(getWhatsAppUrl(text), "_blank");
  };

  const rotatingTexts =
    lang === "id"
      ? [
          "website usaha.",
          "sistem kasir.",
          "otomasi data.",
          "solusi digital.",
        ]
      : [
          "web systems.",
          "business tools.",
          "data workflows.",
          "digital solutions.",
        ];

  return (
    <section
      id="contact"
      className="py-12 md:py-24 scroll-mt-20 md:scroll-mt-0"
    >
      <div className="container-main">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div style={{ position: "relative", zIndex: 1 }}>
              <LocationMap />
            </div>

            <div
              style={{ position: "relative", zIndex: 1 }}
              className="flex flex-col gap-6"
            >
              <div>
                <span
                  className="text-[11px] tracking-[0.25em] uppercase font-semibold block mb-3"
                  style={{ color: "rgba(var(--accent-rgb), 0.6)" }}
                >
                  {lang === "id" ? "Siap Melangkah?" : "Ready to Grow?"}
                </span>
                <h2
                  className="flex flex-col min-h-[100px] md:min-h-[140px]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                    color: "var(--accent)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                  }}
                >
                  <span>{lang === "id" ? "Waktunya bangun" : "Let's build"}</span>
                  <span
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(var(--accent-rgb), 0.45)",
                    }}
                  >
                    <TextRotate
                      texts={rotatingTexts}
                      mainClassName="justify-start"
                      staggerDuration={0.03}
                      staggerFrom="last"
                      rotationInterval={3000}
                    />
                  </span>
                </h2>
              </div>

              <motion.div
                onClick={handleWAConnect}
                className="glass relative overflow-hidden rounded-[2rem] p-8 md:p-10 cursor-pointer flex flex-row items-center justify-between gap-6 hover:border-[rgba(var(--accent-rgb),0.35)] transition-all"
              >
                <div className="flex flex-col items-start z-10 flex-1 gap-10">
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.8rem",
                      color: "var(--accent)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                    className="mb-2"
                  >
                    {lang === "id" ? "Punya Kebutuhan IT?" : "Have a Project?"}
                  </h3>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium tracking-wide uppercase transition-all hover:opacity-85"
                    style={{
                      backgroundColor: "rgba(var(--accent-rgb), 0.08)",
                      color: "var(--accent)",
                      border: "1px solid rgba(var(--accent-rgb), 0.15)",
                    }}
                  >
                    <MessageSquare size={13} />
                    <span>{lang === "id" ? "Konsultasi via WhatsApp" : "Talk To Me"}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center relative w-32 h-32 md:w-36 md:h-36 flex-shrink-0 z-10">
                  <motion.div className="w-24 h-24 md:w-28 md:h-28 relative flex items-center justify-center">
                    <Image
                      src="/illustration/ht-illustration-telp.webp"
                      alt="WhatsApp Contact Illustration"
                      width={120}
                      height={120}
                      className="object-contain"
                      loading="lazy"
                    />
                  </motion.div>
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
