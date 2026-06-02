import type React from "react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { cn } from "@/lib/utils";
import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  SkillsSection,
} from "@/types/cv";

interface SidebarRendererProps {
  data: CVDocument;
}

export const SidebarRenderer: React.FC<SidebarRendererProps> = ({ data }) => {
  const isMounted = useIsMounted();
  const { sections, settings } = data;
  const primaryColor = settings?.design?.primaryColor || "#000000";

  if (!isMounted) return null;

  const renderSection = (id: string) => {
    const section = sections[id];
    if (!section || !section.isVisible) return null;

    switch (section.type) {
      case "experience": {
        const content = (section as ExperienceSection).content;
        const isSidebar = settings?.columnMapping?.leftColumn.includes(id);
        return (
          <div key={id} className="mb-8">
            <h3
              className={cn(
                "text-xs font-bold uppercase tracking-widest text-center py-2 mb-4 rounded",
                isSidebar
                  ? "bg-white/10 text-white"
                  : "bg-gray-100 text-gray-900",
              )}
            >
              {section.title}
            </h3>
            {content.map((exp) => (
              <div key={exp.id} className="mb-6">
                <h4
                  className={cn(
                    "font-bold text-sm",
                    isSidebar ? "text-white" : "text-gray-900",
                  )}
                >
                  {exp.role}
                </h4>
                <p
                  className={cn(
                    "text-xs font-semibold",
                    isSidebar ? "text-white/80" : "text-primary",
                  )}
                >
                  {exp.company}
                </p>
                <p
                  className={cn(
                    "text-[10px] italic mb-2",
                    isSidebar ? "text-white/60" : "text-gray-500",
                  )}
                >
                  {exp.startDate} - {exp.endDate}
                </p>
                {!isSidebar && exp.description && (
                  <ul className="text-sm mt-2 space-y-1 list-disc ml-4 text-gray-900">
                    {exp.description.map((b, _i) => (
                      <li key={`bullet-${exp.id}-${b.substring(0, 10)}`}>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );
      }
      case "education": {
        const content = (section as EducationSection).content;
        const isSidebar = settings?.columnMapping?.leftColumn.includes(id);
        return (
          <div key={id} className="mb-8">
            <h3
              className={cn(
                "text-xs font-bold uppercase tracking-widest text-center py-2 mb-4 rounded",
                isSidebar
                  ? "bg-white/10 text-white"
                  : "bg-gray-100 text-gray-900",
              )}
            >
              {section.title}
            </h3>
            {content.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h4
                  className={cn(
                    "font-bold text-sm",
                    isSidebar ? "text-white" : "text-gray-900",
                  )}
                >
                  {edu.institution}
                </h4>
                <p
                  className={cn(
                    "text-xs",
                    isSidebar ? "text-white/80" : "text-gray-700",
                  )}
                >
                  {edu.degree}
                </p>
              </div>
            ))}
          </div>
        );
      }
      case "skills": {
        const content = (section as SkillsSection).content;
        const isSidebar = settings?.columnMapping?.leftColumn.includes(id);
        return (
          <div key={id} className="mb-8">
            <h3
              className={cn(
                "text-xs font-bold uppercase tracking-widest text-center py-2 mb-4 rounded",
                isSidebar
                  ? "bg-white/10 text-white"
                  : "bg-gray-100 text-gray-900",
              )}
            >
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.map((s, _i) => (
                <span
                  key={`skill-${id}-${s}`}
                  className={cn(
                    "text-xs px-2 py-1 rounded",
                    isSidebar
                      ? "bg-white/10 text-white"
                      : "bg-gray-100 text-gray-800",
                  )}
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
    <div className="grid grid-cols-12 w-full h-full bg-white text-gray-900">
      {/* Sidebar - Full Bleed */}
      <div
        className="col-span-5 text-white h-full py-[15mm] px-6"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="pt-4">
          {settings?.columnMapping?.leftColumn?.map((id) => {
            const section = sections[id];
            if (!section || !section.isVisible) return null;
            return <div key={id}>{renderSection(id)}</div>;
          })}
        </div>
      </div>

      {/* Content */}
      <div className="col-span-7 pt-[15mm] px-8 h-full">
        {settings?.layoutStructure === "2-column" ? (
          <div>{settings?.columnMapping?.rightColumn?.map(renderSection)}</div>
        ) : (
          <div className="space-y-8">
            {settings?.columnMapping?.mainColumn?.map(renderSection)}
          </div>
        )}
      </div>
    </div>
  );
};
