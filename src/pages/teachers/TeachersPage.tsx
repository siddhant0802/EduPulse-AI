import { useMemo, useState } from "react";

import { DashboardLayout } from "../../components/layout";
import {
  AddTeacherModal,
  DeleteTeacherDialog,
  EditTeacherModal,
  TeacherTable,
  TeacherToolbar,
  type Teacher,
  type TeacherFormData,
} from "../../components/teachers";

const teachersData: Teacher[] = [
  {
    id: "1",
    name: "Priya Nair",
    email: "priya.nair@edupulse.ai",
    subject: "Mathematics",
    department: "Science",
    classes: "Grade 10-A, 10-B",
    experience: 8,
    status: "Active",
  },
  {
    id: "2",
    name: "Rohan Mehta",
    email: "rohan.mehta@edupulse.ai",
    subject: "English",
    department: "Languages",
    classes: "Grade 9-A, 9-B",
    experience: 6,
    status: "Active",
  },
  {
    id: "3",
    name: "Ananya Rao",
    email: "ananya.rao@edupulse.ai",
    subject: "Physics",
    department: "Science",
    classes: "Grade 11-C",
    experience: 10,
    status: "Inactive",
  },
  {
    id: "4",
    name: "Vikram Joshi",
    email: "vikram.joshi@edupulse.ai",
    subject: "History",
    department: "Humanities",
    classes: "Grade 8-A, 8-C",
    experience: 7,
    status: "Active",
  },
  {
    id: "5",
    name: "Neha Iyer",
    email: "neha.iyer@edupulse.ai",
    subject: "Chemistry",
    department: "Science",
    classes: "Grade 12-B",
    experience: 11,
    status: "Inactive",
  },
  {
    id: "6",
    name: "Arjun Menon",
    email: "arjun.menon@edupulse.ai",
    subject: "Computer Science",
    department: "Technology",
    classes: "Grade 7-C, 12-A",
    experience: 5,
    status: "Active",
  },
  {
    id: "7",
    name: "Meera Sethi",
    email: "meera.sethi@edupulse.ai",
    subject: "Biology",
    department: "Science",
    classes: "Grade 9-C, 10-C",
    experience: 9,
    status: "Active",
  },
  {
    id: "8",
    name: "Karan Malhotra",
    email: "karan.malhotra@edupulse.ai",
    subject: "Economics",
    department: "Commerce",
    classes: "Grade 11-A, 12-C",
    experience: 4,
    status: "Active",
  },
];

const teachersPerPage = 5;

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(teachersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deletingTeacher, setDeletingTeacher] = useState<Teacher | null>(null);

  const filteredTeachers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return teachers.filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(normalizedSearch) ||
        teacher.email.toLowerCase().includes(normalizedSearch) ||
        teacher.subject.toLowerCase().includes(normalizedSearch) ||
        teacher.department.toLowerCase().includes(normalizedSearch) ||
        teacher.classes.toLowerCase().includes(normalizedSearch);
      const matchesStatus = statusFilter === "All" || teacher.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, teachers]);

  const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / teachersPerPage));
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * teachersPerPage,
    currentPage * teachersPerPage,
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  function handleStatusFilterChange(value: "All" | "Active" | "Inactive") {
    setStatusFilter(value);
    setCurrentPage(1);
  }

  function handleAddTeacher(teacher: TeacherFormData) {
  setTeachers((currentTeachers) => [
    {
      id: Date.now().toString(),
      ...teacher,
    },
    ...currentTeachers,
  ]);

  setIsAddModalOpen(false);
  setCurrentPage(1);
}

  function handleSaveTeacher(updatedTeacher: Teacher) {
    setTeachers((currentTeachers) =>
      currentTeachers.map((teacher) =>
        teacher.id === updatedTeacher.id ? updatedTeacher : teacher,
      ),
    );
    setEditingTeacher(null);
  }

  function handleDeleteTeacher(teacherId: string) {
  setTeachers((currentTeachers) =>
    currentTeachers.filter((teacher) => teacher.id !== teacherId),
  );

  setDeletingTeacher(null);
  setCurrentPage(1);
}

  function handlePageChange(page: number) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  }

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div>
            <p className="text-sm font-medium text-cyan-300">Module 3</p>
            <h1 className="mt-2 text-3xl font-bold">Teacher Management</h1>
          </div>

          <TeacherToolbar
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={handleSearchChange}
            onStatusFilterChange={handleStatusFilterChange}
            onAddTeacher={() => setIsAddModalOpen(true)}
          />

          <TeacherTable
            teachers={paginatedTeachers}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onEdit={setEditingTeacher}
            onDelete={setDeletingTeacher}
          />
        </div>

        <AddTeacherModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddTeacher={handleAddTeacher}
        />

        <EditTeacherModal
          teacher={editingTeacher}
          onClose={() => setEditingTeacher(null)}
          onSaveTeacher={handleSaveTeacher}
        />

        <DeleteTeacherDialog
          teacher={deletingTeacher}
          onClose={() => setDeletingTeacher(null)}
          onConfirmDelete={handleDeleteTeacher}
        />
      </div>
    </DashboardLayout>
  );
}
