import { HeroView } from "@/views/HeroView";
import { WorkView } from "@/views/WorkView";
import { LogoMarquee } from "@/components/Marquee";
import { ProcessView } from "@/views/ProcessView";
import { PricingView } from "@/views/PricingView";
import { FAQView } from "@/views/FAQView";
import { NowView } from "@/views/NowView";
import { ReadyToGrowView } from "@/views/ReadyToGrowView";
import { CTAView } from "@/views/CTAView";

export default function Home() {
  return (
    <>
      <main className="px-4 md:px-24">
        <HeroView />
        <WorkView />
        <LogoMarquee />
        <ProcessView />
        <PricingView />
        <FAQView />
        <NowView />
        <ReadyToGrowView />
        <CTAView />
      </main>
    </>
  );
}
