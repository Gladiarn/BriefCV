import type React from "react";
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

  const renderSection = (id: string) => {
    const section = sections[id];
    if (!section || !section.isVisible) return null;

    switch (section.type) {
      case "header": {
        const content = (section as HeaderSection).content;
        return (
          <div key={id} className="mb-12">
            <h1 className="text-4xl font-light tracking-[0.2em] uppercase text-gray-900">
              {content.fullName}
            </h1>
            <p className="text-sm text-gray-400 uppercase tracking-widest mt-2">
              {content.jobTitle}
            </p>
          </div>
        );
      }
      case "experience": {
        const content = (section as ExperienceSection).content;
        return (
          <div key={id} className="mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">
              {section.title}
            </h3>
            {content.map((exp) => (
              <div key={exp.id} className="mb-6 group">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-sm text-gray-900">
                    {exp.company}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="text-xs italic text-gray-500 mb-2">
                  {exp.role}
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {exp.description.map((b, i) => (
                    <li key={i}>— {b}</li>
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
          <div key={id} className="mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">
              {section.title}
            </h3>
            {content.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h4 className="font-bold text-sm">{edu.institution}</h4>
                <p className="text-xs text-gray-500">{edu.degree}</p>
              </div>
            ))}
          </div>
        );
      }
      case "skills": {
        const content = (section as SkillsSection).content;
        return (
          <div key={id} className="mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-4">
              {content.map((s, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
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
    <div className="p-[15mm] bg-white text-gray-900 leading-relaxed tracking-wide">
      {settings.layoutStructure === "1-column" ? (
        <div className="space-y-6">
          {settings.columnMapping.mainColumn.map(renderSection)}
        </div>
      ) : settings.layoutStructure === "2-column" ? (
        <div className="grid grid-cols-[1fr_2.5fr] gap-12">
          <div>{settings.columnMapping.leftColumn.map(renderSection)}</div>
          <div>{settings.columnMapping.rightColumn.map(renderSection)}</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          <div>{settings.columnMapping.leftColumn.map(renderSection)}</div>
          <div>{settings.columnMapping.middleColumn.map(renderSection)}</div>
          <div>{settings.columnMapping.rightColumn.map(renderSection)}</div>
        </div>
      )}
    </div>
  );
};
