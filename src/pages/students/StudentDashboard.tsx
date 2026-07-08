import { useNavigate } from "react-router";
import { authService } from "../../services";

export default function StudentDashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    await authService.logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 p-8 text-center shadow-xl">

        <h1 className="text-3xl font-bold text-white">
          Student Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome Student
        </p>

        <button
          onClick={() => navigate("/scan")}
          className="mt-8 w-full rounded-xl bg-cyan-400 py-4 font-bold text-black hover:bg-cyan-300"
        >
          📷 Scan Attendance
        </button>

        <button
          onClick={handleLogout}
          className="mt-4 w-full rounded-xl border border-red-500 py-4 font-bold text-red-400 hover:bg-red-500 hover:text-white"
        >
          Logout
        </button>

      </div>
    </div>
  );
}