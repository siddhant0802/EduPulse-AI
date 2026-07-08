import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition duration-300 hover:scale-105 hover:border-cyan-500">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-slate-400 text-sm">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div className={`rounded-xl p-4 ${color}`}>
          <Icon className="text-white" size={28} />
        </div>

      </div>
    </div>
  );
}