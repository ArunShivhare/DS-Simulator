import { useParams } from "react-router-dom";
import { useState } from "react";
import { codeSnippets } from "../data/codeSnippets";

const operationsMap = {
  array: ["Push", "Pop"],
  stack: ["Push", "Pop"],
  queue: ["Enqueue", "Dequeue"],
  linkedlist: ["Insert", "Delete", "Traverse"],
};

const Visualizer = () => {
  const { type } = useParams();

  const [value, setValue] = useState("");
  const [selectedOp, setSelectedOp] = useState("");
  const [mode, setMode] = useState("visual"); // visual | code
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("js");
  const code =
    codeSnippets[type]?.[selectedOp]?.[language] ||
    "// Select operation to view code";

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

          <div className="relative mb-4">
            <button
              onClick={() => setOpen(!open)}
              className="w-full p-2 bg-gray-800 text-white rounded flex justify-between"
            >
              {selectedOp || "Select Operation"}
              <span>
                <img width={40} height={40} src="/dropdown.png" alt="" />
              </span>
            </button>

            {open && (
              <div className="absolute w-full bg-gray-800 mt-2 rounded shadow-lg z-10">
                {operations.map((op, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedOp(op);
                      setOpen(false);
                    }}
                    className="p-2 hover:bg-purple-500 cursor-pointer"
                  >
                    {op}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          {selectedOp !== "Pop" && selectedOp !== "Dequeue" && (
            <input
              type="number"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 mb-4 text-white bg-gray-800 rounded"
            />
          )}

          {/* Buttons */}
          <button className="w-full bg-linear-to-r from-purple-500 to-indigo-500 p-2 rounded mb-3 hover:scale-102 transition">
            Simulate ▶
          </button>

          <button
            disabled={!selectedOp}
            onClick={() => setMode(mode === "visual" ? "code" : "visual")}
            className="w-full bg-gray-700 p-2 rounded disabled:opacity-50"
          >
            {mode === "visual" ? "View Code 💻" : "Back to Simulation 🔙"}
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <pre className="text-sm text-green-400">
            {mode === "visual" ? (
              <div className="text-center">
                <p className="text-gray-300 mb-4">Visualization Area</p>
                <p className="text-sm text-gray-500">
                  (Your animation will appear here)
                </p>
              </div>
            ) : (
              <div className="w-full">
                {/* Language Toggle */}
                <div className="flex gap-3 mb-4 justify-center">
                  {["js", "cpp", "Java", "Python"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1 rounded capitalize ${
                        language === lang ? "bg-purple-500" : "bg-gray-700"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                {/* Code Block */}
                <pre className="bg-black/10 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
                  {code}
                </pre>
              </div>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
