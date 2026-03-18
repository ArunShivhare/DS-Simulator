import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Interactive Visualization",
    desc: "Watch data structures come to life with smooth animations.",
  },
  {
    title: "Step-by-Step Simulation",
    desc: "Understand each operation step clearly and intuitively.",
  },
  {
    title: "Code Preview",
    desc: "View implementations in multiple languages.",
  },
  {
    title: "Beginner Friendly",
    desc: "Designed for students learning DSA from scratch.",
  },
];

const structures = ["Array", "Stack", "Queue", "Linked List"];

const Explore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-16">

      {/* Heading */}
      <div className="text-center mb-16 mt-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore Features 🚀
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          A powerful visual learning tool to master data structures with
          animations and real-time simulations.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-3 text-purple-400">
              {item.title}
            </h3>
            <p className="text-gray-300 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Data Structures Section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-6">
          Supported Data Structures
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {structures.map((ds, index) => (
          <div
            key={index}
            className="bg-gray-800 shadow-lg p-8 rounded-xl text-center hover:bg-purple-600 hover:scale-105 transition cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            {ds}
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-8 py-4 bg-linear-to-r from-purple-500 to-indigo-500 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
        >
          Start Learning Now 🚀
        </button>
      </div>

    </div>
  );
};

export default Explore;