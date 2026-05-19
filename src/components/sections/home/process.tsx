import { FileText, MousePointer2, Share2, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <section className="py-24 md:py-32">
      <div className="flex flex-col items-center text-center mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-muted-foreground text-[11px] font-bold uppercase tracking-[0.2em]">
          The Workflow
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl leading-tight">
          Simple steps to build your <br className="hidden md:block" />{" "}
          professional future
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
        {steps.map((step, index) => (
          <div key={step.title} className="relative group">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-2xl shadow-black/[0.03]",
                  step.color,
                )}
              >
                <step.icon className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-primary/40 tracking-widest">
                  0{index + 1}
                </span>
                <h3 className="text-xl font-bold tracking-tight">
                  {step.title}
                </h3>
              </div>

              <p className="text-muted-foreground leading-relaxed text-[13px]">
                {step.description}
              </p>
            </div>

            {/* Connection Arrow (Desktop) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-[1px] bg-border/40" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
