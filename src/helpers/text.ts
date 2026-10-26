import { CONTACT_INFO } from "@/constants/contact";

export function formatTitle(name: string): string {
  return name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getCategoryLabel(cat: string): string {
  const map: Record<string, string> = {
    system: "System",
    interactive: "Interactive",
    landing: "Landing Page",
    experiment: "Experiment",
  };
  return map[cat] || cat;
}

export function getWhatsAppUrl(customText?: string): string {
  const message = customText || CONTACT_INFO.whatsappText;
  return `https://api.whatsapp.com/send?phone=${CONTACT_INFO.phone}&text=${encodeURIComponent(message)}`;
}
