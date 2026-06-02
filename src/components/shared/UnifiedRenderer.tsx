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
  
  const TemplateRenderer = activeTemplate.component;

  return <TemplateRenderer data={data} />;
};
