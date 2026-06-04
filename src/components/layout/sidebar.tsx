"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={cn(
        "border-r border-border p-6 transition-all duration-300 flex flex-col gap-8 fixed md:static inset-y-0 z-50 bg-background",
        isExpanded ? "w-64" : "w-20",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h2
          className={cn(
            "text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground",
            !isExpanded && "hidden",
          )}
        >
          Admin Panel
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2"
        >
          {isExpanded ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </div>

      <nav className="space-y-2">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 text-[13px] font-bold text-foreground hover:text-primary transition-colors p-3 rounded-xl hover:bg-secondary"
        >
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          {isExpanded && <span>Dashboard</span>}
        </Link>
        <Link
          href="/admin/dashboard/users"
          className="flex items-center gap-3 text-[13px] font-bold text-muted-foreground hover:text-primary transition-colors p-3 rounded-xl hover:bg-secondary"
        >
          <Users className="w-4 h-4 shrink-0" />
          {isExpanded && <span>Users</span>}
        </Link>
      </nav>
    </aside>
  );
};
