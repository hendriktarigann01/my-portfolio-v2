"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  GitFork,
  ExternalLink,
  TrendingUp,
  Layers,
} from "lucide-react";
import initialSnapshot from "@/data/git-trends.json";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import type { TrendingPeriod, TrendingRepo, GitTrendsSnapshot } from "@/types/git-trends";

const PERIODS: { label: string; value: TrendingPeriod }[] = [
  { label: "Harian", value: "daily" },
  { label: "Mingguan", value: "weekly" },
  { label: "Bulanan", value: "monthly" },
];

export default function GitTrendsPage() {
  const data = initialSnapshot as unknown as GitTrendsSnapshot;
  const [selectedPeriod, setSelectedPeriod] = useState<TrendingPeriod>("daily");
  const [selectedLang, setSelectedLang] = useState<string>("All");

  const currentPeriodRepos = useMemo(() => {
    if (selectedPeriod === "weekly") return data.weekly || [];
    if (selectedPeriod === "monthly") return data.monthly || [];
    return data.daily || data.repositories || [];
  }, [data, selectedPeriod]);

  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    currentPeriodRepos.forEach((repo) => {
      if (repo.language) langs.add(repo.language);
    });
    return ["All", ...Array.from(langs)];
  }, [currentPeriodRepos]);

  const filteredRepos = useMemo(() => {
    return currentPeriodRepos.filter((repo) => {
      return (
        selectedLang === "All" ||
        repo.language.toLowerCase() === selectedLang.toLowerCase()
      );
    });
  }, [currentPeriodRepos, selectedLang]);

  const handlePeriodChange = (period: TrendingPeriod) => {
    setSelectedPeriod(period);
    setSelectedLang("All");
  };

  return (
    <main className="min-h-screen py-16 md:py-24 px-4 sm:px-6 md:px-0">
      <div className="container-main mx-auto">
        <div className="mb-10 text-center md:text-left">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Git Trends" },
            ]}
          />

          <div className="mt-6">
            <h1
              className="leading-[1.1] mb-2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                color: "var(--accent)",
                letterSpacing: "-0.035em",
              }}
            >
              Top Trending GitHub Repositories
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(var(--accent-rgb), 0.65)",
                fontSize: "0.95rem",
                fontWeight: 300,
              }}
            >
              Dirangkum otomatis oleh Gemini AI setiap hari.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="p-1 rounded-full bg-[rgba(var(--accent-rgb),0.04)] border border-[rgba(var(--accent-rgb),0.1)] inline-flex items-center gap-1">
            {PERIODS.map((p) => {
              const isSelected = selectedPeriod === p.value;
              return (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => handlePeriodChange(p.value)}
                  className={`h-8 px-5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[var(--accent)] text-[#024244] shadow-sm font-bold"
                      : "text-[rgba(var(--accent-rgb),0.6)] hover:text-[var(--accent)]"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className="p-1 rounded-full bg-[rgba(var(--accent-rgb),0.04)] border border-[rgba(var(--accent-rgb),0.1)] inline-flex items-center gap-1 max-w-full overflow-x-auto no-scrollbar">
            {availableLanguages.map((lang) => {
              const isActive = selectedLang === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLang(lang)}
                  className={`h-8 px-4 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[var(--accent)] text-[#024244] font-bold shadow-sm"
                      : "text-[rgba(var(--accent-rgb),0.6)] hover:text-[var(--accent)]"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {lang === "All" ? "Semua" : lang}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredRepos.length === 0 ? (
            <div className="py-20 text-center glass rounded-2xl p-6">
              <Layers className="w-8 h-8 opacity-60 mx-auto mb-3 text-[var(--accent)]" />
              <p
                className="text-xs text-[rgba(var(--accent-rgb),0.6)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Tidak ada repositori untuk filter bahasa ini.
              </p>
              <button
                type="button"
                onClick={() => setSelectedLang("All")}
                className="mt-4 px-4 py-1.5 rounded-full text-xs font-semibold bg-[var(--accent)] text-[#024244] cursor-pointer"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <motion.div
              key={`${selectedPeriod}-${selectedLang}`}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {filteredRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function RepoCard({ repo }: { repo: TrendingRepo }) {
  const ogImageUrl = `https://opengraph.githubassets.com/1/${repo.name}`;
  const ownerAvatarUrl = `https://github.com/${repo.owner}.png?size=64`;

  return (
    <article className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[rgba(var(--accent-rgb),0.08)] hover:border-[rgba(var(--accent-rgb),0.25)] transition-all flex flex-col justify-between group">
      <div>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative aspect-[16/9] w-full rounded-lg sm:rounded-xl overflow-hidden mb-3 bg-black/20 border border-[rgba(var(--accent-rgb),0.06)]"
        >
          <img
            src={ogImageUrl}
            alt={repo.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </a>

        <div className="flex items-center justify-between gap-1 mb-2 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <span
              className="font-bold text-[var(--accent)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              #{repo.rank}
            </span>
            <div className="inline-flex items-center gap-1 text-[rgba(var(--accent-rgb),0.75)]">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: repo.languageColor }}
              />
              <span className="truncate max-w-[70px] sm:max-w-none">{repo.language}</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 text-emerald-300 font-medium">
            <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>+{repo.starsPeriod.toLocaleString()}</span>
          </div>
        </div>

        <div className="mb-2">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--accent)] hover:underline"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <img
              src={ownerAvatarUrl}
              alt={repo.owner}
              className="w-4 h-4 rounded-full border border-[rgba(var(--accent-rgb),0.2)] shrink-0"
              loading="lazy"
            />
            <span className="truncate">{repo.repoName}</span>
            <ExternalLink className="w-3 h-3 opacity-50 group-hover/link:opacity-100 shrink-0" />
          </a>
        </div>

        <p
          className="text-[11px] sm:text-xs text-[rgba(var(--accent-rgb),0.8)] line-clamp-3 sm:line-clamp-4 leading-relaxed mb-3"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {repo.aiSummary?.overview || repo.description}
        </p>
      </div>

      <div className="pt-2 border-t border-[rgba(var(--accent-rgb),0.06)] flex items-center justify-between text-[10px] sm:text-xs text-[rgba(var(--accent-rgb),0.5)]">
        <div className="inline-flex items-center gap-1">
          <Star className="w-3 h-3 text-[var(--accent)]/70" />
          <span>{repo.stars.toLocaleString()}</span>
        </div>
        <div className="inline-flex items-center gap-1">
          <GitFork className="w-3 h-3 text-[var(--accent)]/70" />
          <span>{repo.forks.toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
}
