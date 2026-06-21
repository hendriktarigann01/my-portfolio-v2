"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ILLUSTRATIONS, ILLUSTRATION_SPREAD } from "@/constants";

function IllustrationFloat({
  src,
  topVh,
  left,
  right,
  w,
  speedMultiplier,
  rotate,
  scrollY,
}: {
  src: string;
  topVh: number;
  left?: string;
  right?: string;
  w: number;
  speedMultiplier: number;
  rotate: number;
  scrollY: any;
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
        delay: Math.random() * 0.6 + 0.4,
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
  const smoothScrollY = useSpring(scrollY, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const allIllustrations = ILLUSTRATIONS.map((i) => ({
    ...i,
    topVh: i.top * ILLUSTRATION_SPREAD,
    speedMultiplier: 0.85,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {allIllustrations.map((il, i) => (
        <IllustrationFloat key={i} {...il} scrollY={smoothScrollY} />
      ))}
    </div>
  );
}
