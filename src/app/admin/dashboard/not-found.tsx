import Link from "next/link";
import { FileQuestion, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminNotFound() {
  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col items-center justify-center text-center">
      <div className="bg-secondary/30 p-6 rounded-full mb-6">
        <FileQuestion className="w-12 h-12 text-muted-foreground" />
      </div>
      <h1 className="text-3xl font-black tracking-tighter mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        The administrative module you are looking for does not exist or is currently under development.
      </p>
      <Link href="/admin/dashboard">
        <Button className="font-bold gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
