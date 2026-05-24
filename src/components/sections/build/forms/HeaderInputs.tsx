"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/lib/store";
import type { HeaderSection } from "@/types/cv";

interface Props {
  section: HeaderSection;
}

export const HeaderInputs: React.FC<Props> = ({ section }) => {
  const updateField = useCVStore((state) => state.updateField);

  const handleChange = (field: string, value: string) => {
    updateField(section.id, field, value);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 space-y-1.5">
        <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
          Full Name
        </Label>
        <Input
          value={section.content.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          placeholder="John Doe"
          className="bg-muted/30 border-border rounded-xl"
        />
      </div>
      <div className="col-span-2 space-y-1.5">
        <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
          Job Title
        </Label>
        <Input
          value={section.content.jobTitle}
          onChange={(e) => handleChange("jobTitle", e.target.value)}
          placeholder="Software Engineer"
          className="bg-muted/30 border-border rounded-xl"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
          Email
        </Label>
        <Input
          type="email"
          value={section.content.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="john@example.com"
          className="bg-muted/30 border-border rounded-xl"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
          Phone
        </Label>
        <Input
          type="tel"
          value={section.content.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+1 234 567 890"
          className="bg-muted/30 border-border rounded-xl"
        />
      </div>
      <div className="col-span-2 space-y-1.5">
        <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-muted-foreground">
          Location
        </Label>
        <Input
          value={section.content.location}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="City, Country"
          className="bg-muted/30 border-border rounded-xl"
        />
      </div>
    </div>
  );
};
