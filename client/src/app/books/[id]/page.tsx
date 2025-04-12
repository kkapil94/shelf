"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book, User } from "@/types";
import { getBookById, updateBookAvailability } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

const BookDetail = () => {
  const router = useRouter();
  const params = useParams();
  const { state } = useAuth();
  const id = params.id;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [owner, setOwner] = useState<User | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const bookData = await getBookById(id as string);
        setBook(bookData);

        // If owner is populated as an object
        if (typeof bookData.owner === "object") {
          setOwner(bookData.owner as User);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load book details.");
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleToggleAvailability = async () => {
    if (!book) return;

    try {
      const updatedBook = await updateBookAvailability(
        book._id,
        !book.isAvailable,
        owner?._id!
      );
      setBook(updatedBook);
    } catch (err) {
      setError("Failed to update book availability.");
    }
  };

  const isOwner =
    state.user &&
    book &&
    state.user._id ===
      (typeof book.owner === "string" ? book.owner : (book.owner as User)._id);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-2">Loading book details...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        {error || "Book not found"}
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto m-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <p className="text-xl text-gray-700 mb-4">By {book.author}</p>
              </div>
              <span
                className={`px-3 py-1 text-sm font-bold rounded ${
                  book.isAvailable
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {book.isAvailable ? "Available" : "Currently Unavailable"}
              </span>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <h2 className="text-xl font-semibold mb-4">Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {book.genre && (
                  <div>
                    <p className="text-gray-600 font-medium">Genre</p>
                    <p>{book.genre}</p>
                  </div>
                )}

                <div>
                  <p className="text-gray-600 font-medium">Location</p>
                  <p>{book.location}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>
              <p>{book.contactInfo}</p>
            </div>

            {isOwner && (
              <div className="mt-8">
                <button
                  onClick={handleToggleAvailability}
                  className={`px-4 py-2 rounded text-white ${
                    book.isAvailable
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  Mark as {book.isAvailable ? "Unavailable" : "Available"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:underline flex items-center"
          >
            &larr; Back to Books
          </button>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
