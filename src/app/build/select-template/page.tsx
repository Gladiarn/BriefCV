"use client";

import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { templates } from "@/lib/templates";

export default function TemplateSelection() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-12">
        <Link href="/build">
          <Button variant="ghost" size="sm" className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-black tracking-tighter">
          Choose Your Template
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="group p-6 border-primary/10 hover:border-primary/30 transition-all flex flex-col gap-6"
          >
            <div
              className={`h-48 rounded-xl ${template.thumbnailColor} flex items-center justify-center`}
            >
              <span className="font-black text-foreground/20 text-4xl">
                {template.name}
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-xl">{template.name}</h3>
              <p className="text-xs text-muted-foreground">
                {template.description}
              </p>
            </div>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                setSelectedTemplate(template);
                setIsOpen(true);
              }}
            >
              Preview Template
            </Button>
          </Card>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-4xl rounded-3xl border border-border shadow-2xl p-8 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-muted rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-black tracking-tight mb-2">
              {selectedTemplate.name} Preview
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              {selectedTemplate.description}
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div
                className={`h-[400px] rounded-2xl ${selectedTemplate.thumbnailColor} flex items-center justify-center shadow-inner`}
              >
                <span className="font-black text-foreground/20 text-6xl">
                  {selectedTemplate.name}
                </span>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" /> Key Features
                  </h4>
                  <ul className="space-y-2">
                    {selectedTemplate.features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-bold">
                    Dimensions:{" "}
                    <span className="text-muted-foreground font-normal">
                      {selectedTemplate.dimensions}
                    </span>
                  </p>
                </div>
                <Link
                  href={`/build/new?template=${selectedTemplate.id}`}
                  className="block"
                >
                  <Button className="w-full gap-2 mt-4" size="lg">
                    Use this Template <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
