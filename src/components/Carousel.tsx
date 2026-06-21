"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  animate,
  AnimatePresence,
} from "framer-motion";
import {
  ACCENT,
  THUMB_ACTIVE_W,
  THUMB_INACTIVE_W,
  THUMB_GAP,
  THUMB_MARGIN,
} from "@/constants";
import type { CarouselImage, CarouselProps, ImageGroup, GroupedCarouselProps } from "@/types";
import { useKeyboardNavigation } from "@/hooks";

export type { CarouselImage };

// ─── Thumbnails ───────────────────────────────────────────────────────────────

function Thumbnails({
  images,
  index,
  setIndex,
}: {
  images: CarouselImage[];
  index: number;
  setIndex: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let scroll = 0;
    for (let i = 0; i < index; i++) scroll += THUMB_INACTIVE_W + THUMB_GAP;
    scroll += THUMB_MARGIN;
    const center = ref.current.offsetWidth / 2 - THUMB_ACTIVE_W / 2;
    ref.current.scrollTo({ left: scroll - center, behavior: "smooth" });
  }, [index]);

  if (images.length <= 1) return null;

  return (
    <div
      ref={ref}
      className="overflow-x-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style>{`
        .carousel-thumbs::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        className="carousel-thumbs flex h-16 pb-1"
        style={{ width: "fit-content", gap: `${THUMB_GAP}px` }}
      >
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? "active" : "inactive"}
            variants={{
              active: {
                width: THUMB_ACTIVE_W,
                marginLeft: THUMB_MARGIN,
                marginRight: THUMB_MARGIN,
                opacity: 1,
              },
              inactive: {
                width: THUMB_INACTIVE_W,
                marginLeft: 0,
                marginRight: 0,
                opacity: 0.45,
              },
            }}
            whileHover={{ opacity: 0.85 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative shrink-0 h-full overflow-hidden"
            style={{
              border:
                i === index
                  ? `1.5px solid ${ACCENT}0.35)`
                  : `1px solid ${ACCENT}0.08)`,
            }}
          >
            <img
              src={img.url}
              alt={img.title || `Thumbnail ${i + 1}`}
              className="w-full h-full object-cover pointer-events-none select-none"
              draggable={false}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── Nav Button ───────────────────────────────────────────────────────────────

function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      disabled={disabled}
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
      style={{
        [direction === "prev" ? "left" : "right"]: "14px",
        width: 40,
        height: 40,
        background: disabled ? `${ACCENT}0.04)` : `${ACCENT}0.1)`,
        border: `1px solid ${ACCENT}${disabled ? "0.06" : "0.18"})`,
        borderRadius: "50%",
        color: disabled ? `${ACCENT}0.15)` : `${ACCENT}0.7)`,
        cursor: disabled ? "not-allowed" : "pointer",
        backdropFilter: "blur(8px)",
      }}
      whileHover={disabled ? {} : { scale: 1.1, background: `${ACCENT}0.18)` }}
      whileTap={disabled ? {} : { scale: 0.93 }}
      transition={{ duration: 0.2 }}
    >
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </motion.button>
  );
}

// ─── Variant Tabs ─────────────────────────────────────────────────────────────

