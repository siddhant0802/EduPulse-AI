import { Request, Response } from "express";
import crypto from "crypto";

import { Attendance, Student } from "../models";

let activeSessionId = "";

export async function getAttendance(_req: Request, res: Response) {
  try {
    const attendance = await Attendance.find().sort({ createdAt: -1 });

    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch attendance",
    });
  }
}

export async function getTodayAttendance(_req: Request, res: Response) {
  try {
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.find({
      date: today,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      totalPresent: attendance.length,
      students: attendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch today's attendance",
    });
  }
}

export async function createAttendance(req: Request, res: Response) {
  try {
    const attendance = await Attendance.create(req.body);

    res.status(201).json(attendance);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to save attendance",
    });
  }
}

export async function generateQR(_req: Request, res: Response) {
  try {
    activeSessionId = crypto.randomUUID();

    res.status(200).json({
      sessionId: activeSessionId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to generate QR",
    });
  }
}

export async function scanAttendance(req: Request, res: Response) {
  try {
    const { sessionId, rollNumber } = req.body;

    if (!sessionId || sessionId !== activeSessionId) {
      return res.status(400).json({
        message: "Invalid QR Code",
      });
    }

    if (!rollNumber) {
      return res.status(400).json({
        message: "Roll Number is required",
      });
    }

    const student = await Student.findOne({
      rollNumber,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    const alreadyMarked = await Attendance.findOne({
      rollNumber,
      date: today,
    });

    if (alreadyMarked) {
      return res.status(400).json({
        message: "Attendance already marked",
      });
    }

    const attendance = await Attendance.create({
      sessionId,
      studentName: student.name,
      rollNumber: student.rollNumber,
      className: `${student.grade}-${student.section}`,
      teacherName: student.teacher,
      date: today,
      status: "Present",
    });

    res.status(201).json(attendance);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
}