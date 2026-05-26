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
              <div className="relative group">
                <Input type="email" placeholder=" " className="peer w-full bg-transparent border-b-2 border-zinc-200 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
                <label className="absolute left-0 -top-4 text-[9px] font-black uppercase tracking-widest text-zinc-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary transition-all pointer-events-none">
                    Email Address
                </label>
              </div>
              
              <div className="relative group">
                <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder=" " 
                    className="peer w-full bg-transparent border-b-2 border-zinc-200 py-3 text-sm focus:outline-none focus:border-primary transition-colors pr-8" 
                />
                <label className="absolute left-0 -top-4 text-[9px] font-black uppercase tracking-widest text-zinc-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary transition-all pointer-events-none">
                    Password
                </label>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-3 text-zinc-400 hover:text-primary transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>

              {!isLogin && (
                <div className="relative group animate-in fade-in slide-in-from-top-2">
                    <Input type="password" placeholder=" " className="peer w-full bg-transparent border-b-2 border-zinc-200 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
                    <label className="absolute left-0 -top-4 text-[9px] font-black uppercase tracking-widest text-zinc-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary transition-all pointer-events-none">
                        Confirm Password
                    </label>
                </div>
              )}
              
              <Button className="w-full h-14 rounded-full font-black uppercase tracking-widest text-[11px] bg-primary-gradient text-white hover:opacity-90 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all mt-8">
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
