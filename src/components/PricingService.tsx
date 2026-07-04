"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/helpers/cn";
import { CONTACT_INFO } from "@/constants";
import { Check, ArrowRight } from "lucide-react";
import type { PricingPlan } from "@/types";

// Presentational Header Component
export const PricingHeader = () => (
  <div className="text-center mb-5 relative z-10 px-4">
    <h2
      className="mb-4"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "clamp(2rem, 4vw, 3rem)",
        color: "var(--accent)",
        letterSpacing: "-0.03em",
        lineHeight: 1.1,
      }}
    >
      Services Packages
    </h2>
    <p
      className="text-sm max-w-xl mx-auto mt-4"
      style={{
        fontFamily: "var(--font-body)",
        color: "rgba(var(--accent-rgb), 0.55)",
        lineHeight: 1.6,
      }}
    >
      From a fast landing page to a fully custom system or desktop app, pick the
      package that fits, or reach out to discuss what you need.
    </p>
  </div>
);

// Presentational Background Effects Component with hydration fix
export const BackgroundEffects = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239, 209, 195, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 209, 195, 0.01) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    );
  }

  return (
    <>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[var(--accent)]/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239, 209, 195, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 209, 195, 0.01) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </>
  );
};

// Presentational Pricing Card Component
export const PricingCard = ({
  plan,
  index,
}: {
  plan: PricingPlan;
  index: number;
}) => {
  const handleContact = () => {
    const waUrl = `https://api.whatsapp.com/send?phone=${CONTACT_INFO.phone}&text=${encodeURIComponent(plan.waText)}`;
    window.open(waUrl, "_blank");
  };

  const getButtonLabel = (id: string) => {
    if (id === "template") return "Order Now";
    if (id === "custom-page") return "Inquire Now";
    return "Discuss Project";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, borderColor: "rgba(var(--accent-rgb), 0.25)" }}
      className={cn(
        "relative flex flex-col justify-between h-full rounded-[2rem] p-6 lg:p-5 xl:p-8 border transition-all duration-300 overflow-hidden",
      )}
      style={{
        backdropFilter: "blur(24px)",
      }}
    >
      <div className="flex flex-1 flex-col space-y-3">
        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--accent)",
            letterSpacing: "-0.01em",
          }}
        >
          {plan.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1 select-none">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.8rem",
              color: "var(--accent)",
              letterSpacing: "-0.02em",
            }}
          >
            {plan.price}
          </span>
          {plan.priceSub && (
            <span
              className="text-xs lowercase opacity-50"
              style={{ color: "var(--accent)" }}
            >
              / {plan.priceSub}
            </span>
          )}
        </div>

        {/* Description */}
        <p
          className="text-xs"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(var(--accent-rgb), 0.5)",
            lineHeight: 1.6,
          }}
        >
          {plan.description}
        </p>

        {/* Features List */}
        <ul className="flex flex-1 flex-col gap-4 mb-3">
          {plan.features.map((feature, fIdx) => (
            <li key={fIdx} className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "rgba(var(--accent-rgb), 0.08)",
                  border: "1px solid rgba(var(--accent-rgb), 0.12)",
                }}
              >
                <Check size={11} className="text-[var(--accent)]" />
              </div>
              <span
                className="text-xs"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(var(--accent-rgb), 0.65)",
                  lineHeight: 1.4,
                }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button - always at bottom */}
      <button
        onClick={handleContact}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer"
        style={{
          backgroundColor: plan.isPopular
            ? "var(--accent)"
            : "rgba(var(--accent-rgb), 0.06)",
          color: plan.isPopular ? "#012a2c" : "var(--accent)",
          border: plan.isPopular
            ? "none"
            : "1px solid rgba(var(--accent-rgb), 0.15)",
        }}
      >
        <span>{getButtonLabel(plan.id)}</span>
        <ArrowRight size={14} />
      </button>
    </motion.div>
  );
};
