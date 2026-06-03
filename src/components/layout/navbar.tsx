"use client";

import {
  ArrowRight,
  Info,
  LayoutTemplate,
  LogOut,
  Menu,
  MessageSquareQuote,
  Plus,
  Sparkles,
  User as UserIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";

const navLinks = [
  { name: "Build", href: "/build", icon: Plus },
  { name: "Templates", href: "/templates", icon: LayoutTemplate },
  { name: "Pricing", href: "/pricing", icon: MessageSquareQuote },
  { name: "About", href: "/about", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, logout, checkSession } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    checkSession();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [checkSession]);

  // Hide Navbar on the Forge (Editor) page, Login, Signup and Admin pages
  if (
    pathname === "/build/new" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/admin")
  )
    return null;

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[100] py-5 transition-all duration-500">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="relative flex items-center justify-between bg-background/60 backdrop-blur-xl border border-border/40 rounded-[1.5rem] px-4 py-2.5 shadow-2xl shadow-black/5">
            <div className="flex items-center gap-2">
              <div className="bg-primary-gradient p-1.5 rounded-lg">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight">
                BriefCV
              </span>
            </div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 print:hidden",
        isScrolled ? "py-3" : "py-5",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="relative flex items-center justify-between bg-background/60 backdrop-blur-xl border border-border/40 rounded-[1.5rem] px-4 py-2.5 shadow-2xl shadow-black/5 transition-all duration-500">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary-gradient p-1.5 rounded-lg transition-transform duration-300 group-hover:rotate-12 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight text-gradient">BriefCV</span>
          </Link>

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[10px] font-bold transition-colors uppercase tracking-[0.2em] relative py-1",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {link.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2.5">
            {user ? (
              <div className="relative mr-0.5">
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/50 border border-border/40 hover:bg-primary-gradient transition-all cursor-pointer"
                >
                  <span className="text-[10px] font-black text-foreground group-hover:text-white">
                    {user.email?.substring(0, 2).toUpperCase() || "UN"}
                  </span>
                </button>

                {/* Click-triggered Design Dropdown */}
                <div
                  className={cn(
                    "absolute top-[calc(100%+1.25rem)] right-0 w-48 bg-background/95 backdrop-blur-2xl border border-border/40 rounded-[1.25rem] p-2 shadow-2xl transition-all duration-200",
                    isProfileMenuOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 p-3 rounded-[1rem] hover:bg-destructive/5 text-destructive transition-colors text-[13px] font-bold tracking-tight cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hidden lg:block mr-2">
                <span className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.2em]">
                  Login
                </span>
              </Link>
            )}

            <Link href="/build" className="hidden sm:block">
              <Button
                size="sm"
                className="px-5 h-8 text-[10px] font-black shadow-lg shadow-primary/10 rounded-full uppercase tracking-widest"
              >
                {user ? "Dashboard" : "Get Started"}
              </Button>
            </Link>

            <div className="flex items-center gap-1.5">
              <ModeToggle />

              {/* Mobile Menu Toggle - Small & Sharp */}
              <button
                type="button"
                className="lg:hidden p-1.5 rounded-lg text-foreground hover:bg-secondary transition-all active:scale-90 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Minimalist Floating Dropdown - Does not take whole screen */}
          <div
            className={cn(
              "absolute top-[calc(100%+0.75rem)] right-0 w-64 bg-background/95 backdrop-blur-2xl border border-border/40 rounded-[2rem] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300 origin-top-right lg:hidden",
              isMobileMenuOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
            )}
          >
            <div className="flex flex-col gap-1">
              {user && (
                <div className="p-4 mb-2 rounded-[1.25rem] bg-primary/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-gradient flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold truncate">
                    {user.email}
                  </span>
                </div>
              )}

              {navLinks.map((link, _i) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "group flex items-center justify-between p-3 rounded-[1.25rem] transition-colors",
                      isActive ? "bg-primary/5" : "hover:bg-primary/5",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "bg-secondary/50 text-muted-foreground group-hover:text-primary",
                        )}
                      >
                        <link.icon className="w-4 h-4" />
                      </div>
                      <span
                        className={cn(
                          "text-[13px] font-bold tracking-tight",
                          isActive ? "text-primary" : "text-foreground",
                        )}
                      >
                        {link.name}
                      </span>
                    </div>
                    <ArrowRight
                      className={cn(
                        "w-3.5 h-3.5 transition-all",
                        isActive
                          ? "text-primary translate-x-0.5"
                          : "text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5",
                      )}
                    />
                  </Link>
                );
              })}

              <div className="h-px bg-border/40 my-2 mx-2" />

              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 p-3 rounded-[1.25rem] hover:bg-destructive/5 text-destructive transition-colors text-left cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold tracking-tight">
                    Logout
                  </span>
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-3 p-3 rounded-[1.25rem] hover:bg-secondary/50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[13px] font-bold tracking-tight">
                    Member Login
                  </span>
                </Link>
              )}

              <Link
                href="/build"
                className="mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full h-11 rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.15em] shadow-lg shadow-primary/20">
                  {user ? "Go to Dashboard" : "Launch Forge"}
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
