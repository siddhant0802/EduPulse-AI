import { useEffect, useMemo, useState } from "react";

import { DashboardLayout } from "../../components/layout";
import { studentService } from "../../services";

import {
  AddStudentModal,
  DeleteStudentDialog,
  EditStudentModal,
  StudentTable,
  StudentToolbar,
  type Student,
  type StudentFormData,
} from "../../components/students";

const studentsPerPage = 5;

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

  async function loadStudents() {
    try {
      const data = await studentService.getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(normalizedSearch) ||
        student.rollNumber.toLowerCase().includes(normalizedSearch) ||
        student.email.toLowerCase().includes(normalizedSearch) ||
        student.teacher.toLowerCase().includes(normalizedSearch) ||
        student.grade.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [students, searchTerm, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / studentsPerPage)
  );

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  function handleStatusFilterChange(value: "All" | "Active" | "Inactive") {
    setStatusFilter(value);
    setCurrentPage(1);
  }

  async function handleAddStudent(student: StudentFormData) {
    try {
      const newStudent = await studentService.createStudent(student);

      setStudents((current) => [newStudent, ...current]);

      setIsAddModalOpen(false);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      alert("Failed to add student.");
    }
  }

  async function handleSaveStudent(student: Student) {
    try {
      const updated = await studentService.updateStudent(student.id, student);

      setStudents((current) =>
        current.map((item) =>
          item.id === updated.id ? updated : item
        )
      );

      setEditingStudent(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update student.");
    }
  }

  async function handleDeleteStudent(id: string) {
    try {
      await studentService.deleteStudent(id);

      setStudents((current) =>
        current.filter((student) => student.id !== id)
      );

      setDeletingStudent(null);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      alert("Failed to delete student.");
    }
  }

  function handlePageChange(page: number) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  }

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">

          <div>
            <p className="text-sm font-medium text-cyan-300">
              Module 2
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Student Management
            </h1>
          </div>

          <StudentToolbar
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={handleSearchChange}
            onStatusFilterChange={handleStatusFilterChange}
            onAddStudent={() => setIsAddModalOpen(true)}
          />

          <StudentTable
            students={paginatedStudents}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onEdit={setEditingStudent}
            onDelete={setDeletingStudent}
          />

        </div>

        <AddStudentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddStudent={handleAddStudent}
        />

        <EditStudentModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSaveStudent={handleSaveStudent}
        />

        <DeleteStudentDialog
          student={deletingStudent}
          onClose={() => setDeletingStudent(null)}
          onConfirmDelete={handleDeleteStudent}
        />

      </div>
    </DashboardLayout>
  );
}