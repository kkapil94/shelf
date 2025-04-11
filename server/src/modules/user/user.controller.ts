// src/controllers/userController.ts
import { Request, Response } from "express";
import User from "./user.model";
import { asyncHandler } from "../../utils/asyncHandler";

// Register a new user
export const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, phone, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
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
  async (req: Request, res: Response): Promise<void> => {
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
      res.status(401).json({ message: "Invalid email or password" });
    }
  }
);
