"use client";

import { Minus, Plus, RefreshCw } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";
import { UnifiedRenderer } from "@/components/shared/UnifiedRenderer";
import { Button } from "@/components/ui/button";
import { useCVStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const RightPanel: React.FC = () => {
  const { cvDocument, exportToPdfTrigger } = useCVStore();

  // Use react-to-pdf
  const { toPDF, targetRef } = usePDF({
    filename: `${cvDocument?.title || "resume"}.pdf`,
    page: { format: "a4" },
  });

  // Effect to trigger export when store trigger is called
  useEffect(() => {
    if (exportToPdfTrigger) {
      toPDF();
    }
  }, [exportToPdfTrigger, toPDF]);

  const [zoom, setZoom] = useState(1);

  if (!cvDocument) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.4));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="flex-1 h-full bg-secondary/10 overflow-hidden flex flex-col items-center relative">
      {/* Zoom Controls Overlay */}
      <div className="absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-background/80 backdrop-blur-xl border border-border/40 p-2 rounded-2xl shadow-2xl">
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

      <div className="flex-1 w-full overflow-auto custom-scrollbar flex flex-col items-center py-16">
        {/* A4 Sheet */}
        <div
          id={`cv-preview-${cvDocument.id}`}
          ref={targetRef}
          className={cn(
            "bg-white shadow-2xl origin-top transition-all duration-300",
            "w-[210mm] min-h-[297mm] !block cv-preview-element",
          )}
          style={{
            transform: `scale(${zoom})`,
          }}
        >
          <UnifiedRenderer
            key={`${cvDocument.id}-${cvDocument.settings.templateId}-${JSON.stringify(cvDocument.settings)}`}
            data={cvDocument}
          />
        </div>
      </div>
    </div>
  );
};
