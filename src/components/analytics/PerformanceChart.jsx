import React from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function PerformanceChart({ logs, title = "Performance Trends" }) {
  if (!logs || logs.length === 0) return <Card className="bg-slate-900/50 border-purple-500/20"><CardHeader><CardTitle className="text-white text-lg">{title}</CardTitle></CardHeader><CardContent><div className="h-64 flex items-center justify-center text-gray-400">No performance data</div></CardContent></Card>;
  const chartData = [...logs].reverse().map(log => ({ date: format(new Date(log.created_date), "MMM d"), fps: log.fps, ping: log.ping || 0, config: log.config_name }));
  return (
    <Card className="bg-slate-900/50 border-purple-500/20">
      <CardHeader><CardTitle className="text-white text-lg">{title}</CardTitle></CardHeader>
      <CardContent><div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="fpsGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient><linearGradient id="pingGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#374151"/><XAxis dataKey="date" stroke="#9ca3af" fontSize={12}/><YAxis yAxisId="fps" stroke="#22c55e" fontSize={12}/><YAxis yAxisId="ping" orientation="right" stroke="#f59e0b" fontSize={12}/><Tooltip /><Legend /><Area yAxisId="fps" type="monotone" dataKey="fps" stroke="#22c55e" fill="url(#fpsGradient)" name="FPS" strokeWidth={2}/><Area yAxisId="ping" type="monotone" dataKey="ping" stroke="#f59e0b" fill="url(#pingGradient)" name="Ping" strokeWidth={2}/></AreaChart></ResponsiveContainer></div></CardContent>
    </Card>
  );
}