import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";

const heroContent = {
  badge: "Next-Gen Resume Intelligence",
  titleMain: "Forge Your",
  titleGradient: "Success.",
  description:
    "Stop guessing what recruiters want. Our AI transforms your raw experiences into high-impact, metrics-driven achievements that beat the ATS.",
  primaryCta: {
    text: "Build My Resume",
    href: "/build",
  },
  secondaryCta: {
    text: "Explore Templates",
    href: "/templates",
  },
  benefits: ["ATS-Optimized", "Zero Cost"],
};

export function HeroSection() {
  return (
    <section className="relative w-full pt-5 pb-24 md:pb-40 isolate">
      {/* Background Creative Blurs - Optimized */}
      <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-primary/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[80%] bg-primary-purple/5 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2 -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        {/* Left Side: Content */}
        <div className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            {heroContent.badge}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[70px] font-bold tracking-tight leading-[1.05]">
            {heroContent.titleMain} <br />
            <span className="text-gradient">{heroContent.titleGradient}</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            {heroContent.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mt-2 w-full sm:w-auto">
            <Link href={heroContent.primaryCta.href}>
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 text-sm font-bold transition-all group"
              >
                {heroContent.primaryCta.text}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href={heroContent.secondaryCta.href}>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 text-sm font-bold hover:border-primary/50"
              >
                {heroContent.secondaryCta.text}
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-8 mt-4">
            {heroContent.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-widest text-muted-foreground/70"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(236,72,153,0.4)]" />
                {benefit}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Creative Visual */}
        <div className="relative hidden lg:block h-[500px]">
          <div className="absolute inset-0 bg-primary-gradient opacity-[0.05] blur-[100px] rounded-full animate-pulse-slow" />

          <div className="relative h-full flex items-center justify-center">
            {/* Main Abstract Card */}
            <div className="relative w-full max-w-sm aspect-[4/5] border border-white/20 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl rounded-[3rem] p-10 shadow-2xl shadow-black/10 animate-float">
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-primary-gradient p-[2px]">
                    <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-32 bg-secondary rounded-full" />
                    <div className="h-2 w-20 bg-secondary/60 rounded-full" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-2.5 w-full bg-secondary/80 rounded-full" />
                  <div className="h-2.5 w-full bg-secondary/80 rounded-full" />
                  <div className="h-2.5 w-3/4 bg-secondary/80 rounded-full" />
                </div>

                <div className="relative pt-6 border-t border-border/50">
                  <div className="absolute -top-3 left-0 px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                    AI OPTIMIZED
                  </div>
                  <div className="space-y-3 pt-2">
                    <div className="h-2.5 w-full bg-primary/10 rounded-full" />
                    <div className="h-2.5 w-4/5 bg-primary/10 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Smaller decorative accents */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float-slow" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-purple/10 rounded-full blur-3xl animate-pulse-slow" />
          </div>
        </div>
      </div>
    </section>
  );
}
