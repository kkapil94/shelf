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
  phone: number;
  email: string;
  password: string;
  role: "owner" | "seeker";
}): Promise<User> => {
  console.log({ userData });
  const response = await api.post("/user/register", userData);
  console.log({ response });
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  const response = await api.post("/user/login", credentials);
  return response.data;
};

// Book API
export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get("/book");
  return response.data;
};

export const getBookById = async (id: string): Promise<Book> => {
  const response = await api.get(`/book/${id}`);
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
  const response = await api.post("/book", bookData);
  return response.data;
};

export const updateBookAvailability = async (
  bookId: string,
  isAvailable: boolean,
  ownerId: string
): Promise<Book> => {
  const response = await api.put(`/book/${bookId}/availability`, {
    isAvailable,
    ownerId,
  });
  return response.data;
};
