"use client";

import { Minus, Plus, RefreshCw } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCVStore } from "@/lib/store";
import { templates } from "@/lib/templates";
import { cn } from "@/lib/utils";

export const RightPanel: React.FC = () => {
  const { cvDocument } = useCVStore();
  const [zoom, setZoom] = useState(1);

  if (!cvDocument) return null;

  const { settings, sections } = cvDocument;
  const activeTemplate =
    templates.find((t) => t.id === settings.templateId) || templates[0];
  const TemplateRenderer = activeTemplate.component;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.4));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="flex-1 h-full bg-secondary/10 overflow-hidden flex flex-col items-center relative">
      {/* Zoom Controls Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-background/80 backdrop-blur-xl border border-border/40 p-2 rounded-2xl shadow-2xl">
        <Button
          variant="ghost"
          size="sm"
          className="w-9 h-9 p-0 rounded-xl"
          onClick={handleZoomOut}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <div className="w-16 text-center text-[11px] font-black uppercase tracking-widest text-muted-foreground">
          {Math.round(zoom * 100)}%
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-9 h-9 p-0 rounded-xl"
          onClick={handleZoomIn}
        >
          <Plus className="w-4 h-4" />
        </Button>
        <div className="w-px h-4 bg-border/40 mx-1" />
        <Button
          variant="ghost"
          size="sm"
          className="w-9 h-9 p-0 rounded-xl"
          onClick={handleResetZoom}
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 w-full overflow-auto p-12 custom-scrollbar flex flex-col items-center">
        {/* A4 Sheet */}
        <div
          className={cn(
            "bg-white shadow-2xl origin-top transition-all duration-300 p-[15mm] mb-20",
            "w-[210mm] min-h-[297mm]",
          )}
          style={{
            transform: `scale(${zoom})`,
          }}
        >
          <TemplateRenderer doc={cvDocument} />
        </div>
      </div>
    </div>
  );
};
