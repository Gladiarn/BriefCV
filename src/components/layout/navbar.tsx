"use client";

import {
  Info,
  LayoutTemplate,
  Menu,
  MessageSquareQuote,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden",
        isScrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/40 py-3"
          : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary-gradient p-1.5 rounded-xl transition-transform duration-300 group-hover:rotate-12">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">StackCV</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden lg:block">
              <span className="text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                Login
              </span>
            </Link>

            <Link href="/build" className="hidden sm:block">
              <Button
                size="md"
                className="px-6 h-10 text-sm font-bold shadow-lg shadow-primary/10"
              >
                Get Started
              </Button>
            </Link>

            <div className="pl-2 border-l border-border/40">
              <ModeToggle />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="lg:hidden p-2 text-foreground hover:bg-accent rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border transition-all duration-500 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-screen py-8 px-6" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-4 text-xl font-bold tracking-tight text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <link.icon className="w-5 h-5" />
              </div>
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-border mt-2">
            <Link
              href="/build"
              className="flex items-center justify-center bg-primary-gradient text-white p-4 rounded-2xl font-bold shadow-xl shadow-primary/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create Your Resume
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
