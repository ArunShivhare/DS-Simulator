import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { codeSnippets } from "../data/codeSnippets";
import { visualizationSteps } from "../data/visualizationSteps";
import { motion } from "framer-motion";

const operationsMap = {
  array: ["Insert", "Delete", "Linear Search", "Binary Search"],
  stack: ["Push", "Pop", "Top"],
  queue: ["Enqueue", "Dequeue"],
  linkedlist: [
    "Insert Head",
    "Insert Tail",
    "Delete Head",
    "Delete Tail",
    "Traverse",
  ],
};

const isSorted = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
};

const Visualizer = () => {
  const { type } = useParams();

  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [mid, setMid] = useState(null);
  const [value, setValue] = useState("");
  const [selectedOp, setSelectedOp] = useState("");
  const [structure, setStructure] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState("visual"); // visual | code
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("js");
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [topIndex, setTopIndex] = useState(-1);
  const [frontIndex, setFrontIndex] = useState(0);
  const [rearIndex, setRearIndex] = useState(-1);
  const [llHighlightIndex, setLlHighlightIndex] = useState(null);
  const [tempIndex, setTempIndex] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");

  const code =
    codeSnippets[type]?.[selectedOp]?.[language] ||
    "// Select operation to view code";

  const operations = operationsMap[type] || [];

  const executeStep = (step) => {
    switch (step.type) {
      case "highlight":
        setHighlightIndex(step.index);
        break;

      case "insert":
        setStructure((prev) => [...prev, Number(step.value)]);
        break;

      case "enqueue":
        setStructure((prev) => {
          const newArr = [...prev, Number(step.value)];
          setRearIndex(newArr.length - 1);
          if (newArr.length === 1) setFrontIndex(0);
          return newArr;
        });
        break;

      case "push":
        setStructure((prev) => {
          const newArr = [...prev, Number(step.value)];
          setTopIndex(newArr.length - 1);
          return newArr;
        });
        break;

      case "delete":
        setStructure((prev) => {
          const newArr = prev.slice(0, -1);

          // Fix highlight after removal
          setHighlightIndex(newArr.length - 1);

          return newArr;
        });
        break;

      case "pop":
        setStructure((prev) => {
          const newArr = prev.slice(0, -1);
          setTopIndex(newArr.length - 1);
          return newArr;
        });
        break;

      case "highlightTop":
        setTopIndex(structure.length - 1);
        break;

      case "dequeue":
        setStructure((prev) => {
          const newArr = prev.slice(1);

          if (newArr.length === 0) {
            setFrontIndex(0);
            setRearIndex(-1);
          } else {
            setFrontIndex(0);
            setRearIndex(newArr.length - 1);
          }

          return newArr;
        });
        break;

      case "search-check":
        setHighlightIndex(step.index);
        break;

      case "search-found":
        setHighlightIndex(step.index);
        setSearchResult(step.index);
        break;

      case "search-not-found":
        setSearchResult(-1);
        break;

      case "bs-check":
        setLow(step.low);
        setHigh(step.high);
        setMid(step.mid);
        break;

      case "bs-found":
        setMid(step.index);
        setSearchResult(step.index);
        break;

      case "bs-not-found":
        setSearchResult(-1);
        break;

      // INSERT HEAD
      case "ll-insert-head":
        setStructure((prev) => [Number(step.value), ...prev]);
        break;

      // INSERT TAIL
      case "ll-insert-tail":
        setStructure((prev) => [...prev, Number(step.value)]);
        break;

      // DELETE HEAD
      case "ll-delete-head":
        setStructure((prev) => prev.slice(1));
        break;

      // DELETE TAIL
      case "ll-delete-tail":
        setStructure((prev) => prev.slice(0, -1));
        break;

      case "ll-traverse":
        setLlHighlightIndex(step.index);
        setTempIndex(step.index);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (currentStep < steps.length) {
      let delay = 100; // default fast

      // Linked List Traverse
      if (type === "linkedlist" && selectedOp === "Traverse") {
        delay = 800;
      }

      // Array Linear Search
      else if (type === "array" && selectedOp === "Linear Search") {
        delay = 800;
      }

      // Array Binary Search
      else if (type === "array" && selectedOp === "Binary Search") {
        delay = 1200;
      }

      const timer = setTimeout(() => {
        executeStep(steps[currentStep]);
        setCurrentStep((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep, steps, type, selectedOp]);

  const handleSimulate = () => {
    setSearchResult(null);
    setHighlightIndex(null);
    setLow(null);
    setMid(null);
    setHigh(null);
    setInfoMessage("");

    // 🟣 Handle Binary Search separately
    if (type === "array" && selectedOp === "Binary Search") {
      if (!isSorted(structure)) {
        setInfoMessage("Array not sorted. Sorting first... 🔄");

        const sorted = [...structure].sort((a, b) => a - b);
        setStructure(sorted);

        // Delay to show sorting message
        setTimeout(() => {
          const steps =
            visualizationSteps[type]?.[selectedOp]?.(sorted, value) || [];

          setSteps(steps);
          setCurrentStep(0);
          setInfoMessage("");
        }, 1000);

        return;
      }
    }

    // Default flow
    const generatedSteps =
      visualizationSteps[type]?.[selectedOp]?.(structure, value) || [];

    setSteps(generatedSteps);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (currentStep >= steps.length) {
      const timer = setTimeout(() => {
        // Link list
        setTempIndex(null);
        setLlHighlightIndex(null);

        // Array (Linear Search)
        setHighlightIndex(null);

        // Binary Search
        setLow(null);
        setMid(null);
        setHigh(null);

        // ✅ ADD THIS (IMPORTANT)
        setSearchResult(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, steps]);

  const renderStack = () => (
    <div className="flex flex-col items-center justify-end h-80">
      {/* Stack Container */}
      <div className="flex flex-col-reverse items-center gap-2 border-2 border-gray-600 p-4 rounded-lg min-w-30 max-h-75 overflow-y-auto">
        {structure.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Top Pointer */}
            {index === topIndex && (
              <div className="text-yellow-400 text-sm mb-1 flex flex-col items-center">
                <span>Top</span>
                <span>↓</span>
              </div>
            )}

            <motion.div
              initial={{ scale: 0, y: -30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`w-20 h-10 flex items-center justify-center rounded text-white font-semibold shadow
              ${index === topIndex ? "bg-yellow-500" : "bg-indigo-500"}`}
            >
              {item}
            </motion.div>

            {/* Index */}
            <span className="text-xs text-gray-400 mt-1">{index}</span>
          </div>
        ))}
      </div>

      {/* Empty Stack Indicator */}
      {structure.length === 0 && (
        <div className="text-gray-400 mt-4">Stack is Empty (Top = -1)</div>
      )}
    </div>
  );

  const renderQueue = () => (
    <div className="flex flex-col items-center gap-6">
      {/* Queue Row */}
      <div className="flex items-center gap-6">
        {structure.map((item, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {/* FRONT POINTER */}
            {index === frontIndex && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-green-400 text-xs">
                <span>Front</span>
                <span>↓</span>
              </div>
            )}

            {/* NODE */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`w-14 h-12 flex items-center justify-center rounded-lg text-white font-semibold shadow
              ${
                index === frontIndex
                  ? "bg-green-500"
                  : index === rearIndex
                    ? "bg-yellow-500"
                    : "bg-indigo-500"
              }`}
            >
              {item}
            </motion.div>

            {/* REAR POINTER */}
            {index === rearIndex && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-yellow-400 text-xs">
                <span>↑</span>
                <span>Rear</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {structure.length === 0 && (
        <div className="text-gray-400">
          Queue is Empty (Front = 0, Rear = -1)
        </div>
      )}
    </div>
  );

  const renderArray = () => (
    <div className="flex flex-col items-center gap-2">
      {/* Array Boxes */}
      <div className="flex gap-6 items-end">
        {structure.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Pointer */}
            {highlightIndex === index && (
              <div className="text-yellow-400 text-sm mb-1">↓</div>
            )}

            {/* LOW POINTER */}
            {low === index && <div className="text-green-400 text-xs">L</div>}
            {/* MID POINTER */}
            {mid === index && <div className="text-yellow-400 text-xs">M</div>}
            {/* HIGH POINTER */}
            {high === index && <div className="text-red-400 text-xs">H</div>}

            <motion.div
              initial={{ scale: 0, y: -40 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`w-14 h-12 flex items-center justify-center rounded-lg text-white font-semibold shadow-lg
              ${
                mid === index
                  ? "bg-yellow-500" // MID (main focus)
                  : highlightIndex === index
                    ? "bg-yellow-500"
                    : "bg-purple-500"
              }`}
            >
              {item}
            </motion.div>
            {/* Index BELOW */}
            <span className="text-xs mt-2 text-gray-400">{index}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLinkedList = () => (
    <div className="flex items-center justify-center gap-6">
      {structure.map((item, index) => (
        <div key={index} className="relative flex items-center">
          {/* HEAD POINTER */}
          {index === 0 && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-purple-400 text-xs font-semibold">
              <span>Head</span>
              <span>↓</span>
            </div>
          )}
          {/* Tail pointer */}
          {index === structure.length - 1 && (
            <div className="absolute -bottom-10 text-xs text-pink-200">
              Tail ↑
            </div>
          )}

          {/* TEMP POINTER (MOVING 🔥) */}
          {tempIndex === index && (
            <div className="absolute -top-8 right-1/2 -translate-x-1/2 flex flex-col items-center text-yellow-400 text-xs font-semibold">
              <span>temp</span>
              <span>↓</span>
            </div>
          )}

          {/* NODE */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-14 h-12 flex items-center justify-center rounded-lg text-white font-semibold shadow
            ${
              llHighlightIndex === index
                ? "bg-yellow-500 scale-110"
                : "bg-pink-500"
            }`}
          >
            {item}
          </motion.div>

          {/* ARROW */}
          <span className="mx-3 text-xl text-gray-400">→</span>
        </div>
      ))}

      {/* NULL */}
      {structure.length > 0 && (
        <span className="text-gray-400 font-semibold">NULL</span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-10">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 mt-20">
        {type.toUpperCase()} Visualizer
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
          {selectedOp !== "Pop" &&
            selectedOp !== "Dequeue" &&
            selectedOp !== "Delete" &&
            selectedOp !== "Delete Head" &&
            selectedOp !== "Delete Tail" &&
            selectedOp !== "Traverse" &&
            selectedOp !== "Top" && (
              <input
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full p-2 mb-4 text-white bg-gray-800 rounded"
              />
            )}

          {/* Buttons */}
          <button
            onClick={handleSimulate}
            className="w-full bg-linear-to-r from-purple-500 to-indigo-500 p-2 rounded mb-3"
          >
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
        <div className="flex-1 overflow-x-scroll bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <pre className="text-sm text-green-400 m-auto">
            {mode === "visual" ? (
              <div className="text-center">
                <div className="flex gap-6 flex-wrap justify-center items-end">
                  {/* TOP OPERATION DISPLAY */}
                  {type === "stack" && selectedOp === "Top" && (
                    <div className="mb-4 text-center text-lg text-yellow-400 font-semibold">
                      {structure.length > 0
                        ? `Top Element: ${structure[topIndex]}`
                        : "Stack is Empty"}
                    </div>
                  )}

                  {selectedOp === "Linear Search" && searchResult !== null && (
                    <div className="mb-4 text-lg font-semibold text-center">
                      {searchResult === -1 ? (
                        <span className="text-red-400">Value Not Found ❌</span>
                      ) : (
                        <span className="text-green-400">
                          Found at index: {searchResult} ✅
                        </span>
                      )}
                    </div>
                  )}

                  {infoMessage && (
                    <div className="mb-4 text-yellow-400 text-center font-semibold">
                      {infoMessage}
                    </div>
                  )}
                  {selectedOp === "Binary Search" && searchResult !== null && (
                    <div className="mb-4 text-lg text-center">
                      {searchResult === -1 ? (
                        <span className="text-red-400">Not Found ❌</span>
                      ) : (
                        <span className="text-green-400">
                          Found at index: {searchResult}
                        </span>
                      )}
                    </div>
                  )}

                  {type === "array" && renderArray()}
                  {type === "stack" && renderStack()}
                  {type === "queue" && renderQueue()}
                  {type === "linkedlist" && renderLinkedList()}
                </div>
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
                        language === lang ? "bg-black/10" : "bg-gray-700"
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
