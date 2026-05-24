"use client";

import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  SkillsSection,
} from "@/types/cv";

export const ExecutiveRenderer: React.FC<{ doc: CVDocument }> = ({ doc }) => {
  const { settings, sections } = doc;
  const primaryColor = settings.design.primaryColor;

  const renderSection = (id: string) => {
    const section = sections[id];
    if (!section || !section.isVisible) return null;

    switch (section.type) {
      case "header": {
        const content = (section as HeaderSection).content;
        return (
          <div
            key={id}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-4 pb-8"
            style={{ borderColor: primaryColor }}
          >
            <div className="space-y-1">
              <h1
                className="text-5xl font-black tracking-tighter uppercase"
                style={{ color: primaryColor }}
              >
                {content.fullName || "Your Name"}
              </h1>
              <p className="text-2xl font-bold tracking-tight opacity-70">
                {content.jobTitle || "Target Role"}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1 text-xs font-bold uppercase tracking-widest opacity-60">
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
          <div key={id} className="space-y-6">
            <h3
              className="text-lg font-black uppercase tracking-tighter border-l-4 pl-4"
              style={{ borderLeftColor: primaryColor }}
            >
              {section.title}
            </h3>
            <div className="space-y-10">
              {content.map((exp) => (
                <div key={exp.id} className="space-y-3">
                  <div className="flex justify-between items-baseline border-b border-border/40 pb-1">
                    <h4 className="font-black text-base uppercase tracking-tight">
                      {exp.company}
                    </h4>
                    <span className="text-xs font-black opacity-50 tabular-nums">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wide opacity-80">
                    {exp.role}
                  </p>
                  <ul className="text-xs space-y-2 list-none">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="relative pl-6 leading-relaxed">
                        <span
                          className="absolute left-0 top-1.5 w-2 h-2 rotate-45"
                          style={{ backgroundColor: primaryColor }}
                        />
                        {bullet}
                      </li>
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
          <div key={id} className="space-y-6">
            <h3
              className="text-lg font-black uppercase tracking-tighter border-l-4 pl-4"
              style={{ borderLeftColor: primaryColor }}
            >
              {section.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h4 className="font-black text-xs uppercase tracking-tight">
                    {edu.institution}
                  </h4>
                  <p className="text-xs font-bold opacity-70">{edu.degree}</p>
                  <div className="text-[10px] font-black opacity-40 uppercase tracking-widest">
                    {edu.startDate} - {edu.endDate}
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
          <div key={id} className="space-y-6">
            <h3
              className="text-lg font-black uppercase tracking-tighter border-l-4 pl-4"
              style={{ borderLeftColor: primaryColor }}
            >
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.map((skill, i) => (
                <span
                  key={i}
                  className="text-[10px] font-black uppercase tracking-[0.15em] bg-secondary px-3 py-1.5 rounded-sm"
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
    <div className="h-full flex flex-col gap-12 font-sans">
      {settings.layoutStructure === "1-column" ? (
        <div className="space-y-12">
          {settings.columnMapping.mainColumn.map(renderSection)}
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_2fr] gap-12 h-full">
          <div className="space-y-12 bg-secondary/5 p-6 rounded-xl border border-border/20">
            {settings.columnMapping.leftColumn.map(renderSection)}
          </div>
          <div className="space-y-12">
            {settings.columnMapping.rightColumn.map(renderSection)}
          </div>
        </div>
      )}
    </div>
  );
};
