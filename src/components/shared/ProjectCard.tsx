"use client";

import { Clock, Download, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type ResumeMetadata, resumeService } from "@/services/resumeService";
import type { Template } from "@/types/resume";

interface ProjectCardProps {
  resume: ResumeMetadata;
  template: Template;
  onDelete?: (id: string) => void;
}

export function ProjectCard({ resume, template, onDelete }: ProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Are you sure you want to delete this project?")) {
      setIsDeleting(true);
      try {
        await resumeService.deleteResume(resume.id);
        onDelete?.(resume.id);
      } catch (error) {
        console.error("Failed to delete project:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`/api/export?id=${resume.id}`, "_blank");
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col h-full bg-card border border-border/40 rounded-[2.5rem] overflow-hidden transition-all duration-200 hover:border-primary/20 hover:shadow-md",
        isDeleting && "opacity-50 pointer-events-none",
      )}
    >
      {/* Visual Area - Enlarged & Minimalist */}
      <div
        className={cn(
          "aspect-[4/3] relative overflow-hidden transition-colors duration-200",
          template.thumbnailColor,
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full h-full bg-background/20 backdrop-blur-md rounded-2xl border border-white/5 shadow-sm flex flex-col gap-3 p-6 transition-colors duration-200 group-hover:bg-background/25">
            <div className="h-3 w-1/2 bg-white/10 rounded-full" />
            <div className="h-1.5 w-1/3 bg-white/5 rounded-full" />
            <div className="mt-4 space-y-2">
              <div className="h-1 w-full bg-white/5 rounded-full" />
              <div className="h-1 w-full bg-white/5 rounded-full" />
              <div className="h-1 w-3/4 bg-white/5 rounded-full" />
            </div>
          </div>
        </div>

        {/* Action Overlay - Fast & Clean */}
        <div className="absolute inset-0 bg-background/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3 p-8 z-10">
          <Link href={`/build/new?id=${resume.id}`} className="w-full">
            <Button className="w-full rounded-full h-11 bg-white text-black hover:bg-white/90 shadow-sm transition-colors font-bold text-xs uppercase tracking-wider">
              Continue Forging
            </Button>
          </Link>

          <div className="flex gap-3 w-full">
            <Button
              onClick={handleDownload}
              variant="secondary"
              className="flex-1 rounded-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors font-bold text-xs uppercase tracking-wider"
            >
              <Download className="w-3.5 h-3.5 mr-2" />
              Export
            </Button>
            <Button
              onClick={handleDelete}
              variant="secondary"
              className="w-11 h-11 rounded-full p-0 bg-background/80 hover:bg-destructive hover:text-destructive-foreground border-border/40 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Info Section - Minimalist & Clean */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
              {resume.title}
            </h3>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 shrink-0">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                {template.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-semibold uppercase tracking-widest opacity-60">
            <Clock className="w-3.5 h-3.5" />
            Last edited {resume.lastEdited}
          </div>
        </div>
      </div>
    </div>
  );
}
