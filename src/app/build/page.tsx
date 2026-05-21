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

const buildConfig = {
  header: {
    badge: "Active Workbench",
    titleMain: "Master Your",
    titleGradient: "Professional Narrative.",
    description:
      "Your career history, optimized. Forge high-impact achievement sets that bypass filters and captivate recruiters.",
  },
  projects: {
    title: "Recent Projects",
    subtitle: "Your active transformations",
    searchPlaceholder: "Search projects...",
    emptyState: "Forge New",
    emptyStateSubtitle: "Initialize Blueprint",
  },
  templates: {
    badge: "Blueprint Library",
    title: "Explore New Blueprints",
    description:
      "Every template is meticulously crafted to be ATS-optimized and visually stunning.",
  },
};

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

  const handleDeleteResume = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-background page-padding isolate">
      {/* Background Creative Blurs - Matching Landing Page */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-1/4 left-0 w-[40%] h-[40%] bg-primary-purple/5 blur-[120px] rounded-full -translate-x-1/4" />
        <div className="absolute bottom-0 right-1/4 w-[30%] h-[30%] bg-primary/5 blur-[100px] rounded-full translate-y-1/4" />
      </div>

      <main className="relative z-10 flex flex-col pt-5">
        <div className="container mx-auto px-4 md:px-6 flex flex-col gap-32 pb-32">
          {/* Header Section - Unified Sizing */}
          <div className="flex flex-col gap-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] w-fit shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              {buildConfig.header.badge}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
              {buildConfig.header.titleMain} <br />
              <span className="text-gradient py-2">
                {buildConfig.header.titleGradient}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium">
              {buildConfig.header.description}
            </p>
          </div>

          {/* Projects Section */}
          <section className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-border/40">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  {buildConfig.projects.title}
                </h2>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                  {buildConfig.projects.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={buildConfig.projects.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-secondary/50 border border-border/40 rounded-full py-2.5 px-11 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
                <Button
                  variant="outline"
                  size="md"
                  className="hidden md:flex rounded-full border-border/60"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {/* Create New Project Card - Simplified Animations */}
              <Link
                href="/build/select-template"
                className="group h-full min-h-[420px]"
              >
                <div className="h-full border-2 border-dashed border-border/40 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 flex flex-col items-center justify-center p-8 gap-6 rounded-[2.5rem] relative overflow-hidden">
                  <div className="w-20 h-20 rounded-[2rem] bg-secondary flex items-center justify-center transition-colors duration-200 shadow-sm relative z-10">
                    <Plus className="w-10 h-10 text-primary" />
                  </div>
                  <div className="text-center space-y-2 relative z-10">
                    <p className="font-bold text-2xl tracking-tight transition-colors group-hover:text-primary">
                      {buildConfig.projects.emptyState}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
                      {buildConfig.projects.emptyStateSubtitle}
                    </p>
                  </div>

                  {/* Decorative background shape for empty state - static */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>

              {isLoading
                ? [...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-[420px] animate-pulse bg-secondary/30 rounded-[2.5rem]"
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
                        onDelete={handleDeleteResume}
                      />
                    );
                  })}
            </div>
          </section>

          {/* Templates Gallery */}
          <section className="space-y-16 pt-16">
            <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5" />
                {buildConfig.templates.badge}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {buildConfig.templates.title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {buildConfig.templates.description}
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

      {/* Preview Modal - Creative Overhaul */}
      {isPreviewOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-2xl z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="bg-card w-full max-w-5xl rounded-[3.5rem] border border-border/50 shadow-[0_32px_128px_rgba(0,0,0,0.1)] overflow-hidden relative flex flex-col md:flex-row h-full max-h-[85vh] animate-in zoom-in-95 duration-700 ease-out">
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
              {/* Background Accents */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative w-full max-w-[340px] aspect-[1/1.414] bg-white shadow-[0_40px_80px_rgba(0,0,0,0.12)] rounded-[1.5rem] p-12 flex flex-col gap-6 transform -rotate-2 hover:rotate-0 transition-transform duration-700 group">
                <div className="h-8 w-1/2 bg-slate-100 rounded-lg" />
                <div className="h-3 w-1/3 bg-slate-50 rounded-md" />
                <div className="mt-12 space-y-4">
                  <div className="h-2 w-full bg-slate-50 rounded-full" />
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
            <div className="w-full md:w-[480px] p-12 md:p-16 flex flex-col justify-center bg-card border-l border-border/40 overflow-y-auto">
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] w-fit">
                    Selected Blueprint
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                    {selectedTemplate.name}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {selectedTemplate.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {selectedTemplate.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-12 border-t border-border/40">
                  <Link
                    href={`/build/new?template=${selectedTemplate.id}`}
                    className="block"
                  >
                    <Button
                      size="lg"
                      className="w-full h-16 text-lg font-bold shadow-2xl shadow-primary/20 transition-all active:scale-[0.98] group"
                    >
                      Launch Builder
                      <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
