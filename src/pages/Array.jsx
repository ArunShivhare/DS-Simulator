import React from "react";
import { useEffect } from "react";
import { auth } from "../firebase";
import {
  Layers3,
  MemoryStick,
  Grid3X3,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Zap,
  Code2,
  Braces,
  Trophy,
  Target,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

const ArrayPage = () => {
  const user = auth.currentUser;
  const userId = user?.uid;

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
      JSON.parse(localStorage.getItem(`visitedSteps_${userId}`)) || {};

    if (!visited["array"]) visited["array"] = [];

    visited["array"][0] = true; // Intro
    visited["array"][1] = true; // Implementation

    localStorage.setItem(`visitedSteps_${userId}`, JSON.stringify(visited));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 sm:px-6 pt-28 pb-16 font-sans relative overflow-hidden">
      {/* Subtle page atmosphere */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/40 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-[30%] left-[-180px] w-80 h-80 bg-sky-100/30 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10">
        {/* Learning Header */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-4xl">
              {/* Section label */}
              <div className="flex items-center gap-2 mb-5">
                <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <Layers3 size={16} className="text-indigo-600" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">
                  Data Structures · 01
                </span>
              </div>

              {/* Main title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.05]">
                Arrays
                <span className="text-indigo-600"> & Vectors</span>
              </h1>

              <p className="mt-5 max-w-3xl text-base sm:text-lg leading-8 text-slate-500">
                Build your foundation from the ground up — understand contiguous
                memory, indexing, implementations, performance, patterns, and
                the problems that make arrays one of the most important
                structures in DSA.
              </p>
            </div>

            {/* Learning status */}
            <div className="shrink-0">
              <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <CheckCircle2 size={17} className="text-emerald-500" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Foundation Track
                    </p>

                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Intro + Implementation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Concept — Contiguous Memory */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          {/* Explanation */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <MemoryStick size={19} className="text-indigo-600" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500">
                  Core Principle
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Contiguous Memory
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-7 text-slate-600">
              An array stores its elements in
              <strong className="text-slate-900">
                {" "}
                contiguous memory locations
              </strong>
              . Because the elements sit next to each other, the computer can
              calculate the address of any element directly from its index.
            </p>

            {/* Formula */}
            <div className="mt-7 rounded-xl bg-slate-50 border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={14} className="text-amber-500" />

                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  Address Calculation
                </span>
              </div>

              <code className="text-sm sm:text-base font-mono font-semibold text-indigo-600">
                Address = Base + (Index × Size)
              </code>

              <p className="mt-3 text-xs leading-5 text-slate-400">
                This direct calculation is the reason array access by index is
                O(1).
              </p>
            </div>
          </div>

          {/* Memory Visualization */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Memory Layout
                </p>

                <h3 className="mt-1 text-sm font-bold text-slate-800">
                  Elements stored side by side
                </h3>
              </div>

              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">
                Contiguous
              </span>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 sm:p-7">
              <div className="flex items-center justify-center gap-2 overflow-x-auto pb-3">
                {[10, 20, 30, 40].map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center shrink-0"
                  >
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-sm sm:text-base font-bold border transition-all hover:-translate-y-1 ${
                        index === 0
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      {value}
                    </div>

                    <span className="mt-2 text-[9px] font-mono font-semibold text-slate-400">
                      [{index}]
                    </span>
                  </div>
                ))}

                {/* Capacity */}
                <div className="flex flex-col items-center shrink-0 opacity-50">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-300 font-mono">
                    +
                  </div>

                  <span className="mt-2 text-[9px] font-mono font-semibold text-slate-300">
                    [4]
                  </span>
                </div>
              </div>

              {/* Address line */}
              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span>BASE ADDRESS</span>

                <span>+ index × element size</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Arrays */}
      <section className="max-w-7xl mx-auto mb-20">
        {/* Section Header */}
        <div className="mb-8 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-7 w-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <Grid3X3 size={14} className="text-indigo-600" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
              Structure Types
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Arrays come in different forms
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-7 text-slate-500">
            The underlying idea stays the same, but the way we organize and
            manage elements changes depending on the problem.
          </p>
        </div>

        {/* Type Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* ==================== 1D ARRAY ==================== */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300">
            {/* Visual */}
            <div className="h-32 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 overflow-hidden">
              <div className="flex items-center">
                {[10, 20, 30, 40].map((value, index) => (
                  <div
                    key={index}
                    className={`w-11 h-11 flex items-center justify-center text-xs font-bold border-y border-r ${
                      index === 0
                        ? "rounded-l-lg border-l bg-indigo-600 border-indigo-600 text-white"
                        : index === 3
                          ? "rounded-r-lg bg-white border-slate-200 text-slate-600"
                          : "bg-white border-slate-200 text-slate-600"
                    }`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>

            {/* Number */}
            <span className="text-[10px] font-mono font-bold text-indigo-400">
              01
            </span>

            <h3 className="mt-2 text-lg font-bold text-slate-900">1D Array</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              A simple{" "}
              <span className="font-semibold text-slate-700">
                linear sequence
              </span>
              . Elements are accessed using a single index.
            </p>

            {/* Syntax */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Access
              </span>

              <code className="text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                arr[i]
              </code>
            </div>
          </div>

          {/* ==================== 2D ARRAY ==================== */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-sky-200 hover:-translate-y-1 transition-all duration-300">
            {/* Visual */}
            <div className="h-32 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                  <div
                    key={value}
                    className="h-8 w-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-[9px] font-semibold text-slate-400 group-hover:border-sky-200 transition-colors"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold text-sky-400">
              02
            </span>

            <h3 className="mt-2 text-lg font-bold text-slate-900">
              2D / Matrix
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Data organized into{" "}
              <span className="font-semibold text-slate-700">
                rows and columns
              </span>
              . Useful for grids, matrices, images and coordinate-based
              problems.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Access
              </span>

              <code className="text-xs font-mono font-semibold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md">
                arr[i][j]
              </code>
            </div>
          </div>

          {/* ==================== DYNAMIC ARRAY ==================== */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300">
            {/* Visual */}
            <div className="h-32 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
              <div className="flex items-center gap-1.5">
                {[10, 20, 30].map((value) => (
                  <div
                    key={value}
                    className="h-10 w-10 rounded-lg bg-white border border-emerald-200 flex items-center justify-center text-[10px] font-bold text-emerald-600"
                  >
                    {value}
                  </div>
                ))}

                <ArrowRight size={14} className="mx-1 text-slate-300" />

                <div className="h-10 w-10 rounded-lg border-2 border-dashed border-emerald-300 flex items-center justify-center text-emerald-400 font-bold">
                  +
                </div>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold text-emerald-500">
              03
            </span>

            <h3 className="mt-2 text-lg font-bold text-slate-900">
              Dynamic Array
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              A resizable container such as a{" "}
              <span className="font-semibold text-slate-700">vector</span>. It
              manages memory reallocation automatically as the collection grows.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                C++ Example
              </span>

              <code className="text-[11px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                vector.push_back()
              </code>
            </div>
          </div>
        </div>

        {/* Learning Note */}
        <div className="mt-5 bg-indigo-50/60 border border-indigo-100 rounded-xl px-5 py-4 flex items-start gap-3">
          <Lightbulb size={17} className="text-indigo-500 shrink-0 mt-0.5" />

          <p className="text-xs sm:text-sm leading-6 text-slate-600">
            <span className="font-bold text-slate-800">Key idea:</span> These
            structures may look different, but indexing and contiguous storage
            remain central to understanding how arrays work.
          </p>
        </div>
      </section>

      {/* Hardware Deep Dive */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Top Bar */}
          <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                <Cpu size={17} className="text-sky-600" />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-sky-500">
                  Deeper Understanding
                </p>

                <h2 className="text-lg font-bold text-slate-900">
                  Why arrays are hardware friendly
                </h2>
              </div>
            </div>

            <span className="w-fit text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
              Cache Locality
            </span>
          </div>

          <div className="grid lg:grid-cols-2">
            {/* Explanation */}
            <div className="p-6 sm:p-8 lg:border-r border-slate-100">
              <p className="text-sm sm:text-base leading-7 text-slate-600">
                Unlike linked structures, array elements are stored next to each
                other in memory. This gives arrays strong{" "}
                <strong className="text-slate-900">spatial locality</strong>.
              </p>

              <div className="mt-7 space-y-5">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                    01
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      CPU requests an element
                    </h4>

                    <p className="mt-1 text-xs sm:text-sm leading-6 text-slate-500">
                      When the processor accesses{" "}
                      <code className="font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                        arr[0]
                      </code>
                      , nearby memory can also be brought into the cache.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="h-7 w-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                    02
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      Nearby elements are ready
                    </h4>

                    <p className="mt-1 text-xs sm:text-sm leading-6 text-slate-500">
                      Sequential access can then benefit because upcoming
                      elements may already be available from a nearby cache
                      line.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                    03
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      Iteration becomes efficient
                    </h4>

                    <p className="mt-1 text-xs sm:text-sm leading-6 text-slate-500">
                      This locality is one reason arrays perform especially well
                      when algorithms scan elements sequentially.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cache Visualization */}
            <div className="p-6 sm:p-8 bg-slate-50/60">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Simplified View
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    Cache line
                  </p>
                </div>

                <span className="text-[9px] font-mono text-slate-400">
                  contiguous block
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-center justify-center gap-1.5 overflow-x-auto">
                  {[1, 2, 3, 4].map((value, index) => (
                    <div
                      key={value}
                      className={`w-14 h-14 shrink-0 rounded-lg flex items-center justify-center text-sm font-bold border ${
                        index === 0
                          ? "bg-sky-600 border-sky-600 text-white"
                          : "bg-sky-50 border-sky-100 text-sky-700"
                      }`}
                    >
                      {value}
                    </div>
                  ))}
                </div>

                {/* Fetch visualization */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />

                    <p className="text-[10px] font-mono text-slate-500">
                      Nearby elements available for sequential access
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-sky-50 border border-sky-100 rounded-xl p-4">
                <p className="text-xs leading-5 text-sky-800">
                  <span className="font-bold">Why this matters:</span> Big-O
                  complexity does not tell the entire performance story. Memory
                  layout can also affect real-world execution speed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Static vs Dynamic Arrays */}
      <section className="max-w-7xl mx-auto mb-20">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-7 w-7 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center">
              <Layers3 size={14} className="text-violet-600" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
              Memory Management
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Fixed size or flexible size?
          </h2>

          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-slate-500">
            The core array idea remains the same, but the way memory is managed
            changes significantly between fixed-size arrays and dynamic arrays.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Static Array */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Fixed-size
                </span>

                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  Static Array
                </h3>
              </div>

              <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-600">
                int arr[5]
              </span>
            </div>

            <div className="p-6">
              <p className="text-sm leading-7 text-slate-600">
                A fixed collection stored in contiguous memory. The size is
                determined when the array is created and cannot simply grow
                beyond its declared capacity.
              </p>

              {/* Code */}
              <div className="mt-6 rounded-xl bg-slate-950 border border-slate-800 p-4 overflow-x-auto">
                <code className="text-sm font-mono text-indigo-300">
                  int arr[5];
                </code>
              </div>

              {/* Characteristics */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />

                  <span className="text-sm text-slate-600">
                    Predictable fixed storage
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />

                  <span className="text-sm text-slate-600">
                    Direct indexed access
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle
                    size={16}
                    className="text-amber-500 shrink-0 mt-0.5"
                  />

                  <span className="text-sm text-slate-600">
                    Size cannot automatically expand when more elements are
                    needed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Array */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Resizable
                </span>

                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  Dynamic Array
                </h3>
              </div>

              <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-sky-50 border border-sky-100 text-sky-600">
                vector&lt;int&gt;
              </span>
            </div>

            <div className="p-6">
              <p className="text-sm leading-7 text-slate-600">
                A resizable array abstraction that can allocate additional
                storage when its current capacity is reached.
              </p>

              {/* Code */}
              <div className="mt-6 rounded-xl bg-slate-950 border border-slate-800 p-4 overflow-x-auto">
                <code className="text-sm font-mono text-sky-300">
                  vector&lt;int&gt; v;
                </code>
              </div>

              {/* Characteristics */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />

                  <span className="text-sm text-slate-600">
                    Can grow as elements are added
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />

                  <span className="text-sm text-slate-600">
                    Provides convenient insertion operations
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Zap size={16} className="text-sky-500 shrink-0 mt-0.5" />

                  <span className="text-sm text-slate-600">
                    May allocate new memory when capacity is exhausted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Comparison */}
        <div className="mt-5 bg-slate-900 rounded-2xl p-6 sm:p-7 text-white">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="shrink-0">
              <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                <Target size={18} className="text-indigo-300" />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                The important distinction
              </p>

              <p className="mt-2 text-sm sm:text-base leading-7 text-slate-300">
                Both provide indexed access to elements, but their key
                difference is how the storage size is managed: a static array
                has a fixed size, while a dynamic array can obtain additional
                storage when required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Choosing Between Array Types */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Target size={17} className="text-emerald-600" />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-500">
                  Decision Guide
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Which one should you use?
                </h2>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Array */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Fixed Array
                </h3>

                <span className="text-[9px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100 px-2.5 py-1 rounded-md">
                  Fixed size
                </span>
              </div>

              <div className="space-y-4">
                {[
                  "The number of elements is known ahead of time.",
                  "You need predictable fixed storage.",
                  "The problem naturally has a fixed-size collection.",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="text-indigo-500 shrink-0 mt-0.5"
                    />

                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vector */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Dynamic Array
                </h3>

                <span className="text-[9px] font-bold uppercase tracking-wider bg-sky-50 text-sky-600 border border-sky-100 px-2.5 py-1 rounded-md">
                  Resizable
                </span>
              </div>

              <div className="space-y-4">
                {[
                  "The number of elements may change at runtime.",
                  "You want automatic capacity management.",
                  "Convenient insertion and resizing are useful.",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="text-sky-500 shrink-0 mt-0.5"
                    />

                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Vector Growth & Reallocation */}
      <section className="max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Zap className="w-4 h-4" />
            <span>Dynamic Storage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            How a Vector Grows
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500 leading-7">
            A dynamic array needs a strategy for handling new elements when its
            current storage becomes full. The key idea is capacity,
            reallocation, and copying existing elements into the new storage.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
          {/* Growth visualization */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Reallocation Example
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Starting with a capacity of 2
                </p>
              </div>

              <span className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                Amortized O(1) push_back
              </span>
            </div>

            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                  01
                </span>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Current storage
                  </p>
                  <p className="text-xs text-slate-500">Capacity = 2</p>
                </div>
              </div>

              <div className="flex gap-2 ml-10">
                {[1, 2].map((value, index) => (
                  <div
                    key={index}
                    className="w-20 h-16 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center justify-center"
                  >
                    <span className="text-lg font-bold text-slate-900">
                      {value}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      index {index}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 ml-10 my-7">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
                <AlertTriangle className="w-4 h-4" />
                Capacity reached
              </div>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Step 2 */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                  02
                </span>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    New storage is allocated
                  </p>
                  <p className="text-xs text-slate-500">
                    The existing elements need to be moved
                  </p>
                </div>
              </div>

              <div className="ml-10 flex items-center gap-3">
                <div className="flex gap-1.5 opacity-45">
                  {[1, 2].map((value) => (
                    <div
                      key={value}
                      className="w-14 h-12 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-sm font-semibold text-slate-500"
                    >
                      {value}
                    </div>
                  ))}
                </div>

                <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />

                <div className="flex gap-1.5 p-2 rounded-xl border border-indigo-200 bg-indigo-50">
                  {[1, 2, 3, null].map((value, index) => (
                    <div
                      key={index}
                      className={`w-14 h-12 rounded-lg flex items-center justify-center text-sm font-semibold ${
                        value === null
                          ? "border border-dashed border-indigo-300 text-indigo-300 bg-white"
                          : "border border-indigo-100 bg-white text-slate-900"
                      }`}
                    >
                      {value ?? "+"}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    The new element is inserted
                  </p>
                  <p className="text-sm text-slate-500 mt-1 leading-6">
                    After reallocation, the existing values are preserved and
                    the new value can be placed into the newly available
                    storage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Concept card */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 text-white">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center mb-6">
              <Cpu className="w-5 h-5 text-indigo-300" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              What is happening?
            </p>

            <h3 className="text-2xl font-bold mt-2">Capacity ≠ Size</h3>

            <p className="text-slate-400 text-sm leading-6 mt-4">
              Capacity describes how many elements the allocated storage can
              hold. Size describes how many elements are currently stored.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-7">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-slate-400">Before</p>
                <p className="text-2xl font-bold mt-1">2 / 2</p>
                <p className="text-xs text-slate-500 mt-1">size / capacity</p>
              </div>

              <div className="rounded-2xl bg-indigo-500/10 border border-indigo-400/20 p-4">
                <p className="text-xs text-indigo-300">After</p>
                <p className="text-2xl font-bold mt-1">3 / 4</p>
                <p className="text-xs text-slate-500 mt-1">size / capacity</p>
              </div>
            </div>

            <div className="mt-7 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-300 mt-0.5 shrink-0" />

                <p className="text-sm text-slate-400 leading-6">
                  Reallocation can make an individual insertion expensive, but
                  growth strategies allow repeated appends to have amortized
                  constant-time performance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mental model */}
        <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Target className="w-4 h-4 text-indigo-600" />
              </div>

              <p className="font-semibold text-slate-900">Remember the flow</p>
            </div>

            <div className="hidden sm:block h-6 w-px bg-slate-200" />

            <p className="text-sm text-slate-500 leading-6">
              Full capacity → allocate new storage → move existing elements →
              insert the new element.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Performance Matrix: Time Complexity */}
      <section className="max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Zap className="w-4 h-4" />
            <span>Performance Fundamentals</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Array & Vector Complexity
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500 leading-7">
            Before choosing an operation, understand how the position of an
            element affects its cost. Arrays and vectors are extremely efficient
            for direct access, while insertion and deletion may require shifting
            elements.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[1.2fr_1fr_2fr] px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <span>Operation</span>
            <span>Complexity</span>
            <span>What happens?</span>
          </div>

          {/* Access */}
          <div className="grid sm:grid-cols-[1.2fr_1fr_2fr] gap-3 sm:gap-0 px-6 py-5 border-b border-slate-100">
            <div>
              <p className="text-xs text-slate-400 sm:hidden mb-1">Operation</p>
              <p className="font-semibold text-slate-900">
                Access <span className="font-mono text-indigo-600">arr[i]</span>
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 sm:hidden mb-1">
                Complexity
              </p>
              <span className="inline-flex px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold font-mono">
                O(1)
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-400 sm:hidden mb-1">
                What happens?
              </p>
              <p className="text-sm text-slate-500 leading-6">
                The index is used to directly calculate the element's position.
              </p>
            </div>
          </div>

          {/* Push Back */}
          <div className="grid sm:grid-cols-[1.2fr_1fr_2fr] gap-3 sm:gap-0 px-6 py-5 border-b border-slate-100">
            <div>
              <p className="text-xs text-slate-400 sm:hidden mb-1">Operation</p>
              <p className="font-semibold text-slate-900">Push Back</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 sm:hidden mb-1">
                Complexity
              </p>
              <span className="inline-flex px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold font-mono">
                Amortized O(1)
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-400 sm:hidden mb-1">
                What happens?
              </p>
              <p className="text-sm text-slate-500 leading-6">
                Most appends use available capacity. A resize can make an
                individual operation more expensive.
              </p>
            </div>
          </div>

          {/* Insert Delete */}
          <div className="grid sm:grid-cols-[1.2fr_1fr_2fr] gap-3 sm:gap-0 px-6 py-5 border-b border-slate-100">
            <div>
              <p className="text-xs text-slate-400 sm:hidden mb-1">Operation</p>
              <p className="font-semibold text-slate-900">Insert / Delete</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 sm:hidden mb-1">
                Complexity
              </p>
              <span className="inline-flex px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold font-mono">
                O(n)
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-400 sm:hidden mb-1">
                What happens?
              </p>
              <p className="text-sm text-slate-500 leading-6">
                Elements may need to be shifted to maintain contiguous ordering.
              </p>
            </div>
          </div>

          {/* Binary Search */}
          <div className="grid sm:grid-cols-[1.2fr_1fr_2fr] gap-3 sm:gap-0 px-6 py-5">
            <div>
              <p className="text-xs text-slate-400 sm:hidden mb-1">Operation</p>
              <p className="font-semibold text-slate-900">Binary Search</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 sm:hidden mb-1">
                Complexity
              </p>
              <span className="inline-flex px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold font-mono">
                O(log n)
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-400 sm:hidden mb-1">
                What happens?
              </p>
              <p className="text-sm text-slate-500 leading-6">
                A sorted array can repeatedly eliminate half of the remaining
                search space.
              </p>
            </div>
          </div>
        </div>

        {/* Complexity takeaway */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>

              <p className="font-semibold text-slate-900">Fast Access</p>
            </div>

            <p className="text-sm text-slate-500 leading-6">
              Direct indexing is one of the biggest strengths of arrays and
              vectors.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-amber-600" />
              </div>

              <p className="font-semibold text-slate-900">Shifting Costs</p>
            </div>

            <p className="text-sm text-slate-500 leading-6">
              Inserting or deleting near the beginning can require many elements
              to move.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Target className="w-4 h-4 text-indigo-600" />
              </div>

              <p className="font-semibold text-slate-900">Search Smart</p>
            </div>

            <p className="text-sm text-slate-500 leading-6">
              When the data is sorted, binary search can reduce the search space
              logarithmically.
            </p>
          </div>
        </div>

        {/* Interview takeaway */}
        <div className="mt-6 bg-slate-950 rounded-2xl p-5 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-indigo-300" />
              </div>

              <span className="font-semibold">Interview takeaway</span>
            </div>

            <div className="hidden sm:block h-6 w-px bg-white/10" />

            <p className="text-sm text-slate-400 leading-6">
              Remember the distinction: accessing an element by index is O(1),
              while searching through an unsorted array is generally O(n).
            </p>
          </div>
        </div>
      </section>

      {/* 8. Language Implementations */}
      <section className="max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Code2 className="w-4 h-4" />
            <span>Implementation Across Languages</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Arrays in Different Languages
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500 leading-7">
            The underlying idea stays the same, but each language provides its
            own syntax and container for working with dynamic arrays.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* C++ */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-indigo-600" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">C++</h3>
                  <p className="text-xs text-slate-400">STL Vector</p>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-400">01</span>
            </div>

            <div className="p-6">
              <div className="rounded-2xl bg-slate-950 p-5 overflow-x-auto">
                <pre className="text-sm leading-7 text-slate-300 font-mono">
                  {`vector<int> v = {1, 2};
v.push_back(3);`}
                </pre>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-900">
                  Dynamic array
                </p>
                <p className="text-sm text-slate-500 mt-2 leading-6">
                  C++ provides{" "}
                  <span className="font-mono text-indigo-600">vector</span>
                  for a resizable sequence.
                </p>
              </div>
            </div>
          </div>

          {/* Java */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Braces className="w-5 h-5 text-amber-600" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">Java</h3>
                  <p className="text-xs text-slate-400">ArrayList</p>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-400">02</span>
            </div>

            <div className="p-6">
              <div className="rounded-2xl bg-slate-950 p-5 overflow-x-auto">
                <pre className="text-sm leading-7 text-slate-300 font-mono">
                  {`List<Integer> l =
    new ArrayList<>();

l.add(1);`}
                </pre>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-900">
                  Resizable list
                </p>
                <p className="text-sm text-slate-500 mt-2 leading-6">
                  Java provides{" "}
                  <span className="font-mono text-indigo-600">ArrayList</span>
                  for dynamically sized collections.
                </p>
              </div>
            </div>
          </div>

          {/* Python */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                  <Layers3 className="w-5 h-5 text-sky-600" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">Python</h3>
                  <p className="text-xs text-slate-400">List</p>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-400">03</span>
            </div>

            <div className="p-6">
              <div className="rounded-2xl bg-slate-950 p-5 overflow-x-auto">
                <pre className="text-sm leading-7 text-slate-300 font-mono">
                  {`arr = [1, 2]
arr.append(3)`}
                </pre>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-900">
                  Built-in list
                </p>
                <p className="text-sm text-slate-500 mt-2 leading-6">
                  Python's{" "}
                  <span className="font-mono text-indigo-600">list</span>
                  provides a convenient dynamic sequence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common idea */}
        <div className="mt-6 bg-slate-950 rounded-3xl p-6 sm:p-7 text-white">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-indigo-300" />
              </div>

              <div>
                <p className="text-xs font-semibold text-indigo-300">
                  Same concept
                </p>
                <p className="font-semibold">Different syntax</p>
              </div>
            </div>

            <div className="hidden md:block h-10 w-px bg-white/10" />

            <p className="text-sm text-slate-400 leading-6 max-w-3xl">
              Whether you use a C++ vector, Java ArrayList, or Python list, the
              important DSA concept is understanding indexed access, dynamic
              storage, insertion, deletion, and growth.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Essential Array Patterns */}
      <section className="max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Target className="w-4 h-4" />
            <span>Problem-Solving Toolkit</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Essential Array Patterns
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500 leading-7">
            Strong array problem solving is less about memorizing solutions and
            more about recognizing the right pattern. These four techniques form
            a practical foundation for many common problems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Two Pointers */}
          <div className="group bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:-translate-y-0.5 hover:border-indigo-200 transition-all duration-200">
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-indigo-600" />
              </div>

              <span className="text-xs font-bold text-slate-300">01</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-6">
              Two Pointers
            </h3>

            <p className="text-sm text-slate-500 leading-6 mt-2">
              Maintain two indices and move them according to the condition of
              the problem.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-100 p-4">
              <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-3">
                <span>left</span>
                <span>right</span>
              </div>

              <div className="flex items-center gap-1">
                {[4, 7, 9, 12, 15, 18].map((value, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-10 rounded-lg border flex items-center justify-center text-xs font-semibold ${
                      index === 0 || index === 5
                        ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <CheckCircle2 className="w-4 h-4" />
              Useful for sorted arrays and pair-based problems
            </div>
          </div>

          {/* Sliding Window */}
          <div className="group bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:-translate-y-0.5 hover:border-sky-200 transition-all duration-200">
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center">
                <Layers3 className="w-5 h-5 text-sky-600" />
              </div>

              <span className="text-xs font-bold text-slate-300">02</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-6">
              Sliding Window
            </h3>

            <p className="text-sm text-slate-500 leading-6 mt-2">
              Maintain a moving range of elements instead of repeatedly
              processing the same portion of the array.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-100 p-4">
              <div className="flex gap-1">
                {[3, 5, 2, 8, 6, 4].map((value, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-10 rounded-lg border flex items-center justify-center text-xs font-semibold ${
                      index >= 1 && index <= 3
                        ? "border-sky-200 bg-sky-50 text-sky-700"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    {value}
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-sky-600 font-medium">
                <div className="h-px flex-1 bg-sky-200" />
                Active window
                <div className="h-px flex-1 bg-sky-200" />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-sky-600">
              <CheckCircle2 className="w-4 h-4" />
              Useful for subarray and range-based problems
            </div>
          </div>

          {/* Prefix Sum */}
          <div className="group bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:-translate-y-0.5 hover:border-emerald-200 transition-all duration-200">
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Layers3 className="w-5 h-5 text-emerald-600" />
              </div>

              <span className="text-xs font-bold text-slate-300">03</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-6">
              Prefix Sum
            </h3>

            <p className="text-sm text-slate-500 leading-6 mt-2">
              Precompute cumulative information so repeated range-sum queries
              can be answered efficiently.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-100 p-4">
              <div className="flex gap-1">
                {[2, 5, 9, 14, 20].map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 h-10 rounded-lg border border-emerald-100 bg-emerald-50 flex items-center justify-center text-xs font-semibold text-emerald-700"
                  >
                    {value}
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 mt-3 text-center">
                Cumulative values build from left → right
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              Useful for repeated range calculations
            </div>
          </div>

          {/* Dutch National Flag */}
          <div className="group bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:-translate-y-0.5 hover:border-violet-200 transition-all duration-200">
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
                <Grid3X3 className="w-5 h-5 text-violet-600" />
              </div>

              <span className="text-xs font-bold text-slate-300">04</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-6">
              Dutch National Flag
            </h3>

            <p className="text-sm text-slate-500 leading-6 mt-2">
              Partition an array into regions while maintaining boundaries for
              different categories of values.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-100 p-4">
              <div className="flex gap-1">
                {["0", "0", "1", "1", "2", "2"].map((value, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-10 rounded-lg border flex items-center justify-center text-xs font-bold ${
                      value === "0"
                        ? "bg-indigo-50 border-indigo-100 text-indigo-700"
                        : value === "1"
                          ? "bg-amber-50 border-amber-100 text-amber-700"
                          : "bg-violet-50 border-violet-100 text-violet-700"
                    }`}
                  >
                    {value}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 mt-3 text-[10px] font-semibold text-center">
                <span className="text-indigo-600">Region 0</span>
                <span className="text-amber-600">Region 1</span>
                <span className="text-violet-600">Region 2</span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-violet-600">
              <CheckCircle2 className="w-4 h-4" />
              Useful for in-place partitioning problems
            </div>
          </div>
        </div>

        {/* Pattern recognition */}
        <div className="mt-6 bg-slate-950 rounded-3xl p-6 sm:p-7 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-indigo-300" />
              </div>

              <div>
                <p className="text-xs font-semibold text-indigo-300">
                  Pattern recognition
                </p>

                <h3 className="text-lg font-bold mt-1">
                  Don't memorize the code. Recognize the structure.
                </h3>
              </div>
            </div>

            <div className="hidden lg:block h-10 w-px bg-white/10" />

            <p className="text-sm text-slate-400 leading-6 max-w-2xl">
              When you see a new array problem, first ask what the problem is
              really asking: two positions, a continuous range, repeated range
              calculations, or partitioning. That observation often points you
              toward the appropriate pattern.
            </p>
          </div>
        </div>
      </section>

      {/* 10. 30-Day Practice Roadmap */}
      <section className="max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Trophy className="w-4 h-4" />
            <span>Practice Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            30-Day Array Challenge
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500 leading-7">
            Build your confidence progressively. Start with fundamental
            operations, move into common patterns, and finish with advanced
            problems that require stronger problem-solving skills.
          </p>
        </div>

        {/* Progress overview */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Easy</span>

              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                10 Problems
              </span>
            </div>

            <div className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-1/3 bg-emerald-500 rounded-full" />
            </div>

            <p className="text-xs text-slate-400 mt-3">
              Build the fundamentals
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">
                Medium
              </span>

              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold">
                10 Problems
              </span>
            </div>

            <div className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-2/3 bg-amber-500 rounded-full" />
            </div>

            <p className="text-xs text-slate-400 mt-3">
              Apply patterns and techniques
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Hard</span>

              <span className="px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold">
                10 Problems
              </span>
            </div>

            <div className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-full bg-violet-500 rounded-full" />
            </div>

            <p className="text-xs text-slate-400 mt-3">
              Push advanced problem solving
            </p>
          </div>
        </div>

        {/* Problem roadmap */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Easy */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-slate-100 bg-emerald-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-emerald-600">
                    DAYS 01 — 10
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    Easy
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="p-4">
              {problems.easy.map((problem, index) => (
                <div
                  key={problem}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm text-slate-700">{problem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Medium */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-slate-100 bg-amber-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-amber-600">
                    DAYS 11 — 20
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    Medium
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-xl bg-white border border-amber-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="p-4">
              {problems.medium.map((problem, index) => (
                <div
                  key={problem}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {String(index + 11).padStart(2, "0")}
                  </span>

                  <span className="text-sm text-slate-700">{problem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hard */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-slate-100 bg-violet-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-violet-600">
                    DAYS 21 — 30
                  </p>

                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    Hard
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-xl bg-white border border-violet-100 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-violet-600" />
                </div>
              </div>
            </div>

            <div className="p-4">
              {problems.hard.map((problem, index) => (
                <div
                  key={problem}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span className="w-7 h-7 rounded-lg bg-violet-50 text-violet-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {String(index + 21).padStart(2, "0")}
                  </span>

                  <span className="text-sm text-slate-700">{problem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Practice strategy */}
        <div className="mt-6 bg-slate-950 rounded-3xl p-6 sm:p-7 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-indigo-300" />
              </div>

              <div>
                <p className="text-xs font-semibold text-indigo-300">
                  Practice strategy
                </p>

                <h3 className="text-lg font-bold mt-1">
                  Understand → Solve → Review
                </h3>
              </div>
            </div>

            <div className="hidden lg:block h-10 w-px bg-white/10" />

            <p className="text-sm text-slate-400 leading-6 max-w-3xl">
              Don't rush through the list just to increase your solved count.
              Understand the approach, attempt the problem yourself, then review
              what could be improved in your solution.
            </p>
          </div>
        </div>
      </section>

      {/* 11. Interview Pitfalls */}
      <section className="max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-amber-600 text-sm font-semibold mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>Interview & Concept Checks</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Common Array Pitfalls
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500 leading-7">
            These are the small details that often separate simply knowing
            arrays from actually understanding how they behave.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* 0-indexing */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-indigo-600" />
              </div>

              <div>
                <p className="text-xs font-semibold text-indigo-600">
                  01 · INDEXING
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  The 0-Index Mystery
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-3">
                  Array indexing starts from zero, so the first element is at
                  index <span className="font-mono text-indigo-600">0</span>,
                  not index <span className="font-mono text-indigo-600">1</span>
                  .
                </p>

                <div className="mt-5 flex items-center gap-2">
                  {["arr[0]", "arr[1]", "arr[2]", "arr[3]"].map(
                    (item, index) => (
                      <div
                        key={item}
                        className="flex-1 min-w-0 rounded-xl bg-slate-50 border border-slate-200 py-3 text-center"
                      >
                        <p className="text-xs text-slate-400">{index}</p>
                        <p className="font-mono text-xs font-semibold text-slate-700 mt-1">
                          {item}
                        </p>
                      </div>
                    ),
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-4">
                  Index represents the offset from the first element.
                </p>
              </div>
            </div>
          </div>

          {/* Automatic shrinking */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>

              <div>
                <p className="text-xs font-semibold text-amber-600">
                  02 · MEMORY
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Don't Assume Automatic Shrinking
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-3">
                  Removing an element and reducing the number of stored elements
                  does not necessarily mean that the allocated capacity is
                  immediately reduced.
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex-1 rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
                    <p className="text-xs text-slate-400">Size</p>
                    <p className="text-lg font-bold text-slate-900 mt-1">3</p>
                  </div>

                  <span className="text-slate-300">/</span>

                  <div className="flex-1 rounded-xl bg-amber-50 border border-amber-100 p-3 text-center">
                    <p className="text-xs text-amber-600">Capacity</p>
                    <p className="text-lg font-bold text-amber-700 mt-1">8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delete complexity */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <ArrowRight className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-emerald-600">
                  03 · OPERATIONS
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Deletion Cost Depends on Position
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-3">
                  Removing the last element can avoid shifting other elements,
                  while removing an element near the beginning may require many
                  elements to move.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                    <p className="text-xs text-emerald-600 font-semibold">
                      Last element
                    </p>
                    <p className="font-mono font-bold text-emerald-700 mt-1">
                      O(1)
                    </p>
                  </div>

                  <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
                    <p className="text-xs text-amber-600 font-semibold">
                      Earlier position
                    </p>
                    <p className="font-mono font-bold text-amber-700 mt-1">
                      O(n)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Size vs Capacity */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                <Layers3 className="w-5 h-5 text-violet-600" />
              </div>

              <div>
                <p className="text-xs font-semibold text-violet-600">
                  04 · DYNAMIC ARRAYS
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Size vs Capacity
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-3">
                  These two values describe different things. Size tells you how
                  many elements are currently stored; capacity describes the
                  storage currently available.
                </p>

                <div className="mt-5 rounded-2xl bg-slate-950 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">size</span>

                    <span className="font-mono font-bold text-white">3</span>
                  </div>

                  <div className="h-px bg-white/10 my-3" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">capacity</span>

                    <span className="font-mono font-bold text-indigo-300">
                      8
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interview prompt */}
        <div className="mt-6 bg-slate-950 rounded-3xl p-6 sm:p-7 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-start gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-indigo-300" />
              </div>

              <div>
                <p className="text-xs font-semibold text-indigo-300">
                  Interview mindset
                </p>

                <h3 className="text-lg font-bold mt-1">
                  Explain the reason, not just the complexity.
                </h3>
              </div>
            </div>

            <div className="hidden lg:block h-10 w-px bg-white/10" />

            <p className="text-sm text-slate-400 leading-6 max-w-3xl">
              If an interviewer asks why an operation is O(n), explain what the
              array has to do—such as shifting elements—instead of only giving
              the Big-O notation.
            </p>
          </div>
        </div>
      </section>

      {/* 12. Quick-Fire Insights */}
      <section className="max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Lightbulb className="w-4 h-4" />
            <span>Quick Revision</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Quick-Fire Array Insights
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500 leading-7">
            Before moving to the visualizer, make sure these two ideas are
            firmly connected in your mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Strategy */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Target className="w-5 h-5 text-indigo-600" />
              </div>

              <span className="text-xs font-bold text-slate-300">01</span>
            </div>

            <p className="text-xs font-semibold text-indigo-600 mt-6">
              PRO STRATEGY
            </p>

            <h3 className="text-2xl font-bold text-slate-950 mt-2">
              Check whether the array is sorted
            </h3>

            <p className="text-sm text-slate-500 leading-6 mt-3">
              If the data is sorted, additional techniques such as binary search
              may become available depending on what the problem asks.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
                <p className="text-xs text-slate-400">Sorted</p>
                <p className="font-mono text-sm font-bold text-slate-900 mt-1">
                  → Binary Search
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />

              <div className="flex-1 rounded-xl bg-indigo-50 border border-indigo-100 px-4 py-3">
                <p className="text-xs text-indigo-500">Complexity</p>
                <p className="font-mono text-sm font-bold text-indigo-700 mt-1">
                  O(log n)
                </p>
              </div>
            </div>
          </div>

          {/* Access trap */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>

              <span className="text-xs font-bold text-slate-300">02</span>
            </div>

            <p className="text-xs font-semibold text-amber-600 mt-6">
              ACCESS TRAP
            </p>

            <h3 className="text-2xl font-bold text-slate-950 mt-2">
              Accessing ≠ Searching
            </h3>

            <p className="text-sm text-slate-500 leading-6 mt-3">
              Knowing the index gives direct access. Finding an unknown value
              requires a search strategy.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                <p className="text-xs text-emerald-600 font-semibold">
                  Direct access
                </p>

                <p className="font-mono text-lg font-bold text-emerald-700 mt-1">
                  O(1)
                </p>

                <p className="text-xs text-slate-400 mt-1">arr[i]</p>
              </div>

              <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
                <p className="text-xs text-amber-600 font-semibold">
                  Linear search
                </p>

                <p className="font-mono text-lg font-bold text-amber-700 mt-1">
                  O(n)
                </p>

                <p className="text-xs text-slate-400 mt-1">unknown position</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final mental model */}
        <div className="mt-6 bg-slate-950 rounded-3xl p-6 sm:p-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-start gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-indigo-300" />
              </div>

              <div>
                <p className="text-xs font-semibold text-indigo-300">
                  Foundation complete
                </p>

                <h3 className="text-lg font-bold mt-1">
                  Think in terms of operations and patterns.
                </h3>
              </div>
            </div>

            <div className="hidden lg:block h-10 w-px bg-white/10" />

            <p className="text-sm text-slate-400 leading-6 max-w-3xl">
              You now have the core model: contiguous storage, indexing, dynamic
              growth, complexity, language implementations, problem-solving
              patterns, and practice.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto mt-16 mb-20">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 sm:px-10 py-10 sm:py-12">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 mb-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Phase 1 Complete
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Arrays & Vectors mastered.
              </h2>

              <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl leading-6">
                Take what you learned from the concepts and patterns into an
                interactive visualizer and see the operations in action.
              </p>
            </div>

            <button
              onClick={() => (window.location.href = "/visualizer/array")}
              className="group shrink-0 inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-indigo-950/20"
            >
              Open Visualizer
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArrayPage;
