import {
  BookOpen,
  CalendarCheck2,
  FileText,
  GraduationCap,
  MessageSquare,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

interface Activity {
  id: number;
  icon: LucideIcon;
  title: string;
  time: string;
  studentName: string;
  teacherName: string;
  color: string;
}

const activities: Activity[] = [
  {
    id: 1,
    icon: CalendarCheck2,
    title: "Attendance marked",
    time: "5 min ago",
    studentName: "Aarav Sharma",
    teacherName: "Priya Nair",
    color: "bg-blue-500/20 text-blue-300",
  },
  {
    id: 2,
    icon: FileText,
    title: "Assignment submitted",
    time: "18 min ago",
    studentName: "Maya Kapoor",
    teacherName: "Rohan Mehta",
    color: "bg-emerald-500/20 text-emerald-300",
  },
  {
    id: 3,
    icon: MessageSquare,
    title: "Feedback shared",
    time: "32 min ago",
    studentName: "Ishaan Verma",
    teacherName: "Ananya Rao",
    color: "bg-violet-500/20 text-violet-300",
  },
  {
    id: 4,
    icon: BookOpen,
    title: "Lesson completed",
    time: "48 min ago",
    studentName: "Sara Khan",
    teacherName: "Vikram Joshi",
    color: "bg-cyan-500/20 text-cyan-300",
  },
  {
    id: 5,
    icon: GraduationCap,
    title: "Quiz evaluated",
    time: "1 hr ago",
    studentName: "Kabir Singh",
    teacherName: "Neha Iyer",
    color: "bg-amber-500/20 text-amber-300",
  },
  {
    id: 6,
    icon: UserPlus,
    title: "Student enrolled",
    time: "2 hrs ago",
    studentName: "Diya Patel",
    teacherName: "Arjun Menon",
    color: "bg-rose-500/20 text-rose-300",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-sm text-slate-400">Latest updates</p>
        <h2 className="mt-2 text-2xl font-bold text-white">
          Recent Activity
        </h2>
      </div>

      <div className="max-h-96 space-y-4 overflow-y-auto pr-2">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:border-cyan-400/60 hover:bg-white/10"
            >
              <div className="flex gap-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${activity.color}`}>
                  <Icon size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-white">
                      {activity.title}
                    </h3>

                    <span className="shrink-0 text-xs text-slate-500">
                      {activity.time}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                    <p>
                      <span className="text-slate-500">Student: </span>
                      {activity.studentName}
                    </p>

                    <p>
                      <span className="text-slate-500">Teacher: </span>
                      {activity.teacherName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
