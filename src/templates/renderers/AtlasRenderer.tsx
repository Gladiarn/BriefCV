import type React from "react";
import { cn } from "@/lib/utils";
import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  SkillsSection,
} from "@/types/cv";

interface AtlasRendererProps {
  data: CVDocument;
}

export const AtlasRenderer: React.FC<AtlasRendererProps> = ({ data }) => {
  const { sections, settings } = data;

  const renderSection = (id: string) => {
    const section = sections[id];
    if (!section || !section.isVisible) return null;

    // Unique Section Header Styling
    const Header = ({ title }: { title: string }) => (
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
        <span className="h-[2px] w-4 bg-primary" />
        {title}
      </h3>
    );

    switch (section.type) {
      case "experience": {
        const content = (section as ExperienceSection).content;
        return (
          <div key={id} className="mb-8">
            <Header title={section.title} />
            <div className="space-y-6">
              {content.map((exp) => (
                <div key={exp.id}>
                  <h4 className="font-bold text-sm">{exp.role}</h4>
                  <p className="text-xs text-muted-foreground">{exp.company}</p>
                  <p className="text-[10px] font-mono text-gray-400 mt-1">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <ul className="text-xs mt-2 list-none space-y-1">
                    {exp.description.map((b, i) => (
                      <li key={`bullet-${exp.id}-${i}`}>• {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case "education": {
        const content = (section as EducationSection).content;
        return (
          <div key={id} className="mb-8">
            <Header title={section.title} />
            {content.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h4 className="font-bold text-xs">{edu.institution}</h4>
                <p className="text-xs text-muted-foreground">{edu.degree}</p>
              </div>
            ))}
          </div>
        );
      }
      case "skills": {
        const content = (section as SkillsSection).content;
        return (
          <div key={id} className="mb-8">
            <Header title={section.title} />
            <div className="flex flex-wrap gap-1">
              {content.map((s, i) => (
                <span
                  key={`skill-${id}-${s}`}
                  className="text-[9px] font-bold uppercase bg-gray-100 px-2 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  const headerSection = Object.values(sections).find(s => s.type === "header") as HeaderSection | undefined;

  return (
    <div className="p-[10mm] bg-white text-gray-900 min-h-[297mm]">
      {/* Global Header */}
      {headerSection && (
        <div className="mb-10 border-b border-gray-200 pb-8">
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            {headerSection.content.fullName}
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            {headerSection.content.jobTitle}
          </p>
        </div>
      )}

      {/* 3-Column Grid */}
      <div className="grid grid-cols-3 gap-8">
        <div className="space-y-8">
          {settings?.columnMapping?.leftColumn?.map(renderSection)}
        </div>
        <div className="space-y-8">
          {settings?.columnMapping?.middleColumn?.map(renderSection)}
        </div>
        <div className="space-y-8">
          {settings?.columnMapping?.rightColumn?.map(renderSection)}
        </div>
      </div>
    </div>
  );
};
