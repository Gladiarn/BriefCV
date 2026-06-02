import {
  Briefcase,
  FolderGit2,
  GraduationCap,
  Sparkles,
  Trophy,
  User,
} from "lucide-react";
import { AcademicRenderer } from "@/templates/renderers/AcademicRenderer";
import { CreativeRenderer } from "@/templates/renderers/CreativeRenderer";
import { ExecutiveRenderer } from "@/templates/renderers/ExecutiveRenderer";
import { MinimalistRenderer } from "@/templates/renderers/MinimalistRenderer";
import { ModernRenderer } from "@/templates/renderers/ModernRenderer";
import { ProfessionalRenderer } from "@/templates/renderers/ProfessionalRenderer";
import { SidebarRenderer } from "@/templates/renderers/SidebarRenderer";
import { ZenithRenderer } from "@/templates/renderers/ZenithRenderer";
import type { FormSection, Template } from "@/types/resume";

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
    id: "sidebar",
    name: "Sidebar",
    description: "Modern layout with a colored sidebar.",
    thumbnailColor: "bg-gradient-to-br from-indigo-500/20 to-transparent",
    component: SidebarRenderer as any,
    sections: [
      BASICS_SECTION,
      EXPERIENCE_SECTION,
      EDUCATION_SECTION,
      AI_SECTION,
    ],
    features: ["A4", "Two-tone design"],
    dimensions: "210mm x 297mm",
    defaultLayout: "2-column",
    defaultDesign: {
      primaryColor: "#4f46e5", // Indigo for Sidebar
      spacing: "compact",
    },
    defaultMapping: {
      leftColumn: ["header-1", "skills-1", "education-1"],
      rightColumn: ["experience-1"],
    },
    defaultData: {},
  },
  {
    id: "academic",
    name: "Academic",
    description: "Refined, serif-based layout for researchers.",
    thumbnailColor: "bg-gradient-to-br from-amber-500/20 to-transparent",
    component: AcademicRenderer as any,
    sections: [
      BASICS_SECTION,
      EXPERIENCE_SECTION,
      EDUCATION_SECTION,
      AI_SECTION,
    ],
    features: ["A4", "Academic Focus"],
    dimensions: "210mm x 297mm",
    defaultLayout: "1-column",
    defaultDesign: {
      primaryColor: "#78350f", // Amber/Brown for Academic
      fontFamily: "serif",
    },
    defaultData: {},
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold, modern typography-focused layout.",
    thumbnailColor: "bg-gradient-to-br from-purple-500/20 to-transparent",
    component: CreativeRenderer as any,
    sections: [
      BASICS_SECTION,
      EXPERIENCE_SECTION,
      EDUCATION_SECTION,
      AI_SECTION,
    ],
    features: ["A4", "Creative typography"],
    dimensions: "210mm x 297mm",
    defaultLayout: "2-column",
    defaultDesign: {
      primaryColor: "#9333ea", // Purple for Creative
    },
    defaultMapping: {
      leftColumn: ["header-1"],
      rightColumn: ["experience-1", "education-1", "skills-1"],
    },
    defaultData: {},
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "High-end, whitespace-heavy professional layout.",
    thumbnailColor: "bg-gradient-to-br from-gray-500/20 to-transparent",
    component: MinimalistRenderer as any,
    sections: [
      BASICS_SECTION,
      EXPERIENCE_SECTION,
      EDUCATION_SECTION,
      AI_SECTION,
    ],
    features: ["A4", "Whitespace-focused"],
    dimensions: "210mm x 297mm",
    defaultLayout: "2-column",
    defaultDesign: {
      primaryColor: "#18181b", // Zinc-900 for Minimalist
      spacing: "relaxed",
    },
    defaultMapping: {
      leftColumn: ["header-1", "skills-1"],
      rightColumn: ["experience-1", "education-1"],
    },
    defaultData: {},
  },
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
    defaultDesign: {
      primaryColor: "#db2777", // Pink for Modern
    },
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
    defaultDesign: {
      primaryColor: "#0f172a", // Slate-900 for Executive
    },
    defaultMapping: {
      leftColumn: ["header-1", "education-1", "skills-1"],
      rightColumn: ["experience-1"],
    },
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
    defaultDesign: {
      primaryColor: "#2563eb", // Blue for Professional
    },
    defaultData: {},
  },
  {
    id: "zenith",
    name: "Zenith",
    description: "Bold, high-contrast, professional layout.",
    thumbnailColor: "bg-gradient-to-br from-gray-900 to-gray-700",
    component: ZenithRenderer as any,
    sections: [
      BASICS_SECTION,
      EXPERIENCE_SECTION,
      EDUCATION_SECTION,
      AI_SECTION,
    ],
    features: ["Bold Typography", "High Contrast"],
    dimensions: "210mm x 297mm",
    defaultLayout: "1-column",
    defaultDesign: {
      primaryColor: "#000000", // Black for Zenith
    },
    defaultData: {},
  },
];
