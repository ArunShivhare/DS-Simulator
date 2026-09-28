import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { codeSnippets } from "../data/codeSnippets";
import { visualizationSteps } from "../data/visualizationSteps";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Code2,
  Gauge,
  Layers3,
  Activity,
  RotateCcw,
  Terminal,
} from "lucide-react";
import { auth } from "../firebase";
import Navbar from "../components/Navbar";

const operationsMap = {
  array: [
    "Insert",
    "Delete",
    "Linear Search",
    "Binary Search",
    "Bubble Sort",
    "Quick Sort",
  ],
  stack: ["Push", "Pop", "Top"],
  queue: ["Enqueue", "Dequeue"],
  linkedlist: [
    "Insert Head",
    "Insert Tail",
    "Insert at Position",
    "Delete Head",
    "Delete Tail",
    "Delete at Position",
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
  const [position, setPosition] = useState("");
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
  const [activeRange, setActiveRange] = useState(null);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [recursionDepth, setRecursionDepth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [history, setHistory] = useState([]);

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

      case "qs-compare":
        setHighlightIndex([step.current, step.pivot]);
        setInfoMessage(`Comparing with pivot`);
        break;

      case "qs-swap":
        setInfoMessage(`Swapping elements`);

        setStructure((prev) => {
          const newArr = [...prev];
          const [i, j] = step.indices;

          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];

          return newArr;
        });
        break;

      case "qs-partition-done":
        setInfoMessage(`Pivot placed correctly`);
        break;

      case "qs-range":
        setActiveRange({
          low: step.low,
          high: step.high,
        });

        setRecursionDepth(step.depth);

        setInfoMessage(
          `Level ${step.depth}: Dividing (${step.low} → ${step.high})`,
        );
        break;

      case "qs-pivot":
        setPivotIndex(step.index);
        setInfoMessage(`Pivot selected`);
        break;

      case "qs-split":
        setInfoMessage(`Split into left and right partitions`);
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

      case "ll-insert-middle":
        setStructure((prev) => {
          const newArr = [...prev];

          newArr.splice(step.position, 0, step.value);

          setLlHighlightIndex(step.position);

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

      case "ll-delete-position":
        setStructure((prev) => {
          const newArr = [...prev];

          newArr.splice(step.position, 1);

          return newArr;
        });

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
    if (!isPaused && currentStep < steps.length) {
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
        } else if (type === "array" && selectedOp === "Quick Sort") {
          delay = 1500;
        }
      }

      const timer = setTimeout(() => {
        executeStep(steps[currentStep]);
        setCurrentStep((prev) => {
          if (prev >= steps.length) return prev;
          return prev + 1;
        });
        setHistory((prev) => [
          ...prev,
          {
            structure: [...structure],
            currentStep,

            highlightIndex,
            topIndex,
            frontIndex,
            rearIndex,

            low,
            high,
            mid,

            searchResult,

            sortedIndices: [...sortedIndices],

            pivotIndex,
            activeRange,
            recursionDepth,

            llHighlightIndex,
            tempIndex,
            infoMessage,
          },
        ]);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [
    currentStep,
    steps,
    type,
    selectedOp,
    isPaused,

    structure,
    highlightIndex,
    topIndex,
    frontIndex,
    rearIndex,

    low,
    high,
    mid,

    searchResult,

    sortedIndices,

    pivotIndex,
    activeRange,
    recursionDepth,

    llHighlightIndex,
    tempIndex,
    infoMessage,
  ]);

  useEffect(() => {
    if (selectedOp === "Bubble Sort" || selectedOp === "Quick Sort") {
      setValue("");
    }
  }, [selectedOp]);

  const handlePrevious = () => {
    if (history.length === 0) return;

    setIsPaused(true);

    const last = history[history.length - 1];

    setStructure(last.structure);
    setCurrentStep(last.currentStep);

    setHighlightIndex(last.highlightIndex);
    setTopIndex(last.topIndex);
    setFrontIndex(last.frontIndex);
    setRearIndex(last.rearIndex);

    setLow(last.low);
    setHigh(last.high);
    setMid(last.mid);

    setSearchResult(last.searchResult);

    setSortedIndices(last.sortedIndices || []);

    setPivotIndex(last.pivotIndex);
    setActiveRange(last.activeRange);
    setRecursionDepth(last.recursionDepth);

    setLlHighlightIndex(last.llHighlightIndex);
    setTempIndex(last.tempIndex);

    setInfoMessage(last.infoMessage || "");

    setHistory((prev) => prev.slice(0, -1));
  };

  const handleNext = () => {
    if (currentStep >= steps.length) return;

    setIsPaused(true);

    setHistory((prev) => [
      ...prev,
      {
        structure: [...structure],
        currentStep,

        highlightIndex,
        topIndex,
        frontIndex,
        rearIndex,

        low,
        high,
        mid,

        searchResult,

        sortedIndices: [...sortedIndices],

        pivotIndex,
        activeRange,
        recursionDepth,

        llHighlightIndex,
        tempIndex,
        infoMessage,
      },
    ]);

    executeStep(steps[currentStep]);

    setCurrentStep((prev) => prev + 1);
  };

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
          setHistory([]);
          setIsPaused(false);
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

      // INSERT AT POSITION
      if (type === "linkedlist" && selectedOp === "Insert at Position") {
        generatedSteps =
          visualizationSteps[type]?.[selectedOp]?.(
            structure,
            parsedValues[0],
            Number(position),
          ) || [];
      } else if (type === "linkedlist" && selectedOp === "Delete at Position") {
        generatedSteps =
          visualizationSteps[type]?.[selectedOp]?.(
            structure,
            Number(position),
          ) || [];
      } else if (parsedValues.length > 1) {
        let tempStructure = [...structure];

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

        // ADD THIS (IMPORTANT)
        setSearchResult(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, steps]);

  const renderStack = () => (
  <div className="w-full min-h-[450px] flex flex-col items-center justify-end py-12 px-4">

    {/* STACK CONTAINER */}
    <div
      className="
        relative
        flex flex-col-reverse
        items-center
        gap-3

        w-[420px]
        max-w-full
        max-h-[400px]

        overflow-y-auto
        overflow-x-hidden
        scrollbar-hide

        px-6
        pt-8
        pb-10

        rounded-b-3xl

        bg-slate-50
        border-x-2
        border-b-2
        border-slate-200

        shadow-sm
      "
    >

      {structure.map((item, index) => (
        <div
          key={index}
          className="
            relative
            grid
            grid-cols-[80px_112px_80px]
            items-center
            gap-3
            h-14
            shrink-0
          "
        >

          {/* LEFT — TOP POINTER */}
          <div className="flex justify-end items-center">
            {index === topIndex && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <span
                  className="
                    bg-amber-50
                    border border-amber-200
                    text-amber-600

                    text-[9px]
                    font-bold
                    uppercase
                    tracking-wider

                    px-2.5
                    py-1

                    rounded-md
                    shadow-sm
                  "
                >
                  TOP
                </span>

                <div className="w-3 h-px bg-amber-300" />
              </motion.div>
            )}
          </div>


          {/* CENTER — DATA BLOCK */}
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
              y: -15,
            }}
            animate={{
              scale: index === topIndex ? 1.05 : 1,
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
              type: "spring",
              stiffness: 200,
            }}
            className={`
              w-28
              h-12

              flex
              items-center
              justify-center

              rounded-xl

              text-lg
              font-bold

              border

              transition-all
              duration-300

              z-10

              ${
                index === topIndex
                  ? `
                    bg-amber-50
                    border-amber-300
                    text-amber-700
                    shadow-md
                    shadow-amber-100
                  `
                  : `
                    bg-white
                    border-slate-200
                    text-slate-700
                    shadow-sm
                  `
              }
            `}
          >
            {item}
          </motion.div>


          {/* RIGHT — INDEX */}
          <div className="flex items-center justify-start">
            <div className="w-3 h-px bg-slate-200 mr-2" />

            <span
              className="
                text-[9px]
                font-mono
                font-semibold
                text-slate-400
                whitespace-nowrap
              "
            >
              IDX {index}
            </span>
          </div>

        </div>
      ))}


      {/* EMPTY STACK */}
      {structure.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            flex
            flex-col
            items-center
            py-16
          "
        >
          <div
            className="
              text-3xl
              font-black
              tracking-tight
              text-slate-300
            "
          >
            EMPTY
          </div>

          <p
            className="
              mt-2
              text-[10px]
              font-bold
              uppercase
              tracking-widest
              text-slate-400
            "
          >
            Stack Pointer = -1
          </p>
        </motion.div>
      )}

    </div>


    {/* STACK BASE */}
    <div
      className="
        w-56
        h-2
        bg-slate-200
        rounded-full
        mt-4
      "
    />

  </div>
);

  const renderQueue = () => (
  <div
    className="
      w-full
      min-h-[400px]
      flex
      flex-col
      items-center
      justify-center
      py-16
      px-4
    "
  >

    {/* QUEUE STAGE */}
    <div
      className="
        relative
        flex
        items-center
        gap-5
        w-full
        max-w-4xl
        min-h-[220px]
        px-16
        sm:px-24
        py-20
        overflow-x-auto
        overflow-y-visible
        scrollbar-hide
        rounded-3xl
        bg-slate-50
        border-y
        border-slate-200
        shadow-sm
      "
    >

      {/* INLET */}
      <div
        className="
          absolute
          left-4
          sm:left-8
          top-1/2
          -translate-y-1/2
          text-[9px]
          font-bold
          text-emerald-400
          tracking-[0.3em]
          uppercase
          rotate-90
          pointer-events-none
        "
      >
        INLET
      </div>

      {/* OUTLET */}
      <div
        className="
          absolute
          right-4
          sm:right-8
          top-1/2
          -translate-y-1/2
          text-[9px]
          font-bold
          text-amber-400
          tracking-[0.3em]
          uppercase
          -rotate-90
          pointer-events-none
        "
      >
        OUTLET
      </div>

      {structure.map((item, index) => {
        const isFront = index === frontIndex;
        const isRear = index === rearIndex;

        return (
          <div
            key={index}
            className="
              relative
              flex
              flex-col
              items-center
              shrink-0
              group
            "
          >

            {/* FRONT POINTER */}
            <div
              className="
                absolute
                bottom-full
                left-1/2
                -translate-x-1/2
                mb-2
                h-14
                flex
                flex-col
                items-center
                justify-end
                z-20
              "
            >
              {isFront && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <span
                    className="
                      bg-emerald-50
                      border border-emerald-200
                      text-emerald-600
                      text-[9px]
                      font-bold
                      tracking-wider
                      px-2.5
                      py-1
                      rounded-md
                      shadow-sm
                    "
                  >
                    FRONT
                  </span>

                  <div className="w-px h-3 bg-emerald-300 mt-1" />
                </motion.div>
              )}
            </div>

            {/* DATA NODE */}
            <motion.div
              initial={{ scale: 0, x: 30 }}
              animate={{
                scale: isFront || isRear ? 1.06 : 1,
                x: 0,
              }}
              transition={{
                duration: 0.35,
                type: "spring",
                stiffness: 150,
              }}
              className={`
                w-16
                h-16
                flex
                items-center
                justify-center
                rounded-xl
                text-lg
                font-bold
                border
                transition-all
                duration-300
                z-10

                ${
                  isFront
                    ? `
                      bg-emerald-50
                      border-emerald-300
                      text-emerald-700
                      shadow-md
                      shadow-emerald-100
                    `
                    : isRear
                      ? `
                        bg-amber-50
                        border-amber-300
                        text-amber-700
                        shadow-md
                        shadow-amber-100
                      `
                      : `
                        bg-white
                        border-slate-200
                        text-slate-700
                        shadow-sm
                        group-hover:border-indigo-200
                      `
                }
              `}
            >
              {item}
            </motion.div>

            {/* REAR POINTER */}
            <div
              className="
                absolute
                top-full
                left-1/2
                -translate-x-1/2
                mt-2
                h-14
                flex
                flex-col
                items-center
                justify-start
                z-20
              "
            >
              {isRear && (
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-px h-3 bg-amber-300" />

                  <span
                    className="
                      bg-amber-50
                      border border-amber-200
                      text-amber-600
                      text-[9px]
                      font-bold
                      tracking-wider
                      px-2.5
                      py-1
                      rounded-md
                      shadow-sm
                      mt-1
                    "
                  >
                    REAR
                  </span>
                </motion.div>
              )}
            </div>

            {/* INDEX */}
            <div
              className="
                absolute
                top-full
                mt-16
                opacity-60
                group-hover:opacity-100
                transition-opacity
              "
            >
              <span
                className="
                  text-[9px]
                  font-mono
                  font-semibold
                  text-slate-400
                "
              >
                [{index}]
              </span>
            </div>

          </div>
        );
      })}

      {/* EMPTY QUEUE */}
      {structure.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            w-full
            flex
            flex-col
            items-center
            py-10
          "
        >
          <div
            className="
              text-3xl
              font-black
              tracking-tight
              text-slate-300
            "
          >
            QUEUE EMPTY
          </div>

          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.25em]
              mt-2
              text-slate-400
            "
          >
            Waiting for first element...
          </p>
        </motion.div>
      )}

    </div>

    {/* FOOTER LINE */}
    <div
      className="
        w-1/2
        max-w-md
        h-px
        bg-slate-200
        mt-10
      "
    />

  </div>
);

  const renderArray = () => (
  <div className="w-full overflow-x-auto overflow-y-visible px-4 sm:px-8 py-6">
    <div className="flex gap-5 sm:gap-6 items-end px-6 sm:px-10 pt-20 pb-6 min-w-max">

      {structure.map((item, index) => {
        const isMid = mid === index;

        const isHighlit =
          highlightIndex === index ||
          (Array.isArray(highlightIndex) &&
            highlightIndex.includes(index));

        const isLow = low === index;
        const isHigh = high === index;

        const isSorted = sortedIndices.includes(index);

        const isComparing =
          Array.isArray(highlightIndex) &&
          highlightIndex.includes(index);

        const inActiveRange =
          activeRange &&
          index >= activeRange.low &&
          index <= activeRange.high;

        const isPivot = pivotIndex === index;

        return (
          <div
            key={index}
            className="relative flex flex-col items-center shrink-0 group"
          >

            {/* TOP POINTERS */}
            <div
              className="
                absolute
                top-[-56px]
                left-1/2
                -translate-x-1/2
                flex flex-col
                items-center
                justify-end
                gap-1
                min-h-[48px]
                w-20
                z-10
              "
            >
              {isLow && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                    bg-emerald-50
                    border border-emerald-200
                    text-emerald-600
                    text-[9px]
                    font-bold
                    px-2.5
                    py-1
                    rounded-md
                    shadow-sm
                  "
                >
                  LOW
                </motion.span>
              )}

              {isMid && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                    bg-amber-50
                    border border-amber-200
                    text-amber-600
                    text-[9px]
                    font-bold
                    px-2.5
                    py-1
                    rounded-md
                    shadow-sm
                  "
                >
                  MID
                </motion.span>
              )}

              {isHigh && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                    bg-rose-50
                    border border-rose-200
                    text-rose-600
                    text-[9px]
                    font-bold
                    px-2.5
                    py-1
                    rounded-md
                    shadow-sm
                  "
                >
                  HIGH
                </motion.span>
              )}

              {isHighlit && !isMid && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                    text-indigo-500
                    text-lg
                    leading-none
                  "
                >
                  ↓
                </motion.div>
              )}
            </div>

            {/* ARRAY BOX */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{
                scale: isMid || isHighlit ? 1.06 : 1,
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.35 }}
              className={`
                w-16 h-16
                sm:w-[68px] sm:h-[68px]
                flex items-center justify-center
                rounded-xl
                text-lg
                font-bold
                transition-all duration-300
                border

                ${
                  isSorted
                    ? `
                      bg-emerald-50
                      border-emerald-300
                      text-emerald-700
                      shadow-sm
                    `
                    : isComparing || isMid || isHighlit
                      ? `
                        bg-indigo-600
                        border-indigo-500
                        text-white
                        shadow-md
                        shadow-indigo-100
                      `
                      : isPivot
                        ? `
                          bg-rose-50
                          border-rose-300
                          text-rose-600
                          shadow-sm
                        `
                        : inActiveRange
                          ? `
                            bg-indigo-50
                            border-indigo-200
                            text-indigo-700
                          `
                          : `
                            bg-white
                            border-slate-200
                            text-slate-700
                            shadow-sm
                            hover:border-indigo-300
                            hover:shadow-md
                          `
                }
              `}
            >
              {item}
            </motion.div>

            {/* INDEX LABEL */}
            <div
              className="
                mt-4
                flex flex-col
                items-center
                opacity-70
                group-hover:opacity-100
                transition-opacity
              "
            >
              <div className="h-2 w-px bg-slate-300 mb-1" />

              <span
                className="
                  text-[9px]
                  font-mono
                  font-semibold
                  text-slate-400
                  tracking-tight
                "
              >
                IDX {index}
              </span>
            </div>

          </div>
        );
      })}
    </div>
  </div>
);

  const renderLinkedList = () => (
  <div
    className="
      w-full
      min-h-[420px]
      flex
      items-center
      overflow-x-auto
      overflow-y-visible
      scrollbar-hide
      px-10
      sm:px-16
      py-28
    "
  >

    <div className="flex items-center min-w-max">

      {structure.map((item, index) => {
        const isHead = index === 0;
        const isTail = index === structure.length - 1;
        const isTemp = tempIndex === index;
        const isHighlight = llHighlightIndex === index;

        return (
          <div
            key={index}
            className="
              relative
              flex
              items-center
              shrink-0
            "
          >

            {/* POINTER TRACKS */}
            <div
              className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                pointer-events-none
                z-20
              "
            >

              {/* HEAD / TEMP */}
              <div
                className="
                  absolute
                  bottom-full
                  left-1/2
                  -translate-x-1/2
                  mb-2
                  min-h-[64px]
                  flex
                  flex-col
                  items-center
                  justify-end
                "
              >
                {isHead && (
                  <span
                    className="
                      bg-indigo-50
                      border border-indigo-200
                      text-indigo-600
                      text-[9px]
                      font-bold
                      px-2.5
                      py-1
                      rounded-md
                      uppercase
                      tracking-wider
                    "
                  >
                    HEAD
                  </span>
                )}

                {isTemp && (
                  <motion.span
                    animate={{
                      y: [0, -3, 0],
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                    }}
                    className="
                      bg-amber-50
                      border border-amber-200
                      text-amber-600
                      text-[9px]
                      font-bold
                      px-2.5
                      py-1
                      rounded-md
                      uppercase
                      tracking-wider
                      mt-1
                    "
                  >
                    TEMP
                  </motion.span>
                )}

                {(isHead || isTemp) && (
                  <div className="w-px h-4 bg-slate-300 mt-1" />
                )}
              </div>

              {/* TAIL + INDEX */}
              <div
                className="
                  absolute
                  top-full
                  left-1/2
                  -translate-x-1/2
                  mt-2
                  min-h-[64px]
                  flex
                  flex-col
                  items-center
                "
              >
                {isTail && (
                  <>
                    <div className="w-px h-4 bg-slate-300" />

                    <span
                      className="
                        bg-rose-50
                        border border-rose-200
                        text-rose-600
                        text-[9px]
                        font-bold
                        px-2.5
                        py-1
                        rounded-md
                        uppercase
                        tracking-wider
                        mt-1
                      "
                    >
                      TAIL
                    </span>
                  </>
                )}

                <span
                  className="
                    mt-2
                    text-[8px]
                    font-mono
                    font-semibold
                    text-slate-400
                  "
                >
                  [{index}]
                </span>
              </div>

            </div>

            {/* NODE */}
            <motion.div
              initial={{ scale: 0, x: -25 }}
              animate={{
                scale: isHighlight ? 1.06 : 1,
                x: 0,
              }}
              transition={{
                duration: 0.35,
                type: "spring",
              }}
              className={`
                relative
                w-20
                h-16
                flex
                items-center
                justify-center
                rounded-xl
                text-lg
                font-bold
                border
                transition-all
                duration-300
                z-10

                ${
                  isHighlight
                    ? `
                      bg-indigo-600
                      border-indigo-500
                      text-white
                      shadow-lg
                      shadow-indigo-100
                    `
                    : `
                      bg-white
                      border-slate-200
                      text-slate-700
                      shadow-sm
                      hover:border-indigo-200
                      hover:shadow-md
                    `
                }
              `}
            >

              {/* DATA AREA */}
              <div
                className={`
                  absolute
                  left-0
                  w-1.5
                  h-8
                  rounded-r-full
                  ${
                    isHighlight
                      ? "bg-indigo-300"
                      : "bg-indigo-100"
                  }
                `}
              />

              {item}

              {/* NEXT POINTER AREA */}
              <div
                className={`
                  absolute
                  right-0
                  w-4
                  h-full
                  border-l
                  rounded-r-xl
                  ${
                    isHighlight
                      ? "border-indigo-400 bg-indigo-500/20"
                      : "border-slate-100 bg-slate-50"
                  }
                `}
              />

            </motion.div>

            {/* CONNECTOR */}
            {!isTail ? (
              <div className="flex items-center px-1">

                <div
                  className="
                    w-10
                    sm:w-14
                    h-px
                    bg-indigo-200
                  "
                />

                <div
                  className="
                    w-2.5
                    h-2.5
                    rounded-full
                    bg-white
                    border-2
                    border-indigo-300
                    -ml-1
                  "
                />

              </div>
            ) : (
              <div className="flex items-center px-1">

                <div
                  className="
                    w-8
                    h-px
                    bg-gradient-to-r
                    from-indigo-200
                    to-transparent
                  "
                />

              </div>
            )}

          </div>
        );
      })}

      {/* NULL TERMINATOR */}
      {structure.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="
            flex
            flex-col
            items-center
            ml-2
            shrink-0
          "
        >
          <div
            className="
              w-12
              h-12
              rounded-full
              border-2
              border-dashed
              border-slate-300
              flex
              items-center
              justify-center
              bg-slate-50
            "
          >
            <span
              className="
                text-[9px]
                font-bold
                text-slate-400
                tracking-widest
                uppercase
              "
            >
              NULL
            </span>
          </div>
        </motion.div>
      )}

      {/* EMPTY STATE */}
      {structure.length === 0 && (
        <div
          className="
            w-full
            text-center
            text-slate-300
            font-black
            italic
            tracking-[0.25em]
            uppercase
          "
        >
          Empty Chain
        </div>
      )}

    </div>
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
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 sm:px-6 py-8 font-sans relative overflow-hidden">
      {" "}
      <Navbar user={user} />
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto mb-8 mt-20"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <Layers3 size={14} className="text-indigo-600" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                Interactive Laboratory
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950">
              {type.charAt(0).toUpperCase() + type.slice(1)}
              <span className="text-indigo-600"> Visualizer</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Explore how each operation changes the structure, one step at a
              time.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Simulation Ready
          </div>
        </div>
      </motion.div>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-5 lg:gap-6">
        {" "}
        {/* LEFT PANEL: OPERATIONS CONSOLE */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-2xl shadow-sm sticky top-24">
            {" "}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <Activity size={15} className="text-indigo-600" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Simulation Controls
                  </h3>

                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Configure your operation
                  </p>
                </div>
              </div>

              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            {/* Dropdown Selector */}
            <div className="relative mb-6">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.14em] ml-1 mb-2 block">
                Operation
              </label>
              <button
                onClick={() => setOpen(!open)}
                className="
  w-full px-4 py-3.5
  bg-slate-50 border border-slate-200
  text-slate-700 rounded-xl
  flex justify-between items-center
  hover:border-indigo-300 hover:bg-indigo-50/30
  transition-all font-semibold text-sm
