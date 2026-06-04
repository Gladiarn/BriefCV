import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient";
}

export function Card({ className, variant = "default", ...props }: CardProps) {
  const variants = {
    default:
      "bg-white dark:bg-zinc-900 border border-border",
    glass:
      "bg-white/70 dark:bg-zinc-950/70 border border-white/20 dark:border-white/5",
    gradient:
      "bg-primary-gradient text-white border-none shadow-xl shadow-primary/20 relative overflow-hidden",
  };

  return (
    <div
      className={cn(
        "rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-7",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
