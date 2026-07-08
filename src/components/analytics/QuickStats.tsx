import { Clock, Coffee, UserCheck, UserX } from "lucide-react";

const quickStats = [
  { title: "Present Today", value: "1,126", icon: UserCheck, color: "text-emerald-300" },
  { title: "Absent Today", value: "72", icon: UserX, color: "text-rose-300" },
  { title: "Late", value: "31", icon: Clock, color: "text-amber-300" },
  { title: "Leaves", value: "21", icon: Coffee, color: "text-blue-300" },
];

export default function QuickStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {quickStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-slate-950/70 p-3">
                <Icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-400">{stat.title}</p>
                <h3 className="mt-1 text-2xl font-bold text-white">{stat.value}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
