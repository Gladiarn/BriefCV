"use client";

import { useState } from "react";
import { AdminNavbar } from "@/components/layout/admin-navbar";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Container - Responds to toggle */}
      <div className="hidden md:flex h-full shrink-0">
        <AdminSidebar
          isExpanded={isSidebarExpanded}
          onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />
      </div>

      {/* Main Body - Automatically fills remaining space */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
