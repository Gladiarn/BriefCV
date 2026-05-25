import {
  Briefcase,
  FolderGit2,
  GraduationCap,
  Sparkles,
  Trophy,
  User,
} from "lucide-react";
import { ModernPDFTemplate } from "@/templates/pdf/modern";
import { ExecutiveRenderer } from "@/templates/renderers/ExecutiveRenderer";
import { MinimalistRenderer } from "@/templates/renderers/MinimalistRenderer";
import { ModernRenderer } from "@/templates/renderers/ModernRenderer";
import { ProfessionalRenderer } from "@/templates/renderers/ProfessionalRenderer";
import type { FormSection, Template } from "@/types/resume";

export const pdfTemplates = {
  modern: ModernPDFTemplate,
};

export const AI_SECTION: FormSection = {
  id: "ai",
  title: "AI Forge",
  description: "Command the AI to optimize your content or add metrics.",
  icon: Sparkles,
  fields: [],
};

export const BASICS_SECTION: FormSection = {
  id: "basics",
  title: "Personal Identity",
  description: "Tell us who you are and how to reach you.",
  icon: User,
  fields: [
    {
      id: "image",
      label: "Profile Picture",
      type: "image",
      placeholder: "URL",
      gridSpan: 2,
    },
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Name",
      gridSpan: 1,
    },
    {
      id: "role",
      label: "Target Role",
      type: "text",
      placeholder: "Role",
      gridSpan: 1,
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Email",
      gridSpan: 1,
    },
    {
      id: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "Phone",
      gridSpan: 1,
    },
    {
      id: "location",
      label: "Location",
      type: "text",
      placeholder: "Location",
      gridSpan: 1,
    },
    {
      id: "summary",
      label: "Professional Summary",
      type: "textarea",
      placeholder: "Summary...",
      gridSpan: 2,
    },
  ],
};

export const EXPERIENCE_SECTION: FormSection = {
  id: "experience",
  title: "Work Experience",
  description: "Your history of professional impact.",
  icon: Briefcase,
  isRepeatable: true,
  fields: [
    {
      id: "company",
      label: "Company",
      type: "text",
      placeholder: "Company",
      gridSpan: 1,
    },
    {
      id: "role",
      label: "Role",
      type: "text",
      placeholder: "Role",
      gridSpan: 1,
    },
    {
      id: "startDate",
      label: "Start Date",
      type: "text",
      placeholder: "Start",
      gridSpan: 1,
    },
    {
      id: "endDate",
      label: "End Date",
      type: "text",
      placeholder: "End",
      gridSpan: 1,
    },
  ],
};

export const EDUCATION_SECTION: FormSection = {
  id: "education",
  title: "Education",
  description: "Academic background.",
  icon: GraduationCap,
  isRepeatable: true,
  fields: [
    {
      id: "institution",
      label: "Institution",
      type: "text",
      placeholder: "School",
      gridSpan: 2,
    },
    {
      id: "degree",
      label: "Degree",
      type: "text",
      placeholder: "Degree",
      gridSpan: 2,
    },
  ],
};

export const PROJECTS_SECTION: FormSection = {
  id: "projects",
  title: "Projects",
  description: "Key projects.",
  icon: FolderGit2,
  isRepeatable: true,
  fields: [
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: "Title",
      gridSpan: 2,
    },
  ],
};

export const AWARDS_SECTION: FormSection = {
  id: "awards",
  title: "Awards",
  description: "Highlights.",
  icon: Trophy,
  fields: [
    {
      id: "awards",
      label: "Awards",
      type: "list",
      placeholder: "Add award",
      gridSpan: 2,
    },
  ],
};

export const ALL_SECTIONS = [
  BASICS_SECTION,
  EXPERIENCE_SECTION,
  EDUCATION_SECTION,
  PROJECTS_SECTION,
  AWARDS_SECTION,
];

export const templates: Template[] = [
  {
    id: "modern",
    name: "Modern",
    description: "High-impact, center-aligned.",
    thumbnailColor: "bg-gradient-to-br from-pink-500/20 to-transparent",
    component: ModernRenderer as any,
    sections: [
      BASICS_SECTION,
      EXPERIENCE_SECTION,
      EDUCATION_SECTION,
      AI_SECTION,
    ],
    features: ["A4", "AI Metrics"],
    dimensions: "210mm x 297mm",
    defaultLayout: "1-column",
    defaultData: {},
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Elegant, serif-based design.",
    thumbnailColor: "bg-gradient-to-br from-blue-500/20 to-transparent",
    component: MinimalistRenderer as any,
    sections: [
      BASICS_SECTION,
      EXPERIENCE_SECTION,
      EDUCATION_SECTION,
      AI_SECTION,
    ],
    features: ["A4", "Serif Typography"],
    dimensions: "210mm x 297mm",
    defaultLayout: "2-column",
    defaultData: {},
  },
  {
    id: "executive",
    name: "Executive",
    description: "Authoritative design for leadership.",
    thumbnailColor: "bg-gradient-to-br from-slate-800/20 to-transparent",
    component: ExecutiveRenderer as any,
    sections: [
      BASICS_SECTION,
      EXPERIENCE_SECTION,
      EDUCATION_SECTION,
      AI_SECTION,
    ],
    features: ["ATS Optimized", "Geometric Layout"],
    dimensions: "210mm x 297mm",
    defaultLayout: "2-column",
    defaultData: {},
  },
  {
    id: "professional",
    name: "Professional",
    description: "Classic corporate-ready format.",
    thumbnailColor: "bg-gradient-to-br from-blue-600/20 to-transparent",
    component: ProfessionalRenderer as any,
    sections: [
      BASICS_SECTION,
      EXPERIENCE_SECTION,
      EDUCATION_SECTION,
      AI_SECTION,
    ],
    features: ["ATS Optimized", "Traditional Layout"],
    dimensions: "210mm x 297mm",
    defaultLayout: "1-column",
    defaultData: {},
  },
];
