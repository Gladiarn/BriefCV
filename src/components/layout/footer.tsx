import {
  ArrowUpRight,
  Code2,
  Globe,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

const footerData = {
  brand: {
    name: "BriefCV",
    description:
      "The next-generation AI platform for career growth and resume intelligence.",
  },
  categories: [
    {
      title: "Product",
      links: [
        { label: "Build", href: "/build" },
        { label: "Templates", href: "/templates" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "About", href: "/about" },
        { label: "Member Login", href: "/login" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
  socials: [
    { icon: MessageSquare, href: "#" },
    { icon: Code2, href: "https://github.com/gladiarn/briefcv" },
    {
      icon: Globe,
      href: "https://www.linkedin.com/in/ianne-carl-bulilan-321421349/",
    },
  ],
};

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="w-full pt-32 pb-12 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Minimalist Floating Footer Card */}
        <div className="relative bg-background/40 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-black/5">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-5 space-y-8">
              <Link href="/" className="flex items-center gap-2 group w-fit">
                <div className="bg-primary-gradient p-1.5 rounded-xl transition-transform duration-300 group-hover:rotate-12 shadow-lg shadow-primary/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  {footerData.brand.name}
                </span>
              </Link>
              <p className="text-muted-foreground text-lg font-medium max-w-sm leading-relaxed">
                {footerData.brand.description}
              </p>
              <div className="flex gap-4">
                {footerData.socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
              {footerData.categories.map((category) => (
                <div key={category.title} className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">
                    {category.title}
                  </h4>
                  <ul className="space-y-4">
                    {category.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all text-sm font-bold tracking-tight"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Minimalist Bottom Bar */}
          <div className="mt-20 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
              <span>
                © {CURRENT_YEAR} {footerData.brand.name}
              </span>
              <div className="w-1 h-1 rounded-full bg-border" />
              <span>AI Engine v1.0</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-secondary/50 backdrop-blur-md border border-border/40 text-[9px] font-black uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              Forge Pulse: Active
            </div>
          </div>
        </div>

        {/* Floating Tagline below the card */}
        <div className="mt-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30">
            Forge your future with intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}
