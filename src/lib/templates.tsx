import { Briefcase, FolderGit2, GraduationCap, Sparkles, Trophy, User } from "lucide-react";
import type { FormSection, ResumeData, Template } from "@/types/resume";
import { ModernTemplate, MinimalistTemplate, ExecutiveTemplate, ProfessionalTemplate } from "@/templates";
import { ModernPDFTemplate } from "@/templates/pdf/modern";

export const pdfTemplates = {
  modern: ModernPDFTemplate,
  // Add others here as we build them
};

const AI_SECTION: FormSection = {
  id: "ai",
  title: "AI Forge",
  description: "Command the AI to optimize your content or add metrics.",
  icon: Sparkles,
  fields: [],
};

const BASICS_SECTION: FormSection = {
  id: "basics",
  title: "Personal Identity",
  description: "Tell us who you are and how to reach you.",
  icon: User,
  fields: [
    { id: "name", label: "Full Name", type: "text", placeholder: "Alex Johnson", gridSpan: 1 },
    { id: "role", label: "Target Role", type: "text", placeholder: "Senior Product Manager", gridSpan: 1 },
    { id: "email", label: "Email Address", type: "email", placeholder: "alex@forge.com", gridSpan: 1 },
    { id: "phone", label: "Phone", type: "tel", placeholder: "+1 555 123 4567", gridSpan: 1 },
    { id: "location", label: "Location", type: "text", placeholder: "San Francisco, CA", gridSpan: 1 },
    { id: "portfolio", label: "Portfolio URL", type: "text", placeholder: "https://your-portfolio.com", gridSpan: 1 },
    { id: "github", label: "GitHub URL", type: "text", placeholder: "https://github.com/user", gridSpan: 2 },
    { id: "summary", label: "Professional Summary", type: "textarea", placeholder: "Briefly describe your career impact...", gridSpan: 2 },
    { id: "skills", label: "Core Skills", type: "list", placeholder: "Enter a skill...", gridSpan: 2 },
  ]
};

const EXPERIENCE_SECTION: FormSection = {
  id: "experience",
  title: "Work Experience",
  description: "Your history of professional impact.",
  icon: Briefcase,
  isRepeatable: true,
  fields: [
    { id: "company", label: "Company Name", type: "text", placeholder: "Forge Corp", gridSpan: 1 },
    { id: "period", label: "Period", type: "text", placeholder: "2021 - Present", gridSpan: 1 },
    { id: "title", label: "Job Title", type: "text", placeholder: "Lead Product Manager", gridSpan: 2 },
    { id: "points", label: "Bullet Points", type: "textarea", placeholder: "• Describe a key achievement...", gridSpan: 2 },
  ]
};

const EDUCATION_SECTION: FormSection = {
  id: "education",
  title: "Education",
  description: "Your academic background and certifications.",
  icon: GraduationCap,
  isRepeatable: true,
  fields: [
    { id: "school", label: "University / School", type: "text", placeholder: "Stanford University", gridSpan: 2 },
    { id: "degree", label: "Degree / Major", type: "text", placeholder: "B.S. in Computer Science", gridSpan: 1 },
    { id: "year", label: "Graduation Year", type: "text", placeholder: "2020", gridSpan: 1 },
  ]
};

const PROJECTS_SECTION: FormSection = {
  id: "projects",
  title: "Project Experience",
  description: "Key projects you have worked on.",
  icon: FolderGit2,
  isRepeatable: true,
  fields: [
    { id: "title", label: "Project Title", type: "text", placeholder: "EcoCycle", gridSpan: 1 },
    { id: "period", label: "Period", type: "text", placeholder: "2026", gridSpan: 1 },
    { id: "technologies", label: "Technologies Used", type: "text", placeholder: "Next.js, Tailwind, Supabase", gridSpan: 2 },
    { id: "description", label: "Project Description", type: "textarea", placeholder: "High-performance inventory system...", gridSpan: 2 },
  ]
};

const AWARDS_SECTION: FormSection = {
  id: "awards",
  title: "Awards & Recognition",
  description: "Highlights and achievements.",
  icon: Trophy,
  fields: [
    { id: "awards", label: "Awards List", type: "list", placeholder: "Add an award...", gridSpan: 2 },
  ]
};

