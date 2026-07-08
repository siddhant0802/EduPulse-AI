import { Schema, model } from "mongoose";

const attendanceSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },

    studentName: {
      type: String,
      required: true,
    },

    rollNumber: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: true,
    },

    teacherName: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present",
    },
  },
  {
    timestamps: true,
  }
);

export const Attendance = model("Attendance", attendanceSchema);