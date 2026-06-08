"use client";

import { X, Info, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface PricingNotificationProps {
  type?: 'default' | 'success' | 'destructive';
  title?: string;
  message: string;
}

export function PricingNotification({
  type = 'default',
  title = "Notice",
  message
}: PricingNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after short delay
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const icons = {
    default: Info,
    success: CheckCircle2,
    destructive: AlertCircle
  };

  const Icon = icons[type];

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <Alert
        variant={type === 'default' ? 'default' : type === 'success' ? 'success' : 'destructive'}
        className="w-[350px] shadow-2xl backdrop-blur-xl border border-border/50"
      >
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <Icon className="w-5 h-5 mt-0.5" />
        <AlertTitle className="font-bold">{title}</AlertTitle>
        <AlertDescription className="text-sm leading-relaxed">
          {message}
        </AlertDescription>
      </Alert>
    </div>
  );
}
