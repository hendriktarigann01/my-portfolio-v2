"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PROCESS_STEPS_BY_LANG, OPERATIONAL_HOURS } from "@/constants/process";
import { useLanguage } from "@/lib/language-context";
import type { ProcessStep } from "@/types";

function StepItem({ step, index }: { step: ProcessStep; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        position: "relative",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 30px rgba(var(--accent-rgb),0.2)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "1.5px solid rgba(var(--accent-rgb),0.3)",
          background: "#024244",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
          marginBottom: "1rem",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "0.85rem",
            color: "var(--accent)",
            letterSpacing: "0.05em",
          }}
        >
          {step.index}
        </span>

        <div
          style={{
            position: "absolute",
            bottom: -12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "10px solid rgba(var(--accent-rgb),0.15)",
          }}
        />
      </motion.div>

      <motion.div
        whileHover={{
          y: -4,
          borderColor: "rgba(var(--accent-rgb),0.2)",
          background: "rgba(var(--accent-rgb),0.07)",
        }}
        transition={{ duration: 0.25 }}
        style={{
          borderRadius: "1rem",
          padding: "1.5rem",
          background: "rgba(var(--accent-rgb),0.03)",
          border: "1px solid rgba(var(--accent-rgb),0.09)",
          width: "100%",
          minHeight: "220px",
          textAlign: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "var(--accent)",
            letterSpacing: "-0.01em",
            marginBottom: "0.625rem",
            lineHeight: 1.3,
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "rgba(var(--accent-rgb),0.6)",
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          {step.body}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function ProcessView() {
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-80px" });
  const { lang } = useLanguage();

  const steps = PROCESS_STEPS_BY_LANG[lang] || PROCESS_STEPS_BY_LANG.id;
  const hours = OPERATIONAL_HOURS[lang] || OPERATIONAL_HOURS.id;

  return (
    <section
      id="process"
      className="py-12 md:py-24 scroll-mt-20 md:scroll-mt-0"
    >
      <div className="container-main">
        <div style={{ marginBottom: "5rem" }}>
          <ScrollReveal>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-body)",
                  color: "rgba(var(--accent-rgb),0.5)",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                {lang === "id" ? "Alur Transparan" : "How I Work"}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "var(--accent)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {lang === "id" ? "Cara Kerja" : "Process"}
            </h2>
          </ScrollReveal>
        </div>

        <div style={{ position: "relative" }}>
          <div
            ref={lineRef}
            className="hidden md:block"
            style={{
              position: "absolute",
              top: 28,
              left: "calc(12.5%)",
              right: "calc(12.5%)",
              height: "1px",
              background: "rgba(var(--accent-rgb),0.08)",
              zIndex: 0,
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "rgba(var(--accent-rgb),0.2)",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0 }}
              animate={lineInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            style={{ position: "relative", zIndex: 1 }}
          >
            {steps.map((step, i) => (
              <StepItem key={step.index} step={step} index={i} />
            ))}
          </div>

          {/* Operational hours callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center max-w-xl mx-auto p-5 rounded-2xl border border-[rgba(var(--accent-rgb),0.18)] bg-[rgba(var(--accent-rgb),0.03)] backdrop-blur-sm"
          >
            <p className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-1.5">
              {hours.title}
            </p>
            <p className="text-xs text-[rgba(var(--accent-rgb),0.8)] font-medium">
              {hours.weekdays} • {hours.weekends}
            </p>
            <p className="text-[11px] text-[rgba(var(--accent-rgb),0.5)] mt-1.5 leading-relaxed">
              {hours.note}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
