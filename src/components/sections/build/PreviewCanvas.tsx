"use client";

import { Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import { templates } from "@/lib/templates";
import type { ResumeData } from "@/types/resume";

interface PreviewCanvasProps {
  resumeData: ResumeData;
  zoom: number;
  setZoom: (zoom: number | ((prev: number) => number)) => void;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  resumeData,
  zoom,
  setZoom,
}) => {
  const template =
    templates.find((t) => t.id === resumeData.templateId) || templates[0];
  const TemplateComponent = template.component;

  return (
    <main className="flex-1 bg-muted/30 relative flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Canvas Controls */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card/80 backdrop-blur-md border border-border p-1.5 rounded-2xl shadow-xl z-10">
        <button
          type="button"
          onClick={() => setZoom((prev) => Math.max(50, prev - 10))}
          className="p-2 hover:bg-muted rounded-xl transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold w-12 text-center">{zoom}%</span>
        <button
          type="button"
          onClick={() => setZoom((prev) => Math.min(150, prev + 10))}
          className="p-2 hover:bg-muted rounded-xl transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        <button
          type="button"
          onClick={() => setZoom(100)}
          className="p-2 hover:bg-muted rounded-xl transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Paper Canvas */}
      <div
        className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] origin-top transition-transform duration-300 overflow-y-auto custom-scrollbar"
        style={{
          width: "210mm",
          height: "297mm",
          transform: `scale(${zoom / 100})`,
          padding: "20mm",
        }}
      >
        <TemplateComponent data={resumeData} />
      </div>
    </main>
  );
};
