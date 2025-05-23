// src/controllers/userController.ts
import { Request, Response } from "express";
import User from "./user.model";
import { asyncHandler } from "../../utils/asyncHandler";
import ErrorHandler from "../../utils/errorHandler";

// Register a new user
export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: any): Promise<void> => {
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password || !role) {
      return next(new ErrorHandler(400, "All fields are required"));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler(400, "User already exists"));
    }

    // Create new user
    const user = await User.create({
      name,
      phone,
      email,
      password, // In a real app, you'd hash this password
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }
);

// Login user
export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: any): Promise<void> => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && user.password === password) {
      // In a real app, compare hashed passwords
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      return next(new ErrorHandler(401, "Invalid email or password"));
    }
  }
);
