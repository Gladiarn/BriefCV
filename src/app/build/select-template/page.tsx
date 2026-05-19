"use client";

import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Layers,
  LayoutTemplate,
  Palette,
  Rocket,
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
import type { Template } from "@/types/resume";

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
    <div className="container mx-auto px-4 py-12 md:py-20 relative min-h-screen">
      {/* Background Floating Elements for Energy */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-5 dark:opacity-[0.03]">
        <div className="absolute top-20 left-[10%] animate-float">
          <LayoutTemplate className="w-12 h-12" />
        </div>
        <div
          className="absolute top-40 right-[15%] animate-float"
          style={{ animationDelay: "1s" }}
        >
          <Palette className="w-16 h-16" />
        </div>
        <div
          className="absolute bottom-1/4 left-[5%] animate-float"
          style={{ animationDelay: "2s" }}
        >
          <Zap className="w-10 h-10" />
        </div>
        <div
          className="absolute top-1/2 right-[5%] animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <Rocket className="w-14 h-14" />
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="flex flex-col gap-6">
          <Link href="/build">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 px-0 hover:bg-transparent text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="space-y-4">
            <Badge
              variant="outline"
              className="gap-2 px-4 py-1.5 border-primary/20 bg-primary/5 text-primary text-xs uppercase tracking-tighter font-black shadow-sm"
            >
              <Layers className="w-3.5 h-3.5" />
              Blueprints Library
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
              Choose Your <span className="text-gradient py-2">Blueprint.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl font-medium leading-relaxed">
              Every blueprint is engineered for maximum ATS readability and
              human engagement. Pick one to begin your transformation.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onPreview={handlePreview}
          />
        ))}
      </div>

      {/* Modernized Preview Modal - Performance Optimized */}
      {isOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-md z-[1000] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-5xl rounded-[2.5rem] border border-border shadow-2xl overflow-hidden relative flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[800px] animate-in zoom-in-95 duration-300 ease-out will-change-transform">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-3 hover:bg-muted rounded-full z-20 transition-all active:scale-90 bg-card border border-border shadow-sm will-change-transform"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Preview Side */}
            <div
              className={`flex-1 ${selectedTemplate.thumbnailColor} relative flex items-center justify-center p-8 md:p-12 overflow-hidden group min-h-[350px]`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] opacity-100" />

              <div className="relative w-full max-w-[380px] aspect-[1/1.414] bg-white shadow-xl rounded-sm p-8 flex flex-col gap-4">
                {/* Faux Resume Content skeleton */}
                <div className="h-6 w-1/3 bg-slate-100 rounded" />
                <div className="h-3 w-1/4 bg-slate-50 rounded" />
                <div className="mt-8 space-y-3">
                  <div className="h-2 w-full bg-slate-50 rounded" />
                  <div className="h-2 w-full bg-slate-50 rounded" />
                  <div className="h-2 w-2/3 bg-slate-50 rounded" />
                </div>
                <div className="mt-12 space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-10 w-10 bg-slate-100 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/2 bg-slate-100 rounded" />
                        <div className="h-2 w-full bg-slate-50 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-8 border-t border-slate-50">
                  <div className="h-2 w-full bg-slate-50 rounded" />
                </div>
              </div>
            </div>

            {/* Info Side */}
            <div className="w-full md:w-[420px] p-8 md:p-12 flex flex-col justify-center bg-card border-l border-border overflow-y-auto relative">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black tracking-tighter leading-tight">
                    {selectedTemplate.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed font-medium text-lg">
                    {selectedTemplate.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
                    <Sparkles className="w-4 h-4" /> Core Features
                  </h4>
                  <ul className="space-y-4">
                    {selectedTemplate.features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-sm font-bold flex items-start gap-4 group/item"
                      >
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 transition-colors mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="flex-1 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-10 border-t border-border space-y-8">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
                      Specifications
                    </span>
                    <Badge
                      variant="primary"
                      className="font-black text-[10px] tracking-tight"
                    >
                      {selectedTemplate.dimensions}
                    </Badge>
                  </div>

                  <Link
                    href={`/build/new?template=${selectedTemplate.id}`}
                    className="block"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full gap-2 h-14 shadow-lg shadow-primary/10 transform transition-transform active:scale-95 hover:scale-[1.01] will-change-transform"
                    >
                      Launch Builder{" "}
                      <ArrowRight className="w-5 h-5 transition-transform" />
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
