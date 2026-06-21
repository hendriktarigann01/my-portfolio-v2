import { LS_KEY } from "@/constants";

export function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function loadCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return 0;
    const { count, date } = JSON.parse(raw);
    return date === getTodayStr() ? (count ?? 0) : 0;
  } catch {
    return 0;
  }
}

export function saveCount(count: number): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ count, date: getTodayStr() }));
  } catch { /* ignore */ }
}
