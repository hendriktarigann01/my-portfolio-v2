"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CursorFollow } from "@/components/CursorFollow";
import { Preloader } from "@/components/Preloader";
import { GlobalIllustrations } from "@/components/GlobalIllustrations";
import { ChatWidget } from "@/components/ChatWidget";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isCatSimulator = pathname?.startsWith("/lab/cat-simulator") ?? false;

  useEffect(() => {
    if (isCatSimulator) {
      document.body.classList.add("cat-simulator-mode");
    } else {
      document.body.classList.remove("cat-simulator-mode");
    }

    return () => {
      document.body.classList.remove("cat-simulator-mode");
    };
  }, [isCatSimulator]);

  if (isCatSimulator) {
    return <main className="w-full min-h-screen">{children}</main>;
  }

  return (
    <>
      <SmoothScrollProvider>
        <Preloader />
        <GlobalIllustrations />
        <CursorFollow />
        <Navbar />
        {children}
        <Footer />
      </SmoothScrollProvider>
      <ChatWidget />
    </>
  );
}
