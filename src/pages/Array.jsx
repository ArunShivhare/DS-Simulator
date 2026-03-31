import React from "react";
import { useEffect } from "react";

const ArrayPage = () => {
  const problems = {
    easy: [
      "Find Maximum Element",
      "Reverse an Array",
      "Check if Sorted",
      "Find Missing Number",
      "Remove Duplicates",
      "Linear Search",
      "Count Occurrences",
      "Move Zeros to End",
      "Find Second Largest",
      "Array Sum",
    ],
    medium: [
      "Rotate Array by K",
      "Two Sum (Sorted)",
      "Kadane's Algorithm",
      "Next Permutation",
      "Dutch National Flag",
      "Maximum Subarray Product",
      "Rearrange Pos/Neg",
      "Longest Consecutive Sequence",
      "Subarray Sum Equals K",
      "Merge Sorted Arrays",
    ],
    hard: [
      "Median of Two Sorted Arrays",
      "Rain Water Trapping",
      "Largest Rectangle in Histogram",
      "Reverse Nodes in K-Group",
      "Maximum Path Sum",
      "Count Inversions",
      "Sliding Window Maximum",
      "First Missing Positive",
      "Minimum Window Substring",
      "Burst Balloons",
    ],
  };

  useEffect(() => {
  const visited =
    JSON.parse(localStorage.getItem("visitedSteps")) || {};

  if (!visited["array"]) visited["array"] = [];

  visited["array"][0] = true; // Intro
  visited["array"][1] = true; // Implementation

  localStorage.setItem("visitedSteps", JSON.stringify(visited));
}, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-24 font-sans">
      {/* 1. Header with Multi-Structure Visuals */}
      <div className="max-w-7xl mx-auto text-center mb-24">
        <h1 className="text-7xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-blue-400 to-green-400 leading-tight">
          Arrays & Vectors 📦
        </h1>
        <p className="text-gray-300 text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed mb-16">
          The foundation of linear structures—master how contiguous memory
          powers the entire world of DSA.
        </p>
      </div>

      {/* 2. Array Core Principle & Memory Visual */}
      <div className="max-w-6xl mx-auto mb-24 grid md:grid-cols-2 gap-12 items-center overflow-x-auto">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-400 border-b border-purple-500/20 pb-2 inline-block">
            Contiguous Memory
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            An Array is a collection of elements stored at
            <strong> fixed, side-by-side memory locations</strong>. This allows
            the CPU to calculate the address of any element
            <span className="text-purple-400 font-bold"> instantly</span> using
            its index.
          </p>
          <div className="bg-purple-900/10 border border-purple-500/20 p-6 rounded-2xl my-10">
            <h4 className="text-purple-300 font-bold mb-2 text-lg uppercase tracking-tighter">
              The Index Formula:
            </h4>
            <p className="text-gray-400 text-lg font-mono">
              Address = Base + (Index × Size)
            </p>
            <p className="text-gray-500 text-sm mt-2 italic">
              "This is why arrays have O(1) random access!"
            </p>
          </div>
        </div>

        {/* Dynamic Array Memory Visual */}
        <div className="flex flex-col items-center">
          {/* The Memory Block Container */}
          <div className="relative flex items-center bg-gray-800/30 p-8 rounded-3xl border border-gray-700 shadow-2xl overflow-visible">
            {/* Pointer to Index 0 */}
            <div className="absolute -top-12 left-10 text-purple-400 font-mono font-bold text-lg animate-bounce text-center">
              ↓ Head (Index 0)
            </div>

            <div className="flex gap-2">
              {[10, 20, 30, 40].map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  {/* The Memory Cell */}
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center font-black text-2xl shadow-lg transition-all hover:scale-110 hover:-translate-y-2
                    ${
                      i === 0
                        ? "bg-linear-to-br from-purple-500 to-indigo-600 ring-2 ring-purple-300"
                        : "bg-gray-700 text-gray-300 opacity-80"
                    }`}
                  >
                    {val}
                  </div>
                  {/* The Index Label */}
                  <span className="text-gray-500 font-mono font-bold text-sm">
                    [{i}]
                  </span>
                </div>
              ))}

              {/* Empty Slot for Visualizing Capacity */}
              <div className="flex flex-col items-center gap-3 opacity-30">
                <div className="w-16 h-16 border-2 border-dashed border-gray-500 rounded-xl flex items-center justify-center font-mono text-gray-500">
                  ?
                </div>
                <span className="text-gray-600 font-mono font-bold text-sm">
                  [4]
                </span>
              </div>
            </div>

            {/* Rear Pointer */}
            <div className="absolute -bottom-10 right-24 text-blue-400 font-mono font-bold text-sm">
              Tail / End ↑
            </div>
          </div>

          {/* Physical Address Label */}
          <p className="mt-12 text-gray-500 font-mono font-bold text-lg uppercase tracking-widest bg-gray-800/50 px-6 py-2 rounded-full border border-gray-700">
            Physical RAM Address Space
          </p>
        </div>
      </div>

      {/* 2. Structural Overview: Types of Arrays */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-4xl font-black mb-12 text-center bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-blue-400 uppercase tracking-tighter">
          Structural Varieties
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* 1D Array Card */}
          <div className="bg-gray-800/40 border border-gray-700 p-8 rounded-3xl hover:border-purple-500/50 transition-all group shadow-2xl">
            <div className="mb-6 flex gap-1 justify-center">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-purple-500/20 border border-purple-500/40 rounded-md flex items-center justify-center text-[10px] font-mono"
                >
                  {i * 10}
                </div>
              ))}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-purple-300 group-hover:text-purple-400 transition">
              1D Array
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              A simple{" "}
              <span className="text-gray-200 font-semibold">
                linear sequence
              </span>
              . Elements are accessed via a single index.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-700/50 text-xs font-mono text-purple-500/70">
              Syntax: arr[i]
            </div>
          </div>

          {/* 2D Array Card */}
          <div className="bg-gray-800/40 border border-gray-700 p-8 rounded-3xl hover:border-blue-500/50 transition-all group shadow-2xl">
            <div className="mb-6 grid grid-cols-3 gap-1 w-fit mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-blue-500/20 border border-blue-500/40 rounded-sm"
                ></div>
              ))}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-blue-300 group-hover:text-blue-400 transition">
              2D / Matrix
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              Data organized in{" "}
              <span className="text-gray-200 font-semibold">
                Rows & Columns
              </span>
              . Essential for image processing and coordinate systems.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-700/50 text-xs font-mono text-blue-500/70">
              Syntax: arr[i][j]
            </div>
          </div>

          {/* Dynamic Array Card */}
          <div className="bg-gray-800/40 border border-gray-700 p-8 rounded-3xl hover:border-green-500/50 transition-all group shadow-2xl relative overflow-hidden">
            <div className="mb-6 flex gap-1 justify-center items-center">
              <div className="w-8 h-8 bg-green-500/20 border border-green-500/40 rounded-md"></div>
              <div className="w-8 h-8 bg-green-500/20 border border-green-500/40 rounded-md"></div>
              <div className="w-6 h-6 border border-dashed border-gray-600 rounded-md animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-green-300 group-hover:text-green-400 transition">
              Dynamic Array
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              Resizable containers like{" "}
              <span className="text-gray-200 font-semibold">Vectors</span>. They
              handle memory reallocation automatically as data grows.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-700/50 text-xs font-mono text-green-500/70">
              Syntax: vector.push_back()
            </div>
          </div>
        </div>
      </div>

      {/* 3. Hardware Deep Dive: Cache Locality */}
      <div className="max-w-6xl mx-auto mb-24">
        <div className="bg-blue-900/10 border border-blue-500/30 p-10 rounded-3xl shadow-2xl overflow-hidden relative overflow-x-auto">
          {/* Background Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>

          <h2 className="text-3xl md:text-4xl font-black mb-8 text-blue-300 flex items-center gap-4">
            🚀 Hardware Power: Cache Locality
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-gray-300 space-y-6">
              <p className="text-xl leading-relaxed">
                Unlike Linked Lists, arrays store data in
                <strong className="text-white"> contiguous blocks</strong>. This
                triggers
                <span className="text-blue-400 font-bold underline decoration-blue-500/30 underline-offset-4">
                  {" "}
                  Spatial Locality
                </span>
                .
              </p>

              <ul className="space-y-5 text-lg text-gray-400">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">01.</span>
                  <p>
                    When the CPU fetches{" "}
                    <code className="bg-blue-500/20 px-2 py-0.5 rounded text-blue-200">
                      arr[0]
                    </code>
                    , it automatically grabs the next several elements into the{" "}
                    <strong className="text-gray-200">L1 Cache</strong>.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">02.</span>
                  <p>
                    Accessing{" "}
                    <code className="bg-blue-500/20 px-2 py-0.5 rounded text-blue-200">
                      arr[1]
                    </code>{" "}
                    results in a{" "}
                    <strong className="text-green-400 font-bold italic">
                      Cache Hit
                    </strong>
                    , which takes nanoseconds.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">03.</span>
                  <p>
                    This hardware efficiency is why arrays can be{" "}
                    <strong className="text-white">10x faster</strong> for
                    iteration than pointer-based structures.
                  </p>
                </li>
              </ul>
            </div>

            {/* Enhanced Hardware Visualization */}
            <div className="bg-black/60 p-8 rounded-3xl border border-gray-700 shadow-inner group">
              <div className="text-gray-500 mb-6 text-sm font-mono flex justify-between items-center uppercase tracking-widest">
                <span>// CPU Cache Line</span>
                <span className="text-[10px] bg-blue-500/20 px-2 py-1 rounded">
                  64-Byte Block
                </span>
              </div>

              <div className="flex gap-2 justify-center items-center">
                {[1, 2, 3, 4].map((v) => (
                  <div
                    key={v}
                    className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-2xl font-black shadow-[0_0_15px_rgba(37,99,235,0.4)] border-t border-blue-400 group-hover:scale-110 transition-transform cursor-help"
                    title={`Data Block ${v}`}
                  >
                    {v}
                  </div>
                ))}
                {/* The "Pre-loaded" Block */}
                <div className="w-16 h-16 bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                <p className="text-xs text-blue-300 font-mono leading-relaxed">
                  <span className="text-blue-500 font-bold">SYSTEM_INFO:</span>
                  Memory pre-fetching active. Elements 1-4 loaded into cache in
                  a single cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: The "Family of Linear Structures" Visual Gallery */}
      <div className="max-w-6xl mx-auto text-center mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 my-20">
          {/* Stack Logic Visual */}
          <div className="bg-gray-800/40 border border-purple-500/30 p-6 rounded-3xl backdrop-blur-sm">
            <h4 className="text-purple-400 font-bold mb-4 uppercase tracking-widest text-sm">
              Implemented as Stack
            </h4>
            <div className="flex flex-col-reverse gap-1 w-24 mx-auto border-x-2 border-b-2 border-purple-500/50 p-2 rounded-b-xl">
              <div className="h-6 w-full bg-purple-500 rounded-sm"></div>
              <div className="h-6 w-full bg-purple-500/70 rounded-sm"></div>
              <div className="h-6 w-full bg-purple-500/40 rounded-sm animate-bounce"></div>
            </div>
            <p className="mt-4 text-xs text-gray-500 font-mono italic">
              LIFO: Top Access Only
            </p>
          </div>

          {/* Queue Logic Visual */}
          <div className="bg-gray-800/40 border border-green-500/30 p-6 rounded-3xl backdrop-blur-sm">
            <h4 className="text-green-400 font-bold mb-4 uppercase tracking-widest text-sm">
              Implemented as Queue
            </h4>
            <div className="flex gap-1 w-full max-w-37.5 mx-auto border-y-2 border-green-500/50 p-2">
              <div className="h-8 w-8 bg-green-500/30 rounded-sm"></div>
              <div className="h-8 w-8 bg-green-500/60 rounded-sm"></div>
              <div className="h-8 w-8 bg-green-500 rounded-sm translate-x-2 transition-transform"></div>
            </div>
            <p className="mt-4 text-xs text-gray-500 font-mono italic">
              FIFO: Front & Rear
            </p>
          </div>

          {/* Linked List Logic Visual */}
          <div className="bg-gray-800/40 border border-blue-500/30 p-6 rounded-3xl backdrop-blur-sm">
            <h4 className="text-blue-400 font-bold mb-4 uppercase tracking-widest text-sm">
              Pointer Logic
            </h4>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              <div className="w-6 h-0.5 bg-blue-400"></div>
              <div className="w-8 h-8 bg-blue-500/60 rounded-full"></div>
              <div className="w-6 h-0.5 bg-blue-400/50"></div>
              <div className="w-8 h-8 bg-blue-500/20 rounded-full animate-pulse"></div>
            </div>
            <p className="mt-4 text-xs text-gray-500 font-mono italic">
              Non-Contiguous Nodes
            </p>
          </div>
        </div>
      </div>

      {/* Static vs Dynamic Comparison */}
      {/* 4. Comparison Cards: Static vs Dynamic */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 mb-24">
        {/* Static Array Card */}
        <div className="bg-gray-800/40 p-10 rounded-3xl border border-gray-700 shadow-2xl hover:bg-gray-800/60 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-purple-400">Static Array</h2>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30 uppercase tracking-widest font-bold">
              Stack Allocated
            </span>
          </div>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            A fixed collection stored in{" "}
            <span className="text-purple-300 font-semibold underline decoration-purple-500/30 underline-offset-4">
              contiguous memory
            </span>
            . The size is locked at compile-time.
          </p>

          <div className="bg-black/40 p-4 rounded-xl font-mono text-purple-300 mb-8 text-lg border border-purple-900/20 group-hover:border-purple-500/30 transition-colors">
            int arr[5];{" "}
            <span className="text-gray-600 font-sans ml-2 text-sm">
              // Fixed & Immature
            </span>
          </div>

          <ul className="space-y-4 text-lg text-gray-400">
            <li className="flex items-center gap-3">
              <span className="text-green-500 font-bold">✅</span>
              <span className="text-gray-200">Zero memory overhead</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500 font-bold">✅</span>
              <span className="text-gray-200">
                Fastest possible performance
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-red-500 font-bold">❌</span>
              <span className="text-red-400/80">
                Overflow risk if size exceeded
              </span>
            </li>
          </ul>
        </div>

        {/* Vector Card */}
        <div className="bg-gray-800/40 p-10 rounded-3xl border border-gray-700 shadow-2xl hover:bg-gray-800/60 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-blue-400">
              Vector (Dynamic)
            </h2>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30 uppercase tracking-widest font-bold">
              Heap Allocated
            </span>
          </div>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            A resizable wrapper that{" "}
            <span className="text-blue-300 font-semibold underline decoration-blue-500/30 underline-offset-4">
              automatically reallocates
            </span>{" "}
            itself when capacity is reached.
          </p>

          <div className="bg-black/40 p-4 rounded-xl font-mono text-blue-300 mb-8 text-lg border border-blue-900/20 group-hover:border-blue-500/30 transition-colors">
            vector&lt;int&gt; v;{" "}
            <span className="text-gray-600 font-sans ml-2 text-sm">
              // Growable & Modern
            </span>
          </div>

          <ul className="space-y-4 text-lg text-gray-400">
            <li className="flex items-center gap-3">
              <span className="text-green-500 font-bold">✅</span>
              <span className="text-gray-200">Flexible sizing at runtime</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500 font-bold">✅</span>
              <span className="text-gray-200">Amortized O(1) Push Back</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-red-500 font-bold">❌</span>
              <span className="text-red-400/80">
                Higher memory usage per cell
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* 5. Decision Matrix: When to Use What */}
      <div className="max-w-6xl mx-auto mb-24 grid md:grid-cols-2 gap-10">
        {/* Use Array Section */}
        <div className="p-10 bg-green-900/10 border border-green-500/20 rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl font-black text-green-400">#1</span>
          </div>

          <h3 className="text-3xl font-black text-green-400 mb-6 uppercase tracking-tight">
            Use Arrays When:
          </h3>

          <ul className="space-y-6 text-xl text-gray-300 font-medium">
            <li className="flex items-start gap-4">
              <span className="text-green-500 mt-1">✔</span>
              <p>
                The dataset size is{" "}
                <strong className="text-white">known and fixed</strong> at
                compile-time.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-green-500 mt-1">✔</span>
              <p>
                Memory is{" "}
                <strong className="text-white">critically constrained</strong>{" "}
                (Embedded systems or Kernels).
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-green-500 mt-1">✔</span>
              <p>
                You need <strong className="text-white">zero overhead</strong>{" "}
                and pure hardware performance.
              </p>
            </li>
          </ul>

          <div className="mt-10 pt-6 border-t border-green-500/20">
            <span className="text-xs font-bold text-green-500/60 uppercase tracking-widest">
              Best For: High-Performance Systems
            </span>
          </div>
        </div>

        {/* Use Vector Section */}
        <div className="p-10 bg-blue-900/10 border border-blue-500/20 rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl font-black text-blue-400">#2</span>
          </div>

          <h3 className="text-3xl font-black text-blue-400 mb-6 uppercase tracking-tight">
            Use Vectors When:
          </h3>

          <ul className="space-y-6 text-xl text-gray-300 font-medium">
            <li className="flex items-start gap-4">
              <span className="text-blue-500 mt-1">✔</span>
              <p>
                The number of elements is{" "}
                <strong className="text-white">dynamic or unpredictable</strong>
                .
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-blue-500 mt-1">✔</span>
              <p>
                <strong className="text-white">Ease of use</strong> and built-in
                safety (iterators/resizing) are priorities.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-blue-500 mt-1">✔</span>
              <p>
                You are developing{" "}
                <strong className="text-white">high-level applications</strong>{" "}
                or web servers.
              </p>
            </li>
          </ul>

          <div className="mt-10 pt-6 border-t border-blue-500/20">
            <span className="text-xs font-bold text-blue-500/60 uppercase tracking-widest">
              Best For: Modern Application Development
            </span>
          </div>
        </div>
      </div>

      {/* 6. Mechanics: The 2x Growth Strategy */}
      <div className="max-w-6xl mx-auto mb-24">
        <div className="bg-purple-900/10 border border-purple-500/30 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>

          <h2 className="text-3xl md:text-4xl font-black mb-8 text-purple-300 flex items-center gap-4">
            <span className="text-blue-400">⚙️</span> Growth Mechanism: The 2x
            Rule
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl text-gray-200 leading-relaxed font-medium">
                When a <strong>Vector</strong> reaches its maximum capacity:
              </p>

              <ul className="space-y-5 text-lg text-gray-400">
                <li className="flex gap-4">
                  <span className="text-blue-400 font-black">01.</span>
                  <p>
                    A new memory block{" "}
                    <strong className="text-blue-300 italic text-xl">
                      exactly twice
                    </strong>{" "}
                    the current size is reserved.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="text-purple-400 font-black">02.</span>
                  <p>
                    Every existing element is{" "}
                    <strong className="text-purple-300 font-bold underline decoration-purple-500/30 underline-offset-4">
                      copied
                    </strong>{" "}
                    to the new location.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="text-red-400 font-black">03.</span>
                  <p>
                    The old memory address is{" "}
                    <strong className="text-gray-200">safely deleted</strong> to
                    avoid memory leaks.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="text-green-400 font-black">04.</span>
                  <p>
                    This results in an{" "}
                    <strong className="text-green-400 italic underline decoration-green-500/20 underline-offset-4">
                      Amortized O(1)
                    </strong>{" "}
                    time complexity.
                  </p>
                </li>
              </ul>
            </div>

            {/* Console Simulation Box */}
            <div className="bg-black/60 p-8 rounded-2xl border border-gray-700 shadow-inner group">
              <div className="text-gray-500 mb-6 text-sm font-mono flex justify-between uppercase tracking-widest border-b border-gray-800 pb-2">
                <span>// Vector Resize Log</span>
                <span className="text-green-500/50">Runtime: Active</span>
              </div>

              <div className="space-y-4 font-mono text-lg md:text-xl">
                <p className="text-gray-400">
                  Capacity 2 → <span className="text-blue-400">[1, 2]</span>
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-yellow-500 font-bold animate-pulse">
                    Pushing 3...{" "}
                  </p>
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded uppercase tracking-tighter">
                    Event: Resize
                  </span>
                </div>
                <p className="text-green-400 font-bold">New Capacity: 4</p>
                <p className="text-gray-300">
                  Data →{" "}
                  <span className="text-blue-400">
                    [1, 2, 3, <span className="opacity-30">_</span>]
                  </span>
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800 text-xs text-gray-500 italic">
                Note: Doubling the size ensures that reallocations happen
                exponentially less often.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Performance Matrix: Time Complexity */}
      <div className="max-w-6xl mx-auto mb-24 overflow-x-auto rounded-3xl border border-gray-700 bg-gray-800/20 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-800/80 text-gray-400 text-lg uppercase tracking-widest">
            <tr>
              <th className="p-8 font-black">Operation</th>
              <th className="p-8 font-black">Time Complexity</th>
              <th className="p-8 font-black">Why? (Technical Note)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-xl text-gray-300">
            <tr className="hover:bg-purple-500/5 transition-colors group">
              <td className="p-8 font-mono text-purple-400 font-bold text-2xl group-hover:text-purple-300 transition-colors">
                Access [i]
              </td>
              <td className="p-8">
                <span className="text-green-400 font-black px-3 py-1 bg-green-400/10 rounded-lg">
                  O(1)
                </span>
              </td>
              <td className="text-lg text-gray-400 italic">
                Instant access via direct memory address offset calculation.
              </td>
            </tr>

            <tr className="hover:bg-yellow-500/5 transition-colors group">
              <td className="p-8 font-mono text-purple-400 font-bold text-2xl group-hover:text-purple-300 transition-colors">
                Push Back
              </td>
              <td className="p-8">
                <span className="text-yellow-400 font-black px-3 py-1 bg-yellow-400/10 rounded-lg whitespace-nowrap">
                  Amortized O(1)
                </span>
              </td>
              <td className="text-lg text-gray-400 italic">
                Usually O(1). Only O(n) during the rare event of a 2x Resize.
              </td>
            </tr>

            <tr className="hover:bg-red-500/5 transition-colors group">
              <td className="p-8 font-mono text-purple-400 font-bold text-2xl group-hover:text-purple-300 transition-colors">
                Insert / Delete
              </td>
              <td className="p-8">
                <span className="text-red-400 font-black px-3 py-1 bg-red-400/10 rounded-lg">
                  O(n)
                </span>
              </td>
              <td className="text-lg text-gray-400 italic">
                Worst case: Must shift every single element to maintain order.
              </td>
            </tr>

            <tr className="hover:bg-blue-500/5 transition-colors group">
              <td className="p-8 font-mono text-purple-400 font-bold text-2xl group-hover:text-purple-300 transition-colors">
                Binary Search
              </td>
              <td className="p-8">
                <span className="text-blue-400 font-black px-3 py-1 bg-blue-400/10 rounded-lg">
                  O(log n)
                </span>
              </td>
              <td className="text-lg text-gray-400 italic">
                Extremely fast search, but{" "}
                <span className="text-white underline decoration-blue-500/30 underline-offset-4">
                  only
                </span>{" "}
                works on sorted data.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Language Snippets (NEW) */}
      {/* 8. Language Implementations: How to use them */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-black mb-10 text-center text-yellow-500 uppercase tracking-widest">
          Language Implementations
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* C++ Block */}
          <div className="bg-black/60 p-8 rounded-3xl border border-gray-700 shadow-2xl group hover:border-blue-500/50 transition-all">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-mono text-sm tracking-widest uppercase font-bold">
                // C++ STL
              </span>
              <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
            </div>
            <pre className="text-base md:text-lg font-mono leading-relaxed mb-6">
              <code className="text-blue-400">vector</code>&lt;
              <code className="text-blue-200">int</code>&gt; v = &#123;1,
              2&#125;;
              <br />
              v.<code className="text-blue-300">push_back</code>(3);
            </pre>
            <p className="text-xs text-gray-500 italic border-t border-gray-800 pt-4">
              Note: Strictly contiguous. Guarantees memory efficiency.
            </p>
          </div>

          {/* Java Block */}
          <div className="bg-black/60 p-8 rounded-3xl border border-gray-700 shadow-2xl group hover:border-purple-500/50 transition-all">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-mono text-sm tracking-widest uppercase font-bold">
                // Java Collection
              </span>
              <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></span>
            </div>
            <pre className="text-base md:text-lg font-mono leading-relaxed mb-6">
              <code className="text-purple-400">List</code>&lt;
              <code className="text-purple-200">Integer</code>&gt; l = <br />
              <code className="text-purple-400">new</code> ArrayList&lt;&gt;();
              <br />
              l.<code className="text-purple-300">add</code>(1);
            </pre>
            <p className="text-xs text-gray-500 italic border-t border-gray-800 pt-4">
              Note: Stores Objects. Uses "Wrappers" like Integer.
            </p>
          </div>

          {/* Python Block */}
          <div className="bg-black/60 p-8 rounded-3xl border border-gray-700 shadow-2xl group hover:border-green-500/50 transition-all">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-mono text-sm tracking-widest uppercase font-bold">
                // Python Native
              </span>
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <pre className="text-base md:text-lg font-mono leading-relaxed mb-6">
              arr = [1, 2]
              <br />
              arr.<code className="text-green-400">append</code>(3)
            </pre>
            <p className="text-xs text-gray-500 italic border-t border-gray-800 pt-4">
              Note: Python Lists are Dynamic Arrays by default.
            </p>
          </div>
        </div>
      </div>

      {/* Solving Patterns (NEW) */}
      {/* 9. Expert Solving Patterns: Your Array Toolkit */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-4xl font-black mb-12 text-center bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-blue-500 uppercase tracking-tighter">
          Essential Solving Patterns
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Two Pointers",
              desc: "Perfect for sorted arrays to find pairs, triplets, or reverse elements efficiently.",
              icon: "↔️",
              color: "border-purple-500/30",
            },
            {
              title: "Sliding Window",
              desc: "The gold standard for finding contiguous subarrays or substrings with specific constraints.",
              icon: "🪟",
              color: "border-blue-500/30",
            },
            {
              title: "Prefix Sum",
              desc: "Precompute cumulative data to answer range-sum queries in constant O(1) time.",
              icon: "➕",
              color: "border-green-500/30",
            },
            {
              title: "Dutch Flag",
              desc: "Optimized 3-way partitioning used to sort colors (0, 1, 2) in a single linear pass.",
              icon: "🇳🇱",
              color: "border-red-500/30",
            },
          ].map((pattern, idx) => (
            <div
              key={idx}
              className={`p-8 bg-gray-800/40 border-2 ${pattern.color} rounded-3xl hover:bg-gray-800 transition-all group shadow-xl text-center flex flex-col items-center`}
            >
              <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-300">
                {pattern.icon}
              </div>
              <h4 className="text-2xl font-black mb-4 text-white group-hover:text-purple-300 transition-colors">
                {pattern.title}
              </h4>
              <p className="text-lg text-gray-400 leading-relaxed font-medium">
                {pattern.desc}
              </p>

              <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] uppercase font-black tracking-widest text-purple-400">
                  Master This Pattern →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Roadmap */}
      {/* 10. Final Practice Roadmap: The 30-Day Challenge */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-4xl md:text-5xl font-black mb-12 text-center bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-orange-500 uppercase tracking-tighter">
          The 30-Day Practice Roadmap 🎯
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Easy Level Card */}
          <div className="bg-gray-800/40 border-2 border-green-500/20 rounded-3xl p-10 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] transition-all group">
            <div className="flex justify-between items-center mb-8 border-b border-green-500/10 pb-4">
              <h3 className="text-3xl font-black text-green-400">Easy</h3>
              <span className="bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                10 Qs
              </span>
            </div>
            <ul className="space-y-5 text-lg md:text-xl text-gray-400">
              {problems.easy.map((q, i) => (
                <li
                  key={i}
                  className="group/item hover:text-white transition-colors cursor-default flex gap-4 items-start leading-tight"
                >
                  <span className="font-mono text-green-500/40 group-hover/item:text-green-400 transition-colors">
                    {i + 1}.
                  </span>
                  <span className="font-medium">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Medium Level Card */}
          <div className="bg-gray-800/40 border-2 border-yellow-500/20 rounded-3xl p-10 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] transition-all group">
            <div className="flex justify-between items-center mb-8 border-b border-yellow-500/10 pb-4">
              <h3 className="text-3xl font-black text-yellow-400">Medium</h3>
              <span className="bg-yellow-500/20 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                10 Qs
              </span>
            </div>
            <ul className="space-y-5 text-lg md:text-xl text-gray-400">
              {problems.medium.map((q, i) => (
                <li
                  key={i}
                  className="group/item hover:text-white transition-colors cursor-default flex gap-4 items-start leading-tight"
                >
                  <span className="font-mono text-yellow-500/40 group-hover/item:text-yellow-400 transition-colors">
                    {i + 11}.
                  </span>
                  <span className="font-medium">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hard Level Card */}
          <div className="bg-gray-800/40 border-2 border-red-500/20 rounded-3xl p-10 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] transition-all group">
            <div className="flex justify-between items-center mb-8 border-b border-red-500/10 pb-4">
              <h3 className="text-3xl font-black text-red-400">Hard</h3>
              <span className="bg-red-500/20 text-red-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                10 Qs
              </span>
            </div>
            <ul className="space-y-5 text-lg md:text-xl text-gray-400">
              {problems.hard.map((q, i) => (
                <li
                  key={i}
                  className="group/item hover:text-white transition-colors cursor-default flex gap-4 items-start leading-tight"
                >
                  <span className="font-mono text-red-500/40 group-hover/item:text-red-400 transition-colors">
                    {i + 21}.
                  </span>
                  <span className="font-medium">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 11. Interview "Trap" Corner: Common Pitfalls */}
      <div className="max-w-6xl mx-auto mb-24 bg-orange-950/10 border-2 border-orange-500/20 p-12 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Warning Icon Background */}
        <div className="absolute -top-10 -right-10 text-9xl text-orange-500/5 font-black rotate-12 select-none">
          ⚠️
        </div>

        <h3 className="text-3xl font-black text-orange-400 mb-8 flex items-center gap-4 uppercase tracking-tighter">
          ⚠️ Common Interview Pitfalls
        </h3>

        <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-300 relative z-10">
          <div className="space-y-6">
            <p className="leading-relaxed">
              •{" "}
              <strong className="text-orange-300">
                The "0-Index" Mystery:
              </strong>
              It's not just a convention; it's a <strong>memory offset</strong>.
              The formula{" "}
              <code className="bg-orange-500/20 px-2 py-0.5 rounded text-orange-200 text-sm italic">
                Base + (Index * Size)
              </code>
              requires a 0 to access the very first byte.
            </p>
            <p className="leading-relaxed">
              •{" "}
              <strong className="text-orange-300">Automatic Shrinking:</strong>
              Vectors grow automatically, but they{" "}
              <strong className="text-white underline decoration-orange-500/30">
                rarely shrink
              </strong>{" "}
              memory back to the OS automatically. This prevents "thrashing"
              (repeatedly allocating/deallocating).
            </p>
          </div>

          <div className="space-y-6">
            <p className="leading-relaxed">
              • <strong className="text-orange-300">Delete Complexity:</strong>
              Deleting the <strong>last</strong> element is O(1), but deleting
              the <strong>first</strong>
              element is O(n) because every other element must move.
            </p>
            <p className="leading-relaxed">
              • <strong className="text-orange-300">Capacity vs Size:</strong>
              Size is how many elements are <em>in</em> the array. Capacity is
              how much memory is
              <em>reserved</em>. Always check both in performance-critical code.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-orange-500/10 text-center">
          <span className="text-xs font-mono text-orange-500/50 uppercase tracking-[0.2em]">
            Expert Tip: Mentioning "Memory Thrashing" in an interview shows
            senior-level knowledge.
          </span>
        </div>
      </div>

      {/* Final Insights */}
      {/* 12. Final Quick-Fire Insights */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 mb-24">
        {/* Pro Tip Card */}
        <div className="group relative p-10 border-l-8 border-yellow-500 bg-yellow-500/5 rounded-2xl rounded-l-none shadow-2xl transition-all hover:bg-yellow-500/10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">💡</span>
            <h4 className="text-2xl font-black text-yellow-500 uppercase tracking-widest">
              Pro Strategy
            </h4>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Always check if the input array is{" "}
            <strong className="text-white underline decoration-yellow-500/30 underline-offset-4">
              Sorted
            </strong>
            . If it is,{" "}
            <strong className="text-yellow-400">
              Binary Search (O(log n))
            </strong>{" "}
            should be your immediate first thought for searching.
          </p>
        </div>

        {/* Interview Trap Card */}
        <div className="group relative p-10 border-l-8 border-pink-500 bg-pink-500/5 rounded-2xl rounded-l-none shadow-2xl transition-all hover:bg-pink-500/10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🪤</span>
            <h4 className="text-2xl font-black text-pink-500 uppercase tracking-widest">
              The Access Trap
            </h4>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Don't confuse <strong className="text-pink-400">Accessing</strong>{" "}
            (getting a value at index [i] = O(1)) with
            <strong className="text-pink-400"> Searching</strong> (finding where
            a value exists = O(n)). Searching requires a full linear scan.
          </p>
        </div>
      </div>

      <div className="text-center">
        {/* 13. Final Call to Action (CTA) */}
        <div className="max-w-6xl mx-auto text-center py-20 border-t border-gray-800/50 mt-12">
          <p className="text-gray-400 mb-10 text-2xl font-medium italic tracking-wide animate-pulse">
            Theory mastered. Ready to see the memory move?
          </p>

          <button
            onClick={() => (window.location.href = "/visualizer/array")}
            className="group relative px-10 py-10 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl font-black text-4xl shadow-[0_0_50px_rgba(139,92,246,0.3)] hover:shadow-[0_0_80px_rgba(139,92,246,0.6)] transition-all transform hover:scale-110 active:scale-95 cursor-pointer overflow-hidden"
          >
            {/* Subtle Shine Effect */}
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>

            <span className="relative flex items-center gap-4">
              OPEN VISUALIZER{" "}
              <span className="group-hover:translate-x-2 transition-transform">
                🚀
              </span>
            </span>
          </button>

          <div className="mt-12 text-gray-600 font-mono text-sm tracking-[0.3em] uppercase">
            Phase 1: Arrays & Vectors Complete
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrayPage;
