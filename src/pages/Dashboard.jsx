import { useNavigate } from "react-router-dom";
import { FaLayerGroup } from "react-icons/fa";
import { GiStack } from "react-icons/gi";
import { MdQueue } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const structures = [
  {
    name: "array",
    icon: <FaLayerGroup size={40} />,
  },
  {
    name: "stack",
    icon: <GiStack size={40} />,
  },
  {
    name: "queue",
    icon: <MdQueue size={40} />,
  },
  {
    name: "linkedlist",
    icon: <TbListDetails size={40} />,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-16">

      {/* Heading */}
      <div className="text-center mb-14 mt-10">
        <h2 className="text-4xl font-bold mb-4">
          Choose Data Structure 
        </h2>
        <p className="text-gray-300">
          Select a data structure to visualize and understand its operations.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {structures.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(`/visualizer/${item.name}`)}
            className="group p-8 bg-gray-800 rounded-2xl cursor-pointer text-center 
                       hover:scale-105 transition duration-300 shadow-lg 
                       hover:bg-linear-to-r hover:from-purple-500 hover:to-indigo-500"
          >
            {/* Icon */}
            <div className="mb-4 flex justify-center group-hover:scale-110 transition">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold uppercase tracking-wide">
              {item.name}
            </h3>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;