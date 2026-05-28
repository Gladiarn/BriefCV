"use client";

import { Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function PricingNotification() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after short delay to not disrupt initial page load
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-card/80 backdrop-blur-xl border border-primary/20 p-6 rounded-3xl shadow-2xl max-w-xs relative group">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-2 rounded-2xl">
            <Info className="w-6 h-6 text-primary" />
          </div>
          <div className="pr-4">
            <h4 className="font-bold text-sm mb-1">Pricing Notice</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We currently offer our services for free. Payment gateways are not
              yet enabled. Enjoy all features without constraints!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
