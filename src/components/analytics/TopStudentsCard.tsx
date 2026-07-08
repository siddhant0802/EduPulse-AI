const topStudents = [
  { name: "Diya Patel", className: "Grade 7-C", percentage: 98, avatar: "DP" },
  { name: "Aarav Sharma", className: "Grade 10-A", percentage: 96, avatar: "AS" },
  { name: "Sara Khan", className: "Grade 8-A", percentage: 94, avatar: "SK" },
  { name: "Riya Das", className: "Grade 10-B", percentage: 93, avatar: "RD" },
  { name: "Maya Kapoor", className: "Grade 9-B", percentage: 91, avatar: "MK" },
];

export default function TopStudentsCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-xl transition duration-300 hover:border-cyan-400/50 hover:bg-white/10">
      <div className="mb-6">
        <p className="text-sm text-slate-400">Top 5 students</p>
        <h2 className="mt-2 text-2xl font-bold text-white">Top Students</h2>
      </div>

      <div className="space-y-4">
        {topStudents.map((student, index) => (
          <div key={student.name} className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-950/40 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-white">
              {student.avatar}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">
                {index + 1}. {student.name}
              </p>
              <p className="mt-1 text-sm text-slate-400">{student.className}</p>
            </div>

            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">
              {student.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
