import {
  ArrowRight,
  Check,
  Clock,
  Crown,
  Infinity,
  Sparkles,
  Zap,
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for students.",
    features: ["1 Resume Template", "Basic AI", "PDF Export"],
    highlight: false,
    icon: Zap,
    size: "sm",
  },
  {
    name: "Professional",
    price: "$12",
    description: "Advanced tools for high-impact growth.",
    features: [
      "Unlimited Templates",
      "AI Editor",
      "High-Fidelity PDF",
      "Priority Support",
    ],
    highlight: true,
    icon: Crown,
    size: "lg",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for teams.",
    features: [
      "Team Management",
      "Custom Branding",
      "Bulk Export",
      "Dedicated Manager",
    ],
    highlight: false,
    icon: Infinity,
    size: "sm",
  },
];

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-background pt-24 isolate">
      {/* Background Accents - Optimized for scroll performance */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-primary-purple/5 blur-[150px] rounded-full" />
      </div>

      <main className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 pb-32">
          {/* Left: Header (Asymmetrical) */}
          <div className="flex-1 flex flex-col justify-center gap-8 lg:sticky lg:top-24 lg:h-[calc(100vh-100px)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              Transparent Pricing
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              Scale Your <br />
              <span className="text-gradient">Career.</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium max-w-md">
              Choose the plan that fits your professional journey and start
              forging your narrative today with powerful AI tools.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground font-bold text-xs uppercase tracking-widest pt-4">
              <Clock className="w-4 h-4" />
              No hidden fees. Cancel anytime.
            </div>
          </div>

          {/* Right: Pricing Grid - Vertically Centered */}
          <div className="flex-[1.5] flex flex-col gap-6 justify-center min-h-[600px]">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "rounded-[2.5rem] border border-border/40 bg-card overflow-hidden transition-all duration-300",
                  plan.size === "lg"
                    ? "p-12 md:scale-105 border-primary/50 shadow-2xl z-10"
                    : "p-8 md:scale-[0.92] opacity-80 hover:opacity-100",
                  plan.highlight ? "shadow-primary/10" : "",
                )}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-widest px-6 py-2 rounded-bl-3xl">
                    Popular
                  </div>
                )}

                <div
                  className={cn(
                    "flex flex-col md:flex-row md:items-center gap-8",
                    plan.size === "lg" ? "md:gap-12" : "",
                  )}
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div
                      className={cn(
                        "shrink-0 rounded-3xl bg-secondary flex items-center justify-center border border-border",
                        plan.size === "lg" ? "w-20 h-20" : "w-16 h-16",
                      )}
                    >
                      <plan.icon
                        className={cn(
                          "text-primary",
                          plan.size === "lg" ? "w-10 h-10" : "w-8 h-8",
                        )}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                        {plan.name}
                      </h3>
                      <div
                        className={cn(
                          "font-black tracking-tighter",
                          plan.size === "lg" ? "text-6xl" : "text-4xl",
                        )}
                      >
                        {plan.price}
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  <ul
                    className={cn(
                      "grid gap-3",
                      plan.size === "lg" ? "grid-cols-2" : "grid-cols-1",
                    )}
                  >
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm font-semibold text-foreground"
                      >
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/build/select-template"
                    className={cn(
                      "group flex items-center justify-between px-6 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all duration-150 active:scale-95 border border-border/40 hover:border-primary/50",
                      plan.highlight
                        ? "bg-primary text-white"
                        : "bg-secondary text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    )}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
