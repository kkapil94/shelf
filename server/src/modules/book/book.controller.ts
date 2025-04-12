// src/controllers/bookController.ts
import { Request, Response } from "express";
import { IBook } from "./book.interface";
import Book from "./book.model";
import User from "../user/user.model";
import { asyncHandler } from "../../utils/asyncHandler";
import ErrorHandler from "../../utils/errorHandler";

// Get all books
export const getBooks = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const books = await Book.find().populate(
      "owner",
      "name email mobileNumber"
    );
    res.status(200).json(books);
  }
);

export const getSingleBook = asyncHandler(
  async (req: Request, res: Response, next: any): Promise<void> => {
    const { id } = req.params;
    const book = await Book.findById(id).populate(
      "owner",
      "name email mobileNumber"
    );
    if (!book) {
      return next(new ErrorHandler(404, "Book not found"));
    }
    res.status(200).json(book);
  }
);

// Create a new book listing
export const createBook = asyncHandler(
  async (req: Request, res: Response, next: any): Promise<void> => {
    const { title, author, genre, location, contactInfo, ownerId } = req.body;

    if (!title || !author || !location || !contactInfo || !ownerId) {
      return next(new ErrorHandler(400, "All fields are required"));
    }

    // Verify owner exists and is an owner type user
    const owner = await User.findById(ownerId);
    if (!owner) {
      return next(new ErrorHandler(404, "Owner not found"));
    }

    if (owner.role !== "owner") {
      return next(
        new ErrorHandler(403, "Only book owners can create listings")
      );
    }

    const book = await Book.create({
      title,
      author,
      genre,
      location,
      contactInfo,
      owner: ownerId,
      isAvailable: true,
    });

    res.status(201).json(book);
  }
);

// Update book availability
export const updateBookAvailability = asyncHandler(
  async (req: Request, res: Response, next: any): Promise<void> => {
    const { id } = req.params;
    const { isAvailable, ownerId } = req.body;

    if (!id) {
      return next(new ErrorHandler(400, "Book id is required"));
    }

    if (!ownerId) {
      return next(new ErrorHandler(400, "Owner id is required"));
    }

    const book = await Book.findById(id);
    if (!book) {
      return next(new ErrorHandler(404, "Book not found"));
    }

    if (book.owner.toString() !== ownerId) {
      return next(
        new ErrorHandler(403, "You are not authorized to update this book")
      );
    }

    book.isAvailable = isAvailable;
    await book.save();

    res.status(200).json(book);
  }
);
