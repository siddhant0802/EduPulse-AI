import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  grade: string;
  section: string;
  teacher: string;
  attendance: number;
  status: "Active" | "Inactive";
}

interface StudentTableProps {
  students: Student[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export default function StudentTable({
  students,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}: StudentTableProps) {
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
                Attendance
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-400">
                Status
              </th>
              <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {students.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="transition hover:bg-slate-800/60">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-white">{student.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{student.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-300">
                    Grade {student.grade} - {student.section}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-300">
                    {student.teacher}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex min-w-32 items-center gap-3">
                      <div className="h-2 flex-1 rounded-full bg-slate-800">
                        <div
                          className="h-2 rounded-full bg-cyan-400"
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-300">
                        {student.attendance}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        student.status === "Active"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-slate-500/20 text-slate-300"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(student)}
                        className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                        aria-label={`Edit ${student.name}`}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(student)}
                        className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-rose-400 hover:text-rose-300"
                        aria-label={`Delete ${student.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
