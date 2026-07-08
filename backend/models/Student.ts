import { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    grade: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      required: true,
    },

    teacher: {
      type: String,
      required: true,
    },

    attendance: {
      type: Number,
      default: 100,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export const Student = model("Student", studentSchema);