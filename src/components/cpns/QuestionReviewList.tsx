"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Bookmark,
  Info,
  Filter,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { getCpnsImageUrl } from "@/lib/cpns";
import type { Question, QuestionAnswerState } from "@/types/cpns";

interface QuestionReviewListProps {
  questions: Question[];
  answers: Record<string, QuestionAnswerState>;
}

type ReviewFilter = "ALL" | "INCORRECT" | "DOUBTFUL" | "PERFECT";

export function QuestionReviewList({
  questions,
  answers,
}: QuestionReviewListProps) {
  const [filter, setFilter] = useState<ReviewFilter>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const questionEvaluations = useMemo(() => {
    return questions.map((q, index) => {
      const userAns = answers[q.id];
      const selectedOption = q.options.find(
        (opt) => opt.label === userAns?.selectedLabel
      );
      const points = selectedOption ? selectedOption.points : 0;
      const isDoubtful = Boolean(userAns?.isDoubtful);
      const isAnswered = Boolean(userAns?.selectedLabel);

      let isPerfect = false;
      let isIncorrect = false;

      if (q.category === "TKP") {
        isPerfect = points === 5;
        isIncorrect = points < 5 || !isAnswered;
      } else {
        isPerfect = points === 5;
        isIncorrect = points === 0 || !isAnswered;
      }

      return {
        q,
        index,
        userAns,
        points,
        isDoubtful,
        isPerfect,
        isIncorrect,
      };
    });
  }, [questions, answers]);

  const filteredList = useMemo(() => {
    return questionEvaluations.filter((item) => {
      if (selectedCategory !== "ALL" && item.q.category !== selectedCategory) {
        return false;
      }

      if (filter === "INCORRECT") return item.isIncorrect;
      if (filter === "DOUBTFUL") return item.isDoubtful;
      if (filter === "PERFECT") return item.isPerfect;
      return true;
    });
  }, [questionEvaluations, filter, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-(--card-bg) border border-(--card-border)">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs">
          <Filter size={14} className="text-(--text-subtle) shrink-0 hidden sm:block" />
          <div className="inline-flex rounded-xl p-1 bg-(--card-bg) border border-(--card-border)">
            {(
              [
                { id: "ALL", label: `Semua (${questions.length})` },
                {
                  id: "INCORRECT",
                  label: `Kurang / Salah (${questionEvaluations.filter((e) => e.isIncorrect).length})`,
                },
                {
                  id: "DOUBTFUL",
                  label: `Ragu (${questionEvaluations.filter((e) => e.isDoubtful).length})`,
                },
                {
                  id: "PERFECT",
                  label: `Maksimal (${questionEvaluations.filter((e) => e.isPerfect).length})`,
                },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap select-none ${
                  filter === tab.id
                    ? "bg-(--btn-primary-bg) text-(--btn-primary-text) font-semibold"
                    : "text-(--text-muted) hover:text-(--text-primary)"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="inline-flex rounded-xl p-1 bg-(--card-bg) border border-(--card-border) text-xs self-start sm:self-auto">
          {(["ALL", "TWK", "TIU", "TKP"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-(--accent) text-[#024244] font-bold"
                  : "text-(--text-muted) hover:text-(--text-primary)"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredList.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-(--card-border) bg-(--card-bg) text-sm text-(--text-muted)">
          Tidak ada soal pada kategori review ini.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredList.map(
            ({ q, index, userAns, points, isDoubtful }) => {
              const imageUrl = getCpnsImageUrl(q.image);

              return (
                <GlassCard key={q.id} className="p-6 md:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-(--card-border)">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold font-mono text-(--accent)">
                        Soal No. {index + 1}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-(--card-bg) border border-(--card-border) text-(--accent)">
                        {q.category}
                      </span>
                      {q.subCategory && (
                        <span className="text-xs text-(--text-muted) px-2 py-0.5 rounded-md bg-(--card-bg) border border-(--card-border)">
                          {q.subCategory}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      {isDoubtful && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300">
                          <Bookmark size={12} />
                          Ragu-ragu
                        </span>
                      )}

                      <span className="px-2.5 py-0.5 rounded-md bg-(--card-bg) border border-(--card-border) text-(--accent) font-bold">
                        Poin: {points}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm md:text-base text-(--accent) leading-relaxed mb-5">
                    {q.question}
                  </div>

                  {imageUrl && (
                    <div className="mb-5 p-3 rounded-2xl bg-(--card-bg) border border-(--card-border) flex flex-col items-center">
                      <div className="relative w-full max-w-md aspect-video overflow-hidden rounded-xl bg-black/20 flex items-center justify-center">
                        <Image
                          src={imageUrl}
                          alt={`Gambar Soal No. ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 mb-5">
                    {q.options.map((option) => {
                      const isUserChoice = userAns?.selectedLabel === option.label;
                      const isMaxPoint = option.points === 5;

                      let rowClass =
                        "border-(--card-border) bg-(--card-bg) text-(--text-muted)";

                      if (isUserChoice) {
                        if (isMaxPoint) {
                          rowClass =
                            "border-emerald-500/50 bg-emerald-500/10 text-emerald-200";
                        } else {
                          rowClass =
                            "border-rose-500/50 bg-rose-500/10 text-rose-200";
                        }
                      } else if (isMaxPoint && q.category !== "TKP") {
                        rowClass =
                          "border-emerald-500/40 bg-(--card-bg) text-(--accent)";
                      }

                      return (
                        <div
                          key={option.label}
                          className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs md:text-sm ${rowClass}`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-md font-mono font-bold flex items-center justify-center shrink-0 border border-current text-xs">
                              {option.label}
                            </span>
                            <span className="leading-snug">{option.text}</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                            {isUserChoice && (
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-black/30 border border-current">
                                Pilihan Anda
                              </span>
                            )}
                            {isMaxPoint && !isUserChoice && q.category !== "TKP" && (
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded text-emerald-300 border border-emerald-500/40">
                                Kunci Jawaban
                              </span>
                            )}
                            <span className="opacity-80">({option.points} Poin)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-xl border border-(--card-border) bg-(--card-bg) text-xs md:text-sm leading-relaxed">
                    <div className="flex items-center gap-2 font-bold font-mono text-(--accent) mb-1.5 uppercase text-xs">
                      <Info size={14} className="text-(--accent) shrink-0" />
                      <span>Pembahasan Lengkap:</span>
                    </div>
                    <p className="text-(--text-muted) whitespace-pre-line pl-5">
                      {q.explanation}
                    </p>
                  </div>
                </GlassCard>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
