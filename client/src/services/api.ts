// services/api.ts
import axios from "axios";
import { User, Book } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// User API
export const registerUser = async (userData: {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: "owner" | "seeker";
}): Promise<User> => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

// Book API
export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get("/books");
  return response.data;
};

export const getBookById = async (id: string): Promise<Book> => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (bookData: {
  title: string;
  author: string;
  genre?: string;
  location: string;
  contactInfo: string;
  ownerId: string;
}): Promise<Book> => {
  const response = await api.post("/books", bookData);
  return response.data;
};

export const updateBookAvailability = async (
  bookId: string,
  isAvailable: boolean
): Promise<Book> => {
  const response = await api.put(`/books/${bookId}/availability`, {
    isAvailable,
  });
  return response.data;
};
