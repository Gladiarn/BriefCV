"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Activity, FileText, LayoutDashboard, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

// Dynamic import for chart components to avoid SSR/hydration issues
const ActivityChart = dynamic(() => import("@/components/admin/ActivityChart"), { 
    ssr: false,
    loading: () => <div className="h-64 w-full flex items-center justify-center">Loading chart...</div> 
});

interface DailyUsage {
  date: string;
  tokens: number;
}

interface Stats {
  totalUsers: number;
  totalResumes: number;
  templatesUsedCount: number;
  aiUtilization: number;
  dailyUsage: DailyUsage[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dashboard Stats Data:", data);
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard Stats Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  const statConfig = [
    { id: "users", title: "Total Users", value: stats?.totalUsers || 0, icon: Users },
    { id: "resumes", title: "Total Resumes", value: stats?.totalResumes || 0, icon: FileText },
    { id: "templates", title: "Templates Used", value: stats?.templatesUsedCount || 0, icon: LayoutDashboard },
    { id: "ai", title: "AI Utilization", value: stats?.aiUtilization || 0, icon: Activity },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-black tracking-tighter">Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back to the administrative control panel.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statConfig.map((stat) => (
          <Card key={stat.id} className="border transition-none hover:border-primary">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {stat.title}
              </h3>
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-black mt-2">
              {loading ? "..." : stat.value}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 transition-none">
          <h2 className="text-xl font-bold mb-4">AI Usage (Tokens - Last 7 Days)</h2>
          <ActivityChart data={stats?.dailyUsage || []} />
        </Card>
        <Card className="transition-none">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button
              type="button"
              className="w-full text-left p-3 rounded-lg border border-transparent hover:border-primary font-bold text-sm cursor-pointer"
            >
              Manage Users
            </button>
            <button
              type="button"
              className="w-full text-left p-3 rounded-lg border border-transparent hover:border-primary font-bold text-sm cursor-pointer"
            >
              View System Logs
            </button>
            <button
              type="button"
              className="w-full text-left p-3 rounded-lg border border-transparent hover:border-primary font-bold text-sm cursor-pointer"
            >
              Update Templates
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
