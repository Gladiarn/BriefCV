"use client";

import { ArrowRight, CheckCircle2, Layout, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/components/layout/footer";
import { TemplateCard } from "@/components/shared/TemplateCard";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/templates";
import { cn } from "@/lib/utils";
import type { Template } from "@/types/resume";

const templatesConfig = {
  header: {
    badge: "Template Gallery",
    titleMain: "Designed for",
    titleGradient: "Performance.",
    description:
      "Every template is meticulously crafted to beat the ATS and captivate human recruiters at first glance.",
  },
  modal: {
    badge: "Selected Blueprint",
    featuresTitle: "Key Features",
    dimensionsLabel: "Dimensions",
    ctaText: "Start with",
  },
};

export default function TemplatesPage() {
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
      {/* Background Creative Blurs - Matching Branding */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/5 blur-[120px] rounded-full translate-y-[-20%]" />
        <div className="absolute bottom-1/4 right-0 w-[40%] h-[40%] bg-primary-purple/5 blur-[100px] rounded-full translate-x-1/4" />
      </div>

      <main className="relative z-10 flex flex-col pt-5">
        <div className="container mx-auto px-4 md:px-6 pb-32">
          <div className="flex flex-col items-center text-center mb-24 space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
              <Layout className="w-3.5 h-3.5" />
              {templatesConfig.header.badge}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
              {templatesConfig.header.titleMain} <br />
              <span className="text-gradient py-2">
                {templatesConfig.header.titleGradient}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              {templatesConfig.header.description}
            </p>
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

        {/* Preview Modal - Creative Overhaul */}
        {isOpen && selectedTemplate && (
          <div className="fixed inset-0 bg-background/80 z-[1000] flex items-center justify-center p-6">
            <div className="bg-card w-full max-w-4xl rounded-[2rem] border border-border shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[85vh]">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-full z-20 border border-border/40 bg-background/50"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Visual Side */}
              <div
                className={cn(
                  "flex-1 relative flex items-center justify-center p-8 md:p-12 overflow-hidden",
                  selectedTemplate.thumbnailColor,
                )}
              >
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative w-full max-w-[320px] aspect-[1/1.414] bg-white shadow-xl rounded-[1rem] p-10 flex flex-col gap-6">
                  <div className="h-8 w-1/2 bg-slate-100 rounded-lg" />
                  <div className="h-3 w-1/3 bg-slate-50 rounded-md" />
                  <div className="mt-12 space-y-4">
                    <div className="h-2 w-full bg-slate-50 rounded-full" />
                    <div className="h-2 w-full bg-slate-50 rounded-full" />
                    <div className="h-2 w-3/4 bg-slate-50 rounded-full" />
                  </div>
                  <div className="mt-8 space-y-4">
                    <div className="h-2 w-full bg-slate-50 rounded-full" />
                    <div className="h-2 w-5/6 bg-slate-50 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-[420px] p-10 md:p-12 flex flex-col justify-center bg-card border-l border-border/40 overflow-y-auto">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] w-fit">
                      {templatesConfig.modal.badge}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                      {selectedTemplate.name}
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {selectedTemplate.description}
                    </p>

                    <div className="space-y-4 pt-2">
                      <h4 className="font-bold flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary/80">
                        <Sparkles className="w-4 h-4 text-primary" />
                        {templatesConfig.modal.featuresTitle}
                      </h4>
                      <ul className="grid grid-cols-1 gap-3">
                        {selectedTemplate.features.map((feature) => (
                          <li
                            key={feature}
                            className="text-sm font-semibold flex items-center gap-3"
                          >
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 className="w-3 text-primary" />
                            </div>
                            <span className="text-muted-foreground/80">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-border/40 space-y-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-bold uppercase tracking-[0.2em]">
                        {templatesConfig.modal.dimensionsLabel}
                      </span>
                      <span className="font-bold bg-secondary px-4 py-1.5 rounded-full border border-border/40">
                        {selectedTemplate.dimensions}
                      </span>
                    </div>

                    <Link
                      href={`/build/new?template=${selectedTemplate.id}`}
                      className="block"
                    >
                      <Button
                        size="lg"
                        className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] group"
                      >
                        {templatesConfig.modal.ctaText} {selectedTemplate.name}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
}
