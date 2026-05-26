"use client";

import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  SkillsSection,
} from "@/types/cv";

export const ModernRenderer: React.FC<{ doc: CVDocument }> = ({ doc }) => {
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
            className="text-center space-y-2 border-b-2 pb-6"
            style={{ borderColor: primaryColor }}
          >
            <h1
              className="text-4xl font-black uppercase tracking-tighter"
              style={{ color: primaryColor }}
            >
              {content.fullName || "Your Name"}
            </h1>
            <p className="text-xl font-bold text-gray-900">
              {content.jobTitle || "Target Role"}
            </p>
            <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-widest text-gray-900">
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
          <div key={id} className="space-y-4">
            <h3
              className="text-sm font-black uppercase tracking-widest border-b pb-1"
              style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
            >
              {section.title}
            </h3>
            <div className="space-y-6">
              {content.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-sm uppercase tracking-tight text-gray-900">
                      {exp.company}
                    </h4>
                    <span className="text-xs font-black text-gray-900">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-bold italic text-gray-900">
                    {exp.role}
                  </p>
                  <ul className="text-sm space-y-1.5 list-none text-gray-900">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="relative pl-4">
                        <span
                          className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: primaryColor || "#000" }}
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
          <div key={id} className="space-y-4">
            <h3
              className="text-sm font-black uppercase tracking-widest border-b pb-1"
              style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
            >
              {section.title}
            </h3>
            <div className="space-y-4">
              {content.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline text-gray-900">
                    <h4 className="font-bold text-sm uppercase tracking-tight">
                      {edu.institution}
                    </h4>
                    <span className="text-xs font-black">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">
                    {edu.degree}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case "skills": {
        const content = (section as SkillsSection).content;
        return (
          <div key={id} className="space-y-4">
            <h3
              className="text-sm font-black uppercase tracking-widest border-b pb-1"
              style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
            >
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {content.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs font-bold uppercase tracking-widest bg-gray-100 text-gray-900 px-2 py-0.5 rounded border border-gray-200"
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
    <div className="h-full flex flex-col gap-8 p-[15mm]">
      {settings.layoutStructure === "1-column" ? (
        <div className="space-y-8">
          {settings.columnMapping.mainColumn.map(renderSection)}
        </div>
      ) : settings.layoutStructure === "2-column" ? (
        <div className="grid grid-cols-12 gap-10 h-full">
          <div className="col-span-5 space-y-8">
            {settings.columnMapping.leftColumn.map(renderSection)}
          </div>
          <div className="col-span-7 space-y-8">
            {settings.columnMapping.rightColumn.map(renderSection)}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 h-full">
          <div className="space-y-8">
            {settings.columnMapping.leftColumn.map(renderSection)}
          </div>
          <div className="space-y-8">
            {settings.columnMapping.middleColumn.map(renderSection)}
          </div>
          <div className="space-y-8">
            {settings.columnMapping.rightColumn.map(renderSection)}
          </div>
        </div>
      )}
    </div>
  );
};
