"use client";

import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Layers,
  Wrench,
  Rocket,
  Code2,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GlassCard } from "@/components/ui/GlassCard";
import { SERVICE_PLANS_BY_LANG } from "@/constants/pricing";
import { PROCESS_STEPS_BY_LANG, OPERATIONAL_HOURS } from "@/constants/process";
import { useLanguage } from "@/lib/language-context";
import { getWhatsAppUrl } from "@/helpers/text";

const STEP_ICONS = [Layers, Code2, Rocket, ShieldCheck];

export default function ServicesPage() {
  const { lang } = useLanguage();
  const plans = SERVICE_PLANS_BY_LANG[lang] || SERVICE_PLANS_BY_LANG.id;
  const steps = PROCESS_STEPS_BY_LANG[lang] || PROCESS_STEPS_BY_LANG.id;
  const hours = OPERATIONAL_HOURS[lang] || OPERATIONAL_HOURS.id;

  const handleContactPlan = (plan: (typeof plans)[number]) => {
    const message =
      plan.waText ||
      (lang === "id"
        ? `Halo HT Solution, saya tertarik konsultasi paket "${plan.name}". Boleh info lebih lanjut?`
        : `Hi HT Solution, I am interested in consulting about the "${plan.name}" package. Could you share more details?`);
    window.open(getWhatsAppUrl(message), "_blank");
  };

  return (
    <div className="min-h-screen text-[var(--text-primary)] py-12 md:py-20 relative overflow-hidden">
      <div className="container-main relative z-10">
        <Breadcrumb
          items={[
            { label: lang === "id" ? "Beranda" : "Home", href: "/" },
            { label: lang === "id" ? "Layanan & Alur Kerja" : "Services & Workflow" },
          ]}
        />

        {/* Page Header */}
        <header className="mb-14 mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-xs font-semibold tracking-wider uppercase mb-5 text-[var(--text-primary)]">
            <Sparkles size={14} />
            <span>{lang === "id" ? "Layanan & Alur Kerja" : "Services & Workflow"}</span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[var(--accent)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {lang === "id" ? "Paket Layanan & Alur Kerja" : "Services & Delivery Workflow"}
          </h1>
          <p
            className="text-sm md:text-base max-w-2xl text-[var(--text-muted)] leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {lang === "id"
              ? "Rincian paket pengembangan, estimasi waktu pengerjaan, alur kerja bertahap, dan garansi purna jual."
              : "Comprehensive breakdown of development packages, timelines, phased workflows, and warranties."}
          </p>
        </header>

        {/* Section 1: Detailed Service Packages */}
        <section className="mb-20">
          <div className="mb-8">
            <h2
              className="text-2xl font-bold text-[var(--accent)] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lang === "id" ? "Pilihan Paket Layanan" : "Service Packages"}
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-muted)]">
              {lang === "id"
                ? "Pilih paket yang sesuai dengan skala dan kebutuhan operasional Anda."
                : "Select the package that fits your current operational needs."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard
                  interactive
                  className={`p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden ${
                    plan.isPopular ? "border-[var(--accent)]" : ""
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[0.65rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]">
                        {lang === "id" ? "Terpopuler" : "Popular"}
                      </span>
                    </div>
                  )}

                  <div>
                    <h3
                      className="text-xl font-bold text-[var(--accent)] mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6 min-h-[36px]">
                      {plan.description}
                    </p>

                    <div className="mb-6 pb-6 border-b border-[var(--card-border)]">
                      <span className="text-2xl md:text-3xl font-extrabold text-[var(--accent)]">
                        {plan.price}
                      </span>
                      {plan.priceSub && (
                        <span className="text-xs text-[var(--text-subtle)] block mt-1">
                          {plan.priceSub}
                        </span>
                      )}
                    </div>

                    <div className="mb-6">
                      <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[var(--text-subtle)] block mb-3">
                        {lang === "id" ? "Yang Anda Dapatkan:" : "Included Deliverables:"}
                      </span>
                      <ul className="flex flex-col gap-3">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs">
                            <Check size={14} className="text-[var(--accent)] shrink-0 mt-0.5" />
                            <span className="text-[var(--text-muted)] leading-tight">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => handleContactPlan(plan)}
                    className="w-full mt-6 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90"
                  >
                    <span>{lang === "id" ? "Konsultasi Paket Ini" : "Select Package"}</span>
                    <ArrowRight size={14} />
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 2: Step-by-Step Delivery Process */}
        <section className="mb-20">
          <div className="mb-8">
            <h2
              className="text-2xl font-bold text-[var(--accent)] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lang === "id" ? "Alur Pengerjaan (4 Langkah)" : "Phased Workflow (4 Steps)"}
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-muted)]">
              {lang === "id"
                ? "Setiap tahapan memiliki output terukur agar proyek selesai tepat waktu."
                : "Each phase features concrete milestones to ensure on-time delivery."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, idx) => {
              const Icon = STEP_ICONS[idx] || Wrench;

              return (
                <motion.div
                  key={step.index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <GlassCard interactive className="p-6 md:p-8 flex gap-5 h-full">
                    <div className="w-12 h-12 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--accent)] shrink-0">
                      <Icon size={22} />
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono font-bold text-[var(--text-subtle)]">
                          FASE {step.index}
                        </span>
                        <h3
                          className="text-lg font-bold text-[var(--accent)]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p
                        className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Guarantee & Operational Policy */}
        <GlassCard className="p-8 md:p-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--accent)] text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck size={14} />
                <span>{lang === "id" ? "Garansi" : "Warranty"}</span>
              </div>
              <h3
                className="text-xl md:text-2xl font-bold text-[var(--accent)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {lang === "id" ? "Garansi Bebas Bug 30 Hari" : "30-Day Zero Bug Guarantee"}
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                {lang === "id"
                  ? "Setelah proyek online, Anda mendapatkan pendampingan perbaikan bug selama 30 hari tanpa biaya tambahan."
                  : "Every deployed project includes 30 days of complimentary technical support and bug fixes."}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2">
                <Clock size={14} />
                <span>{hours.title}</span>
              </div>
              <p className="text-xs text-[var(--text-primary)] font-medium mb-1">
                {hours.weekdays} • {hours.weekends}
              </p>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                {hours.note}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
