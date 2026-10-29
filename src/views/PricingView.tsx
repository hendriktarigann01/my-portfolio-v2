"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  PricingHeader,
  BackgroundEffects,
  PricingCard,
} from "@/components/PricingService";
import { GlassCard } from "@/components/ui/GlassCard";
import { SERVICE_PLANS_BY_LANG } from "@/constants/pricing";
import { useLanguage } from "@/lib/language-context";

export function PricingView() {
  const { lang } = useLanguage();
  const plans = SERVICE_PLANS_BY_LANG[lang] || SERVICE_PLANS_BY_LANG.id;

  return (
    <section
      id="services"
      className="relative py-16 md:py-24 overflow-visible scroll-mt-20 md:scroll-mt-0"
    >
      <BackgroundEffects />
      <div className="container-main relative z-10">
        <PricingHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {plans.map((plan) => (
            <div key={plan.id} className="h-full">
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>

        <GlassCard className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold text-[var(--text-subtle)] uppercase tracking-wider block mb-1">
              {lang === "id" ? "Transparansi & Garansi" : "Clarity & Warranty"}
            </span>
            <h3
              className="text-lg md:text-xl font-bold text-[var(--accent)] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lang === "id"
                ? "Rincian Paket, Alur Kerja & Garansi 30 Hari"
                : "Full Deliverables, Phased Workflow & 30-Day Warranty"}
            </h3>
            <p
              className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {lang === "id"
                ? "Lihat checklist fitur lengkap setiap paket, tahapan pengerjaan dari konsultasi hingga online, dan komitmen jam kerja."
                : "Review detailed deliverable checklists, phased delivery milestones, and operational working hours."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/services"
              className="px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span>{lang === "id" ? "Lihat Halaman Layanan Lengkap" : "View Full Services Page"}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

export default PricingView;
