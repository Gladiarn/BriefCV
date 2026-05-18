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
      "bg-primary-gradient text-white font-black shadow-[0_5px_15px_-5px_rgba(236,72,153,0.4)] hover:shadow-[0_8px_20px_-5px_rgba(236,72,153,0.5)] overflow-hidden",
    secondary:
      "bg-secondary text-secondary-foreground font-bold hover:bg-accent border border-border",
    ghost:
      "text-muted-foreground hover:text-primary transition-all relative group/link font-medium",
    outline:
      "bg-transparent border-2 border-primary/20 text-primary hover:bg-primary/5 font-bold",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-5 py-2.5 text-sm rounded-xl",
    lg: "px-6 py-3.5 text-base rounded-xl",
    xl: "px-8 py-4 text-base rounded-2xl",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all active:scale-95 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
