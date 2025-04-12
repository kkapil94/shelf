"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const router = useRouter();
  const { state } = useAuth();

  return (
    <>
      <div className="max-w-6xl mx-auto px-4">
        <div className="py-12 md:py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Share Books, Connect Readers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our community to share your books with others or find books
              from fellow readers in your area.
            </p>
          </div>

          {!state.isAuthenticated ? (
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button
                onClick={() => router.push("/register")}
                className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700"
              >
                Join Now
              </button>
              <button
                onClick={() => router.push("/login")}
                className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-50"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="flex justify-center mb-16">
              <button
                onClick={() =>
                  router.push(
                    state.user?.role === "owner" ? "/dashboard" : "/books"
                  )
                }
                className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700"
              >
                {state.user?.role === "owner"
                  ? "Go to Dashboard"
                  : "Browse Books"}
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-4">📚</div>
              <h2 className="text-xl font-semibold mb-2">Share Your Books</h2>
              <p className="text-gray-600">
                List books you're willing to share with others in your
                community.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-4">🔍</div>
              <h2 className="text-xl font-semibold mb-2">Find Books</h2>
              <p className="text-gray-600">
                Discover books available for borrowing near you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-4">🤝</div>
              <h2 className="text-xl font-semibold mb-2">Connect</h2>
              <p className="text-gray-600">
                Meet fellow readers and expand your reading horizons.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">
              How It Works
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold">
                  1
                </div>
                <h3 className="font-medium mb-2">Create an Account</h3>
                <p className="text-gray-600 text-sm">
                  Sign up as a book owner or seeker to start.
                </p>
              </div>

              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold">
                  2
                </div>
                <h3 className="font-medium mb-2">List Your Books</h3>
                <p className="text-gray-600 text-sm">
                  Add books you're willing to share with others.
                </p>
              </div>

              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold">
                  3
                </div>
                <h3 className="font-medium mb-2">Browse & Connect</h3>
                <p className="text-gray-600 text-sm">
                  Find interesting books and contact the owners.
                </p>
              </div>

              <div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold">
                  4
                </div>
                <h3 className="font-medium mb-2">Meet & Exchange</h3>
                <p className="text-gray-600 text-sm">
                  Arrange a meetup to exchange books safely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
