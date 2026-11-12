"use client";

import Link from "next/link";
import { Clock, AlertTriangle, CheckSquare, ArrowLeft } from "lucide-react";
import { formatTimeDisplay } from "@/lib/cpns";

interface ExamHeaderProps {
  packageTitle: string;
  currentCategory: "TWK" | "TIU" | "TKP";
  currentIndex: number;
  totalQuestions: number;
  timeRemainingSeconds: number;
  onFinishClick: () => void;
}

export function ExamHeader({
  packageTitle,
  currentCategory,
  currentIndex,
  totalQuestions,
  timeRemainingSeconds,
  onFinishClick,
}: ExamHeaderProps) {
  const isUrgent = timeRemainingSeconds <= 600;

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-2xl bg-[#024244]/85 border-b border-(--card-border) py-3 px-4 sm:px-6">
      <div className="container-main mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/lab/cat-simulator"
            title="Kembali ke Katalog Paket"
            className="p-1.5 rounded-lg border border-(--card-border) bg-(--card-bg) text-(--text-muted) hover:text-(--text-primary) hover:bg-(--card-bg-hover) transition-colors shrink-0"
          >
            <ArrowLeft size={16} />
          </Link>

          <div className="hidden sm:block">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-(--card-bg) border border-(--card-border) text-(--accent)">
              {packageTitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-(--card-bg) border border-(--card-border) text-(--accent) font-mono">
              {currentCategory}
            </span>
            <span className="text-xs text-(--text-muted) font-mono hidden md:inline">
              Soal {currentIndex + 1} / {totalQuestions}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl border font-mono font-bold text-sm sm:text-base tracking-wider ${
              isUrgent
                ? "border-rose-500/50 bg-rose-500/15 text-rose-300 animate-pulse"
                : "border-(--card-border) bg-(--card-bg) text-(--accent)"
            }`}
          >
            {isUrgent ? (
              <AlertTriangle size={16} className="text-rose-400 shrink-0" />
            ) : (
              <Clock size={16} className="text-(--accent) shrink-0" />
            )}
            <span>{formatTimeDisplay(timeRemainingSeconds)}</span>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={onFinishClick}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-(--btn-primary-bg) text-(--btn-primary-text) font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            <CheckSquare size={14} />
            <span>Selesai Ujian</span>
          </button>
        </div>
      </div>
    </header>
  );
}
