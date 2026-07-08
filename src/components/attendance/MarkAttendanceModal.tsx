import { useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";

import type { AttendanceRecord } from "./AttendanceTable";

export type AttendanceFormData = Omit<AttendanceRecord, "id">;

interface MarkAttendanceModalProps {
  isOpen: boolean;
  classOptions: string[];
  onClose: () => void;
  onMarkAttendance: (record: AttendanceFormData) => void;
}

const emptyRecord: AttendanceFormData = {
  studentName: "",
  rollNumber: "",
  className: "Grade 10-A",
  teacherName: "",
  date: "2026-07-05",
  status: "Present",
};

export default function MarkAttendanceModal({
  isOpen,
  classOptions,
  onClose,
  onMarkAttendance,
}: MarkAttendanceModalProps) {
  const [formData, setFormData] = useState<AttendanceFormData>(emptyRecord);

  if (!isOpen) {
    return null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onMarkAttendance(formData);
    setFormData(emptyRecord);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Mark Attendance</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            aria-label="Close mark attendance modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <input
            required
            value={formData.studentName}
            onChange={(event) =>
              setFormData({ ...formData, studentName: event.target.value })
            }
            placeholder="Student name"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            required
            value={formData.rollNumber}
            onChange={(event) =>
              setFormData({ ...formData, rollNumber: event.target.value })
            }
            placeholder="Roll number"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <select
            value={formData.className}
            onChange={(event) =>
              setFormData({ ...formData, className: event.target.value })
            }
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          >
            {classOptions.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
          <input
            required
            value={formData.teacherName}
            onChange={(event) =>
              setFormData({ ...formData, teacherName: event.target.value })
            }
            placeholder="Teacher name"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            required
            type="date"
            value={formData.date}
            onChange={(event) =>
              setFormData({ ...formData, date: event.target.value })
            }
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <select
            value={formData.status}
            onChange={(event) =>
              setFormData({
                ...formData,
                status: event.target.value as AttendanceFormData["status"],
              })
            }
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <div className="flex gap-3 sm:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-slate-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Save Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
