"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  CheckSquare,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { getCpnsImageUrl } from "@/lib/cpns";
import type { Question, QuestionAnswerState } from "@/types/cpns";

interface QuestionAreaProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  currentAnswer?: QuestionAnswerState;
  onSelectOption: (label: "A" | "B" | "C" | "D" | "E") => void;
  onToggleDoubtful: () => void;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export function QuestionArea({
  question,
  currentIndex,
  totalQuestions,
  currentAnswer,
  onSelectOption,
  onToggleDoubtful,
  onPrev,
  onNext,
  onFinish,
}: QuestionAreaProps) {
  const imageUrl = getCpnsImageUrl(question.image);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      const key = e.key.toUpperCase();
      if (["A", "B", "C", "D", "E"].includes(key)) {
        e.preventDefault();
        onSelectOption(key as "A" | "B" | "C" | "D" | "E");
      } else if (e.key === "ArrowLeft" && !isFirst) {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (isLast) {
          onFinish();
        } else {
          onNext();
        }
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        onToggleDoubtful();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSelectOption, onPrev, onNext, onFinish, onToggleDoubtful, isFirst, isLast]);

  return (
    <GlassCard className="p-5 sm:p-7 md:p-8 flex flex-col justify-between min-h-[35rem]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-(--card-border)">
          <div className="flex items-center gap-2">
            <span className="text-sm md:text-base font-bold font-mono text-(--accent)">
              Soal No. {currentIndex + 1}
            </span>
            <span className="text-xs text-(--text-subtle)">
              dari {totalQuestions}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-(--card-bg) border border-(--card-border) text-(--accent)">
              {question.category}
            </span>
            {question.subCategory && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-(--card-bg) border border-(--card-border) text-(--text-muted)">
                {question.subCategory}
              </span>
            )}
          </div>
        </div>

        <div className="text-base sm:text-lg text-(--accent) leading-relaxed mb-6 font-normal">
          {question.question}
        </div>

        {imageUrl && (
          <div className="mb-6 p-3 rounded-2xl bg-(--card-bg) border border-(--card-border) flex flex-col items-center justify-center">
            <div className="relative w-full max-w-lg aspect-video sm:aspect-2/1 overflow-hidden rounded-xl bg-black/20 flex items-center justify-center">
              <Image
                src={imageUrl}
                alt={`Gambar Soal No. ${currentIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-[11px] text-(--text-subtle) mt-2">
              Perhatikan gambar pendukung di atas dengan seksama
            </span>
          </div>
        )}

        <div className="space-y-3 mb-8">
          {question.options.map((option) => {
            const isSelected = currentAnswer?.selectedLabel === option.label;

            return (
              <button
                key={option.label}
                type="button"
                onClick={() => onSelectOption(option.label)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 select-none ${
                  isSelected
                    ? "bg-(--accent)/15 border-(--accent) text-(--accent) shadow-md"
                    : "bg-(--card-bg) border-(--card-border) text-(--text-muted) hover:border-(--card-border-hover) hover:text-(--text-primary)"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg border font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? "bg-(--accent) text-[#024244] border-(--accent)"
                      : "bg-(--card-bg) border-(--card-border) text-(--text-subtle)"
                  }`}
                >
                  {option.label}
                </span>

                <div className="flex-1 text-sm sm:text-base leading-snug">
                  {option.text}
                </div>

                {isSelected && (
                  <CheckCircle2
                    size={18}
                    className="text-(--accent) shrink-0 mt-1"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-5 border-t border-(--card-border) flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-(--card-border) bg-(--card-bg) text-xs font-semibold uppercase tracking-wider text-(--accent) disabled:opacity-40 disabled:cursor-not-allowed hover:bg-(--card-bg-hover) transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Sebelumnya</span>
        </button>

        <button
          type="button"
          onClick={onToggleDoubtful}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
            currentAnswer?.isDoubtful
              ? "bg-amber-400 text-black border-amber-300 font-bold shadow-sm"
              : "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
          }`}
        >
          <Bookmark size={15} />
          <span>{currentAnswer?.isDoubtful ? "Batalkan Ragu" : "Tandai Ragu-ragu"}</span>
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={onFinish}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-(--btn-primary-bg) text-(--btn-primary-text) text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            <span>Selesai Ujian</span>
            <CheckSquare size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-(--btn-primary-bg) text-(--btn-primary-text) text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            <span>Selanjutnya</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </GlassCard>
  );
}
