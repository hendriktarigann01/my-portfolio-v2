"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { ILLUSTRATIONS, ILLUSTRATION_SPREAD } from "@/constants";
import { useTouchDevice, useIsMounted } from "@/hooks";

// Keep a curated subset for desktop to keep GPU rasterization light
const CURATED_ILLUSTRATIONS = ILLUSTRATIONS.slice(0, 6).map((item, index) => ({
  ...item,
  topVh: item.top * ILLUSTRATION_SPREAD,
  delay: 0.3 + index * 0.1,
}));

function IllustrationFloat({
  src,
  topVh,
  left,
  right,
  w,
  rotate,
  delay,
  y,
}: {
  src: string;
  topVh: number;
  left?: string;
  right?: string;
  w: number;
  rotate: number;
  delay: number;
  y: MotionValue<number>;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none z-0"
      style={{
        top: `${topVh}vh`,
        left,
        right,
        y,
        rotate,
        opacity: 0.25,
        width: w,
        height: w,
        willChange: "transform",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.25, scale: 1 }}
      transition={{
        duration: 0.8,
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
        loading="lazy"
      />
    </motion.div>
  );
}

export function GlobalIllustrations() {
  const isTouchDevice = useTouchDevice();
  const mounted = useIsMounted();
  const { scrollY } = useScroll();
  const sharedY = useTransform(scrollY, (v: number) => -(v * 0.45));

  if (!mounted || isTouchDevice) return null;

  return (
    <div className="hidden lg:block fixed inset-0 pointer-events-none overflow-hidden z-0">
      {CURATED_ILLUSTRATIONS.map((il, i) => (
        <IllustrationFloat key={i} {...il} y={sharedY} />
      ))}
    </div>
  );
}
