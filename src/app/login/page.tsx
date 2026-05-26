import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      {/* Subtle Background Grain/Blur */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <Card className="w-full max-w-[400px] bg-white/50 backdrop-blur-xl border border-white/50 p-8 shadow-2xl shadow-black/5 rounded-[2.5rem]">
        <div className="flex flex-col space-y-2 mb-8 text-center">
            <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">Sign In</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Continue to Forge
            </p>
        </div>
        
        <div className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[9px] font-bold uppercase tracking-widest ml-1 text-zinc-500">Email Address</Label>
                <Input type="email" placeholder="name@company.com" className="h-12 rounded-xl bg-white/50 border-zinc-200 focus-visible:ring-primary/20" />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                    <Label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Password</Label>
                    <Link href="/forgot" className="text-[9px] font-bold uppercase tracking-widest text-primary hover:underline">Forgot?</Link>
                </div>
                <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-white/50 border-zinc-200 focus-visible:ring-primary/20" />
            </div>
            
            <Button className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-[11px] bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg shadow-zinc-900/20">
                Sign In
            </Button>
            
            <div className="text-center">
                <p className="text-[10px] font-medium text-zinc-500">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-black uppercase tracking-widest text-primary hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
      </Card>
    </div>
  );
}
