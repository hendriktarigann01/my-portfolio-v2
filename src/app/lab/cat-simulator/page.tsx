"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Clock,
  HelpCircle,
  Award,
  RotateCcw,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GlassCard } from "@/components/ui/GlassCard";
import { PackageCard } from "@/components/cpns/PackageCard";
import {
  CPNS_PACKAGES,
  loadStoredHistory,
  loadStoredSession,
  STORAGE_KEYS,
} from "@/lib/cpns";
import type { ExamHistoryRecord } from "@/types/cpns";

type FilterStatus = "all" | "completed" | "unattempted" | "passed";
const ITEMS_PER_PAGE = 10;

export default function CatSimulatorCatalogPage() {
  const [history, setHistory] = useState<Record<string, ExamHistoryRecord>>(() =>
    loadStoredHistory()
  );
  const [activeSessions, setActiveSessions] = useState<Record<string, boolean>>(() => {
    const activeMap: Record<string, boolean> = {};
    for (const pkg of CPNS_PACKAGES) {
      const sess = loadStoredSession(pkg.id);
      if (sess && !sess.isFinished) {
        activeMap[pkg.id] = true;
      }
    }
    return activeMap;
  });
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const stats = useMemo(() => {
    const historyList = Object.values(history);
    const completedCount = historyList.length;
    const passedCount = historyList.filter((h) => h.isPassed).length;
    const highestScore = historyList.length
      ? Math.max(...historyList.map((h) => h.totalScore))
      : 0;

    return { completedCount, passedCount, highestScore };
  }, [history]);

  const filteredPackages = useMemo(() => {
    return CPNS_PACKAGES.filter((pkg) => {
      const record = history[pkg.id];
      if (filter === "completed") return Boolean(record);
      if (filter === "unattempted") return !record && !activeSessions[pkg.id];
      if (filter === "passed") return Boolean(record?.isPassed);
      return true;
    });
  }, [history, activeSessions, filter]);

  const totalPages = Math.max(1, Math.ceil(filteredPackages.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedPackages = useMemo(() => {
    const startIdx = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredPackages.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredPackages, safeCurrentPage]);

  const handleFilterChange = (nextFilter: FilterStatus) => {
    setFilter(nextFilter);
    setCurrentPage(1);
  };

  const handleClearHistory = () => {
    if (typeof window === "undefined") return;
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus seluruh riwayat pengerjaan dan skor simulasi?"
    );
    if (!confirmed) return;

    localStorage.removeItem(STORAGE_KEYS.history);
    for (const pkg of CPNS_PACKAGES) {
      localStorage.removeItem(STORAGE_KEYS.result(pkg.id));
      localStorage.removeItem(STORAGE_KEYS.session(pkg.id));
    }
    setHistory({});
    setActiveSessions({});
    setCurrentPage(1);
  };

  const startItemNumber = filteredPackages.length === 0 ? 0 : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItemNumber = Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredPackages.length);

  return (
    <div className="min-h-screen text-(--text-primary) py-12 md:py-20 relative overflow-hidden">
      <div className="container-main relative z-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Lab", href: "/lab" },
            { label: "CAT Simulator" },
          ]}
        />

        <header className="mb-10 mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--card-border) bg-(--card-bg) text-xs font-semibold tracking-wider uppercase mb-5 text-(--accent)">
            <GraduationCap size={14} />
            <span>Simulasi Ujian SKD CAT BKN</span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-(--accent)"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CAT SIMULATOR
          </h1>
          <p
            className="text-sm md:text-base max-w-3xl text-(--text-muted) leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Aplikasi simulasi tes Seleksi Kompetensi Dasar (SKD) berbasis Computer Assisted Test (CAT) standar BKN.
            Dilengkapi 20 paket latihan (2.200 butir soal), pembagian kategori TWK, TIU, TKP, timer otomatis 100 menit,
            dan rekapitulasi skor passing grade yang akurat.
          </p>
        </header>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <GlassCard className="p-4 md:p-5">
            <div className="flex items-center gap-3 text-xs text-(--text-subtle) mb-2">
              <HelpCircle size={16} className="text-(--accent)" />
              <span>Total Paket & Soal</span>
            </div>
            <div className="text-xl md:text-2xl font-bold font-mono text-(--accent)">
              20 <span className="text-xs font-sans text-(--text-muted) font-normal">/ 2.200 Soal</span>
            </div>
          </GlassCard>

          <GlassCard className="p-4 md:p-5">
            <div className="flex items-center gap-3 text-xs text-(--text-subtle) mb-2">
              <Clock size={16} className="text-(--accent)" />
              <span>Durasi & Ketentuan</span>
            </div>
            <div className="text-xl md:text-2xl font-bold font-mono text-(--accent)">
              100 <span className="text-xs font-sans text-(--text-muted) font-normal">Menit / 110 Soal</span>
            </div>
          </GlassCard>

          <GlassCard className="p-4 md:p-5">
            <div className="flex items-center gap-3 text-xs text-(--text-subtle) mb-2">
              <Award size={16} className="text-(--accent)" />
              <span>Passing Grade Resmi</span>
            </div>
            <div className="text-xs font-mono text-(--text-muted) space-y-0.5">
              <div>TWK: <span className="text-(--accent) font-bold">65</span> | TIU: <span className="text-(--accent) font-bold">80</span></div>
              <div>TKP: <span className="text-(--accent) font-bold">166</span> (Maks: 550)</div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 md:p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-(--text-subtle) mb-2">
              <span>Progres Latihan</span>
              {stats.completedCount > 0 && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  title="Hapus riwayat simulasi"
                  className="hover:text-(--text-primary) transition-colors p-1"
                >
                  <RotateCcw size={12} />
                </button>
              )}
            </div>
            <div className="text-xl md:text-2xl font-bold font-mono text-(--accent)">
              {stats.completedCount}{" "}
              <span className="text-xs font-sans text-(--text-muted) font-normal">
                Selesai ({stats.passedCount} Lolos PG)
              </span>
            </div>
          </GlassCard>
        </section>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter size={14} className="text-(--text-subtle) shrink-0 hidden sm:block" />
            <div className="inline-flex rounded-xl p-1 bg-(--card-bg) border border-(--card-border) text-xs">
              {(
                [
                  { id: "all", label: "Semua (20)" },
                  { id: "unattempted", label: "Belum Dikerjakan" },
                  { id: "completed", label: "Selesai" },
                  { id: "passed", label: "Lolos PG" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleFilterChange(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all select-none ${
                    filter === tab.id
                      ? "bg-(--btn-primary-bg) text-(--btn-primary-text) font-semibold shadow-sm"
                      : "text-(--text-muted) hover:text-(--text-primary)"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs font-mono text-(--text-subtle)">
            Menampilkan {startItemNumber}-{endItemNumber} dari {filteredPackages.length} paket
          </div>
        </div>

        {paginatedPackages.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-(--card-border) bg-(--card-bg) p-8">
            <p className="text-sm text-(--text-muted)">
              Tidak ada paket simulasi yang sesuai dengan filter pilihan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedPackages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
              >
                <PackageCard
                  meta={pkg}
                  history={history[pkg.id]}
                  hasActiveSession={activeSessions[pkg.id]}
                />
              </motion.div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-(--card-border) bg-(--card-bg) text-xs font-medium text-(--text-muted) hover:text-(--text-primary) hover:bg-(--card-bg-hover) disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
              <span>Sebelumnya</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-mono font-semibold transition-all ${
                    safeCurrentPage === pageNum
                      ? "bg-(--btn-primary-bg) text-(--btn-primary-text) shadow-sm"
                      : "border border-(--card-border) bg-(--card-bg) text-(--text-muted) hover:text-(--text-primary)"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-(--card-border) bg-(--card-bg) text-xs font-medium text-(--text-muted) hover:text-(--text-primary) hover:bg-(--card-bg-hover) disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Selanjutnya</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
