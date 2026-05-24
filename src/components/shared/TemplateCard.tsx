"use client";

import { ArrowRight, Eye, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Template } from "@/types/resume";

interface TemplateCardProps {
  template: Template;
  onPreview: (template: Template) => void;
}

const templateCardConfig = {
  previewText: "Preview",
  useText: "Use Blueprint",
};

export function TemplateCard({ template, onPreview }: TemplateCardProps) {
  return (
    <div className="group relative flex flex-col h-full bg-card border border-border/40 rounded-3xl overflow-hidden hover:border-primary/20 transition-all duration-150 hover:shadow-md">
      {/* Visual Area - Fast & Snappy Transitions */}
      <div
        className={cn(
          "aspect-[4/5] relative overflow-hidden transition-colors duration-150",
          template.thumbnailColor,
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <div className="w-full h-full bg-background/15 rounded-xl border border-white/5 shadow-sm transition-colors duration-150 relative overflow-hidden group-hover:bg-background/20">
            {/* Simplified fake content */}
            <div className="absolute inset-0 p-6 flex flex-col gap-3">
              <div className="h-3 w-1/2 bg-white/10 rounded-full" />
              <div className="h-1 w-1/3 bg-white/5 rounded-full" />
              <div className="mt-4 space-y-2">
                <div className="h-1 w-full bg-white/5 rounded-full" />
                <div className="h-1 w-full bg-white/5 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Overlay - Clean & Snappy */}
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex flex-col items-center justify-center gap-3 p-8 z-10">
          <Button
            onClick={() => onPreview(template)}
            className="w-full rounded-full h-10 bg-white text-black hover:bg-white/90 shadow-sm transition-all duration-150 font-bold text-xs active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 mr-2" />{" "}
            {templateCardConfig.previewText}
          </Button>
          <Link href={`/build/new?template=${template.id}`} className="w-full">
            <Button className="w-full rounded-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all duration-150 font-bold text-xs group/btn active:scale-95">
              {templateCardConfig.useText}{" "}
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Content - Clean Typography */}
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold tracking-tight">{template.name}</h3>
          <div className="flex gap-1">
            {template.features.slice(0, 1).map((feature) => (
              <div
                key={feature}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10"
              >
                <Sparkles className="w-2.5 h-2.5 text-primary" />
                <span className="text-[8px] font-bold text-primary uppercase tracking-widest">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 font-medium">
          {template.description}
        </p>
      </div>
    </div>
  );
}
