import {
  BrainCircuit,
  LayoutTemplate,
  MousePointerClick,
  Rocket,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

const features = [
  {
    title: "AI Analysis",
    description:
      "Our neural engine scans your input to identify core competencies and missing keywords.",
    icon: BrainCircuit,
    link: "/build",
    cta: "Scan Now",
    primary: true,
  },
  {
    title: "Metric Injection",
    description:
      "We automatically turn 'Responsible for sales' into 'Exceeded sales targets by 45% using AI-driven analytics'.",
    icon: Sparkles,
    link: "/build",
    cta: "Boost Results",
    primary: true,
  },
  {
    title: "ATS Ghosting Protection",
    description:
      "Every template is rigorously tested against major ATS providers to ensure your resume never gets lost.",
    icon: Rocket,
    link: "/templates",
    cta: "Browse Templates",
    primary: false,
  },
  {
    title: "Smart Import",
    description:
      "Upload your existing PDF or Doc and our parser will extract and clean the data instantly.",
    icon: LayoutTemplate,
    link: "/login",
    cta: "Import File",
    primary: false,
  },
];

export function FeaturesSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full mt-16">
      {features.map((feature) => (
        <Card
          key={feature.title}
          className="group relative overflow-hidden border-primary/5 hover:border-primary/20 hover:shadow-2xl transition-all duration-500 p-6 md:p-8"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-colors" />

          <div className="relative z-10">
            <div className="mb-6 inline-flex p-3 rounded-xl bg-primary/5 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
              <feature.icon className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-black mb-3 tracking-tighter">
              {feature.title}
            </h3>

            <p className="text-muted-foreground mb-8 leading-relaxed text-base max-w-md">
              {feature.description}
            </p>

            <Link href={feature.link}>
              <Button
                variant={feature.primary ? "primary" : "secondary"}
                className="group/btn gap-2"
                size="lg"
              >
                {feature.cta}
                <MousePointerClick className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </Card>
      ))}
    </section>
  );
}
