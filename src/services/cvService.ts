import { templates } from "@/lib/templates";
import type { CVDocument } from "@/types/cv";

const STORAGE_KEY = "briefcv_documents";

const _delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const cvService = {
  async getDocuments(): Promise<CVDocument[]> {
    try {
      const res = await fetch("/api/resumes");
      if (res.ok) {
        const data = await res.json();
        return data.map((resume: any) => ({
          id: resume._id,
          title: resume.title,
          settings: resume.settings,
          sections: resume.sections,
        }));
      }
    } catch (e) {
      console.warn(
        "Failed to fetch from backend, falling back to localStorage",
        e,
      );
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  async getDocumentById(id: string): Promise<CVDocument | null> {
    const docs = await this.getDocuments();
    return docs.find((d) => d.id === id) || null;
  },

  async saveDocument(doc: CVDocument): Promise<void> {
    // 1. Save to Backend if possible
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });
      if (!res.ok) throw new Error("Backend save failed");
    } catch (e) {
      console.warn("Failed to save to backend, saving only to localStorage", e);
    }

    // 2. Save to LocalStorage (Fallback/Hybrid)
    const docs = await this.getDocuments();
    const index = docs.findIndex((d) => d.id === doc.id);

    if (index >= 0) {
      docs[index] = doc;
    } else {
      docs.push(doc);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  },

  async deleteDocument(id: string): Promise<void> {
    const docs = await this.getDocuments();
    const filtered = docs.filter((d) => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  async createDefaultDocument(
    templateId: string = "modern",
  ): Promise<CVDocument> {
    const id = crypto.randomUUID();
    const template = templates.find((t) => t.id === templateId) || templates[0];
    const layout = template.defaultLayout || "1-column";

    // Use template-specific defaults or fallback to generic layout
    const defaultMapping = {
      leftColumn: layout !== "1-column" ? ["header-1"] : [],
      middleColumn: [],
      rightColumn:
        layout !== "1-column"
          ? ["experience-1", "education-1", "skills-1"]
          : [],
      mainColumn:
        layout === "1-column"
          ? ["header-1", "experience-1", "education-1", "skills-1"]
          : [],
      ...(template.defaultMapping || {}),
    };

    const doc: CVDocument = {
      id,
      title: "Untitled CV",
      settings: {
        templateId,
        layoutStructure: layout,
        columnMapping: defaultMapping,
        design: {
          primaryColor: "#000000",
          fontSize: "md",
          spacing: "normal",
          fontFamily: "sans",
          sectionGap: 15,
          ...(template.defaultDesign || {}),
        },
      },
      sections: {
        "header-1": {
          id: "header-1",
          type: "header",
          title: "Personal Information",
          isVisible: true,
          content: {
            fullName: "",
            jobTitle: "",
            contacts: [
              {
                id: crypto.randomUUID(),
                type: "email",
                label: "Email",
                value: "",
              },
              {
                id: crypto.randomUUID(),
                type: "phone",
                label: "Phone",
                value: "",
              },
              {
                id: crypto.randomUUID(),
                type: "location",
                label: "Location",
                value: "",
              },
            ],
          },
        },
        "experience-1": {
          id: "experience-1",
          type: "experience",
          title: "Work Experience",
          isVisible: true,
          content: [],
        },
        "education-1": {
          id: "education-1",
          type: "education",
          title: "Education",
          isVisible: true,
          content: [],
        },
        "skills-1": {
          id: "skills-1",
          type: "skills",
          title: "Skills",
          isVisible: true,
          content: [],
        },
      },
    };
    // Removed automatic backend save to prevent duplication on initialization
    return doc;
  },
};
