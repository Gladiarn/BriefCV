const footerLinks = [
  { label: "Twitter", href: "https://twitter.com/stackcv" },
  { label: "GitHub", href: "https://github.com/stackcv" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full flex flex-col md:flex-row gap-6 items-center justify-between py-12 border-t border-border mt-20 text-muted-foreground text-sm">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <div className="w-2 h-2 rounded-full bg-primary" />
        StackCV © {currentYear}
      </div>
      <div className="flex gap-8">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={
              link.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="hover:text-primary transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
