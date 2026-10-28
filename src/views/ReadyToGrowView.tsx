"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { TextRotate } from "@/components/CTAExample";
import { useLanguage } from "@/lib/language-context";

export function ReadyToGrowView() {
  const { lang } = useLanguage();

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
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container-main">
        <ScrollReveal>
          <div>
            <span
              className="text-[11px] md:text-xs tracking-[0.25em] uppercase font-bold block mb-4"
              style={{ color: "rgba(var(--accent-rgb), 0.6)", fontFamily: "var(--font-body)" }}
            >
              {lang === "id" ? "Siap Melangkah?" : "Ready to Grow?"}
            </span>
            <h2
              className="flex flex-col sm:flex-row flex-wrap items-start sm:items-baseline gap-2 sm:gap-4 min-h-[90px] md:min-h-[130px]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
                color: "var(--accent)",
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
              }}
            >
              <span>{lang === "id" ? "Waktunya bangun" : "Let's build"}</span>
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px rgba(var(--accent-rgb), 0.5)",
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
        </ScrollReveal>
      </div>
    </section>
  );
}

export default ReadyToGrowView;
