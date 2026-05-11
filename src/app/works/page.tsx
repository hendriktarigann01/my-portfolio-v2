"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import worksData from "@/data/works.json";

// ─── types ────────────────────────────────────────────────────────────────────

type WorkEntry = {
  name: string;
  slug: string;
  stack: string;
  category: string;
  focus?: string;
  summary: string;
  isFeatured: string;
  links: { demo: string; repo: string };
};

type Group = {
  label: string;
  key: string;
  entries: WorkEntry[];
};

// ─── data ─────────────────────────────────────────────────────────────────────

const groups: Group[] = [
  {
    label: "Systems",
    key: "systems",
    entries: worksData.systems as WorkEntry[],
  },
  {
    label: "Interactive",
    key: "interactive",
    entries: worksData.interactive as WorkEntry[],
  },
  {
    label: "Landing Pages",
    key: "landing_pages",
    entries: worksData.landing_pages as WorkEntry[],
  },
];

function formatTitle(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── animations ───────────────────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── page ─────────────────────────────────────────────────────────────────────

export default function WorksPage() {
  return (
    <main className="min-h-screen  py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Link
              href="/"
              className="text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{
                color: "rgba(239,209,195,0.35)",
                fontFamily: "var(--font-body)",
              }}
            >
              Home
            </Link>
            <span style={{ color: "rgba(239,209,195,0.2)" }}>/</span>
            <span
              className="text-xs tracking-widest uppercase"
              style={{
                color: "rgba(239,209,195,0.6)",
                fontFamily: "var(--font-body)",
              }}
            >
              Work
            </span>
          </div>

          <h1
            className="leading-none mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "#efd1c3",
              letterSpacing: "-0.04em",
            }}
          >
            All Work
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(239,209,195,0.45)",
              fontSize: "1rem",
              fontWeight: 300,
              maxWidth: "480px",
            }}
          >
            A complete archive of projects — from internal systems and
            interactive experiences to public-facing landing pages.
          </p>
        </motion.div>

        {/* Groups */}
        <div className="space-y-20">
          {groups.map((group, gi) => (
            <motion.section
              key={group.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: gi * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Group label */}
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-xs font-medium tracking-[0.25em] uppercase"
                  style={{
                    color: "rgba(239,209,195,0.35)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {group.label}
                </span>
                <span
                  className="h-px flex-1"
                  style={{ background: "rgba(239,209,195,0.08)" }}
                />
                <span
                  className="text-xs"
                  style={{
                    color: "rgba(239,209,195,0.2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {group.entries.length}
                </span>
              </div>

              {/* Cards grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {group.entries.map((entry) => (
                  <WorkCard key={entry.slug} entry={entry} />
                ))}
              </motion.div>
            </motion.section>
          ))}
        </div>
      </div>
    </main>
  );
}

// ─── card ─────────────────────────────────────────────────────────────────────

function WorkCard({ entry }: { entry: WorkEntry }) {
  const isFeatured = entry.isFeatured === "true";

  return (
    <motion.div variants={item}>
      <Link href={`/works/${entry.slug}`} className="block group">
        <motion.div
          className="relative rounded-2xl p-6 h-full min-h-[160px] flex flex-col justify-between overflow-hidden"
          style={{
            background: isFeatured
              ? "rgba(239,209,195,0.05)"
              : "rgba(239,209,195,0.02)",
            border: isFeatured
              ? "1px solid rgba(239,209,195,0.12)"
              : "1px solid rgba(239,209,195,0.06)",
          }}
          whileHover={{
            background: "rgba(239,209,195,0.07)",
            borderColor: "rgba(239,209,195,0.18)",
            y: -2,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Featured dot */}
          {isFeatured && (
            <span
              className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full z-10"
              style={{ background: "#efd1c3" }}
            />
          )}

          {/* Image Slot */}
          <div 
            className="w-full h-40 md:h-48 mb-6 rounded-xl overflow-hidden shrink-0 relative"
            style={{ 
              background: "rgba(239,209,195,0.03)", 
              border: "1px solid rgba(239,209,195,0.05)" 
            }}
          >
             {/* Replace this with your actual image */}
             <div className="absolute inset-0 flex items-center justify-center">
               <span style={{ color: "rgba(239,209,195,0.2)", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>Project Image</span>
             </div>
          </div>

          {/* Top: title + focus */}
          <div>
            <h3
              className="mb-2 leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#efd1c3",
                letterSpacing: "-0.02em",
              }}
            >
              {formatTitle(entry.name)}
            </h3>
            <p
              className="line-clamp-2"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(239,209,195,0.45)",
                fontSize: "0.8rem",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              {entry.summary || entry.focus}
            </p>
          </div>

          {/* Bottom: tags + arrow */}
          <div className="flex items-center justify-between mt-6 gap-3">
            <div className="flex gap-2 flex-wrap">
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px]"
                style={{
                  background: "rgba(239,209,195,0.06)",
                  color: "rgba(239,209,195,0.55)",
                  border: "1px solid rgba(239,209,195,0.08)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {entry.stack}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px]"
                style={{
                  background: "rgba(239,209,195,0.06)",
                  color: "rgba(239,209,195,0.55)",
                  border: "1px solid rgba(239,209,195,0.08)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {entry.category}
              </span>
            </div>
            <motion.span
              className="text-xs shrink-0"
              style={{
                color: "rgba(239,209,195,0.25)",
                fontFamily: "var(--font-body)",
              }}
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
