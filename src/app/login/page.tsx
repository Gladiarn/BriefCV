"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Mail, Eye, EyeOff, ChevronLeft } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

        <div className="w-full max-w-[420px]">
            <Link href="/" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary mb-8 transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" /> Return to StackCV
            </Link>

            <Card className="p-8 md:p-10 rounded-[2.5rem] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white">
              <div className="flex flex-col space-y-2 mb-8 text-center">
                <h1 className="text-3xl font-black uppercase tracking-tighter">
                  {isLogin ? "Sign In" : "Create Account"}
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {isLogin ? "Welcome back to Forge" : "Join the creative community"}
                </p>
              </div>

              <div className="space-y-6">
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] gap-2 border-zinc-200 hover:bg-zinc-50">
                  <Mail className="w-4 h-4" /> Continue with Google
                </Button>
                
                <div className="relative flex items-center justify-center my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-100" />
                  </div>
                  <div className="relative px-3 bg-white text-[9px] uppercase font-black tracking-[0.2em] text-zinc-300">
                    OR
                  </div>
                </div>

                <div className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                        <Label className="text-[9px] font-bold uppercase tracking-widest ml-1 text-zinc-500">First Name</Label>
                        <Input type="text" placeholder="John" className="h-12 rounded-xl bg-zinc-50 border-zinc-100" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label className="text-[9px] font-bold uppercase tracking-widest ml-1 text-zinc-500">Email Address</Label>
                    <Input type="email" placeholder="name@company.com" className="h-12 rounded-xl bg-zinc-50 border-zinc-100" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between ml-1">
                        <Label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Password</Label>
                        {isLogin && <Link href="/forgot" className="text-[9px] font-bold uppercase tracking-widest text-primary hover:underline">Forgot?</Link>}
                    </div>
                    <div className="relative">
                        <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            className="h-12 rounded-xl bg-zinc-50 border-zinc-100 pr-10" 
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-zinc-400 hover:text-primary">
                            {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                        </button>
                    </div>
                  </div>
                  {!isLogin && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                        <Label className="text-[9px] font-bold uppercase tracking-widest ml-1 text-zinc-500">Confirm Password</Label>
                        <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-zinc-50 border-zinc-100" />
                    </div>
                  )}
                  
                  <Button className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-[11px] bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-200">
                    {isLogin ? "Sign In" : "Create Account"}
                  </Button>
                </div>
                
                <div className="text-center pt-2">
                    <p className="text-[10px] font-medium text-zinc-400">
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
    </div>
  );
}
