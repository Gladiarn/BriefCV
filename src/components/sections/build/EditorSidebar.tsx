"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { templates } from "@/lib/templates";
import type { FormField, FormSection, ResumeData } from "@/types/resume";

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
      } else if (sectionId === "experience") {
        const newExp = [...newData.experience];
        (newExp[index!] as any)[fieldId] = value;
        newData.experience = newExp;
      } else if (sectionId === "education") {
        const newEdu = [...newData.education];
        (newEdu[index!] as any)[fieldId] = value;
        newData.education = newEdu;
      }

      return newData;
    });
  };

  const addRepeatable = (sectionId: string) => {
    const newId = Math.random().toString(36).substr(2, 9);
    setResumeData((prev) => {
      if (sectionId === "experience") {
        return {
          ...prev,
          experience: [
            ...prev.experience,
            { id: newId, company: "", title: "", period: "", points: "" },
          ],
        };
      } else if (sectionId === "education") {
        return {
          ...prev,
          education: [
            ...prev.education,
            { id: newId, school: "", degree: "", year: "" },
          ],
        };
      }
      return prev;
    });
  };

  const removeRepeatable = (sectionId: string, id: string) => {
    setResumeData((prev) => {
      if (sectionId === "experience") {
        return {
          ...prev,
          experience: prev.experience.filter((exp) => exp.id !== id),
        };
      } else if (sectionId === "education") {
        return {
          ...prev,
          education: prev.education.filter((edu) => edu.id !== id),
        };
      }
      return prev;
    });
  };

  const renderField = (field: FormField, sectionId: string, index?: number) => {
    let value = "";
    if (sectionId === "basics") {
      value = (resumeData as any)[field.id];
    } else if (sectionId === "experience") {
      value = (resumeData.experience[index!] as any)[field.id];
    } else if (sectionId === "education") {
      value = (resumeData.education[index!] as any)[field.id];
    }

    const baseInputClasses =
      "w-full bg-muted/30 border border-border rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all";

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
            {(section.id === "experience"
              ? resumeData.experience
              : resumeData.education
            ).map((item, idx) => (
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
