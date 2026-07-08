interface AttendanceFiltersProps {
  classFilter: string;
  dateFilter: string;
  classOptions: string[];
  onClassFilterChange: (value: string) => void;
  onDateFilterChange: (value: string) => void;
}

export default function AttendanceFilters({
  classFilter,
  dateFilter,
  classOptions,
  onClassFilterChange,
  onDateFilterChange,
}: AttendanceFiltersProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg md:grid-cols-2">
      <select
        value={classFilter}
        onChange={(event) => onClassFilterChange(event.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
      >
        <option value="All">All Classes</option>
        {classOptions.map((className) => (
          <option key={className} value={className}>
            {className}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={dateFilter}
        onChange={(event) => onDateFilterChange(event.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
      />
    </div>
  );
}
