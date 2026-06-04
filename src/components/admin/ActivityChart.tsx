"use client";

import React, { memo } from "react";
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";

interface ChartProps {
    data: any[];
    dataKey: string;
    fill?: string;
    type?: "bar" | "line" | "area" | "pie";
}

const COLORS = ["#ec4899", "#8b5cf6", "#10b981", "#f59e0b"];

const ActivityChart = memo(({ data, dataKey, fill = "#ec4899", type = "bar" }: ChartProps) => {
    if (!data || data.length === 0) {
        return <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm border border-border rounded-xl">No activity data available.</div>;
    }

    return (
        <div className="h-full w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                {type === "bar" ? (
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', backgroundColor: 'hsl(var(--background))' }} />
                        <Bar dataKey={dataKey} fill={fill} radius={[4, 4, 0, 0]} />
                    </BarChart>
                ) : type === "line" ? (
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', backgroundColor: 'hsl(var(--background))' }} />
                        <Line type="monotone" dataKey={dataKey} stroke={fill} strokeWidth={2} dot={false} />
                    </LineChart>
                ) : type === "area" ? (
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', backgroundColor: 'hsl(var(--background))' }} />
                        <Area type="monotone" dataKey={dataKey} stroke={fill} fill={fill} fillOpacity={0.2} />
                    </AreaChart>
                ) : (
                    <PieChart>
                        <Pie data={data} dataKey={dataKey} nameKey="date" cx="50%" cy="50%" outerRadius={80} fill={fill} label>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', backgroundColor: 'hsl(var(--background))' }} />
                    </PieChart>
                )}
            </ResponsiveContainer>
        </div>
    );
});

ActivityChart.displayName = 'ActivityChart';

export default ActivityChart;
