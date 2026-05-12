"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { DirectAction } from "@/components/DirectAction";

interface WordsPullUpProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
};

// CTA button content — shared antara mobile dan desktop
function ExploreButton({ onClick }: { onClick: () => void }) {
  return (
    <DirectAction
      onClick={onClick}
      containerClassName="flex items-center justify-center overflow-hidden"
      buttonWrapperClassName="pointer-events-auto"
      className="group relative flex items-center justify-center px-6 py-4 md:px-14 md:py-8 overflow-hidden border border-[rgba(239,209,195,0.25)] bg-transparent transition-all duration-700 hover:border-[#efd1c3] cursor-pointer"
      color={{ r: 239, g: 209, b: 195 }}
    >
      <div className="absolute inset-0 w-full h-full bg-[#efd1c3] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)" />
      <div className="relative flex items-center gap-4 md:gap-6">
        <span className="uppercase tracking-[0.3em] text-[10px] md:text-sm font-bold transition-colors duration-500 text-[#efd1c3] group-hover:text-[#024244]" style={{ fontFamily: "var(--font-display)" }}>
          Explore
        </span>
        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-all duration-500 text-[#efd1c3] group-hover:text-[#024244] -rotate-45 group-hover:rotate-0" />
      </div>
    </DirectAction>
  );
}

export function HeroView() {
  const handleExplore = () =>
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="h-screen w-full p-4 sm:p-6 md:p-8 pt-20 sm:pt-6 md:pt-8">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        {/* Backdrop blur */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            background: "rgba(2, 66, 68, 0.3)",
          }}
        />

        {/* Noise overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* ─── MOBILE LAYOUT ─── (hidden on md+) ─────────────────────────────
            Order: Hendrik → Description → CTA button, all centered
        ──────────────────────────────────────────────────────────────────── */}
        <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 z-10">
          {/* 1. Title */}
          <h1
            className="font-medium leading-[0.85] tracking-[-0.08em] text-[14vw] md:text-[22vw] text-center pointer-events-auto"
            style={{ color: "#efd1c3", fontFamily: "var(--font-display)" }}
          >
            <WordsPullUp text="Hendrik" />
          </h1>

          {/* 2. Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-light text-center max-w-[280px] pointer-events-auto"
            style={{ color: "rgba(239,209,195,0.7)", lineHeight: 1.5, fontFamily: "var(--font-body)" }}
          >
            From whiteboard to working product. End to end, solo.
          </motion.p>

          {/* 3. CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto"
          >
            <ExploreButton onClick={handleExplore} />
          </motion.div>
        </div>

        {/* ─── DESKTOP LAYOUT ─── (hidden on mobile) ──────────────────────── */}
        {/* Bottom text block */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 px-10 pb-4">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-8 z-10 pointer-events-auto">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.1em] text-[13vw] lg:text-[11vw] xl:text-[9vw]"
                style={{ color: "#efd1c3", fontFamily: "var(--font-display)" }}
              >
                <WordsPullUp text="Hendrik" />
              </h1>
            </div>
            <div className="col-span-4 flex flex-col gap-5 pb-10 z-10 pointer-events-auto">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-base font-light"
                style={{ color: "rgba(239,209,195,0.7)", lineHeight: 1.4, fontFamily: "var(--font-body)" }}
              >
                From whiteboard to working product. End to end, solo. I build digital systems, interactive experiences, and robust web applications.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Centered CTA — desktop only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block absolute inset-0 z-20 pointer-events-none"
        >
          <div className="w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="pointer-events-auto">
              <ExploreButton onClick={handleExplore} />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
