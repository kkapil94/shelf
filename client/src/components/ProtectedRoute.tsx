// components/ProtectedRoute.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: ("owner" | "seeker")[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!state.isAuthenticated) {
      router.push("/login");
      return;
    }

    // If roles are specified and user's role is not allowed
    if (allowedRoles && state.user && !allowedRoles.includes(state.user.role)) {
      // Redirect based on role
      if (state.user.role === "owner") {
        router.push("/dashboard");
      } else {
        router.push("/books");
      }
    }
  }, [state.isAuthenticated, state.user, router, allowedRoles]);

  // If authenticated and allowed, render children
  return <>{state.isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
