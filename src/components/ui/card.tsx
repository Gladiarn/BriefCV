import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient";
}

export function Card({ className, variant = "default", ...props }: CardProps) {
  const variants = {
    default: "bg-card border border-border shadow-sm",
    glass: "bg-background/80 backdrop-blur-md border border-border shadow-lg",
    gradient: "bg-card border border-primary/20 shadow-md",
  };

  return (
    <div
      className={cn(
        "rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-7 transition-all",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
