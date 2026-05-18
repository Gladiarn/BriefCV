import React from 'react';
import { renderToString } from 'react-dom/server';
import { ModernTemplate } from '@/templates/modern';
import { MinimalistTemplate } from '@/templates/minimalist';
import { ExecutiveTemplate } from '@/templates/executive';
import { ProfessionalTemplate } from '@/templates/professional';

const TemplateMap: Record<string, React.FC<{ data: any }>> = {
  modern: ModernTemplate,
  minimalist: MinimalistTemplate,
  executive: ExecutiveTemplate,
  professional: ProfessionalTemplate,
};

export function renderResumeToHtml(resumeData: any) {
  const TemplateComponent = TemplateMap[resumeData.templateId] || ModernTemplate;
  return renderToString(React.createElement(TemplateComponent, { data: resumeData }));
}
