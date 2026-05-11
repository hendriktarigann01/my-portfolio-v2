"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Send } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

// SVG Social Icons (since lucide-react v1 dropped brand icons)
function IconGithub({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function IconLinkedin({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconX({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

const socials = [
  {
    Icon: IconGithub,
    label: "GitHub",
    href: "https://github.com/alexrivera",
    handle: "@alexrivera",
  },
  {
    Icon: IconLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/alexrivera",
    handle: "Alex Rivera",
  },
  {
    Icon: IconX,
    label: "Twitter / X",
    href: "https://twitter.com/alexrivera",
    handle: "@alexrivera",
  },
];

export function ContactView() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("hello@alexrivera.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="now" style={{ padding: "8rem 0" }}>
      <div className="container-main">
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-medium tracking-[0.25em] uppercase"
              style={{
                color: "rgba(239,209,195,0.4)",
                fontFamily: "var(--font-body)",
              }}
            >
              Get in Touch
            </span>
            <span
              className="h-px"
              style={{ background: "rgba(239,209,195,0.15)", width: "60px" }}
            />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Big CTA */}
          <ScrollReveal>
            <motion.div
              className="rounded-3xl p-10 h-full flex flex-col justify-between"
              style={{
                background: "rgba(239,209,195,0.04)",
                border: "1px solid rgba(239,209,195,0.09)",
                minHeight: "420px",
              }}
              whileHover={{
                background: "rgba(239,209,195,0.06)",
                borderColor: "rgba(239,209,195,0.14)",
              }}
              transition={{ duration: 0.4 }}
            >
              <div>
                <h2
                  className="leading-none mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    color: "#efd1c3",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Let&apos;s build
                  <br />
                  <span
                    style={{
                      WebkitTextStroke: "1.5px rgba(239,209,195,0.4)",
                      color: "transparent",
                    }}
                  >
                    something
                  </span>
                  <br />
                  together.
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(239,209,195,0.55)",
                    fontSize: "0.95rem",
                    fontWeight: 300,
                    maxWidth: "380px",
                    lineHeight: 1.7,
                  }}
                >
                  Open for freelance, collaborations, and full-time roles. I
                  respond within 24 hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-10">
                <motion.button
                  onClick={handleCopy}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl flex-1 text-left"
                  style={{
                    background: "#efd1c3",
                    color: "#024244",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 60px rgba(239,209,195,0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Mail size={16} />
                  <span className="flex-1">hello@alexrivera.dev</span>
                  <motion.span
                    key={copied ? "copied" : "copy"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs opacity-60"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </motion.span>
                </motion.button>

                <motion.a
                  href="mailto:hello@alexrivera.dev"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl"
                  style={{
                    background: "rgba(239,209,195,0.08)",
                    color: "#efd1c3",
                    border: "1px solid rgba(239,209,195,0.15)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                  whileHover={{
                    background: "rgba(239,209,195,0.15)",
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Send size={15} />
                  Send
                </motion.a>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Right: Socials + availability */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col gap-4 h-full">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl px-7 py-5"
                  style={{
                    background: "rgba(239,209,195,0.03)",
                    border: "1px solid rgba(239,209,195,0.08)",
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.1 + i * 0.1,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    background: "rgba(239,209,195,0.07)",
                    borderColor: "rgba(239,209,195,0.15)",
                    x: 4,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(239,209,195,0.07)",
                        color: "rgba(239,209,195,0.7)",
                      }}
                    >
                      <social.Icon size={18} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          color: "#efd1c3",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {social.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.78rem",
                          color: "rgba(239,209,195,0.4)",
                          fontWeight: 300,
                        }}
                      >
                        {social.handle}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg"
                    style={{
                      background: "rgba(239,209,195,0.06)",
                      color: "rgba(239,209,195,0.4)",
                    }}
                  >
                    <ArrowUpRight size={14} />
                  </div>
                </motion.a>
              ))}

              {/* Availability pill */}
              <motion.div
                className="rounded-2xl px-7 py-5 flex items-center gap-4"
                style={{
                  background: "rgba(239,209,195,0.03)",
                  border: "1px solid rgba(239,209,195,0.08)",
                }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.45,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: "#4ade80" }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: "rgba(74, 222, 128, 0.4)" }}
                    animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: "#efd1c3",
                    }}
                  >
                    Available for work
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                      color: "rgba(239,209,195,0.4)",
                      fontWeight: 300,
                    }}
                  >
                    Freelance &amp; full-time · Remote friendly
                  </p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
