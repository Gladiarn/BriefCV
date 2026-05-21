import { Footer } from "@/components/layout/footer";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-background page-padding isolate">
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 flex flex-col pt-5">
        <div className="container mx-auto px-4 md:px-6">
          <ComingSoon
            title="Member Login"
            description="The secure authentication layer is currently under development. Soon you'll be able to save your drafts and access your history across devices."
          />
        </div>
        <Footer />
      </main>
    </div>
  );
}
