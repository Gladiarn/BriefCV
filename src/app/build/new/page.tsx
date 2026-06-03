"use client";

import { ChevronLeft, Loader2, Sparkles, Eye, PenTool } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LeftPanel } from "@/components/sections/build/LeftPanel";
import { RightPanel } from "@/components/sections/build/RightPanel";
import { Button } from "@/components/ui/button";
import { useCVStore } from "@/lib/store";
import { cvService } from "@/services/cvService";
import type { CVDocument } from "@/types/cv";

function EditorContent() {
  const searchParams = useSearchParams();
  const {
    cvDocument: storedDoc,
    setCVDocument,
    clearStore,
    _hasHydrated,
  } = useCVStore();
  const [isInitializing, setIsInitializing] = useState(true);
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

  const prevParams = useRef<{ templateId: string; resumeId: string | null }>({
    templateId: "",
    resumeId: null,
  });

  // Clear store on unmount when leaving Forge
  useEffect(() => {
    return () => {
      clearStore();
    };
  }, [clearStore]);

  useEffect(() => {
    // 1. Wait for Zustand to hydrate from localStorage
    if (!_hasHydrated) return;

    const templateId = searchParams.get("template") || "modern";
    const resumeId = searchParams.get("id");

    // Prevent double initialization from history.replaceState
    if (
      prevParams.current.templateId === templateId &&
      prevParams.current.resumeId === resumeId
    )
      return;

    prevParams.current = { templateId, resumeId };

    const init = async () => {
      setIsInitializing(true);
      try {
        let doc: CVDocument | null = null;

        // 3. Check if we are opening an existing resume by ID
        if (resumeId) {
          doc = await cvService.getDocumentById(resumeId);

          // If ID was provided but not found, create a new one with that template
          if (!doc) {
            doc = await cvService.createDefaultDocument(templateId);
          }
        } else {
          // 5. No ID provided, this is a fresh template selection
          doc = await cvService.createDefaultDocument(templateId);
          // Sync URL with the new UUID, preserving templateId
          window.history.replaceState(null, "", `/build/new?id=${doc.id}&template=${templateId}`);
        }

        if (doc) {
          setCVDocument(doc);
        }
        // Small delay for perceived performance/polish
        await new Promise((resolve) => setTimeout(resolve, 600));
      } catch (error) {
        console.error("Failed to initialize Forge:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, [searchParams, setCVDocument, clearStore, _hasHydrated, storedDoc]);

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
    <div className="flex flex-col md:flex-row h-screen bg-muted/20 overflow-hidden relative">
      {/* Sidebar - Left Panel */}
      <aside className={cn(
        "z-20 flex flex-col shadow-2xl bg-background border-r border-border transition-all duration-300",
        "w-full h-full md:w-[480px] md:h-full",
        mobileView === "preview" ? "hidden md:flex" : "flex"
      )}>
        <header className="p-4 border-b border-border flex items-center justify-between bg-background/50 backdrop-blur-md">
          <Link href="/build">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 rounded-full font-bold text-[10px] uppercase tracking-wider"
            >
              <ChevronLeft className="w-4 h-4" />
              Exit
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
              Forge
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <LeftPanel />
        </div>
      </aside>

      {/* Main Area - Right Panel (Preview) */}
      <main className={cn(
        "flex-1 h-full relative bg-muted/5 overflow-hidden transition-all duration-300",
        mobileView === "editor" ? "hidden md:flex" : "flex"
      )}>
        <RightPanel />
      </main>

      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex bg-background/90 backdrop-blur-md border border-border/60 rounded-full p-1 shadow-2xl">
        <Button
          variant={mobileView === "editor" ? "primary" : "ghost"}
          size="sm"
          className="rounded-full gap-2 px-4"
          onClick={() => setMobileView("editor")}
        >
          <PenTool className="w-4 h-4" />
          Edit
        </Button>
        <Button
          variant={mobileView === "preview" ? "primary" : "ghost"}
          size="sm"
          className="rounded-full gap-2 px-4"
          onClick={() => setMobileView("preview")}
        >
          <Eye className="w-4 h-4" />
          Preview
        </Button>
      </div>
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
