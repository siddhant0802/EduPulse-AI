import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const performanceData = [
  { className: "7A", score: 84 },
  { className: "8A", score: 88 },
  { className: "9B", score: 76 },
  { className: "10A", score: 93 },
  { className: "11C", score: 86 },
  { className: "12B", score: 90 },
];

export default function PerformanceChart() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-xl transition duration-300 hover:border-violet-400/50 hover:bg-white/10">
      <div className="mb-6">
        <p className="text-sm text-slate-400">Average academic score</p>
        <h2 className="mt-2 text-2xl font-bold text-white">Student Performance</h2>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={performanceData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" />
            <XAxis dataKey="className" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
            <Tooltip
              cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
              contentStyle={{
                background: "#020617",
                border: "1px solid #1e293b",
                borderRadius: "12px",
                color: "#f8fafc",
              }}
              formatter={(value) => [`${value}%`, "Performance"]}
              labelStyle={{ color: "#cbd5e1" }}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]} fill="#8b5cf6" animationDuration={1100} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
