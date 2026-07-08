import { Navigate, Route, Routes } from "react-router";


import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
} from "./pages/auth";

import { DashboardPage } from "./pages/dashboard";
import StudentsPage from "./pages/students/StudentsPage";
import TeachersPage from "./pages/teachers/TeachersPage";
import AttendancePage from "./pages/attendance/AttendancePage";
import ScanAttendancePage from "./pages/Scan/ScanAttendancePage";

import TeacherDashboard from "./pages/teachers/TeacherDashboard";
import StudentDashboard from "./pages/students/StudentDashboard";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />

      {/* Student QR Scan */}
      <Route
        path="/scan"
        element={<ScanAttendancePage />}
      />

      {/* Admin Dashboard */}
      <Route
  path="/dashboard"
  element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
}
/>

      {/* Teacher Dashboard */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      {/* Student Dashboard */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Students */}
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <StudentsPage />
          </ProtectedRoute>
        }
      />

      {/* Teachers */}
      <Route
        path="/teachers"
        element={
          <ProtectedRoute>
            <TeachersPage />
          </ProtectedRoute>
        }
      />

      {/* Attendance */}
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <AttendancePage />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;