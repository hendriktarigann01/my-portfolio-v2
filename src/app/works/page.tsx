"use client";

import { motion } from "framer-motion";
import {
  WORK_GROUPS,
  WORK_GRID_CONTAINER_VARIANTS,
} from "@/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { WorkCard } from "@/components/ui/WorkCard";

export default function WorksPage() {
  return (
    <section className="py-12 md:py-24 px-6 md:px-0">
      <div className="container-main mx-auto">
        {/* Header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Projects" },
            ]}
          />

          <h1
            className="leading-none mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "var(--accent)",
              letterSpacing: "-0.04em",
            }}
          >
            All Projects
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(var(--accent-rgb), 0.45)",
              fontSize: "1rem",
              fontWeight: 300,
              maxWidth: "480px",
            }}
          >
            A complete archive of projects, ranging from internal systems and
            interactive experiences to public-facing landing pages.
          </p>
        </motion.div>

        {/* Groups */}
        <div className="space-y-20">
          {WORK_GROUPS.map((group, gi) => (
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
                    color: "var(--tertiary)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {group.label}
                </span>

                <span
                  className="text-xs"
                  style={{
                    color: "rgba(var(--tertiary-rgb), 0.7)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {group.entries.length}
                </span>
              </div>

              {/* Cards grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={WORK_GRID_CONTAINER_VARIANTS}
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
    </section>
  );
}
