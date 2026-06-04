"use client";

import { ChevronDown, LogOut, Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../ui/mode-toggle";

interface AdminNavbarProps {
  onMenuClick: () => void;
  isMobileOpen: boolean;
}

export function AdminNavbar({ onMenuClick, isMobileOpen }: AdminNavbarProps) {
  const { user, logout } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleProfile = useCallback(() => {
    setIsProfileOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    setIsProfileOpen(false);
    router.push("/");
  }, [logout, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  return (
    <header className="h-16 border-b border-border bg-background sticky top-0 z-40 w-full shrink-0">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Logo and Name */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary-gradient p-1.5 rounded-lg shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight text-gradient">
              BriefCV
            </span>
            <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2 bg-secondary/50 px-2.5 py-1 rounded-full border border-border/40">
              Admin
            </span>
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          <div className="h-8 w-px bg-border/40 mx-1" />

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleProfile}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-border/40 bg-secondary/30 hover:bg-secondary/50 cursor-pointer"
            >
              <div className="h-7 w-7 rounded-full bg-primary-gradient flex items-center justify-center shadow-sm">
                <span className="text-[10px] font-black text-white">
                  {user?.email?.substring(0, 2).toUpperCase() || "AD"}
                </span>
              </div>
              <div className="hidden md:flex flex-col items-start leading-none mr-1">
                <span className="text-[11px] font-black truncate max-w-[120px]">
                  {user?.email?.split("@")[0]}
                </span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">
                  Admin
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-muted-foreground",
                  isProfileOpen && "rotate-180",
                )}
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-background border border-border/40 rounded-xl shadow-2xl p-2 z-50 origin-top-right">
                <div className="px-3 py-2 mb-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
                    Account
                  </p>
                  <p className="text-xs font-bold truncate text-foreground">
                    {user?.email}
                  </p>
                </div>

                <div className="h-px bg-border/40 my-1 mx-1" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/5 group text-left cursor-pointer"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-bold">Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
