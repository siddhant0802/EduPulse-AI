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

const studentsData: Student[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    email: "aarav.sharma@edupulse.ai",
    grade: "10",
    section: "A",
    teacher: "Priya Nair",
    attendance: 96,
    status: "Active",
  },
  {
    id: "2",
    name: "Maya Kapoor",
    email: "maya.kapoor@edupulse.ai",
    grade: "9",
    section: "B",
    teacher: "Rohan Mehta",
    attendance: 91,
    status: "Active",
  },
  {
    id: "3",
    name: "Ishaan Verma",
    email: "ishaan.verma@edupulse.ai",
    grade: "11",
    section: "C",
    teacher: "Ananya Rao",
    attendance: 88,
    status: "Inactive",
  },
  {
    id: "4",
    name: "Sara Khan",
    email: "sara.khan@edupulse.ai",
    grade: "8",
    section: "A",
    teacher: "Vikram Joshi",
    attendance: 94,
    status: "Active",
  },
  {
    id: "5",
    name: "Kabir Singh",
    email: "kabir.singh@edupulse.ai",
    grade: "12",
    section: "B",
    teacher: "Neha Iyer",
    attendance: 82,
    status: "Inactive",
  },
  {
    id: "6",
    name: "Diya Patel",
    email: "diya.patel@edupulse.ai",
    grade: "7",
    section: "C",
    teacher: "Arjun Menon",
    attendance: 98,
    status: "Active",
  },
  {
    id: "7",
    name: "Riya Das",
    email: "riya.das@edupulse.ai",
    grade: "10",
    section: "B",
    teacher: "Priya Nair",
    attendance: 93,
    status: "Active",
  },
  {
    id: "8",
    name: "Aditya Rao",
    email: "aditya.rao@edupulse.ai",
    grade: "9",
    section: "A",
    teacher: "Rohan Mehta",
    attendance: 86,
    status: "Active",
  },
];

const studentsPerPage = 5;

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

  useEffect(() => {
  async function loadStudents() {
    try {
      const data = await studentService.getStudents();
      setStudents(data as Student[]);
    } catch (error) {
      console.error("Failed to load students:", error);
    }
  }

  loadStudents();
}, []);

  const filteredStudents = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(normalizedSearch) ||
        student.email.toLowerCase().includes(normalizedSearch) ||
        student.teacher.toLowerCase().includes(normalizedSearch) ||
        student.grade.toLowerCase().includes(normalizedSearch);
      const matchesStatus = statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, students]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage));
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage,
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
    const newStudent = await studentService.createStudent({
      ...student,
      attendance: 100,
    });

    setStudents((current) => [newStudent as Student, ...current]);

    setIsAddModalOpen(false);
    setCurrentPage(1);
  } catch (error) {
    console.error(error);
    alert("Failed to add student.");
  }
}

  async function handleSaveStudent(updatedStudent: Student) {
  try {
    const student = await studentService.updateStudent(
      String(updatedStudent.id),
      updatedStudent
    );

    setStudents((current) =>
      current.map((item) =>
        item.id === (student as any).id ? (student as Student) : item
      )
    );

    setEditingStudent(null);
  } catch (error) {
    console.error(error);
    alert("Failed to update student.");
  }
}

  async function handleDeleteStudent(studentId: number | string) {
  try {
    await studentService.deleteStudent(String(studentId));

    setStudents((current) =>
      current.filter((student) => student.id !== studentId)
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
          <p className="text-sm font-medium text-cyan-300">Module 2</p>
          <h1 className="mt-2 text-3xl font-bold">Student Management</h1>
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
