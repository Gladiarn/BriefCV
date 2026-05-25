export type ColumnLayout = "1-column" | "2-column" | "3-column";

export interface ColumnMapping {
  leftColumn: string[];
  middleColumn: string[];
  rightColumn: string[];
  mainColumn: string[];
}

export interface CVDocument {
  id: string;
  title: string;
  settings: {
    templateId: string;
    layoutStructure: ColumnLayout;
    columnMapping: ColumnMapping;
    design: {
      primaryColor: string;
      fontSize: "sm" | "md" | "lg";
      spacing: "compact" | "normal" | "relaxed";
      fontFamily: "sans" | "serif" | "mono";
      sectionGap: number;
    };
  };
  sections: Record<string, CVSection>;
}

export type SectionType =
  | "header"
  | "experience"
  | "education"
  | "skills"
  | "custom";

export interface BaseSection {
  id: string;
  type: SectionType;
  title: string; // User-editable section title (e.g., "Work History" instead of "Experience")
  isVisible: boolean;
}

export interface HeaderSection extends BaseSection {
  type: "header";
  content: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    links: { label: string; url: string }[];
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string[]; // Array of bullet points
}

export interface ExperienceSection extends BaseSection {
  type: "experience";
  content: ExperienceItem[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationSection extends BaseSection {
  type: "education";
  content: EducationItem[];
}

export interface SkillsSection extends BaseSection {
  type: "skills";
  content: string[]; // Tags/items array
}

export interface CustomSection extends BaseSection {
  type: "custom";
  content: {
    text: string;
  };
}

export type CVSection =
  | HeaderSection
  | ExperienceSection
  | EducationSection
  | SkillsSection
  | CustomSection;
