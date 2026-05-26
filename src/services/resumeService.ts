import type { ResumeData } from "@/types/resume";

export interface ResumeMetadata {
  id: string;
  title: string;
  lastEdited: string;
  templateId: string;
}

const mockUserResumes: ResumeMetadata[] = [
  {
    id: "1",
    title: "Senior Product Manager",
    lastEdited: "2 hours ago",
    templateId: "modern",
  },
  {
    id: "2",
    title: "Software Engineer CV",
    lastEdited: "1 day ago",
    templateId: "minimalist",
  },
];

const DEFAULT_RESUME: ResumeData = {
  name: "",
  role: "",
  email: "",
  phone: "",
  location: "",
  portfolio: "",
  github: "",
  summary: "",
  experience: [],
  education: [],
  projects: [],
  skills: [],
  awards: [],
  sectionTitles: {
    experience: "Experience",
    education: "Education",
  },
  templateId: "modern",
};

export const resumeService = {
  /**
   * Fetches all resumes for the current user
   */
  async getUserResumes(): Promise<ResumeMetadata[]> {
    const res = await fetch("/api/resumes");
    if (!res.ok) throw new Error("Failed to fetch resumes");

    const data = await res.json();
    return data.map((resume: any) => ({
      id: resume._id,
      title: resume.title,
      lastEdited: new Date(resume.updatedAt).toLocaleDateString(),
      templateId: resume.settings.templateId,
    }));
  },

  /**
   * Fetches a single resume by ID
   */
  async getResumeById(id: string): Promise<ResumeData | null> {
    // In a real backend, this would be:
    // const response = await fetch(`/api/resumes/${id}`);
    // return response.json();

    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (id === "1") {
      return {
        ...DEFAULT_RESUME,
        name: "Alex Johnson",
        role: "Senior Product Manager",
        email: "alex@forge.com",
        templateId: "modern",
        experience: [
          {
            id: "exp-1",
            company: "Forge Corp",
            title: "Lead Product Manager",
            period: "2021 - Present",
            points:
              "• Spearheaded the development of AI-driven tools.\n• Increased user engagement by 40%.",
          },
        ],
      };
    } else if (id === "2") {
      return {
        ...DEFAULT_RESUME,
        name: "Sam Smith",
        role: "Software Engineer",
        email: "sam@forge.com",
        templateId: "minimalist",
        experience: [
          {
            id: "exp-2",
            company: "Tech Solutions",
            title: "Full Stack Developer",
            period: "2019 - 2021",
            points:
              "• Built scalable microservices.\n• Optimized database queries.",
          },
        ],
      };
    }
    return null;
  },

  /**
   * Saves or updates a resume
   */
  async saveResume(
    data: any,
    id?: string,
  ): Promise<{ success: boolean; id: string }> {
    const res = await fetch("/api/resumes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to save resume");
    const result = await res.json();

    return {
      success: true,
      id: result.id,
    };
  },

  /**
   * Deletes a resume
   */
  async deleteResume(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/resumes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete resume");
    return { success: true };
  },

  /**
   * Renames a resume
   */
  async renameResume(
    id: string,
    newTitle: string,
  ): Promise<{ success: boolean }> {
    const res = await fetch("/api/resumes/rename", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title: newTitle }),
    });

    if (!res.ok) throw new Error("Failed to rename resume");
    return { success: true };
  },
};
