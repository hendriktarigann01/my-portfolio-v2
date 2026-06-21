"use client";

import Image from "next/image";
import { LOGOS } from "@/constants";

export function LogoMarquee() {
  const doubleLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Title */}
      <div className="container-main mb-12 text-center md:text-left">
        <span
          className="text-[10px] tracking-[0.25em] uppercase font-bold block mb-2"
          style={{
            color: "rgba(var(--accent-rgb), 0.35)",
            fontFamily: "var(--font-body)",
          }}
        >
          Selected Collaborations
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
          Trusted by Client Teams
        </h2>
      </div>

      {/* Marquee Wrapper - Terkunci di dalam container-main agar lebarnya sama dengan judul */}
      <div className="container-main relative w-full overflow-hidden py-6">
        <div className="w-full overflow-hidden flex items-center justify-start">
         
          <div className="marquee-track flex gap-16 md:gap-24 items-center">
            {doubleLogos.map((logo, idx) => (
              <div
                key={idx}
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

      {/* Native keyframe styles for infinite marquee scroll */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `,
        }}
      />
    </div>
  );
}
