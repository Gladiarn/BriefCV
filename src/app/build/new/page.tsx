"use client";

import {
  Briefcase,
  ChevronLeft,
  Download,
  GraduationCap,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AIForgeTab } from "@/components/sections/build/AIForgeTab";
import { EditorSidebar } from "@/components/sections/build/EditorSidebar";
import { PreviewCanvas } from "@/components/sections/build/PreviewCanvas";
import { Button } from "@/components/ui/button";
import { resumeService } from "@/services/resumeService";
import type { ResumeData } from "@/types/resume";

const DEFAULT_RESUME: ResumeData = {
  name: "",
  role: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  experience: [],
  education: [],
  skills: [],
  templateId: "modern",
};

function EditorContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("basics");
  const [zoom, setZoom] = useState(100);
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const templateId = searchParams.get("template");
    const resumeId = searchParams.get("id");

    if (templateId) {
      setResumeData((prev) => ({ ...prev, templateId }));
    }

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
    }
  }, [searchParams]);

  if (isFetching) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="font-bold tracking-widest uppercase text-xs text-muted-foreground animate-pulse">
          Forging your data...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden relative z-[100]">
      {/* Left Sidebar - Configuration Form */}
      <aside className="w-[450px] border-r border-border bg-card flex flex-col z-20 shadow-2xl">
        {/* Editor Header */}
        <header className="p-4 border-b border-border flex items-center justify-between bg-background/50 backdrop-blur-md sticky top-0 z-10">
          <Link href="/build">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Exit Forge
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Draft Mode
            </span>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex border-b border-border bg-muted/20">
          {[
            { id: "basics", icon: User, label: "Basics" },
            { id: "experience", icon: Briefcase, label: "Work" },
            { id: "education", icon: GraduationCap, label: "Edu" },
            { id: "ai", icon: Sparkles, label: "AI Forge" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 flex flex-col items-center gap-1.5 transition-all relative ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-gradient" />
              )}
            </button>
          ))}
        </nav>

        {/* Form Content */}
        {activeTab === "ai" ? (
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <AIForgeTab />
          </div>
        ) : (
          <EditorSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}

        {/* Footer Actions */}
        <footer className="p-6 border-t border-border bg-background/50 backdrop-blur-md">
          <Button
            className="w-full gap-2 shadow-xl shadow-pink-500/20"
            size="xl"
          >
            <Download className="w-5 h-5" />
            Export PDF
          </Button>
        </footer>
      </aside>

      {/* Right Canvas - Preview Area */}
      <PreviewCanvas resumeData={resumeData} zoom={zoom} setZoom={setZoom} />
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading Forge...
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
