import {
  Users,
  GraduationCap,
  CalendarCheck2,
  BookOpen,
} from "lucide-react";

import { DashboardLayout } from "../../components/layout";
import StatCard from "../../components/dashboard/StatCard";

export default function DashboardPage() {
  return (
    <DashboardLayout>

      <h1 className="mb-8 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Students"
          value="1,250"
          icon={Users}
          color="bg-blue-500"
        />

        <StatCard
          title="Teachers"
          value="85"
          icon={GraduationCap}
          color="bg-green-500"
        />

        <StatCard
          title="Attendance"
          value="96%"
          icon={CalendarCheck2}
          color="bg-orange-500"
        />

        <StatCard
          title="Subjects"
          value="42"
          icon={BookOpen}
          color="bg-purple-500"
        />

      </div>

    </DashboardLayout>
  );
}