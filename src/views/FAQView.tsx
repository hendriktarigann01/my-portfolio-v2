"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { FAQ_DATA_BY_LANG } from "@/constants/faq";
import { useLanguage } from "@/lib/language-context";
import { getWhatsAppUrl } from "@/helpers/text";

export function FAQView() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = FAQ_DATA_BY_LANG[lang] || FAQ_DATA_BY_LANG.id;

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const trustPillars =
    lang === "id"
      ? [
          {
            icon: ShieldCheck,
            title: "Garansi Bug 14-30 Hari",
            desc: "Gratis perbaikan bug setelah serah terima tanpa biaya tambahan.",
          },
          {
            icon: CheckCircle2,
            title: "Skema DP 50 / 50",
            desc: "Pelunasan 50% baru dibayar setelah sistem diuji bersama dan Anda puas.",
          },
          {
            icon: Lock,
            title: "100% Hak Milik Klien",
            desc: "Source code, akun hosting, dan database sepenuhnya milik Anda tanpa dikunci.",
          },
          {
            icon: Sparkles,
            title: "Tanpa Biaya Siluman",
            desc: "Biaya server/domain dibayar langsung ke penyedia resmi tanpa markup.",
          },
        ]
      : [
          {
            icon: ShieldCheck,
            title: "14-30 Day Bugfix Warranty",
            desc: "Complimentary bugfixes post-delivery for full peace of mind.",
          },
          {
            icon: CheckCircle2,
            title: "50 / 50 Milestone Payment",
            desc: "Final 50% is paid only after joint testing and your approval.",
          },
          {
            icon: Lock,
            title: "100% Asset Ownership",
            desc: "Credentials, source code, and databases are strictly yours with no vendor lock-in.",
          },
          {
            icon: Sparkles,
            title: "Zero Hidden Markups",
            desc: "Third-party cloud and domain fees are billed directly with zero markup.",
          },
        ];

  const handleWaAsk = () => {
    const text =
      lang === "id"
        ? "Halo Mas Hendrik, saya mau tanya-tanya dulu seputar layanan IT & estimasi kebutuhannya."
        : "Hi Hendrik, I have a few questions about your IT services and would like an estimate.";
    window.open(getWhatsAppUrl(text), "_blank");
  };

  return (
    <section
      id="faq"
      className="py-16 md:py-24 scroll-mt-20 md:scroll-mt-0 relative"
    >
      <div className="container-main max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-body)",
              color: "rgba(var(--accent-rgb),0.55)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            {lang === "id"
              ? "Kepercayaan & Transparansi"
              : "Trust & Transparency"}
          </span>
          <h2
            className="mt-3 mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--accent)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {lang === "id"
              ? "Pertanyaan Sering Masuk & Garansi"
              : "FAQ & Guarantees"}
          </h2>
          <p
            className="text-sm max-w-2xl mx-auto text-[rgba(var(--accent-rgb),0.65)] font-light leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {lang === "id"
              ? "Semua aturan main, pembayaran, dan garansi ditulis transparan agar Anda merasa aman sejak chat pertama tanpa ada kejutan di tengah jalan."
              : "Clear rules, milestone terms, and warranties so you feel completely secure from the first message with zero surprises."}
          </p>
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {trustPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-5 rounded-2xl border border-[rgba(var(--accent-rgb),0.15)] bg-[rgba(var(--accent-rgb),0.025)] backdrop-blur-md flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(var(--accent-rgb),0.08)] border border-[rgba(var(--accent-rgb),0.2)] flex items-center justify-center text-[var(--accent)] mb-3">
                  <Icon size={20} />
                </div>
                <h3
                  className="text-sm font-bold text-[var(--accent)] mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-xs text-[rgba(var(--accent-rgb),0.55)] leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Accordion FAQ */}
        <div className="flex flex-col gap-3 max-w-3xl mx-auto">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl border transition-colors duration-200 overflow-hidden"
                style={{
                  borderColor: isOpen
                    ? "rgba(var(--accent-rgb),0.35)"
                    : "rgba(var(--accent-rgb),0.12)",
                  background: isOpen
                    ? "rgba(var(--accent-rgb),0.04)"
                    : "rgba(var(--accent-rgb),0.015)",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer gap-4"
                >
                  <span
                    className="text-sm font-semibold text-[var(--accent)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[var(--accent)] flex-shrink-0"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-[rgba(var(--accent-rgb),0.08)]">
                        <p
                          className="text-xs text-[rgba(var(--accent-rgb),0.7)] leading-relaxed font-light"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Direct WhatsApp Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={handleWaAsk}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[var(--accent)] text-[#012a2c] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-[rgba(var(--accent-rgb),0.1)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <MessageCircle size={16} />
            <span>
              {lang === "id"
                ? "Punya Pertanyaan Lain? Tanya via WhatsApp"
                : "Have Another Question? Ask via WhatsApp"}
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQView;
