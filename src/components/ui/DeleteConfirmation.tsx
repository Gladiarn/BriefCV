"use client";

import { useState } from "react";
import { Check, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DeleteConfirmationProps {
  onConfirm: () => Promise<void>;
  className?: string;
}

export function DeleteConfirmation({
  onConfirm,
  className,
}: DeleteConfirmationProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } catch (_e) {
      setIsLoading(false);
      setIsConfirming(false);
    }
  };

  if (isConfirming) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={cn("text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50", className)}
        onClick={handleConfirm}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Check className="h-4 w-4" />
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("text-destructive hover:bg-destructive/10", className)}
      onClick={() => setIsConfirming(true)}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
