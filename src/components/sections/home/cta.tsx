import { Sparkles, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

const ctaContent = {
  badge: "Limited Time Access",
  titleMain: "Start Your Career",
  titleGradient: "Transformation.",
  description:
    "Join 10,000+ professionals who have stopped applying and started getting interviews. Your future self will thank you.",
  primaryCta: {
    text: "Forge Your Resume",
    href: "/build",
  },
  secondaryCta: {
    text: "View Success Stories",
    href: "/about",
  },
};

export function CTASection() {
  return (
    <section className="py-24 md:py-32">
      <Card
        className="relative p-10 md:p-16 text-center border-primary/20 shadow-[0_10px_40px_-15px_rgba(236,72,153,0.2)]"
        variant="default"
      >
        {/* Creative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.1)_0%,transparent_70%)]" />
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/10 blur-[80px] rounded-full animate-pulse-slow will-change-[opacity,filter]" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-primary-purple/10 blur-[80px] rounded-full animate-float will-change-transform" />

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-tighter">
            <Trophy className="w-4 h-4" />
            {ctaContent.badge}
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1]">
            {ctaContent.titleMain} <br />
            <span className="text-gradient py-2">
              {ctaContent.titleGradient}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {ctaContent.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
            <Link href={ctaContent.primaryCta.href}>
              <Button size="xl" className="w-full sm:w-auto px-10 group/cta">
                {ctaContent.primaryCta.text}
                <Sparkles className="w-4 h-4 animate-pulse group-hover/cta:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Link href={ctaContent.secondaryCta.href}>
              <Button
                variant="secondary"
                size="xl"
                className="w-full sm:w-auto px-10"
              >
                {ctaContent.secondaryCta.text}
              </Button>
            </Link>
          </div>

          <div className="pt-8 flex items-center gap-4 text-muted-foreground/60 text-xs font-bold">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px]"
                >
                  AI
                </div>
              ))}
            </div>
            Trusted by developers, designers, and managers worldwide.
          </div>
        </div>
      </Card>
    </section>
  );
}
