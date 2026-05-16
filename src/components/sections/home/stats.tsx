import { ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { Card } from "../../ui/card";

const stats = [
  { label: "Resumes Built", value: "10k+", icon: Users },
  { label: "ATS Score", value: "98%", icon: Target },
  { label: "Secure & Fast", value: "24/7", icon: ShieldCheck },
  { label: "Forever Free", value: "0$", icon: Sparkles },
];

export function StatsStrip() {
  return (
    <section className="py-12 md:py-16">
      <Card variant="glass" className="p-0 overflow-hidden border-primary/10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center p-6 md:p-8 group hover:bg-primary/[0.02] transition-colors"
            >
              <stat.icon className="w-5 h-5 text-primary mb-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="text-3xl font-black mb-1 tracking-tight">
                {stat.value}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
