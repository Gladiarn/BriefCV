"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ResumeData } from "@/types/resume";

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
  const updateBasics = (field: keyof ResumeData, value: string) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: newId, company: "", title: "", period: "", points: "" },
      ],
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: newId, school: "", degree: "", year: "" },
      ],
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
      {activeTab === "basics" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-xl font-black tracking-tight">
              Personal Identity
            </h2>
            <p className="text-xs text-muted-foreground">
              Tell us who you are and how to reach you.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
                Full Name
              </label>
              <input
                type="text"
                value={resumeData.name}
                onChange={(e) => updateBasics("name", e.target.value)}
                placeholder="Alex Johnson"
                className="w-full bg-muted/30 border border-border rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
                Target Role
              </label>
              <input
                type="text"
                value={resumeData.role}
                onChange={(e) => updateBasics("role", e.target.value)}
                placeholder="Senior Product Manager"
                className="w-full bg-muted/30 border border-border rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
                Email Address
              </label>
              <input
                type="email"
                value={resumeData.email}
                onChange={(e) => updateBasics("email", e.target.value)}
                placeholder="alex@forge.com"
                className="w-full bg-muted/30 border border-border rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
                Location
              </label>
              <input
                type="text"
                value={resumeData.location}
                onChange={(e) => updateBasics("location", e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full bg-muted/30 border border-border rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
              Professional Summary
            </label>
            <textarea
              rows={4}
              value={resumeData.summary}
              onChange={(e) => updateBasics("summary", e.target.value)}
              placeholder="Briefly describe your career impact..."
              className="w-full bg-muted/30 border border-border rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Core Skills
              </h3>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 text-[10px] uppercase font-bold text-primary px-2"
                onClick={() => {
                  const skill = prompt("Enter a skill:");
                  if (skill)
                    setResumeData((prev) => ({
                      ...prev,
                      skills: [...prev.skills, skill],
                    }));
                }}
              >
                <Plus className="w-3 h-3 mr-1" /> Add Skill
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-1.5 px-3 py-1 bg-muted/30 border border-border rounded-full text-[10px] font-bold text-muted-foreground hover:border-primary/30 transition-colors"
                >
                  {skill}
                  <button
                    onClick={() =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: prev.skills.filter((_, i) => i !== idx),
                      }))
                    }
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-2.5 h-2.5 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "experience" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-black tracking-tight">
                Work Experience
              </h2>
              <p className="text-xs text-muted-foreground">
                Your history of professional impact.
              </p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="rounded-xl gap-2"
              onClick={addExperience}
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </Button>
          </div>

          <div className="space-y-4">
            {resumeData.experience.map((exp, idx) => (
              <Card
                key={exp.id}
                className="p-5 border-primary/5 hover:border-primary/10 transition-all relative group"
              >
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="absolute -top-2 -right-2 p-1.5 rounded-full bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-opacity border border-destructive/20 z-10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const newExp = [...resumeData.experience];
                        newExp[idx].company = e.target.value;
                        setResumeData((prev) => ({
                          ...prev,
                          experience: newExp,
                        }));
                      }}
                      placeholder="Company Name"
                      className="bg-transparent border-b border-border py-1 text-sm focus:border-primary outline-none transition-all font-bold"
                    />
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => {
                        const newExp = [...resumeData.experience];
                        newExp[idx].period = e.target.value;
                        setResumeData((prev) => ({
                          ...prev,
                          experience: newExp,
                        }));
                      }}
                      placeholder="Period (e.g. 2021 - Pres)"
                      className="bg-transparent border-b border-border py-1 text-sm focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => {
                      const newExp = [...resumeData.experience];
                      newExp[idx].title = e.target.value;
                      setResumeData((prev) => ({
                        ...prev,
                        experience: newExp,
                      }));
                    }}
                    placeholder="Job Title"
                    className="w-full bg-transparent border-b border-border py-1 text-sm focus:border-primary outline-none transition-all"
                  />
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Bullet Points
                    </label>
                    <textarea
                      value={exp.points}
                      onChange={(e) => {
                        const newExp = [...resumeData.experience];
                        newExp[idx].points = e.target.value;
                        setResumeData((prev) => ({
                          ...prev,
                          experience: newExp,
                        }));
                      }}
                      placeholder="• Describe a key achievement..."
                      className="w-full bg-muted/20 border border-border rounded-lg p-3 text-xs focus:ring-1 focus:ring-primary outline-none transition-all min-h-[120px]"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "education" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-black tracking-tight">Education</h2>
              <p className="text-xs text-muted-foreground">
                Your academic background and certifications.
              </p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="rounded-xl gap-2"
              onClick={addEducation}
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </Button>
          </div>

          <div className="space-y-4">
            {resumeData.education.map((edu, idx) => (
              <Card
                key={edu.id}
                className="p-5 border-primary/5 hover:border-primary/10 transition-all relative group"
              >
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="absolute -top-2 -right-2 p-1.5 rounded-full bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-opacity border border-destructive/20 z-10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[idx].school = e.target.value;
                      setResumeData((prev) => ({ ...prev, education: newEdu }));
                    }}
                    placeholder="University / School"
                    className="w-full bg-transparent border-b border-border py-1 text-sm focus:border-primary outline-none transition-all font-bold"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEdu = [...resumeData.education];
                        newEdu[idx].degree = e.target.value;
                        setResumeData((prev) => ({
                          ...prev,
                          education: newEdu,
                        }));
                      }}
                      placeholder="Degree / Major"
                      className="bg-transparent border-b border-border py-1 text-sm focus:border-primary outline-none transition-all"
                    />
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => {
                        const newEdu = [...resumeData.education];
                        newEdu[idx].year = e.target.value;
                        setResumeData((prev) => ({
                          ...prev,
                          education: newEdu,
                        }));
                      }}
                      placeholder="Graduation Year"
                      className="bg-transparent border-b border-border py-1 text-sm focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
