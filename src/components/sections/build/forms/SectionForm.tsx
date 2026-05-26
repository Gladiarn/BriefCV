"use client";

import {
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  GripVertical,
  Trash2,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useCVStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { CVSection } from "@/types/cv";
import { EducationInputs } from "./EducationInputs";
import { ExperienceInputs } from "./ExperienceInputs";
import { HeaderInputs } from "./HeaderInputs";
import { SkillsInputs } from "./SkillsInputs";

interface Props {
  section: CVSection;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const SectionForm: React.FC<Props> = ({
  section,
  isExpanded,
  onToggleExpand,
}) => {
  const toggleVisibility = useCVStore((state) => state.toggleVisibility);
  const updateField = useCVStore((state) => state.updateField);
  const removeSection = useCVStore((state) => state.removeSection);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const renderInputs = () => {
    switch (section.type) {
      case "header":
        return <HeaderInputs section={section} />;
      case "experience":
        return <ExperienceInputs section={section} />;
      case "education":
        return <EducationInputs section={section} />;
      case "skills":
        return <SkillsInputs section={section} />;
      default:
        return (
          <div className="text-xs text-muted-foreground p-4 bg-muted/20 rounded-xl">
            Component mapping for {section.type} coming soon...
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        "border border-border/60 rounded-3xl overflow-hidden transition-all duration-300",
        isExpanded
          ? "bg-card shadow-xl shadow-primary/5 border-primary/10"
          : "bg-card/50",
      )}
    >
      <div className="p-4 flex items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3 flex-1">
          <div className="cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground transition-colors p-1">
            <GripVertical className="w-4 h-4" />
          </div>
          <input
            value={section.title}
            onChange={(e) => updateField(section.id, "title", e.target.value)}
            className="bg-transparent font-bold tracking-tight text-sm outline-none focus:text-primary transition-colors w-full text-foreground"
            placeholder="Section Title"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleVisibility(section.id);
            }}
            className={cn(
              "p-2 rounded-full transition-all border",
              section.isVisible
                ? "text-primary border-primary/20 hover:bg-primary/10"
                : "text-muted-foreground border-border hover:bg-muted",
            )}
          >
            {section.isVisible ? (
              <Eye className="w-3.5 h-3.5" />
            ) : (
              <EyeOff className="w-3.5 h-3.5" />
            )}
          </button>
          {section.type !== "header" && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (isConfirmingDelete) {
                  removeSection(section.id);
                } else {
                  setIsConfirmingDelete(true);
                  setTimeout(() => setIsConfirmingDelete(false), 2000);
                }
              }}
              className={cn(
                "p-2 rounded-full transition-all border",
                isConfirmingDelete
                  ? "text-white bg-destructive border-destructive"
                  : "text-destructive border-destructive/20 hover:bg-destructive/10",
              )}
            >
              {isConfirmingDelete ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className="p-2 rounded-full text-foreground border border-border hover:bg-muted transition-all"
          >
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 pt-2 border-t border-border/40 bg-gradient-to-b from-transparent to-primary/[0.01]">
          {renderInputs()}
        </div>
      )}
    </div>
  );
};
