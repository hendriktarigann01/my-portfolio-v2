"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  const handleBack = () => {
    console.log("Navigating back to home...");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* radial ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 45%, rgba(var(--accent-rgb), 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center space-y-5 max-w-lg">
        <motion.span
          className="mb-8 px-4 py-1.5 rounded-full text-[11px] tracking-[0.25em] uppercase"
          style={{
            background: "rgba(var(--accent-rgb), 0.05)",
            color: "rgba(var(--accent-rgb), 0.35)",
            border: "1px solid rgba(var(--accent-rgb), 0.08)",
            fontFamily: "var(--font-body)",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Page not found
        </motion.span>

        {/* 404 */}
        <motion.h1
          className="text-center leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(7rem, 22vw, 14rem)",
            color: "rgba(var(--accent-rgb), 0.07)",
            letterSpacing: "-0.06em",
            lineHeight: 0.85,
            userSelect: "none",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          404
        </motion.h1>

        {/* message */}
        <motion.p
          className="text-center -mt-4 mb-2"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
            color: "var(--accent)",
            letterSpacing: "-0.03em",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Lost in the void
        </motion.p>

        <motion.p
          className="text-center"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(var(--accent-rgb), 0.4)",
            fontSize: "0.95rem",
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: "340px",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved
          somewhere else.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/">
            <Button label="Back to Home" onClick={handleBack} />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
