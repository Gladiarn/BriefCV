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
    <div className="relative min-h-screen bg-background page-padding">
      {/* Subtle Background Accent - Optimized blurs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-[5%] -left-[10%] w-[40%] h-[40%] bg-primary/5 blur-[80px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-primary-purple/5 blur-[80px] rounded-full" />
      </div>

      <main className="relative z-10 flex flex-col">
        <div className="container mx-auto px-4 md:px-6">
          <HeroSection />
        </div>

        <StatsStrip />

        <div className="container mx-auto px-4 md:px-6">
          <ProcessSection />

          <section className="py-24">
            <div className="flex flex-col items-center text-center mb-16 space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {homeConfig.featuresTitle}
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Advanced features designed to give you a competitive edge in the
                job market.
              </p>
            </div>
            <FeaturesSection />
          </section>

          <CTASection />
        </div>
        <Footer />
      </main>
    </div>
  );
}
