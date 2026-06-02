import type React from "react";
import { templates } from "@/lib/templates";
import type { CVDocument } from "@/types/cv";

export const UnifiedRenderer: React.FC<{ data: CVDocument | null }> = ({
  data,
}) => {
  if (!data) return null;
  
  const templateId = data.settings.templateId;
  const activeTemplate =
    templates.find((t) => t.id === templateId) || templates[0];
  
  console.log("UnifiedRenderer: Rendering", {
    templateId,
    resolvedTemplate: activeTemplate.id,
    design: data.settings.design,
    settings: data.settings
  });
  
  console.log("UnifiedRenderer: Rendering", {
    templateId,
    resolvedTemplate: activeTemplate.id,
    data: JSON.stringify(data.settings),
    sections: Object.keys(data.sections)
  });

  const TemplateRenderer = activeTemplate.component;

  return (
    <>
      <div className="absolute top-0 left-0 bg-red-500 text-white p-2 z-[9999]">
        Rendering: {activeTemplate.name}
      </div>
      <TemplateRenderer data={data} />
    </>
  );
};
