import type { MotionProps, Transition, AnimatePresenceProps } from "framer-motion";

export interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
}

export type IllustrationData = {
  src: string;
  top: number;
  left: string;
  w: number;
  rotate: number;
};


export interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

export interface TextRotateProps {
  texts: string[];
  rotationInterval?: number;
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  exit?: MotionProps["exit"];
  animatePresenceMode?: AnimatePresenceProps["mode"];
  animatePresenceInitial?: boolean;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number | "random";
  transition?: Transition;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "words" | "characters" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

export interface NowItem {
  label: string;
  value: string;
  note: string;
  rotation: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  body: string;
}
