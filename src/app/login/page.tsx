"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Mail, Eye, EyeOff, ChevronLeft } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <main className="flex-1 flex flex-col items-center justify-center p-6 page-padding relative">
        <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

        <div className="w-full max-w-[420px]">
            <Link href="/" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
            </Link>

            <Card className="p-8 md:p-10 rounded-[2.5rem] border border-border/50 shadow-2xl shadow-black/5 bg-background/80 backdrop-blur-xl">
              <div className="flex flex-col space-y-2 mb-8 text-center">
                <h1 className="text-2xl font-black uppercase tracking-tighter">
                  {isLogin ? "Sign In" : "Create Account"}
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {isLogin ? "Welcome back to Forge" : "Join the creative community"}
                </p>
              </div>

              <div className="space-y-5">
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] gap-2">
                  <Mail className="w-4 h-4" /> Continue with Google
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-[9px] uppercase font-black tracking-widest bg-background px-3 text-muted-foreground">Or with email</div>
                </div>

                <div className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                        <Label className="text-[9px] font-bold uppercase tracking-widest ml-1">First Name</Label>
                        <Input type="text" placeholder="John" className="h-12 rounded-xl bg-muted/30" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label className="text-[9px] font-bold uppercase tracking-widest ml-1">Email Address</Label>
                    <Input type="email" placeholder="name@company.com" className="h-12 rounded-xl bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between ml-1">
                        <Label className="text-[9px] font-bold uppercase tracking-widest">Password</Label>
                    </div>
                    <div className="relative">
                        <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            className="h-12 rounded-xl bg-muted/30 pr-10" 
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-muted-foreground hover:text-primary">
                            {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                        </button>
                    </div>
                  </div>
                  {!isLogin && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                        <Label className="text-[9px] font-bold uppercase tracking-widest ml-1">Confirm Password</Label>
                        <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-muted/30" />
                    </div>
                  )}
                  
                  <Button className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-primary/20">
                    {isLogin ? "Sign In" : "Create Account"}
                  </Button>
                </div>
                
                <div className="text-center">
                    <p className="text-[10px] font-medium text-muted-foreground">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button type="button" onClick={() => setIsLogin(!isLogin)} className="font-black uppercase tracking-widest text-primary hover:underline">
                            {isLogin ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </div>
              </div>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
