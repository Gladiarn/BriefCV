import { Activity, FileText, LayoutDashboard, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AdminDashboardPage() {
  const stats = [
    { id: "total-users", title: "Total Users", value: "1,234", icon: Users },
    { id: "active-resumes", title: "Active Resumes", value: "856", icon: FileText },
    { id: "templates-used", title: "Templates Used", value: "42", icon: LayoutDashboard },
    { id: "system-health", title: "System Health", value: "98%", icon: Activity },
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
        {stats.map((stat) => (
          <Card key={stat.id} className="border transition-none hover:border-primary">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {stat.title}
              </h3>
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-black mt-2">{stat.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 transition-none">
          <h2 className="text-xl font-bold mb-4">System Activity</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-xl">
            <p className="text-muted-foreground">Activity chart placeholder</p>
          </div>
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
