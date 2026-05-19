"use client";

import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Template } from "@/types/resume";

interface TemplateCardProps {
  template: Template;
  onPreview: (template: Template) => void;
}

export function TemplateCard({ template, onPreview }: TemplateCardProps) {
  return (
    <div className="group relative flex flex-col h-full bg-card border border-border/50 rounded-[2rem] overflow-hidden hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-black/[0.03]">
      {/* Visual Area */}
      <div
        className={cn(
          "aspect-[4/5] relative overflow-hidden transition-colors duration-500",
          template.thumbnailColor,
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="w-full h-full bg-background/20 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1" />
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3 p-8 z-10">
          <Button
            onClick={() => onPreview(template)}
            className="w-full rounded-full h-12 bg-white text-black hover:bg-white/90 shadow-xl shadow-black/5 active:scale-95 transition-all"
          >
            <Eye className="w-4 h-4 mr-2" /> Preview
          </Button>
          <Link href={`/build/new?template=${template.id}`} className="w-full">
            <Button className="w-full rounded-full h-12 bg-black text-white hover:bg-black/90 shadow-xl shadow-black/5 active:scale-95 transition-all">
              Use Blueprint <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight">{template.name}</h3>
          <div className="flex gap-1.5 pt-1">
            {template.features.slice(0, 1).map((feature, i) => (
              <span
                key={i}
                className="text-[10px] font-bold text-primary uppercase tracking-widest px-2 py-1 rounded-md bg-primary/5"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
          {template.description}
        </p>
      </div>
    </div>
  );
}
