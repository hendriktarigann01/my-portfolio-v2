import { TOPIC_KEYWORDS } from "@/constants";

export function isOnTopic(text: string): boolean {
  const lower = text.toLowerCase();
  return TOPIC_KEYWORDS.some((kw) => lower.includes(kw));
}

export function openAiChat(prompt?: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("open-ai-chat", {
      detail: { prompt },
    })
  );
}
