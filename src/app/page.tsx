import { Navbar } from "@/components/Navbar";
import { HeroView } from "@/views/HeroView";
import { WorkView } from "@/views/WorkView";
import { ProcessView } from "@/views/ProcessView";
import { NowView } from "@/views/NowView";
// import { ContactView } from "@/views/ContactView";
import { CTAView } from "@/views/CTAView";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="md:px-24">
        <HeroView />
        <WorkView />
        <ProcessView />
        <NowView />
        {/* <ContactView /> */}
        <CTAView />
      </main>
    </>
  );
}
