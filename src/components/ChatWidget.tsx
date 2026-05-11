"use client";

import { useState, useRef, useEffect, useCallback, FormEvent } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { MessageSquare, Send, X, Loader2 } from "lucide-react";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
    id: string;
    role: "user" | "model";
    content: string;
    timestamp: Date;
}

// ─── Animation Variants ─────────────────────────────────────────────────────

const panelVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.92, transformOrigin: "bottom right" },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", damping: 26, stiffness: 320 },
    },
    exit: { opacity: 0, y: 16, scale: 0.95, transition: { duration: 0.18 } },
};

const msgVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 500, damping: 32 },
    },
};

const dotTransition = (delay: number) => ({
    y: { duration: 0.4, repeat: Infinity, repeatType: "reverse" as const, delay },
});

// ─── Constants ───────────────────────────────────────────────────────────────

const GREETING: Message = {
    id: "greeting",
    role: "model",
    content:
        "Hey! 👋 I'm Hendrik's AI assistant. Ask me anything about his work, skills, or how to collaborate!",
    timestamp: new Date(),
};

const QUICK_QUESTIONS = [
    "What does Hendrik do?",
    "What's his tech stack?",
    "Is he available for freelance?",
];

// ─── Component ───────────────────────────────────────────────────────────────

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([GREETING]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    // Focus input when panel opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = useCallback(
        async (text: string) => {
            if (!text.trim() || isLoading) return;

            setHasInteracted(true);
            const userMsg: Message = {
                id: `user-${Date.now()}`,
                role: "user",
                content: text.trim(),
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMsg]);
            setInput("");
            setIsLoading(true);

            try {
                // Build history excluding greeting
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
        [messages, isLoading]
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
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
            {/* ─── Chat Panel ─────────────────────────────────────────────────── */}
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

                            {/* Typing indicator */}
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

                            {/* Quick questions — show only before first interaction */}
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
                                alignItems: "center",
                                gap: 10,
                                background: "rgba(2, 66, 68, 0.6)",
                                flexShrink: 0,
                            }}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about Hendrik..."
                                disabled={isLoading}
                                style={{
                                    flex: 1,
                                    padding: "10px 16px",
                                    borderRadius: 14,
                                    border: "1px solid rgba(239, 209, 195, 0.1)",
                                    background: "rgba(239, 209, 195, 0.04)",
                                    color: "#efd1c3",
                                    fontFamily: "var(--font-body)",
                                    fontSize: "0.82rem",
                                    outline: "none",
                                    transition: "border-color 0.2s, background 0.2s",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(239,209,195,0.25)";
                                    e.currentTarget.style.background = "rgba(239,209,195,0.06)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(239,209,195,0.1)";
                                    e.currentTarget.style.background = "rgba(239,209,195,0.04)";
                                }}
                            />
                            <motion.button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.94 }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    border: "none",
                                    background:
                                        input.trim() && !isLoading
                                            ? "#efd1c3"
                                            : "rgba(239,209,195,0.1)",
                                    color:
                                        input.trim() && !isLoading
                                            ? "#024244"
                                            : "rgba(239,209,195,0.3)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: input.trim() && !isLoading ? "pointer" : "default",
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
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── FAB Button ─────────────────────────────────────────────────── */}
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
                {/* Glow ring */}
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
    );
}
