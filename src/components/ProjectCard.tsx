"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Cpu, Gamepad2, Globe, FlaskConical, Database } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { WorkEntry } from "@/types";

const categoryLabel: Record<string, string> = {
  system: "System",
  interactive: "Interactive",
  landing: "Landing Page",
};

const getProjectIcon = (category: string) => {
  switch (category) {
    case "system":
      return <Cpu size={20} className="text-[var(--accent)]" />;
    case "interactive":
      return <Gamepad2 size={20} className="text-[var(--accent)]" />;
    case "landing":
    case "landing_pages":
      return <Globe size={20} className="text-[var(--accent)]" />;
    case "experiment":
      return <FlaskConical size={20} className="text-[var(--accent)]" />;
    default:
      return <Database size={20} className="text-[var(--accent)]" />;
  }
};

export function ProjectCard({
  project,
  className = "",
}: {
  project: WorkEntry;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleCardClick = () => {
    router.push(`/works/${project.slug}`);
  };

  const tags = project.stack
    ? project.stack.split(",").map((s) => s.trim())
    : [];
  const demoUrl = project.links.demo || project.links.repo || "#";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        perspective: "1200px",
      }}
    >
      <motion.div
        onClick={handleCardClick}
        className="group relative block h-full rounded-3xl p-8 overflow-hidden transition-all duration-500 cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: isHovered
            ? "rgba(var(--accent-rgb),0.07)"
            : "rgba(var(--accent-rgb),0.03)",
          border: "1px solid rgba(var(--accent-rgb),0.09)",
        }}
        transition={{ duration: 0.4 }}
        whileHover={{ z: 20 }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            background: isHovered
              ? `radial-gradient(circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, rgba(var(--accent-rgb),0.08) 0%, transparent 60%)`
              : "none",
          }}
        />

        {/* Top row */}
        <div className="flex items-start justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(var(--accent-rgb),0.07)" }}
            >
              {getProjectIcon(project.category)}
            </div>
            <span
              className="px-3 py-1.5 rounded-lg text-[0.7rem] uppercase tracking-wider"
              style={{
                background: "rgba(var(--accent-rgb),0.04)",
                color: "rgba(var(--accent-rgb),0.4)",
                border: "1px solid rgba(var(--accent-rgb),0.08)",
                fontFamily: "var(--font-body)",
              }}
            >
              {categoryLabel[project.category] || project.category}
            </span>
          </div>

          <motion.a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-10 h-10 rounded-xl transition-all"
            style={{
              background: "rgba(var(--accent-rgb),0.08)",
              color: "var(--accent)",
              opacity: isHovered ? 1 : 0.4,
            }}
            whileHover={{
              background: "rgba(var(--accent-rgb),0.18)",
              scale: 1.1,
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUpRight size={16} />
          </motion.a>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-baseline gap-3 mb-3">
            <h3
              className="leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                color: "var(--accent)",
                letterSpacing: "-0.02em",
              }}
            >
              <Link
                href={`/works/${project.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="hover:underline"
              >
                {project.name}
              </Link>
            </h3>
            {project.year && (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  color: "var(--tertiary)",
                  letterSpacing: "0.1em",
                }}
              >
                {project.year}
              </span>
            )}
          </div>

          <p
            className="mb-6 leading-relaxed"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "rgba(var(--accent-rgb),0.6)",
              fontWeight: 300,
            }}
          >
            {project.focus || project.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  background: "rgba(var(--tertiary-rgb),0.06)",
                  color: "var(--tertiary)",
                  border: "1px solid rgba(var(--tertiary-rgb),0.12)",
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.04em",
                  fontWeight: 400,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none rounded-b-3xl"
          style={{
            background:
              "linear-gradient(to top, rgba(2,66,68,0.4), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
