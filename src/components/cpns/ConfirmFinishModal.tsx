"use client";

import { AlertTriangle, CheckSquare, X } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface ConfirmFinishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalQuestions: number;
  answeredCount: number;
  doubtfulCount: number;
  unansweredCount: number;
}

export function ConfirmFinishModal({
  isOpen,
  onClose,
  onConfirm,
  answeredCount,
  doubtfulCount,
  unansweredCount,
}: ConfirmFinishModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-md transition-all">
        <GlassCard className="p-6 md:p-7 relative border-(--card-border-hover) backdrop-blur-2xl">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-(--text-subtle) hover:text-(--text-primary) transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-(--accent)/10 border border-(--card-border) flex items-center justify-center text-(--accent)">
              <CheckSquare size={20} />
            </div>
            <div>
              <h3
                className="text-base font-bold text-(--accent)"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Konfirmasi Selesai Ujian
              </h3>
              <p className="text-xs text-(--text-muted)">
                Periksa kembali ringkasan lembar jawaban Anda
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-(--card-bg) border border-(--card-border) mb-4 text-center">
            <div>
              <div className="text-[10px] text-(--text-subtle) uppercase">Dijawab</div>
              <div className="text-lg font-bold font-mono text-(--accent)">
                {answeredCount}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-amber-300 uppercase">Ragu-ragu</div>
              <div className="text-lg font-bold font-mono text-amber-300">
                {doubtfulCount}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-rose-300 uppercase">Kosong</div>
              <div className="text-lg font-bold font-mono text-rose-300">
                {unansweredCount}
              </div>
            </div>
          </div>

          {unansweredCount > 0 && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-5">
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              <span>
                Masih ada <strong>{unansweredCount} butir soal</strong> yang belum Anda jawab. Soal yang tidak dijawab bernilai 0 poin.
              </span>
            </div>
          )}

          {doubtfulCount > 0 && unansweredCount === 0 && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs mb-5">
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              <span>
                Anda masih memiliki <strong>{doubtfulCount} butir soal</strong> berstatus ragu-ragu.
              </span>
            </div>
          )}

          <p className="text-xs text-(--text-muted) leading-relaxed mb-6">
            Apakah Anda yakin ingin mengakhiri sesi ujian ini? Setelah dikonfirmasi, jawaban akan dikunci dan dihitung ke skor akhir.
          </p>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-(--card-border) bg-(--card-bg) text-xs font-semibold uppercase tracking-wider text-(--text-muted) hover:text-(--text-primary) hover:bg-(--card-bg-hover) transition-colors"
            >
              Kembali Mengerjakan
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-5 py-2.5 rounded-xl bg-(--btn-primary-bg) text-(--btn-primary-text) text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Ya, Selesai Ujian
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
