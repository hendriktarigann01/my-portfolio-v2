import type { Variants } from "framer-motion";
import type { Group, WorkEntry } from "@/types";
import worksData from "@/data/works.json";

export const WORK_GROUPS: Group[] = [
  {
    label: "Systems",
    key: "systems",
    entries: worksData.systems as WorkEntry[],
  },
  {
    label: "Interactive",
    key: "interactive",
    entries: worksData.interactive as WorkEntry[],
  },
  {
    label: "Landing Pages",
    key: "landing_pages",
    entries: worksData.landing_pages as WorkEntry[],
  },
];

export const ALL_WORK_ENTRIES: WorkEntry[] = [
  ...(worksData.systems as WorkEntry[]),
  ...(worksData.interactive as WorkEntry[]),
  ...(worksData.landing_pages as WorkEntry[]),
];

export const WORK_GRID_CONTAINER_VARIANTS: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export const WORK_GRID_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
