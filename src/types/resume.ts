export type FieldType = "text" | "textarea" | "email" | "tel" | "list";

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
  component: React.FC<{ data: ResumeData }>;
  sections: FormSection[];
  features: string[];
  dimensions: string;
  previewImage?: string;
}

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

export interface ResumeData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  templateId: string;
}
