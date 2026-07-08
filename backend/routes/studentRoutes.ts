import { Router } from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController";

export const studentRoutes = Router();

studentRoutes.get("/", getStudents);
studentRoutes.post("/", createStudent);
studentRoutes.put("/:id", updateStudent);
studentRoutes.delete("/:id", deleteStudent);