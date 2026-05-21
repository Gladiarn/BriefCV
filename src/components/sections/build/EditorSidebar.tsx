"use client";

import { Plus, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ALL_SECTIONS, templates } from "@/lib/templates";
import type { FormField, ResumeData } from "@/types/resume";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const EditorSidebar: React.FC<SidebarProps> = ({
  activeTab,
  resumeData,
  setResumeData,
}) => {
  const template =
    templates.find((t) => t.id === resumeData.templateId) || templates[0];
  const section = template.sections.find((s) => s.id === activeTab);

  const updateField = (
    sectionId: string,
    fieldId: string,
    value: any,
    index?: number,
  ) => {
    setResumeData((prev) => {
      const newData = { ...prev };

      if (sectionId === "basics") {
        if (fieldId === "skills") {
          newData.skills = value;
        } else {
          (newData as any)[fieldId] = value;
        }
      } else {
        const key = sectionId as keyof ResumeData;
        if (Array.isArray(newData[key])) {
          const list = [...(newData[key] as any[])];
          (list[index!] as any)[fieldId] = value;
          (newData as any)[key] = list;
        }
      }

      return newData;
    });
  };

  const addRepeatable = (sectionId: string) => {
    const newId = Math.random().toString(36).substr(2, 9);
    setResumeData((prev) => {
      const key = sectionId as keyof ResumeData;
      const section = ALL_SECTIONS.find((s) => s.id === sectionId);
      if (!section) return prev;

      const newItem: any = { id: newId };
      section.fields.forEach((f) => (newItem[f.id] = ""));

      return {
        ...prev,
        [key]: [...(prev[key] as any[]), newItem],
      };
    });
  };

  const removeRepeatable = (sectionId: string, id: string) => {
    setResumeData((prev) => {
      const key = sectionId as keyof ResumeData;
      if (Array.isArray(prev[key])) {
        return {
          ...prev,
          [key]: (prev[key] as any[]).filter((item) => item.id !== id),
        };
      }
      return prev;
    });
  };

  const renderField = (field: FormField, sectionId: string, index?: number) => {
    let value = "";
    if (sectionId === "basics") {
      value = (resumeData as any)[field.id] || "";
    } else {
      const list = (resumeData as any)[sectionId];
      if (Array.isArray(list) && list[index!]) {
        value = list[index!][field.id] || "";
      }
    }

    const baseInputClasses =
      "w-full bg-muted/30 border border-border rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all";

    if (field.type === "image") {
      return (
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-muted/30 border border-dashed border-border flex items-center justify-center overflow-hidden shrink-0">
            {value ? (
              <img
                src={value}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-muted-foreground/40" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={value}
              onChange={(e) =>
                updateField(sectionId, field.id, e.target.value, index)
              }
              placeholder="Paste image URL..."
              className={baseInputClasses}
            />
            <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider ml-1">
              Supports URL (Upload coming soon)
            </p>
          </div>
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          rows={field.id === "summary" ? 4 : 3}
          value={value}
          onChange={(e) =>
            updateField(sectionId, field.id, e.target.value, index)
          }
          placeholder={field.placeholder}
          className={`${baseInputClasses} resize-none`}
        />
      );
    }

    if (field.type === "list") {
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-1.5 px-3 py-1 bg-muted/30 border border-border rounded-full text-[10px] font-bold text-muted-foreground hover:border-primary/30 transition-colors"
              >
                {skill}
                <button
                  onClick={() =>
                    updateField(
                      "basics",
                      "skills",
                      resumeData.skills.filter((_, i) => i !== idx),
                    )
                  }
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-2.5 h-2.5 text-destructive" />
                </button>
              </div>
            ))}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 text-[10px] uppercase font-bold text-primary px-2"
            onClick={() => {
              const skill = prompt("Enter a skill:");
              if (skill)
                updateField("basics", "skills", [...resumeData.skills, skill]);
            }}
          >
            <Plus className="w-3 h-3 mr-1" /> Add Skill
          </Button>
        </div>
      );
    }

    return (
      <input
        type={field.type}
        value={value}
        onChange={(e) =>
          updateField(sectionId, field.id, e.target.value, index)
        }
        placeholder={field.placeholder}
        className={baseInputClasses}
      />
    );
  };

  if (!section) return null;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
      <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-black tracking-tight">
              {section.title}
            </h2>
            <p className="text-xs text-muted-foreground">
              {section.description}
            </p>
          </div>
          {section.isRepeatable && (
            <Button
              size="sm"
              variant="secondary"
              className="rounded-xl gap-2"
              onClick={() => addRepeatable(section.id)}
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </Button>
          )}
        </div>

        {section.isRepeatable ? (
          <div className="space-y-4">
            {((resumeData as any)[section.id] as any[]).map((item, idx) => (
              <Card
                key={item.id}
                className="p-5 border-primary/5 hover:border-primary/10 transition-all relative group"
              >
                <button
                  onClick={() => removeRepeatable(section.id, item.id)}
                  className="absolute -top-2 -right-2 p-1.5 rounded-full bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-opacity border border-destructive/20 z-10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  {section.fields.map((field) => (
                    <div
                      key={field.id}
                      className={
                        field.gridSpan === 2
                          ? "col-span-2 space-y-1.5"
                          : "space-y-1.5"
                      }
                    >
                      <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
                        {field.label}
                      </label>
                      {renderField(field, section.id, idx)}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {section.fields.map((field) => (
              <div
                key={field.id}
                className={
                  field.gridSpan === 2
                    ? "col-span-2 space-y-1.5"
                    : "space-y-1.5"
                }
              >
                <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
                  {field.label}
                </label>
                {renderField(field, section.id)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
