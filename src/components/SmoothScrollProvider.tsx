// Tujuan      : Smooth scroll provider menggunakan Lenis
// Caller      : src/app/layout.tsx
// Dependensi  : lenis
// Main Exports: SmoothScrollProvider, lenisRef (module-level untuk external stop/start)
// Side Effects: Lenis instance, requestAnimationFrame loop

"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Module-level ref agar komponen lain (misal ChatWidget) bisa stop/start Lenis
// tanpa perlu prop drilling atau context tambahan
export let globalLenis: Lenis | null = null;

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      globalLenis = null;
    };
  }, []);

  return <>{children}</>;
}
