// pages/dashboard.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Book } from "@/types";
import { getBooks, updateBookAvailability } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import BookCard from "@/components/BookCardComponent";
import ProtectedRoute from "@/components/ProtectedRoute";

const Dashboard = () => {
  const router = useRouter();
  const { state } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!state.user) return;

      try {
        const allBooks = await getBooks();

        // Filter books by owner
        if (state.user.role === "owner") {
          const ownerBooks = allBooks.filter((book) =>
            typeof book.owner === "string"
              ? book.owner === state.user?._id
              : book.owner._id === state.user?._id
          );
          setBooks(ownerBooks);
        } else {
          // For seekers, show all available books
          setBooks(allBooks.filter((book) => book.isAvailable));
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load books. Please try again later.");
        setLoading(false);
      }
    };

    if (state.isAuthenticated) {
      fetchBooks();
    }
  }, [state.user, state.isAuthenticated]);

  const handleToggleAvailability = async (
    bookId: string,
    newStatus: boolean
  ) => {
    try {
      await updateBookAvailability(bookId, newStatus, state.user?._id!);
      setBooks(
        books.map((book) =>
          book._id === bookId ? { ...book, isAvailable: newStatus } : book
        )
      );
    } catch (err) {
      setError("Failed to update book availability.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-2">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["owner"]}>
      <div className="m-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {state.user?.role === "owner"
              ? "My Books"
              : "Book Finder Dashboard"}
          </h1>

          {state.user?.role === "owner" && (
            <button
              onClick={() => router.push("/books/new")}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Add New Book
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            {error}
          </div>
        )}

        {state.user?.role === "owner" && books.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">No Books Added Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't added any books to share. Start by adding your first
              book!
            </p>
            <button
              onClick={() => router.push("/books/new")}
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
            >
              Add Your First Book
            </button>
          </div>
        ) : (
          <>
            {state.user?.role === "owner" && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">My Shared Books</h2>

                {books.length === 0 ? (
                  <p className="text-gray-600">
                    You haven't added any books yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                      <BookCard
                        key={book._id}
                        book={book}
                        onToggleAvailability={handleToggleAvailability}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {state.user?.role === "seeker" && (
              <div>
                <p className="text-gray-600 mb-6">
                  Browse available books and contact owners to arrange
                  exchanges.
                </p>
                <div className="flex justify-center mb-6">
                  <button
                    onClick={() => router.push("/books")}
                    className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                  >
                    Browse All Books
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
