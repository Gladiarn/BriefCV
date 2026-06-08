"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import ActivityChart, { type ChartProps } from "./ActivityChart";

export default function LazyChart({
  className,
  ...props
}: ChartProps & { className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={cn("w-full h-full", className)}>
      {isVisible ? (
        <ActivityChart {...props} />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm border border-border rounded-xl">
          Loading chart...
        </div>
      )}
    </div>
  );
}
