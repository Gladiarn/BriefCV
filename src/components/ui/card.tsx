import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient";
}

export function Card({ className, variant = "default", ...props }: CardProps) {
  const variants = {
    default:
      "bg-white dark:bg-zinc-900/50 border border-border/50 shadow-2xl shadow-black/[0.03] backdrop-blur-sm",
    glass:
      "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-2xl shadow-black/5",
    gradient:
      "bg-primary-gradient text-white border-none shadow-xl shadow-primary/20 relative overflow-hidden",
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
