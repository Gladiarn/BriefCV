# Project Specification & System Background

## 1. Project Background & Vision
We are building a highly responsive, multi-user **AI Resume Builder**. The objective of this application is to solve a common friction point for job seekers: transforming messy, casual, or unstructured text descriptions of career achievements into high-impact, metrics-driven, ATS-optimized (Applicant Tracking System) professional resume bullet points.

### Core Architectural Mechanics:
1. **Multi-Step Configuration Form:** Users input standard metadata (Full Name, Target Role/Designation, and Raw Experience Text Blocks).
2. **AI Optimization Layer:** Free tier text-generation calls optimize the phrasing into impactful professional descriptions.
3. **Persistent Cloud Storage:** Resumes and history entries are committed to a cloud database cluster to survive session refreshes and enable draft retrieval.
4. **Stateless Render & Export Engine:** The application compiles user records into an elegant markdown structure, rendering it using standard browser parsing utilities (`window.print()`) alongside tailored print media queries for clean, borderless PDF formatting.

---

## 2. Infrastructure & Cost Constraints (100% Free Tier Stack)
The application is architected to operate with **zero monthly overhead costs**, relying strictly on continuous free-tier operational parameters:

*   **Framework & Hosting:** Next.js App Router (deployed to Vercel Hobby Tier).
*   **Database Layer:** MongoDB Atlas (M0 Free Cluster utilizing a cached serverless Mongoose connection pool).
*   **AI Integration Engine:** Google AI Studio utilizing `gemini-2.5-flash`.
    *   *Free Constraints:* 10 Requests per Minute (RPM), 250 Requests per Day (RPD).
*   **Graceful Degradation Rule:** If the AI API returns a `429 Too Many Requests` state, the agent MUST catch the failure status, explicitly disable the AI processing UI layers via state adjustments (`isAiDisabled = true`), surface an explanatory alert banner, and safely permit standard manual text creation workflows.

---

## 3. UI Design System & Global Tokens (Tailwind CSS v4)
The application enforces a highly professional, modern, minimalist aesthetic. The layout balances clean canvas workspaces with a vibrant pink primary accent system (`#ec4899` / `#f472b6`).

The global configuration uses Tailwind v4 `@theme inline` mapping patterns matching the system theme layer variables:

### Light Mode Configuration (Default)
*   **Canvas & Layout:** Warm, soft white backgrounds (`#fafafa`) with deep obsidian text values (`#0a0a0a`).
*   **Components & Cards:** True white structural card containers (`#ffffff`) matching light gray standard input and accent layer configurations (`#e4e4e7`).
*   **Primary Action Accent:** Vibrant, high-contrast Pink (`#ec4899`) with white overlay components.

### Dark Mode Configuration (Overridden Setup)
*   **Canvas & Layout:** Deep minimalist black backgrounds (`#0a0a0a`) with silver-white typography text (`#fafafa`).
*   **Components & Cards:** High-contrast charcoal card containers (`#171717`) matched with dark gray inputs (`#27272a`).
*   **Primary Action Accent:** Bright, emissive Pastel Pink (`#f472b6`) ensuring perfect clarity and contrast in low-light environments.

---

## 4. Design Architecture Enforcement Script (`global.css`)
Your AI assistant must reference and stick directly to the following global stylesheet variables when composing layout structures, text scaling, interfaces, or specialized component sets:

```css
@custom-variant dark (&:is(.dark *));

:root {
  --font-size: 16px;
  --background: #fafafa;
  --foreground: #0a0a0a;
  --card: #ffffff;
  --card-foreground: #0a0a0a;
  --popover: #ffffff;
  --popover-foreground: #0a0a0a;
  --primary: #ec4899;
  --primary-foreground: #ffffff;
  --secondary: #f4f4f5;
  --secondary-foreground: #0a0a0a;
  --muted: #f4f4f5;
  --muted-foreground: #71717a;
  --accent: #e4e4e7;
  --accent-foreground: #0a0a0a;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #e4e4e7;
  --input: transparent;
  --input-background: #ffffff;
  --switch-background: #e4e4e7;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: #ec4899;
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.5rem;
  --sidebar: #fafafa;
  --sidebar-foreground: #0a0a0a;
  --sidebar-primary: #ec4899;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f4f4f5;
  --sidebar-accent-foreground: #0a0a0a;
  --sidebar-border: #e4e4e7;
  --sidebar-ring: #ec4899;
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --card: #171717;
  --card-foreground: #fafafa;
  --popover: #171717;
  --popover-foreground: #fafafa;
  --primary: #f472b6;
  --primary-foreground: #ffffff;
  --secondary: #27272a;
  --secondary-foreground: #fafafa;
  --muted: #27272a;
  --muted-foreground: #a1a1aa;
  --accent: #27272a;
  --accent-foreground: #fafafa;
  --destructive: #ef4444;
  --destructive-foreground: #fafafa;
  --border: #27272a;
  --input: #27272a;
  --ring: #f472b6;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: #171717;
  --sidebar-foreground: #fafafa;
  --sidebar-primary: #f472b6;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #27272a;
  --sidebar-accent-foreground: #fafafa;
  --sidebar-border: #27272a;
  --sidebar-ring: #f472b6;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }

  html {
    font-size: var(--font-size);
  }

  h1 {
    font-size: var(--text-2xl);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  h2 {
    font-size: var(--text-xl);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  h4 {
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  label {
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  button {
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  input {
    font-size: var(--text-base);
    font-weight: var(--font-weight-normal);
    line-height: 1.5;
  }
}

@media print {
  .print\:hidden {
    display: none !important;
  }
  body, main {
    background: #ffffff !important;
    color: #000000 !important;
    padding: 0 !important;
    margin: 0 !important;
  }
}