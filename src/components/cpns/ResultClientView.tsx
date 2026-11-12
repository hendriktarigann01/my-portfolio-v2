"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Award, ArrowLeft, ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ScoreSummaryCard } from "@/components/cpns/ScoreSummaryCard";
import { QuestionReviewList } from "@/components/cpns/QuestionReviewList";
import {
  loadStoredResult,
  clearStoredSession,
  STORAGE_KEYS,
} from "@/lib/cpns";
import type { PackageMeta, Question, ExamResult } from "@/types/cpns";

interface ResultClientViewProps {
  packageMeta: PackageMeta;
  questions: Question[];
}

export function ResultClientView({
  packageMeta,
  questions,
}: ResultClientViewProps) {
  const router = useRouter();
  const [result, setResult] = useState<ExamResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = loadStoredResult(packageMeta.id);
    setResult(saved);
    setIsLoaded(true);
  }, [packageMeta.id]);

  const handleRetake = () => {
    if (typeof window === "undefined") return;
    const confirmed = window.confirm(
      "Mulai ulang simulasi paket ini? Data sesi sebelumnya akan direset."
    );
    if (!confirmed) return;

    clearStoredSession(packageMeta.id);
    localStorage.removeItem(STORAGE_KEYS.result(packageMeta.id));
    router.push(`/lab/cat-simulator/${packageMeta.id}`);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen text-(--text-primary) py-20 flex items-center justify-center">
        <div className="text-sm font-mono text-(--text-muted) animate-pulse">
          Memuat ringkasan hasil ujian...
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen text-(--text-primary) py-16 md:py-24">
        <div className="container-main mx-auto max-w-xl text-center">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Lab", href: "/lab" },
              { label: "CAT Simulator", href: "/lab/cat-simulator" },
              { label: packageMeta.title },
            ]}
          />

          <div className="mt-12 p-8 rounded-2xl border border-(--card-border) bg-(--card-bg) text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-(--accent)/10 border border-(--card-border) flex items-center justify-center text-(--accent) mb-4">
              <Award size={28} />
            </div>

            <h2
              className="text-xl font-bold text-(--accent) mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Belum Ada Rekaman Hasil Ujian
            </h2>
            <p className="text-xs md:text-sm text-(--text-muted) leading-relaxed mb-6">
              Anda belum menyelesaikan simulasi ujian untuk <strong>{packageMeta.title}</strong>. Mulai sesi ujian baru untuk menguji kemampuan Anda.
            </p>

            <div className="flex items-center justify-center gap-3">
              <Link
                href="/lab/cat-simulator"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-(--card-border) bg-(--card-bg) text-xs font-semibold uppercase tracking-wider text-(--accent) hover:bg-(--card-bg-hover) transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Katalog Paket</span>
              </Link>

              <Link
                href={`/lab/cat-simulator/${packageMeta.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-(--btn-primary-bg) text-(--btn-primary-text) text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                <span>Mulai Ujian</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-(--text-primary) py-12 md:py-20 relative overflow-hidden">
      <div className="container-main relative z-10 space-y-10">
        <div>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Lab", href: "/lab" },
              { label: "CAT Simulator", href: "/lab/cat-simulator" },
              { label: packageMeta.title, href: `/lab/cat-simulator/${packageMeta.id}` },
              { label: "Hasil & Pembahasan" },
            ]}
          />

          <header className="mt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--card-border) bg-(--card-bg) text-xs font-semibold tracking-wider uppercase mb-3 text-(--accent)">
              <Award size={14} />
              <span>Rekapitulasi Skor & Pembahasan</span>
            </div>

            <h1
              className="text-2xl md:text-4xl font-extrabold tracking-tight text-(--accent)"
              style={{ fontFamily: "var(--font-display)" }}
            >
              HASIL SIMULASI: {packageMeta.title.toUpperCase()}
            </h1>
          </header>
        </div>

        <section>
          <ScoreSummaryCard
            packageMeta={packageMeta}
            result={result}
            onRetake={handleRetake}
          />
        </section>

        <section className="pt-6 border-t border-(--card-border)">
          <div className="mb-6">
            <h3
              className="text-lg md:text-xl font-bold text-(--accent) mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              TINJAUAN & PEMBAHASAN SOAL
            </h3>
            <p className="text-xs md:text-sm text-(--text-muted)">
              Pelajari kunci jawaban dan penjelasan mendalam untuk setiap butir soal SKD.
            </p>
          </div>

          <QuestionReviewList questions={questions} answers={result.answers} />
        </section>
      </div>
    </div>
  );
}
