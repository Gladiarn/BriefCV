"use client";

import { ShieldAlert, Home, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function UnauthorizedPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden p-6">
      {/* Immersive background elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary-purple/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Artistic Icon Group */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-destructive/20 blur-3xl rounded-full" />
          <div className="relative bg-secondary/30 backdrop-blur-xl p-8 rounded-[2.5rem] border border-border/50 shadow-2xl">
            <ShieldAlert className="w-16 h-16 text-destructive animate-pulse" />
            <div className="absolute -top-2 -right-2 bg-background border border-border p-2 rounded-xl shadow-lg">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Access <span className="text-destructive">Restricted.</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
              Error 403 • Unauthorized Access Detected
            </p>
          </div>

          <p className="text-lg md:text-xl font-medium text-muted-foreground max-w-lg mx-auto leading-relaxed">
            You don't have the administrative clearances required to forge
            within this sector. This area is restricted to system administrators
            only.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/" className="w-full sm:w-auto">
              <Button size="xl" className="w-full sm:w-auto px-10 group">
                <Home className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                Go Back Home
              </Button>
            </Link>

            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="xl"
                className="w-full sm:w-auto px-10 border-border/50 hover:bg-secondary"
              >
                Switch Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* System footer */}
        <div className="mt-20 pt-8 border-t border-border/40 flex flex-col items-center gap-4">
          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
            BriefCV Security Protocols Active
          </p>
        </div>
      </div>
    </div>
  );
}
