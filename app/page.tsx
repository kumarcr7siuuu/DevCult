"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureSection } from "@/components/FeatureSection";
import { IdeaSubmission } from "@/components/IdeaSubmission";
import { GlobalBackground } from "@/components/GlobalBackground";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Target Date: January 1, 2026 00:00:00
    const targetDate = new Date("2026-01-01T00:00:00");
    const now = new Date();

    if (now < targetDate) {
      router.push("/timer");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-theme-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-theme-black text-white selection:bg-theme-purple/30 relative">
      <GlobalBackground />

      <div className="relative z-10">
        <Navbar />
        <Hero />

        {/* Slogan Section */}
        <section className="py-24 flex justify-center items-center text-center px-6">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white/80 max-w-4xl leading-tight">
            "Your imagination is our <span className="italic text-white">responsibility</span>."
          </h2>
        </section>


        <div className="space-y-32 pb-32 pt-[30vh]">
          {/* Transition Gradient Removed - Black Hole handles transition */}


          <Link href="/splitpal" className="block group">
            <FeatureSection
              title="Fintech"
              headline="SplitPal (2025)"
              description="Simplifying finance with precision. A modern approach to debt management and group splitting."
              imageUrl="/splitpal.png"
              align="left"
            />
          </Link>
          <Link href="/kisanyug" className="block group">
            <FeatureSection
              title="AgriTech"
              headline="KisanYug (2025)"
              description="Empowering farmers with technology. A modern platform connecting farmers directly to markets and resources."
              imageUrl="/kisanyug.png"
              align="right"
            />
          </Link>
          <Link href="/traffic-manager" className="block group">
            <FeatureSection
              title="Algo"
              headline="Traffic Manager (2025)"
              description="Anonymous, decentralized traffic optimization using a 3-zone physics model."
              imageUrl="https://images.unsplash.com/photo-1494587416117-f10426b770cb?q=80&w=1000&auto=format&fit=crop"
              align="left"
            />
          </Link>
        </div>

        <IdeaSubmission />

        <footer className="py-10 text-center text-white/30 text-sm">
          <p>© 2026 Shopify Inc. Clone by Antigravity.</p>
        </footer>
      </div>
    </main>
  );
}
