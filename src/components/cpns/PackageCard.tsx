"use client";

import Link from "next/link";
import { Clock, HelpCircle, CheckCircle2, AlertCircle, ArrowUpRight, RotateCcw } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import type { PackageMeta, ExamHistoryRecord } from "@/types/cpns";

interface PackageCardProps {
  meta: PackageMeta;
  history?: ExamHistoryRecord;
  hasActiveSession?: boolean;
}

export function PackageCard({ meta, history, hasActiveSession }: PackageCardProps) {
  const isCompleted = Boolean(history);

  return (
    <GlassCard interactive className="p-6 flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-(--card-bg) border border-(--card-border) text-(--accent) font-semibold">
            CAT BKN
          </span>

          {hasActiveSession ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300">
              <Clock size={12} />
              Berjalan
            </span>
          ) : isCompleted ? (
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                history?.isPassed
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-rose-500/30 bg-rose-500/10 text-rose-300"
              }`}
            >
              {history?.isPassed ? (
                <>
                  <CheckCircle2 size={12} />
                  Lolos PG
                </>
              ) : (
                <>
                  <AlertCircle size={12} />
                  Belum Lolos
                </>
              )}
            </span>
          ) : (
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-(--card-border) bg-(--card-bg) text-(--text-subtle)">
              Belum Dikerjakan
            </span>
          )}
        </div>

        <h3
          className="text-lg font-bold text-(--accent) mb-3 group-hover:opacity-90 transition-opacity"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {meta.title}
        </h3>

        <div className="space-y-2 mb-4 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-(--card-bg) border border-(--card-border)">
            <div className="flex items-center gap-2 text-(--text-muted)">
              <HelpCircle size={14} className="text-(--accent) shrink-0" />
              <span>Jumlah Soal</span>
            </div>
            <span className="font-mono font-semibold text-(--accent)">110 Butir</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-(--card-bg) border border-(--card-border)">
            <div className="flex items-center gap-2 text-(--text-muted)">
              <Clock size={14} className="text-(--accent) shrink-0" />
              <span>Durasi Waktu</span>
            </div>
            <span className="font-mono font-semibold text-(--accent)">100 Menit</span>
          </div>
        </div>

        <div className="text-xs p-2.5 rounded-xl bg-(--card-bg) border border-(--card-border) mb-5 space-y-1">
          <div className="text-[11px] text-(--text-subtle) font-medium">Passing Grade Minimal:</div>
          <div className="flex items-center justify-between font-mono text-(--text-muted)">
            <span>TWK: <strong className="text-(--accent) font-semibold">{meta.passingGrade.twk}</strong></span>
            <span>TIU: <strong className="text-(--accent) font-semibold">{meta.passingGrade.tiu}</strong></span>
            <span>TKP: <strong className="text-(--accent) font-semibold">{meta.passingGrade.tkp}</strong></span>
          </div>
        </div>

        {isCompleted && history && (
          <div className="p-3 rounded-xl border border-(--card-border) bg-(--card-bg) mb-5">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[11px] text-(--text-subtle)">Skor Terakhir:</span>
              <span className="text-base font-bold text-(--accent) font-mono">
                {history.totalScore} <span className="text-xs text-(--text-subtle)">/ 550</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-(--text-muted)">
              <span>TWK {history.scores.twk}</span>
              <span>TIU {history.scores.tiu}</span>
              <span>TKP {history.scores.tkp}</span>
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-(--card-border) flex items-center gap-2">
        <Link
          href={`/lab/cat-simulator/${meta.id}`}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-(--btn-primary-bg) text-(--btn-primary-text) font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
        >
          <span>{hasActiveSession ? "Lanjutkan Ujian" : isCompleted ? "Uji Ulang" : "Mulai Ujian"}</span>
          <ArrowUpRight size={14} />
        </Link>

        {isCompleted && (
          <Link
            href={`/lab/cat-simulator/${meta.id}/result`}
            title="Lihat Hasil & Pembahasan"
            className="p-2.5 rounded-xl border border-(--card-border) bg-(--card-bg) text-(--accent) hover:bg-(--card-bg-hover) transition-colors"
          >
            <RotateCcw size={16} />
          </Link>
        )}
      </div>
    </GlassCard>
  );
}
