import { Plus, Search } from "lucide-react";

interface TeacherToolbarProps {
  searchTerm: string;
  statusFilter: "All" | "Active" | "Inactive";
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: "All" | "Active" | "Inactive") => void;
  onAddTeacher: () => void;
}

export default function TeacherToolbar({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onAddTeacher,
}: TeacherToolbarProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg">
      <div className="grid gap-4 lg:grid-cols-[1fr_180px_auto]">
        <label className="relative block">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search teachers, subject, department..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
          />
        </label>

        <select
          value={statusFilter}
          onChange={(event) =>
            onStatusFilterChange(event.target.value as "All" | "Active" | "Inactive")
          }
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          type="button"
          onClick={onAddTeacher}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          <Plus size={18} />
          Add Teacher
        </button>
      </div>
    </div>
  );
}
