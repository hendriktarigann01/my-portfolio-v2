"use client";

import {
  PricingHeader,
  BackgroundEffects,
  PricingCard,
} from "@/components/PricingService";
import { SERVICE_PLANS_BY_LANG } from "@/constants/pricing";
import { useLanguage } from "@/lib/language-context";

export function PricingView() {
  const { lang } = useLanguage();
  const plans = SERVICE_PLANS_BY_LANG[lang] || SERVICE_PLANS_BY_LANG.id;

  return (
    <section
      id="services"
      className="relative py-16 md:py-24 overflow-visible scroll-mt-20 md:scroll-mt-0"
    >
      <PricingHeader />
      <BackgroundEffects />

      <div className="w-[100%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 px-4">
        {plans.map((plan) => (
          <div key={plan.id} className="h-full">
            <PricingCard plan={plan} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PricingView;
