import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";

import type { Student } from "./StudentTable";

interface EditStudentModalProps {
  student: Student | null;
  onClose: () => void;
  onSaveStudent: (student: Student) => void;
}

export default function EditStudentModal({
  student,
  onClose,
  onSaveStudent,
}: EditStudentModalProps) {
  const [formData, setFormData] = useState<Student | null>(student);

  useEffect(() => {
    setFormData(student);
  }, [student]);

  if (!student || !formData) {
    return null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!formData) return;

  onSaveStudent(formData);
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Edit Student</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            aria-label="Close edit student modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <input
            required
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            required
            type="email"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            required
            value={formData.grade}
            onChange={(event) => setFormData({ ...formData, grade: event.target.value })}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            required
            value={formData.section}
            onChange={(event) => setFormData({ ...formData, section: event.target.value })}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            required
            value={formData.teacher}
            onChange={(event) => setFormData({ ...formData, teacher: event.target.value })}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            min={0}
            max={100}
            type="number"
            value={formData.attendance}
            onChange={(event) =>
              setFormData({ ...formData, attendance: Number(event.target.value) })
            }
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <select
            value={formData.status}
            onChange={(event) =>
              setFormData({
                ...formData,
                status: event.target.value as Student["status"],
              })
            }
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400 sm:col-span-2"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
