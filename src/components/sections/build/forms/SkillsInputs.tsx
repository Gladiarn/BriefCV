"use client";

import { Plus, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/lib/store";
import type { SkillsSection } from "@/types/cv";

interface Props {
  section: SkillsSection;
}

export const SkillsInputs: React.FC<Props> = ({ section }) => {
  const updateField = useCVStore((state) => state.updateField);
  const [inputValue, setInputValue] = useState("");

  const addSkill = () => {
    if (inputValue.trim() && !section.content.includes(inputValue.trim())) {
      updateField(section.id, "", [...section.content, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeSkill = (skill: string) => {
    updateField(
      section.id,
      "",
      section.content.filter((s) => s !== skill),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-foreground">
          Add Skills
        </Label>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="React, TypeScript, Node.js..."
            className="bg-muted/30 border-border rounded-xl text-foreground"
          />
          <Button
            size="sm"
            className="w-10 h-10 shrink-0 rounded-xl shadow-lg shadow-primary/20"
            onClick={addSkill}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {section.content.map((skill) => (
          <Badge
            key={skill}
            variant="outline"
            className="px-3 py-1.5 rounded-full bg-primary/5 border-primary/20 text-primary font-bold text-[10px] uppercase tracking-wider flex items-center gap-2 group"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        {section.content.length === 0 && (
          <p className="text-[10px] text-muted-foreground italic px-2">
            No skills added yet.
          </p>
        )}
      </div>
    </div>
  );
};
