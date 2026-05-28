import type React from "react";
import { templates } from "@/lib/templates";
import type { CVDocument } from "@/types/cv";

export const UnifiedRenderer: React.FC<{ data: CVDocument }> = ({ data }) => {
  const activeTemplate =
    templates.find((t) => t.id === data.settings.templateId) || templates[0];
  const TemplateRenderer = activeTemplate.component;

  return <TemplateRenderer data={data} />;
};
