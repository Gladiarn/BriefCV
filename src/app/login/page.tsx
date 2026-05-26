import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-background flex flex-col justify-between">
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-sm rounded-3xl border border-border/40 shadow-xl shadow-black/5 p-6">
          <div className="space-y-1 mb-6">
            <h1 className="text-2xl font-black uppercase tracking-tight">Login</h1>
            <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
              Welcome back to Forge
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Email</Label>
              <Input type="email" placeholder="john@example.com" className="rounded-xl bg-muted/30" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest ml-1">Password</Label>
              <Input type="password" placeholder="••••••••" className="rounded-xl bg-muted/30" />
            </div>
            <Button className="w-full rounded-xl font-bold uppercase tracking-widest text-[11px] mt-2">
              Sign In
            </Button>
            <div className="text-center text-[10px] text-muted-foreground mt-4">
                Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