export const templates: Template[] = [
  {
    id: "modern",
    name: "Modern",
    description: "High-impact, center-aligned professional blueprint.",
    thumbnailColor: "bg-primary/10",
    component: ModernTemplate,
    sections: [
      BASICS_SECTION,
      EXPERIENCE_SECTION,
      EDUCATION_SECTION,
      AI_SECTION,
    ],
    features: [
      "A4/US-Letter Size",
      "Fully Editable Text",
      "Automatic AI Metrics",
      "Clean Typography",
    ],
    dimensions: "210mm x 297mm (A4)",
    defaultData: {
      name: "Alex Johnson",
      role: "Senior Product Manager",
      email: "alex@forge.com",
      phone: "+1 (555) 000-1234",
      location: "San Francisco, CA",
      portfolio: "https://alex-pm.com",
      github: "https://github.com/alex-pm",
      summary:
        "Results-driven Product Manager with 8+ years of experience leading cross-functional teams in high-growth tech environments. Expert in AI-driven product strategy and user engagement.",
      experience: [
        {
          id: "1",
          company: "Forge Corp",
          title: "Lead Product Manager",
          period: "2021 - Present",
          points:
            "• Spearheaded the development of AI-driven tools resulting in 40% user growth.\n• Managed a cross-functional team of 15 designers and engineers.",
        },
      ],
      education: [
        {
          id: "1",
          school: "Stanford University",
          degree: "M.S. in Computer Science",
          year: "2020",
        },
      ],
      projects: [
        { id: "1", title: "EcoCycle", description: "High-performance inventory system with carbon impact monitoring.", technologies: "Next.js, Tailwind, Supabase", period: "2026" }
      ],
      skills: [
        "Product Strategy",
        "AI/ML Integration",
        "User Research",
        "Agile Leadership",
      ],
      awards: ["PM of the Year 2024", "Top 10 AI Innovation 2023"],
      templateId: "modern",
    },
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Elegant, serif-based design with a side-column focus.",
    thumbnailColor: "bg-blue-500/10",
    component: MinimalistTemplate,
    sections: [
      BASICS_SECTION,
      EXPERIENCE_SECTION,
      EDUCATION_SECTION,
      PROJECTS_SECTION,
      AWARDS_SECTION,
      AI_SECTION,
    ],
    features: [
      "A4/US-Letter Size",
      "Editable Text",
      "Side-column Sidebar",
      "Serif Typography",
    ],
    dimensions: "210mm x 297mm (A4)",
    defaultData: {
      name: "Sam Smith",
      role: "Software Engineer",
      email: "sam@minimalist.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      portfolio: "https://sam-dev.com",
      github: "https://github.com/sam-dev",
      summary:
        "Passionate Software Engineer specializing in scalable microservices and elegant code architecture.",
      experience: [
        {
          id: "2",
          company: "Tech Solutions",
          title: "Full Stack Developer",
          period: "2019 - 2021",
          points:
            "• Architected microservices that reduced API latency by 30%.\n• Collaborated with global teams for feature delivery.",
        },
      ],
      education: [
        {
          id: "2",
          school: "MIT",
          degree: "B.S. in Computer Science",
          year: "2019",
        },
      ],
      projects: [
        { id: "2", title: "TourConnect", description: "Full-stack booking platform with real-time tracking.", technologies: "Next.js, Node.js, MongoDB", period: "2025" }
      ],
      skills: [
        "TypeScript",
        "Node.js",
        "System Design",
        "Cloud Infrastructure",
      ],
      awards: ["Best in Web Development 2022"],
      templateId: "minimalist",
    },
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated and authoritative design for senior leadership.",
    thumbnailColor: "bg-slate-800/10",
    component: ExecutiveTemplate,
    sections: [
      BASICS_SECTION,
      EXPERIENCE_SECTION,
      EDUCATION_SECTION,
      PROJECTS_SECTION,
      AWARDS_SECTION,
      AI_SECTION,
    ],
    features: ["ATS Optimized", "Sophisticated Typography", "Bold Header Sections", "Executive Layout"],
    dimensions: "210mm x 297mm (A4)",
    defaultData: {
      name: "Sarah Jenkins",
      role: "Chief Technology Officer",
      email: "sarah@exec.com",
      phone: "+1 (555) 777-8888",
      location: "Chicago, IL",
      portfolio: "https://sarah-exec.com",
      github: "https://github.com/sarah-exec",
      summary: "Strategic CTO with 15+ years experience in driving digital transformation and building high-performance engineering organizations.",
      experience: [
        {
          id: "3",
          company: "Global Tech Inc",
          title: "CTO",
          period: "2018 - Present",
          points: "• Led global engineering team of 200+ through a successful IPO.\n• Implemented AI-first strategy increasing operational efficiency by 50%.",
        },
      ],
      education: [
        {
          id: "3",
          school: "Harvard Business School",
          degree: "MBA",
          year: "2015",
        },
      ],
      projects: [
        { id: "3", title: "CloudScale", description: "Global infrastructure transformation project.", technologies: "AWS, Kubernetes, Terraform", period: "2024" }
      ],
      skills: ["Executive Strategy", "Cloud Infrastructure", "Organizational Scaling", "AI Roadmap"],
      awards: ["CTO of the Year 2023"],
      templateId: "executive",
    },
  },
  {
    id: "professional",
    name: "Professional",
    description: "Classic, formal, and corporate-ready format.",
    thumbnailColor: "bg-blue-800/10",
    component: ProfessionalTemplate,
    sections: [
      BASICS_SECTION,
      EXPERIENCE_SECTION,
      EDUCATION_SECTION,
      PROJECTS_SECTION,
      AWARDS_SECTION,
      AI_SECTION,
    ],
    features: ["ATS Optimized", "Traditional Layout", "Formal Typography", "Industry Standard"],
    dimensions: "210mm x 297mm (A4)",
    defaultData: {
      name: "John Doe",
      role: "Project Manager",
      email: "john@corp.com",
      phone: "+1 (555) 111-2222",
      location: "Dallas, TX",
      portfolio: "https://johndoe.com",
      github: "https://github.com/johndoe",
      summary: "Detail-oriented Project Manager dedicated to delivering complex projects within scope and budget.",
      experience: [
        {
          id: "4",
          company: "Big Corp Ltd",
          title: "Project Manager",
          period: "2020 - Present",
          points: "• Delivered 10+ major cross-departmental projects on time.\n• Optimized team workflows reducing project cycle time by 20%.",
        },
      ],
      education: [
        {
          id: "4",
          school: "UT Dallas",
          degree: "B.S. in Business Administration",
          year: "2018",
        },
      ],
      projects: [
        { id: "4", title: "WorkflowMax", description: "Internal project management tool for large enterprises.", technologies: "Jira, Agile, Scrum", period: "2023" }
      ],
      skills: ["Project Management", "Agile", "Risk Assessment", "Stakeholder Communication"],
      awards: ["Project Manager of the Quarter 2024"],
      templateId: "professional",
    },
  },
];
