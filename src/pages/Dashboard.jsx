import { useNavigate } from "react-router-dom";
import { FaLayerGroup } from "react-icons/fa";
import { GiStack } from "react-icons/gi";
import { MdQueue } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const structures = [
  {
    name: "Array",
    path: "array",
    icon: <FaLayerGroup size={40} />,
    desc: "Fast access, contiguous memory, powerful searching.",
  },
  {
    name: "Stack",
    path: "stack",
    icon: <GiStack size={40} />,
    desc: "LIFO structure used in recursion & undo operations.",
  },
  {
    name: "Queue",
    path: "queue",
    icon: <MdQueue size={40} />,
    desc: "FIFO structure used in scheduling & buffering.",
  },
  {
    name: "Linked List",
    path: "linkedlist",
    icon: <TbListDetails size={40} />,
    desc: "Dynamic memory, efficient insert/delete operations.",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-16">

      {/* 🔥 HERO SECTION */}
      <div className="text-center mb-16 mt-10 max-w-3xl mx-auto">
        <h2 className="text-5xl flex justify-center items-center font-extrabold mb-4 bg-linear-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Master Data Structures 
          <span className="mx-2">
            <img width={100} src="/logo.png" alt="" />
          </span>
        </h2>
        <p className="text-gray-400 text-lg">
          Learn, visualize, and practice core data structures — all in one place.
        </p>
      </div>

      {/* 🔥 FEATURES */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
        {[
          {
            title: "Visual Learning",
            desc: "Understand concepts through interactive simulations.",
          },
          {
            title: "Code + Theory",
            desc: "Learn with explanations and real code examples.",
          },
          {
            title: "Practice Ready",
            desc: "Solve curated problems from easy to hard.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-center hover:border-purple-500/40 transition"
          >
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 🔥 SECTION TITLE */}
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold">Choose Data Structure</h3>
        <p className="text-gray-400 mt-2">
          Select one to explore theory, visualization, and practice.
        </p>
      </div>

      {/* 🔥 CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">

        {structures.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(`/visualizer/${item.path}`)}
            className="group p-8 bg-gray-800 rounded-2xl cursor-pointer text-center 
                       hover:scale-105 transition duration-300 shadow-lg 
                       hover:bg-linear-to-r hover:from-purple-500 hover:to-indigo-500"
          >
            {/* ICON */}
            <div className="mb-4 flex justify-center group-hover:scale-110 transition">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold mb-2 uppercase tracking-wide">
              {item.name}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-xs text-gray-400 group-hover:text-white transition">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Dashboard;