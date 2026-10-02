import React from "react";
import { useEffect } from "react";
import { auth } from "../firebase";
import {
  Layers3,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Cpu,
  Code2,
  CheckCircle2,
  Zap,
  Target,
  AlertTriangle,
  Lightbulb,
  GitBranch,
  Trophy,
  Braces,
} from "lucide-react";

const StackPage = () => {
  const user = auth.currentUser;
  const userId = user?.uid;

  const problems = {
    easy: [
      "Implement Stack using Array",
      "Valid Parentheses",
      "Next Greater Element",
      "Min Stack",
      "Reverse Stack",
      "Check Balanced Brackets",
      "Stack Using Queue",
      "Remove Adjacent Duplicates",
      "Stock Span Problem",
      "Postfix Evaluation",
    ],
    medium: [
      "Next Smaller Element",
      "Largest Rectangle in Histogram",
      "Infix to Postfix",
      "Evaluate Prefix Expression",
      "Celebrity Problem",
      "Design Browser History",
      "Decode String",
      "Asteroid Collision",
      "Simplify Path",
      "Daily Temperatures",
    ],
    hard: [
      "Trapping Rain Water",
      "Max Rectangle in Matrix",
      "Sliding Window Maximum",
      "LFU Cache",
      "Expression Tree Evaluation",
      "Max Frequency Stack",
      "Shortest Unsorted Subarray",
      "Largest Submatrix",
      "Sum of Subarray Minimums",
      "Remove K Digits",
    ],
  };

  useEffect(() => {
    const visited =
      JSON.parse(localStorage.getItem(`visitedSteps_${userId}`)) || {};

    if (!visited["stack"]) visited["stack"] = [];

    visited["stack"][0] = true; // Intro
    visited["stack"][1] = true; // Implementation

    localStorage.setItem(`visitedSteps_${userId}`, JSON.stringify(visited));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 sm:px-6 pt-28 pb-16 font-sans relative overflow-hidden">
      {" "}
      {/* 1. Header */}
      <section className="max-w-6xl mx-auto pb-16 relative">
        <div className="absolute -top-10 right-10 w-72 h-72 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />
        <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-sky-100/50 blur-3xl pointer-events-none" />

        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          {/* Intro */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-5">
              <Layers3 className="w-3.5 h-3.5" />
              Data Structures · 02
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950">
              Stack
              <span className="text-indigo-600"> Data Structure</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-500 leading-8 max-w-2xl">
              Master the Last-In-First-Out model behind recursion, function
              calls, undo-redo systems, browser history, expression evaluation,
              and countless DSA problems.
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm text-slate-600">
                <ArrowUp className="w-4 h-4 text-indigo-600" />
                Push
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm text-slate-600">
                <ArrowDown className="w-4 h-4 text-indigo-600" />
                Pop
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm text-slate-600">
                <Target className="w-4 h-4 text-indigo-600" />
                Peek / Top
              </div>
            </div>
          </div>

          {/* Learning status */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Foundation Track
                </p>

                <p className="text-lg font-bold text-slate-900 mt-1">
                  Stack Fundamentals
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Layers3 className="w-5 h-5 text-indigo-600" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-sm text-slate-600">
                  Core LIFO principle
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-sm text-slate-600">Stack operations</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-sm text-slate-600">
                  Recursion & call stack
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-slate-200 shrink-0" />
                <span className="text-sm text-slate-400">
                  Patterns & practice
                </span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Intro + Implementation</span>

                <span className="font-semibold text-indigo-600">
                  In progress
                </span>
              </div>

              <div className="h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
                <div className="h-full w-1/2 bg-indigo-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 2. Core Principle & Visual */}
      <section className="max-w-6xl mx-auto mt-4">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-stretch">
          {/* Explanation */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-4">
              <Layers3 className="w-4 h-4" />
              Core Principle
            </div>

            <h2 className="text-3xl font-bold text-slate-950">
              The LIFO Principle
            </h2>

            <p className="text-slate-500 leading-7 mt-4">
              A Stack is a linear structure where all insertions and deletions
              are restricted to{" "}
              <strong className="text-slate-900">one end only</strong>, called
              the <span className="font-semibold text-indigo-600">Top</span>.
            </p>

            <div className="mt-7 rounded-2xl bg-indigo-50 border border-indigo-100 p-5">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                Real-world analogy
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-7 mt-2">
                Think of a stack of dinner plates: the last plate placed on top
                is the first one you remove.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs text-slate-400">Insert</p>
                <p className="font-mono font-bold text-slate-900 mt-1">
                  push()
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs text-slate-400">Remove</p>
                <p className="font-mono font-bold text-slate-900 mt-1">pop()</p>
              </div>
            </div>
          </div>

          {/* Stack visual */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 flex items-center justify-center min-h-[420px]">
            <div className="relative">
              <div className="absolute -left-24 top-8 flex items-center gap-2 text-indigo-300 text-sm font-semibold">
                <span>TOP</span>
                <ArrowRight className="w-4 h-4" />
              </div>

              <div className="w-56 border-x-4 border-b-4 border-slate-600 rounded-b-3xl p-4 flex flex-col gap-3 bg-white/5">
                {[30, 20, 10].map((value, index) => (
                  <div
                    key={value}
                    className={`h-16 rounded-xl flex items-center justify-center font-bold text-xl border ${
                      index === 0
                        ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-950/30"
                        : "bg-slate-800 border-slate-700 text-slate-300"
                    }`}
                  >
                    {value}
                  </div>
                ))}
              </div>

              <div className="mt-5 text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Bottom of Stack
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 3. Call Stack & Recursion */}
      <section className="max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Cpu className="w-4 h-4" />
            <span>Systems Deep Dive</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            The Call Stack
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500 leading-7">
            The same LIFO idea appears inside program execution. When functions
            call other functions, the computer uses an internal call stack to
            remember where each function should return.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
          {/* Explanation */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-indigo-600" />
              </div>

              <div>
                <p className="text-xs font-semibold text-indigo-600">
                  FUNCTION EXECUTION
                </p>
                <p className="font-bold text-slate-900">Stack Frames</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-500 leading-7">
              Every function call creates a stack frame containing information
              needed to continue that function, including local variables,
              parameters, and return information.
            </p>

            <div className="mt-7 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">
                  01
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Function is called
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    A new frame is pushed onto the call stack.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">
                  02
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Function executes
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Its local state remains associated with that frame.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0">
                  03
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Function returns
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    The frame is popped and execution continues with the caller.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-amber-50 border border-amber-100 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />

                <div>
                  <p className="text-sm font-semibold text-amber-800">
                    Stack Overflow
                  </p>

                  <p className="text-sm text-amber-700/80 leading-6 mt-1">
                    Too many active function calls can exhaust the memory
                    available for the call stack. Infinite recursion is a common
                    example.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recursion visualization */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-7">
              <div>
                <p className="text-xs font-semibold text-indigo-300">
                  RECURSION
                </p>

                <h3 className="text-xl font-bold text-white mt-1">
                  What happens in memory?
                </h3>
              </div>

              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 font-mono">
                factorial(n)
              </span>
            </div>

            <div className="relative pl-6 border-l border-slate-700 space-y-2">
              {/* Frame 4 */}
              <div className="rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-indigo-200">
                    factorial(1)
                  </span>

                  <span className="text-[10px] font-semibold text-emerald-400">
                    BASE CASE
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-2">
                  This frame can return.
                </p>
              </div>

              {/* Frame 3 */}
              <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-slate-300">
                    factorial(2)
                  </span>

                  <span className="text-[10px] text-slate-500">waiting</span>
                </div>
              </div>

              {/* Frame 2 */}
              <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-slate-400">
                    factorial(3)
                  </span>

                  <span className="text-[10px] text-slate-600">waiting</span>
                </div>
              </div>

              {/* Frame 1 */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-slate-500">
                    main()
                  </span>

                  <span className="text-[10px] text-slate-600">caller</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4 text-indigo-300" />
                  <span className="text-xs font-semibold text-slate-300">
                    Call
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-2">Push a new frame</p>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2">
                  <ArrowDown className="w-4 h-4 text-emerald-300" />
                  <span className="text-xs font-semibold text-slate-300">
                    Return
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-2">
                  Pop the completed frame
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core connection */}
        <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Layers3 className="w-4 h-4 text-indigo-600" />
              </div>

              <p className="font-semibold text-slate-900">The connection</p>
            </div>

            <div className="hidden sm:block h-6 w-px bg-slate-200" />

            <p className="text-sm text-slate-500 leading-6">
              A recursive call pushes another frame. When the base case is
              reached, the calls return in reverse order — exactly the LIFO
              behavior of a stack.
            </p>
          </div>
        </div>
      </section>
      {/* 4. Stack Implementation Strategies */}
      <section className="max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Code2 className="w-4 h-4" />
            <span>Implementation Strategies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            How Can We Build a Stack?
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500 leading-7">
            The Stack is an abstract data structure. Its LIFO behavior can be
            implemented using different underlying structures. Two common
            choices are arrays and linked lists.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Array implementation */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-6 sm:px-7 py-6 border-b border-slate-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Layers3 className="w-5 h-5 text-indigo-600" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-indigo-600">
                      APPROACH 01
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      Array Implementation
                    </h3>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500">
                  Contiguous
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              {/* Visual */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <div className="flex items-end gap-2">
                  {[10, 20, 30, 40].map((value, index) => (
                    <div key={value} className="flex-1">
                      <div
                        className={`h-14 rounded-lg border flex items-center justify-center font-mono text-sm font-bold ${
                          index === 3
                            ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                            : "bg-white border-slate-200 text-slate-600"
                        }`}
                      >
                        {value}
                      </div>

                      <p className="text-[10px] text-slate-400 text-center mt-2">
                        {index}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-end gap-2 text-xs font-semibold text-indigo-600">
                  <ArrowUp className="w-3.5 h-3.5" />
                  Top
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-6 mt-5">
                Elements are stored in contiguous memory, and the top can be
                tracked using an index.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">Good cache locality</p>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">
                    Fixed-capacity implementations can overflow
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">
                    Resizing a full dynamic array requires moving elements
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Linked List implementation */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-6 sm:px-7 py-6 border-b border-slate-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
                    <GitBranch className="w-5 h-5 text-violet-600" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-violet-600">
                      APPROACH 02
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      Linked List Implementation
                    </h3>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-500">
                  Node-based
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              {/* Visual */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 overflow-x-auto">
                <div className="flex items-center min-w-[390px]">
                  {[30, 20, 10].map((value, index) => (
                    <React.Fragment key={value}>
                      <div
                        className={`w-24 h-16 rounded-xl border flex flex-col items-center justify-center shrink-0 ${
                          index === 0
                            ? "bg-violet-50 border-violet-200"
                            : "bg-white border-slate-200"
                        }`}
                      >
                        <span className="font-mono text-sm font-bold text-slate-800">
                          {value}
                        </span>

                        <span className="text-[10px] text-slate-400 mt-1">
                          node
                        </span>
                      </div>

                      {index < 2 && (
                        <ArrowRight className="w-5 h-5 text-slate-300 mx-2 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-violet-600">
                  <ArrowUp className="w-3.5 h-3.5" />
                  Top → first node
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-6 mt-5">
                Each element is stored inside a node connected to the next node,
                allowing the structure to grow dynamically.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">
                    Dynamic growth without contiguous storage
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">
                    No fixed array capacity
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">
                    Each node needs additional pointer/reference storage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison takeaway */}
        <div className="mt-6 bg-slate-950 rounded-3xl p-6 sm:p-7 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-start gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-indigo-300" />
              </div>

              <div>
                <p className="text-xs font-semibold text-indigo-300">
                  Core idea
                </p>

                <h3 className="text-lg font-bold mt-1">
                  Same Stack behavior, different storage strategy.
                </h3>
              </div>
            </div>

            <div className="hidden lg:block h-10 w-px bg-white/10" />

            <p className="text-sm text-slate-400 leading-6 max-w-3xl">
              The implementation changes how memory is managed, but the public
              Stack operations remain the same: push onto the top, remove from
              the top, and inspect the top.
            </p>
          </div>
        </div>
      </section>
      {/* 5. Complexity Matrix */}
      <section className="max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Zap className="w-4 h-4" />
            <span>Performance Fundamentals</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Stack Operations & Complexity
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500 leading-7">
            The defining advantage of a Stack is that its fundamental operations
            are performed at one restricted end: the Top.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Push */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                <ArrowUp className="w-5 h-5 text-indigo-600" />
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold font-mono">
                O(1)
              </span>
            </div>

            <p className="font-mono text-lg font-bold text-slate-900 mt-6">
              push(x)
            </p>

            <p className="text-sm text-slate-500 leading-6 mt-2">
              Add an element to the Top of the Stack.
            </p>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400">Why?</p>

              <p className="text-sm text-slate-600 mt-1">
                Only the Top position needs to be updated.
              </p>
            </div>
          </div>

          {/* Pop */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center">
                <ArrowDown className="w-5 h-5 text-rose-600" />
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold font-mono">
                O(1)
              </span>
            </div>

            <p className="font-mono text-lg font-bold text-slate-900 mt-6">
              pop()
            </p>

            <p className="text-sm text-slate-500 leading-6 mt-2">
              Remove the element currently at the Top.
            </p>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400">Why?</p>

              <p className="text-sm text-slate-600 mt-1">
                No other element needs to be shifted.
              </p>
            </div>
          </div>

          {/* Peek */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center">
                <Target className="w-5 h-5 text-sky-600" />
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold font-mono">
                O(1)
              </span>
            </div>

            <p className="font-mono text-lg font-bold text-slate-900 mt-6">
              peek() / top()
            </p>

            <p className="text-sm text-slate-500 leading-6 mt-2">
              Inspect the current Top element without removing it.
            </p>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400">Why?</p>

              <p className="text-sm text-slate-600 mt-1">
                The Top position is directly available.
              </p>
            </div>
          </div>
        </div>

        {/* Visual operation flow */}
        <div className="mt-6 bg-slate-950 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="lg:w-1/3">
              <p className="text-xs font-semibold text-indigo-300">
                THE MENTAL MODEL
              </p>

              <h3 className="text-xl font-bold text-white mt-2">
                Everything happens at the Top.
              </h3>

              <p className="text-sm text-slate-400 leading-6 mt-3">
                Stack operations remain efficient because we never need to
                rearrange the entire structure for the fundamental operations.
              </p>
            </div>

            <div className="flex-1 grid sm:grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
                <ArrowUp className="w-5 h-5 text-indigo-300 mx-auto" />

                <p className="font-mono text-sm font-bold text-white mt-3">
                  push()
                </p>

                <p className="text-xs text-slate-500 mt-1">Add at Top</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
                <ArrowDown className="w-5 h-5 text-rose-300 mx-auto" />

                <p className="font-mono text-sm font-bold text-white mt-3">
                  pop()
                </p>

                <p className="text-xs text-slate-500 mt-1">Remove from Top</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
                <Target className="w-5 h-5 text-sky-300 mx-auto" />

                <p className="font-mono text-sm font-bold text-white mt-3">
                  peek()
                </p>

                <p className="text-xs text-slate-500 mt-1">Inspect Top</p>
              </div>
            </div>
          </div>
        </div>

        {/* Complexity takeaway */}
        <div className="mt-6 flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />

          <div>
            <p className="text-sm font-semibold text-emerald-900">
              Core takeaway
            </p>

            <p className="text-sm text-emerald-800/70 leading-6 mt-1">
              Push, Pop, and Peek/Top are all O(1) according to the complexity
              model used in this Stack lesson.
            </p>
          </div>
        </div>
      </section>
      {/* 6. Interview Pitfalls */}
      <section className="max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-amber-600 text-sm font-semibold mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>Interview & Concept Checks</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Stack Pitfalls to Remember
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500 leading-7">
            These are the details interviewers often use to check whether you
            understand the Stack beyond simply knowing push and pop.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Underflow */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>

              <div>
                <p className="text-xs font-semibold text-amber-600">
                  01 · UNDERFLOW
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Check Before Pop or Peek
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-3">
                  Before removing or inspecting the Top element, make sure the
                  Stack is not empty.
                </p>

                <div className="mt-5 rounded-2xl bg-slate-950 p-4 font-mono text-sm">
                  <p className="text-slate-500">if (!stack.empty())</p>

                  <p className="text-indigo-300 pl-4 mt-1">stack.pop();</p>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-amber-700">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Empty Stack → underflow condition
                </div>
              </div>
            </div>
          </div>

          {/* Recursion space */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5 text-indigo-600" />
              </div>

              <div>
                <p className="text-xs font-semibold text-indigo-600">
                  02 · SPACE COMPLEXITY
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Recursion Uses the Call Stack
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-3">
                  Recursive calls create additional stack frames. The amount of
                  active recursion therefore contributes to the memory used by
                  the call stack.
                </p>

                <div className="mt-5 flex items-end gap-2 h-24">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className="flex-1 bg-indigo-50 border border-indigo-100 rounded-t-lg relative"
                      style={{ height: `${level * 20 + 15}%` }}
                    >
                      <span className="absolute inset-x-0 bottom-2 text-center text-[10px] font-semibold text-indigo-500">
                        {level}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-400 mt-3">
                  More active recursive calls → deeper call stack
                </p>
              </div>
            </div>
          </div>

          {/* Random access */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-sky-600" />
              </div>

              <div>
                <p className="text-xs font-semibold text-sky-600">
                  03 · ACCESS
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  A Stack Is Not a Random-Access Structure
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-3">
                  The Stack interface exposes the Top. You should not expect
                  direct O(1) access to arbitrary middle elements through normal
                  Stack operations.
                </p>

                <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Available directly
                    </span>

                    <span className="font-mono text-sm font-bold text-sky-600">
                      TOP
                    </span>
                  </div>

                  <div className="h-px bg-slate-200 my-3" />

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Arbitrary middle element
                    </span>

                    <span className="text-xs font-semibold text-slate-400">
                      Not a Stack operation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Null pointer */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5 text-rose-600" />
              </div>

              <div>
                <p className="text-xs font-semibold text-rose-600">
                  04 · LINKED LIST
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Watch Your Pointers
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-3">
                  When implementing a Stack with a linked list,
                  pointer/reference handling becomes part of the implementation.
                </p>

                <div className="mt-5 rounded-2xl bg-slate-950 p-4">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-400/20 text-xs font-mono text-indigo-300">
                      top
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-600" />

                    <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                      node
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-600" />

                    <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-500">
                      null
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-3">
                  Incorrect pointer handling can break the chain.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interview takeaway */}
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
                  Explain the edge case.
                </h3>
              </div>
            </div>

            <div className="hidden lg:block h-10 w-px bg-white/10" />

            <p className="text-sm text-slate-400 leading-6 max-w-3xl">
              A strong Stack explanation should cover not only the normal
              operation, but also what happens when the Stack is empty, how
              recursion consumes stack space, and what changes when the
              implementation uses linked nodes.
            </p>
          </div>
        </div>
      </section>
      {/* 7. Practice Roadmap */}
      <section className="max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Trophy className="w-4 h-4" />
            <span>Practice Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Stack Mastery Roadmap
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500 leading-7">
            Move from fundamental Stack operations to increasingly challenging
            problems involving expressions, monotonic stacks, design problems,
            and advanced problem-solving techniques.
          </p>
        </div>

        {/* Difficulty overview */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-emerald-600">
                  LEVEL 01
                </p>

                <p className="font-bold text-slate-900 mt-1">Easy</p>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                10 Qs
              </span>
            </div>

            <div className="h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full w-1/3 bg-emerald-500 rounded-full" />
            </div>

            <p className="text-xs text-slate-400 mt-3">
              Build Stack fundamentals
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-amber-600">LEVEL 02</p>

                <p className="font-bold text-slate-900 mt-1">Medium</p>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold">
                10 Qs
              </span>
            </div>

            <div className="h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full w-2/3 bg-amber-500 rounded-full" />
            </div>

            <p className="text-xs text-slate-400 mt-3">Apply Stack patterns</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-violet-600">
                  LEVEL 03
                </p>

                <p className="font-bold text-slate-900 mt-1">Hard</p>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold">
                10 Qs
              </span>
            </div>

            <div className="h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full w-full bg-violet-500 rounded-full" />
            </div>

            <p className="text-xs text-slate-400 mt-3">
              Push advanced problem solving
            </p>
          </div>
        </div>

        {/* Problems */}
        <div className="grid lg:grid-cols-3 gap-5">
          {Object.entries(problems).map(([level, qs], idx) => {
            const config = [
              {
                label: "LEVEL 01",
                accent: "emerald",
                icon: CheckCircle2,
              },
              {
                label: "LEVEL 02",
                accent: "amber",
                icon: Target,
              },
              {
                label: "LEVEL 03",
                accent: "violet",
                icon: Trophy,
              },
            ][idx];

            const Icon = config.icon;

            const accentClasses = {
              emerald: {
                header: "bg-emerald-50/60 border-emerald-100",
                label: "text-emerald-600",
                icon: "bg-white border-emerald-100 text-emerald-600",
                number: "bg-emerald-50 text-emerald-700",
              },
              amber: {
                header: "bg-amber-50/60 border-amber-100",
                label: "text-amber-600",
                icon: "bg-white border-amber-100 text-amber-600",
                number: "bg-amber-50 text-amber-700",
              },
              violet: {
                header: "bg-violet-50/60 border-violet-100",
                label: "text-violet-600",
                icon: "bg-white border-violet-100 text-violet-600",
                number: "bg-violet-50 text-violet-700",
              },
            }[config.accent];

            return (
              <div
                key={level}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm"
              >
                {/* Card header */}
                <div className={`px-6 py-5 border-b ${accentClasses.header}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-xs font-semibold ${accentClasses.label}`}
                      >
                        {config.label}
                      </p>

                      <h3 className="text-xl font-bold text-slate-900 capitalize mt-1">
                        {level}
                      </h3>
                    </div>

                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center ${accentClasses.icon}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Question list */}
                <div className="p-4">
                  {qs.map((q, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${accentClasses.number}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm text-slate-700 leading-5">
                        {q}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Practice strategy */}
        <div className="mt-6 bg-slate-950 rounded-3xl p-6 sm:p-7 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-start gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-indigo-300" />
              </div>

              <div>
                <p className="text-xs font-semibold text-indigo-300">
                  Practice strategy
                </p>

                <h3 className="text-lg font-bold mt-1">
                  Build pattern recognition.
                </h3>
              </div>
            </div>

            <div className="hidden lg:block h-10 w-px bg-white/10" />

            <p className="text-sm text-slate-400 leading-6 max-w-3xl">
              Don't treat these as isolated questions. Look for the underlying
              Stack behavior—LIFO, expression processing, monotonic structures,
              or state management—and learn to recognize it when a new problem
              appears.
            </p>
          </div>
        </div>
      </section>
      {/* 8. CTA */}
      <section className="max-w-6xl mx-auto mt-16 mb-20">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 sm:px-10 py-10 sm:py-12">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 mb-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Stack Fundamentals Complete
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Ready to see Push and Pop in action?
              </h2>

              <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl leading-6">
                Take the concepts you've learned into an interactive environment
                and experiment with Stack operations yourself.
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
                  LIFO
                </span>

                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
                  Push
                </span>

                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
                  Pop
                </span>

                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
                  Peek
                </span>
              </div>
            </div>

            <button
              onClick={() => (window.location.href = "/visualizer/stack")}
              className="group shrink-0 inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-indigo-950/20"
            >
              Open Stack Visualizer
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StackPage;
