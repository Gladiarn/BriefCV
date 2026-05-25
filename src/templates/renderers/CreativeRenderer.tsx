import type React from "react";
import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  SkillsSection,
} from "@/types/cv";

export const CreativeRenderer: React.FC<{ doc: CVDocument }> = ({ doc }) => {
  const { settings, sections } = doc;
  const primaryColor = settings.design.primaryColor;

  const renderSection = (id: string) => {
    const section = sections[id];
    if (!section || !section.isVisible) return null;

    switch (section.type) {
      case "header": {
        const content = (section as HeaderSection).content;
        return (
          <div key={id} className="mb-10 text-center">
            <h1
              className="text-5xl font-extrabold uppercase tracking-tighter"
              style={{ color: primaryColor }}
            >
              {content.fullName}
            </h1>
            <p className="text-xl font-light text-gray-500 uppercase tracking-widest mt-2">
              {content.jobTitle}
            </p>
          </div>
        );
      }
      case "experience": {
        const content = (section as ExperienceSection).content;
        return (
          <div key={id} className="mb-8">
            <h3
              className="text-sm font-bold uppercase tracking-widest border-l-4 pl-4 mb-4"
              style={{ borderColor: primaryColor }}
            >
              {section.title}
            </h3>
            {content.map((exp) => (
              <div key={exp.id} className="mb-4">
                <h4 className="font-bold text-gray-900">
                  {exp.role} | {exp.company}
                </h4>
                <p className="text-xs text-gray-500 italic">
                  {exp.startDate} - {exp.endDate}
                </p>
                <ul className="text-sm text-gray-700 mt-2 list-disc ml-5">
                  {exp.description.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      }
      case "education": {
        const content = (section as EducationSection).content;
        return (
          <div key={id} className="mb-8">
            <h3
              className="text-sm font-bold uppercase tracking-widest border-l-4 pl-4 mb-4"
              style={{ borderColor: primaryColor }}
            >
              {section.title}
            </h3>
            {content.map((edu) => (
              <div key={edu.id} className="mb-2">
                <h4 className="font-bold">{edu.institution}</h4>
                <p className="text-xs text-gray-500">
                  {edu.degree} ({edu.startDate} - {edu.endDate})
                </p>
              </div>
            ))}
          </div>
        );
      }
      case "skills": {
        const content = (section as SkillsSection).content;
        return (
          <div key={id} className="mb-8">
            <h3
              className="text-sm font-bold uppercase tracking-widest border-l-4 pl-4 mb-4"
              style={{ borderColor: primaryColor }}
            >
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.map((s, i) => (
                <span
                  key={i}
                  className="bg-gray-100 px-3 py-1 text-xs rounded-full"
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

  return (
    <div className="p-8 bg-white text-gray-900">
      {settings.layoutStructure === "1-column" ? (
        <div className="space-y-6">
          {settings.columnMapping.mainColumn.map(renderSection)}
        </div>
      ) : settings.layoutStructure === "2-column" ? (
        <div className="grid grid-cols-2 gap-8">
          <div>{settings.columnMapping.leftColumn.map(renderSection)}</div>
          <div>{settings.columnMapping.rightColumn.map(renderSection)}</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          <div>{settings.columnMapping.leftColumn.map(renderSection)}</div>
          <div>{settings.columnMapping.middleColumn.map(renderSection)}</div>
          <div>{settings.columnMapping.rightColumn.map(renderSection)}</div>
        </div>
      )}
    </div>
  );
};
