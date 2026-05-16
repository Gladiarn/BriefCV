import { ArrowLeft, Code, Palette, Rocket, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[65vh] px-4 overflow-hidden page-padding">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-primary-purple/10 blur-[120px] rounded-full animate-float" />

      {/* Floating Icons Decoration */}
      <div
        className="absolute top-10 left-1/4 animate-float opacity-20 hidden md:block"
        style={{ animationDelay: "1s" }}
      >
        <Code className="w-8 h-8 text-primary" />
      </div>
      <div
        className="absolute bottom-20 left-10 animate-float opacity-20 hidden md:block"
        style={{ animationDelay: "2s" }}
      >
        <Palette className="w-10 h-10 text-primary-purple" />
      </div>
      <div
        className="absolute top-40 right-1/4 animate-float opacity-20 hidden md:block"
        style={{ animationDelay: "0.5s" }}
      >
        <Zap className="w-6 h-6 text-primary" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-3xl">
        {/* Hero Illustration Area */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary-gradient blur-2xl opacity-20 rounded-full scale-150 animate-pulse-slow" />

          <div className="relative flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-card border-2 border-primary/20 rounded-3xl rotate-12 animate-float flex items-center justify-center shadow-2xl relative">
              <Rocket className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              <div className="absolute -top-4 -right-4 bg-primary-gradient p-2 rounded-xl shadow-lg">
                <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
              </div>
            </div>

            {/* Geometric accents */}
            <div className="absolute -bottom-6 -left-10 w-16 h-16 border-2 border-primary-purple/30 rounded-full animate-pulse" />
            <div
              className="absolute top-0 -right-8 w-12 h-12 bg-primary/10 rounded-lg -rotate-12 animate-float"
              style={{ animationDelay: "1.5s" }}
            />
          </div>
        </div>

        {/* Text Content with Fixed Clipping */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
            <span className="text-gradient py-2">{title}</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {description ||
              "We're currently deep in the digital forge, crafting a revolutionary AI experience for your career growth. Something spectacular is coming."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
          <Link href="/">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </Button>
          </Link>

          <Link href="/build">
            <Button size="lg" className="w-full sm:w-auto">
              Launch Builder
              <Zap className="w-4 h-4 fill-current" />
            </Button>
          </Link>
        </div>

        {/* Status Indicator */}
        <div className="mt-12 flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
            Development in Progress
          </span>
        </div>
      </div>
    </div>
  );
}
