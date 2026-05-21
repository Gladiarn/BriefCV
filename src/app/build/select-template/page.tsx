"use client";

import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Layers,
  Palette,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TemplateCard } from "@/components/shared/TemplateCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/templates";
import { cn } from "@/lib/utils";
import type { Template } from "@/types/resume";

const pageConfig = {
  header: {
    badge: "Blueprints Library",
    titleMain: "Choose Your",
    titleGradient: "Blueprint.",
    description:
      "Every blueprint is engineered for maximum ATS readability and human engagement. Pick one to begin your transformation.",
    backLabel: "Return to Dashboard",
  },
  modal: {
    badge: "Selected Blueprint",
    featuresTitle: "Core Features",
    dimensionsLabel: "Specifications",
    ctaText: "Launch Builder",
  },
};

export default function TemplateSelection() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setIsOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-background page-padding isolate">
      {/* Background Creative Blurs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-1/4 left-0 w-[40%] h-[40%] bg-primary-purple/5 blur-[120px] rounded-full -translate-x-1/4" />
      </div>

      {/* Simplified Creative Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute top-40 right-[15%] animate-float">
          <Palette className="w-24 h-24" />
        </div>
        <div
          className="absolute bottom-1/4 left-[5%] animate-float"
          style={{ animationDelay: "2s" }}
        >
          <Zap className="w-16 h-16" />
        </div>
      </div>

      <main className="relative z-10 flex flex-col pt-5">
        <div className="container mx-auto px-4 md:px-6 pb-32">
          {/* Header Section with Integrated Back Navigation */}
          <div className="flex flex-col gap-10 mb-20 max-w-4xl relative">
            {/* Minimalist Integrated Back Navigation - Desktop */}
            <div className="absolute -left-16 top-1.5 hidden xl:block">
              <Link href="/build">
                <div
                  className="group w-10 h-10 rounded-full bg-secondary/50 hover:bg-primary/10 border border-border/40 hover:border-primary/20 transition-all duration-300 backdrop-blur-sm flex items-center justify-center cursor-pointer active:scale-90 shadow-sm"
                  title="Back to Dashboard"
                >
                  <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                {/* Mobile/Tablet Back Button - Small & Subtle */}
                <Link href="/build" className="xl:hidden">
                  <div className="w-8 h-8 rounded-full bg-secondary/50 border border-border/40 flex items-center justify-center active:scale-90 transition-all">
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Link>
                <Badge
                  variant="outline"
                  className="gap-2 px-4 py-1.5 border-primary/20 bg-primary/5 text-primary text-[10px] uppercase tracking-[0.2em] font-bold shadow-sm w-fit rounded-full"
                >
                  <Layers className="w-3.5 h-3.5" />
                  {pageConfig.header.badge}
                </Badge>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                {pageConfig.header.titleMain} <br />
                <span className="text-gradient py-2">
                  {pageConfig.header.titleGradient}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
                {pageConfig.header.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onPreview={handlePreview}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Modernized Preview Modal */}
      {isOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-md z-[1000] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="bg-card w-full max-w-5xl rounded-[3rem] border border-border shadow-[0_32px_128px_rgba(0,0,0,0.12)] overflow-hidden relative flex flex-col md:flex-row h-full max-h-[90vh] animate-in zoom-in-95 duration-500 ease-out">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-3 hover:bg-secondary rounded-full z-20 transition-all active:scale-95 border border-border/40 bg-background/50 backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual Side */}
            <div
              className={cn(
                "flex-1 relative flex items-center justify-center p-12 overflow-hidden",
                selectedTemplate.thumbnailColor,
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] opacity-100" />

              <div className="relative w-full max-w-[360px] aspect-[1/1.414] bg-white shadow-2xl rounded-[1.5rem] p-10 flex flex-col gap-5 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="h-6 w-1/3 bg-slate-100 rounded-lg" />
                <div className="h-2 w-1/4 bg-slate-50 rounded-md" />
                <div className="mt-8 space-y-3">
                  <div className="h-1.5 w-full bg-slate-50 rounded-full" />
                  <div className="h-1.5 w-full bg-slate-50 rounded-full" />
                  <div className="h-1.5 w-2/3 bg-slate-50 rounded-full" />
                </div>
                <div className="mt-12 space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-10 w-10 bg-slate-100 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2.5 w-1/2 bg-slate-100 rounded-full" />
                        <div className="h-1.5 w-full bg-slate-50 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Side */}
            <div className="w-full md:w-[450px] p-10 md:p-14 flex flex-col justify-center bg-card border-l border-border/40 overflow-y-auto relative">
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] w-fit">
                    {pageConfig.modal.badge}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                    {selectedTemplate.name}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                    {selectedTemplate.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-bold flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary/80">
                    <Sparkles className="w-4 h-4 text-primary" />{" "}
                    {pageConfig.modal.featuresTitle}
                  </h4>
                  <ul className="space-y-4">
                    {selectedTemplate.features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-sm font-bold flex items-start gap-4 group/item"
                      >
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="flex-1 leading-snug text-muted-foreground/80 group-hover/item:text-foreground transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-10 border-t border-border space-y-8">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-bold uppercase tracking-[0.2em] text-[10px]">
                      {pageConfig.modal.dimensionsLabel}
                    </span>
                    <Badge
                      variant="outline"
                      className="font-black text-[10px] tracking-tight border-primary/20 bg-primary/5 text-primary px-3 py-1"
                    >
                      {selectedTemplate.dimensions}
                    </Badge>
                  </div>

                  <Link
                    href={`/build/new?template=${selectedTemplate.id}`}
                    className="block"
                  >
                    <Button
                      size="lg"
                      className="w-full gap-2 h-16 shadow-2xl shadow-primary/20 transform transition-all active:scale-[0.98] font-bold text-lg group"
                    >
                      {pageConfig.modal.ctaText}{" "}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
