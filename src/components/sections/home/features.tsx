import { BrainCircuit, LayoutTemplate, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

export function FeaturesSection() {
  const features = [
    {
      title: "AI Deep Analysis",
      description:
        "Our neural engine scans your career history to identify hidden strengths and critical gaps.",
      icon: BrainCircuit,
      className: "md:col-span-2 border-2",
      iconBg: "",
      iconColor: "text-primary",
    },
    {
      title: "Metric Injection",
      description:
        "Automatically calculate and inject impressive ROI percentages into your bullet points.",
      icon: Sparkles,
      className:
        "md:row-span-2 bg-primary-gradient text-white border-none shadow-lg shadow-primary/10",
      iconBg: "bg-white/10",
      iconColor: "text-white",
    },
    {
      title: "ATS Protection",
      description:
        "Every design is rigorously tested to ensure 100% readability by automated systems.",
      icon: Rocket,
      className: "border-2",
      iconBg: "",
      iconColor: "text-primary",
    },
    {
      title: "One-Click Import",
      description:
        "Legacy PDF or Word doc? We'll parse it perfectly and migrate your data in seconds.",
      icon: LayoutTemplate,
      className: "border-2",
      iconBg: "",
      iconColor: "text-primary",
    },
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            className={cn(
              "relative group p-8 transition-colors duration-300 flex flex-col justify-between overflow-hidden rounded-[2.5rem] shadow-none",
              index !== 1
                ? "border-2 border-border/40 bg-transparent hover:border-primary/50"
                : "",
              feature.className,
            )}
          >
            <div className="relative z-10">
              <div
                className={cn(
                  "mb-6 inline-flex p-3 rounded-2xl transition-transform group-hover:scale-110 duration-300",
                  feature.iconBg,
                  feature.iconColor,
                )}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3
                className={cn(
                  "text-2xl font-bold mb-4 tracking-tight",
                  feature.className?.includes("bg-primary-gradient")
                    ? "text-white"
                    : "text-foreground",
                )}
              >
                {feature.title}
              </h3>
              <p
                className={cn(
                  "leading-relaxed text-sm",
                  feature.className?.includes("bg-primary-gradient")
                    ? "text-white/80"
                    : "text-muted-foreground",
                )}
              >
                {feature.description}
              </p>
            </div>

            {index === 0 && (
              <div className="mt-8 flex items-center gap-4">
                <Link href="/build">
                  <Button size="sm" className="rounded-full px-6">
                    Scan Experience
                  </Button>
                </Link>
              </div>
            )}

            {index === 1 && (
              <div className="mt-12 space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="h-1.5 w-full bg-white/20 rounded-full mb-2" />
                  <div className="h-1.5 w-[60%] bg-white/20 rounded-full" />
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 scale-105 shadow-lg">
                  <div className="h-1.5 w-full bg-white/60 rounded-full mb-2" />
                  <div className="h-1.5 w-[80%] bg-white/60 rounded-full" />
                  <div className="mt-3 text-[10px] font-bold uppercase tracking-widest text-white">
                    +45% Efficiency
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
