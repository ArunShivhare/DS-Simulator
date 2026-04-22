import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { codeSnippets } from "../data/codeSnippets";
import { visualizationSteps } from "../data/visualizationSteps";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import Navbar from "../components/Navbar";

const operationsMap = {
  array: ["Insert", "Delete", "Linear Search", "Binary Search", "Bubble Sort"],
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

  const user = auth.currentUser;
  const userId = user?.uid;
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
  const [speedOpen, setSpeedOpen] = useState(false);
  const [language, setLanguage] = useState("js");
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [topIndex, setTopIndex] = useState(-1);
  const [frontIndex, setFrontIndex] = useState(0);
  const [rearIndex, setRearIndex] = useState(-1);
  const [llHighlightIndex, setLlHighlightIndex] = useState(null);
  const [tempIndex, setTempIndex] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");
  const [speed, setSpeed] = useState(null); // null = default
  const [sortedIndices, setSortedIndices] = useState([]);

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
        setStructure((prev) => {
          const values = Array.isArray(step.value) ? step.value : [step.value];

          const startIndex = prev.length;
          const newArr = [...prev, ...values];

          setHighlightIndex(startIndex + values.length - 1); // ✅ FIX

          return newArr;
        });
        break;

      case "enqueue":
        setStructure((prev) => {
          const values = Array.isArray(step.value) ? step.value : [step.value];

          const startIndex = prev.length;
          const newArr = [...prev, ...values];

          setRearIndex(startIndex + values.length - 1); // ✅ FIX

          if (prev.length === 0) setFrontIndex(0);

          return newArr;
        });
        break;

      case "push":
        setStructure((prev) => {
          const values = Array.isArray(step.value) ? step.value : [step.value];

          const startIndex = prev.length;
          const newArr = [...prev, ...values];

          setTopIndex(startIndex + values.length - 1); // ✅ FIX

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

      case "compare":
        setHighlightIndex(step.indices);
        setInfoMessage(
          `Comparing ${structure[step.indices[0]]} and ${structure[step.indices[1]]}`,
        );
        break;

      case "swap":
        setInfoMessage(`Swapping elements`);
        setStructure((prev) => {
          const newArr = [...prev];
          const [i, j] = step.indices;

          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
          return newArr;
        });
        break;

      case "mark-sorted":
        // you need a new state
        setSortedIndices((prev) => [...prev, step.index]);
        break;

      case "pass-complete":
        setInfoMessage(`Pass ${step.pass} completed`);
        setTimeout(() => setInfoMessage(""), 500);
        break;

      // INSERT HEAD
      case "ll-insert-head":
        setStructure((prev) => {
          const values = Array.isArray(step.value) ? step.value : [step.value];

          // last inserted (head side) is index 0
          setLlHighlightIndex(0); // ✅ always head

          return [...values, ...prev];
        });
        break;

      // INSERT TAIL
      case "ll-insert-tail":
        setStructure((prev) => {
          const values = Array.isArray(step.value) ? step.value : [step.value];

          const startIndex = prev.length;
          const newArr = [...prev, ...values];

          setLlHighlightIndex(startIndex + values.length - 1); // ✅ FIX

          return newArr;
        });
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
      let delay;

      // ✅ If user selected speed → use that
      if (speed) {
        delay = speed;
      } else {
        // 🔥 Your existing logic (UNCHANGED)
        delay = 300;

        if (type === "linkedlist" && selectedOp === "Traverse") {
          delay = 800;
        } else if (type === "array" && selectedOp === "Linear Search") {
          delay = 800;
        } else if (type === "array" && selectedOp === "Binary Search") {
          delay = 1200;
        } else if (type === "array" && selectedOp === "Bubble Sort") {
          delay = 1200;
        }

      }

      const timer = setTimeout(() => {
        executeStep(steps[currentStep]);
        setCurrentStep((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep, steps, type, selectedOp]);

  const handleSimulate = () => {
    setSteps([]);
    setCurrentStep(0);

    setSearchResult(null);
    setHighlightIndex(null);
    setLow(null);
    setMid(null);
    setHigh(null);
    setInfoMessage("");
    setSortedIndices([]);

    // 🟣 Handle Binary Search separately
    if (type === "array" && selectedOp === "Binary Search") {
      if (!isSorted(structure)) {
        setInfoMessage("Array not sorted. Sorting first... 🔄");

        const sorted = [...structure]
          .filter((x) => typeof x === "number")
          .sort((a, b) => a - b);
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

    let generatedSteps = [];

    // 🟣 Operations that DON'T need input
    if (
      selectedOp === "Pop" ||
      selectedOp === "Dequeue" ||
      selectedOp === "Delete" ||
      selectedOp === "Delete Head" ||
      selectedOp === "Delete Tail" ||
      selectedOp === "Traverse" ||
      selectedOp === "Top"
    ) {
      generatedSteps =
        visualizationSteps[type]?.[selectedOp]?.(structure) || [];
    } else {
      const parsedValues = parseInput(value);

      let tempStructure = [...structure];

      if (parsedValues.length > 1) {
        parsedValues.forEach((val) => {
          const step =
            visualizationSteps[type]?.[selectedOp]?.(tempStructure, val) || [];

          generatedSteps = [...generatedSteps, ...step];

          tempStructure.push(val);
        });
      } else {
        generatedSteps =
          visualizationSteps[type]?.[selectedOp]?.(
            structure,
            parsedValues[0],
          ) || [];
      }
    }

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
    <div className="flex flex-col items-center justify-end min-h-[450px] py-10 w-full">
      {/* Stack Container - 'The Well' */}
      <div className="relative flex flex-col-reverse items-center gap-3 border-x-4 border-b-4 border-white/10 bg-white/5 p-10 rounded-b-[3rem] min-w-[280px] max-h-[400px] overflow-y-auto scrollbar-hide shadow-2xl backdrop-blur-sm">
        {/* Visual Top Rim Glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>

        {structure.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-full relative h-14 shrink-0"
          >
            {/* 1. LEFT SIDE: TOP POINTER */}
            <div className="absolute left-0 w-16 flex justify-end items-center">
              {index === topIndex && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-[9px] font-black text-yellow-500 uppercase tracking-tighter bg-yellow-500/10 px-8 py-1 rounded border border-yellow-500/20 animate-pulse">
                    Top
                  </span>
                  <div className="w-3 h-[2px] bg-yellow-500/40"></div>
                </motion.div>
              )}
            </div>

            {/* 2. CENTER: THE DATA BLOCK */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{
                scale: index === topIndex ? 1.05 : 1,
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              className={`
              w-28 h-12 flex items-center justify-center rounded-xl text-lg font-black transition-all duration-300 border-2 z-10
              ${
                index === topIndex
                  ? "bg-yellow-500 border-yellow-300 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                  : "bg-gray-800 border-white/5 text-gray-400"
              }
            `}
            >
              {item}
            </motion.div>

            {/* 3. RIGHT SIDE: INDEX LABEL */}
            <div className="absolute right-0 w-16 flex justify-start items-center">
              <div className="w-3 h-[1px] bg-gray-700 mr-2"></div>
              <span className="text-[10px] font-mono font-bold text-gray-500 italic p-6">
                idx {index}
              </span>
            </div>
          </div>
        ))}

        {/* Empty Stack State */}
        {structure.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-16 opacity-20"
          >
            <div className="text-4xl mb-2 text-gray-500 font-black italic tracking-tighter">
              EMPTY
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
              Stack Pointer = -1
            </p>
          </motion.div>
        )}
      </div>

      {/* Stack Base Plate */}
      <div className="w-56 h-3 bg-white/5 rounded-full mt-4 border-t border-white/10 shadow-lg"></div>
    </div>
  );

  const renderQueue = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12 relative w-full">
      {/* 1. Main Queue Stage - Increased vertical padding (py-20) to prevent pointer clipping */}
      <div className="relative flex items-center gap-6 bg-white/5 border-y-2 border-white/5 px-16 py-24 rounded-[3rem] backdrop-blur-sm min-w-full lg:min-w-[600px] overflow-x-auto scrollbar-hide shadow-inner">
        {/* Dynamic Background Labels */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-500/20 rotate-90 tracking-[0.5em] uppercase pointer-events-none">
          INLET
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-yellow-500/20 -rotate-90 tracking-[0.5em] uppercase pointer-events-none">
          OUTLET
        </div>

        {structure.map((item, index) => {
          const isFront = index === frontIndex;
          const isRear = index === rearIndex;

          return (
            <div
              key={index}
              className="relative flex flex-col items-center shrink-0 group"
            >
              {/* FRONT POINTER (Top Track) */}
              <div className="absolute -top-16 h-16 flex flex-col items-center justify-end pb-2">
                {isFront && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <span className="bg-emerald-500 text-white text-[9px] font-black px-2.5 py-1 rounded shadow-[0_0_15px_rgba(16,185,129,0.4)] animate-pulse mb-1">
                      FRONT
                    </span>
                    <div className="w-[2px] h-3 bg-emerald-500/40"></div>
                  </motion.div>
                )}
              </div>

              {/* THE DATA NODE */}
              <motion.div
                initial={{ scale: 0, x: 40 }}
                animate={{
                  scale: isFront || isRear ? 1.1 : 1,
                  x: 0,
                }}
                transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
                className={`
                w-16 h-16 flex items-center justify-center rounded-2xl text-xl font-black transition-all duration-500 border-2 z-10
                ${
                  isFront
                    ? "bg-emerald-500 border-emerald-300 text-black shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                    : isRear
                      ? "bg-yellow-500 border-yellow-300 text-black shadow-[0_0_25px_rgba(234,179,8,0.4)]"
                      : "bg-gray-800 border-white/5 text-gray-500"
                }
              `}
              >
                {item}
              </motion.div>

              {/* REAR POINTER (Bottom Track) */}
              <div className="absolute -bottom-16 h-16 flex flex-col items-center justify-start pt-2">
                {isRear && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-[2px] h-3 bg-yellow-500/40 mb-1"></div>
                    <span className="bg-yellow-500 text-black text-[9px] font-black px-2.5 py-1 rounded shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                      REAR
                    </span>
                  </motion.div>
                )}
              </div>

              {/* INDEX LABEL */}
              <div className="absolute -bottom-6 opacity-30 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] font-mono font-bold text-gray-400">
                  [{index}]
                </span>
              </div>
            </div>
          );
        })}

        {/* 2. Empty State Styling */}
        {structure.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center py-10 opacity-20"
          >
            <div className="text-4xl font-black italic tracking-tighter text-gray-500">
              QUEUE EMPTY
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
              Waiting for first element...
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer Detail */}
      <div className="w-1/2 h-1 bg-white/5 blur-sm mt-8 rounded-full"></div>
    </div>
  );

  const renderArray = () => (
    /* Removed extra wrapper to prevent scroll issues */
    <div className="flex gap-4 items-end px-10">
      {" "}
      {/* Added horizontal padding for scroll end-room */}
      {structure.map((item, index) => {
        const isMid = mid === index;
        const isHighlit =
          highlightIndex === index ||
          (Array.isArray(highlightIndex) && highlightIndex.includes(index));
        const isLow = low === index;
        const isHigh = high === index;
        const isSorted = sortedIndices.includes(index);
        const isComparing =
          Array.isArray(highlightIndex) && highlightIndex.includes(index);

        return (
          <div
            key={index}
            className="relative flex flex-col items-center shrink-0 group" /* shrink-0 is vital */
          >
            {/* 1. TOP POINTERS - Stacking logic for multiple pointers on one index */}
            <div className="absolute -top-16 flex flex-col items-center justify-end gap-1 min-h-[60px] w-20">
              {isLow && (
                <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg shadow-emerald-500/20 animate-bounce">
                  LOW
                </span>
              )}
              {isMid && (
                <span className="bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded shadow-lg shadow-yellow-500/20 animate-bounce">
                  MID
                </span>
              )}
              {isHigh && (
                <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg shadow-red-500/20 animate-bounce">
                  HIGH
                </span>
              )}
              {isHighlit && !isMid && (
                <div className="text-purple-400 text-xl animate-pulse leading-none">
                  ↓
                </div>
              )}
            </div>

            {/* 2. THE ARRAY BOX */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{
                scale: isMid || isHighlit ? 1.1 : 1,
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.4 }}
              className={`
              w-16 h-16 flex items-center justify-center rounded-2xl text-xl font-black transition-all duration-300 border-2
                      ${
                        isSorted
                          ? "bg-green-500 border-green-300 text-black"
                          : isComparing || isMid || isHighlit
                            ? "bg-yellow-500 border-yellow-300 text-black"
                            : "bg-gray-900/40 border-white/10 text-gray-300"
                      }
            `}
            >
              {item}
            </motion.div>

            {/* 3. INDEX LABEL */}
            <div className="mt-4 flex flex-col items-center opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="h-2 w-px bg-gray-600 mb-1"></div>
              <span className="text-[9px] font-mono font-bold text-gray-400 tracking-tighter">
                IDX {index}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderLinkedList = () => (
    <div className="flex items-center gap-2 py-24 min-h-[400px] w-full overflow-x-auto scrollbar-hide px-20">
      {structure.map((item, index) => {
        const isHead = index === 0;
        const isTail = index === structure.length - 1;
        const isTemp = tempIndex === index;
        const isHighlight = llHighlightIndex === index;

        return (
          <div key={index} className="relative flex items-center shrink-0">
            {/* 1. POINTER TRACKS (Head, Temp, Tail) */}
            <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
              {/* TOP TRACK (Head & Temp) */}
              <div className="absolute -top-20 h-20 flex flex-col items-center justify-end pb-2">
                {isHead && (
                  <span className="bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-[0_0_15px_rgba(147,51,234,0.3)] mb-1 uppercase tracking-tighter">
                    HEAD
                  </span>
                )}
                {isTemp && (
                  <motion.span
                    animate={{ y: [0, -4, 0], scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded shadow-[0_0_15px_rgba(234,179,8,0.4)] uppercase tracking-tighter"
                  >
                    TEMP
                  </motion.span>
                )}
                {(isHead || isTemp) && (
                  <div className="w-[2px] h-4 bg-gray-700 mt-1"></div>
                )}
              </div>

              {/* BOTTOM TRACK (Tail & Index) */}
              <div className="absolute -bottom-16 h-16 flex flex-col items-center justify-start pt-2">
                {isTail && (
                  <>
                    <div className="w-[2px] h-4 bg-gray-700 mb-1"></div>
                    <span className="bg-pink-500/10 text-pink-400 border border-pink-500/30 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
                      TAIL
                    </span>
                  </>
                )}
                <span className="mt-2 text-[8px] font-mono text-gray-700 font-bold">
                  [{index}]
                </span>
              </div>
            </div>

            {/* 2. THE NODE MODULE */}
            <motion.div
              initial={{ scale: 0, x: -30 }}
              animate={{
                scale: isHighlight ? 1.1 : 1,
                x: 0,
                boxShadow: isHighlight
                  ? "0 0 30px rgba(234,179,8,0.3)"
                  : "0 0 0px rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.4, type: "spring" }}
              className={`
              relative w-20 h-16 flex items-center justify-center rounded-2xl text-xl font-black transition-all duration-500 border-2 z-10
              ${
                isHighlight
                  ? "bg-yellow-500 border-yellow-300 text-black shadow-2xl"
                  : "bg-gray-900/60 border-white/10 text-white backdrop-blur-md hover:border-pink-500/40"
              }
            `}
            >
              {/* Visual Partition */}
              <div className="absolute left-0 w-1.5 h-8 bg-pink-500/20 rounded-r-full"></div>
              {item}
              {/* Pointer field indicator */}
              <div className="absolute right-0 w-4 h-full border-l border-white/5 bg-white/5 rounded-r-2xl"></div>
            </motion.div>

            {/* 3. THE CONNECTOR (Next Pointer) */}
            {!isTail ? (
              <div className="flex items-center px-1">
                <div className="w-10 h-[2px] bg-gradient-to-r from-pink-500/40 via-pink-500/20 to-gray-800 rounded-full"></div>
                <div className="w-2 h-2 rounded-full bg-gray-800 border border-pink-500/40 -ml-1"></div>
              </div>
            ) : (
              <div className="flex items-center px-1">
                <div className="w-8 h-[2px] bg-gradient-to-r from-pink-500/40 to-transparent opacity-50"></div>
              </div>
            )}
          </div>
        );
      })}

      {/* 4. TERMINATOR (NULL) */}
      {structure.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center ml-2 shrink-0"
        >
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-800 flex items-center justify-center bg-gray-900/20 shadow-inner">
            <span className="text-[9px] font-black text-gray-700 tracking-widest uppercase">
              Null
            </span>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {structure.length === 0 && (
        <div className="w-full text-center text-gray-700 font-black italic tracking-[0.3em] uppercase opacity-40">
          Empty Chain
        </div>
      )}
    </div>
  );

  const parseInput = (input) => {
    return input
      .trim()
      .split(/\s+/) // split by spaces
      .map((item) => {
        // convert to number if possible, else keep as string
        return isNaN(item) ? item : Number(item);
      });
  };

  useEffect(() => {
    const visited =
      JSON.parse(localStorage.getItem(`visitedSteps_${userId}`)) || {};

    if (!visited[type]) visited[type] = [];

    visited[type][2] = true; // Visualization

    localStorage.setItem(`visitedSteps_${userId}`, JSON.stringify(visited));
  }, [type]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12 font-sans relative overflow-hidden">
      <Navbar user={user} />
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-12 mt-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-gray-600">
          {type} <span className="text-purple-500">Visualizer</span>
        </h2>
        <div className="h-1 w-24 bg-purple-600 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* LEFT PANEL: OPERATIONS CONSOLE */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-gray-900/50 border border-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl sticky top-24">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                Control Terminal
              </h3>
            </div>

            {/* Dropdown Selector */}
            <div className="relative mb-6">
              <label className="text-[10px] font-bold text-purple-400 uppercase tracking-widest ml-2 mb-2 block">
                Method
              </label>
              <button
                onClick={() => setOpen(!open)}
                className="w-full p-4 bg-black/40 border border-white/10 text-gray-200 rounded-2xl flex justify-between items-center hover:border-purple-500/50 transition-all font-bold text-sm shadow-inner"
              >
                {selectedOp || "Select Operation"}
                <img
                  width={20}
                  src="/dropdown.png"
                  alt=""
                  className={`transition-transform duration-300 ${open ? "rotate-180" : ""} opacity-50`}
                />
              </button>

              {open && (
                <div className="absolute w-full bg-gray-900 border border-white/10 mt-3 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-2xl">
                  {operations.map((op, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedOp(op);
                        setOpen(false);
                      }}
                      className="p-4 text-sm font-medium hover:bg-purple-600 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-0"
                    >
                      {op}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Value Input Logic - EXACT SAME CONDITIONALS */}
            {selectedOp !== "Pop" &&
              selectedOp !== "Dequeue" &&
              selectedOp !== "Delete" &&
              selectedOp !== "Delete Head" &&
              selectedOp !== "Delete Tail" &&
              selectedOp !== "Traverse" &&
              selectedOp !== "Top" &&
              selectedOp !== "Bubble Sort" && (
                <div className="mb-6 animate-fadeIn">
                  <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-2 mb-2 block">
                    Data Input
                  </label>
                  <input
                    type="text"
                    placeholder="Value..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full p-4 text-white bg-black/40 border border-white/10 rounded-2xl outline-none focus:border-blue-500/50 transition-all font-mono"
                  />
                </div>
              )}

            <div className="relative mb-6">
              <label className="text-[10px] font-bold text-purple-400 uppercase tracking-widest ml-2 mb-2 block">
                Visualization Speed
              </label>
              <button
                onClick={() => setSpeedOpen(!speedOpen)}
                className="w-full p-4 bg-black/40 border border-white/10 text-gray-200 rounded-2xl flex justify-between items-center hover:border-purple-500/50 transition-all font-bold text-sm shadow-inner"
              >
                {/* Display label based on numeric speed value */}
                {speed === 200
                  ? "Fast"
                  : speed === 500
                    ? "Medium"
                    : speed === 1500
                      ? "Slow"
                      : "Default (Auto)"}
                <img
                  width={20}
                  src="/dropdown.png"
                  alt=""
                  className={`transition-transform duration-300 ${speedOpen ? "rotate-180" : ""} opacity-50`}
                />
              </button>

              {speedOpen && (
                <div className="absolute w-full bg-gray-900/90 border border-white/10 mt-3 rounded-2xl shadow-2xl z-50 max-h-48 overflow-y-auto backdrop-blur-2xl">
                  {[
                    { label: "Default (Auto)", value: null },
                    { label: "Fast", value: 200 },
                    { label: "Medium", value: 500 },
                    { label: "Slow", value: 1000 },
                  ].map((opt, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSpeed(opt.value);
                        setSpeedOpen(false);
                      }}
                      className="p-4 text-sm font-medium text-gray-300 hover:bg-purple-600 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-0"
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleSimulate}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 p-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-900/20 active:scale-95 transition-all"
              >
                Execute Simulation ▶
              </button>

              <button
                disabled={!selectedOp}
                onClick={() => setMode(mode === "visual" ? "code" : "visual")}
                className="w-full bg-white/5 border border-white/10 hover:bg-white/10 p-4 rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-30 transition-all flex items-center justify-center gap-2"
              >
                {mode === "visual"
                  ? "View Implementation 💻"
                  : "Back to Lab 🔙"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: DISPLAY AREA */}
        <div className="flex-1 min-h-[500px] bg-gray-900/40 border border-white/5 backdrop-blur-sm rounded-[2.5rem] p-8 flex flex-col relative shadow-inner overflow-hidden">
          {/* Dynamic Status Bar */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center pointer-events-none z-20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
            </div>
            <span className="text-[10px] font-black text-gray-600 tracking-[0.3em] uppercase">
              Output Stream
            </span>
          </div>

          <div className="flex-1 flex flex-col mt-12 overflow-hidden">
            {mode === "visual" ? (
              <div className="w-full h-full flex flex-col">
                {/* ALERT & INFO MESSAGES */}
                <div className="h-16 flex items-center justify-center mb-8 shrink-0">
                  {type === "stack" && selectedOp === "Top" && (
                    <div className="px-6 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 font-bold animate-bounce">
                      {structure.length > 0
                        ? `Top: ${structure[topIndex]}`
                        : "Empty Stack"}
                    </div>
                  )}

                  {searchResult !== null && (
                    <div
                      className={`px-6 py-2 rounded-full font-bold border animate-pulse ${
                        searchResult === -1
                          ? "bg-red-500/10 border-red-500/30 text-red-400"
                          : "bg-green-500/10 border-green-500/30 text-green-400"
                      }`}
                    >
                      {searchResult === -1
                        ? "Search: Not Found ❌"
                        : `Found at Index: ${searchResult} ✅`}
                    </div>
                  )}

                  {infoMessage && (
                    <div className="px-6 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 font-bold tracking-tight">
                      {infoMessage}
                    </div>
                  )}
                </div>

                {/* FIXED SCROLL AREA: Changed items-end to items-center and justify-center to justify-start */}
                <div className="flex-1 overflow-x-auto pb-10 flex items-center scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent px-4">
                  <div className="flex gap-6 items-end min-h-[250px] mx-auto min-w-max">
                    {type === "array" && renderArray()}
                    {type === "stack" && renderStack()}
                    {type === "queue" && renderQueue()}
                    {type === "linkedlist" && renderLinkedList()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col overflow-hidden">
                {/* Language Selector */}
                <div className="flex gap-2 mb-6 self-center bg-black/40 p-1.5 rounded-2xl border border-white/5 shrink-0">
                  {["js", "cpp", "Java", "Python"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        language === lang
                          ? "bg-purple-600 text-white shadow-lg"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                {/* Code Block */}
                <div className="relative group flex-1 overflow-hidden">
                  <pre className="h-full bg-black/60 text-green-400 p-8 rounded-2xl overflow-auto text-sm font-mono border border-white/10 leading-relaxed">
                    {code}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
