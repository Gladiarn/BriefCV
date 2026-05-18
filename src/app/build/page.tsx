"use client";

import {
  ArrowRight,
  Clock,
  Download,
  FileText,
  LayoutTemplate,
  MoreVertical,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { templates } from "@/lib/templates";
import { type ResumeMetadata, resumeService } from "@/services/resumeService";

export default function BuildPage() {
  const [resumes, setResumes] = useState<ResumeMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await resumeService.getUserResumes();
        setResumes(data);
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const filteredResumes = useMemo(() => {
    return resumes.filter((r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [resumes, searchQuery]);

  return (
    <div className="container mx-auto px-4 md:px-6 page-padding relative min-h-screen">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-primary-purple/5 blur-[100px] rounded-full -z-10" />

      <main className="flex flex-col space-y-12 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              Your <span className="text-gradient">Professional Forge</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Manage your high-impact resumes or start a new transformation with
              AI.
            </p>
          </div>

          <Link href="/build/select-template">
            <Button size="xl" className="group shadow-pink-500/20 shadow-xl">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              Forge New Resume
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search your resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-2xl py-3 px-11 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Resumes Grid */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="text-xl font-bold tracking-tight">
              Recent Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Create New Card */}
            <Link href="/build/select-template" className="group">
              <Card className="h-full border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center p-8 gap-4 bg-transparent shadow-none">
                <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-bold">Forge New</p>
                  <p className="text-xs text-muted-foreground">
                    Start from scratch
                  </p>
                </div>
              </Card>
            </Link>

            {isLoading ? (
              // Loading Skeletons
              [...Array(3)].map((_, i) => (
                <Card
                  key={i}
                  className="h-[280px] animate-pulse bg-muted/20 border-none"
                />
              ))
            ) : filteredResumes.length > 0 ? (
              filteredResumes.map((resume) => {
                const template =
                  templates.find((t) => t.id === resume.templateId) ||
                  templates[0];
                return (
                  <Card
                    key={resume.id}
                    className="group relative p-0 overflow-visible border-primary/5 hover:border-primary/20 hover:shadow-2xl transition-all duration-500 rounded-[2rem]"
                  >
                    {/* Thumbnail Preview */}
                    <div
                      className={`aspect-[3/4] ${template.thumbnailColor} rounded-t-[2rem] p-6 relative overflow-hidden flex flex-col gap-2`}
                    >
                      <div className="w-full h-2 bg-foreground/10 rounded-full" />
                      <div className="w-2/3 h-2 bg-foreground/5 rounded-full" />
                      <div className="mt-4 space-y-2">
                        <div className="w-full h-1.5 bg-foreground/5 rounded-full" />
                        <div className="w-full h-1.5 bg-foreground/5 rounded-full" />
                        <div className="w-3/4 h-1.5 bg-foreground/5 rounded-full" />
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <Link href={`/build/new?id=${resume.id}`}>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="gap-2"
                          >
                            Edit Project <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <h3 className="font-bold truncate max-w-[150px]">
                            {resume.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                            <Clock className="w-3 h-3" />
                            {resume.lastEdited}
                          </div>
                        </div>
                        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded bg-primary/10 flex items-center justify-center">
                            <LayoutTemplate className="w-2.5 h-2.5 text-primary" />
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">
                            {template.name}
                          </span>
                        </div>

                        <div className="flex gap-1">
                          <button
                            className="p-1.5 rounded-lg hover:text-primary transition-colors"
                            title="Download"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:text-destructive transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <Card className="col-span-full py-20 flex flex-col items-center justify-center border-dashed border-2 bg-muted/5">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No resumes found</h3>
                <p className="text-muted-foreground mb-6 text-center max-w-xs">
                  {searchQuery
                    ? `No resumes match your search "${searchQuery}"`
                    : "You haven't forged any resumes yet. Start your journey today!"}
                </p>
                {!searchQuery && (
                  <Link href="/build/select-template">
                    <Button variant="outline" className="gap-2">
                      <Plus className="w-4 h-4" /> Forge Your First
                    </Button>
                  </Link>
                )}
              </Card>
            )}
          </div>
        </section>

        {/* Template Showcase Section */}
        <section className="pt-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-primary-purple rounded-full" />
              <h2 className="text-xl font-bold tracking-tight">
                AI-Optimized Blueprints
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card
                key={template.id}
                variant="glass"
                className="group p-6 border-primary/5 hover:border-primary/20 transition-all overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  <Sparkles className="w-24 h-24" />
                </div>

                <div
                  className={`w-full h-40 rounded-xl ${template.thumbnailColor} mb-6 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500`}
                >
                  <FileText className="w-12 h-12 text-foreground/40" />
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg">{template.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {template.description}
                  </p>
                  <div className="space-y-2">
                    {template.features.slice(0, 2).map((feature, i) => (
                        <p key={i} className="text-[10px] text-primary font-medium flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-primary" /> {feature}
                        </p>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{template.dimensions}</p>
                  <Link
                    href={`/build/new?template=${template.id}`}
                    className="block pt-2"
                  >
                    <Button
                      variant="secondary"
                      className="w-full text-xs font-bold uppercase tracking-widest"
                    >
                      Use Blueprint
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
