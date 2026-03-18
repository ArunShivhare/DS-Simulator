import { useParams } from "react-router-dom";
import { useState } from "react";

const operationsMap = {
  array: ["Push", "Pop", "Insert", "Delete"],
  stack: ["Push", "Pop"],
  queue: ["Enqueue", "Dequeue"],
  linkedlist: ["Insert", "Delete", "Traverse"],
};

const Visualizer = () => {
  const { type } = useParams();

  const [value, setValue] = useState("");
  const [selectedOp, setSelectedOp] = useState("");
  const [mode, setMode] = useState("visual"); // visual | code

  const operations = operationsMap[type] || [];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-10">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 mt-20">
        {type.toUpperCase()} Visualizer 🚀
      </h2>

      <div className="flex flex-col md:flex-row gap-6">

        {/* LEFT PANEL */}
        <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg">

          <h3 className="text-xl mb-4 font-semibold">Operations</h3>

          {/* Operation Select */}
          <select
            value={selectedOp}
            onChange={(e) => setSelectedOp(e.target.value)}
            className="w-full p-2 mb-4 text-black rounded"
          >
            <option value="">Select Operation</option>
            {operations.map((op, i) => (
              <option key={i} value={op}>
                {op}
              </option>
            ))}
          </select>

          {/* Input */}
          <input
            type="number"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 mb-4 text-black rounded"
          />

          {/* Buttons */}
          <button
            className="w-full bg-linear-to-r from-purple-500 to-indigo-500 p-2 rounded mb-3 hover:scale-105 transition"
          >
            Simulate ▶
          </button>

          <button
            onClick={() => setMode(mode === "visual" ? "code" : "visual")}
            className="w-full bg-gray-700 p-2 rounded hover:bg-gray-600 transition"
          >
            {mode === "visual" ? "View Code 💻" : "Back to Simulation 🔙"}
          </button>

        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">

          {mode === "visual" ? (
            <div className="text-center">
              <p className="text-gray-300 mb-4">
                Visualization Area
              </p>
              <p className="text-sm text-gray-500">
                (Your animation will appear here)
              </p>
            </div>
          ) : (
            <pre className="text-sm text-green-400">
{`// Example Code
function push(arr, val) {
  arr.push(val);
}`}
            </pre>
          )}

        </div>

      </div>
    </div>
  );
};

export default Visualizer;