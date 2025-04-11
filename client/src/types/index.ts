// types/index.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "owner" | "seeker";
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre?: string;
  location: string;
  contactInfo: string;
  owner: User | string;
  isAvailable: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}
