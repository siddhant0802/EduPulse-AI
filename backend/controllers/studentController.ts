import { Request, Response } from "express";
import { Student } from "../models";

// GET ALL STUDENTS
export async function getStudents(_req: Request, res: Response) {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch {
    res.status(500).json({ message: "Failed to fetch students" });
  }
}

// ADD STUDENT
export async function createStudent(req: Request, res: Response) {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch {
    res.status(500).json({ message: "Failed to create student" });
  }
}

// UPDATE STUDENT
export async function updateStudent(req: Request, res: Response) {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch {
    res.status(500).json({ message: "Failed to update student" });
  }
}

// DELETE STUDENT
export async function deleteStudent(req: Request, res: Response) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete student" });
  }
}