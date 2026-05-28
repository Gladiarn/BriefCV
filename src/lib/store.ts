import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ColumnLayout,
  ColumnMapping,
  CVDocument,
  CVSection,
  SectionType,
} from "@/types/cv";

interface CVState {
  cvDocument: CVDocument | null;
  isLoading: boolean;
  error: string | null;
  exportToPdfTrigger: boolean;

  // Actions
  setCVDocument: (doc: CVDocument) => void;
  setExportToPdfTrigger: (trigger: boolean) => void;
  updateField: (sectionId: string, fieldPath: string, value: any) => void;
  reorderSections: (
    sourceColumn: keyof ColumnMapping,
    destinationColumn: keyof ColumnMapping,
    startIndex: number,
    endIndex: number,
  ) => void;
  toggleVisibility: (sectionId: string) => void;
  addSection: (type: SectionType) => void;
  removeSection: (sectionId: string) => void;
  updateLayoutStructure: (layout: ColumnLayout) => void;
  updateDesign: (design: Partial<CVDocument["settings"]["design"]>) => void;
  updateTitle: (title: string) => void;
  clearStore: () => void;
}

export const useCVStore = create<CVState>()(
  persist(
    (set, _get) => ({
      cvDocument: null,
      isLoading: false,
      error: null,
      exportToPdfTrigger: false,

      setCVDocument: (doc) => set({ cvDocument: doc }),
      setExportToPdfTrigger: (trigger) => set({ exportToPdfTrigger: trigger }),
      clearStore: () => set({ cvDocument: null }),

      updateTitle: (title) => {
        set((state) => {
          if (!state.cvDocument) return state;
          return {
            cvDocument: {
              ...state.cvDocument,
              title: title,
            },
          };
        });
      },

      removeSection: (sectionId) => {
        set((state) => {
          if (!state.cvDocument) return state;

          const newSections = { ...state.cvDocument.sections };
          delete newSections[sectionId];

          const newMapping = { ...state.cvDocument.settings.columnMapping };
          for (const key in newMapping) {
            newMapping[key as keyof typeof newMapping] = newMapping[
              key as keyof typeof newMapping
            ].filter((id) => id !== sectionId);
          }

          return {
            cvDocument: {
              ...state.cvDocument,
              sections: newSections,
              settings: {
                ...state.cvDocument.settings,
                columnMapping: newMapping,
              },
            },
          };
        });
      },

      updateField: (sectionId, fieldPath, value) => {
        set((state) => {
          if (!state.cvDocument) return state;

          const section = state.cvDocument.sections[sectionId];
          if (!section) return state;

          const newSections = { ...state.cvDocument.sections };

          if (fieldPath === "title") {
            // Special handling for top-level properties like 'title'
            newSections[sectionId] = {
              ...section,
              title: value,
            };
          } else if (fieldPath === "") {
            // Direct content update
            newSections[sectionId] = {
              ...section,
              content: Array.isArray(value)
                ? [...value]
                : typeof value === "object"
                  ? { ...value }
                  : value,
            } as CVSection;
          } else {
            // Path-based object update within content
            const pathParts = fieldPath.split(".");
            // Deep copy the content
            const newContent =
              typeof section.content === "object"
                ? JSON.parse(JSON.stringify(section.content))
                : section.content;

            let current: any = newContent;
            for (let i = 0; i < pathParts.length - 1; i++) {
              current[pathParts[i]] = { ...current[pathParts[i]] };
              current = current[pathParts[i]];
            }
            current[pathParts[pathParts.length - 1]] = value;

            newSections[sectionId] = {
              ...section,
              content: newContent,
            } as CVSection;
          }

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
          const newMapping: ColumnMapping = {
            leftColumn: [],
            middleColumn: [],
            rightColumn: [],
            mainColumn: [],
          };

          const allSections = [
            ...oldMapping.leftColumn,
            ...oldMapping.middleColumn,
            ...oldMapping.rightColumn,
            ...oldMapping.mainColumn,
          ].filter((v, i, a) => a.indexOf(v) === i);

          if (layout === "1-column") {
            newMapping.mainColumn = allSections;
          } else if (layout === "2-column") {
            newMapping.leftColumn = allSections.slice(
              0,
              Math.ceil(allSections.length / 2),
            );
            newMapping.rightColumn = allSections.slice(
              Math.ceil(allSections.length / 2),
            );
          } else if (layout === "3-column") {
            newMapping.leftColumn = allSections.slice(
              0,
              Math.ceil(allSections.length / 3),
            );
            newMapping.middleColumn = allSections.slice(
              Math.ceil(allSections.length / 3),
              Math.ceil(allSections.length / 3) * 2,
            );
            newMapping.rightColumn = allSections.slice(
              Math.ceil(allSections.length / 3) * 2,
            );
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
