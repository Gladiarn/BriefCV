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
  templateId: "modern"
};


export const resumeService = {
  /**
   * Fetches all resumes for the current user
   */
  async getUserResumes(): Promise<ResumeMetadata[]> {
    // In a real backend, this would be:
    // const response = await fetch('/api/resumes');
    // return response.json();

    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockUserResumes;
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
    data: ResumeData,
    id?: string,
  ): Promise<{ success: boolean; id: string }> {
    // In a real backend, this would be a POST or PUT request
    console.log("Saving resume:", { id, data });

    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      id: id || Math.random().toString(36).substring(7),
    };
  },

  /**
   * Deletes a resume
   */
  async deleteResume(id: string): Promise<{ success: boolean }> {
    // In a real backend, this would be:
    // await fetch(`/api/resumes/${id}`, { method: 'DELETE' });

    console.log("Deleting resume:", id);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  },
};
