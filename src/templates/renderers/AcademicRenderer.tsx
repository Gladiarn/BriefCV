import type React from "react";
import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  SkillsSection,
} from "@/types/cv";

export const AcademicRenderer: React.FC<{ data: CVDocument }> = ({ data }) => {
  const { settings, sections } = data;
  const _primaryColor = settings.design.primaryColor;

  const renderSection = (id: string) => {
    const section = sections[id];
    if (!section || !section.isVisible) return null;

    switch (section.type) {
      case "header": {
        const content = (section as HeaderSection).content;
        return (
          <div key={id} className="mb-8 border-b border-gray-400 pb-6">
            <h1 className="text-4xl font-serif text-gray-900 font-bold">
              {content.fullName}
            </h1>
            <p className="text-sm text-gray-900 mt-1 italic">
              {content.jobTitle}
            </p>
            <div className="text-xs text-gray-900 mt-2 space-x-2">
              {content.contacts.map((contact, i) => (
                <span key={contact.id}>
                  {i > 0 && " • "}
                  {contact.value}
                </span>
              ))}
            </div>
          </div>
        );
      }
      case "experience": {
        const content = (section as ExperienceSection).content;
        return (
          <div key={id} className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3 border-b border-gray-200 pb-1">
              {section.title}
            </h3>
            {content.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between text-gray-900">
                  <span className="font-bold text-sm">{exp.company}</span>
                  <span className="text-xs">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="text-xs italic text-gray-900">{exp.role}</div>
                <ul className="text-sm text-gray-900 list-square ml-4 mt-1">
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
          <div key={id} className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3 border-b border-gray-200 pb-1">
              {section.title}
            </h3>
            {content.map((edu) => (
              <div key={edu.id} className="mb-2 text-xs text-gray-900">
                <span className="font-bold">{edu.institution}</span>,{" "}
                {edu.degree} ({edu.startDate} - {edu.endDate})
              </div>
            ))}
          </div>
        );
      }
      case "skills": {
        const content = (section as SkillsSection).content;
        return (
          <div key={id} className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3 border-b border-gray-200 pb-1">
              {section.title}
            </h3>
            <div className="text-xs text-gray-900">{content.join(", ")}</div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-white font-serif text-gray-900">
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
