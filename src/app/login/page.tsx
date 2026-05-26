"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Mail, Eye, EyeOff, ChevronLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6 overflow-hidden relative">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[128px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 blur-[128px] rounded-full" />

      <div className="w-full max-w-[400px] relative">
        <Link href="/" className="absolute -top-16 left-0 inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-primary transition-colors">
            <ChevronLeft className="w-4 h-4 mr-2" /> Return to StackCV
        </Link>

        <Card className="p-10 rounded-[3rem] border border-white/50 bg-white/60 backdrop-blur-3xl shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col items-center mb-10">
            <div className="w-12 h-12 rounded-3xl bg-primary flex items-center justify-center mb-6 shadow-xl shadow-primary/20">
                <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-gradient">
              {isLogin ? "Welcome Back" : "Start Forging"}
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 mt-2">
              {isLogin ? "Sign in to continue" : "Join the creative community"}
            </p>
          </div>

          <div className="space-y-6">
            <Button variant="outline" className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] gap-3 border-zinc-200 hover:bg-zinc-50 transition-all">
              <Mail className="w-4 h-4" /> Continue with Google
            </Button>
            
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200" />
              </div>
              <div className="relative px-4 text-[9px] uppercase font-black tracking-[0.25em] text-zinc-400 bg-white">OR</div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-[9px] font-bold uppercase tracking-widest ml-1 text-zinc-500">Email Address</Label>
                <Input type="email" placeholder="name@company.com" className="h-14 rounded-2xl bg-zinc-50 border-zinc-100 focus:border-primary/50 transition-all" />
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
                        className="h-14 rounded-2xl bg-zinc-50 border-zinc-100 pr-12 focus:border-primary/50 transition-all" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-zinc-400 hover:text-primary transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                    </button>
                </div>
              </div>
              {!isLogin && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <Label className="text-[9px] font-bold uppercase tracking-widest ml-1 text-zinc-500">Confirm Password</Label>
                    <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl bg-zinc-50 border-zinc-100 focus:border-primary/50" />
                </div>
              )}
              
              <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-primary-gradient text-white hover:opacity-90 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
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
    </div>
  );
}
