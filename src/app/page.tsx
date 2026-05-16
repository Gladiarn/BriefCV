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
    <div className="container mx-auto px-4 md:px-6 page-padding">
      <main className="flex flex-col">
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
