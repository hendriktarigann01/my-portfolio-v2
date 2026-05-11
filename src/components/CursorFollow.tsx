"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const trailConfig = { damping: 35, stiffness: 150, mass: 0.8 };

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const trailX = useSpring(dotX, trailConfig);
  const trailY = useSpring(dotY, trailConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, [data-cursor-hover], input, textarea") !==
        null;
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Ring cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border mix-blend-exclusion"
        style={{
          x: springX,
          y: springY,
          width: 20,
          height: 20,
          borderColor: "#efd1c3",
        }}
        animate={{
          scale: isHovering ? 2.5 : isClicking ? 0.8 : 1,
          opacity: isHovering ? 0.6 : 0.8,
          borderWidth: isHovering ? 1.5 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 },
          borderWidth: { duration: 0.2 },
        }}
      />
      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          width: 8,
          height: 8,
          backgroundColor: "#efd1c3",
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 20 },
          opacity: { duration: 0.15 },
        }}
      />
    </>
  );
}
