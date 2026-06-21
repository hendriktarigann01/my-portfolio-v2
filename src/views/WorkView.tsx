"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import worksData from "@/data/works.json";
import { ProjectCard } from "@/components/ProjectCard";
import type { WorkEntry } from "@/types";

const MotionLink = motion.create(Link);

function getCuratedWorks(): WorkEntry[] {
  return [
    worksData.systems[0],
    worksData.interactive[0],
    worksData.landing_pages[0],
  ] as WorkEntry[];
}

export function WorkView() {
  const items = getCuratedWorks();

  return (
    <section id="projects" className="py-12 md:py-24 scroll-mt-20 md:scroll-mt-0">
      <div className="container-main">
        {/* Section Header */}
        <div style={{ marginBottom: "4rem" }}>
          <ScrollReveal>
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "var(--font-body)",
                      color: "rgba(var(--accent-rgb),0.4)",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                    }}
                  >
                    Selected Projects
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(3rem, 7vw, 6rem)",
                    color: "var(--accent)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  Projects
                </h2>
              </div>

              {/* Premium Apple-style All Projects Button */}
              <MotionLink
                href="/works"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all z-10"
                style={{
                  background: "rgba(var(--accent-rgb),0.04)",
                  border: "1px solid rgba(var(--accent-rgb),0.1)",
                  color: "rgba(var(--accent-rgb),0.7)",
                  fontFamily: "var(--font-body)",
                }}
                whileHover={{
                  backgroundColor: "rgba(var(--accent-rgb),0.12)",
                  borderColor: "rgba(var(--accent-rgb),0.22)",
                  color: "var(--accent)",
                  scale: 1.03,
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span>All projects</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ fontSize: "0.9rem" }}
                >
                  →
                </motion.span>
              </MotionLink>
            </div>
          </ScrollReveal>
        </div>

        {/* Bento Grid (3 Curated Columns) */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.slug}
                className="col-span-1 min-h-[260px] md:min-h-[320px]"
              >
                <ProjectCard project={item} className="w-full h-full" />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
