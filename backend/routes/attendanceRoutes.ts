import { Router } from "express";
import {
  createAttendance,
  generateQR,
  getAttendance,
  getTodayAttendance,
  scanAttendance,
} from "../controllers";

export const attendanceRoutes = Router();

// Teacher Dashboard
attendanceRoutes.get("/", getAttendance);
attendanceRoutes.get("/today", getTodayAttendance);

// Teacher Generate QR
attendanceRoutes.post("/generate", generateQR);

// Student Scan
attendanceRoutes.post("/scan", scanAttendance);

// Manual Attendance
attendanceRoutes.post("/", createAttendance);