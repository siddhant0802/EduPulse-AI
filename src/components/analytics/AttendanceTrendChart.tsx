import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const attendanceTrend = [
  { month: "Aug", attendance: 82 },
  { month: "Sep", attendance: 85 },
  { month: "Oct", attendance: 87 },
  { month: "Nov", attendance: 84 },
  { month: "Dec", attendance: 88 },
  { month: "Jan", attendance: 91 },
  { month: "Feb", attendance: 90 },
  { month: "Mar", attendance: 92 },
  { month: "Apr", attendance: 93 },
  { month: "May", attendance: 95 },
  { month: "Jun", attendance: 94 },
  { month: "Jul", attendance: 96 },
];

export default function AttendanceTrendChart() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-xl transition duration-300 hover:border-cyan-400/50 hover:bg-white/10">
      <div className="mb-6">
        <p className="text-sm text-slate-400">Last 12 months</p>
        <h2 className="mt-2 text-2xl font-bold text-white">Attendance Trend</h2>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={attendanceTrend} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="analyticsAttendance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.75} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis domain={[70, 100]} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
            <Tooltip
              cursor={{ stroke: "#22d3ee", strokeWidth: 1 }}
              contentStyle={{
                background: "#020617",
                border: "1px solid #1e293b",
                borderRadius: "12px",
                color: "#f8fafc",
              }}
              formatter={(value) => [`${value}%`, "Attendance"]}
              labelStyle={{ color: "#cbd5e1" }}
            />
            <Area
              type="monotone"
              dataKey="attendance"
              stroke="#22d3ee"
              strokeWidth={3}
              fill="url(#analyticsAttendance)"
              animationDuration={1200}
              animationEasing="ease-out"
              activeDot={{ r: 5, fill: "#22d3ee", stroke: "#0f172a", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
