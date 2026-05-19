import { Footer } from "@/components/layout/footer";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background page-padding isolate">
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 flex flex-col">
        <div className="container mx-auto px-4 md:px-6 pt-12 md:pt-20">
          <ComingSoon
            title="About StackCV"
            description="StackCV was born from the idea that everyone deserves a high-impact resume. Learn about our mission to democratize career growth with AI."
          />
        </div>
        <Footer />
      </main>
    </div>
  );
}
