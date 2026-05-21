import { Footer } from "@/components/layout/footer";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background page-padding isolate">
      {/* Background Accent - Unique for About */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] bg-primary-purple/5 blur-[130px] rounded-full" />
        <div className="absolute top-0 right-1/4 w-[30%] h-[30%] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 flex flex-col pt-5">
        <div className="container mx-auto px-4 md:px-6">
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
