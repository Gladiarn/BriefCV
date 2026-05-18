import { Footer } from "@/components/layout/footer";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 page-padding">
      <main className="flex flex-col">
        <ComingSoon
          title="Member Login"
          description="The secure authentication layer is currently under development. Soon you'll be able to save your drafts and access your history across devices."
        />
        <Footer />
      </main>
    </div>
  );
}
