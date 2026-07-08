import { Download } from "lucide-react";

import type { AttendanceRecord } from "./AttendanceTable";

interface AttendanceExportButtonProps {
  records: AttendanceRecord[];
}

export default function AttendanceExportButton({
  records,
}: AttendanceExportButtonProps) {
  function handleExport() {
    const headers = [
      "Student Name",
      "Roll Number",
      "Class",
      "Teacher",
      "Date",
      "Status",
    ];
    const rows = records.map((record) => [
      record.studentName,
      record.rollNumber,
      record.className,
      record.teacherName,
      record.date,
      record.status,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "attendance-records.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
    >
      <Download size={18} />
      Export CSV
    </button>
  );
}
