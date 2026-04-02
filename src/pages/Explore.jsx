import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const features = [
  {
    title: "Interactive Visualization",
    desc: "Watch data structures come to life with smooth, logic-driven animations.",
    icon: "✨"
  },
  {
    title: "Step-by-Step Simulation",
    desc: "Understand each operation clearly with granular control over every step.",
    icon: "⚙️"
  },
  {
    title: "Code Preview",
    desc: "View high-performance implementations in multiple languages instantly.",
    icon: "💻"
  },
  {
    title: "Beginner Friendly",
    desc: "Designed to take students from zero to DSA mastery with ease.",
    icon: "🌱"
  },
];

const structures = [
  { name: "Array", path: "/learn/array", complexity: "O(1) Access" },
  { name: "Stack", path: "/learn/stack", complexity: "LIFO Logic" },
  { name: "Queue", path: "/learn/queue", complexity: "FIFO Logic" },
  { name: "Linked List", path: "/learn/linkedlist", complexity: "Dynamic Nodes" },
];

const Explore = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-24 font-sans relative overflow-hidden">
      <Navbar user={user} />
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Heading Section */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-gray-600">
            Explore
          </h1>
          <img width={120} src="/logo.png" alt="Logo" className="drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">Features</h1>
        </div>
        <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          A high-performance visual environment designed to bridge the gap between <span className="text-purple-400">theory</span> and <span className="text-blue-400">implementation</span>.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32 relative z-10">
        {features.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate("/dashboard")} // Placeholder for future feature pages
            className="group bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:border-purple-500/40 hover:bg-white/[0.08] transition-all duration-500 backdrop-blur-sm"
          >
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
            <h3 className="text-xl font-black mb-3 text-white group-hover:text-purple-400 transition-colors tracking-tight">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Data Structures Section */}
      <div className="max-w-7xl mx-auto mb-32 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Supported Modules</h2>
          <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {structures.map((ds, index) => (
            <div
              key={index}
              onClick={() => navigate(ds.path)}
              className="group relative bg-gray-900 border border-white/5 p-10 rounded-[2.5rem] text-center cursor-pointer overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:-translate-y-2"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <p className="text-4xl font-black text-white mb-2 relative z-10 tracking-tighter">
                {ds.name}
              </p>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] relative z-10 opacity-70">
                {ds.complexity}
              </p>
              
              <div className="mt-6 inline-flex items-center text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors relative z-10">
                Enter Module <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 p-12 rounded-[3rem] text-center backdrop-blur-xl relative z-10 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tighter italic">Ready to optimize your learning?</h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => navigate(user ? "/dashboard" : "/login")}
            className="px-10 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Start Learning Now
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-10 py-4 border-2 border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/5 hover:border-white/20 transition-all active:scale-95"
          >
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
