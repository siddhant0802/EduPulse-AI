import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { DashboardLayout } from "../../components/layout";
import { api } from "../../services/api";

export default function ScanAttendancePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [rollNumber, setRollNumber] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function markAttendance(
    sessionId: string,
    rollNumber: string
  ) {
    try {
      setLoading(true);

      const response = await api.post("/attendance/scan", {
        sessionId,
        rollNumber,
      });

      console.log(response.data);

      setSuccess(true);
      setShowForm(false);
      setMessage("✅ Attendance Marked Successfully");
    } catch (error: any) {
      console.error(error);

      setMessage(
        error?.response?.data?.message ??
          "Unable to mark attendance."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="flex min-h-screen flex-col items-center justify-center p-8">

        <h1 className="mb-8 text-3xl font-bold text-white">
          Scan Attendance
        </h1>

        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-700">

          {!success && !showForm && (
            <Scanner
              onScan={(codes) => {
                if (!codes.length) return;

                try {
                  const qr = JSON.parse(codes[0].rawValue);

                  setSessionId(qr.sessionId);
                  setShowForm(true);
                } catch {
                  alert("Invalid QR Code");
                }
              }}
              onError={(error) => {
                console.error(error);
              }}
            />
          )}

        </div>

        {showForm && !success && (
          <div className="mt-6 w-full max-w-md rounded-2xl bg-slate-900 p-6">

            <h2 className="mb-4 text-xl font-bold text-white">
              Enter Roll Number
            </h2>

            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter Roll Number"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none"
            />

            <button
              onClick={() =>
                markAttendance(sessionId, rollNumber)
              }
              className="mt-5 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white hover:bg-cyan-400"
            >
              Submit Attendance
            </button>

          </div>
        )}

        {loading && (
          <p className="mt-6 font-semibold text-cyan-400">
            Saving Attendance...
          </p>
        )}

        {message && (
          <div className="mt-6 rounded-xl bg-slate-900 px-6 py-4">

            <h2 className="text-center text-lg font-bold text-white">
              {message}
            </h2>

          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl bg-green-600 px-6 py-4">

            <h2 className="text-center text-xl font-bold text-white">
              Attendance Completed ✅
            </h2>

            <p className="mt-2 text-center text-white">
              You have already marked your attendance.
            </p>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}