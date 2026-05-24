"use client";

import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  GripVertical,
} from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
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
      // Add other cases
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
      {/* Header */}
      <div className="p-4 flex items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3 flex-1">
          <div className="cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground transition-colors p-1">
            <GripVertical className="w-4 h-4" />
          </div>
          <input
            value={section.title}
            onChange={(e) => updateField(section.id, "title", e.target.value)}
            className="bg-transparent font-bold tracking-tight text-sm outline-none focus:text-primary transition-colors w-full"
            placeholder="Section Title"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-8 h-8 rounded-full transition-all",
              section.isVisible
                ? "text-primary hover:bg-primary/10"
                : "text-muted-foreground hover:bg-muted",
            )}
            onClick={(e) => {
              e.stopPropagation();
              toggleVisibility(section.id);
            }}
          >
            {section.isVisible ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 rounded-full text-muted-foreground hover:bg-muted"
            onClick={onToggleExpand}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 pt-2 border-t border-border/40 bg-gradient-to-b from-transparent to-primary/[0.01]">
          {renderInputs()}
        </div>
      )}
    </div>
  );
};