function VariantTabs({
  groups,
  active,
  onChange,
}: {
  groups: ImageGroup[];
  active: number;
  onChange: (i: number) => void;
}) {
  if (groups.length <= 1) return null;

  return (
    <div
      className="flex items-center gap-1.5 mb-4 overflow-x-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <span
        className="shrink-0 mr-2 text-[0.65rem] uppercase tracking-[0.15em]"
        style={{
          color: `${ACCENT}0.3)`,
          fontFamily: "var(--font-body)",
        }}
      >
        Variant
      </span>
      {groups.map((g, i) => (
        <motion.button
          key={g.label}
          onClick={() => onChange(i)}
          className="relative shrink-0 px-3.5 py-1.5 rounded-full text-[0.7rem] tracking-wider uppercase"
          style={{
            fontFamily: "var(--font-body)",
            color: i === active ? "var(--accent)" : `${ACCENT}0.4)`,
            cursor: "pointer",
            border: "none",
            background: "transparent",
          }}
          whileHover={{ color: "var(--accent)" }}
          transition={{ duration: 0.2 }}
        >
          {i === active && (
            <motion.div
              layoutId="variant-pill"
              className="absolute inset-0 rounded-full"
              style={{
                background: `${ACCENT}0.1)`,
                border: `1px solid ${ACCENT}0.2)`,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{g.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

// ─── Inner Carousel (core slider) ─────────────────────────────────────────────

function InnerCarousel({ images }: { images: CarouselImage[] }) {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Reset index when images change
  useEffect(() => {
    setIndex(0);
  }, [images]);

  useKeyboardNavigation({
    onLeft: () => setIndex((i) => Math.max(0, i - 1)),
    onRight: () => setIndex((i) => Math.min(images.length - 1, i + 1)),
    enabled: images.length > 1,
  });

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const w = containerRef.current.offsetWidth || 1;
      animate(x, -index * w, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  // Snap x to 0 when images change
  useEffect(() => {
    x.set(0);
  }, [images, x]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-3">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          background: `${ACCENT}0.02)`,
          border: `1px solid ${ACCENT}0.08)`,
        }}
      >
        {/* Ambient light gradient background */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(var(--accent-rgb), 0.15) 0%, transparent 80%)",
          }}
        />

        <motion.div
          className="flex relative z-10"
          drag="x"
          dragElastic={0.15}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            const w = containerRef.current?.offsetWidth || 1;
            let next = index;
            if (Math.abs(info.velocity.x) > 500) {
              next = info.velocity.x > 0 ? index - 1 : index + 1;
            } else if (Math.abs(info.offset.x) > w * 0.25) {
              next = info.offset.x > 0 ? index - 1 : index + 1;
            }
            setIndex(Math.max(0, Math.min(images.length - 1, next)));
          }}
          style={{ x }}
        >
          {images.map((img, i) => (
            <div
              key={`${img.url}-${i}`}
              className="shrink-0 w-full aspect-[16/9] relative overflow-hidden flex items-center justify-center"
            >
              {/* Main image rendered fully using object-contain */}
              <Image
                src={img.url}
                alt={img.title || `Project screenshot ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-contain select-none pointer-events-none z-10 p-2 md:p-4"
                draggable={false}
                loading={i === index ? "eager" : "lazy"}
                priority={i === index}
              />
            </div>
          ))}
        </motion.div>

        {images.length > 1 && (
          <>
            <NavButton
              direction="prev"
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
            />
            <NavButton
              direction="next"
              disabled={index === images.length - 1}
              onClick={() =>
                setIndex((i) => Math.min(images.length - 1, i + 1))
              }
            />
          </>
        )}

        {images.length > 1 && (
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs"
            style={{
              background: "rgba(2,66,68,0.6)",
              backdropFilter: "blur(8px)",
              color: `${ACCENT}0.6)`,
              border: `1px solid ${ACCENT}0.1)`,
              fontFamily: "var(--font-body)",
              letterSpacing: "0.06em",
              zIndex: 20,
            }}
          >
            {index + 1} / {images.length}
          </div>
        )}
      </div>

      <Thumbnails images={images} index={index} setIndex={setIndex} />
    </div>
  );
}

// ─── Default Carousel (flat images) ───────────────────────────────────────────

export default function Carousel({ images }: CarouselProps) {
  if (!images || images.length === 0) return null;
  return <InnerCarousel images={images} />;
}

// ─── Grouped Carousel (variant tabs + carousel) ──────────────────────────────

export function GroupedCarousel({ groups }: GroupedCarouselProps) {
  const [activeGroup, setActiveGroup] = useState(0);

  // Filter out empty groups
  const validGroups = groups.filter((g) => g.images.length > 0);
  if (validGroups.length === 0) return null;

  const currentImages = validGroups[activeGroup]?.images || [];

  return (
    <div className="w-full">
      <VariantTabs
        groups={validGroups}
        active={activeGroup}
        onChange={setActiveGroup}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={validGroups[activeGroup]?.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <InnerCarousel images={currentImages} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
