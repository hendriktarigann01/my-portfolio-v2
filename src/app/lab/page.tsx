"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FlaskConical,
  ArrowUpRight,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GlassCard } from "@/components/ui/GlassCard";
import { useLanguage } from "@/lib/language-context";

interface LabProject {
  id: string;
  title: Record<"id" | "en", string>;
  description: Record<"id" | "en", string>;
  status: "live";
  statusLabel: Record<"id" | "en", string>;
  tags: string[];
  href: string;
  icon: typeof FlaskConical;
}

const LAB_PROJECTS: LabProject[] = [
  {
    id: "git-trends",
    title: {
      id: "Top Trend Repository GitHub",
      en: "GitHub Trending Repositories",
    },
    description: {
      id: "Kurasi repositori open-source GitHub yang sedang naik daun hari ini, dirangkum secara cerdas oleh AI setiap pagi jam 06:00 WIB.",
      en: "Daily curation of trending GitHub open-source repositories, summarized concisely by AI every morning.",
    },
    status: "live",
    statusLabel: {
      id: "Aktif",
      en: "Live",
    },
    tags: ["Next.js", "Gemini AI", "GitHub API"],
    href: "/git-trends",
    icon: TrendingUp,
  },
  {
    id: "cat-simulator",
    title: {
      id: "CAT Simulator (SKD BKN)",
      en: "CAT Simulator (SKD BKN)",
    },
    description: {
      id: "Simulasi ujian SKD CPNS standar resmi CAT BKN: 20 paket tryout (2.200 soal), scoring presisi TWK, TIU, TKP, timer 100 menit, dan pembahasan interaktif.",
      en: "Official CAT BKN standard civil service exam simulation: 20 packages (2,200 questions), precise scoring for TWK, TIU, TKP, 100-min timer, and full review.",
    },
    status: "live",
    statusLabel: {
      id: "Aktif",
      en: "Live",
    },
    tags: ["CAT BKN Engine", "Local State", "100 Min Timer"],
    href: "/lab/cat-simulator",
    icon: GraduationCap,
  },
];

export default function LabPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen text-(--text-primary) py-12 md:py-20 relative overflow-hidden">
      <div className="container-main relative z-10">
        <Breadcrumb
          items={[
            { label: lang === "id" ? "Beranda" : "Home", href: "/" },
            { label: "Lab" },
          ]}
        />

        <header className="mb-14 mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--card-border) bg-(--card-bg) text-xs font-semibold tracking-wider uppercase mb-5 text-(--text-primary)">
            <FlaskConical size={14} />
            <span>{lang === "id" ? "Eksperimen & Tools" : "Experiments & Tools"}</span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-(--accent)"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {lang === "id" ? "Laboratorium Digital" : "Digital Laboratory"}
          </h1>
          <p
            className="text-sm md:text-base max-w-2xl text-(--text-muted) leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {lang === "id"
              ? "Kumpulan aplikasi mandiri, eksplorasi kecerdasan buatan, dan tools digital yang aktif dan siap dicoba."
              : "A curated collection of standalone tools, AI experiments, and active digital utilities."}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LAB_PROJECTS.map((project, idx) => {
            const Icon = project.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={project.href} className="block group h-full">
                  <GlassCard
                    interactive
                    className="p-6 md:p-8 h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-(--card-bg) border border-(--card-border) flex items-center justify-center text-(--accent) group-hover:scale-110 transition-transform">
                          <Icon size={24} />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-(--card-border) bg-(--card-bg) text-(--accent)">
                            {project.statusLabel[lang]}
                          </span>
                          <span className="p-2 rounded-lg text-(--text-subtle) group-hover:text-(--text-primary) transition-colors">
                            <ArrowUpRight size={18} />
                          </span>
                        </div>
                      </div>

                      <h2
                        className="text-xl font-bold text-(--accent) mb-3 group-hover:opacity-90 transition-opacity"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {project.title[lang]}
                      </h2>

                      <p
                        className="text-xs md:text-sm text-(--text-muted) leading-relaxed mb-6"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {project.description[lang]}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-(--card-border)">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-(--card-bg) border border-(--card-border) text-(--text-subtle)"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
