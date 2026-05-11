"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import worksData from "@/data/works.json";

// ─── types ────────────────────────────────────────────────────────────────────

type WorkEntry = {
  name: string;
  slug: string;
  stack: string;
  category: string;
  focus: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  highlights: string[];
  features: string[];
  techStack: string[];
  isFeatured: string;
  links: { demo: string; repo: string };
  status?: string;
};

// ─── helpers ──────────────────────────────────────────────────────────────────

const allEntries: WorkEntry[] = [
  ...(worksData.systems as WorkEntry[]),
  ...(worksData.interactive as WorkEntry[]),
  ...(worksData.landing_pages as WorkEntry[]),
];

function formatTitle(name: string) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function getCategoryLabel(cat: string) {
  const map: Record<string, string> = {
    system: "System",
    interactive: "Interactive",
    landing: "Landing Page",
    experiment: "Experiment",
  };
  return map[cat] || cat;
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Next.js 15: params is a Promise, must use React.use() to unwrap
  const { slug } = use(params);
  const entry = allEntries.find((e) => e.slug === slug);

  if (!entry) {
    return (
      <main className="min-h-screen ">
        <div className="text-center">
          <p
            style={{
              fontFamily: "var(--font-display)",
              color: "rgba(239,209,195,0.3)",
              fontSize: "1rem",
            }}
          >
            Project not found.
          </p>
          <Link
            href="/works"
            className="mt-4 inline-block text-sm"
            style={{
              color: "rgba(239,209,195,0.4)",
              fontFamily: "var(--font-body)",
            }}
          >
            ← Back to all work
          </Link>
        </div>
      </main>
    );
  }

  const title = formatTitle(entry.name);
  const hasLinks = entry.links.demo || entry.links.repo;
  const hasHighlights = entry.highlights && entry.highlights.length > 0;
  const hasFeatures = entry.features && entry.features.length > 0;
  const hasTechStack = entry.techStack && entry.techStack.length > 0;

  return (
    <main className="min-h-screen ">
      {/* ── Hero ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(239,209,195,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* breadcrumb */}
          <motion.div
            className="flex items-center gap-2 mb-12"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
            <Link
              href="/works"
              className="text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{
                color: "rgba(239,209,195,0.35)",
                fontFamily: "var(--font-body)",
              }}
            >
              Work
            </Link>
            <span style={{ color: "rgba(239,209,195,0.2)" }}>/</span>
            <span
              className="text-xs tracking-widest uppercase"
              style={{
                color: "rgba(239,209,195,0.6)",
                fontFamily: "var(--font-body)",
              }}
            >
              {title}
            </span>
          </motion.div>

          {/* badges */}
          <motion.div
            className="flex flex-wrap items-center gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="px-3 py-1 rounded-full text-[11px] tracking-widest uppercase"
              style={{
                background: "rgba(239,209,195,0.06)",
                color: "rgba(239,209,195,0.5)",
                border: "1px solid rgba(239,209,195,0.1)",
                fontFamily: "var(--font-body)",
              }}
            >
              {getCategoryLabel(entry.category)}
            </span>
            <span
              className="px-3 py-1 rounded-full text-[11px] tracking-widest uppercase"
              style={{
                background: "rgba(239,209,195,0.06)",
                color: "rgba(239,209,195,0.5)",
                border: "1px solid rgba(239,209,195,0.1)",
                fontFamily: "var(--font-body)",
              }}
            >
              {entry.stack}
            </span>
            {entry.isFeatured === "true" && (
              <span
                className="px-3 py-1 rounded-full text-[11px] tracking-widest uppercase flex items-center gap-1.5"
                style={{
                  background: "rgba(239,209,195,0.08)",
                  color: "#efd1c3",
                  border: "1px solid rgba(239,209,195,0.15)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                Featured
              </span>
            )}
          </motion.div>

          {/* title */}
          <motion.h1
            className="leading-none mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              color: "#efd1c3",
              letterSpacing: "-0.04em",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
          >
            {title}
          </motion.h1>

          {/* focus / summary */}
          <motion.p
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(239,209,195,0.55)",
              fontSize: "1.05rem",
              fontWeight: 300,
              lineHeight: 1.7,
              maxWidth: "560px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {entry.summary || entry.focus}
          </motion.p>

          {/* Image Slot */}
          <motion.div
            className="w-full aspect-[16/9] mt-12 mb-10 rounded-2xl overflow-hidden relative"
            style={{
              background: "rgba(239,209,195,0.02)",
              border: "1px solid rgba(239,209,195,0.08)"
            }}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Replace this with your actual image */}
            <div className="absolute inset-0 flex items-center justify-center">
               <span style={{ color: "rgba(239,209,195,0.2)", fontSize: "1rem", fontFamily: "var(--font-body)" }}>Project Cover Image</span>
            </div>
          </motion.div>

          {/* CTA links */}
          {hasLinks && (
            <motion.div
              className="flex flex-wrap gap-3 mt-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {entry.links.demo && (
                <a
                  href={entry.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.span
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium cursor-pointer"
                    style={{
                      background: "rgba(239,209,195,0.12)",
                      color: "#efd1c3",
                      border: "1px solid rgba(239,209,195,0.18)",
                      fontFamily: "var(--font-body)",
                    }}
                    whileHover={{
                      background: "rgba(239,209,195,0.2)",
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Live Demo ↗
                  </motion.span>
                </a>
              )}
              {entry.links.repo && (
                <a
                  href={entry.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.span
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium cursor-pointer"
                    style={{
                      background: "rgba(239,209,195,0.04)",
                      color: "rgba(239,209,195,0.7)",
                      border: "1px solid rgba(239,209,195,0.1)",
                      fontFamily: "var(--font-body)",
                    }}
                    whileHover={{
                      background: "rgba(239,209,195,0.09)",
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Source Code →
                  </motion.span>
                </a>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Divider ── */}
      <div
        className="max-w-4xl mx-auto px-6"
        style={{ height: "1px", background: "rgba(239,209,195,0.07)" }}
      />

      {/* ── Body ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-20">
          {entry.description && (
            <ContentBlock label="Overview" delay={0}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(239,209,195,0.6)",
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                {entry.description}
              </p>
            </ContentBlock>
          )}

          {(entry.problem || entry.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {entry.problem && (
                <ContentBlock label="Problem" delay={0.05}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "rgba(239,209,195,0.55)",
                      fontSize: "0.9rem",
                      fontWeight: 300,
                      lineHeight: 1.8,
                    }}
                  >
                    {entry.problem}
                  </p>
                </ContentBlock>
              )}
              {entry.solution && (
                <ContentBlock label="Solution" delay={0.1}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "rgba(239,209,195,0.55)",
                      fontSize: "0.9rem",
                      fontWeight: 300,
                      lineHeight: 1.8,
                    }}
                  >
                    {entry.solution}
                  </p>
                </ContentBlock>
              )}
            </div>
          )}

          {hasHighlights && (
            <ContentBlock label="Highlights" delay={0.1}>
              <ul className="space-y-3">
                {entry.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <span
                      className="mt-2 w-1 h-1 rounded-full shrink-0"
                      style={{ background: "#efd1c3" }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "rgba(239,209,195,0.6)",
                        fontSize: "0.9rem",
                        fontWeight: 300,
                        lineHeight: 1.7,
                      }}
                    >
                      {h}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </ContentBlock>
          )}

          {hasFeatures && (
            <ContentBlock label="Features" delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {entry.features.map((f, i) => (
                  <motion.div
                    key={i}
                    className="rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(239,209,195,0.03)",
                      border: "1px solid rgba(239,209,195,0.07)",
                      fontFamily: "var(--font-body)",
                      color: "rgba(239,209,195,0.55)",
                      fontSize: "0.85rem",
                      fontWeight: 300,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    {f}
                  </motion.div>
                ))}
              </div>
            </ContentBlock>
          )}

          {hasTechStack && (
            <ContentBlock label="Tech Stack" delay={0.1}>
              <div className="flex flex-wrap gap-2">
                {entry.techStack.map((t, i) => (
                  <motion.span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs"
                    style={{
                      background: "rgba(239,209,195,0.06)",
                      color: "rgba(239,209,195,0.65)",
                      border: "1px solid rgba(239,209,195,0.1)",
                      fontFamily: "var(--font-body)",
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </ContentBlock>
          )}

          {!entry.description &&
            !entry.problem &&
            !entry.solution &&
            !hasHighlights &&
            !hasFeatures &&
            !hasTechStack && (
              <div
                className="rounded-2xl p-12 text-center"
                style={{
                  background: "rgba(239,209,195,0.02)",
                  border: "1px solid rgba(239,209,195,0.06)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(239,209,195,0.2)",
                    fontSize: "0.9rem",
                    fontWeight: 300,
                  }}
                >
                  Case study coming soon.
                </p>
              </div>
            )}
        </div>
      </section>

      {/* ── Back nav ── */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/works">
            <motion.div
              className="inline-flex items-center gap-3"
              whileHover={{ x: -4 }}
              transition={{ duration: 0.25 }}
            >
              <span
                style={{
                  color: "rgba(239,209,195,0.35)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                }}
              >
                ←
              </span>
              <span
                style={{
                  color: "rgba(239,209,195,0.35)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 300,
                }}
              >
                All projects
              </span>
            </motion.div>
          </Link>
        </div>
      </section>
    </main>
  );
}

// ─── block wrapper ────────────────────────────────────────────────────────────

function ContentBlock({
  label,
  delay,
  children,
}: {
  label: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-4 mb-6">
        <span
          className="text-xs font-medium tracking-[0.2em] uppercase"
          style={{
            color: "rgba(239,209,195,0.3)",
            fontFamily: "var(--font-body)",
          }}
        >
          {label}
        </span>
        <span
          className="h-px flex-1"
          style={{ background: "rgba(239,209,195,0.07)" }}
        />
      </div>
      {children}
    </motion.div>
  );
}
