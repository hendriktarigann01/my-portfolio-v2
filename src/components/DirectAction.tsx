"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import type { DirectActionProps } from "./types";

export const DirectAction = ({
  children,
  onClick,
  className = "",
  style,
  color = { r: 239, g: 209, b: 195 },
  containerClassName,
  buttonWrapperClassName,
}: DirectActionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef<HTMLButtonElement>(null);
  const mousePosRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const drawArrow = useCallback(() => {
    if (!canvasRef.current || !targetRef.current || !ctxRef.current) return;

    const targetEl = targetRef.current;
    const canvasEl = canvasRef.current;
    const ctx = ctxRef.current;
    const mouse = mousePosRef.current;

    const x0 = mouse.x;
    const y0 = mouse.y;

    if (x0 === null || y0 === null) return;

    const rect = targetEl.getBoundingClientRect();
    const canvasRect = canvasEl.getBoundingClientRect();

    const cx = rect.left - canvasRect.left + rect.width / 2;
    const cy = rect.top - canvasRect.top + rect.height / 2;

    const a = Math.atan2(cy - y0, cx - x0);
    const x1 = cx - Math.cos(a) * (rect.width / 2 + 12);
    const y1 = cy - Math.sin(a) * (rect.height / 2 + 12);

    const midX = (x0 + x1) / 2;
    const midY = (y0 + y1) / 2;
    const offset = Math.min(200, Math.hypot(x1 - x0, y1 - y0) * 0.5);
    const t = Math.max(-1, Math.min(1, (y0 - y1) / 200));
    const controlX = midX;
    const controlY = midY + offset * t;

    const r = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
    const opacity = Math.min(
      1.0,
      (r - Math.max(rect.width, rect.height) / 2) / 500,
    );

    ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
    ctx.lineWidth = 2;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(controlX, controlY, x1, y1);
    ctx.setLineDash([10, 5]);
    ctx.stroke();
    ctx.restore();

    const angle = Math.atan2(y1 - controlY, x1 - controlX);
    const headLength = 10 * (ctx.lineWidth / 1.5);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(
      x1 - headLength * Math.cos(angle - Math.PI / 6),
      y1 - headLength * Math.sin(angle - Math.PI / 6),
    );
    ctx.moveTo(x1, y1);
    ctx.lineTo(
      x1 - headLength * Math.cos(angle + Math.PI / 6),
      y1 - headLength * Math.sin(angle + Math.PI / 6),
    );
    ctx.stroke();
  }, [color]);

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    ctxRef.current = canvas.getContext("2d");
    const ctx = ctxRef.current;

    const updateCanvasSize = () => {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      const parent = canvasEl.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvasEl.width = rect.width;
        canvasEl.height = rect.height;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      const rect = canvasEl.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        mousePosRef.current = { x: null, y: null };
      } else {
        mousePosRef.current = { x, y };
      }
    };

    window.addEventListener("resize", updateCanvasSize);
    window.addEventListener("mousemove", handleMouseMove);
    updateCanvasSize();

    const animateLoop = () => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawArrow();
      }
      animationFrameIdRef.current = requestAnimationFrame(animateLoop);
    };

    animateLoop();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [drawArrow, isTouchDevice]);

  return (
    <div className={`relative ${containerClassName || ""}`}>
      <div className={buttonWrapperClassName || ""}>
        <button ref={targetRef} onClick={onClick} className={className} style={style}>
          {children}
        </button>
      </div>
      {!isTouchDevice && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-[9999]"
        />
      )}
    </div>
  );
};
