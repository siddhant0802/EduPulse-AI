import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { RefreshCw } from "lucide-react";
import { api } from "../../services/api";

interface QRResponse {
  sessionId: string;
  createdAt: string;
  expiresAt: string;
}

export default function AttendanceQRCard() {
  const [sessionId, setSessionId] = useState("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);

  async function generateQR() {
    try {
      setLoading(true);

      const { data } = await api.post<QRResponse>("/attendance/generate");

      setSessionId(data.sessionId);
      setExpiresAt(new Date(data.expiresAt));
    } catch (error) {
      console.error("Unable to generate QR", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    generateQR();
  }, []);

  useEffect(() => {
    if (!expiresAt) return;

    const timer = setInterval(() => {
      const seconds = Math.max(
        0,
        Math.floor((expiresAt.getTime() - Date.now()) / 1000),
      );

      setTimeLeft(seconds);

      if (seconds <= 0) {
        clearInterval(timer);
        setSessionId("");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            QR Attendance
          </h2>

          <p className="text-sm text-slate-400">
            QR expires in 5 minutes
          </p>
        </div>

        <button
          onClick={generateQR}
          disabled={loading}
          className="rounded-xl bg-cyan-500 p-3 transition hover:bg-cyan-400 disabled:opacity-50"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="mt-6 flex justify-center">
        {sessionId ? (
          <div className="rounded-xl bg-white p-4">
            <QRCode
              value={JSON.stringify({
                sessionId,
              })}
              size={190}
            />
          </div>
        ) : (
          <div className="flex h-[220px] w-[220px] items-center justify-center rounded-xl border border-dashed border-slate-700 text-red-400">
            QR Expired
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg font-bold text-cyan-400">
          {sessionId ? `${timeLeft}s Remaining` : "Expired"}
        </p>

        {sessionId && (
          <p className="mt-2 break-all text-xs text-slate-500">
            Session: {sessionId}
          </p>
        )}
      </div>
    </div>
  );
}