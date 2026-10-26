"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { WORK_GRID_ITEM_VARIANTS } from "@/constants";
import type { WorkEntry } from "@/types";
import { formatTitle } from "@/helpers";
import { Badge } from "./Badge";

interface WorkCardProps {
  entry: WorkEntry;
}

function getThumbnailUrl(entry: WorkEntry): string {
  if (entry.images && entry.images.length > 0) {
    return entry.images[0].url;
  }
  return entry.imageGroups?.[0]?.images?.[0]?.url || "";
}

export function WorkCard({ entry }: WorkCardProps) {
  const thumbnailUrl = getThumbnailUrl(entry);

  return (
    <motion.div variants={WORK_GRID_ITEM_VARIANTS}>
      <Link href={`/works/${entry.slug}`} className="block group">
        <motion.div
          className="relative rounded-2xl p-6 h-full min-h-[160px] flex flex-col justify-between overflow-hidden"
          style={{
            background: "rgba(var(--accent-rgb), 0.02)",
            border: "1px solid rgba(var(--accent-rgb), 0.06)",
          }}
          whileHover={{
            background: "rgba(var(--accent-rgb), 0.07)",
            borderColor: "rgba(var(--accent-rgb), 0.18)",
            y: -2,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div
            className="w-full h-40 md:h-48 mb-6 rounded-xl overflow-hidden shrink-0 relative"
            style={{
              background: "rgba(var(--accent-rgb), 0.03)",
              border: "1px solid rgba(var(--accent-rgb), 0.05)",
            }}
          >
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={entry.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
                draggable={false}
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  style={{
                    color: "var(--accent)",
                    fontSize: "0.8rem",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Project Image
                </span>
              </div>
            )}
          </div>

          <div>
            <h3
              className="mb-2 leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "var(--accent)",
                letterSpacing: "-0.02em",
              }}
            >
              {formatTitle(entry.name)}
            </h3>
            <p
              className="line-clamp-2"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(var(--accent-rgb), 0.45)",
                fontSize: "0.8rem",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              {entry.summary || entry.focus}
            </p>
          </div>

          <div className="flex items-center justify-between mt-6 gap-3">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="solid-accent" className="px-2.5 py-0.5 text-[10px]">
                {entry.stack}
              </Badge>
              <Badge variant="filled" className="px-2.5 py-0.5 text-[10px]">
                {entry.category}
              </Badge>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
