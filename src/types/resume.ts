export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnailColor: string;
  component: React.FC<{ data: ResumeData }>;
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
