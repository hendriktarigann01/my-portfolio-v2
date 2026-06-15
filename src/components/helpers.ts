import { TOPIC_KEYWORDS, LS_KEY } from "./constants";

export function isOnTopic(text: string): boolean {
  const lower = text.toLowerCase();
  return TOPIC_KEYWORDS.some((kw) => lower.includes(kw));
}

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

export function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = degToRad(lat2 - lat1);
  const dLng = degToRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
