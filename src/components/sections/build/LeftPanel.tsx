"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Bot, Layout, Palette, Plus, Send, Settings } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCVStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { cvService } from "@/services/cvService";
import type { ColumnMapping } from "@/types/cv";
import { SectionForm } from "./forms/SectionForm";

export const LeftPanel: React.FC = () => {
  const {
    cvDocument,
    reorderSections,
    addSection,
    updateLayoutStructure,
    updateDesign,
  } = useCVStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "header-1",
  );
  const [activeTab, setActiveTab] = useState<
    "content" | "layout" | "design" | "ai"
  >("content");

  if (!cvDocument) return null;

  const { columnMapping, layoutStructure } = cvDocument.settings;

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    reorderSections(
      result.source.droppableId as keyof ColumnMapping,
      result.destination.droppableId as keyof ColumnMapping,
      result.source.index,
      result.destination.index,
    );
  };

  const renderSectionList = (columnId: keyof ColumnMapping) => {
    const sectionIds = columnMapping[columnId];
    return (
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4 min-h-[100px]"
          >
            {sectionIds.map((id, index) => {
              const section = cvDocument.sections[id];
              if (!section) return null;
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <SectionForm
                        section={section}
                        isExpanded={expandedSection === id}
                        onToggleExpand={() =>
                          setExpandedSection(expandedSection === id ? null : id)
                        }
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background border-r border-border">
      {/* Tab Navigation */}
      <div className="flex border-b border-border bg-muted/5 p-1 gap-1">
        {[
          { id: "content", icon: Settings, label: "Content" },
          { id: "layout", icon: Layout, label: "Layout" },
          { id: "design", icon: Palette, label: "Design" },
          { id: "ai", icon: Bot, label: "AI" },
        ].map((tab) => (
          <Button
            key={tab.id}
            type="button"
            variant={activeTab === tab.id ? "secondary" : "ghost"}
            size="sm"
            className="flex-1 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2"
            onClick={() => setActiveTab(tab.id as any)}
          >
            <tab.icon className="w-3.5 h-3.5" /> {tab.label}
          </Button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {activeTab === "content" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-black tracking-tight">
                  Forge Center
                </h2>
                <p className="text-xs text-muted-foreground">
                  Customize your professional blueprint
                </p>
              </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              {layoutStructure === "1-column" ? (
                renderSectionList("mainColumn")
              ) : layoutStructure === "2-column" ? (
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">
                      Left Column
                    </h3>
                    {renderSectionList("leftColumn")}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">
                      Right Column
                    </h3>
                    {renderSectionList("rightColumn")}
                  </div>
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">
                      Left
                    </h3>
                    {renderSectionList("leftColumn")}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">
                      Middle
                    </h3>
                    {renderSectionList("middleColumn")}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">
                      Right
                    </h3>
                    {renderSectionList("rightColumn")}
                  </div>
                </div>
              )}
            </DragDropContext>

            <div className="pt-4 flex flex-wrap gap-3">
              {(["experience", "education", "skills"] as const).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full border-dashed border-border/60 text-[9px] font-black uppercase tracking-widest hover:border-primary/40 hover:text-primary transition-all"
                  onClick={() => addSection(type)}
                >
                  <Plus className="w-3 h-3 mr-1.5" /> Add {type}
                </Button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "layout" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="space-y-1">
              <h2 className="text-xl font-black tracking-tight">
                Structural Layout
              </h2>
              <p className="text-xs text-muted-foreground">
                Select your CV's column architecture
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {(["1-column", "2-column", "3-column"] as const).map((layout) => (
                <button
                  key={layout}
                  type="button"
                  onClick={() => updateLayoutStructure(layout)}
                  className={cn(
                    "flex flex-col items-center gap-3 p-4 rounded-3xl border transition-all",
                    layoutStructure === layout
                      ? "bg-primary/5 border-primary shadow-lg shadow-primary/5"
                      : "bg-card border-border/60 hover:border-primary/20",
                  )}
                >
                  <div className="w-full aspect-[3/4] bg-muted/30 rounded-lg flex gap-1 p-2">
                    {layout === "1-column" && (
                      <div className="w-full bg-primary/20 rounded-sm" />
                    )}
                    {layout === "2-column" && (
                      <>
                        <div className="w-1/3 bg-primary/20 rounded-sm" />
                        <div className="w-2/3 bg-primary/20 rounded-sm" />
                      </>
                    )}
                    {layout === "3-column" && (
                      <>
                        <div className="w-1/4 bg-primary/20 rounded-sm" />
                        <div className="w-1/2 bg-primary/20 rounded-sm" />
                        <div className="w-1/4 bg-primary/20 rounded-sm" />
                      </>
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {layout.split("-")[0]} Col
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "design" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="space-y-1">
              <h2 className="text-xl font-black tracking-tight">
                Visual Identity
              </h2>
              <p className="text-xs text-muted-foreground">
                Customize colors and typography
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">
                  Primary Color
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  {["#000000", "#2563eb", "#db2777", "#059669", "#7c3aed"].map(
                    (color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => updateDesign({ primaryColor: color })}
                        className={cn(
                          "w-full aspect-square rounded-2xl border-2 transition-all",
                          cvDocument.settings.design.primaryColor === color
                            ? "border-primary scale-110 shadow-lg shadow-primary/20"
                            : "border-transparent",
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "ai" && (
          <div className="flex flex-col h-full gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="space-y-1">
              <h2 className="text-xl font-black tracking-tight">
                AI Assistant
              </h2>
              <p className="text-xs text-muted-foreground">
                Chat to populate your CV
              </p>
            </div>
            <div className="flex-1 overflow-hidden bg-muted/20 rounded-2xl p-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 p-3 bg-background rounded-xl border">
                <Bot className="w-4 h-4 text-primary" />
                <p className="text-xs font-medium">
                  How can I help build your CV today?
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Describe your experience..."
                className="rounded-xl"
              />
              <Button
                size="sm"
                type="button"
                className="h-9 w-9 shrink-0 rounded-lg p-0"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <footer className="p-6 border-t border-border bg-background/50 backdrop-blur-md">
        <Button
          type="button"
          className="w-full h-12 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-primary/10"
          onClick={async () => {
            if (cvDocument) {
              await cvService.saveDocument(cvDocument);

              const element = document.getElementById("cv-preview-content");
              if (!element) return;

              // Dynamically import html2pdf on the client only to avoid SSR errors
              // @ts-ignore
              const html2pdf = (await import("html2pdf.js")).default;

              const opt = {
                margin: 0,
                filename: `${cvDocument.title || "resume"}.pdf`,
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: { 
                  scale: 2, 
                  useCORS: true, 
                  letterRendering: true,
                  logging: false
                },
                jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
              };

              // Use professional library for high-fidelity export
              html2pdf().set(opt).from(element).save();
            }
          }}
        >
          Finish & Export
        </Button>
      </footer>
    </div>
  );
};
