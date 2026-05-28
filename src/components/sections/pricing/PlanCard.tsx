import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlanProps {
  plan: {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlight: boolean;
    icon: any;
    size: string;
  };
}

export function PlanCard({ plan }: PlanProps) {
  const Icon = plan.icon;

  return (
    <div
      className={cn(
        "rounded-[2.5rem] border-2 overflow-hidden relative flex flex-col p-12 min-h-[500px]",
        plan.highlight ? "border-primary" : "border-border/40",
      )}
    >
      {plan.highlight && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-bl-3xl z-10">
          Popular
        </div>
      )}

      <div className="flex flex-col gap-10 relative z-20 flex-1">
        <div className="flex items-start gap-6">
          <div className="shrink-0 rounded-3xl bg-secondary/30 flex items-center justify-center border border-border/50 w-20 h-20">
            <Icon className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">
              {plan.name}
            </h3>
            <div className="text-6xl font-black tracking-tighter">
              {plan.price}
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              {plan.description}
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-4 flex-1">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-sm font-semibold text-foreground"
            >
              <Check className="w-5 h-5 text-primary shrink-0" /> {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-border/40 relative z-10">
        <Link
          href="/build/select-template"
          className={cn(
            "flex items-center justify-center w-full px-8 py-6 rounded-full font-bold uppercase tracking-widest text-xs transition-colors duration-200 border",
            plan.highlight
              ? "bg-primary text-white border-primary hover:bg-primary/90"
              : "bg-transparent text-foreground border-border hover:border-primary/50",
          )}
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 ml-3" />
        </Link>
      </div>
    </div>
  );
}
