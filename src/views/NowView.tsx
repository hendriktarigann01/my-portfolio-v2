"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

const nowItems = [
  {
    label: "Building",
    value: "This Portfolio",
    note: "Next.js 16, Framer Motion, Lenis. Focusing on micro-interactions and smooth scrolling.",
    rotation: "rotate-2",
  },
  {
    label: "Exploring",
    value: "Motion design on the web",
    note: "Framer Motion, GSAP, advanced CSS @keyframes for better UX.",
    rotation: "-rotate-2",
  },
  {
    label: "Reading",
    value: "Scalable frontend architecture",
    note: "Monorepos, design systems, and component-driven development.",
    rotation: "rotate-1",
  },
  {
    label: "Thinking about",
    value: "First public side project",
    note: "Still in ideation phase, focusing on developer tooling.",
    rotation: "-rotate-1",
  },
];

export function NowView() {
  return (
    <section id="now" className="py-12 md:py-24">
      <div className="container-main flex flex-col md:flex-row justify-between relative">
        {/* Right side Text (Sticky) */}
        <div className="w-full md:w-1/2 md:sticky top-0 h-auto md:h-screen flex flex-col justify-center mb-12 md:mb-0 z-10 pointer-events-none pt-24 md:pt-0">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span
                style={{
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-body)",
                  color: "rgba(239,209,195,0.4)",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                Right Now
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(3.5rem, 8vw, 6rem)",
                color: "#efd1c3",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: "1.5rem",
              }}
            >
              What I&apos;m <br /> up to
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "rgba(239,209,195,0.4)",
                fontWeight: 300,
                maxWidth: "300px",
                lineHeight: 1.6,
              }}
            >
              Snapshot of what I am focused on at this moment. Stacking as I go.
            </p>
          </ScrollReveal>
        </div>

        {/* Left side Cards (Scrolling/Sticky) */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 relative z-20">
          {nowItems.map((item, i) => (
            <figure
              key={i}
              className="md:sticky top-0 md:h-screen grid place-content-center py-6 md:py-0"
            >
              <motion.article
                className={`w-full max-w-md mx-auto rounded-3xl p-8 md:p-12 ${item.rotation}`}
                style={{
                  background: "rgba(2,66,68,0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(239,209,195,0.15)",
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
                    color: "rgba(239,209,195,0.4)",
                    marginBottom: "1rem",
                  }}
                >
                  {item.label}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "2rem",
                    color: "#efd1c3",
                    letterSpacing: "-0.02em",
                    marginBottom: "1rem",
                    lineHeight: 1.1,
                  }}
                >
                  {item.value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    color: "rgba(239,209,195,0.5)",
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
