"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ILLUSTRATIONS, ILLUSTRATION_SPREAD } from "@/constants";

const ALL_ILLUSTRATIONS = ILLUSTRATIONS.map((item, index) => ({
  ...item,
  topVh: item.top * ILLUSTRATION_SPREAD,
  speedMultiplier: 0.85,
  delay: 0.4 + (index % 5) * 0.12,
}));

function IllustrationFloat({
  src,
  topVh,
  left,
  right,
  w,
  speedMultiplier,
  rotate,
  delay,
  scrollY,
}: {
  src: string;
  topVh: number;
  left?: string;
  right?: string;
  w: number;
  speedMultiplier: number;
  rotate: number;
  delay: number;
  scrollY: MotionValue<number>;
}) {
  const y = useTransform(scrollY, (v: number) => -(v * speedMultiplier));

  return (
    <motion.div
      className="absolute pointer-events-none select-none z-0"
      style={{
        top: `${topVh}vh`,
        left,
        right,
        y,
        rotate,
        opacity: 0.3,
        width: w,
        height: w,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.3, scale: 1 }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-contain"
        sizes={`${w}px`}
      />
    </motion.div>
  );
}

export function GlobalIllustrations() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {ALL_ILLUSTRATIONS.map((il, i) => (
        <IllustrationFloat key={i} {...il} scrollY={scrollY} />
      ))}
    </div>
  );
}
