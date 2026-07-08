import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const attendanceData = [
  { day: "Mon", attendance: 92 },
  { day: "Tue", attendance: 88 },
  { day: "Wed", attendance: 94 },
  { day: "Thu", attendance: 91 },
  { day: "Fri", attendance: 96 },
  { day: "Sat", attendance: 90 },
  { day: "Sun", attendance: 95 },
];

export default function AttendanceChart() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="mb-6">
        <p className="text-sm text-slate-400">Last 7 days</p>
        <h2 className="mt-2 text-2xl font-bold text-white">
          Attendance
        </h2>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={attendanceData}
            margin={{ top: 10, right: 8, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="attendanceBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.75} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />

            <YAxis
              domain={[70, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              cursor={{ stroke: "#38bdf8", strokeWidth: 1 }}
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
              stroke="#38bdf8"
              strokeWidth={3}
              fill="url(#attendanceBlue)"
              animationDuration={1200}
              animationEasing="ease-out"
              activeDot={{ r: 5, fill: "#38bdf8", stroke: "#0f172a", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
