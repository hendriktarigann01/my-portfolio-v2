import type { PricingPlan } from "@/types";

export const SERVICE_PLANS: PricingPlan[] = [
  {
    id: "template",
    name: "Launch",
    price: "499k",
    description: "Ready-made design, launch in days, not weeks.",
    isPopular: true,
    features: [
      "Pre-built template, not from scratch",
      "Ready-to-use premium designs",
      "Free .my.id / .web.id domain",
      "Fast, reliable hosting included",
      "Direct WhatsApp order button",
      "Ready in just 1-2 days",
    ],
    waText:
      "Hi Hendrik, I am interested in the *Express Template (Rp499k)* package. I would like to consult about the best template option for my business.",
    videoSrc: "/assets/landing-pages/in-lite/example.webm",
  },
  {
    id: "custom-page",
    name: "Signature",
    price: "999k+",
    description: "Fully custom design, built around your brand.",
    features: [
      "Built from scratch, not a template",
      "100% custom design & layout",
      "Smooth, eye-catching animations",
      "Free .com domain for 1 year",
      "SEO setup to help you rank on Google",
      "1-month free support & bug fixes",
    ],
    waText:
      "Hi Hendrik, I would like to inquire about the *Custom Premium Page* package. Can we discuss my landing page ideas and custom requirements?",
  },
  {
    id: "custom-system",
    name: "Platform",
    price: "3.500k+",
    description: "A complete system built around how your business runs.",
    features: [
      "Fully custom system, tailored to your workflow",
      "Admin dashboard with secure login",
      "CRM, POS, inventory, booking, or custom flow",
      "Reliable, safely managed database",
      "Ongoing technical support",
    ],
    waText:
      "Hi Hendrik, I would like to discuss a *Custom Web System* project for my business.",
  },
  {
    id: "desktop-app",
    name: "Native",
    price: "4.500k+",
    description: "A dedicated app for Windows or Mac, no browser needed.",
    features: [
      "Fully custom desktop app, built for your needs",
      "Works fully offline, no browser needed",
      "Installable app for Windows or Mac",
      "Secure local or online data storage",
      "Ongoing technical support",
    ],
    waText:
      "Hi Hendrik, I would like to discuss a *Custom Desktop App* project for my business.",
  },
];
