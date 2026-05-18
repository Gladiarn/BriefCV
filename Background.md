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

import { useState } from 'react';
import { Sparkles, Settings2, Download, Pencil, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

const defaultResumeData = {
  name: 'ALEX JOHNSON',
  title: 'Senior Product Manager',
  contact: {
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  },
  summary: 'Results-driven product manager with 8+ years of experience leading cross-functional teams to deliver innovative solutions. Proven track record of increasing user engagement by 40% and revenue growth of $2M+ annually.',
  experience: [
    {
      title: 'Senior Product Manager',
      company: 'Tech Innovations Inc.',
      period: '2021 - Present',
      points: [
        'Led product strategy for flagship SaaS platform serving 100K+ active users',
        'Increased user retention by 35% through data-driven feature prioritization',
        'Managed $5M product budget and coordinated team of 12 engineers and designers'
      ]
    },
    {
      title: 'Product Manager',
      company: 'StartUp Ventures',
      period: '2018 - 2021',
      points: [
        'Launched 3 major product features that generated $1.5M in additional revenue',
        'Reduced customer churn by 25% through improved onboarding experience',
        'Conducted user research with 200+ participants to inform product roadmap'
      ]
    }
  ],
  education: [
    {
      degree: 'MBA, Product Management',
      school: 'Stanford University',
      year: '2018'
    },
    {
      degree: 'BS, Computer Science',
      school: 'UC Berkeley',
      year: '2015'
    }
  ],
  skills: [
    'Product Strategy',
    'Agile/Scrum',
    'A/B Testing',
    'User Research',
    'SQL',
    'Analytics',
    'Roadmap Planning',
    'Cross-functional Leadership'
  ]
};

export function BuilderPage() {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [inputText, setInputText] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [aiOptions, setAiOptions] = useState({
    emphasizeMetrics: true,
    matchJobDesc: false,
    simplifyLanguage: false
  });

  const handleMagicPopulate = () => {
    if (inputText.trim()) {
      alert('AI processing would happen here. In production, this would call an AI API to generate resume content based on your input.');
    }
  };

  const handleDownload = () => {
    alert('PDF download would be triggered here');
  };

  const handleEditSection = (section: string) => {
    alert(`Edit mode for ${section} section would open here. The content would be pulled back into the AI input area.`);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles className="size-4 text-white" />
            </div>
            <h1 className="font-semibold text-lg">ResumeAI</h1>
          </Link>

          <button
            onClick={handleDownload}
            className="px-6 py-2.5 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg"
          >
            <Download className="size-4" />
            Download PDF
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden max-w-[1800px] mx-auto w-full">
        <div className="w-[35%] border-r border-border bg-card overflow-auto">
          <div className="p-8 space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="size-24 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-pink-500/30 animate-pulse">
                  <Sparkles className="size-12 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 size-8 rounded-full bg-green-500 border-4 border-card flex items-center justify-center">
                  <div className="size-2 rounded-full bg-white" />
                </div>
              </div>
              <div>
                <h2 className="mb-1">AI Assistant</h2>
                <p className="text-sm text-muted-foreground">Ready to help build your resume</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Drop your rough content, bio, or paste a LinkedIn URL here</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your LinkedIn bio, job description, or any professional experience...&#10;&#10;Example:&#10;Senior Product Manager at TechCo&#10;- Led team of 10 engineers&#10;- Increased revenue by 45%&#10;- Launched 3 major products"
                className="w-full h-64 p-4 rounded-xl bg-muted/30 border border-border resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm"
              />

              <button
                onClick={handleMagicPopulate}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25"
              >
                <Sparkles className="size-5" />
                ✨ Magic Populate
              </button>
            </div>

            <div className="border-t border-border pt-6">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors mb-4"
              >
                <Settings2 className="size-4" />
                <span>Control Panel</span>
              </button>

              {showSettings && (
                <div className="space-y-4 p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emphasize Impact Metrics</span>
                    <button
                      onClick={() => setAiOptions({ ...aiOptions, emphasizeMetrics: !aiOptions.emphasizeMetrics })}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        aiOptions.emphasizeMetrics ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform ${
                          aiOptions.emphasizeMetrics ? 'translate-x-5' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Match to Job Description</span>
                    <button
                      onClick={() => setAiOptions({ ...aiOptions, matchJobDesc: !aiOptions.matchJobDesc })}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        aiOptions.matchJobDesc ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform ${
                          aiOptions.matchJobDesc ? 'translate-x-5' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Simplify Language</span>
                    <button
                      onClick={() => setAiOptions({ ...aiOptions, simplifyLanguage: !aiOptions.simplifyLanguage })}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        aiOptions.simplifyLanguage ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform ${
                          aiOptions.simplifyLanguage ? 'translate-x-5' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-muted/20 p-12">
          <div className="max-w-[850px] mx-auto">
            <div className="bg-white shadow-2xl rounded-lg p-16 space-y-10">
              <div className="border-b border-gray-200 pb-8 relative group">
                <button
                  onClick={() => handleEditSection('header')}
                  className="absolute -right-3 -top-3 size-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Pencil className="size-4" />
                </button>
                <h1 className="uppercase tracking-widest mb-3 text-3xl">{resumeData.name}</h1>
                <p className="text-gray-600 text-lg mb-4">{resumeData.title}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>{resumeData.contact.email}</span>
                  <span>•</span>
                  <span>{resumeData.contact.phone}</span>
                  <span>•</span>
                  <span>{resumeData.contact.location}</span>
                </div>
              </div>

              {resumeData.summary && (
                <div className="relative group p-6 rounded-lg border border-gray-100 bg-gray-50/50">
                  <button
                    onClick={() => handleEditSection('summary')}
                    className="absolute -right-3 -top-3 size-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <h3 className="uppercase tracking-widest text-xs font-semibold mb-3 text-gray-700">Summary</h3>
                  <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                </div>
              )}

              <div className="relative group p-6 rounded-lg border border-gray-100 bg-gray-50/50">
                <button
                  onClick={() => handleEditSection('experience')}
                  className="absolute -right-3 -top-3 size-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Pencil className="size-4" />
                </button>
                <h3 className="uppercase tracking-widest text-xs font-semibold mb-5 text-gray-700">Experience</h3>
                <div className="space-y-6">
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                          <p className="text-gray-600 text-sm">{exp.company}</p>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">{exp.period}</span>
                      </div>
                      <ul className="space-y-2 ml-4 mt-3">
                        {exp.points.map((point, pidx) => (
                          <li key={pidx} className="text-gray-700 text-sm list-disc leading-relaxed">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="relative group p-6 rounded-lg border border-gray-100 bg-gray-50/50">
                  <button
                    onClick={() => handleEditSection('education')}
                    className="absolute -right-3 -top-3 size-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <h3 className="uppercase tracking-widest text-xs font-semibold mb-4 text-gray-700">Education</h3>
                  <div className="space-y-4">
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-sm text-gray-900">{edu.degree}</h4>
                        <p className="text-gray-600 text-sm">{edu.school}</p>
                        <span className="text-xs text-gray-500">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative group p-6 rounded-lg border border-gray-100 bg-gray-50/50">
                  <button
                    onClick={() => handleEditSection('skills')}
                    className="absolute -right-3 -top-3 size-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <h3 className="uppercase tracking-widest text-xs font-semibold mb-4 text-gray-700">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-md text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router';
import { Plus, FileText, Download, Trash2, Copy, Edit, Calendar } from 'lucide-react';

const mockResumes = [
  {
    id: 1,
    name: 'Senior Product Manager Resume',
    template: 'Minimalist',
    lastEdited: '2 hours ago',
    thumbnail: true
  },
  {
    id: 2,
    name: 'Software Engineer CV',
    template: 'Modern',
    lastEdited: '1 day ago',
    thumbnail: true
  }
];

const templates = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean and simple, perfect for tech roles',
    color: 'from-gray-500 to-gray-700'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with subtle accents',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional layout for corporate roles',
    color: 'from-slate-500 to-slate-700'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and unique for creative industries',
    color: 'from-pink-500 to-purple-600'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior roles',
    color: 'from-indigo-500 to-indigo-700'
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Developer-focused with clean code aesthetics',
    color: 'from-emerald-500 to-emerald-700'
  }
];

export function DashboardPage() {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this resume?')) {
      alert(`Resume ${id} would be deleted`);
    }
  };

  const handleDuplicate = (id: number) => {
    alert(`Resume ${id} would be duplicated`);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">My Resumes</h1>
            <p className="text-muted-foreground">Create, manage, and download your professional resumes</p>
          </div>

          <Link
            to="/builder"
            className="group px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25 flex items-center gap-2"
          >
            <Plus className="size-5" />
            Create New Resume
          </Link>
        </div>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Recent Resumes</h2>

          <div className="grid grid-cols-3 gap-6">
            {mockResumes.map((resume) => (
              <div
                key={resume.id}
                className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="w-full h-full p-8 bg-white m-4 rounded shadow-inner">
                    <div className="space-y-4">
                      <div className="h-3 bg-gray-800 rounded w-3/4" />
                      <div className="h-2 bg-gray-400 rounded w-1/2" />
                      <div className="space-y-2 pt-4">
                        <div className="h-2 bg-gray-300 rounded" />
                        <div className="h-2 bg-gray-300 rounded" />
                        <div className="h-2 bg-gray-300 rounded w-5/6" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-border">
                  <h3 className="font-semibold mb-1 truncate">{resume.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="size-3" />
                    <span>{resume.lastEdited}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/builder?resume=${resume.id}`}
                      className="flex-1 py-2 px-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Edit className="size-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => alert('Download PDF')}
                      className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                      title="Download"
                    >
                      <Download className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(resume.id)}
                      className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="p-2 rounded-lg border border-border hover:bg-destructive/10 hover:text-destructive transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/builder"
              className="aspect-[8.5/11] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="size-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-semibold mb-1">Create New Resume</p>
                <p className="text-sm text-muted-foreground">Start from scratch with AI</p>
              </div>
            </Link>
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Choose a Template</h2>
            <p className="text-muted-foreground">Select a template to start building your resume</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {templates.map((template) => (
              <Link
                key={template.id}
                to={`/builder?template=${template.id}`}
                className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all"
              >
                <div className={`h-48 rounded-lg bg-gradient-to-br ${template.color} mb-4 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/5" />
                  <FileText className="size-16 text-white/90" />
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                    Preview
                  </div>
                </div>

                <h3 className="font-semibold mb-2">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>

                <button className="mt-4 w-full py-2 rounded-lg bg-primary/10 text-primary font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Use Template
                </button>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}