"use client";

import { Plus, Trash2 } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/lib/store";
import type { ContactItem, HeaderSection } from "@/types/cv";

interface Props {
  section: HeaderSection;
}

export const HeaderInputs: React.FC<Props> = ({ section }) => {
  const updateField = useCVStore((state) => state.updateField);

  const handleChange = (field: string, value: string) => {
    updateField(section.id, field, value);
  };

  const addContact = () => {
    const newContact: ContactItem = {
      id: crypto.randomUUID(),
      type: "email",
      label: "New Field",
      value: "",
    };
    updateField(section.id, "contacts", [
      ...section.content.contacts,
      newContact,
    ]);
  };

  const removeContact = (id: string) => {
    const newContacts = section.content.contacts.filter((c) => c.id !== id);
    updateField(section.id, "contacts", newContacts);
  };

  const updateContact = (
    id: string,
    field: keyof ContactItem,
    value: string,
  ) => {
    const newContacts = section.content.contacts.map((c) =>
      c.id === id ? { ...c, [field]: value } : c,
    );
    updateField(section.id, "contacts", newContacts);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-1.5">
          <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-foreground">
            Full Name
          </Label>
          <Input
            value={section.content.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="John Doe"
            className="bg-muted/30 border-border rounded-xl text-foreground font-bold"
          />
        </div>
        <div className="col-span-2 space-y-1.5">
          <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-foreground">
            Job Title
          </Label>
          <Input
            value={section.content.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
            placeholder="Software Engineer"
            className="bg-muted/30 border-border rounded-xl text-foreground"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <Label className="text-[10px] font-bold uppercase tracking-widest text-foreground">
            Contact Information
          </Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={addContact}
            className="h-6 text-[9px] font-black uppercase tracking-widest hover:text-primary gap-1"
          >
            <Plus className="w-3 h-3" /> Add Field
          </Button>
        </div>

        <div className="space-y-3">
          {section.content.contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex gap-2 group items-end animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <div className="flex-1 grid grid-cols-12 gap-2">
                <div className="col-span-4 space-y-1">
                  <Input
                    value={contact.label}
                    onChange={(e) =>
                      updateContact(contact.id, "label", e.target.value)
                    }
                    placeholder="Label"
                    className="h-8 text-[10px] bg-muted/20 border-transparent focus:border-primary/20 rounded-lg font-bold uppercase tracking-wider text-foreground"
                  />
                </div>
                <div className="col-span-8 space-y-1">
                  <Input
                    value={contact.value}
                    onChange={(e) =>
                      updateContact(contact.id, "value", e.target.value)
                    }
                    placeholder="Value (e.g. email, phone, link)"
                    className="h-8 text-[11px] bg-muted/20 border-transparent focus:border-primary/20 rounded-lg text-foreground"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeContact(contact.id)}
                className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}

          {section.content.contacts.length === 0 && (
            <div className="text-[10px] text-center py-4 border-2 border-dashed border-border/40 rounded-xl text-muted-foreground italic">
              No contact fields added.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
