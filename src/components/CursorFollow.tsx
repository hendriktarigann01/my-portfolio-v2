"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 });
  const trailX = useSpring(dotX, { damping: 35, stiffness: 150, mass: 0.8 });
  const trailY = useSpring(dotY, { damping: 35, stiffness: 150, mass: 0.8 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };
    const over = (e: MouseEvent) => {
      setIsHovering(
        (e.target as HTMLElement).closest("a, button, [data-cursor-hover], input, textarea") !== null
      );
    };
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [isTouchDevice, cursorX, cursorY, dotX, dotY]);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border mix-blend-exclusion"
        style={{ x: springX, y: springY, width: 20, height: 20, borderColor: "#efd1c3" }}
        animate={{ scale: isHovering ? 2.5 : isClicking ? 0.8 : 1, opacity: isHovering ? 0.6 : 0.8, borderWidth: isHovering ? 1.5 : 1 }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 }, opacity: { duration: 0.2 }, borderWidth: { duration: 0.2 } }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{ x: trailX, y: trailY, width: 8, height: 8, backgroundColor: "#efd1c3" }}
        animate={{ scale: isClicking ? 0.5 : 1, opacity: isHovering ? 0 : 1 }}
        transition={{ scale: { type: "spring", stiffness: 400, damping: 20 }, opacity: { duration: 0.15 } }}
      />
    </>
  );
}
