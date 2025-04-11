// src/models/Book.ts
import mongoose, { Document } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IBook extends Document {
  title: string;
  author: string;
  genre?: string;
  location: string;
  contactInfo: string;
  owner: mongoose.Types.ObjectId | IUser;
  isAvailable: boolean;
}
