"use client";
import React from "react";
import {
  PricingHeader,
  BackgroundEffects,
  PricingCard,
} from "@/components/PricingService";
import { SERVICE_PLANS } from "@/constants";

export function PricingView() {
  return (
    <section
      id="services"
      className="relative py-16 md:py-24 overflow-hidden scroll-mt-20 md:scroll-mt-0"
    >
      <PricingHeader />
      <BackgroundEffects />

      <div className="w-[100%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 px-4">
        {SERVICE_PLANS.map((plan, index) => (
          <PricingCard key={plan.name} plan={plan} index={index} />
        ))}
      </div>
    </section>
  );
}
export default PricingView;
