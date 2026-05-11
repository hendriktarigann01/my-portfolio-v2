"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(239,209,195,0.12) 30%, rgba(239,209,195,0.12) 70%, transparent)",
        }}
      />
    </motion.div>
  );
}
