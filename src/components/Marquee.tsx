// Tujuan      : Menampilkan logo-logo klien dalam bentuk perspective marquee (Apple-style 3D)
// Caller      : Halaman utama (src/app/page.tsx)
// Dependensi  : react, next/image
// Main Exports: LogoMarquee
// Side Effects: -

"use client";

import Image from "next/image";

const logos = [
  { name: "MJS", src: "/assets/logo/mjs.webp" },
  { name: "Kemenkeu", src: "/assets/logo/kemenkeu.webp" },
  { name: "In-Lite", src: "/assets/logo/in-lite.webp" },
  { name: "ITB AD", src: "/assets/logo/itb-ad.webp" },
  { name: "KMI", src: "/assets/logo/kmi.webp" },
  { name: "Neo", src: "/assets/logo/neo.webp" },
  { name: "Arch-ID", src: "/assets/logo/arch-id.webp" },
  { name: "Envision", src: "/assets/logo/envision.webp" },
  { name: "Happify", src: "/assets/logo/happify.webp" },
  { name: "Creative Lab", src: "/assets/logo/creative-lab.png" },
  { name: "Vision Lab", src: "/assets/logo/vision-lab.webp" },
  { name: "Vision Works", src: "/assets/logo/vision-works.webp" },
];

export function LogoMarquee() {
  // Duplicate the list of logos 3 times to ensure a seamless infinite animation track
  const doubleLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Title */}
      <div className="container-main mb-12 text-center md:text-left">
        <span 
          className="text-[10px] tracking-[0.25em] uppercase font-bold block mb-2"
          style={{
            color: "rgba(239, 209, 195, 0.35)",
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
            color: "#efd1c3",
            letterSpacing: "-0.02em",
          }}
        >
          Trusted by Client Teams
        </h2>
      </div>

      {/* Marquee Container */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden py-6"
        style={{
          background: "transparent",
        }}
      >
        {/* Left & Right Gradient Shadows for smooth edge fade (matching site background color #024244) */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, #024244 0%, rgba(2, 66, 68, 0.8) 50%, transparent 100%)"
          }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(270deg, #024244 0%, rgba(2, 66, 68, 0.8) 50%, transparent 100%)"
          }}
        />

        {/* Flat Horizontal Container */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {/* Scrolling Track */}
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
      <style dangerouslySetInnerHTML={{ __html: `
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
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}
