import { useEffect, useMemo, useState } from "react";
import { attendanceService } from "../../services/attendanceService";

import { DashboardLayout } from "../../components/layout";
import {
  AttendanceFaceCard,
  AttendanceFilters,
  AttendanceQRCard,
  AttendanceSummary,
  AttendanceTable,
  AttendanceToolbar,
  MarkAttendanceModal,
  type AttendanceFormData,
  type AttendanceRecord,
} from "../../components/attendance";

const recordsPerPage = 5;

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false);

  useEffect(() => {
    async function loadAttendance() {
      try {
        const data = await attendanceService.getAttendance();
        setRecords(data as AttendanceRecord[]);
      } catch (error) {
        console.error("Failed to load attendance:", error);
      }
    }

    loadAttendance();

    const interval = setInterval(loadAttendance, 1000);

    return () => clearInterval(interval);
  }, []);

  const classOptions = useMemo(
    () =>
      Array.from(new Set(records.map((record) => record.className))).sort(),
    [records],
  );

  const filteredRecords = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        record.studentName.toLowerCase().includes(normalizedSearch) ||
        record.rollNumber.toLowerCase().includes(normalizedSearch) ||
        record.teacherName.toLowerCase().includes(normalizedSearch);

      const matchesClass =
        classFilter === "All" || record.className === classFilter;

      const matchesDate =
        dateFilter === "" || record.date === dateFilter;

      return matchesSearch && matchesClass && matchesDate;
    });
  }, [records, searchTerm, classFilter, dateFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecords.length / recordsPerPage),
  );

  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage,
  );

  const presentCount = filteredRecords.filter(
    (record) => record.status === "Present",
  ).length;

  const absentCount = filteredRecords.filter(
    (record) => record.status === "Absent",
  ).length;

  const attendancePercentage =
    filteredRecords.length === 0
      ? 0
      : Math.round(
          (presentCount / filteredRecords.length) * 100,
        );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  function handleClassFilterChange(value: string) {
    setClassFilter(value);
    setCurrentPage(1);
  }

  function handleDateFilterChange(value: string) {
    setDateFilter(value);
    setCurrentPage(1);
  }

  function handleMarkAttendance(record: AttendanceFormData) {
    setRecords((currentRecords) => [
      {
        id: Date.now().toString(),
        ...record,
      },
      ...currentRecords,
    ]);

    setIsMarkModalOpen(false);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(
      Math.min(Math.max(page, 1), totalPages),
    );
  }
    return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">

          <div>
            <p className="text-sm font-medium text-cyan-300">
              Module 4
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Attendance Management
            </h1>
          </div>

          <AttendanceSummary
            total={filteredRecords.length}
            present={presentCount}
            absent={absentCount}
            percentage={attendancePercentage}
          />

          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">

            <div className="space-y-6">

              <AttendanceToolbar
                searchTerm={searchTerm}
                records={filteredRecords}
                onSearchChange={handleSearchChange}
                onMarkAttendance={() =>
                  setIsMarkModalOpen(true)
                }
              />

              <AttendanceFilters
                classFilter={classFilter}
                dateFilter={dateFilter}
                classOptions={classOptions}
                onClassFilterChange={handleClassFilterChange}
                onDateFilterChange={handleDateFilterChange}
              />

              <AttendanceTable
                records={paginatedRecords}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">

              <div className="space-y-6">

  <AttendanceQRCard />

  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

    <h2 className="mb-4 text-xl font-bold text-white">
      Live Attendance
    </h2>

    <div className="mb-4 flex items-center justify-between">

      <span className="text-slate-400">
        Present Today
      </span>

      <span className="rounded-lg bg-green-600 px-4 py-2 font-bold text-white">
        {presentCount}
      </span>

    </div>

    <div className="max-h-[420px] space-y-3 overflow-y-auto">

      {records
        .filter((r) => r.status === "Present")
        .map((student) => (

          <div
            key={student.id}
            className="flex items-center justify-between rounded-xl bg-slate-800 p-3"
          >

            <div>

              <p className="font-semibold text-white">
                {student.studentName}
              </p>

              <p className="text-xs text-slate-400">
                {student.rollNumber}
              </p>

            </div>

            <span className="rounded-lg bg-green-600 px-3 py-1 text-sm font-semibold text-white">
              Present
            </span>

          </div>

      ))}

    </div>

  </div>

</div>

              <AttendanceFaceCard />

            </div>

          </div>

        </div>

        <MarkAttendanceModal
          isOpen={isMarkModalOpen}
          classOptions={classOptions}
          onClose={() => setIsMarkModalOpen(false)}
          onMarkAttendance={handleMarkAttendance}
        />

      </div>
    </DashboardLayout>
  );
}