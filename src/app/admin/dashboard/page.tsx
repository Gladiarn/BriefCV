"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Activity,
  FileText,
  LayoutDashboard,
  Users,
  Zap,
  UserPlus,
  FilePlus,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import TimeRangeFilter from "@/components/admin/TimeRangeFilter";
import LazyChart from "@/components/admin/LazyChart";
import Calendar from "@/components/admin/Calendar";

interface DailyUsage {
  date: string;
  tokens: number;
}

interface DailyGrowth {
  date: string;
  count: number;
}

interface Stats {
  totalUsers: number;
  totalResumes: number;
  templatesUsedCount: number;
  aiUtilization: number;
  dailyUsage: DailyUsage[];
  dailyUsers: DailyGrowth[];
  dailyResumes: DailyGrowth[];
  totalUsageCount: number;
}

const StatGrid = React.memo(
  ({ statConfig, loading }: { statConfig: any[]; loading: boolean }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statConfig.map((stat) => (
        <Card
          key={stat.id}
          className="border hover:border-primary flex flex-col justify-between"
        >
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
  ),
);
StatGrid.displayName = "StatGrid";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("7d");

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/stats?range=${range}`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Dashboard Stats Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const statConfig = useMemo(
    () => [
      {
        id: "users",
        title: "Total Users",
        value: stats?.totalUsers || 0,
        icon: Users,
      },
      {
        id: "resumes",
        title: "Total Resumes",
        value: stats?.totalResumes || 0,
        icon: FileText,
      },
      {
        id: "templates",
        title: "Templates Used",
        value: stats?.templatesUsedCount || 0,
        icon: LayoutDashboard,
      },
      {
        id: "ai",
        title: "AI Utilization",
        value: stats?.aiUtilization || 0,
        icon: Activity,
      },
    ],
    [stats],
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Overview</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back to the administrative control panel.
          </p>
        </div>
        <TimeRangeFilter value={range} onChange={setRange} />
      </header>

      <StatGrid statConfig={statConfig} loading={loading} />

      {/* Bento Box Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main Chart - Large */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-pink-500" /> AI Usage (Tokens -{" "}
              {range})
            </h2>
          </div>
          <div className="flex-1 min-h-[300px]">
            <LazyChart
              data={stats?.dailyUsage || []}
              dataKey="tokens"
              fill="#ec4899"
              type="area"
            />
          </div>
        </Card>

        {/* Small Widgets */}
        <Card className="col-span-1 flex flex-col">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-purple-500" /> Registrations
          </h2>
          <div className="flex-1 min-h-[200px]">
            <LazyChart
              data={(stats?.dailyUsers || []).map((d) => ({
                ...d,
                count: Math.floor(d.count),
              }))}
              dataKey="count"
              fill="#8b5cf6"
              type="line"
            />
          </div>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FilePlus className="w-5 h-5 text-emerald-500" /> Resume Creations
          </h2>
          <div className="flex-1 min-h-[200px]">
            <LazyChart
              data={(stats?.dailyResumes || []).map((d) => ({
                ...d,
                count: Math.floor(d.count),
              }))}
              dataKey="count"
              fill="#10b981"
              type="bar"
            />
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-1 lg:col-span-2">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <a
              href="/admin/dashboard/users"
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary transition-colors text-center cursor-pointer gap-2"
            >
              <Users className="w-6 h-6" />
              <span className="font-bold text-xs">Manage Users</span>
            </a>
            <a
              href="/admin/dashboard/resumes"
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary transition-colors text-center cursor-pointer gap-2"
            >
              <FileText className="w-6 h-6" />
              <span className="font-bold text-xs">View Resumes</span>
            </a>
            <a
              href="/admin/dashboard/settings"
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary transition-colors text-center cursor-pointer gap-2"
            >
              <LayoutDashboard className="w-6 h-6" />
              <span className="font-bold text-xs">Templates</span>
            </a>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary transition-colors text-center cursor-pointer gap-2">
              <Activity className="w-6 h-6" />
              <span className="font-bold text-xs">AI Logs</span>
            </button>
          </div>
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-bold text-muted-foreground mb-4">
              Calendar
            </h3>
            <Calendar />
          </div>
        </Card>
      </div>
    </div>
  );
}
