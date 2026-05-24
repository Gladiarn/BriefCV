"use client";

import { Plus, Trash2 } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
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
          className="p-4 bg-muted/10 border-border/50 relative group"
        >
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-white opacity-0 group-hover:opacity-100 transition-all border border-destructive/20 shadow-sm"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
                Institution
              </Label>
              <Input
                value={item.institution}
                onChange={(e) => updateItem(idx, "institution", e.target.value)}
                placeholder="Harvard University"
                className="bg-muted/30 border-border rounded-xl"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
                Degree / Major
              </Label>
              <Input
                value={item.degree}
                onChange={(e) => updateItem(idx, "degree", e.target.value)}
                placeholder="Bachelor of Science in Computer Science"
                className="bg-muted/30 border-border rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
                Start Date
              </Label>
              <Input
                value={item.startDate}
                onChange={(e) => updateItem(idx, "startDate", e.target.value)}
                placeholder="Sep 2016"
                className="bg-muted/30 border-border rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
                End Date
              </Label>
              <Input
                value={item.endDate}
                onChange={(e) => updateItem(idx, "endDate", e.target.value)}
                placeholder="May 2020"
                className="bg-muted/30 border-border rounded-xl"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button
        className="w-full h-12 border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary rounded-2xl gap-2 font-bold uppercase tracking-widest text-[11px] transition-all"
        onClick={addItem}
      >
        <Plus className="w-4 h-4" /> Add Education
      </Button>
    </div>
  );
};
