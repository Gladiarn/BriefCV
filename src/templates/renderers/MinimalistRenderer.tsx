"use client";

import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  SkillsSection,
} from "@/types/cv";

export const MinimalistRenderer: React.FC<{ doc: CVDocument }> = ({ doc }) => {
  const { settings, sections } = doc;
  const primaryColor = settings.design.primaryColor;

  const renderSection = (id: string, _isSidebar = false) => {
    const section = sections[id];
    if (!section || !section.isVisible) return null;

    switch (section.type) {
      case "header": {
        const content = (section as HeaderSection).content;
        return (
          <div key={id} className="space-y-4 pb-8 border-b border-border/40">
            <div className="space-y-1">
              <h1
                className="text-3xl font-serif tracking-tight"
                style={{ color: primaryColor }}
              >
                {content.fullName || "Your Name"}
              </h1>
              <p className="text-lg font-medium text-muted-foreground italic">
                {content.jobTitle || "Target Role"}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-[10px] text-muted-foreground font-medium">
              {content.email && <span>{content.email}</span>}
              {content.phone && <span>{content.phone}</span>}
              {content.location && <span>{content.location}</span>}
            </div>
          </div>
        );
      }

      case "experience": {
        const content = (section as ExperienceSection).content;
        return (
          <div key={id} className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 border-b border-border/20 pb-1">
              {section.title}
            </h3>
            <div className="space-y-8">
              {content.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h4
                      className="font-bold text-sm"
                      style={{ color: primaryColor }}
                    >
                      {exp.role}
                    </h4>
                    <span className="text-[10px] tabular-nums text-muted-foreground">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold opacity-80">
                    {exp.company}
                  </div>
                  <div className="space-y-1.5">
                    {exp.description.map((bullet, i) => (
                      <p
                        key={i}
                        className="text-[10px] leading-relaxed text-muted-foreground text-justify"
                      >
                        {bullet}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case "education": {
        const content = (section as EducationSection).content;
        return (
          <div key={id} className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 border-b border-border/20 pb-1">
              {section.title}
            </h3>
            <div className="space-y-4">
              {content.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <div className="font-bold text-[11px]">{edu.institution}</div>
                  <div className="text-[10px] text-muted-foreground italic">
                    {edu.degree}
                  </div>
                  <div className="text-[9px] tabular-nums opacity-60">
                    {edu.startDate} – {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case "skills": {
        const content = (section as SkillsSection).content;
        return (
          <div key={id} className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 border-b border-border/20 pb-1">
              {section.title}
            </h3>
            <div className="flex flex-col gap-1.5">
              {content.map((skill, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium text-muted-foreground"
                >
                  {skill}
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

  return (
    <div className="h-full flex flex-col gap-10 font-serif">
      {settings.layoutStructure === "1-column" ? (
        <div className="max-w-[160mm] mx-auto space-y-12">
          {settings.columnMapping.mainColumn.map((id) => renderSection(id))}
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_2.5fr] gap-12 h-full">
          <div className="space-y-10 border-r border-border/20 pr-8">
            {settings.columnMapping.leftColumn.map((id) =>
              renderSection(id, true),
            )}
          </div>
          <div className="space-y-12">
            {settings.columnMapping.rightColumn.map((id) => renderSection(id))}
          </div>
        </div>
      )}
    </div>
  );
};
