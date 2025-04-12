// components/Navbar.tsx
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { state, logout } = useAuth();
  const { isAuthenticated, user } = state;

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Book Exchange
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link href="/books" className="hover:text-blue-200">
                Browse Books
              </Link>

              {user?.role === "owner" && (
                <Link href="/books/new" className="hover:text-blue-200">
                  Add Book
                </Link>
              )}

              <Link href="/dashboard" className="hover:text-blue-200">
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>

              <span className="ml-2 font-medium">Hello, {user?.name}</span>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-200">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-blue-600 hover:bg-blue-100 px-3 py-1 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
