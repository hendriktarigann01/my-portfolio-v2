import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
}

export function GlassCard({
  children,
  interactive = false,
  className = "",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl ${interactive ? "glass-interactive" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
