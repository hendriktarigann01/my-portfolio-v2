"use client";

import { useState } from "react";
import type { Question, QuestionAnswerState } from "@/types/cpns";

interface QuestionNavigationGridProps {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, QuestionAnswerState>;
  onSelectIndex: (index: number) => void;
}

type CategoryTab = "ALL" | "TWK" | "TIU" | "TKP";

export function QuestionNavigationGrid({
  questions,
  currentIndex,
  answers,
  onSelectIndex,
}: QuestionNavigationGridProps) {
  const [activeTab, setActiveTab] = useState<CategoryTab>("ALL");

  const filteredIndices = questions
    .map((q, idx) => ({ q, idx }))
    .filter(({ q }) => {
      if (activeTab === "ALL") return true;
      return q.category === activeTab;
    });

  const summary = {
    answered: 0,
    doubtful: 0,
    unanswered: 0,
  };

  for (const q of questions) {
    const ans = answers[q.id];
    if (ans?.isDoubtful) {
      summary.doubtful++;
    } else if (ans?.selectedLabel) {
      summary.answered++;
    } else {
      summary.unanswered++;
    }
  }

  return (
    <div className="glass backdrop-blur-2xl p-4 rounded-2xl flex flex-col h-full">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h4
          className="text-xs font-bold uppercase tracking-wider text-(--accent)"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Nomor Soal
        </h4>
        <span className="text-[11px] font-mono text-(--text-subtle)">
          {summary.answered}/{questions.length} Selesai
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-(--card-bg) border border-(--card-border) mb-3 text-[11px]">
        {(
          [
            { id: "ALL", label: "Semua" },
            { id: "TWK", label: "TWK" },
            { id: "TIU", label: "TIU" },
            { id: "TKP", label: "TKP" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`py-1 rounded-lg font-medium transition-colors text-center ${
              activeTab === tab.id
                ? "bg-(--btn-primary-bg) text-(--btn-primary-text) font-semibold"
                : "text-(--text-muted) hover:text-(--text-primary)"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1.5 text-[10px] font-medium p-2 rounded-xl bg-(--card-bg) border border-(--card-border) mb-3 text-center">
        <div className="flex items-center justify-center gap-1 text-(--accent)">
          <span className="w-2.5 h-2.5 rounded-full bg-(--accent) shrink-0" />
          <span>{summary.answered} Dijawab</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-amber-300">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
          <span>{summary.doubtful} Ragu</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-(--text-subtle)">
          <span className="w-2.5 h-2.5 rounded-full border border-(--card-border) bg-transparent shrink-0" />
          <span>{summary.unanswered} Kosong</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-128 p-2.5 rounded-xl bg-black/15 border border-(--card-border)">
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 gap-2">
          {filteredIndices.map(({ q, idx }) => {
            const ans = answers[q.id];
            const isSelected = idx === currentIndex;
            const isDoubtful = Boolean(ans?.isDoubtful);
            const isAnswered = Boolean(ans?.selectedLabel);

            let styleClass =
              "bg-(--card-bg) text-(--text-muted) border-(--card-border) hover:border-(--card-border-hover)";

            if (isDoubtful) {
              styleClass =
                "bg-amber-400 text-black border-amber-300 font-bold shadow-sm shadow-amber-500/20";
            } else if (isAnswered) {
              styleClass =
                "bg-(--accent) text-[#024244] border-(--accent) font-bold shadow-sm";
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                className={`relative h-9 rounded-lg border text-xs font-mono transition-all flex items-center justify-center select-none ${styleClass} ${
                  isSelected
                    ? "outline-2 outline-offset-2 outline-(--accent) scale-105 z-10"
                    : ""
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
