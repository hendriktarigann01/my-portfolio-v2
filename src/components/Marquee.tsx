"use client";

import Image from "next/image";
import { LOGOS } from "@/constants";
import { useLanguage } from "@/lib/language-context";

const MARQUEE_LOGOS = [...LOGOS, ...LOGOS, ...LOGOS];

export function LogoMarquee() {
  const { lang } = useLanguage();

  return (
    <div className="w-full py-16 md:py-24 relative overflow-hidden">
      <div className="container-main mb-12 text-center md:text-left">
        <span
          className="text-[10px] tracking-[0.25em] uppercase font-bold block mb-2"
          style={{
            color: "rgba(var(--accent-rgb), 0.5)",
            fontFamily: "var(--font-body)",
          }}
        >
          {lang === "id" ? "Klien & Kolaborasi" : "Selected Collaborations"}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.75rem",
            color: "var(--accent)",
            letterSpacing: "-0.02em",
          }}
        >
          {lang === "id" ? "Telah Dipercaya Berbagai Tim & Brand" : "Trusted by Client Teams"}
        </h2>
      </div>

      <div className="container-main relative w-full overflow-hidden py-6">
        <div className="w-full overflow-hidden flex items-center justify-start">
          <div className="marquee-track flex gap-16 md:gap-24 items-center">
            {MARQUEE_LOGOS.map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="flex-shrink-0 flex items-center justify-center w-28 md:w-36 h-12 relative"
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  fill
                  sizes="(max-width: 768px) 110px, 140px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoMarquee;
