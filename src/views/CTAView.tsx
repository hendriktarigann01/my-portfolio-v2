"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TextRotate } from "@/components/CTAExample";

const LocationMap = dynamic(
  () => import("@/components/LocationMap").then((m) => m.LocationMap),
  { ssr: false }
);

export function CTAView() {
  return (
    <section style={{ padding: "6rem 0" }}>
      <div className="container-main">
        <ScrollReveal>
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center", 
              position: "relative",
              overflow: "hidden",
            }}
            whileHover={{ borderColor: "rgba(239,209,195,0.18)" }}
            transition={{ duration: 0.4 }}
          >
            {/* LEFT — Map */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <LocationMap />
            </div>

            {/* RIGHT — Text kamu */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2
                className="flex flex-col min-h-[120px] md:min-h-[160px]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  color: "#efd1c3",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  marginBottom: "1.5rem",
                }}
              >
                <span>Life is</span>
                <span
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1.5px rgba(239,209,195,0.45)",
                  }}
                >
                  <TextRotate
                    texts={[
                      "a canvas.",
                      "a journey.",
                      "what you make it.",
                      "an adventure.",
                      "beautiful."
                    ]}
                    mainClassName="justify-start"
                    staggerDuration={0.03}
                    staggerFrom="last"
                    rotationInterval={3000}
                  />
                </span>
              </h2>
            </div>

          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}