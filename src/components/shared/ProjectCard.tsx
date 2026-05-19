"use client";

import { ArrowRight, Clock, FileText, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ResumeMetadata } from "@/services/resumeService";
import type { Template } from "@/types/resume";

interface ProjectCardProps {
  resume: ResumeMetadata;
  template: Template;
}

export function ProjectCard({ resume, template }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col h-full bg-card border border-border/50 rounded-[2rem] overflow-hidden hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-black/[0.03]">
      {/* Visual Area */}
      <div
        className={cn(
          "h-48 relative transition-colors duration-500 overflow-hidden",
          template.thumbnailColor,
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText className="w-16 h-16 text-foreground/10 group-hover:scale-110 transition-transform duration-500" />
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 p-8">
          <Link href={`/build/new?id=${resume.id}`} className="w-full">
            <Button className="w-full rounded-full h-12 bg-white text-black hover:bg-white/90 shadow-xl shadow-black/5 active:scale-95 transition-all">
              Continue Forge <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* ID Badge */}
        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 backdrop-blur-md border border-white/10">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-foreground/60">
            {resume.id.slice(0, 8)}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight line-clamp-1">
              {resume.title}
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-2 py-0.5 rounded-md bg-primary/5">
                {template.name}
              </span>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {resume.lastEdited}
              </span>
            </div>
          </div>
          <button type="button" className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Status */}
        <div className="mt-auto pt-6 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Ready to Export
            </span>
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-card bg-secondary flex items-center justify-center text-[8px] font-bold"
              >
                AI
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
