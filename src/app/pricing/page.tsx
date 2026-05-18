import { Footer } from "@/components/layout/footer";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 page-padding">
      <main className="flex flex-col">
        <ComingSoon
          title="Pricing Plans"
          description="StackCV is built to be accessible. We're finalizing our fair pricing models, including a robust free tier for everyone."
        />
        <Footer />
      </main>
    </div>
  );
}
