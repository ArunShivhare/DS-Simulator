import { useNavigate } from "react-router-dom";

const Home = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Learn Data Structures <br />
            <span className="text-purple-400">Visually & Easily</span>
          </h1>

          <p className="text-gray-300 text-lg mb-8 max-w-lg">
            Understand how data structures work internally with beautiful
            animations and step-by-step simulations. No more confusion — just
            clear concepts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate(user ? "/dashboard" : "/login")}
              className="px-6 py-3 bg-linear-to-r from-purple-500 to-indigo-500 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Start Learning 🚀
            </button>

            <button
              onClick={() => navigate("/explore")}
              className="px-6 py-3 border border-gray-500 rounded-xl hover:bg-gray-800 transition"
            >
              Explore Features
            </button>
          </div>
        </div>

        {/* Right Image / Illustration */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://illustrations.popsy.co/gray/work-from-home.svg"
            alt="hero"
            className="w-[80%] md:w-[90%] drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
