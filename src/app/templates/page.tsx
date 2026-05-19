"use client";

import { ArrowRight, CheckCircle2, Layout, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/components/layout/footer";
import { TemplateCard } from "@/components/shared/TemplateCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/templates";
import type { Template } from "@/types/resume";

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
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <main className="relative z-10 flex flex-col">
        <div className="container mx-auto px-4 md:px-6 pb-32 pt-12 md:pt-20">
          <div className="flex flex-col items-center text-center mb-24 space-y-6">
            <Badge
              variant="outline"
              className="gap-2 px-4 py-1 border-primary/20 bg-primary/5 text-primary"
            >
              <Layout className="w-3.5 h-3.5" />
              Template Gallery
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
              Designed for <br />
              <span className="text-gradient py-2">Performance.</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl font-medium">
              Every template is meticulously crafted to beat the ATS and
              captivate human recruiters at first glance.
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

        {/* Preview Modal - Optimized for Performance */}
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
                className={`flex-1 ${selectedTemplate.thumbnailColor} relative flex items-center justify-center p-8 md:p-12 overflow-hidden group min-h-[300px]`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5" />
                <div className="relative w-full max-w-[400px] aspect-[1/1.414] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm p-8 flex flex-col gap-4">
                  <div className="h-6 w-1/3 bg-slate-100 rounded" />
                  <div className="h-3 w-1/4 bg-slate-50 rounded" />
                  <div className="mt-8 space-y-3">
                    <div className="h-2 w-full bg-slate-50 rounded" />
                    <div className="h-2 w-full bg-slate-50 rounded" />
                    <div className="h-2 w-2/3 bg-slate-50 rounded" />
                  </div>
                  <div className="mt-12 space-y-6">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 bg-slate-100 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/2 bg-slate-100 rounded" />
                        <div className="h-2 w-full bg-slate-50 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Side */}
              <div className="w-full md:w-[420px] p-8 md:p-12 flex flex-col justify-center bg-card border-l border-border overflow-y-auto">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-4xl font-black tracking-tight mb-4">
                      {selectedTemplate.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed font-medium text-lg">
                      {selectedTemplate.description}
                    </p>
                  </div>

                  <div className="space-y-5">
                    <h4 className="font-bold flex items-center gap-2 text-sm uppercase tracking-widest text-primary/80">
                      <Sparkles className="w-4 h-4 text-primary" /> Key Features
                    </h4>
                    <ul className="space-y-4">
                      {selectedTemplate.features.map((feature, i) => (
                        <li
                          key={i}
                          className="text-sm font-semibold flex items-start gap-3 group"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="flex-1 leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 border-t border-border space-y-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-medium uppercase tracking-wider text-xs">
                        Dimensions
                      </span>
                      <span className="font-bold bg-muted px-3 py-1 rounded-full">
                        {selectedTemplate.dimensions}
                      </span>
                    </div>

                    <Link
                      href={`/build/new?template=${selectedTemplate.id}`}
                      className="block"
                    >
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full gap-2 h-14 shadow-lg shadow-primary/10 transform transition-all active:scale-95 hover:scale-[1.01] will-change-transform"
                      >
                        Start with {selectedTemplate.name}{" "}
                        <ArrowRight className="w-5 h-5" />
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
