import { AlertTriangle } from "lucide-react";

const lowAttendanceStudents = [
  { name: "Kabir Singh", className: "Grade 12-B", attendance: 68 },
  { name: "Ishaan Verma", className: "Grade 11-C", attendance: 71 },
  { name: "Aditya Rao", className: "Grade 9-B", attendance: 73 },
];

export default function LowAttendanceAlert() {
  return (
    <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-6 shadow-lg backdrop-blur-xl transition duration-300 hover:border-rose-300/50 hover:bg-rose-500/15">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-rose-200/80">Below 75%</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Low Attendance Alert</h2>
        </div>
        <div className="rounded-xl bg-rose-500/20 p-3 text-rose-200">
          <AlertTriangle size={26} />
        </div>
      </div>

      <div className="space-y-4">
        {lowAttendanceStudents.map((student) => (
          <div key={student.name} className="rounded-xl border border-rose-300/10 bg-slate-950/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-white">{student.name}</p>
                <p className="mt-1 text-sm text-rose-100/70">{student.className}</p>
              </div>
              <span className="rounded-full bg-rose-500/20 px-3 py-1 text-sm font-semibold text-rose-200">
                {student.attendance}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
