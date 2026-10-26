"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/helpers";
import type { TextRotateProps } from "@/types";

export function TextRotate({
  texts,
  rotationInterval = 3000,
  mainClassName,
  staggerDuration = 0.03,
  staggerFrom = "last",
}: TextRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);
    return () => clearInterval(timer);
  }, [texts.length, rotationInterval]);

  const currentText = texts[index];
  const characters = Array.from(currentText);
  const total = characters.length;

  return (
    <span className={cn("inline-flex overflow-hidden", mainClassName)}>
      <span className="sr-only">{currentText}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-flex flex-wrap"
          initial="initial"
          animate="animate"
          exit="exit"
          aria-hidden="true"
        >
          {characters.map((char, charIndex) => {
            const delay =
              staggerFrom === "last"
                ? (total - 1 - charIndex) * staggerDuration
                : charIndex * staggerDuration;

            return (
              <motion.span
                key={charIndex}
                className="inline-block"
                variants={{
                  initial: { y: "100%", opacity: 0 },
                  animate: { y: 0, opacity: 1 },
                  exit: { y: "-120%", opacity: 0 },
                }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  delay,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
