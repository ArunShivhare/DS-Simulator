import { useNavigate } from "react-router-dom";
import { FaLayerGroup } from "react-icons/fa";
import { GiStack } from "react-icons/gi";
import { MdQueue } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Navbar from "../components/Navbar";

const structures = [
  {
    name: "Array",
    path: "array",
    icon: <FaLayerGroup size={44} />,
    desc: "Fast access, contiguous memory, powerful searching.",
    tag: "O(1) Access"
  },
  {
    name: "Stack",
    path: "stack",
    icon: <GiStack size={44} />,
    desc: "LIFO structure used in recursion & undo operations.",
    tag: "LIFO Logic"
  },
  {
    name: "Queue",
    path: "queue",
    icon: <MdQueue size={44} />,
    desc: "FIFO structure used in scheduling & buffering.",
    tag: "FIFO Logic"
  },
  {
    name: "Linked List",
    path: "linkedlist",
    icon: <TbListDetails size={44} />,
    desc: "Dynamic memory, efficient insert/delete operations.",
    tag: "Dynamic"
  },
];

const Dashboard = ({user}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-24 font-sans relative overflow-hidden">
      <Navbar user={user} />
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* 🔥 HERO SECTION */}
      <div className="text-center mb-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400">
            Master Data
          </h2>
          <img width={100} src="/logo.png" alt="Logo" className="drop-shadow-[0_0_15px_rgba(129,140,248,0.4)]" />
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">Structures</h2>
        </div>
        <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          The ultimate environment to <span className="text-purple-400">visualize</span>, 
          <span className="text-blue-400 ml-1 text-white font-medium">simulate</span>, and master core concepts.
        </p>
      </div>

      {/* 🔥 TOP FEATURES (3-column layout) */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-24 relative z-10">
        {[
          { title: "Visual Learning", desc: "Interactive simulations for every step.", color: "text-purple-400" },
          { title: "Code + Theory", desc: "Real-world implementations & deep dives.", color: "text-blue-400" },
          { title: "Practice Ready", desc: "Solve problems and track your score.", color: "text-emerald-400" },
        ].map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-sm">
            <h3 className={`font-black uppercase tracking-widest text-[10px] mb-2 ${item.color}`}>{item.title}</h3>
            <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 🔥 MODULE SELECTOR TITLE */}
      <div className="max-w-6xl mx-auto mb-12 flex items-center gap-4 relative z-10">
        <h3 className="text-3xl font-black uppercase tracking-tighter">Choose Module</h3>
        <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
      </div>

      {/* 🔥 STRUCTURE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative z-10">
        {structures.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(`/visualizer/${item.path}`)}
            className="group relative p-8 bg-gray-900 border border-white/5 rounded-[2.5rem] cursor-pointer text-center 
                       transition-all duration-500 hover:border-purple-500/50 hover:-translate-y-2 overflow-hidden"
          >
            {/* Hover Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* ICON with Glow Effect */}
            <div className="mb-6 flex justify-center text-gray-500 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_10px_rgba(168,85,247,0)] group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              {item.icon}
            </div>

            {/* TITLE & TAG */}
            <p className="text-[10px] font-black text-purple-500/60 uppercase tracking-[0.2em] mb-2 group-hover:text-purple-400 transition-colors">
              {item.tag}
            </p>
            <h3 className="text-2xl font-black mb-4 tracking-tighter group-hover:text-white transition-colors">
              {item.name}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">
              {item.desc}
            </p>

            {/* Action Indicator */}
            <div className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 group-hover:text-white transition-colors">
              Launch Visualizer <span className="ml-1 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
