"use client";

import { ChevronLeft, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { LeftPanel } from "@/components/sections/build/LeftPanel";
import { RightPanel } from "@/components/sections/build/RightPanel";
import { Button } from "@/components/ui/button";
import { useCVStore } from "@/lib/store";
import { cvService } from "@/services/cvService";
import type { CVDocument } from "@/types/cv";

function EditorContent() {
  const searchParams = useSearchParams();
  const { setCVDocument, clearStore } = useCVStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      clearStore();
      const templateId = searchParams.get("template") || "modern";
      const resumeId = searchParams.get("id");

      try {
        let doc: CVDocument | null = null;
        if (resumeId) {
          doc = await cvService.getDocumentById(resumeId);
          if (!doc) {
            doc = await cvService.createDefaultDocument(templateId);
          }
        } else {
          doc = await cvService.createDefaultDocument(templateId);
          window.history.replaceState(null, "", `/build/new?id=${doc.id}`);
        }
        setCVDocument(doc);
        // Add a small artificial delay to ensure the UI feels polished
        await new Promise((resolve) => setTimeout(resolve, 600));
      } catch (error) {
        console.error("Failed to initialize Forge:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, [searchParams, setCVDocument, clearStore]);

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-6">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <Sparkles className="w-6 h-6 text-primary absolute -top-2 -right-2 animate-pulse" />
        </div>
        <div className="space-y-2 text-center">
          <p className="font-black tracking-[0.3em] uppercase text-[10px] text-primary animate-pulse">
            Initializing Forge
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            Preparing your professional blueprint...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-muted/20 overflow-hidden relative">
      {/* Sidebar - Left Panel */}
      <aside className="w-[480px] h-full z-20 flex flex-col shadow-2xl bg-background border-r border-border">
        <header className="p-4 border-b border-border flex items-center justify-between bg-background/50 backdrop-blur-md">
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
              Forge Active
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <LeftPanel />
        </div>
      </aside>

      {/* Main Area - Right Panel (Preview) */}
      <main className="flex-1 h-full relative bg-muted/10 overflow-hidden">
        <RightPanel />
      </main>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Loading Environment...
          </p>
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
