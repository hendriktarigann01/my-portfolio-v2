"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Carousel, {
  type CarouselImage,
  GroupedCarousel,
} from "@/components/Carousel";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { formatTitle, getCategoryLabel } from "@/helpers";
import type { ImageGroup, WorkEntry } from "@/types";

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
            color: "rgba(var(--accent-rgb), 0.65)",
            fontFamily: "var(--font-body)",
          }}
        >
          {label}
        </span>
        <span
          className="h-px flex-1"
          style={{ background: "rgba(var(--accent-rgb),0.15)" }}
        />
      </div>
      {children}
    </motion.div>
  );
}

export function WorkDetailView({ entry }: { entry: WorkEntry }) {
  const title = formatTitle(entry.name);
  const hasLinks = entry.links.demo || entry.links.repo;
  const highlights = entry.highlights;
  const features = entry.features;
  const techStack = entry.techStack;

  return (
    <main className="min-h-screen">
      <section className="py-12 md:py-24 px-6 md:px-0">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(var(--accent-rgb),0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative container-main mx-auto">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/works" },
              { label: title },
            ]}
          />

          <motion.div
            className="flex flex-wrap items-center gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge variant="subtle">
              {getCategoryLabel(entry.category)}
            </Badge>
            <Badge variant="subtle">
              {entry.stack}
            </Badge>
            {entry.isFeatured === "true" && (
              <Badge variant="active">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                Featured
              </Badge>
            )}
          </motion.div>

          <motion.h1
            className="leading-none mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              color: "var(--accent)",
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

          <motion.p
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(var(--accent-rgb),0.55)",
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

          <motion.div
            className="w-full mt-12 mb-10"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {entry.imageGroups && entry.imageGroups.length > 0 ? (
              <GroupedCarousel groups={entry.imageGroups as ImageGroup[]} />
            ) : (
              <Carousel images={(entry.images as CarouselImage[]) || []} />
            )}
          </motion.div>

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
                      background: "rgba(var(--accent-rgb),0.12)",
                      color: "var(--accent)",
                      border: "1px solid rgba(var(--accent-rgb),0.18)",
                      fontFamily: "var(--font-body)",
                    }}
                    whileHover={{
                      background: "rgba(var(--accent-rgb),0.2)",
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
                      background: "rgba(var(--accent-rgb),0.04)",
                      color: "rgba(var(--accent-rgb),0.7)",
                      border: "1px solid rgba(var(--accent-rgb),0.1)",
                      fontFamily: "var(--font-body)",
                    }}
                    whileHover={{
                      background: "rgba(var(--accent-rgb),0.09)",
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

      <div
        className="container-main mx-auto px-6"
        style={{ height: "1px", background: "rgba(var(--accent-rgb),0.07)" }}
      />

      <section className="py-24 px-6">
        <div className="container-main mx-auto space-y-20">
          {entry.description && (
            <ContentBlock label="Overview" delay={0}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(var(--accent-rgb),0.6)",
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
                      color: "rgba(var(--accent-rgb),0.55)",
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
                      color: "rgba(var(--accent-rgb),0.55)",
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

          {highlights && highlights.length > 0 && (
            <ContentBlock label="Highlights" delay={0.1}>
              <ul className="space-y-3">
                {highlights.map((h, i) => (
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
                      style={{ background: "var(--accent)" }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "rgba(var(--accent-rgb),0.6)",
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

          {features && features.length > 0 && (
            <ContentBlock label="Features" delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    className="rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(var(--accent-rgb),0.03)",
                      border: "1px solid rgba(var(--accent-rgb),0.07)",
                      fontFamily: "var(--font-body)",
                      color: "rgba(var(--accent-rgb),0.55)",
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

          {techStack && techStack.length > 0 && (
            <ContentBlock label="Tech Stack" delay={0.1}>
              <div className="flex flex-wrap gap-2">
                {techStack.map((t, i) => (
                  <motion.span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs"
                    style={{
                      background: "rgba(var(--accent-rgb),0.06)",
                      color: "rgba(var(--accent-rgb),0.65)",
                      border: "1px solid rgba(var(--accent-rgb),0.1)",
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
            (!highlights || highlights.length === 0) &&
            (!features || features.length === 0) &&
            (!techStack || techStack.length === 0) && (
              <div
                className="rounded-2xl p-12 text-center"
                style={{
                  background: "rgba(var(--accent-rgb),0.02)",
                  border: "1px solid rgba(var(--accent-rgb),0.06)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(var(--accent-rgb),0.2)",
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

      <section className="pb-24 px-6">
        <div className="container-main mx-auto">
          <Link href="/works" className="inline-block">
            <motion.div
              className="inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
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
              }}
              transition={{ duration: 0.3 }}
            >
              <span style={{ fontSize: "1rem" }}>←</span>
              <span>All projects</span>
            </motion.div>
          </Link>
        </div>
      </section>
    </main>
  );
}
