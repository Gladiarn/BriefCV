import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  { name: "AI Resume Builder", starter: true, pro: true, enterprise: true },
  { name: "PDF Export", starter: true, pro: true, enterprise: true },
  { name: "Unlimited Templates", starter: false, pro: true, enterprise: true },
  { name: "Priority Support", starter: false, pro: true, enterprise: true },
  { name: "Team Management", starter: false, pro: false, enterprise: true },
];

export function FeatureComparison() {
  return (
    <div className="mt-24 w-full">
      <h2 className="text-3xl font-bold mb-12">Compare Plans</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="py-4 px-6 text-sm font-bold uppercase text-muted-foreground">
                Feature
              </th>
              <th className="py-4 px-6 text-sm font-bold uppercase text-muted-foreground">
                Starter
              </th>
              <th className="py-4 px-6 text-sm font-bold uppercase text-primary">
                Professional
              </th>
              <th className="py-4 px-6 text-sm font-bold uppercase text-muted-foreground">
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.name} className="border-b border-border/50">
                <td className="py-4 px-6 font-medium">{feature.name}</td>
                <td className="py-4 px-6">
                  {feature.starter ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground/30" />
                  )}
                </td>
                <td className="py-4 px-6 bg-primary/5">
                  {feature.pro ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground/30" />
                  )}
                </td>
                <td className="py-4 px-6">
                  {feature.enterprise ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground/30" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
