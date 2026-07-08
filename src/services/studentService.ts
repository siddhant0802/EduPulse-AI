import { api } from "./api";

export interface Student {
  id?: string;
  name: string;
  rollNumber: string;
  email: string;
  grade: string;
  section: string;
  teacher: string;
  attendance: number;
  status: "Active" | "Inactive";
}

const mapStudent = (student: any): Student => ({
  id: student._id,
  name: student.name,
  rollNumber: student.rollNumber,
  email: student.email,
  grade: student.grade,
  section: student.section,
  teacher: student.teacher,
  attendance: student.attendance,
  status: student.status,
});

export const studentService = {
  async getStudents() {
    const { data } = await api.get("/students");
    return data.map(mapStudent);
  },

  async createStudent(student: Student) {
    const { data } = await api.post("/students", student);
    return mapStudent(data);
  },

  async updateStudent(id: string, student: Student) {
    const { data } = await api.put(`/students/${id}`, student);
    return mapStudent(data);
  },

  async deleteStudent(id: string) {
    await api.delete(`/students/${id}`);
  },
};