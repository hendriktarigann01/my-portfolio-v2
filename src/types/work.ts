export type WorkEntry = {
  name: string;
  slug: string;
  stack: string;
  category: string;
  focus?: string;
  summary: string;
  description?: string;
  problem?: string;
  solution?: string;
  highlights?: string[];
  features?: string[];
  techStack?: string[];
  isFeatured?: string;
  links: { demo: string; repo: string };
  status?: string;
  year?: string;
  images?: { url: string; title?: string }[];
  imageGroups?: { label: string; images: { url: string; title?: string }[] }[];
};

export type Group = {
  label: string;
  key: string;
  entries: WorkEntry[];
};
