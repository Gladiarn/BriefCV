"use client";

import { Plus, Trash2 } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/lib/store";
import type { ExperienceItem, ExperienceSection } from "@/types/cv";

interface Props {
  section: ExperienceSection;
}

export const ExperienceInputs: React.FC<Props> = ({ section }) => {
  const updateField = useCVStore((state) => state.updateField);

  const addItem = () => {
    const newItem: ExperienceItem = {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: [""],
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

  const addBullet = (index: number) => {
    const newContent = [...section.content];
    newContent[index].description = [...newContent[index].description, ""];
    updateField(section.id, "", newContent);
  };

  const updateBullet = (
    itemIndex: number,
    bulletIndex: number,
    value: string,
  ) => {
    const newContent = [...section.content];
    newContent[itemIndex].description[bulletIndex] = value;
    updateField(section.id, "", newContent);
  };

  const removeBullet = (itemIndex: number, bulletIndex: number) => {
    const newContent = [...section.content];
    newContent[itemIndex].description = newContent[
      itemIndex
    ].description.filter((_, i) => i !== bulletIndex);
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
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
                Company
              </Label>
              <Input
                value={item.company}
                onChange={(e) => updateItem(idx, "company", e.target.value)}
                placeholder="Google"
                className="bg-muted/30 border-border rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
                Role
              </Label>
              <Input
                value={item.role}
                onChange={(e) => updateItem(idx, "role", e.target.value)}
                placeholder="Senior Engineer"
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
                placeholder="Jan 2020"
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
                placeholder="Present"
                disabled={item.isCurrent}
                className="bg-muted/30 border-border rounded-xl"
              />
            </div>

            <div className="col-span-2 space-y-3">
              <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
                Key Achievements
              </Label>
              <div className="space-y-2">
                {item.description.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex gap-2 group/bullet">
                    <Input
                      value={bullet}
                      onChange={(e) => updateBullet(idx, bIdx, e.target.value)}
                      placeholder="Reduced latency by 40%..."
                      className="bg-muted/30 border-border rounded-xl h-9"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-9 h-9 shrink-0 text-muted-foreground hover:text-destructive opacity-0 group-hover/bullet:opacity-100 transition-opacity"
                      onClick={() => removeBullet(idx, bIdx)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full border border-dashed border-border/60 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/20"
                  onClick={() => addBullet(idx)}
                >
                  <Plus className="w-3.5 h-3.5 mr-2" /> Add Achievement
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Button
        className="w-full h-12 border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary rounded-2xl gap-2 font-bold uppercase tracking-widest text-[11px] transition-all"
        onClick={addItem}
      >
        <Plus className="w-4 h-4" /> Add Experience
      </Button>
    </div>
  );
};
