"use client";

import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowLeft,
  Clock,
  Award,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatTimeDisplay } from "@/lib/cpns";
import type { ExamResult, PackageMeta } from "@/types/cpns";

interface ScoreSummaryCardProps {
  packageMeta: PackageMeta;
  result: ExamResult;
  onRetake: () => void;
}

export function ScoreSummaryCard({
  packageMeta,
  result,
  onRetake,
}: ScoreSummaryCardProps) {
  const { isPassed, scores, totalScore, timeSpentSeconds } = result;

  const categories = [
    {
      key: "twk" as const,
      name: "Tes Wawasan Kebangsaan (TWK)",
      score: scores.twk.score,
      max: scores.twk.maxScore,
      pg: scores.twk.passingGrade,
      passed: scores.twk.isPassed,
    },
    {
      key: "tiu" as const,
      name: "Tes Inteligensia Umum (TIU)",
      score: scores.tiu.score,
      max: scores.tiu.maxScore,
      pg: scores.tiu.passingGrade,
      passed: scores.tiu.isPassed,
    },
    {
      key: "tkp" as const,
      name: "Tes Karakteristik Pribadi (TKP)",
      score: scores.tkp.score,
      max: scores.tkp.maxScore,
      pg: scores.tkp.passingGrade,
      passed: scores.tkp.isPassed,
    },
  ];

  return (
    <div className="space-y-6">
      <div
        className={`p-6 md:p-8 rounded-2xl border ${
          isPassed
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
            : "border-rose-500/30 bg-rose-500/10 text-rose-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                isPassed
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-rose-500/20 text-rose-300"
              }`}
            >
              {isPassed ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
            </div>
            <div>
              <div className="text-xs uppercase font-mono font-bold tracking-wider opacity-80 mb-1">
                Hasil Akhir {packageMeta.title}
              </div>
              <h2
                className="text-xl sm:text-2xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {isPassed ? "LOLOS PASSING GRADE" : "BELUM MEMENUHI PASSING GRADE"}
              </h2>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs opacity-75 mb-0.5">Total Perolehan Skor</div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-(--accent)">
              {totalScore} <span className="text-sm font-sans opacity-70">/ 550</span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm mt-4 opacity-90 leading-relaxed max-w-3xl">
          {isPassed
            ? "Luar biasa! Skor Anda pada seluruh kategori (TWK, TIU, dan TKP) telah memenuhi atau melampaui nilai ambang batas resmi CAT BKN."
            : "Tetap semangat! Anda belum memenuhi nilai ambang batas pada salah satu atau lebih kategori. Evaluasi bagian yang kurang melalui lembar pembahasan di bawah."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const percentage = Math.min(100, Math.round((cat.score / cat.max) * 100));

          return (
            <GlassCard key={cat.key} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold uppercase text-(--accent)">
                    {cat.key.toUpperCase()}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      cat.passed
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                        : "border-rose-500/30 bg-rose-500/10 text-rose-300"
                    }`}
                  >
                    {cat.passed ? "Lolos PG" : "Belum Lolos"}
                  </span>
                </div>

                <div className="text-xs text-(--text-muted) mb-3">{cat.name}</div>

                <div className="flex items-baseline justify-between mb-2">
                  <div className="text-2xl font-bold font-mono text-(--accent)">
                    {cat.score}{" "}
                    <span className="text-xs font-sans text-(--text-subtle) font-normal">
                      / {cat.max}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-(--text-subtle)">
                    PG: {cat.pg}
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-(--card-bg) border border-(--card-border) overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      cat.passed ? "bg-emerald-400" : "bg-rose-400"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="p-4 rounded-xl border border-(--card-border) bg-(--card-bg) flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-xs text-(--text-muted) font-mono">
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-(--accent)" />
            <span>Waktu Pengerjaan: {formatTimeDisplay(timeSpentSeconds)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={15} className="text-(--accent)" />
            <span>110 Soal Terstandar</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-(--card-border) bg-(--card-bg) text-xs font-semibold uppercase tracking-wider text-(--accent) hover:bg-(--card-bg-hover) transition-colors"
          >
            <RotateCcw size={14} />
            <span>Ulangi Ujian</span>
          </button>

          <Link
            href="/lab/cat-simulator"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-(--btn-primary-bg) text-(--btn-primary-text) text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={14} />
            <span>Paket Lainnya</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
