import type React from "react";
import { templates } from "@/lib/templates";
import type { CVDocument } from "@/types/cv";

export const UnifiedRenderer: React.FC<{ doc: CVDocument }> = ({ doc }) => {
  const activeTemplate =
    templates.find((t) => t.id === doc.settings.templateId) || templates[0];
  const TemplateRenderer = activeTemplate.component;

  // We simply delegate to the selected template component.
  // The layout logic (the grid) should be handled inside the template renderer
  // if we want to preserve unique template designs.
  // However, to fix the triple-rendering, the template renderer must NOT
  // do its own layout mapping if it's already being called from a layout-controlled container.
  // I will just let the TemplateRenderer handle everything.
  return <TemplateRenderer data={doc} />;
};
