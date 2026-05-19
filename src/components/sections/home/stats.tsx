import { ShieldCheck, Sparkles, Target, Users } from "lucide-react";

const stats = [
  { label: "Resumes Built", value: "10k+", icon: Users },
  { label: "ATS Score", value: "98%", icon: Target },
  { label: "Secure & Fast", value: "24/7", icon: ShieldCheck },
  { label: "Forever Free", value: "0$", icon: Sparkles },
];

export function StatsStrip() {
  return (
    <section className="py-12 border-y border-border/40 bg-secondary/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center lg:items-start group"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-3.5 h-3.5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </span>
              </div>
              <span className="text-3xl md:text-4xl font-bold tracking-tight">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
