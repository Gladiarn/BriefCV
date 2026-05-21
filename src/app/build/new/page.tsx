"use client";

import {
  ChevronLeft,
  Download,
  Eye,
  FileText,
  Settings2,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { AIForgeTab } from "@/components/sections/build/AIForgeTab";
import { EditorSidebar } from "@/components/sections/build/EditorSidebar";
import { PreviewCanvas } from "@/components/sections/build/PreviewCanvas";
import { Button } from "@/components/ui/button";
import { ALL_SECTIONS, templates } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { resumeService } from "@/services/resumeService";
import type { FormSection, ResumeData } from "@/types/resume";

const DEFAULT_RESUME: ResumeData = {
  name: "",
  role: "",
  image: "",
  email: "",
  phone: "",
  location: "",
  portfolio: "",
  github: "",
  summary: "",
  experience: [],
  education: [],
  projects: [],
  skills: [],
  awards: [],
  templateId: "modern",
};

function EditorContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("basics");
  const [zoom, setZoom] = useState(100);
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME);
  const [isFetching, setIsFetching] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Custom Sections State
  const [visibleSections, setVisibleSections] = useState<FormSection[]>([]);

  // Mobile UI State
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");

  const activeTemplate = useMemo(() => {
    return (
      templates.find((t) => t.id === resumeData.templateId) || templates[0]
    );
  }, [resumeData.templateId]);

  useEffect(() => {
    if (activeTemplate && visibleSections.length === 0) {
      setVisibleSections(activeTemplate.sections);
    }
  }, [activeTemplate, visibleSections]);

  const handleAddSection = (section: FormSection) => {
    if (!visibleSections.find((s) => s.id === section.id)) {
      setVisibleSections([...visibleSections, section]);
    }
    setActiveTab(section.id);
  };

  const handleRemoveSection = (sectionId: string) => {
    if (sectionId === "basics") return; // Cannot remove basics
    setVisibleSections(visibleSections.filter((s) => s.id !== sectionId));
    if (activeTab === sectionId) setActiveTab("basics");
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resumeData.name || "resume"}.pdf`;
      a.click();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const templateId = searchParams.get("template");
    const resumeId = searchParams.get("id");

    if (resumeId) {
      const fetchResume = async () => {
        setIsFetching(true);
        try {
          const data = await resumeService.getResumeById(resumeId);
          if (data) {
            setResumeData(data);
          }
        } catch (error) {
          console.error("Failed to fetch resume:", error);
        } finally {
          setIsFetching(false);
        }
      };
      fetchResume();
    } else if (templateId) {
      const template =
        templates.find((t) => t.id === templateId) || templates[0];
      setResumeData(template.defaultData);
    } else {
      setResumeData(DEFAULT_RESUME);
    }
  }, [searchParams]);

  if (isFetching) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-4 px-6 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="font-bold tracking-widest uppercase text-[10px] text-muted-foreground animate-pulse">
          Forging your data...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background overflow-hidden relative lg:z-[100]">
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/build">
          <Button
            variant="ghost"
            size="sm"
            className="w-9 h-9 p-0 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>

        <div className="flex bg-secondary/50 rounded-full p-1 border border-border/40">
          <button
            type="button"
            onClick={() => setMobileView("edit")}
            className={cn(
              "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
              mobileView === "edit"
                ? "bg-background text-primary shadow-sm"
                : "text-muted-foreground",
            )}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-3 h-3" /> Edit
            </div>
          </button>
          <button
            type="button"
            onClick={() => setMobileView("preview")}
            className={cn(
              "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
              mobileView === "preview"
                ? "bg-background text-primary shadow-sm"
                : "text-muted-foreground",
            )}
          >
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3" /> Preview
            </div>
          </button>
        </div>

        <Button
          size="sm"
          className="w-9 h-9 p-0 rounded-full shadow-lg shadow-primary/20"
          onClick={handleExport}
          disabled={isExporting}
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor Container */}
      <aside
        className={cn(
          "w-full lg:w-[450px] border-r border-border bg-card flex flex-col z-20 transition-all h-full",
          mobileView === "preview" && "hidden lg:flex",
        )}
      >
        {/* Editor Header - Desktop */}
        <header className="hidden lg:flex p-4 border-b border-border items-center justify-between bg-background/50 backdrop-blur-md sticky top-0 z-10">
          <Link href="/build">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 rounded-full font-bold text-[10px] uppercase tracking-wider"
            >
              <ChevronLeft className="w-4 h-4" />
              Exit Forge
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
              Live Draft
            </span>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex border-b border-border bg-muted/10 overflow-x-auto no-scrollbar">
          {visibleSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveTab(section.id)}
                className={cn(
                  "flex-1 min-w-[70px] py-4 flex flex-col items-center gap-1.5 transition-all relative shrink-0",
                  activeTab === section.id
                    ? "text-primary bg-primary/[0.03]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span className="text-[9px] font-bold uppercase tracking-tighter">
                  {section.id === "basics"
                    ? "Info"
                    : section.id === "experience"
                      ? "Work"
                      : section.id === "education"
                        ? "Edu"
                        : section.title}
                </span>
                {activeTab === section.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full mx-2" />
                )}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={cn(
              "flex-1 min-w-[70px] py-4 flex flex-col items-center gap-1.5 transition-all relative shrink-0",
              activeTab === "ai"
                ? "text-pink-500 bg-pink-500/[0.03]"
                : "text-muted-foreground hover:text-pink-500",
            )}
          >
            <Wand2 className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-tighter">
              AI Forge
            </span>
            {activeTab === "ai" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-full mx-2" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("manage")}
            className={cn(
              "flex-1 min-w-[70px] py-4 flex flex-col items-center gap-1.5 transition-all relative shrink-0 border-l border-border/40",
              activeTab === "manage"
                ? "text-foreground bg-secondary/30"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Settings2 className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-tighter">
              Sections
            </span>
            {activeTab === "manage" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full mx-2" />
            )}
          </button>
        </nav>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent to-secondary/5">
          {activeTab === "ai" ? (
            <div className="p-6">
              <AIForgeTab />
            </div>
          ) : activeTab === "manage" ? (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="space-y-1">
                <h2 className="text-xl font-black tracking-tight">
                  Section Manager
                </h2>
                <p className="text-xs text-muted-foreground">
                  Add or remove components from your blueprint.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {ALL_SECTIONS.map((section) => {
                  const isVisible = visibleSections.find(
                    (s) => s.id === section.id,
                  );
                  return (
                    <div
                      key={section.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border transition-all",
                        isVisible
                          ? "bg-primary/[0.03] border-primary/20"
                          : "bg-card border-border/60",
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
                            isVisible
                              ? "bg-primary/10 text-primary"
                              : "bg-secondary text-muted-foreground",
                          )}
                        >
                          <section.icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold tracking-tight">
                            {section.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {section.id === "basics"
                              ? "Core Identity (Required)"
                              : "Optional Component"}
                          </span>
                        </div>
                      </div>

                      {section.id !== "basics" && (
                        <Button
                          size="sm"
                          variant={isVisible ? "ghost" : "secondary"}
                          className={cn(
                            "rounded-full px-4 h-8 text-[10px] font-bold uppercase tracking-wider",
                            !isVisible &&
                              "bg-primary text-primary-foreground hover:bg-primary/90",
                          )}
                          onClick={() =>
                            isVisible
                              ? handleRemoveSection(section.id)
                              : handleAddSection(section)
                          }
                        >
                          {isVisible ? "Remove" : "Add Section"}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <EditorSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          )}
        </div>

        {/* Footer Actions - Desktop */}
        <footer className="hidden lg:block p-6 border-t border-border bg-background/50 backdrop-blur-md">
          <Button
            className="w-full gap-2 shadow-xl shadow-primary/10 font-bold uppercase tracking-widest text-[11px] h-12 rounded-2xl"
            size="lg"
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download className="w-4 h-4" />
            {isExporting ? "Exporting..." : "Export Resume"}
          </Button>
        </footer>
      </aside>

      {/* Preview Area */}
      <div
        className={cn(
          "flex-1 h-full transition-all",
          mobileView === "edit" && "hidden lg:flex",
        )}
      >
        <PreviewCanvas resumeData={resumeData} zoom={zoom} setZoom={setZoom} />
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex flex-col items-center justify-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Loading Forge...
          </p>
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
