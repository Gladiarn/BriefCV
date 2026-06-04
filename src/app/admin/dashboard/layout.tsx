"use client";

import { AdminNavbar } from "@/components/layout/admin-navbar";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth-store";
import { UnauthorizedPage } from "@/components/shared/unauthorized-page";
import { Sparkles } from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { user, checkSession } = useAuthStore();
  const pathname = usePathname();

  // Initial session check
  useEffect(() => {
    const init = async () => {
      await checkSession();
      setIsChecking(false);
    };
    init();
  }, [checkSession]);

  // Close mobile sidebar on navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (isChecking) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background gap-4">
        <Sparkles className="w-12 h-12 text-primary/20" />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40">
          Authenticating Administrator...
        </p>
      </div>
    );
  }

  // If not logged in or not an admin, show unauthorized screen
  if (!user || user.role !== "admin") {
    return <UnauthorizedPage />;
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[45] md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-[50] h-full shrink-0 transition-all duration-300 ease-in-out",
          isMobileOpen
            ? "translate-x-0 w-60"
            : "-translate-x-full w-0 md:translate-x-0 md:relative",
          isSidebarExpanded ? "md:w-60" : "md:w-16",
        )}
      >
        <AdminSidebar
          isExpanded={isSidebarExpanded}
          onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <AdminNavbar
          onMenuClick={() => setIsMobileOpen(!isMobileOpen)}
          isMobileOpen={isMobileOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
