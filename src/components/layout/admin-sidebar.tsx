"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  Settings,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface AdminSidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ isExpanded, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/admin/dashboard/users", icon: Users },
    { name: "Resumes", href: "/admin/dashboard/resumes", icon: FileText },
    { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "h-full border-r border-border flex flex-col bg-background z-50 overflow-hidden shrink-0 transition-[width] duration-200 ease-in-out will-change-[width]",
        isExpanded ? "w-60" : "w-16"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-border h-16 shrink-0">
        <div className="flex items-center overflow-hidden flex-1">
          {isExpanded && (
            <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-2 whitespace-nowrap animate-in fade-in duration-200">
              Admin Panel
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 shrink-0 p-0 cursor-pointer hidden md:flex"
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg border border-transparent cursor-pointer transition-all duration-200",
                isExpanded ? "gap-3 px-3 py-2.5" : "justify-center py-2.5 mx-1",
                isActive
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "text-muted-foreground hover:bg-secondary/80",
              )}
              title={!isExpanded ? item.name : ""}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              {isExpanded && (
                <span className="text-sm font-bold tracking-tight whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-1 duration-200">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border shrink-0 min-h-[4rem] flex items-center">
        {isExpanded ? (
          <div className="flex flex-col animate-in fade-in duration-200">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              System Status
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold">Online</span>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        )}
      </div>
    </aside>
  );
}
