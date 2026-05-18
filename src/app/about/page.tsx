import { Footer } from "@/components/layout/footer";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 page-padding">
      <main className="flex flex-col">
        <ComingSoon
          title="About StackCV"
          description="StackCV was born from the idea that everyone deserves a high-impact resume. Learn about our mission to democratize career growth with AI."
        />
        <Footer />
      </main>
    </div>
  );
}
