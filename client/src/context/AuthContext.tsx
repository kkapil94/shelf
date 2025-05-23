"use client";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import { User, AuthState } from "../types";
import { loginUser, registerUser } from "../services/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Define action types
type AuthAction =
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "REGISTER_REQUEST" }
  | { type: "REGISTER_SUCCESS"; payload: User }
  | { type: "REGISTER_FAILURE"; payload: string }
  | { type: "LOGOUT" };

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Create reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Create context
type AuthContextType = {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    phone: number,
    email: string,
    password: string,
    role: "owner" | "seeker"
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: JSON.parse(user),
      });
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const user = await loginUser({ email, password });
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      toast.success("Login successful");

      // Redirect based on role
      if (user.role === "owner") {
        router.push("/dashboard");
      } else {
        router.push("/books");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data?.message || "Login failed",
      });
    }
  };

  // Register function
  const register = async (
    name: string,
    phone: number,
    email: string,
    password: string,
    role: "owner" | "seeker"
  ) => {
    dispatch({ type: "REGISTER_REQUEST" });
    try {
      const user = await registerUser({
        name,
        phone,
        email,
        password,
        role,
      });
      console.log({ user });
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "REGISTER_SUCCESS", payload: user });
      toast.success("Registration successful");

      router.push("/login");
    } catch (error: any) {
      console.log({ error });
      toast.error(error.response?.data?.message || "Registration failed");
      dispatch({
        type: "REGISTER_FAILURE",
        payload: error.response?.data?.message || "Registration failed",
      });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
