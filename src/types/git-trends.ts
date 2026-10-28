export type TrendingPeriod = "daily" | "weekly" | "monthly";

export type SupportedLanguage =
  | "All"
  | "TypeScript"
  | "JavaScript"
  | "Python"
  | "Go"
  | "Rust";

export interface RepoAISummary {
  overview: string;
  trendingReason?: string;
}

export interface TrendingRepo {
  id: string;
  rank: number;
  name: string;
  owner: string;
  repoName: string;
  url: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  starsPeriod: number;
  periodLabel: string;
  aiSummary: RepoAISummary;
}

export interface GitTrendsSnapshot {
  updatedAt: string;
  formattedUpdatedAt: string;
  daily: TrendingRepo[];
  weekly: TrendingRepo[];
  monthly: TrendingRepo[];
  // Fallback alias jika diperlukan
  repositories?: TrendingRepo[];
}
