import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB() {
  console.log("Connecting to MongoDB...");
  console.log(env.mongoUri);

  await mongoose.connect(env.mongoUri);

  console.log("MongoDB connected");
}