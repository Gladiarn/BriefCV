const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="h-full text-black flex flex-col space-y-8 text-left font-sans">
      <div className="border-b-2 border-black pb-4 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tight">
          {data.name || "Your Name"}
        </h1>
        <p className="text-xl font-bold text-gray-700">
          {data.role || "Target Role"}
        </p>
        <div className="flex justify-center gap-4 text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-widest">
          <span>{data.email}</span>
          {data.phone && <span>• {data.phone}</span>}
          {data.location && <span>• {data.location}</span>}
        </div>
      </div>

      {data.summary && (
        <section className="space-y-2">
          <h3 className="text-sm font-black uppercase tracking-widest border-b border-gray-200 pb-1">
            Summary
          </h3>
          <p className="text-[11px] text-gray-700 leading-relaxed text-justify">
            {data.summary}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest border-b border-gray-200 pb-1">
            Experience
          </h3>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-bold text-sm uppercase tracking-tight">
                    {exp.company}
                  </h4>
                  <span className="text-[10px] font-black">{exp.period}</span>
                </div>
                <p className="text-xs font-bold text-gray-600 mb-2 italic">
                  {exp.title}
                </p>
                <ul className="text-[10px] space-y-1.5 list-none text-gray-700">
                  {exp.points.split("\n").map((point, i) => (
                    <li key={i} className="relative pl-4">
                      <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-black rounded-full" />
                      {point.startsWith("•")
                        ? point.substring(1).trim()
                        : point.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8 pt-4">
        <section className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest border-b border-gray-200 pb-1">
            Education
          </h3>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h4 className="font-bold text-[11px] uppercase tracking-tight">
                  {edu.school}
                </h4>
                <p className="text-[10px] font-medium text-gray-600">
                  {edu.degree}
                </p>
                <span className="text-[10px] font-black">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest border-b border-gray-200 pb-1">
            Skills
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {data.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const MinimalistTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="h-full text-black flex flex-col space-y-6 text-left font-serif">
      <div className="flex justify-between items-end border-b border-black pb-6">
        <div>
          <h1 className="text-5xl font-light tracking-tighter">
            {data.name || "Your Name"}
          </h1>
          <p className="text-lg text-gray-500 mt-1 uppercase tracking-widest">
            {data.role || "Target Role"}
          </p>
        </div>
        <div className="text-right text-[10px] space-y-1 text-gray-600">
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p>{data.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_2.5fr] gap-12">
        <aside className="space-y-8">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
              Core Focus
            </h3>
            <div className="flex flex-col gap-2">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[10px] text-gray-700 border-l border-black pl-3"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
              Academic
            </h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <p className="text-[10px] font-bold">{edu.degree}</p>
                  <p className="text-[9px] text-gray-500">{edu.school}</p>
                  <p className="text-[9px] italic">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <main className="space-y-8">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
              Trajectory
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-bold">{exp.title}</h4>
                    <span className="text-[10px] italic text-gray-500">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-gray-800">
                    {exp.company}
                  </p>
                  <ul className="text-[10px] space-y-1 text-gray-600 list-disc ml-4">
                    {exp.points.split("\n").map((point, i) => (
                      <li key={i}>
                        {point.startsWith("•")
                          ? point.substring(1).trim()
                          : point.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

import { Briefcase, GraduationCap, Sparkles, User } from "lucide-react";
import type { FormSection, ResumeData, Template } from "@/types/resume";

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
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Alex Johnson",
      gridSpan: 1,
    },
    {
      id: "role",
      label: "Target Role",
      type: "text",
      placeholder: "Senior Product Manager",
      gridSpan: 1,
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "alex@forge.com",
      gridSpan: 1,
    },
    {
      id: "location",
      label: "Location",
      type: "text",
      placeholder: "San Francisco, CA",
      gridSpan: 1,
    },
    {
      id: "summary",
      label: "Professional Summary",
      type: "textarea",
      placeholder: "Briefly describe your career impact...",
      gridSpan: 2,
    },
    {
      id: "skills",
      label: "Core Skills",
      type: "list",
      placeholder: "Enter a skill...",
      gridSpan: 2,
    },
  ],
};

const EXPERIENCE_SECTION: FormSection = {
  id: "experience",
  title: "Work Experience",
  description: "Your history of professional impact.",
  icon: Briefcase,
  isRepeatable: true,
  fields: [
    {
      id: "company",
      label: "Company Name",
      type: "text",
      placeholder: "Forge Corp",
      gridSpan: 1,
    },
    {
      id: "period",
      label: "Period",
      type: "text",
      placeholder: "2021 - Present",
      gridSpan: 1,
    },
    {
      id: "title",
      label: "Job Title",
      type: "text",
      placeholder: "Lead Product Manager",
      gridSpan: 2,
    },
    {
      id: "points",
      label: "Bullet Points",
      type: "textarea",
      placeholder: "• Describe a key achievement...",
      gridSpan: 2,
    },
  ],
};

const EDUCATION_SECTION: FormSection = {
  id: "education",
  title: "Education",
  description: "Your academic background and certifications.",
  icon: GraduationCap,
  isRepeatable: true,
  fields: [
    {
      id: "school",
      label: "University / School",
      type: "text",
      placeholder: "Stanford University",
      gridSpan: 2,
    },
    {
      id: "degree",
      label: "Degree / Major",
      type: "text",
      placeholder: "B.S. in Computer Science",
      gridSpan: 1,
    },
    {
      id: "year",
      label: "Graduation Year",
      type: "text",
      placeholder: "2020",
      gridSpan: 1,
    },
  ],
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
      AI_SECTION,
    ],
    features: [
      "A4/US-Letter Size",
      "Editable Text",
      "Side-column Sidebar",
      "Serif Typography",
    ],
    dimensions: "210mm x 297mm (A4)",
  },
];
