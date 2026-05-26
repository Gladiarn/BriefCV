import { Check, Clock, Crown, Infinity, Sparkles, Zap } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for students and early career explorers.",
    features: [
      "1 Resume Template",
      "Basic AI optimization",
      "Standard PDF Export",
    ],
    highlight: false,
    icon: Zap,
  },
  {
    name: "Professional",
    price: "$12",
    description: "Advanced tools for high-impact career growth.",
    features: [
      "Unlimited Templates",
      "Advanced AI Editor",
      "High-Fidelity PDF",
      "Priority Support",
    ],
    highlight: true,
    icon: Crown,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for teams and organizations.",
    features: [
      "Team Management",
      "Custom Branding",
      "Bulk Export",
      "Dedicated Account Manager",
    ],
    highlight: false,
    icon: Infinity,
  },
];

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-background pt-16 md:pt-20 isolate">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-1/4 left-0 w-[40%] h-[40%] bg-primary-purple/5 blur-[120px] rounded-full -translate-x-1/4" />
      </div>

      <main className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-24 pb-32">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto pt-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Transparent Pricing
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Scale Your <span className="text-gradient">Career.</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Choose the plan that fits your professional journey and start
              forging your narrative today.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "p-8 rounded-[2.5rem] border border-border/40 bg-card/80 backdrop-blur-xl flex flex-col h-full transition-all hover:shadow-2xl hover:border-primary/20 relative overflow-hidden",
                  plan.highlight
                    ? "border-primary shadow-lg ring-1 ring-primary/10"
                    : "",
                )}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-2xl">
                    Popular
                  </div>
                )}

                <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <plan.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                        {plan.name}
                      </h3>
                      <div className="text-5xl font-black tracking-tighter">
                        {plan.price}
                      </div>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm font-semibold text-foreground"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className={cn(
                    "w-full mt-12 rounded-full h-12 font-bold uppercase tracking-widest text-[11px]",
                    plan.highlight
                      ? "bg-primary-gradient text-white"
                      : "bg-secondary hover:bg-secondary/80 text-foreground",
                  )}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>

          {/* Bottom Trust/FAQ Section */}
          <section className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-2 text-muted-foreground font-bold text-xs uppercase tracking-widest">
              <Clock className="w-4 h-4" />
              No hidden fees. Cancel anytime.
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}
