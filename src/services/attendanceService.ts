import { api } from "./api";

export interface Attendance {
  id?: string;
  studentName: string;
  rollNumber: string;
  className: string;
  teacherName: string;
  date: string;
  status: "Present" | "Absent";
  createdAt?: string;
  updatedAt?: string;
}

export const attendanceService = {
  async getAttendance(): Promise<Attendance[]> {
    const { data } = await api.get<Attendance[]>("/attendance");
    return data;
  },

  async markAttendance(attendance: Attendance): Promise<Attendance> {
    const { data } = await api.post<Attendance>(
      "/attendance",
      attendance
    );
    return data;
  },

  async deleteAttendance(id: string) {
    const { data } = await api.delete(`/attendance/${id}`);
    return data;
  },
};