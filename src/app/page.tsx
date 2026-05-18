import {
  BrainCircuit,
  Code,
  FileText,
  Palette,
  Rocket,
  Zap,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { CTASection } from "@/components/sections/home/cta";
import { FeaturesSection } from "@/components/sections/home/features";
import { HeroSection } from "@/components/sections/home/hero";
import { ProcessSection } from "@/components/sections/home/process";
import { StatsStrip } from "@/components/sections/home/stats";

const homeConfig = {
  featuresTitle: "Everything You Need to Stand Out",
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 md:px-6 page-padding relative">
      {/* Background Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-20 left-[10%] animate-float opacity-[0.03] hidden lg:block will-change-transform"
          style={{ animationDelay: "0s" }}
        >
          <Code className="w-12 h-12" />
        </div>
        <div
          className="absolute top-40 right-[15%] animate-float opacity-[0.03] hidden lg:block will-change-transform"
          style={{ animationDelay: "1s" }}
        >
          <Palette className="w-16 h-16" />
        </div>
        <div
          className="absolute bottom-1/4 left-[5%] animate-float opacity-[0.03] hidden lg:block will-change-transform"
          style={{ animationDelay: "2s" }}
        >
          <Zap className="w-10 h-10" />
        </div>
        <div
          className="absolute top-1/2 right-[5%] animate-float opacity-[0.03] hidden lg:block will-change-transform"
          style={{ animationDelay: "0.5s" }}
        >
          <Rocket className="w-14 h-14" />
        </div>
        <div
          className="absolute bottom-1/3 left-1/2 animate-float opacity-[0.03] hidden lg:block will-change-transform"
          style={{ animationDelay: "1.5s" }}
        >
          <FileText className="w-12 h-12" />
        </div>
        <div
          className="absolute top-1/3 right-1/3 animate-float opacity-[0.03] hidden lg:block will-change-transform"
          style={{ animationDelay: "2.5s" }}
        >
          <BrainCircuit className="w-20 h-20" />
        </div>
      </div>

      <main className="flex flex-col relative z-10">
        <HeroSection />
        <StatsStrip />
        <ProcessSection />

        <div className="py-20">
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gradient py-2">
              {homeConfig.featuresTitle}
            </h2>
          </div>
          <FeaturesSection />
        </div>

        <CTASection />
        <Footer />
      </main>
    </div>
  );
}
