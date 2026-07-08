import { CalendarCheck2, Percent, UserCheck, UserX } from "lucide-react";

interface AttendanceSummaryProps {
  total: number;
  present: number;
  absent: number;
  percentage: number;
}

export default function AttendanceSummary({
  total,
  present,
  absent,
  percentage,
}: AttendanceSummaryProps) {
  const summaryCards = [
    {
      title: "Total Records",
      value: total.toString(),
      icon: CalendarCheck2,
      color: "bg-blue-500",
    },
    {
      title: "Present",
      value: present.toString(),
      icon: UserCheck,
      color: "bg-emerald-500",
    },
    {
      title: "Absent",
      value: absent.toString(),
      icon: UserX,
      color: "bg-rose-500",
    },
    {
      title: "Attendance",
      value: `${percentage}%`,
      icon: Percent,
      color: "bg-cyan-500",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{card.title}</p>
                <h2 className="mt-2 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div className={`rounded-xl p-4 ${card.color}`}>
                <Icon className="text-white" size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
