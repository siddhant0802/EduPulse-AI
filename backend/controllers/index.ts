export { login, logout, register } from "./authController";

export {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./studentController";

export {
  getAttendance,
  getTodayAttendance,
  createAttendance,
  generateQR,
  scanAttendance,
} from "./attendanceController";