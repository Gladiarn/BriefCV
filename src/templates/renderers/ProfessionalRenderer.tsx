"use client";

import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  SkillsSection,
} from "@/types/cv";

export const ProfessionalRenderer: React.FC<{ doc: CVDocument }> = ({
  doc,
}) => {
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
            className="flex flex-col gap-3 pb-8 border-b-2 border-black/10"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {content.fullName || "Your Name"}
            </h1>
            <p
              className="text-xl font-medium tracking-wide"
              style={{ color: primaryColor }}
            >
              {content.jobTitle || "Target Role"}
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500">
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
            <h3 className="text-base font-bold uppercase tracking-[0.1em] border-b-2 border-gray-900/5 pb-1">
              {section.title}
            </h3>
            <div className="space-y-6">
              {content.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between items-baseline font-bold text-sm">
                    <span className="text-gray-900">{exp.company}</span>
                    <span className="text-gray-500 font-medium text-[11px]">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div
                    className="text-xs font-bold uppercase tracking-wide"
                    style={{ color: primaryColor }}
                  >
                    {exp.role}
                  </div>
                  <ul className="text-xs space-y-1.5 list-disc list-outside ml-4 text-gray-700 leading-relaxed">
                    {exp.description.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
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
          <div key={id} className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-[0.1em] border-b-2 border-gray-900/5 pb-1">
              {section.title}
            </h3>
            <div className="space-y-4">
              {content.map((edu) => (
                <div key={edu.id} className="flex justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-gray-900">
                      {edu.institution}
                    </div>
                    <div className="text-xs text-gray-600">{edu.degree}</div>
                  </div>
                  <div className="text-[11px] font-medium text-gray-500 whitespace-nowrap">
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
          <div key={id} className="space-y-3">
            <h3 className="text-base font-bold uppercase tracking-[0.1em] border-b-2 border-gray-900/5 pb-1">
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs font-bold border border-gray-200 px-2 py-1 rounded shadow-sm text-gray-700 bg-gray-50"
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
    <div className="h-full flex flex-col gap-10 font-sans text-gray-800">
      {settings.layoutStructure === "1-column" ? (
        <div className="space-y-10">
          {settings.columnMapping.mainColumn.map(renderSection)}
        </div>
      ) : (
        <div className="grid grid-cols-[2fr_1fr] gap-12 h-full">
          <div className="space-y-10">
            {settings.columnMapping.rightColumn.map(renderSection)}
          </div>
          <div className="space-y-10">
            {settings.columnMapping.leftColumn.map(renderSection)}
          </div>
        </div>
      )}
    </div>
  );
};
