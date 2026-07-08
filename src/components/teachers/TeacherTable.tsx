import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  department: string;
  classes: string;
  experience: number;
  status: "Active" | "Inactive";
}

interface TeacherTableProps {
  teachers: Teacher[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
}

export default function TeacherTable({
  teachers,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}: TeacherTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-950/60">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-400">
                Teacher
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-400">
                Subject
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-400">
                Department
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-400">
                Classes
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-400">
                Experience
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
            {teachers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-slate-400">
                  No teachers found.
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr key={teacher.id} className="transition hover:bg-slate-800/60">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-white">{teacher.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{teacher.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-300">
                    {teacher.subject}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-300">
                    {teacher.department}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-300">
                    {teacher.classes}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-300">
                    {teacher.experience} years
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        teacher.status === "Active"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-slate-500/20 text-slate-300"
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(teacher)}
                        className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                        aria-label={`Edit ${teacher.name}`}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(teacher)}
                        className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-rose-400 hover:text-rose-300"
                        aria-label={`Delete ${teacher.name}`}
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
