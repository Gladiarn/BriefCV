import type { CVDocument } from "./cv";

export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "tel"
  | "list"
  | "image";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  gridSpan?: 1 | 2;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  icon?: any;
  fields: FormField[];
  isRepeatable?: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnailColor: string;
  component: React.FC<{ data: CVDocument }>;
  sections: FormSection[];
  features: string[];
  dimensions: string;
  defaultLayout: "1-column" | "2-column" | "3-column";
  previewImage?: string;
  defaultData: any; // Using any here to maintain compatibility with existing defaultData structures
}

// Legacy types to support old services during migration
export interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  period: string;
  points: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string;
  period: string;
}

export interface ResumeData {
  name: string;
  role: string;
  image?: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  github: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: string[];
  awards: string[];
  sectionTitles: {
    experience: string;
    education: string;
  };
  templateId: string;
}
