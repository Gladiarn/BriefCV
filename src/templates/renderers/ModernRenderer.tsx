import type React from "react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { cn } from "@/lib/utils";
import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  SkillsSection,
} from "@/types/cv";

interface ModernRendererProps {
  data: CVDocument;
}

export const ModernRenderer: React.FC<ModernRendererProps> = ({ data }) => {
  const isMounted = useIsMounted();
  const { sections, settings } = data;

  const { primaryColor, fontSize, spacing, fontFamily } = settings?.design || {
    primaryColor: "#000000",
    fontSize: "md",
    spacing: "normal",
    fontFamily: "sans",
  };

  if (!isMounted) return null;

  // Map settings to styles
  const fontClass =
    fontFamily === "serif"
      ? "font-serif"
      : fontFamily === "mono"
        ? "font-mono"
        : "font-sans";
  const sizeClass =
    fontSize === "sm" ? "text-sm" : fontSize === "lg" ? "text-lg" : "text-base";
  const spaceClass =
    spacing === "compact"
      ? "gap-4"
      : spacing === "relaxed"
        ? "gap-12"
        : "gap-8";

  const renderSection = (id: string) => {
    const section = sections[id];
    if (!section || !section.isVisible) return null;

    switch (section.type) {
      case "header": {
        const content = (section as HeaderSection).content;
        return (
          <div
            key={id}
            className="text-center space-y-4 border-b-2 border-gray-100 pb-8"
          >
            <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900">
              {content.fullName}
            </h1>
            <p
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: primaryColor }}
            >
              {content.jobTitle}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              {content.contacts.map((contact) => (
                <span key={contact.id} className="flex items-center gap-1.5">
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
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">
              {section.title}
            </h3>
            <div className="space-y-8">
              {content.map((exp) => (
                <div key={exp.id} className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-base font-bold text-gray-900">
                      {exp.company}
                    </h4>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-bold italic text-gray-900">
                    {exp.role}
                  </p>
                  <ul className="text-sm space-y-1.5 list-none text-gray-900">
                    {exp.description.map((bullet, _i) => (
                      <li
                        key={`bullet-${exp.id}-${bullet.substring(0, 10)}`}
                        className="relative pl-4"
                      >
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
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">
              {section.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900">
                    {edu.institution}
                  </h4>
                  <p className="text-xs text-gray-600 italic">{edu.degree}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {edu.startDate} - {edu.endDate}
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
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {content.map((skill, _i) => (
                <span
                  key={`skill-${id}-${skill}`}
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
    <div
      className={cn(
        "h-full flex flex-col p-[15mm]",
        fontClass,
        sizeClass,
        spaceClass,
      )}
    >
      {settings?.layoutStructure === "1-column" ? (
        <div className={spaceClass}>
          {settings?.columnMapping?.mainColumn?.map(renderSection)}
        </div>
      ) : settings?.layoutStructure === "2-column" ? (
        <div className={cn("grid grid-cols-12 gap-10 h-full", spaceClass)}>
          <div className="col-span-5 space-y-8">
            {settings?.columnMapping?.leftColumn?.map(renderSection)}
          </div>
          <div className="col-span-7 space-y-8">
            {settings?.columnMapping?.rightColumn?.map(renderSection)}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 h-full">
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
      )}
    </div>
  );
};
