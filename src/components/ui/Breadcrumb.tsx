"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  animate?: boolean;
}

export function Breadcrumb({ items, animate = true }: BreadcrumbProps) {
  const content = (
    <div className="flex items-center gap-2">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={idx} className="flex items-center gap-2">
            {idx > 0 && (
              <span style={{ color: "rgba(var(--accent-rgb), 0.2)" }}>/</span>
            )}
            {isLast || !item.href ? (
              <span
                className="text-xs tracking-widest uppercase"
                style={{
                  color: "rgba(var(--accent-rgb), 0.6)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
                style={{
                  color: "rgba(var(--accent-rgb), 0.35)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        className="flex items-center gap-2 mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    );
  }

  return <div className="flex items-center gap-2 mb-6">{content}</div>;
}
