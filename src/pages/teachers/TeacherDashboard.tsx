import { DashboardLayout } from "../../components/layout";
import StudentsPage from "../students/StudentsPage";

export default function TeacherDashboard() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <p className="text-cyan-300 text-sm font-medium">
            Teacher Panel
          </p>

          <h1 className="text-3xl font-bold text-white">
            Teacher Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Manage Students and Attendance
          </p>
        </div>

        <StudentsPage />
      </div>
    </DashboardLayout>
  );
}