import { Code2, Globe, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";

const footerData = {
  brand: {
    name: "StackCV",
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
        { label: "Success Stories", href: "/about" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ],
  socials: [
    { icon: MessageSquare, href: "https://twitter.com/stackcv" },
    { icon: Code2, href: "https://github.com/stackcv" },
    { icon: Globe, href: "https://linkedin.com/company/stackcv" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-20 pb-12 mt-20 border-t border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-primary-gradient p-1.5 rounded-xl transition-transform duration-300 group-hover:rotate-12">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                {footerData.brand.name}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              {footerData.brand.description}
            </p>
            <div className="flex gap-3">
              {footerData.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerData.categories.map((category) => (
            <div key={category.title} className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
                {category.title}
              </h4>
              <ul className="space-y-3">
                {category.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-[13px] font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">
          <div className="flex items-center gap-2">
            <span>
              © {currentYear} {footerData.brand.name}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>Built with AI intelligence</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-[9px]">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM ACTIVE
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
