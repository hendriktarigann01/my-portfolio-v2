// Tujuan      : Menampilkan 3 daftar karya terpilih (1 dari masing-masing kategori) dalam bentuk grid 3 kolom simetris
// Caller      : Halaman utama (src/app/page.tsx)
// Dependensi  : react, next/link, framer-motion, lucide-react, ScrollReveal, worksData
// Main Exports: WorkView
// Side Effects: -

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import worksData from "@/data/works.json";

const MotionLink = motion.create(Link);

type WorkItem = {
  name: string;
  slug: string;
  stack: string;
  category: string;
  focus?: string;
  summary: string;
  isFeatured?: string;
  links: { demo: string; repo: string };
};

const categoryLabel: Record<string, string> = {
  system: "System",
  interactive: "Interactive",
  landing: "Landing Page",
  experiment: "Experiment"
};

function getCuratedWorks() {
  return [
    worksData.systems[0],
    worksData.interactive[0],
    worksData.landing_pages[0],
  ] as WorkItem[];
}

function ProjectCard({ item, className = "" }: { item: WorkItem; className?: string }) {
  return (
    <MotionLink
      href={`/works/${item.slug}`}
      className={`group flex flex-col justify-between rounded-3xl p-6 md:p-8 h-full ${className}`}
      style={{
        background: "rgba(239,209,195,0.03)",
        border: "1px solid rgba(239,209,195,0.08)",
      }}
      whileHover={{
        background: "rgba(239,209,195,0.07)",
        borderColor: "rgba(239,209,195,0.15)",
        y: -4,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(239,209,195,0.07)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#efd1c3",
              }}
            >
              {item.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span
            className="px-3 py-1.5 rounded-lg text-[0.7rem] uppercase tracking-wider"
            style={{
              background: "rgba(239,209,195,0.04)",
              color: "rgba(239,209,195,0.4)",
              border: "1px solid rgba(239,209,195,0.08)",
              fontFamily: "var(--font-body)",
            }}
          >
            {categoryLabel[item.category] || item.category}
          </span>
        </div>

        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: "rgba(239,209,195,0.1)",
            color: "#efd1c3",
          }}
        >
          <ArrowUpRight size={18} />
        </div>
      </div>
      <div>
        <h3
          className="mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "#efd1c3",
            letterSpacing: "-0.02em",
          }}
        >
          {item.name}
        </h3>
        {item.focus && (
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "rgba(239,209,195,0.5)",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            {item.focus}
          </p>
        )}
        <span
          className="inline-block px-3 py-1.5 rounded-lg text-xs"
          style={{
            background: "rgba(239,209,195,0.06)",
            color: "rgba(239,209,195,0.5)",
            border: "1px solid rgba(239,209,195,0.08)",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.05em",
          }}
        >
          {item.stack}
        </span>
      </div>
    </MotionLink>
  );
}

export function WorkView() {
  const items = getCuratedWorks();

  return (
    <section id="work" className="py-12 md:py-24">
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
                      color: "rgba(239,209,195,0.4)",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                    }}
                  >
                    Selected Work
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(3rem, 7vw, 6rem)",
                    color: "#efd1c3",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  Work
                </h2>
              </div>

              {/* Premium Apple-style All Projects Button */}
              <MotionLink
                href="/works"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all z-10"
                style={{
                  background: "rgba(239,209,195,0.04)",
                  border: "1px solid rgba(239,209,195,0.1)",
                  color: "rgba(239,209,195,0.7)",
                  fontFamily: "var(--font-body)",
                }}
                whileHover={{
                  backgroundColor: "rgba(239,209,195,0.12)",
                  borderColor: "rgba(239,209,195,0.22)",
                  color: "#efd1c3",
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
                <ProjectCard item={item} className="w-full h-full" />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
