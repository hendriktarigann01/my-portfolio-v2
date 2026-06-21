import { HeroView } from "@/views/HeroView";
import { WorkView } from "@/views/WorkView";
import { LogoMarquee } from "@/components/Marquee";
import { ProcessView } from "@/views/ProcessView";
import { NowView } from "@/views/NowView";
import { CTAView } from "@/views/CTAView";

export default function Home() {
  return (
    <>
      <main className="px-4 md:px-24">
        <HeroView />
        <WorkView />
        <LogoMarquee />
        <ProcessView />
        <NowView />
        <CTAView />
      </main>
    </>
  );
}
