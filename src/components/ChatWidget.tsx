"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, MessageSquare } from "lucide-react";
import { globalLenis } from "@/components/SmoothScrollProvider";
import {
  MAX_QUESTIONS,
  GREETING,
  QUICK_QUESTIONS,
  panelVariants,
  msgVariants,
  dotTransition,
} from "./constants";
import { isOnTopic, loadCount, saveCount } from "./helpers";
import type { Message } from "./types";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const isLimitReached = questionCount >= MAX_QUESTIONS;

  useEffect(() => {
    setQuestionCount(loadCount());
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      if (questionCount >= MAX_QUESTIONS) return;

      setHasInteracted(true);
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");

      const nextCount = questionCount + 1;
      setQuestionCount(nextCount);
      saveCount(nextCount);

      if (!isOnTopic(text)) {
        const refuseMsg: Message = {
          id: `refuse-${Date.now()}`,
          role: "model",
          content: "I can only answer questions about Hendrik — his work, skills, stack, or how to collaborate. Try asking something related! 😊",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, refuseMsg]);

        if (nextCount >= MAX_QUESTIONS) {
          setTimeout(() => {
            setMessages((prev) => [...prev, {
              id: `limit-${Date.now()}`,
              role: "model",
              content: `We've reached the ${MAX_QUESTIONS}-question limit. Hope I was helpful! Reach out directly via the contact section. 🙌`,
              timestamp: new Date(),
            }]);
          }, 400);
        }
        return;
      }

      setIsLoading(true);

      try {
        const history = [...messages.filter((m) => m.id !== "greeting"), userMsg].map(
          (m) => ({ role: m.role, content: m.content })
        );

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Request failed");

        const aiMsg: Message = {
          id: `model-${Date.now()}`,
          role: "model",
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);

        if (nextCount >= MAX_QUESTIONS) {
          setTimeout(() => {
            setMessages((prev) => [...prev, {
              id: `limit-${Date.now()}`,
              role: "model",
              content: `We've reached the ${MAX_QUESTIONS}-question limit. Hope I was helpful! Reach out directly via the contact section. 🙌`,
              timestamp: new Date(),
            }]);
          }, 600);
        }
      } catch {
        const errMsg: Message = {
          id: `err-${Date.now()}`,
          role: "model",
          content: "Oops, something went wrong. Try again in a bit! 🙏",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, questionCount]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      globalLenis?.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      globalLenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      globalLenis?.start();
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9990,
              background: "rgba(1, 22, 23, 0.65)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />
        )}
      </AnimatePresence>
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9998,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 16,
        }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="chat-panel"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                width: 380,
                maxWidth: "calc(100vw - 48px)",
                borderRadius: 20,
                overflow: "hidden",
                background: "rgba(2, 66, 68, 0.92)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(239, 209, 195, 0.12)",
                display: "flex",
                flexDirection: "column",
                maxHeight: "min(520px, calc(100vh - 120px))",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(2, 66, 68, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--accent)",
                  flexShrink: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Image
                    src="/logo-dark-green.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: "var(--bg)",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      Hendrik&apos;s AI
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        color: "rgba(2,66,68,0.6)",
                      }}
                    >
                      Ask me anything
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, background: "rgba(2,66,68,0.08)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "none",
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={16} color="rgba(2,66,68,0.7)" />
                </motion.button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                data-lenis-prevent
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(239,209,195,0.15) transparent",
                }}
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    variants={msgVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "82%",
                        padding: "10px 14px",
                        borderRadius:
                          msg.role === "user"
                            ? "16px 16px 4px 16px"
                            : "16px 16px 16px 4px",
                        background:
                          msg.role === "user"
                            ? "#efd1c3"
                            : "rgba(239, 209, 195, 0.07)",
                        color: msg.role === "user" ? "#024244" : "#efd1c3",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.82rem",
                        lineHeight: 1.6,
                        fontWeight: msg.role === "user" ? 500 : 300,
                        border:
                          msg.role === "model"
                            ? "1px solid rgba(239,209,195,0.08)"
                            : "none",
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <div
                      style={{
                        padding: "12px 18px",
                        borderRadius: "16px 16px 16px 4px",
                        background: "rgba(239, 209, 195, 0.07)",
                        border: "1px solid rgba(239,209,195,0.08)",
                        display: "flex",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={dotTransition(i * 0.15)}
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "rgba(239,209,195,0.4)",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {!hasInteracted && messages.length <= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginTop: 4,
                    }}
                  >
                    {QUICK_QUESTIONS.map((q) => (
                      <motion.button
                        key={q}
                        whileHover={{
                          scale: 1.03,
                          background: "rgba(239,209,195,0.12)",
                          borderColor: "rgba(239,209,195,0.25)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => sendMessage(q)}
                        style={{
                          padding: "8px 14px",
                          borderRadius: 12,
                          border: "1px solid rgba(239,209,195,0.12)",
                          background: "rgba(239,209,195,0.05)",
                          color: "rgba(239,209,195,0.7)",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.75rem",
                          fontWeight: 400,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {q}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                style={{
                  padding: "12px 16px",
                  borderTop: "1px solid rgba(239, 209, 195, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  background: "rgba(2, 66, 68, 0.6)",
                  flexShrink: 0,
                }}
              >
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: isLimitReached ? "rgba(239,100,100,0.6)" : "rgba(239,209,195,0.25)",
                    letterSpacing: "0.05em",
                  }}>
                    {questionCount}/{MAX_QUESTIONS} questions
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isLimitReached ? "Question limit reached" : "Ask about Hendrik..."}
                    disabled={isLoading || isLimitReached}
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      borderRadius: 14,
                      border: "1px solid rgba(239, 209, 195, 0.1)",
                      background: isLimitReached ? "rgba(239,209,195,0.02)" : "rgba(239, 209, 195, 0.04)",
                      color: isLimitReached ? "rgba(239,209,195,0.3)" : "#efd1c3",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.82rem",
                      outline: "none",
                      transition: "border-color 0.2s, background 0.2s",
                      opacity: isLimitReached ? 0.5 : 1,
                    }}
                    onFocus={(e) => {
                      if (!isLimitReached) {
                        e.currentTarget.style.borderColor = "rgba(239,209,195,0.25)";
                        e.currentTarget.style.background = "rgba(239,209,195,0.06)";
                      }
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(239,209,195,0.1)";
                      e.currentTarget.style.background = isLimitReached ? "rgba(239,209,195,0.02)" : "rgba(239,209,195,0.04)";
                    }}
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isLoading || isLimitReached}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "none",
                      background:
                        input.trim() && !isLoading && !isLimitReached
                          ? "#efd1c3"
                          : "rgba(239,209,195,0.1)",
                      color:
                        input.trim() && !isLoading && !isLimitReached
                          ? "#024244"
                          : "rgba(239,209,195,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: input.trim() && !isLoading && !isLimitReached ? "pointer" : "default",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {isLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "none",
            background: isOpen ? "rgba(239,209,195,0.15)" : "#efd1c3",
            color: isOpen ? "#efd1c3" : "#024244",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            transition: "background 0.3s, color 0.3s",
          }}
        >
          {!isOpen && (
            <span
              style={{
                position: "absolute",
                inset: -3,
                borderRadius: "50%",
                background: "inherit",
                opacity: 0.15,
                filter: "blur(12px)",
                zIndex: -1,
              }}
            />
          )}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageSquare size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
