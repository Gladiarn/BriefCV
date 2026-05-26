"use client";

import {
  Check,
  Clock,
  Download,
  Edit3,
  Loader2,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type ResumeMetadata, resumeService } from "@/services/resumeService";
import type { Template } from "@/types/resume";

interface ProjectCardProps {
  resume: ResumeMetadata;
  template: Template;
  onDelete?: (id: string) => void;
}

export function ProjectCard({ resume, template, onDelete }: ProjectCardProps) {
  const [isDeleting, _setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(resume.title);
  const [currentTitle, setCurrentTitle] = useState(resume.title);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing">("idle");

  useEffect(() => {
    if (isConfirmingDelete) {
      const timer = setTimeout(() => setIsConfirmingDelete(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isConfirmingDelete]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isConfirmingDelete) {
      setStatus("processing");
      try {
        await resumeService.deleteResume(resume.id);
        onDelete?.(resume.id);
      } catch (error) {
        console.error("Failed to delete project:", error);
        setIsConfirmingDelete(false);
        setStatus("idle");
      }
    } else {
      setIsConfirmingDelete(true);
    }
  };

  const handleRename = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (newTitle.trim() === "" || newTitle === currentTitle) {
      setIsEditing(false);
      return;
    }

    setStatus("processing");
    try {
      await resumeService.renameResume(resume.id, newTitle);
      setCurrentTitle(newTitle);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to rename project:", error);
      setNewTitle(currentTitle);
      setIsEditing(false);
    } finally {
      setStatus("idle");
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
        (isDeleting || status === "processing") && "pointer-events-none",
      )}
    >
      {/* Processing Overlay */}
      {status === "processing" && (
        <div className="absolute inset-0 z-[100] bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 animate-in fade-in duration-300">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            Processing
          </p>
        </div>
      )}

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
            <button
              type="button"
              onClick={handleDelete}
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 border shadow-sm",
                isConfirmingDelete
                  ? "bg-destructive text-white border-destructive"
                  : "bg-background text-destructive border-border/40 hover:bg-destructive/10",
              )}
            >
              {isConfirmingDelete ? (
                <Check className="w-4 h-4 pointer-events-none" />
              ) : (
                <Trash2 className="w-4 h-4 pointer-events-none" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Info Section - Minimalist & Clean */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              {isEditing ? (
                <div
                  role="button"
                  tabIndex={0}
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.key === "Enter" && e.stopPropagation()}
                >
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="h-8 text-sm font-bold p-2"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleRename}
                    className="p-1 hover:bg-primary/10 rounded-full text-primary"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setNewTitle(currentTitle);
                    }}
                    className="p-1 hover:bg-destructive/10 rounded-full text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group/title">
                  <h3 className="text-lg font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                    {currentTitle}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="opacity-0 group-hover/title:opacity-100 p-1 hover:bg-secondary rounded-lg transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
              )}
            </div>
            {!isEditing && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 shrink-0">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                  {template.name}
                </span>
              </div>
            )}
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
