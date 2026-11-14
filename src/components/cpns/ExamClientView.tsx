"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ExamHeader } from "@/components/cpns/ExamHeader";
import { QuestionNavigationGrid } from "@/components/cpns/QuestionNavigationGrid";
import { QuestionArea } from "@/components/cpns/QuestionArea";
import { ConfirmFinishModal } from "@/components/cpns/ConfirmFinishModal";
import {
  EXAM_DURATION_SECONDS,
  calculateExamResult,
  loadStoredSession,
  saveStoredSession,
  clearStoredSession,
  saveStoredResult,
} from "@/lib/cpns";
import type {
  PackageMeta,
  Question,
  QuestionAnswerState,
  ExamSession,
} from "@/types/cpns";

interface ExamClientViewProps {
  packageMeta: PackageMeta;
  questions: Question[];
}

export function ExamClientView({ packageMeta, questions }: ExamClientViewProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = loadStoredSession(packageMeta.id);
    if (
      saved &&
      !saved.isFinished &&
      typeof saved.lastActiveIndex === "number" &&
      saved.lastActiveIndex >= 0 &&
      saved.lastActiveIndex < questions.length
    ) {
      return saved.lastActiveIndex;
    }
    return 0;
  });
  const [answers, setAnswers] = useState<Record<string, QuestionAnswerState>>(() => {
    const saved = loadStoredSession(packageMeta.id);
    return saved && !saved.isFinished && saved.answers ? saved.answers : {};
  });
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const saved = loadStoredSession(packageMeta.id);
    if (saved && !saved.isFinished && typeof saved.timeRemainingSeconds === "number") {
      return saved.timeRemainingSeconds;
    }
    return EXAM_DURATION_SECONDS;
  });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialLoadedRef = useRef(false);
  const answersRef = useRef(answers);
  const timeRemainingRef = useRef(timeRemaining);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    timeRemainingRef.current = timeRemaining;
  }, [timeRemaining]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (initialLoadedRef.current) return;
    initialLoadedRef.current = true;

    const saved = loadStoredSession(packageMeta.id);
    if (!saved || saved.isFinished) {
      const newSession: ExamSession = {
        packageId: packageMeta.id,
        startedAt: Date.now(),
        timeRemainingSeconds: EXAM_DURATION_SECONDS,
        answers: {},
        isFinished: false,
        lastActiveIndex: 0,
      };
      saveStoredSession(newSession);
    }
  }, [packageMeta.id]);

  const persistCurrentState = useCallback(() => {
    const session: ExamSession = {
      packageId: packageMeta.id,
      startedAt: Date.now(),
      timeRemainingSeconds: timeRemainingRef.current,
      answers: answersRef.current,
      isFinished: false,
      lastActiveIndex: currentIndexRef.current,
    };
    saveStoredSession(session);
  }, [packageMeta.id]);

  const submitExam = useCallback(() => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const timeSpent = Math.max(0, EXAM_DURATION_SECONDS - timeRemainingRef.current);
    const result = calculateExamResult(
      packageMeta.id,
      questions,
      answersRef.current,
      timeSpent
    );

    saveStoredResult(result);
    clearStoredSession(packageMeta.id);
    router.replace(`/lab/cat-simulator/${packageMeta.id}/result`);
  }, [isSubmitting, packageMeta.id, questions, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitExam]);

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      persistCurrentState();
    }, 2000);

    return () => clearInterval(autoSaveInterval);
  }, [persistCurrentState]);

  const handleSelectOption = (label: "A" | "B" | "C" | "D" | "E") => {
    const activeQuestion = questions[currentIndex];
    if (!activeQuestion) return;

    setAnswers((prev) => {
      const existing = prev[activeQuestion.id];
      const nextState: QuestionAnswerState = {
        selectedLabel: label,
        isDoubtful: existing?.isDoubtful || false,
      };
      const updated = { ...prev, [activeQuestion.id]: nextState };
      answersRef.current = updated;
      persistCurrentState();
      return updated;
    });
  };

  const handleToggleDoubtful = () => {
    const activeQuestion = questions[currentIndex];
    if (!activeQuestion) return;

    setAnswers((prev) => {
      const existing = prev[activeQuestion.id];
      const nextState: QuestionAnswerState = {
        selectedLabel: existing?.selectedLabel ?? null,
        isDoubtful: !existing?.isDoubtful,
      };
      const updated = { ...prev, [activeQuestion.id]: nextState };
      answersRef.current = updated;
      persistCurrentState();
      return updated;
    });
  };

  const handleSelectIndex = (idx: number) => {
    if (idx >= 0 && idx < questions.length) {
      setCurrentIndex(idx);
      currentIndexRef.current = idx;
      persistCurrentState();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleSelectIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      handleSelectIndex(currentIndex + 1);
    }
  };

  const activeQuestion = questions[currentIndex] || questions[0];
  const activeAnswer = answers[activeQuestion.id];

  const answeredCount = questions.filter(
    (q) => Boolean(answers[q.id]?.selectedLabel)
  ).length;
  const doubtfulCount = questions.filter(
    (q) => Boolean(answers[q.id]?.isDoubtful)
  ).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen text-(--text-primary) flex flex-col">
      <ExamHeader
        packageTitle={packageMeta.title}
        currentCategory={activeQuestion.category}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        timeRemainingSeconds={timeRemaining}
        onFinishClick={() => setIsConfirmOpen(true)}
      />

      <main className="flex-1 container-main mx-auto py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 order-1">
            <QuestionArea
              question={activeQuestion}
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              currentAnswer={activeAnswer}
              onSelectOption={handleSelectOption}
              onToggleDoubtful={handleToggleDoubtful}
              onPrev={handlePrev}
              onNext={handleNext}
              onFinish={() => setIsConfirmOpen(true)}
            />
          </div>

          <aside className="lg:col-span-4 order-2 sticky top-20">
            <QuestionNavigationGrid
              questions={questions}
              currentIndex={currentIndex}
              answers={answers}
              onSelectIndex={handleSelectIndex}
            />
          </aside>
        </div>
      </main>

      <ConfirmFinishModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={submitExam}
        totalQuestions={questions.length}
        answeredCount={answeredCount}
        doubtfulCount={doubtfulCount}
        unansweredCount={unansweredCount}
      />
    </div>
  );
}
