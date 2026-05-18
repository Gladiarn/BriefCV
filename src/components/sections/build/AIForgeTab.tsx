"use client";

import { Send, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AIForgeTab = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500 h-full flex flex-col">
      <div className="space-y-2">
        <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Forge
        </h2>
        <p className="text-xs text-muted-foreground">
          Command the AI to optimize your content or add metrics.
        </p>
      </div>

      <div className="flex-1 bg-muted/10 rounded-2xl border border-border p-4 flex flex-col gap-4 relative overflow-hidden">
        <div className="flex-1 space-y-4">
          <div className="bg-primary/5 rounded-2xl p-3 text-xs max-w-[80%] self-start border border-primary/10">
            Hello! I can help you optimize your resume. Would you like me to
            inject metrics into your experience section?
          </div>
        </div>

        <div className="relative">
          <textarea
            placeholder="e.g., 'Make my work experience sound more impactful'..."
            className="w-full bg-background border border-border rounded-xl py-3 px-4 pr-12 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none min-h-[100px]"
          />
          <Button
            size="sm"
            className="absolute bottom-3 right-3 rounded-lg px-2 shadow-lg"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="text-[10px] uppercase font-bold tracking-widest h-auto py-2.5"
        >
          <Wand2 className="w-3.5 h-3.5 mr-2" /> Inject Metrics
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="text-[10px] uppercase font-bold tracking-widest h-auto py-2.5"
        >
          <Sparkles className="w-3.5 h-3.5 mr-2" /> ATS Check
        </Button>
      </div>
    </div>
  );
};
