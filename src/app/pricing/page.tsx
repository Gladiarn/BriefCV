import { Footer } from "@/components/layout/footer";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-background page-padding isolate">
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 flex flex-col">
        <div className="container mx-auto px-4 md:px-6 pt-5">
          <ComingSoon
            title="Pricing Plans"
            description="StackCV is built to be accessible. We're finalizing our fair pricing models, including a robust free tier for everyone."
          />
        </div>
        <Footer />
      </main>
    </div>
  );
}
