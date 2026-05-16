"use client";

import {
  Info,
  LayoutTemplate,
  LogIn,
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b print:hidden",
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-3 border-border"
          : "bg-transparent py-5 border-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary-gradient p-1.5 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient tracking-tight">
              StackCV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all flex items-center gap-1.5 relative group/link"
              >
                <link.icon className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5" />
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <Link href="/login" className="hidden lg:block">
              <Button variant="ghost" className="gap-1.5">
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>

            <Link href="/build" className="hidden sm:block">
              <Button size="md" className="rounded-full px-5">
                Get Started
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              </Button>
            </Link>

            <ModeToggle />

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="lg:hidden p-2 text-foreground hover:bg-accent rounded-md"
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
          "lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-screen py-6 px-4" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-foreground font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <link.icon className="w-5 h-5 text-primary" />
              {link.name}
            </Link>
          ))}
          <Link
            href="/login"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-foreground font-medium border-t border-border mt-2 pt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <LogIn className="w-5 h-5 text-primary" />
            Login
          </Link>
          <Link
            href="/build"
            className="mt-2 bg-primary-gradient text-white p-4 rounded-xl text-center font-bold shadow-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Create Your Resume
          </Link>
        </div>
      </div>
    </header>
  );
}
