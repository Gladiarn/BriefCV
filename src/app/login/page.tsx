"use client";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Eye,
  EyeOff,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuthStore } from "@/lib/auth-store";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthStore();

  // Handle Google OAuth errors from query params
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      if (errorParam === "missing_config") {
        setError("OAuth configuration missing on Vercel. Please check your environment variables.");
      } else if (errorParam === "token_exchange_failed") {
        setError("Google authentication failed. Please try again.");
      } else if (errorParam === "no_code") {
        setError("No authorization code received from Google.");
      } else if (errorParam === "callback_exception") {
        setError("An unexpected error occurred during Google callback.");
      }
      setStatus("error");
    }
  }, [searchParams]);

  // Reset status after a delay if it's success or error
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        if (status === "success" && !isLogin) {
          setIsLogin(true);
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
        setStatus("idle");
        setError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("loading");

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      setStatus("error");
      return;
    }

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Authentication failed");

      setStatus("success");

      if (isLogin) {
        setUser(data.user);
        setTimeout(() => {
          router.push("/build");
        }, 800);
      }
    } catch (err: any) {
      setError(err.message);
      setStatus("error");
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case "loading":
        return "Processing...";
      case "success":
        return (
          <span className="flex items-center gap-2">
            Success <CheckCircle2 className="w-4 h-4" />
          </span>
        );
      case "error":
        return (
          <span className="flex items-center gap-2">
            Failed <AlertCircle className="w-4 h-4" />
          </span>
        );
      default:
        return isLogin ? "Sign In" : "Create Account";
    }
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-background relative">
      {/* Hero-Inspired Creative Blurs */}
      <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[80%] bg-primary-purple/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 z-0" />

      {/* Immersive Creative Side */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-20">
        <div className="relative z-10 max-w-lg space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen Resume Intelligence
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter leading-[1.1] text-foreground">
            Forge your <br />
            <span className="text-gradient">Professional</span> <br />
            Success.
          </h1>
          <p className="text-lg font-medium text-muted-foreground leading-relaxed">
            Join thousands of professionals leveling up their careers with
            AI-powered resume tools designed for high performance.
          </p>
        </div>
      </div>

      {/* Auth Form Side */}
      <div className="flex-1 flex flex-col justify-center px-10 md:px-20 relative">
        <Link
          href="/"
          className="absolute top-10 left-10 inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back Home
        </Link>

        <div className="w-full max-w-[420px] mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground mb-3">
              {isLogin ? "Welcome Back" : "Start Forging"}
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              {isLogin ? "Sign in to continue" : "Join the creative community"}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <p className="text-xs font-bold text-destructive animate-in fade-in slide-in-from-top-1">
                {error}
              </p>
            )}
            <div className="space-y-2">
              <Label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                Email Address
              </Label>
              <Input
                required
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-xl bg-secondary/50 border-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  Password
                </Label>
                {isLogin && (
                  <Link
                    href="/forgot"
                    className="text-[9px] font-bold uppercase tracking-widest text-primary hover:underline"
                  >
                    Forgot?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 rounded-xl bg-secondary/50 border-none focus:ring-2 focus:ring-primary/20 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <Label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-14 rounded-xl bg-secondary/50 border-none focus:ring-2 focus:ring-primary/20 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            <Button
              disabled={status === "loading" || status === "success"}
              type="submit"
              size="lg"
              className={`w-full h-14 text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 group transition-all duration-300 ${
                status === "success"
                  ? "bg-green-500 hover:bg-green-600"
                  : status === "error"
                    ? "bg-destructive hover:bg-destructive/90"
                    : ""
              }`}
            >
              {getButtonContent()}
              {status === "idle" && (
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              )}
            </Button>
          </form>

          <div className="relative my-10 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative px-3 bg-background text-[10px] uppercase font-bold text-muted-foreground">
              or continue with
            </span>
          </div>

          <Link href="/api/auth/google" className="block w-full">
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 rounded-xl font-bold uppercase tracking-widest text-[10px] flex flex-row items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Google</span>
            </Button>
          </Link>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setStatus("idle");
              }}
              className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? "New to CV Studio? Sign up" : "Have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
