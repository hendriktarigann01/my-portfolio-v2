"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import worksData from "@/data/works.json";

type WorkItem = {
  name: string;
  slug: string;
  stack: string;
  category: string;
  focus: string;
  summary: string;
  isFeatured: string;
  links: { demo: string; repo: string };
};

const categoryLabel: Record<string, string> = {
  system: "System",
  interactive: "Interactive",
  landing: "Landing Page",
  experiment: "Experiment"
};

function getFeatured() {
  const all = [
    ...worksData.systems,
    ...worksData.interactive,
    ...worksData.landing_pages,
  ] as WorkItem[];

  return all.filter((p) => p.isFeatured === "true");
}

function ProjectCard({ item, className = "" }: { item: WorkItem; className?: string }) {
  return (
    <motion.a
      href={`/work/${item.slug}`}
      className={`group flex flex-col justify-between rounded-3xl p-8 h-full ${className}`}
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
    </motion.a>
  );
}

function getBentoClass(index: number) {
  const remainder = index % 5;
  switch (remainder) {
    case 0:
      return "col-span-1 md:col-span-2 min-h-[300px]";
    case 1:
      return "col-span-1 md:col-span-1 min-h-[300px]";
    case 2:
      return "col-span-1 md:col-span-1 min-h-[300px]";
    case 3:
      return "col-span-1 md:col-span-2 min-h-[300px]";
    case 4:
      return "col-span-1 md:col-span-3 min-h-[350px]";
    default:
      return "col-span-1 md:col-span-1 min-h-[300px]";
  }
}

export function WorkView() {
  const items = getFeatured();
  return (
    <section id="work" className="py-32">
      <div className="container-main">
        <div style={{ marginBottom: "5rem" }}>
          <ScrollReveal>
            <div className="flex items-end justify-between flex-wrap gap-6">
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
            <motion.a
              href="/works"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "rgba(239,209,195,0.45)",
                letterSpacing: "0.05em",
              }}
              whileHover={{ color: "#efd1c3", x: 4 }}
              className="hover-underline pb-0.5"
            >
              All projects →
            </motion.a>
          </div>
        </ScrollReveal>
        </div>

        <ScrollReveal>
          <StaggerContainer
            staggerDelay={0.07}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {items.map((item, i) => (
              <StaggerItem key={item.slug} className={getBentoClass(i)}>
                <ProjectCard item={item} className="w-full" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </section>
  );
}
