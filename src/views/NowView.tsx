"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { NOW_ITEMS_BY_LANG } from "@/constants/now";
import { useLanguage } from "@/lib/language-context";

export function NowView() {
  const { lang } = useLanguage();
  const items = NOW_ITEMS_BY_LANG[lang] || NOW_ITEMS_BY_LANG.id;

  return (
    <section id="now" className="py-12 md:pt-0 md:pb-24 scroll-mt-20 md:scroll-mt-0">
      <div className="container-main flex flex-col md:flex-row justify-between relative">
        <div className="w-full md:w-1/2 md:sticky top-0 h-auto md:h-screen flex flex-col justify-center mb-12 md:mb-0 z-10 pointer-events-none pt-24 md:pt-0">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span
                style={{
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-body)",
                  color: "rgba(var(--accent-rgb),0.5)",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                {lang === "id" ? "Status & Kapasitas" : "Current Status"}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                color: "var(--accent)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: "1.5rem",
              }}
            >
              {lang === "id" ? (
                <>
                  Fokus &amp; <br /> Kesiapan
                </>
              ) : (
                <>
                  What I&apos;m <br /> up to
                </>
              )}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                color: "rgba(var(--accent-rgb),0.6)",
                fontWeight: 300,
                maxWidth: "320px",
                lineHeight: 1.6,
              }}
            >
              {lang === "id"
                ? "Gambaran ketersediaan jadwal, fokus layanan, dan komitmen waktu pengerjaan saya saat ini."
                : "Snapshot of current project capacity, core focus, and active work availability."}
            </p>
          </ScrollReveal>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4 relative z-20">
          {items.map((item, i) => (
            <figure
              key={i}
              className="md:sticky top-0 md:h-screen grid place-content-center py-6 md:py-0"
            >
              <motion.article
                className={`w-full max-w-md mx-auto rounded-3xl p-8 md:p-12 ${item.rotation}`}
                style={{
                  background: "rgba(2,66,68,0.95)",
                  border: "1px solid rgba(var(--accent-rgb),0.18)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(var(--accent-rgb),0.55)",
                    marginBottom: "1rem",
                  }}
                >
                  {item.label}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.85rem",
                    color: "var(--accent)",
                    letterSpacing: "-0.02em",
                    marginBottom: "1rem",
                    lineHeight: 1.15,
                  }}
                >
                  {item.value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    color: "rgba(var(--accent-rgb),0.7)",
                    fontWeight: 300,
                    lineHeight: 1.6,
                  }}
                >
                  {item.note}
                </p>
              </motion.article>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NowView;
