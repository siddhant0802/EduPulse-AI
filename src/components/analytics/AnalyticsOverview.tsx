import { BrainCircuit, GraduationCap, Percent, Users } from "lucide-react";

const overviewStats = [
  {
    title: "Total Students",
    value: "1,250",
    change: "+8.2%",
    icon: Users,
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Attendance",
    value: "94%",
    change: "+12%",
    icon: Percent,
    color: "from-emerald-500 to-teal-400",
  },
  {
    title: "Pass Rate",
    value: "89%",
    change: "+6.4%",
    icon: GraduationCap,
    color: "from-violet-500 to-fuchsia-400",
  },
  {
    title: "AI Score",
    value: "92",
    change: "+4.8%",
    icon: BrainCircuit,
    color: "from-amber-500 to-orange-400",
  },
];

export default function AnalyticsOverview() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {overviewStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{stat.title}</p>
                <h2 className="mt-3 text-3xl font-bold text-white">{stat.value}</h2>
                <p className="mt-2 text-sm font-medium text-emerald-300">
                  {stat.change} this term
                </p>
              </div>

              <div className={`rounded-2xl bg-gradient-to-br ${stat.color} p-4 shadow-lg transition duration-300 group-hover:scale-110`}>
                <Icon className="text-white" size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
