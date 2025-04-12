// components/BookCard.tsx
import { Book } from "../types";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

type BookCardProps = {
  book: Book;
  onToggleAvailability?: (bookId: string, newStatus: boolean) => void;
};

const BookCard = ({ book, onToggleAvailability }: BookCardProps) => {
  const { state } = useAuth();
  const isOwner = state.user && state.user._id === book.owner;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-2">By {book.author}</p>
        {book.genre && (
          <p className="text-sm text-gray-500 mb-2">Genre: {book.genre}</p>
        )}
        <p className="text-sm mb-2">
          <span className="font-medium">Location:</span> {book.location}
        </p>

        <div className="flex items-center mt-4">
          <span
            className={`px-2 py-1 text-xs font-bold rounded ${
              book.isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {book.isAvailable ? "Available" : "Currently Unavailable"}
          </span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link
            href={`/books/${book._id}`}
            className="text-blue-600 hover:underline"
          >
            View Details
          </Link>

          {isOwner && onToggleAvailability && (
            <button
              onClick={() => onToggleAvailability(book._id, !book.isAvailable)}
              className={`px-3 py-1 rounded text-white ${
                book.isAvailable
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Mark as {book.isAvailable ? "Unavailable" : "Available"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
