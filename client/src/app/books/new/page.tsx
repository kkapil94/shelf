"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createBook } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

type BookFormInputs = {
  title: string;
  author: string;
  genre: string;
  location: string;
  contactInfo: string;
};

const NewBookPage = () => {
  const router = useRouter();
  const { state } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormInputs>();

  const onSubmit: SubmitHandler<BookFormInputs> = async (data) => {
    if (!state.user) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const bookData = {
        ...data,
        ownerId: state.user._id,
      };

      await createBook(bookData);
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to create book. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["owner"]}>
      <div className="max-w-2xl mx-auto m-8">
        <h1 className="text-2xl font-bold mb-6">Add New Book</h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
          </div>
        )}

        <div className="bg-white shadow-md rounded p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="title">
                Book Title*
              </label>
              <input
                id="title"
                className={`w-full px-3 py-2 border rounded ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="author">
                Author*
              </label>
              <input
                id="author"
                className={`w-full px-3 py-2 border rounded ${
                  errors.author ? "border-red-500" : "border-gray-300"
                }`}
                {...register("author", { required: "Author is required" })}
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.author.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="genre">
                Genre
              </label>
              <input
                id="genre"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                {...register("genre")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="location">
                Location*
              </label>
              <input
                id="location"
                className={`w-full px-3 py-2 border rounded ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
                {...register("location", { required: "Location is required" })}
                placeholder="City, Area, etc."
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="contactInfo">
                Contact Information*
              </label>
              <textarea
                id="contactInfo"
                rows={3}
                className={`w-full px-3 py-2 border rounded ${
                  errors.contactInfo ? "border-red-500" : "border-gray-300"
                }`}
                {...register("contactInfo", {
                  required: "Contact information is required",
                })}
                placeholder="Phone number, email, or preferred contact method"
              ></textarea>
              {errors.contactInfo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactInfo.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding Book..." : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NewBookPage;
