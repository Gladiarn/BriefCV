import type React from "react";
import { cn } from "@/lib/utils";
import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  SkillsSection,
} from "@/types/cv";

export const SidebarRenderer: React.FC<{ doc: CVDocument }> = ({ doc }) => {
  const { settings, sections } = doc;
  const primaryColor = settings.design.primaryColor;

  const renderSection = (id: string) => {
    const section = sections[id];
    if (!section || !section.isVisible) return null;

    switch (section.type) {
      case "header": {
        const content = (section as HeaderSection).content;
        return (
          <div key={id} className="mb-10 text-white p-4">
            <h1 className="text-3xl font-extrabold uppercase tracking-tighter">
              {content.fullName}
            </h1>
            <p className="text-sm font-light mt-2">
              {content.jobTitle}
            </p>
          </div>
        );
      }
      case "experience": {
        const content = (section as ExperienceSection).content;
        const isSidebar = settings.columnMapping.leftColumn.includes(id);
        return (
          <div key={id} className="mb-8">
            <h3 className={cn(
              "text-xs font-bold uppercase tracking-widest text-center py-2 mb-4 rounded",
              isSidebar ? "bg-white/10 text-white" : "bg-gray-100 text-gray-900"
            )}>
              {section.title}
            </h3>
            {content.map((exp) => (
              <div key={exp.id} className="mb-4">
                <h4 className={cn("font-bold text-sm", isSidebar ? "text-white" : "text-gray-900")}>{exp.role}</h4>
                <p className={cn("text-xs", isSidebar ? "text-white/80" : "text-gray-700")}>{exp.company}</p>
                <p className={cn("text-[10px] italic", isSidebar ? "text-white/60" : "text-gray-500")}>
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
            ))}
          </div>
        );
      }
      case "education": {
        const content = (section as EducationSection).content;
        const isSidebar = settings.columnMapping.leftColumn.includes(id);
        return (
          <div key={id} className="mb-8">
            <h3 className={cn(
              "text-xs font-bold uppercase tracking-widest text-center py-2 mb-4 rounded",
              isSidebar ? "bg-white/10 text-white" : "bg-gray-100 text-gray-900"
            )}>
              {section.title}
            </h3>
            {content.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h4 className={cn("font-bold text-sm", isSidebar ? "text-white" : "text-gray-900")}>{edu.institution}</h4>
                <p className={cn("text-xs", isSidebar ? "text-white/80" : "text-gray-700")}>{edu.degree}</p>
              </div>
            ))}
          </div>
        );
      }
      case "skills": {
        const content = (section as SkillsSection).content;
        const isSidebar = settings.columnMapping.leftColumn.includes(id);
        return (
          <div key={id} className="mb-8">
            <h3 className={cn(
              "text-xs font-bold uppercase tracking-widest text-center py-2 mb-4 rounded",
              isSidebar ? "bg-white/10 text-white" : "bg-gray-100 text-gray-900"
            )}>
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.map((s, i) => (
                <span
                  key={i}
                  className={cn("text-[10px] px-2 py-1 rounded", isSidebar ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800")}
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
          {settings.columnMapping.leftColumn.map((id) => {
            const section = sections[id];
            if (!section || !section.isVisible) return null;
            return <div key={id}>{renderSection(id)}</div>;
          })}
        </div>
      </div>

      {/* Content */}
      <div className="col-span-7 pt-[15mm] px-8 h-full">
        {settings.layoutStructure === "2-column" ? (
          <div>{settings.columnMapping.rightColumn.map(renderSection)}</div>
        ) : (
          <div className="space-y-8">
            {settings.columnMapping.mainColumn.map(renderSection)}
          </div>
        )}
      </div>
    </div>
  );};
