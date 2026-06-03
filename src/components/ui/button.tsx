import type * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "relative bg-primary-gradient text-white font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:opacity-0 hover:before:opacity-100 before:transition-opacity",
    secondary:
      "bg-white dark:bg-zinc-900 text-foreground font-bold hover:bg-secondary border border-border/50 shadow-sm",
    ghost:
      "text-muted-foreground hover:text-primary transition-all font-semibold",
    outline:
      "bg-transparent border-2 border-primary/30 text-primary hover:bg-primary/5 font-bold transition-all",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-full",
    md: "px-6 py-3 text-sm rounded-full",
    lg: "px-8 py-4 text-base rounded-full",
    xl: "px-10 py-5 text-lg rounded-full",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all active:scale-95 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
