import {
  BrainCircuit,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background pt-16 md:pt-20 isolate">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-1/4 left-0 w-[40%] h-[40%] bg-primary-purple/5 blur-[120px] rounded-full -translate-x-1/4" />
      </div>

      <main className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-16 pb-32">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Our Mission
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Democratizing{" "}
              <span className="text-gradient">Career Growth.</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              StackCV was born from the idea that everyone deserves a
              high-impact resume. We leverage AI to bridge the gap between
              ambition and opportunity.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            <Card className="md:col-span-2 md:row-span-2 p-10 rounded-[2.5rem] border border-border/40 bg-card/80 backdrop-blur-xl flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <BrainCircuit className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-4 relative z-10">
                <h3 className="text-2xl font-black uppercase tracking-tight">
                  AI Driven Intelligence
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  We use advanced machine learning models to analyze market
                  trends and optimize your achievements for high-performance
                  impact.
                </p>
              </div>
            </Card>

            <Card className="md:col-span-2 p-8 rounded-[2.5rem] border border-border/40 bg-card/80 backdrop-blur-xl flex items-center gap-8">
              <div className="w-20 h-20 shrink-0 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black uppercase tracking-widest">
                  Precision Mapping
                </h3>
                <p className="text-sm text-muted-foreground">
                  Every bullet point is calibrated against job descriptions to
                  ensure maximum ATS alignment.
                </p>
              </div>
            </Card>

            <Card className="p-8 rounded-[2.5rem] border border-border/40 bg-card/80 backdrop-blur-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest">
                Performance
              </h3>
              <p className="text-xs text-muted-foreground">
                Built for speed, optimizing your narrative in seconds.
              </p>
            </Card>

            <Card className="p-8 rounded-[2.5rem] border border-border/40 bg-card/80 backdrop-blur-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest">
                Secure
              </h3>
              <p className="text-xs text-muted-foreground">
                Your career data is protected with enterprise-grade encryption.
              </p>
            </Card>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
