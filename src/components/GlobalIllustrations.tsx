"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const illustrations = [
  { src: "/illustration/5.png",  top: 5,  left: "3%",   w: 80, rotate: -8  },
  { src: "/illustration/6.png",  top: 15, left: "80%",  w: 80, rotate: 6   },
  { src: "/illustration/1.png",  top: 35, left: "2%",   w: 80, rotate: -5  },
  { src: "/illustration/9.png",  top: 45, left: "85%",  w: 80, rotate: 8   },
  { src: "/illustration/2.png",  top: 60, left: "3%",   w: 80, rotate: 5   },
  { src: "/illustration/7.png",  top: 75, left: "83%",  w: 80, rotate: -6  },
  { src: "/illustration/3.png",  top: 85, left: "5%",   w: 80, rotate: 7   },
  { src: "/illustration/4.png",  top: 95, left: "80%",  w: 80, rotate: -4  },
  { src: "/illustration/8.png",  top: 25, left: "88%",  w: 80, rotate: -10 },
  { src: "/illustration/10.png", top: 55, left: "78%",  w: 80, rotate: 9   },
  { src: "/illustration/11.png", top: 70, left: "10%",  w: 80, rotate: -5  },
  { src: "/illustration/12.png", top: 10, left: "15%",  w: 80, rotate: 4   },
];

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
  // Translate Y directly based on scroll in pixels.
  // speedMultiplier near 1 mimics normal page scroll.
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

  // Sebar 12 ilustrasi sejauh 750vh (Multiplier 7.5) agar tidak ada yang terpotong di bawah footer
  const spreadMultiplier = 7.5;
  
  const allIllustrations = illustrations.map((i) => {
    return {
      ...i,
      topVh: i.top * spreadMultiplier,
      speedMultiplier: 0.85, 
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {allIllustrations.map((il, i) => (
        <IllustrationFloat key={i} {...il} scrollY={smoothScrollY} />
      ))}
    </div>
  );
}
