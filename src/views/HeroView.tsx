"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { globalLenis } from "@/components/SmoothScrollProvider";

export function HeroView() {
  const handleExplore = () => {
    if (globalLenis) {
      globalLenis.scrollTo("#projects");
    } else {
      document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="h-screen w-full p-4 sm:p-6 md:p-8 pt-20 sm:pt-6 md:pt-8"
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            background: "rgba(2, 66, 68, 0.3)",
          }}
        />

        {/* Mobile presentation (hidden on md+) */}
        <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 z-10">
          <h1
            className="font-medium leading-[0.85] tracking-[-0.08em] text-[14vw] md:text-[22vw] text-center pointer-events-auto"
            style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
          >
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              Hendrik
            </motion.span>
          </h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-light text-center max-w-[320px] pointer-events-auto"
            style={{
              color: "rgba(var(--accent-rgb),0.7)",
              lineHeight: 1.5,
              fontFamily: "var(--font-body)",
            }}
          >
            Fullstack developer crafting high performance digital systems and
            turning complex workflows into elegant web and desktop applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto"
          >
            <Button label="Explore" onClick={handleExplore} />
          </motion.div>
        </div>

        {/* Desktop presentation (hidden on mobile) */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 px-10 pb-4">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-8 z-10 pointer-events-auto">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.1em] text-[13vw] lg:text-[11vw] xl:text-[9vw]"
                style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
              >
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  Hendrik
                </motion.span>
              </h1>
            </div>
            <div className="col-span-4 flex flex-col gap-5 pb-10 z-10 pointer-events-auto">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-base font-light"
                style={{
                  color: "rgba(var(--accent-rgb),0.7)",
                  lineHeight: 1.4,
                  fontFamily: "var(--font-body)",
                }}
              >
                Fullstack developer crafting high performance digital systems
                and turning complex workflows into elegant web and desktop
                applications.
              </motion.p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block absolute inset-0 z-20 pointer-events-none"
        >
          <div className="w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="pointer-events-auto">
              <Button label="Explore" onClick={handleExplore} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
