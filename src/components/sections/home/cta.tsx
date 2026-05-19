import { Sparkles, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";

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
    <section className="py-24 md:py-40 relative group isolate">
      {/* Background Creative Container */}
      <div className="absolute inset-0 bg-primary-gradient rounded-[3.5rem] md:rounded-[5rem] rotate-1 group-hover:rotate-0 transition-transform duration-700 shadow-2xl shadow-primary/20 -z-20" />
      <div className="absolute inset-0 bg-zinc-950 rounded-[3.5rem] md:rounded-[5rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700 -z-10" />

      <div className="relative z-10 px-8 md:px-20 text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Animated Accent - Optimized */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-primary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-[0.3em] mb-10 backdrop-blur-md">
          <Trophy className="w-3.5 h-3.5 text-primary" />
          {ctaContent.badge}
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
          {ctaContent.titleMain} <br />
          <span className="text-gradient brightness-110">
            {ctaContent.titleGradient}
          </span>
        </h2>

        <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mb-12 font-medium">
          {ctaContent.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <Link href={ctaContent.primaryCta.href} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-10 text-base font-bold bg-white text-black hover:bg-white/90 rounded-full shadow-2xl shadow-white/10"
            >
              {ctaContent.primaryCta.text}
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link
            href={ctaContent.secondaryCta.href}
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-14 px-10 text-base font-bold border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-full backdrop-blur-md"
            >
              {ctaContent.secondaryCta.text}
            </Button>
          </Link>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 w-full flex flex-col items-center gap-6">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full border-4 border-zinc-950 bg-zinc-900 flex items-center justify-center text-[10px] font-black text-white/40 group-hover:text-primary transition-colors duration-500"
              >
                {i === 5 ? "+" : "AI"}
              </div>
            ))}
          </div>
          <p className="text-white/30 text-[11px] font-bold tracking-[0.2em] uppercase">
            Empowering 10,000+ career trajectories
          </p>
        </div>
      </div>
    </section>
  );
}
