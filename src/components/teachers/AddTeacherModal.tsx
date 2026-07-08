import { useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";

import type { Teacher } from "./TeacherTable";

export type TeacherFormData = Omit<Teacher, "id">;

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTeacher: (teacher: TeacherFormData) => void;
}

const emptyTeacher: TeacherFormData = {
  name: "",
  email: "",
  subject: "",
  department: "",
  classes: "",
  experience: 1,
  status: "Active",
};

export default function AddTeacherModal({
  isOpen,
  onClose,
  onAddTeacher,
}: AddTeacherModalProps) {
  const [formData, setFormData] = useState<TeacherFormData>(emptyTeacher);

  if (!isOpen) {
    return null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAddTeacher(formData);
    setFormData(emptyTeacher);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Add Teacher</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            aria-label="Close add teacher modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <input
            required
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            placeholder="Teacher name"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            required
            type="email"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            placeholder="Email"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            required
            value={formData.subject}
            onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
            placeholder="Subject"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            required
            value={formData.department}
            onChange={(event) =>
              setFormData({ ...formData, department: event.target.value })
            }
            placeholder="Department"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            required
            value={formData.classes}
            onChange={(event) => setFormData({ ...formData, classes: event.target.value })}
            placeholder="Classes"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            min={0}
            type="number"
            value={formData.experience}
            onChange={(event) =>
              setFormData({ ...formData, experience: Number(event.target.value) })
            }
            placeholder="Experience"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />
          <select
            value={formData.status}
            onChange={(event) =>
              setFormData({
                ...formData,
                status: event.target.value as TeacherFormData["status"],
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
              Add Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
