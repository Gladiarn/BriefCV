"use client";

import { Calendar, GraduationCap, Plus, School, Trash2 } from "lucide-react";
import type React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/lib/store";
import type { EducationItem, EducationSection } from "@/types/cv";

interface Props {
  section: EducationSection;
}

export const EducationInputs: React.FC<Props> = ({ section }) => {
  const updateField = useCVStore((state) => state.updateField);

  const addItem = () => {
    const newItem: EducationItem = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    updateField(section.id, "", [...section.content, newItem]);
  };

  const removeItem = (id: string) => {
    updateField(
      section.id,
      "",
      section.content.filter((item) => item.id !== id),
    );
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newContent = [...section.content];
    newContent[index] = { ...newContent[index], [field]: value };
    updateField(section.id, "", newContent);
  };

  return (
    <div className="space-y-6">
      {section.content.map((item, idx) => (
        <Card
          key={item.id}
          className="p-6 bg-secondary/20 dark:bg-zinc-900/40 border-border/40 relative group rounded-[2rem] overflow-hidden transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
        >
          {/* Subtle Background Icon */}
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
            <GraduationCap className="w-32 h-32" />
          </div>

          <button
            type="button"
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
            onClick={(e) => {
              e.stopPropagation();
              removeItem(item.id);
            }}
          >
            <Trash2 className="w-3.5 h-3.5 pointer-events-none" />
          </button>

          <div className="grid grid-cols-2 gap-6 relative z-10">
            <div className="col-span-2 space-y-2">
              <div className="flex items-center gap-2 mb-1 px-1">
                <School className="w-3 h-3 text-primary/60" />
                <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                  Institution
                </Label>
              </div>
              <Input
                value={item.institution}
                onChange={(e) => updateItem(idx, "institution", e.target.value)}
                placeholder="Harvard University"
                className="bg-background/50 border-border/40 focus:border-primary/40 rounded-2xl h-11 text-foreground"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <div className="flex items-center gap-2 mb-1 px-1">
                <GraduationCap className="w-3 h-3 text-primary/60" />
                <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                  Degree / Major
                </Label>
              </div>
              <Input
                value={item.degree}
                onChange={(e) => updateItem(idx, "degree", e.target.value)}
                placeholder="Bachelor of Science in Computer Science"
                className="bg-background/50 border-border/40 focus:border-primary/40 rounded-2xl h-11 text-foreground font-medium"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1 px-1">
                <Calendar className="w-3 h-3 text-primary/60" />
                <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                  Start Date
                </Label>
              </div>
              <Input
                value={item.startDate}
                onChange={(e) => updateItem(idx, "startDate", e.target.value)}
                placeholder="Sep 2016"
                className="bg-background/50 border-border/40 focus:border-primary/40 rounded-2xl h-11 text-foreground"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1 px-1">
                <Calendar className="w-3 h-3 text-primary/60" />
                <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                  End Date
                </Label>
              </div>
              <Input
                value={item.endDate}
                onChange={(e) => updateItem(idx, "endDate", e.target.value)}
                placeholder="May 2020"
                className="bg-background/50 border-border/40 focus:border-primary/40 rounded-2xl h-11 text-foreground"
              />
            </div>
          </div>
        </Card>
      ))}

      <button
        type="button"
        className="w-full h-16 group relative flex items-center justify-center rounded-[2rem] border-2 border-dashed border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all overflow-hidden"
        onClick={addItem}
      >
        <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-[0.02] transition-opacity" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm border border-primary/20">
            <Plus className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 group-hover:text-primary">
            Add Education
          </span>
        </div>
      </button>
    </div>
  );
};
