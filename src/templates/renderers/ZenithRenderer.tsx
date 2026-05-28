import type React from "react";
import { cn } from "@/lib/utils";
import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  SkillsSection,
} from "@/types/cv";

interface ZenithRendererProps {
  data: CVDocument;
}

export const ZenithRenderer: React.FC<ZenithRendererProps> = ({ data }) => {
  const { sections, settings } = data;
  const primaryColor = settings?.design?.primaryColor || "#000000";

  const renderSection = (id: string) => {
    const section = sections[id];
    if (!section || !section.isVisible) return null;

    switch (section.type) {
      case "header": {
        const content = (section as HeaderSection).content;
        return (
          <div key={id} className="bg-gray-900 text-white p-8 mb-8">
            <h1 className="text-5xl font-black uppercase tracking-tighter">
              {content.fullName}
            </h1>
            <p
              className="text-lg font-bold uppercase tracking-widest mt-2"
              style={{ color: primaryColor }}
            >
              {content.jobTitle}
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-xs text-gray-400">
              {content.contacts.map((contact) => (
                <span key={contact.id}>{contact.value}</span>
              ))}
            </div>
          </div>
        );
      }

      case "experience": {
        const content = (section as ExperienceSection).content;
        return (
          <div key={id} className="mb-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 border-b-2 border-gray-900 pb-2 mb-4">
              {section.title}
            </h3>
            {content.map((exp) => (
              <div key={exp.id} className="mb-6 grid grid-cols-4 gap-4">
                <div className="col-span-1 text-[10px] font-bold text-gray-500 uppercase">
                  {exp.startDate} - {exp.endDate}
                </div>
                <div className="col-span-3">
                  <h4 className="font-black text-lg">{exp.company}</h4>
                  <p className="text-sm font-bold text-gray-600 mb-2">
                    {exp.role}
                  </p>
                  <ul className="text-xs text-gray-700 list-disc ml-4 space-y-1">
                    {exp.description.map((b, i) => (
                      <li key={`bullet-${exp.id}-${i}`}>{b}</li>
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
          <div key={id} className="mb-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 border-b-2 border-gray-900 pb-2 mb-4">
              {section.title}
            </h3>
            {content.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h4 className="font-bold">{edu.institution}</h4>
                <p className="text-xs text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </div>
        );
      }

      case "skills": {
        const content = (section as SkillsSection).content;
        return (
          <div key={id} className="mb-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 border-b-2 border-gray-900 pb-2 mb-4">
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.map((s, i) => (
                <span
                  key={`skill-${id}-${s}`}
                  className="text-[10px] font-bold uppercase bg-gray-900 text-white px-3 py-1"
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
    <div className="p-[10mm] bg-white text-gray-900 min-h-[297mm]">
      {settings?.columnMapping?.mainColumn?.map(renderSection)}
    </div>
  );
};
