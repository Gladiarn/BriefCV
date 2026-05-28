"use client";

import {
  BrainCircuit,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

const aboutConfig = {
  header: {
    badge: "Our Mission",
    titleMain: "Democratizing",
    titleGradient: "Career Growth.",
    description:
      "BriefCV was born from the idea that everyone deserves a high-impact resume. We leverage AI to bridge the gap between ambition and opportunity.",
  },
  pillars: [
    {
      title: "AI Driven Intelligence",
      description:
        "We use advanced machine learning models to analyze market trends and optimize your achievements for high-performance impact.",
      icon: BrainCircuit,
    },
    {
      title: "Precision Mapping",
      description:
        "Every bullet point is calibrated against job descriptions to ensure maximum ATS alignment.",
      icon: Target,
    },
    {
      title: "Performance",
      description: "Built for speed, optimizing your narrative in seconds.",
      icon: Rocket,
    },
    {
      title: "Secure",
      description:
        "Your career data is protected with enterprise-grade encryption.",
      icon: ShieldCheck,
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background page-padding isolate">
      {/* Background Creative Blurs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-purple/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 flex flex-col pt-5">
        <div className="container mx-auto px-4 md:px-6 pb-32">
          {/* About Header - Centered */}
          <header className="mb-24 flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              {aboutConfig.header.badge}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
              {aboutConfig.header.titleMain} <br />
              <span className="text-gradient py-2">
                {aboutConfig.header.titleGradient}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              {aboutConfig.header.description}
            </p>
          </header>

          {/* Storytelling Sections */}
          <div className="max-w-4xl mx-auto space-y-32">
            {aboutConfig.pillars.map((pillar, i) => (
              <section
                key={pillar.title}
                className={cn(
                  "grid grid-cols-1 md:grid-cols-12 gap-8 items-center",
                  i % 2 !== 0 ? "md:text-right" : "",
                )}
              >
                <div
                  className={cn(
                    "md:col-span-5",
                    i % 2 !== 0 ? "md:order-2" : "",
                  )}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 text-primary mb-6">
                    <pillar.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">
                    {pillar.title}
                  </h3>
                </div>
                <div
                  className={cn(
                    "md:col-span-7 text-muted-foreground leading-relaxed",
                    i % 2 !== 0 ? "md:text-right" : "",
                  )}
                >
                  <p className="text-lg font-medium">{pillar.description}</p>
                </div>
              </section>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
