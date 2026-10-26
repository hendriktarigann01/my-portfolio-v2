import { type ReactNode, type CSSProperties } from "react";

export type BadgeVariant =
  | "subtle"
  | "active"
  | "filled"
  | "solid-accent";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const BADGE_STYLES: Record<BadgeVariant, CSSProperties> = {
  subtle: {
    background: "rgba(var(--accent-rgb), 0.06)",
    color: "rgba(var(--accent-rgb), 0.5)",
    border: "1px solid rgba(var(--accent-rgb), 0.1)",
    fontFamily: "var(--font-body)",
  },
  active: {
    background: "rgba(var(--accent-rgb), 0.08)",
    color: "var(--accent)",
    border: "1px solid rgba(var(--accent-rgb), 0.15)",
    fontFamily: "var(--font-body)",
  },
  filled: {
    background: "rgba(var(--accent-rgb), 0.06)",
    color: "rgba(var(--accent-rgb), 0.55)",
    border: "1px solid rgba(var(--accent-rgb), 0.08)",
    fontFamily: "var(--font-body)",
  },
  "solid-accent": {
    background: "var(--accent)",
    color: "#000000",
    border: "1px solid var(--accent)",
    fontFamily: "var(--font-body)",
  },
};

export function Badge({
  children,
  variant = "subtle",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-[11px] tracking-widest uppercase inline-flex items-center gap-1.5 ${className}`}
      style={BADGE_STYLES[variant]}
    >
      {children}
    </span>
  );
}
