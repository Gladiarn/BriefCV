2. Left Panel Blueprint (The Form Factory)
   The Left Panel must read the cvDocument state and dynamically render input controls based on the data structure. Do not hardcode specific section layouts in the main layout container.

Dynamic Component Mapping: Iterate through active sections using the order defined in the active layout column. Match section.type to a dictionary of atomic form components (e.g., <HeaderInputs />, <ListRepeaterInputs />).

Drag-and-Drop Order Management: Implement a drag-and-drop layer (using @dnd-kit or @hello-pangea/dnd). Users must be able to drag sections up and down to change their order sequence. Dragging updates the arrays in settings.columnMapping for the active column.

Multi-Column Layout Controls: Provide a high-level layout selector (1, 2, or 3 columns). When a user switches layout modes:

1 Column: All active section IDs collapse sequentially into columnMapping.mainColumn.

Multi-Column (2 or 3): The Left Panel provides interactive sub-zones or a mapping UI where users can assign/drag a section ID from one column list over to another (e.g., moving "Skills" from leftColumn to rightColumn).

3. Right Panel Blueprint (The Template Engine)
   The Preview Panel receives the cvDocument object. It acts as an orchestrator that maps data onto the layout configuration.

Layout Wrapper: The template engine inspects settings.layoutStructure. If it is "2-column", it renders a CSS Grid or Flexbox split wrapper (e.g., grid grid-cols-[1fr_2fr] using Tailwind CSS).

Data Injection: Inside the grid columns, loop over the respective column array IDs (settings.columnMapping.leftColumn, etc.), fetch the raw section content from the normalized sections object lookup table, and feed it into the active template's styling blocks.

Strict Print Bounds: The wrapper container must mirror real-world paper dimensions. Enforce fixed CSS dimensions for A4 formatting (w-[210mm] and min-h-[297mm]) so text flows predictably without clipping or breaking margins during eventual PDF generation.

4. State Management Requirements
   Implement a centralized state management solution (such as Zustand or a clean React useReducer pattern) to cleanly mutate nested values without triggering full-page visual glitches or stale closures.

Expose discrete actions:

UPDATE_FIELD(sectionId, fieldPath, value): Modifies a specific field inside a section's content block.

REORDER_SECTIONS(columnSource, columnDestination, startIndex, endIndex): Handles shifting IDs within or across column arrays.

TOGGLE_VISIBILITY(sectionId): Toggles the isVisible boolean without destructive deletion.

# System Architecture Prompt: Highly Customizable, Backend-Ready CV Builder Engine

## Context & Vision

We are building a highly flexible, customizable CV builder inspired by the UI/UX paradigms of FlowCV.
The interface splits into a two-panel layout:

1. **Left Panel (Control Center):** A configuration engine where users input data, toggle section visibility, rearrange structural layout, and customize multi-column formatting.
2. **Right Panel (Live Preview):** A completely decoupled, data-driven "dumb" container simulating an A4 sheet (`210mm` x `297mm`) that renders a selected template strictly based on a centralized state object.

To prevent code bloat and unmaintainable conditional logic, the entire platform must be driven by a rigid, normalized JSON schema (`cvDocument`). Nothing in the UI or layout logic should be hardcoded.

---

## 1. Centralized Data Schema (`cvDocument`)

The entire application state must adhere to this shape. Use TypeScript to enforce types strictly.

```typescript
type ColumnLayout = "1-column" | "2-column" | "3-column";

interface CVDocument {
  id: string;
  title: string;
  settings: {
    templateId: string;
    layoutStructure: ColumnLayout;
    columnMapping: {
      leftColumn: string[];   // Array of Section IDs
      rightColumn: string[];  // Array of Section IDs
      mainColumn: string[];   // Used if 1-column layout is selected
    };
    design: {
      primaryColor: string;
      fontSize: "sm" | "md" | "lg";
      spacing: "compact" | "normal" | "relaxed";
    };
  };
  sections: Record<string, CVSection>; // Normalized lookup dictionary [id: string]: CVSection
}

type CVSection = HeaderSection | ExperienceSection | EducationSection | SkillsSection | CustomSection;

interface BaseSection {
  id: string;
  type: "header" | "experience" | "education" | "skills" | "custom";
  title: string; // User-editable section title (e.g., "Work History" instead of "Experience")
  isVisible: boolean;
}

interface HeaderSection extends BaseSection {
  type: "header";
  content: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    links: string[];
  };
}

interface ExperienceSection extends BaseSection {
  type: "experience";
  content: Array<{
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description: string[]; // Array of bullet points
  }>;
}

interface EducationSection extends BaseSection {
  type: "education";
  content: Array<{
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
}

interface SkillsSection extends BaseSection {
  type: "skills";
  content: string[]; // Tags/items array
}

interface CustomSection extends BaseSection {
  type: "custom";
  content: {
    text: string;
  };
}
ADD_SECTION(type): Generates a new template section with a unique identifier.

5. Client-Side Only Isolation (Backend-Ready Architecture)
We are building this application 100% client-side with no backend for now. However, the codebase must be strictly engineered with "clean architecture" principles so that wiring up a Database or REST API later requires zero refactoring of our UI components.

Follow these strict boundaries:

Mock Network Latency Service: Create an isolated service layer (src/services/cvService.ts) that manages data persistence. Currently, this layer will read/write to localStorage. Wrap all data operations in asynchronous Functions (Promise) and simulate a 300ms network delay using a setTimeout wrapper.

Requirement: This forces the UI and Zustand store to handle loading states (isLoading), success hooks, and error state tracking from day one.

Normalized Database-Ready State: The cvDocument structure must remain strictly normalized using the lookup dictionary pattern. This mirrors how document stores (MongoDB/PostgreSQL JSONB) ingest and index nested relational data.

UUID Generation on the Client: When a user creates a new section or a new CV entry, use a client-side UUID generator (crypto.randomUUID() or uuidv4). This ensures IDs are valid instantly on the client, avoiding layout structural breaks.

Decoupled State Syncing: UI components must never communicate with localStorage directly. Components invoke Zustand actions -> Zustand triggers the async Service layer -> Service resolves -> Zustand updates the local state.
```
