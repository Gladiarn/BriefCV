"use client";

import { Crown, Infinity as InfinityIcon, Sparkles, Zap } from "lucide-react";
import { useMemo } from "react";
import { Footer } from "@/components/layout/footer";
import { FeatureComparison } from "@/components/sections/pricing/FeatureComparison";
import { PlanCard } from "@/components/sections/pricing/PlanCard";
import { PricingFAQ } from "@/components/sections/pricing/PricingFAQ";
import { PricingNotification } from "@/components/sections/pricing/PricingNotification";
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
    icon: InfinityIcon,
    size: "sm",
  },
];

const pricingConfig = {
  header: {
    badge: "Pricing Plans",
    titleMain: "Scale Your",
    titleGradient: "Career.",
    description:
      "Choose the plan that fits your professional journey and start forging your narrative today with powerful AI tools.",
  },
};

export default function PricingPage() {
  const planComponents = useMemo(
    () =>
      plans.map((plan, index) => (
        <div
          key={plan.name}
          className={cn(
            "transition-all duration-300",
            index === 1 ? "lg:scale-105 lg:z-10" : "lg:scale-100",
          )}
        >
          <PlanCard plan={plan} />
        </div>
      )),
    [],
  );

  return (
    <div className="relative min-h-screen bg-background page-padding isolate overflow-x-hidden">
      {/* Background Creative Blurs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-primary/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-[10%] -right-[5%] w-[500px] h-[500px] bg-primary-purple/5 blur-[80px] rounded-full" />
      </div>

      <main className="relative z-10 flex flex-col pt-5">
        <div className="container mx-auto px-4 md:px-6 pb-32">
          {/* Centered Header Design */}
          <header className="mb-24 flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              {pricingConfig.header.badge}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
              {pricingConfig.header.titleMain} <br />
              <span className="text-gradient py-2">
                {pricingConfig.header.titleGradient}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              {pricingConfig.header.description}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-7xl mx-auto mb-32">
            {planComponents}
          </div>

          <FeatureComparison />
          <PricingFAQ />
        </div>

        <Footer />
      </main>
      <PricingNotification
        title="Pricing Notice"
        message="We currently offer our services for free. Payment gateways are not yet enabled. Enjoy all features without constraints!"
      />
    </div>
  );
}
