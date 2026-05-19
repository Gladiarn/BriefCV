"use client";

import { Download, Plus, Rocket, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Footer } from "@/components/layout/footer";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { TemplateCard } from "@/components/shared/TemplateCard";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { type ResumeMetadata, resumeService } from "@/services/resumeService";
import type { Template } from "@/types/resume";

export default function BuildPage() {
  const [resumes, setResumes] = useState<ResumeMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await resumeService.getUserResumes();
        setResumes(data);
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const filteredResumes = useMemo(() => {
    return resumes.filter((r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [resumes, searchQuery]);

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-background page-padding isolate">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-primary-purple/5 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 flex flex-col">
        <div className="container mx-auto px-4 md:px-6 flex flex-col gap-24 pb-32 pt-5">
          {/* Header Section */}
          <div className="flex flex-col gap-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em] w-fit">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Active Workbench
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Master Your <br />
              <span className="text-gradient">Professional Narrative.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Your career history, optimized. Forge high-impact achievement sets
              that bypass filters and captivate recruiters.
            </p>
          </div>

          {/* Projects Section */}
          <section className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-border/40">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Recent Projects
                </h2>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                  Your active transformations
                </p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-secondary/50 border border-border/40 rounded-full py-2.5 px-11 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <Button
                  variant="secondary"
                  size="md"
                  className="hidden md:flex"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {/* Create New Project Card */}
              <Link
                href="/build/select-template"
                className="group h-full min-h-[400px]"
              >
                <div className="h-full border-2 border-dashed border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-500 flex flex-col items-center justify-center p-8 gap-6 rounded-[2rem] relative overflow-hidden">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl shadow-black/[0.03]">
                    <Plus className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="font-bold text-xl tracking-tight">
                      Forge New
                    </p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                      Initialize Blueprint
                    </p>
                  </div>
                </div>
              </Link>

              {isLoading
                ? [...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-[400px] animate-pulse bg-secondary/30 rounded-[2rem]"
                    />
                  ))
                : filteredResumes.map((resume) => {
                    const template =
                      templates.find((t) => t.id === resume.templateId) ||
                      templates[0];
                    return (
                      <ProjectCard
                        key={resume.id}
                        resume={resume}
                        template={template}
                      />
                    );
                  })}
            </div>
          </section>

          {/* Templates Gallery */}
          <section className="space-y-16 pt-16">
            <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em]">
                Blueprint Library
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Explore New Blueprints
              </h2>
              <p className="text-muted-foreground">
                Every template is meticulously crafted to be ATS-optimized and
                visually stunning.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onPreview={handlePreview}
                />
              ))}
            </div>
          </section>
        </div>
        <Footer />
      </main>

      {/* Preview Modal - Minimalist Overhaul */}
      {isPreviewOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-background/40 backdrop-blur-xl z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-card w-full max-w-5xl rounded-[3rem] border border-border/40 shadow-2xl overflow-hidden relative flex flex-col md:flex-row h-full max-h-[85vh] animate-in zoom-in-95 duration-500 ease-out">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-8 right-8 p-3 hover:bg-secondary rounded-full z-20 transition-all active:scale-95 border border-border/40 bg-background/50 backdrop-blur-md"
            >
              <Plus className="w-5 h-5 rotate-45" />
            </button>

            {/* Visual Side */}
            <div
              className={cn(
                "flex-1 relative flex items-center justify-center p-12 overflow-hidden",
                selectedTemplate.thumbnailColor,
              )}
            >
              <div className="relative w-full max-w-[320px] aspect-[1/1.414] bg-white shadow-2xl rounded-lg p-10 flex flex-col gap-4 transform -rotate-1">
                <div className="h-6 w-1/3 bg-slate-100 rounded" />
                <div className="h-2 w-1/4 bg-slate-50 rounded" />
                <div className="mt-8 space-y-3">
                  <div className="h-1.5 w-full bg-slate-50 rounded" />
                  <div className="h-1.5 w-full bg-slate-50 rounded" />
                  <div className="h-1.5 w-2/3 bg-slate-50 rounded" />
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-[450px] p-12 flex flex-col justify-center bg-card border-l border-border/40 overflow-y-auto">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold tracking-tight leading-tight">
                    {selectedTemplate.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedTemplate.description}
                  </p>
                </div>

                <div className="pt-12 border-t border-border/40">
                  <Link
                    href={`/build/new?template=${selectedTemplate.id}`}
                    className="block"
                  >
                    <Button
                      size="lg"
                      className="w-full h-14 text-base font-bold shadow-xl shadow-primary/20 transition-all active:scale-95"
                    >
                      Launch Builder
                      <Rocket className="w-5 h-5 ml-2" />
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
