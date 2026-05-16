import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

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
    <section className="relative w-full py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left z-10">
          <Badge>
            <Sparkles className="w-4 h-4" />
            {heroContent.badge}
          </Badge>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[1] lg:leading-[0.95]">
            {heroContent.titleMain} <br />
            <span className="text-gradient py-2">
              {heroContent.titleGradient}
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            {heroContent.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <Link href={heroContent.primaryCta.href}>
              <Button size="xl" className="w-full sm:w-auto gap-2">
                {heroContent.primaryCta.text}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href={heroContent.secondaryCta.href}>
              <Button
                variant="secondary"
                size="xl"
                className="w-full sm:w-auto"
              >
                {heroContent.secondaryCta.text}
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-8 opacity-60">
            {heroContent.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {benefit}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Decorative AI Preview */}
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="absolute inset-0 bg-primary-gradient blur-[120px] opacity-10 rounded-full animate-pulse-slow" />

          {/* Main Floating Card */}
          <Card
            className="relative w-full max-w-md animate-float p-6"
            variant="default"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-gradient p-0.5">
                <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <div className="h-2.5 w-24 bg-muted rounded-full mb-2" />
                <div className="h-2 w-16 bg-muted/60 rounded-full" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                <div className="h-2 w-full bg-muted rounded-full mb-2" />
                <div className="h-2 w-[80%] bg-muted rounded-full" />
              </div>

              <div className="relative p-4 rounded-2xl bg-primary/5 border border-primary/20 scale-105 shadow-lg">
                <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  AI Optimized
                </div>
                <div className="h-2 w-full bg-primary/40 rounded-full mb-2" />
                <div className="h-2 w-full bg-primary/40 rounded-full mb-2" />
                <div className="h-2 w-[60%] bg-primary/40 rounded-full" />
              </div>

              <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                <div className="h-2 w-full bg-muted rounded-full mb-2" />
                <div className="h-2 w-[40%] bg-muted rounded-full" />
              </div>
            </div>
          </Card>

          {/* Smaller floating accents */}
          <div
            className="absolute -top-10 -right-4 w-24 h-24 bg-primary/10 backdrop-blur-xl border border-white/10 rounded-3xl rotate-12 animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary-purple/10 backdrop-blur-xl border border-white/10 rounded-2xl -rotate-12 animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>
    </section>
  );
}
