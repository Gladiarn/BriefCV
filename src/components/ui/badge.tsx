import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "outline";
}

export function Badge({
  className,
  variant = "primary",
  ...props
}: BadgeProps) {
  const variants = {
    primary: "bg-primary/10 border-primary/20 text-primary animate-pulse-slow",
    outline: "bg-primary/5 border-primary/10 text-primary/80",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
