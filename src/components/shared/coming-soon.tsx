import { ArrowLeft, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-3xl text-center">
        {/* Minimalist Icon */}
        <div className="mb-12 relative">
          <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center shadow-2xl shadow-black/5 rotate-3 transition-transform hover:rotate-6 duration-500">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            {description ||
              "We're currently deep in the digital forge, crafting a revolutionary AI experience for your career growth. Something spectacular is coming."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full sm:w-auto">
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 h-12 text-sm font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>

          <Link href="/build">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 h-12 text-sm font-bold bg-foreground text-background hover:bg-foreground/90 transition-all shadow-xl shadow-black/5"
            >
              Launch Builder
              <Rocket className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Status */}
        <div className="mt-16 flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/50 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Under Construction
        </div>
      </div>
    </div>
  );
}
