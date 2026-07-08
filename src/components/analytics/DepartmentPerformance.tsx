import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const departmentData = [
  { department: "Science", score: 91 },
  { department: "Commerce", score: 86 },
  { department: "Humanities", score: 82 },
  { department: "Languages", score: 89 },
  { department: "Technology", score: 94 },
];

export default function DepartmentPerformance() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-xl transition duration-300 hover:border-emerald-400/50 hover:bg-white/10">
      <div className="mb-6">
        <p className="text-sm text-slate-400">Department averages</p>
        <h2 className="mt-2 text-2xl font-bold text-white">Department Performance</h2>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={departmentData}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
          >
            <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" />
            <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
            <YAxis type="category" dataKey="department" width={86} axisLine={false} tickLine={false} tick={{ fill: "#cbd5e1", fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
              contentStyle={{
                background: "#020617",
                border: "1px solid #1e293b",
                borderRadius: "12px",
                color: "#f8fafc",
              }}
              formatter={(value) => [`${value}%`, "Score"]}
              labelStyle={{ color: "#cbd5e1" }}
            />
            <Bar dataKey="score" radius={[0, 8, 8, 0]} fill="#10b981" animationDuration={1100} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
