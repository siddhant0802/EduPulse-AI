import type { Request, Response } from "express";
import { User } from "../models";
import { generateToken } from "../utils";

const sendAuthResponse = (
  res: Response,
  statusCode: number,
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "teacher" | "student";
  },
) => {
  res.status(statusCode).json({
    user,
    token: generateToken(user.id),
  });
};

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      role?: "admin" | "teacher" | "student";
    };

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role ?? "student",
    });

    sendAuthResponse(res, 200, {
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to register user",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    sendAuthResponse(res, 200, {
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to login",
    });
  }
}

export function logout(_req: Request, res: Response) {
  res.status(200).json({
    message: "Logged out successfully",
  });
}