import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "subtle" | "active" | "filled" | "solid-accent" | "tertiary" | "tertiary-filled";
  className?: string;
}

export function Badge({ children, variant = "subtle", className = "" }: BadgeProps) {
  let style: React.CSSProperties = {};
  
  if (variant === "subtle") {
    style = {
      background: "rgba(var(--accent-rgb), 0.06)",
      color: "rgba(var(--accent-rgb), 0.5)",
      border: "1px solid rgba(var(--accent-rgb), 0.1)",
      fontFamily: "var(--font-body)",
    };
  } else if (variant === "active") {
    style = {
      background: "rgba(var(--accent-rgb), 0.08)",
      color: "var(--accent)",
      border: "1px solid rgba(var(--accent-rgb), 0.15)",
      fontFamily: "var(--font-body)",
    };
  } else if (variant === "filled") {
    style = {
      background: "rgba(var(--accent-rgb), 0.06)",
      color: "rgba(var(--accent-rgb), 0.55)",
      border: "1px solid rgba(var(--accent-rgb), 0.08)",
      fontFamily: "var(--font-body)",
    };
  } else if (variant === "solid-accent") {
    style = {
      background: "var(--accent)",
      color: "#000000",
      border: "1px solid var(--accent)",
      fontFamily: "var(--font-body)",
    };
  } else if (variant === "tertiary") {
    style = {
      background: "rgba(var(--tertiary-rgb), 0.06)",
      color: "var(--tertiary)",
      border: "1px solid rgba(var(--tertiary-rgb), 0.12)",
      fontFamily: "var(--font-body)",
    };
  } else if (variant === "tertiary-filled") {
    style = {
      background: "rgba(var(--tertiary-rgb), 0.08)",
      color: "var(--tertiary)",
      border: "1px solid rgba(var(--tertiary-rgb), 0.15)",
      fontFamily: "var(--font-body)",
    };
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-[11px] tracking-widest uppercase inline-flex items-center gap-1.5 ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
