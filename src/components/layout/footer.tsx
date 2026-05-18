import { Code2, Globe, Heart, MessageSquare, Sparkles } from "lucide-react";
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
    <footer className="w-full pt-24 pb-7 mt-20 border-t border-border relative">
      {/* Background Decorative Glows */}

      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-primary-gradient p-1.5 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-gradient tracking-tight">
                {footerData.brand.name}
              </span>
            </Link>
            <p className="text-muted-foreground text-base max-w-sm leading-relaxed italic">
              "{footerData.brand.description}"
            </p>
            <div className="flex gap-4 pt-2">
              {footerData.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerData.categories.map((category) => (
            <div key={category.title} className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-foreground/80">
                {category.title}
              </h4>
              <ul className="space-y-4">
                {category.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
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
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/60 uppercase tracking-tighter">
            <span>
              © {currentYear} {footerData.brand.name}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1">
              Forged with{" "}
              <Heart className="w-3 h-3 text-primary fill-current" /> by the AI
              team
            </span>
          </div>

          {/* AI Status Indicator */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 border-dashed">
            <div className="relative flex h-2 w-2">
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <div className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">
              System Online: GPT-4 & Gemini AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
