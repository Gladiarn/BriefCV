import { FileText, MousePointer2, Share2, Wand2 } from "lucide-react";
import { Card } from "../../ui/card";

const steps = [
  {
    title: "Input Raw Content",
    description:
      "Paste your messy notes, casual experience, or old resume text. Don't worry about the formatting yet.",
    icon: FileText,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "AI Optimization",
    description:
      "Our Gemini-powered engine scans for keywords and injects high-impact metrics into every bullet point.",
    icon: Wand2,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Pick a Template",
    description:
      "Choose from a selection of modern, minimalist layouts designed to catch a recruiter's eye.",
    icon: MousePointer2,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Instant Export",
    description:
      "Download your professional PDF in seconds. Borderless, clean, and ready for your next application.",
    icon: Share2,
    color: "bg-emerald-500/10 text-emerald-500",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 relative">
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <div className="bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
          The Workflow
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-gradient py-2 leading-tight">
          Simple Steps to <br className="hidden md:block" /> Your Next Big Win
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-[1px] bg-border z-0" />

        {steps.map((step, index) => (
          <div key={step.title} className="relative z-10">
            <Card className="group flex flex-col h-full hover:border-primary/40 hover:shadow-lg transition-all duration-500 p-6 rounded-[1.5rem]">
              <div
                className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-sm`}
              >
                <step.icon className="w-5 h-5" />
              </div>

              <div className="absolute top-6 right-6 text-4xl font-black text-muted/5 group-hover:text-primary/10 transition-colors">
                {index + 1}
              </div>

              <h3 className="text-lg font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-xs">
                {step.description}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
