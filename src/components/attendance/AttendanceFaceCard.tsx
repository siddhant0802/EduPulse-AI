import { ScanFace } from "lucide-react";

export default function AttendanceFaceCard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">AI attendance</p>
          <h2 className="mt-2 text-xl font-bold text-white">Face Recognition</h2>
        </div>

        <div className="rounded-xl bg-violet-500/15 p-3 text-violet-300">
          <ScanFace size={28} />
        </div>
      </div>

      <div className="mt-6 flex aspect-square max-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950 text-slate-500">
        <ScanFace size={64} />
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Face recognition attendance placeholder for future integration.
      </p>
    </div>
  );
}
