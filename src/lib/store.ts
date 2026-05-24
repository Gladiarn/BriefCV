import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ColumnLayout,
  CVDocument,
  CVSection,
  SectionType,
} from "@/types/cv";

interface CVState {
  cvDocument: CVDocument | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCVDocument: (doc: CVDocument) => void;
  updateField: (sectionId: string, fieldPath: string, value: any) => void;
  reorderSections: (
    sourceColumn: keyof CVDocument["settings"]["columnMapping"],
    destinationColumn: keyof CVDocument["settings"]["columnMapping"],
    startIndex: number,
    endIndex: number,
  ) => void;
  toggleVisibility: (sectionId: string) => void;
  addSection: (type: SectionType) => void;
  updateLayoutStructure: (layout: ColumnLayout) => void;
  updateDesign: (design: Partial<CVDocument["settings"]["design"]>) => void;
  clearStore: () => void;
  }

  export const useCVStore = create<CVState>()(
  persist(
    (set, get) => ({
      cvDocument: null,
      isLoading: false,
      error: null,

      setCVDocument: (doc) => set({ cvDocument: doc }),
      clearStore: () => set({ cvDocument: null }),


      updateField: (sectionId, fieldPath, value) => {
        set((state) => {
          if (!state.cvDocument) return state;

          const section = state.cvDocument.sections[sectionId];
          if (!section) return state;

          const newSections = { ...state.cvDocument.sections };
          const pathParts = fieldPath.split(".");

          let current: any = { ...section.content };
          const root = current;

          for (let i = 0; i < pathParts.length - 1; i++) {
            current[pathParts[i]] = { ...current[pathParts[i]] };
            current = current[pathParts[i]];
          }
          current[pathParts[pathParts.length - 1]] = value;

          newSections[sectionId] = {
            ...section,
            content: root,
          } as CVSection;

          return {
            cvDocument: {
              ...state.cvDocument,
              sections: newSections,
            },
          };
        });
      },

      reorderSections: (
        sourceColumn,
        destinationColumn,
        startIndex,
        endIndex,
      ) => {
        set((state) => {
          if (!state.cvDocument) return state;

          const newMapping = { ...state.cvDocument.settings.columnMapping };
          const sourceList = [...newMapping[sourceColumn]];
          const destList =
            sourceColumn === destinationColumn
              ? sourceList
              : [...newMapping[destinationColumn]];

          const [removed] = sourceList.splice(startIndex, 1);
          destList.splice(endIndex, 0, removed);

          newMapping[sourceColumn] = sourceList;
          if (sourceColumn !== destinationColumn) {
            newMapping[destinationColumn] = destList;
          }

          return {
            cvDocument: {
              ...state.cvDocument,
              settings: {
                ...state.cvDocument.settings,
                columnMapping: newMapping,
              },
            },
          };
        });
      },

      toggleVisibility: (sectionId) => {
        set((state) => {
          if (!state.cvDocument) return state;
          const section = state.cvDocument.sections[sectionId];
          if (!section) return state;

          return {
            cvDocument: {
              ...state.cvDocument,
              sections: {
                ...state.cvDocument.sections,
                [sectionId]: {
                  ...section,
                  isVisible: !section.isVisible,
                },
              },
            },
          };
        });
      },

      addSection: (type) => {
        const id = crypto.randomUUID();
        const newSection: CVSection = {
          id,
          type,
          title: type.charAt(0).toUpperCase() + type.slice(1),
          isVisible: true,
          content:
            type === "skills"
              ? []
              : type === "experience" || type === "education"
                ? []
                : {},
        } as any;

        set((state) => {
          if (!state.cvDocument) return state;

          const layout = state.cvDocument.settings.layoutStructure;
          const targetColumn =
            layout === "1-column" ? "mainColumn" : "leftColumn";

          return {
            cvDocument: {
              ...state.cvDocument,
              sections: {
                ...state.cvDocument.sections,
                [id]: newSection,
              },
              settings: {
                ...state.cvDocument.settings,
                columnMapping: {
                  ...state.cvDocument.settings.columnMapping,
                  [targetColumn]: [
                    ...state.cvDocument.settings.columnMapping[targetColumn],
                    id,
                  ],
                },
              },
            },
          };
        });
      },

      updateLayoutStructure: (layout) => {
        set((state) => {
          if (!state.cvDocument) return state;

          const oldMapping = state.cvDocument.settings.columnMapping;
          const newMapping = { ...oldMapping };

          if (layout === "1-column") {
            newMapping.mainColumn = [
              ...oldMapping.leftColumn,
              ...oldMapping.rightColumn,
              ...oldMapping.mainColumn,
            ].filter((v, i, a) => a.indexOf(v) === i); // Unique
            newMapping.leftColumn = [];
            newMapping.rightColumn = [];
          } else if (state.cvDocument.settings.layoutStructure === "1-column") {
            newMapping.leftColumn = [...oldMapping.mainColumn];
            newMapping.mainColumn = [];
          }

          return {
            cvDocument: {
              ...state.cvDocument,
              settings: {
                ...state.cvDocument.settings,
                layoutStructure: layout,
                columnMapping: newMapping,
              },
            },
          };
        });
      },

      updateDesign: (design) => {
        set((state) => {
          if (!state.cvDocument) return state;
          return {
            cvDocument: {
              ...state.cvDocument,
              settings: {
                ...state.cvDocument.settings,
                design: {
                  ...state.cvDocument.settings.design,
                  ...design,
                },
              },
            },
          };
        });
      },
    }),
    {
      name: "cv-storage",
      partialize: (state) => ({ cvDocument: state.cvDocument }),
    },
  ),
);
