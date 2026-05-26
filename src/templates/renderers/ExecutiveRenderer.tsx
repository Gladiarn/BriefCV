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
            className="pb-6 border-b-2"
            style={{ borderColor: primaryColor }}
          >
            <h1 className="text-5xl font-extrabold tracking-tighter text-gray-900 uppercase">
              {content.fullName || "Your Name"}
            </h1>
            <p className="text-lg font-medium mt-2 uppercase tracking-[0.2em] opacity-70">
              {content.jobTitle || "Executive Leader"}
            </p>
            <div className="flex gap-6 mt-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
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
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
              {section.title}
            </h3>
            {content.map((exp) => (
              <div key={exp.id} className="grid grid-cols-[120px_1fr] gap-4">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">
                  {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-gray-900">
                    {exp.company}
                  </div>
                  <div
                    className="text-xs font-semibold"
                    style={{ color: primaryColor }}
                  >
                    {exp.role}
                  </div>
                  <ul className="text-xs space-y-1 list-disc ml-4 text-gray-600">
                    {exp.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );
      }
      case "education": {
        const content = (section as EducationSection).content;
        return (
          <div key={id} className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
              {section.title}
            </h3>
            {content.map((edu) => (
              <div key={edu.id} className="grid grid-cols-[120px_1fr] gap-4">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">
                  {edu.startDate} - {edu.endDate}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    {edu.institution}
                  </div>
                  <div className="text-xs text-gray-600">{edu.degree}</div>
                </div>
              </div>
            ))}
          </div>
        );
      }
      case "skills": {
        const content = (section as SkillsSection).content;
        return (
          <div key={id} className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.map((skill, i) => (
                <span
                  key={i}
                  className="text-[10px] font-bold border-b border-gray-300 pb-0.5"
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
    <div className="h-full flex flex-col gap-12 font-serif text-gray-900 p-[15mm]">
      {settings.layoutStructure === "1-column" ? (
        <div className="space-y-12">
          {settings.columnMapping.mainColumn.map(renderSection)}
        </div>
      ) : settings.layoutStructure === "2-column" ? (
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-4 space-y-12">
            {settings.columnMapping.leftColumn.map(renderSection)}
          </div>
          <div className="col-span-8 space-y-12">
            {settings.columnMapping.rightColumn.map(renderSection)}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-12">
            {settings.columnMapping.leftColumn.map(renderSection)}
          </div>
          <div className="space-y-12">
            {settings.columnMapping.middleColumn.map(renderSection)}
          </div>
          <div className="space-y-12">
            {settings.columnMapping.rightColumn.map(renderSection)}
          </div>
        </div>
      )}
    </div>
  );
};
