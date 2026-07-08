import { CheckCircle2, ChevronLeft, ChevronRight, XCircle } from "lucide-react";

export interface AttendanceRecord {
  id: string;
  studentName: string;
  rollNumber: string;
  className: string;
  teacherName: string;
  date: string;
  status: "Present" | "Absent";
}

interface AttendanceTableProps {
  records: AttendanceRecord[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AttendanceTable({
  records,
  currentPage,
  totalPages,
  onPageChange,
}: AttendanceTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-950/60">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-400">
                Student
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-400">
                Class
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-400">
                Teacher
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-400">
                Date
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {records.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                  No attendance records found.
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id} className="transition hover:bg-slate-800/60">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{record.studentName}</p>
                    <p className="mt-1 text-sm text-slate-400">{record.rollNumber}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-300">
                    {record.className}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-300">
                    {record.teacherName}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-300">
                    {record.date}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                        record.status === "Present"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-rose-500/15 text-rose-300"
                      }`}
                    >
                      {record.status === "Present" ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <XCircle size={14} />
                      )}
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          Page {currentPage} of {totalPages}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            Prev
          </button>

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
