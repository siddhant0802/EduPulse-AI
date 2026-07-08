import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { CheckCircle2 } from "lucide-react";
import { attendanceService } from "../services/attendanceService";

export default function ScanAttendancePage() {
  const [scanned, setScanned] = useState(false);
  const [session, setSession] = useState("");
  const [loading, setLoading] = useState(false);

  // Logged in user
  const user = JSON.parse(localStorage.getItem("auth_user") || "{}");

  async function markAttendance(qrData: string) {
    try {
      setLoading(true);

      await attendanceService.markAttendance({
        studentName: user.name,
        rollNumber: user.id,
        className: "Computer Engineering",
        teacherName: "Faculty",
        date: new Date().toISOString().split("T")[0],
        status: "Present",
      });

      setSession(qrData);
      setScanned(true);
    } catch (error) {
      console.error(error);
      alert("Failed to mark attendance.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6">

        <h1 className="text-2xl font-bold text-white text-center">
          Scan Attendance
        </h1>

        {!scanned ? (
          <>
            <div className="mt-6 overflow-hidden rounded-xl">
              <Scanner
                onScan={(result) => {
                  if (result.length > 0 && !loading) {
                    markAttendance(result[0].rawValue);
                  }
                }}
                onError={(error) => console.log(error)}
              />
            </div>

            <p className="mt-4 text-center text-slate-400">
              Scan Teacher QR Code
            </p>

            {loading && (
              <p className="mt-4 text-center text-cyan-400">
                Saving attendance...
              </p>
            )}
          </>
        ) : (
          <div className="mt-8 text-center">

            <CheckCircle2
              size={80}
              className="mx-auto text-green-500"
            />

            <h2 className="mt-4 text-2xl font-bold text-white">
              Attendance Marked
            </h2>

            <p className="mt-2 text-cyan-400">
              Student
            </p>

            <p className="text-white font-semibold">
              {user.name}
            </p>

            <p className="mt-4 text-cyan-400">
              Session
            </p>

            <p className="break-all text-slate-300">
              {session}
            </p>

            <p className="mt-6 text-green-400 font-semibold">
              Present Successfully
            </p>

          </div>
        )}

      </div>
    </div>
  );
}