"
              >
                {selectedOp || "Select Operation"}
                <ChevronDown
                  size={17}
                  className={`text-slate-400 transition-transform duration-300 ${
                    open ? "rotate-180 text-indigo-500" : ""
                  }`}
                />
              </button>

              {open && (
                <div className="absolute w-full bg-white border border-slate-200 mt-2 rounded-xl shadow-xl z-50 overflow-hidden">
                  {" "}
                  {operations.map((op, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedOp(op);
                        setOpen(false);
                      }}
                      className="
  px-4 py-3
  text-sm font-medium text-slate-600
  hover:bg-indigo-50 hover:text-indigo-600
  cursor-pointer transition-colors
  border-b border-slate-100 last:border-0
"
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
              selectedOp !== "Delete at Position" &&
              selectedOp !== "Traverse" &&
              selectedOp !== "Top" &&
              selectedOp !== "Bubble Sort" &&
              selectedOp !== "Quick Sort" && (
                <div className="mb-6 animate-fadeIn">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2 mb-2 block">
                    Data Input
                  </label>
                  <input
                    type="text"
                    placeholder="Value..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="
  w-full px-4 py-3.5
  text-slate-700 bg-slate-50
  border border-slate-200 rounded-xl
  outline-none
  focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50
  transition-all font-mono text-sm
"
                  />
                </div>
              )}
            {(selectedOp === "Insert at Position" ||
              selectedOp === "Delete at Position") && (
              <div className="mb-6 animate-fadeIn">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2 mb-2 block">
                  Node Position
                </label>

                <input
                  type="number"
                  placeholder="Node Position..."
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full p-4 text-white bg-black/40 border border-white/10 rounded-2xl outline-none focus:border-pink-500/50 transition-all font-mono"
                />
              </div>
            )}
            <div className="relative mb-6">
              <label className="text-[10px] font-bold text-purple-400 uppercase tracking-widest ml-2 mb-2 block">
                Visualization Speed
              </label>
              <button
                onClick={() => setSpeedOpen(!speedOpen)}
                className="
  w-full px-4 py-3.5
  bg-slate-50 border border-slate-200
  text-slate-700 rounded-xl
  flex justify-between items-center
  hover:border-indigo-300
  transition-all font-semibold text-sm
"
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
                <div className="absolute w-full bg-gray-400/90 border border-white/10 mt-3 rounded-2xl shadow-2xl z-50 max-h-48 overflow-y-auto backdrop-blur-2xl">
                  {[
                    { label: "Default (Auto)", value: null },
                    { label: "Fast", value: 200 },
                    { label: "Medium", value: 500 },
                    { label: "Slow", value: 1500 },
                  ].map((opt, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSpeed(opt.value);
                        setSpeedOpen(false);
                      }}
                      className="
  px-4 py-3
  text-sm font-medium text-white
  hover:bg-indigo-50 hover:text-indigo-600
  cursor-pointer transition-colors
  border-b border-slate-100 last:border-0
"
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
className="
  group w-full
  bg-indigo-600 hover:bg-indigo-700
  p-4 rounded-xl
  font-bold text-sm text-white
  shadow-sm shadow-indigo-200
  active:scale-[0.98]
  transition-all
  flex items-center justify-center gap-2
"              >
<Play
  size={16}
  fill="currentColor"
  className="transition-transform group-hover:translate-x-0.5"
/>
<span>Execute Simulation</span>              </button>
              <div className="grid grid-cols-3 gap-2.5 w-full mt-4">
                {/* Prev Button */}
                <button
                  onClick={handlePrevious}
className="
  flex items-center justify-center gap-1.5
  py-2.5 px-2
  bg-white
  hover:bg-slate-50
  border border-slate-200
  hover:border-indigo-200
  rounded-lg
  text-[10px] font-bold
  uppercase tracking-wider
  text-slate-500
  hover:text-indigo-600
  transition-all duration-200
  cursor-pointer
  group
"                >
                  <svg
                    className="w-3.5 h-3.5 text-[#38bdf8] group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
                  </svg>
                  <span>Prev</span>
                </button>

                {/* Pause / Resume Button */}
                <button
                  onClick={() => setIsPaused(!isPaused)}
className="
  flex items-center justify-center gap-1.5
  py-2.5 px-2
  bg-white
  hover:bg-slate-50
  border border-slate-200
  hover:border-indigo-200
  rounded-lg
  text-[10px] font-bold
  uppercase tracking-wider
  text-slate-500
  hover:text-indigo-600
  transition-all duration-200
  cursor-pointer
  group
"                >
                  {isPaused ? (
                    <>
                      <svg
                        className="w-3.5 h-3.5 text-[#38bdf8] group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Resume</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3.5 h-3.5 text-[#38bdf8] group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                      <span>Pause</span>
                    </>
                  )}
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
className="
  flex items-center justify-center gap-1.5
  py-2.5 px-2
  bg-white
  hover:bg-slate-50
  border border-slate-200
  hover:border-indigo-200
  rounded-lg
  text-[10px] font-bold
  uppercase tracking-wider
  text-slate-500
  hover:text-indigo-600
  transition-all duration-200
  cursor-pointer
  group
"                >
                  <span>Next</span>
                  <svg
                    className="w-3.5 h-3.5 text-[#38bdf8] group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 18l8.5-6L5 6v12zM16 6v12h2V6h-2z" />
                  </svg>
                </button>
              </div>

              <button
                disabled={!selectedOp}
                onClick={() => setMode(mode === "visual" ? "code" : "visual")}
className="
  w-full
  bg-slate-50
  border border-slate-200
  hover:bg-indigo-50
  hover:border-indigo-200
  p-3.5 rounded-xl
  font-bold text-xs
  text-slate-600
  hover:text-indigo-600
  disabled:opacity-30
  transition-all
  flex items-center justify-center gap-2
"              >
                <>
  <Code2 size={15} />

  {mode === "visual"
    ? "View Implementation"
    : "Back to Lab"}
</>
              </button>
            </div>
          </div>
        </div>
        {/* RIGHT PANEL: DISPLAY AREA */}
<div className="
  flex-1 min-h-[560px]
  bg-white
  border border-slate-200
  rounded-2xl
  p-5 sm:p-7
  flex flex-col
  relative
  shadow-sm
  overflow-hidden
">          {/* Dynamic Status Bar */}
          <div className="
  absolute top-0 left-0 w-full
  px-5 sm:px-7 py-5
  flex justify-between items-center
  pointer-events-none z-20
  border-b border-slate-100
">
  <div className="flex items-center gap-2">
    <div className="h-2 w-2 rounded-full bg-indigo-500" />

    <span className="text-xs font-bold text-slate-700">
      Visualization
    </span>
  </div>

  <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
    <Activity size={12} />
    Live Simulation
  </div>
</div>

          <div className="flex-1 flex flex-col mt-12 overflow-hidden">
            {mode === "visual" ? (
              <div className="w-full h-full flex flex-col">
                {/* ALERT & INFO MESSAGES */}
                <div className="h-16 flex items-center justify-center mb-8 shrink-0">
                  {type === "stack" && selectedOp === "Top" && (
                    <div className="px-6 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-700 font-bold animate-bounce">
                      {structure.length > 0
                        ? `Top: ${structure[topIndex]}`
                        : "Empty Stack"}
                    </div>
                  )}

                  {searchResult !== null && (
                    <div
                      className={`px-6 py-2 rounded-full font-bold border animate-pulse ${
                        searchResult === -1
                          ? "bg-red-50 border border-red-200 text-red-600"
                          : "bg-emerald-50 border border-emerald-200 text-emerald-700"
                      }`}
                    >
                      {searchResult === -1
                        ? "Search: Not Found ❌"
                        : `Found at Index: ${searchResult} ✅`}
                    </div>
                  )}

                  {infoMessage && (
                    <div className="px-6 py-2 bg-sky-50 border border-sky-200 text-sky-700 rounded-full text-blue-400 font-bold tracking-tight">
                      {infoMessage}
                    </div>
                  )}
                </div>

                {/* FIXED SCROLL AREA: Changed items-end to items-center and justify-center to justify-start */}
                <div className="flex-1 overflow-x-auto pb-10 flex items-center scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent px-4">
                  <div className="flex gap-6 items-end min-h-[250px] mx-auto min-w-max">
                    {selectedOp === "Quick Sort" && (
                      <div className="mb-4 text-center">
                        <div className="text-purple-400 font-bold">
                          Recursion Level: {recursionDepth}
                        </div>

                        <div className="text-red-400 font-bold">
                          Pivot Index: {pivotIndex ?? "-"}
                        </div>
                      </div>
                    )}
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
<div className="
  flex gap-1 mb-6 self-center
  bg-slate-100
  p-1 rounded-xl
  border border-slate-200
  shrink-0
">                  {["js", "cpp", "Java", "Python"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        language === lang
                          ? "bg-white text-indigo-600 shadow-sm"
                          : "text-slate-400 hover:text-slate-700"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                {/* Code Block */}
                <div className="relative group flex-1 overflow-hidden">
<pre className="
  h-full
  bg-slate-950
  text-slate-200
  p-6 sm:p-8
  rounded-xl
  overflow-auto
  text-sm font-mono
  border border-slate-800
  leading-relaxed
">                    {code}
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
