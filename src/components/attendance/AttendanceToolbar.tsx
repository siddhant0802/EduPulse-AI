import { ClipboardCheck, Search } from "lucide-react";

import AttendanceExportButton from "./AttendanceExportButton";
import type { AttendanceRecord } from "./AttendanceTable";

interface AttendanceToolbarProps {
  searchTerm: string;
  records: AttendanceRecord[];
  onSearchChange: (value: string) => void;
  onMarkAttendance: () => void;
}

export default function AttendanceToolbar({
  searchTerm,
  records,
  onSearchChange,
  onMarkAttendance,
}: AttendanceToolbarProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
        <label className="relative block">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search student, roll number, teacher..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
          />
        </label>

        <AttendanceExportButton records={records} />

        <button
          type="button"
          onClick={onMarkAttendance}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          <ClipboardCheck size={18} />
          Mark Attendance
        </button>
      </div>
    </div>
  );
}
