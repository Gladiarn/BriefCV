import {
  BrainCircuit,
  LayoutTemplate,
  MousePointerClick,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

export function FeaturesSection() {
  return (
    <section className="w-full mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:auto-rows-[240px]">
        {/* 1. AI Analysis - Wide Bento Card */}
        <Card
          className="md:col-span-2 min-h-[280px] lg:min-h-0 relative group border-primary/5 hover:border-primary/20 transition-all duration-500 flex flex-col justify-between overflow-hidden"
          variant="default"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity text-primary">
            <BrainCircuit className="w-40 h-40 -rotate-12" />
          </div>

          <div className="relative z-10 max-w-md">
            <div className="mb-4 inline-flex p-2.5 rounded-xl bg-primary/5 text-primary">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black mb-2 tracking-tighter">
              AI Deep Analysis
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Our neural engine doesn't just read—it understands. It scans your
              career history to identify hidden strengths and critical gaps.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 mt-4">
            <Link href="/build">
              <Button size="sm" className="gap-2">
                Scan Experience
                <Zap className="w-3 h-3 fill-current" />
              </Button>
            </Link>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          {/* Creative Scan Line */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(236,72,153,0.05)_50%,transparent_100%)] w-1/2 h-full -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
        </Card>

        {/* 2. Metric Injection - Tall Bento Card */}
        <Card
          className="lg:row-span-2 min-h-[340px] lg:min-h-0 relative group border-primary/5 hover:border-primary/20 transition-all duration-500 bg-primary-gradient border-none"
          variant="default"
        >
          <div className="relative z-10 h-full flex flex-col justify-between text-white">
            <div>
              <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur-md">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tighter leading-tight">
                Instant Metric Injection
              </h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Turn generic duties into data-backed achievements. We
                automatically calculate and inject impressive ROI percentages
                and growth metrics into your bullet points.
              </p>
            </div>

            <div className="space-y-3 mt-8">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 blur-[1px] group-hover:blur-0 transition-all">
                <div className="h-1.5 w-full bg-white/20 rounded-full mb-2" />
                <div className="h-1.5 w-[60%] bg-white/20 rounded-full" />
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/20 scale-105 shadow-lg">
                <div className="h-1.5 w-full bg-white/60 rounded-full mb-2" />
                <div className="h-1.5 w-[80%] bg-white/60 rounded-full" />
                <div className="mt-2 text-[10px] font-black uppercase tracking-widest text-white">
                  +45% Efficiency
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 3. ATS Ghosting Protection - Standard Bento Card */}
        <Card
          className="relative group border-primary/5 hover:border-primary/20 transition-all duration-500 flex flex-col justify-between"
          variant="default"
        >
          <div className="relative z-10">
            <div className="mb-4 inline-flex p-2.5 rounded-xl bg-primary/5 text-primary">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight">
              ATS Protection
            </h3>
            <p className="text-muted-foreground leading-relaxed text-xs">
              Every design is rigorously tested to ensure 100% readability by
              automated systems.
            </p>
          </div>

          <Link href="/templates" className="mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 text-primary hover:bg-transparent"
            >
              Learn More <MousePointerClick className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>

          <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <Rocket className="w-24 h-24 rotate-12" />
          </div>
        </Card>

        {/* 4. Smart Import - Standard Bento Card */}
        <Card
          className="relative group border-primary/5 hover:border-primary/20 transition-all duration-500 flex flex-col justify-between"
          variant="default"
        >
          <div className="relative z-10">
            <div className="mb-4 inline-flex p-2.5 rounded-xl bg-primary/5 text-primary">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight">
              One-Click Import
            </h3>
            <p className="text-muted-foreground leading-relaxed text-xs">
              Legacy PDF or Word doc? We'll parse it perfectly and migrate your
              data in seconds.
            </p>
          </div>

          <div className="mt-4 p-2 rounded-lg bg-muted/30 border border-border flex items-center gap-2 group-hover:border-primary/20 transition-colors">
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
              <div className="w-3 h-0.5 bg-primary rounded-full" />
            </div>
            <div className="h-1 w-12 bg-muted rounded-full" />
          </div>
        </Card>
      </div>
    </section>
  );
}
