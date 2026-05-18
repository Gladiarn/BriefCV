import { Footer } from "@/components/layout/footer";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 page-padding">
      <main className="flex flex-col">
        <ComingSoon
          title="Resume Templates"
          description="We're designing a collection of elegant, ATS-optimized templates. You'll be able to choose between several professional layouts to showcase your experience."
        />
        <Footer />
      </main>
    </div>
  );
}
