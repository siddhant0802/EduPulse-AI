import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck2,
  FileText,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: Users,
    label: "Students",
    path: "/students",
  },
  {
    icon: GraduationCap,
    label: "Teachers",
    path: "/teachers",
  },
  {
    icon: CalendarCheck2,
    label: "Attendance",
    path: "/attendance",
  },
  {
    icon: FileText,
    label: "Reports",
    path: "/reports",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-5">

      <h1 className="mb-10 text-2xl font-bold text-cyan-400">
        EduPulse AI
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-cyan-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}