"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { globalLenis } from "@/components/SmoothScrollProvider";
import { openAiChat } from "@/helpers/chat";
import { useLanguage } from "@/lib/language-context";

export function HeroView() {
  const { lang } = useLanguage();

  const handleExplore = () => {
    const target = lang === "id" ? "#services" : "#projects";
    if (globalLenis) {
      globalLenis.scrollTo(target);
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const bio =
    lang === "id"
      ? "Partner rekayasa aplikasi (web, desktop & mobile), otomasi spreadsheet, dan sistem bisnis di Cikarang. Cepat, transparan, bergaransi 30 hari."
      : "Digital engineering partner for high-performance applications (web, desktop & mobile), spreadsheet automations, and business systems.";

  const btnLabel = lang === "id" ? "Lihat Layanan" : "Explore Services";

  return (
    <section
      id="home"
      className="min-h-screen w-full flex items-center pt-20 md:pt-0"
    >
      <div className="container-main w-full py-4 md:py-8">
        <div className="relative h-[calc(100vh-6rem)] md:h-[calc(100vh-4rem)] min-h-[560px] md:min-h-[620px] w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-[var(--card-border)] bg-[rgba(var(--bg-rgb),0.3)]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              background: "rgba(var(--bg-rgb), 0.3)",
            }}
          />

          {/* Mobile Presentation */}
          <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 z-10 overflow-y-auto py-10">
            <div className="text-center pointer-events-auto">
              <h1
                className="font-medium leading-[0.9] tracking-[-0.06em] text-[12vw]"
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-display)",
                }}
              >
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  HT Solution
                </motion.span>
              </h1>
            </div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-light text-center max-w-[320px] pointer-events-auto text-[var(--text-muted)] leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs pointer-events-auto"
            >
              <Button label={btnLabel} onClick={handleExplore} className="w-full" />
              <button
                type="button"
                onClick={() => openAiChat()}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-primary)] text-xs font-semibold uppercase tracking-wider hover:bg-[var(--card-bg-hover)] transition-colors cursor-pointer"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Sparkles size={14} />
                <span>{lang === "id" ? "Konsultasi AI" : "AI Consultation"}</span>
              </button>
            </motion.div>
          </div>

          {/* Desktop Presentation */}
          <div className="hidden md:block absolute bottom-0 left-0 right-0 p-8 lg:p-10 z-10">
            <div className="grid grid-cols-12 items-end gap-6">
              <div className="col-span-8 pointer-events-auto">
                <h1
                  className="font-medium leading-[0.85] tracking-[-0.08em] text-[8vw] lg:text-[7vw]"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    HT Solution
                  </motion.span>
                </h1>
              </div>

              <div className="col-span-4 flex flex-col gap-5 pointer-events-auto">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-sm font-light leading-relaxed text-[var(--text-muted)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {bio}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-3"
                >
                  <button
                    type="button"
                    onClick={handleExplore}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <span>{btnLabel}</span>
                    <span>↓</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openAiChat()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-[var(--card-bg-hover)] text-[var(--text-primary)] text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <Sparkles size={13} />
                    <span>{lang === "id" ? "Konsultasi AI" : "AI Consult"}</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
