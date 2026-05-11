"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  year: string;
  url?: string;
  size?: "large" | "medium" | "small";
  accent?: string;
}

const DEFAULT_ACCENT = "rgba(239,209,195,0.06)";

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ z: 20 }}
    >
      <motion.div
        className="group relative h-full rounded-3xl p-8 overflow-hidden transition-all duration-500"
        style={{
          background: isHovered
            ? "rgba(239,209,195,0.07)"
            : "rgba(239,209,195,0.03)",
          border: "1px solid rgba(239,209,195,0.09)",
          boxShadow: isHovered
            ? "0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(239,209,195,0.1)"
            : "0 4px 30px rgba(0,0,0,0.2)",
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            background: isHovered
              ? `radial-gradient(circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, rgba(239,209,195,0.08) 0%, transparent 60%)`
              : "none",
          }}
        />

        {/* Top row */}
        <div className="flex items-start justify-between mb-8 relative z-10">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: project.accent || DEFAULT_ACCENT }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#efd1c3",
              }}
            >
              {project.title.charAt(0)}
            </span>
          </div>

          <motion.a
            href={project.url || "#"}
            target={project.url ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-xl transition-all"
            style={{
              background: "rgba(239,209,195,0.08)",
              color: "#efd1c3",
              opacity: isHovered ? 1 : 0.4,
            }}
            whileHover={{
              background: "rgba(239,209,195,0.18)",
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
                color: "#efd1c3",
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </h3>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                color: "rgba(239,209,195,0.35)",
                letterSpacing: "0.1em",
              }}
            >
              {project.year}
            </span>
          </div>

          <p
            className="mb-6 leading-relaxed"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "rgba(239,209,195,0.6)",
              fontWeight: 300,
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  background: "rgba(239,209,195,0.07)",
                  color: "rgba(239,209,195,0.7)",
                  border: "1px solid rgba(239,209,195,0.1)",
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
    </motion.div>
  );
}
