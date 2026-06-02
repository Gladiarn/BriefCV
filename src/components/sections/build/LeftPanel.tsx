"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  AlertCircle,
  Bot,
  CheckCircle2,
  Edit3,
  Info,
  Layout,
  Loader2,
  Palette,
  Plus,
  Send,
  Settings,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
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
    updateTemplate,
    updateDesign,
    updateTitle,
    updateField,
  } = useCVStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "header-1",
  );
  const [activeTab, setActiveTab] = useState<
    "content" | "layout" | "design" | "ai"
  >("content");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "processing" | "saved" | "error"
  >("idle");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([{ role: "assistant", content: "How can I help build your CV today?" }]);
  const [input, setInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsAiLoading(true);

    try {
      const response = await fetch("/api/ai/populate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essay: userMessage.content, cvDocument }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process AI request");
      }

      if (data.updatedFields && Object.keys(data.updatedFields).length > 0) {
        // Apply updates to the store
        Object.entries(data.updatedFields).forEach(([sectionId, updates]) => {
          updateField(sectionId, "", updates);
        });

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I've analyzed your essay and updated the CV sections accordingly.",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I couldn't find relevant information in your essay to update the CV. Please provide more specific details about your experience or skills.",
          },
        ]);
      }
    } catch (e) {
      console.error("AI Error:", e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    if (saveStatus === "saved" || saveStatus === "error") {
      const timer = setTimeout(() => setSaveStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

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

  const getButtonContent = () => {
    switch (saveStatus) {
      case "processing":
        return (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Processing...
          </span>
        );
      case "saved":
        return (
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Saved Successfully
          </span>
        );
      case "error":
        return (
          <span className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Export Failed
          </span>
        );
      default:
        return "Finish & Export";
    }
  };

  return (
    <div className="flex flex-col h-full bg-background border-r border-border">
      {/* Title Bar */}
      <div className="p-4 border-b border-border bg-muted/10 flex items-center justify-between gap-4">
        {isEditingTitle ? (
          <Input
            value={cvDocument.title}
            onChange={(e) => updateTitle(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
            autoFocus
            className="h-8 text-xs font-bold rounded-lg border-primary/30"
          />
        ) : (
          <h2
            className="text-xs font-bold uppercase tracking-widest truncate cursor-pointer hover:text-primary transition-colors flex items-center gap-2"
            onClick={() => setIsEditingTitle(true)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(true)}
          >
            {cvDocument.title}
            <Edit3 className="w-3 h-3 text-muted-foreground" />
          </h2>
        )}
      </div>

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
                  Select Template
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {require("@/lib/templates").templates.map((t: any) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => updateTemplate(t.id)}
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-widest p-3 rounded-xl border transition-all",
                        cvDocument.settings.templateId === t.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border hover:border-primary/50",
                      )}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

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

            {/* AI Chat Interface */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-muted/20 rounded-2xl p-4 flex flex-col gap-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3 rounded-xl border max-w-[85%] break-words",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground self-end"
                      : "bg-background self-start",
                  )}
                >
                  <p className="text-xs font-medium leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              ))}
              {isAiLoading && (
                <div className="p-3 bg-background rounded-xl border self-start">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Describe your experience..."
                className="rounded-xl"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                size="sm"
                type="button"
                className="h-9 w-9 shrink-0 rounded-lg p-0"
                onClick={handleSendMessage}
                disabled={isAiLoading}
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
          disabled={saveStatus === "processing" || saveStatus === "saved"}
          className={cn(
            "w-full h-12 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-primary/10 transition-all duration-300",
            saveStatus === "saved"
              ? "bg-green-600 hover:bg-green-700"
              : saveStatus === "error"
                ? "bg-destructive hover:bg-destructive/90"
                : "",
          )}
          onClick={async () => {
            if (cvDocument) {
              setSaveStatus("processing");
              try {
                // 1. Save to Database
                await cvService.saveDocument(cvDocument);

                // 2. Capture ALL styles as raw text to ensure 100% parity in Puppeteer
                let cssText = "";
                try {
                  const styleTags = Array.from(
                    document.querySelectorAll("style"),
                  );
                  styleTags.forEach((tag) => {
                    cssText += `${tag.textContent}\n`;
                  });

                  const linkTags = Array.from(
                    document.querySelectorAll('link[rel="stylesheet"]'),
                  ) as HTMLLinkElement[];
                  for (const link of linkTags) {
                    try {
                      const response = await fetch(link.href);
                      if (response.ok) {
                        cssText += `${await response.text()}\n`;
                      }
                    } catch (_e) {
                      console.warn("Could not fetch stylesheet:", link.href);
                    }
                  }
                } catch (e) {
                  console.error("Error capturing styles:", e);
                }

                // 3. Get the innerHTML of the preview div
                const previewElement =
                  document.getElementById(`cv-preview-${cvDocument.id}`);
                if (!previewElement) {
                  setSaveStatus("error");
                  return;
                }

                // 4. Construct standalone HTML
                const htmlContent = `
                  <!DOCTYPE html>
                  <html>
                      <head>
                          <meta charset="utf-8">
                          <style>
                            ${cssText}
                            body { margin: 0; padding: 0; background: white; }
                            .cv-preview-element { 
                              width: 210mm !important; 
                              min-height: 297mm !important;
                              transform: scale(1) !important;
                              margin: 0 !important;
                              box-shadow: none !important;
                            }
                          </style>
                      </head>
                      <body>
                        <div class="cv-preview-element">
                          ${previewElement.innerHTML}
                        </div>
                      </body>
                  </html>
                `;

                // 5. Send to high-fidelity Puppeteer API
                const response = await fetch("/api/export", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    resumeData: cvDocument,
                    htmlContent,
                  }),
                });

                if (response.ok) {
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${cvDocument.title || "resume"}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  setSaveStatus("saved");
                } else {
                  setSaveStatus("error");
                }
              } catch (error) {
                console.error("Finish & Export Error:", error);
                setSaveStatus("error");
              }
            }
          }}
        >
          {getButtonContent()}
        </Button>
      </footer>
    </div>
  );
};
