import { TOPIC_KEYWORDS } from "@/constants";

export function isOnTopic(text: string): boolean {
  const lower = text.toLowerCase();
  return TOPIC_KEYWORDS.some((kw) => lower.includes(kw));
}
