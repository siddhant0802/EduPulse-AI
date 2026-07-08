import { AlertTriangle } from "lucide-react";

import type { Teacher } from "./TeacherTable";

interface DeleteTeacherDialogProps {
  teacher: Teacher | null;
  onClose: () => void;
  onConfirmDelete: (teacherId: string) => void;
}

export default function DeleteTeacherDialog({
  teacher,
  onClose,
  onConfirmDelete,
}: DeleteTeacherDialogProps) {
  if (!teacher) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/15 text-rose-300">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Delete Teacher</h2>
            <p className="mt-1 text-sm text-slate-400">This action cannot be undone.</p>
          </div>
        </div>

        <p className="text-slate-300">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">{teacher.name}</span>?
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-slate-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirmDelete(teacher.id)}
            className="flex-1 rounded-xl bg-rose-500 px-5 py-3 font-semibold text-white transition hover:bg-rose-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
