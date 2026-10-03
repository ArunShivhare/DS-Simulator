import React from "react";
import { useEffect } from "react";
import { auth } from "../firebase";
import {
  Layers3,
  ArrowRight,
  ArrowLeft,
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
  CircleDot,
  Network,
} from "lucide-react";

const QueuePage = () => {
  const user = auth.currentUser;
  const userId = user?.uid;

  const problems = {
    easy: [
      "Implement Queue using Array",
      "Implement Queue using Stack",
      "Reverse Queue",
      "First Non-Repeating Character",
      "Circular Queue Basics",
      "Generate Binary Numbers",
      "Queue using Linked List",
      "Print First Negative in Window",
      "Basic BFS Traversal",
      "Deque Implementation",
    ],
    medium: [
      "LRU Cache",
      "Sliding Window Maximum",
      "Rotting Oranges",
      "Circular Queue (Design)",
      "Task Scheduling",
      "Interleave Queue",
      "Gas Station Problem",
      "Moving Average from Stream",
      "K Queue in Array",
      "Queue Reconstruction",
    ],
    hard: [
      "Shortest Path in Binary Matrix",
      "Minimum Cost Path",
      "Multi-source BFS",
      "Word Ladder",
      "0-1 BFS",
      "Alien Dictionary",
      "Network Delay Time",
      "Design Twitter",
      "Trapping Rain Water II",
      "Minimum Height Trees",
    ],
  };

  useEffect(() => {
    const visited =
      JSON.parse(localStorage.getItem(`visitedSteps_${userId}`)) || {};

    if (!visited["queue"]) visited["queue"] = [];

    visited["queue"][0] = true; // Intro
    visited["queue"][1] = true; // Implementation

    localStorage.setItem(`visitedSteps_${userId}`, JSON.stringify(visited));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 sm:px-6 pb-20 font-sans relative overflow-hidden">
      {" "}
      {/* Background Accents */}
      {/* 1. Header */}
      <section className="max-w-6xl mx-auto pt-28 pb-16">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 sm:px-10 py-10 sm:py-12 shadow-sm">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 -left-20 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-4">
                <Layers3 className="w-4 h-4" />
                <span>Data Structures · 03</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950">
                Queue Data Structure
              </h1>

              <p className="mt-5 max-w-3xl text-base sm:text-lg text-slate-500 leading-7">
                The{" "}
                <span className="font-semibold text-slate-700">
                  First-In-First-Out
                </span>
                structure behind CPU scheduling, asynchronous buffers, and BFS
                graph traversals.
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                  FIFO
                </span>

                <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200">
                  Enqueue
                </span>

                <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200">
                  Dequeue
                </span>

                <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200">
                  Front / Rear
                </span>
              </div>
            </div>

            <div className="w-full lg:w-64 bg-slate-950 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Foundation Track
              </div>

              <p className="text-lg font-bold mt-3">Queue Fundamentals</p>

              <div className="h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
                <div className="h-full w-2/3 bg-indigo-500 rounded-full" />
              </div>

              <p className="text-xs text-slate-400 mt-3">
                Understand → Implement → Visualize
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 2. Core Principle */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-4">
              <GitBranch className="w-4 h-4" />
              Core Principle
            </div>

            <h2 className="text-3xl font-bold text-slate-950">
              First In, First Out
            </h2>

            <p className="mt-4 text-slate-500 leading-7">
              A Queue is a linear structure where elements are added at the{" "}
              <strong className="text-slate-800">Rear</strong> and removed from
              the <strong className="text-slate-800">Front</strong>.
            </p>

            <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
              <p className="text-xs font-semibold text-indigo-600 mb-2">
                REAL-WORLD ANALOGY
              </p>

              <p className="text-slate-700 leading-6">
                A ticket counter line: the first person to arrive is the first
                person to be served and leave the line.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs text-slate-400">Entry</p>
                <p className="font-bold text-slate-800 mt-1">Rear</p>
                <p className="text-xs text-slate-500 mt-1">Enqueue</p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs text-slate-400">Exit</p>
                <p className="font-bold text-slate-800 mt-1">Front</p>
                <p className="text-xs text-slate-500 mt-1">Dequeue</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 rounded-3xl p-7 sm:p-8 flex flex-col justify-center overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-semibold text-emerald-300">
                FRONT · EXIT
              </span>

              <span className="text-xs font-semibold text-sky-300">
                REAR · ENTRY
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <ArrowLeft className="w-5 h-5 text-emerald-400 shrink-0" />

              {[10, 20, 30].map((value, index) => (
                <div
                  key={index}
                  className={`flex-1 min-w-0 h-16 rounded-xl flex items-center justify-center text-xl font-black border ${
                    index === 0
                      ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-300"
                      : "bg-white/5 border-white/10 text-slate-300"
                  }`}
                >
                  {value}
                </div>
              ))}

              <ArrowRight className="w-5 h-5 text-sky-400 shrink-0" />
            </div>

            <div className="flex justify-between mt-5 text-xs font-mono">
              <span className="text-emerald-400">remove()</span>
              <span className="text-sky-400">add()</span>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10">
              <p className="text-sm text-slate-400">
                The oldest element leaves first. New elements join at the Rear.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 3. Queue Implementation */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Implementation */}
          <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-4">
              <Code2 className="w-4 h-4" />
              How It's Built
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">
              The Two-Pointer Model
            </h2>

            <p className="mt-4 text-slate-500 leading-7">
              In an array implementation, we maintain two pointers:
              <span className="font-semibold text-emerald-600"> Front</span> and
              <span className="font-semibold text-sky-600"> Rear</span>.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">
                  01
                </span>

                <div>
                  <p className="font-semibold text-slate-800">Initialize</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Initially, both Front and Rear are set to -1.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0">
                  02
                </span>

                <div>
                  <p className="font-semibold text-slate-800">Enqueue</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Increment Rear and place the new element there.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 text-xs font-bold flex items-center justify-center shrink-0">
                  03
                </span>

                <div>
                  <p className="font-semibold text-slate-800">Dequeue</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Return the element at Front and increment Front.
                  </p>
                </div>
              </div>
            </div>

            {/* Pointer visual */}
            <div className="mt-6 bg-slate-950 rounded-2xl p-5 overflow-hidden">
              <div className="flex justify-between text-[11px] font-mono mb-3">
                <span className="text-emerald-400">FRONT</span>
                <span className="text-sky-400">REAR</span>
              </div>

              <div className="flex gap-2">
                {[10, 20, 30].map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-slate-300"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interview Trap */}
          <div className="bg-white border border-red-100 rounded-3xl p-7 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-red-600 text-sm font-semibold mb-4">
              <AlertTriangle className="w-4 h-4" />
              Interview Trap
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">
              Be Careful With <code className="text-red-600">shift()</code>
            </h2>

            <p className="mt-4 text-slate-500 leading-7">
              A common beginner implementation in JavaScript uses{" "}
              <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-sm">
                array.shift()
              </code>{" "}
              for Dequeue.
            </p>

            <div className="mt-6 rounded-2xl bg-red-50 border border-red-100 p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-red-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>

                <div>
                  <p className="font-semibold text-red-800">
                    Why is this a problem?
                  </p>

                  <p className="text-sm text-red-700/80 mt-2 leading-6">
                    In JavaScript, <code>shift()</code> is O(n) because the
                    remaining elements need to be re-indexed.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-slate-950 rounded-2xl p-5">
              <p className="text-xs text-slate-500 mb-3 font-semibold">
                INTERVIEW MENTAL MODEL
              </p>

              <div className="flex items-center justify-between gap-4">
                <code className="text-sm text-slate-300">array.shift()</code>

                <span className="text-red-400 font-bold">O(n)</span>
              </div>

              <div className="h-px bg-white/10 my-4" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-400">Queue Dequeue</span>

                <span className="text-emerald-400 font-bold">O(1)</span>
              </div>
            </div>

            <p className="mt-5 text-sm text-slate-500 leading-6">
              When discussing a Queue implementation in an interview, explain
              how the chosen representation keeps Front removal efficient.
            </p>
          </div>
        </div>
      </section>
      {/* 4. Systems Deep Dive — Message Queues */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Network className="w-4 h-4" />
            Systems Deep Dive
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Queues Beyond Data Structures
          </h2>

          <p className="mt-3 max-w-3xl text-slate-500 leading-7">
            The same FIFO idea appears at a much larger scale in backend
            systems, where queues help services communicate without forcing
            every task to happen immediately.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          {/* Producer → Queue → Consumer */}
          <div className="p-6 sm:p-8 border-b border-slate-200">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
              <div className="w-full sm:w-40 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-center">
                <p className="text-xs font-semibold text-indigo-600">
                  PRODUCER
                </p>
                <p className="font-bold text-slate-900 mt-1">Application</p>
                <p className="text-xs text-slate-500 mt-1">Creates work</p>
              </div>

              <ArrowRight className="hidden sm:block w-5 h-5 text-slate-300" />

              <div className="w-full sm:flex-1 max-w-xl rounded-2xl bg-slate-950 p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-sky-300">
                    MESSAGE QUEUE
                  </span>

                  <span className="text-[11px] font-mono text-slate-500">
                    FIFO
                  </span>
                </div>

                <div className="flex gap-2 overflow-hidden">
                  {["Job A", "Job B", "Job C", "Job D"].map((job) => (
                    <div
                      key={job}
                      className="min-w-[72px] px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-center text-xs text-slate-300"
                    >
                      {job}
                    </div>
                  ))}
                </div>
              </div>

              <ArrowRight className="hidden sm:block w-5 h-5 text-slate-300" />

              <div className="w-full sm:w-40 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                <p className="text-xs font-semibold text-emerald-600">
                  CONSUMER
                </p>
                <p className="font-bold text-slate-900 mt-1">Worker</p>
                <p className="text-xs text-slate-500 mt-1">Processes work</p>
              </div>
            </div>
          </div>

          {/* Core concepts */}
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <GitBranch className="w-4 h-4 text-indigo-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-indigo-600">
                    CONCEPT 01
                  </p>
                  <h3 className="font-bold text-slate-900">Decoupling</h3>
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-6">
                The producer does not need to wait for the consumer to finish
                processing the work. It can place the task into the queue and
                continue.
              </p>

              <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs text-slate-400 mb-2">WITHOUT A QUEUE</p>

                <p className="font-mono text-xs text-slate-700">
                  App → Email Service → wait → continue
                </p>
              </div>

              <div className="mt-3 rounded-xl bg-indigo-50 border border-indigo-100 p-4">
                <p className="text-xs text-indigo-500 mb-2">WITH A QUEUE</p>

                <p className="font-mono text-xs text-indigo-700">
                  App → Queue → continue
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-emerald-600">
                    CONCEPT 02
                  </p>
                  <h3 className="font-bold text-slate-900">Load Leveling</h3>
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-6">
                When requests arrive faster than they can be processed, the
                queue temporarily holds the work so consumers can process it at
                their available rate.
              </p>

              <div className="mt-5 flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  Incoming
                </span>

                <div className="flex gap-1 flex-1">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="h-7 flex-1 rounded-md bg-sky-100 border border-sky-200"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  Processed
                </span>

                <div className="flex gap-1 flex-1">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="h-7 flex-1 rounded-md bg-emerald-100 border border-emerald-200"
                    />
                  ))}

                  <div className="flex-1" />
                  <div className="flex-1" />
                  <div className="flex-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Mental model */}
          <div className="px-6 sm:px-8 py-6 bg-slate-50 border-t border-slate-200">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />

              <div>
                <p className="font-semibold text-slate-800">Mental model</p>

                <p className="text-sm text-slate-500 mt-1 leading-6">
                  A data-structure Queue manages the order of elements. A
                  system-level message queue applies the same idea to work
                  moving between producers and consumers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 5. Queue Variants */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Layers3 className="w-4 h-4" />
            Queue Variants
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            One Core Idea, Multiple Variants
          </h2>

          <p className="mt-3 max-w-3xl text-slate-500 leading-7">
            Standard queues follow FIFO, but different problems require
            different ways of controlling insertion, removal, or priority.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              title: "Circular Queue",
              tag: "Space Efficient",
              icon: CircleDot,
              color: "indigo",
              description:
                "The last position connects back to the first, allowing previously vacated array space to be reused.",
            },
            {
              title: "Deque",
              tag: "Two Ends",
              icon: ArrowLeft,
              color: "sky",
              description:
                "A double-ended queue allows insertion and removal from both the Front and Rear.",
            },
            {
              title: "Priority Queue",
              tag: "Priority Based",
              icon: Trophy,
              color: "violet",
              description:
                "Elements are removed according to priority rather than simply following arrival order.",
            },
          ].map((item) => {
            const Icon = item.icon;

            const styles = {
              indigo: {
                icon: "bg-indigo-50 text-indigo-600 border-indigo-100",
                tag: "bg-indigo-50 text-indigo-700",
              },
              sky: {
                icon: "bg-sky-50 text-sky-600 border-sky-100",
                tag: "bg-sky-50 text-sky-700",
              },
              violet: {
                icon: "bg-violet-50 text-violet-600 border-violet-100",
                tag: "bg-violet-50 text-violet-700",
              },
            }[item.color];

            return (
              <div
                key={item.title}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center ${styles.icon}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${styles.tag}`}
                  >
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-6">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-3">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      {/* Queue Implementations */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Braces className="w-4 h-4" />
            Implementation
          </div>

          <h2 className="text-3xl font-bold text-slate-950">Queue in Code</h2>

          <p className="mt-3 text-slate-500">
            The syntax changes between languages, but the Queue operations
            remain conceptually the same.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-slate-950 rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <p className="text-sm font-bold text-emerald-300">JavaScript</p>
            </div>

            <pre className="p-6 overflow-x-auto text-sm leading-7 text-slate-300 font-mono">
              {`let q = [];

q.push(10);   // Enqueue
q.push(20);

q.shift();    // Dequeue
`}
            </pre>

            <div className="px-6 pb-6">
              <p className="text-xs text-amber-300">
                Note: Array.shift() is O(n).
              </p>
            </div>
          </div>

          <div className="bg-slate-950 rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <p className="text-sm font-bold text-sky-300">C++</p>
            </div>

            <pre className="p-6 overflow-x-auto text-sm leading-7 text-slate-300 font-mono">
              {`queue<int> q;

q.push(10);   // Enqueue
q.push(20);

q.pop();      // Dequeue
`}
            </pre>

            <div className="px-6 pb-6">
              <p className="text-xs text-emerald-300">
                STL queue provides standard Queue operations.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 6. Circular Queue */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-7 sm:p-8">
            <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
              <CircleDot className="w-4 h-4" />
              Intermediate Concept
            </div>

            <h2 className="text-3xl font-bold text-slate-950">
              Circular Queue
            </h2>

            <p className="mt-3 max-w-3xl text-slate-500 leading-7">
              A circular queue connects the end of the array back to the
              beginning. This allows the implementation to reuse positions that
              became free after Dequeue operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 border-t border-slate-200">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-semibold text-slate-400 mb-4">
                THE PROBLEM
              </p>

              <div className="space-y-3">
                {[
                  "Rear reaches the end of the array.",
                  "Front has already moved forward.",
                  "There may still be unused positions at the beginning.",
                  "A normal linear implementation may incorrectly appear full.",
                ].map((text, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-md bg-red-50 text-red-600 text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>

                    <p className="text-sm text-slate-600 leading-6">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 p-7 sm:p-8">
              <p className="text-xs font-semibold text-slate-500 mb-4">
                THE WRAP-AROUND IDEA
              </p>

              <div className="grid grid-cols-6 gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className={`h-12 rounded-lg flex items-center justify-center text-sm font-bold border ${
                      index === 0 || index === 1
                        ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300"
                        : "bg-white/5 border-white/10 text-slate-400"
                    }`}
                  >
                    {index}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-slate-500 mb-2">WRAP FORMULA</p>

                <code className="text-indigo-300 text-sm">
                  rear = (rear + 1) % capacity;
                </code>
              </div>

              <p className="text-sm text-slate-400 mt-5 leading-6">
                The modulo operation brings the pointer back to index 0 when it
                reaches the end.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 7. BFS — Queue in Graphs */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Network className="w-4 h-4" />
            Queue + Graphs
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
            Why BFS Needs a Queue
          </h2>

          <p className="mt-3 max-w-3xl text-slate-500 leading-7">
            Breadth-First Search explores a graph level by level. A Queue
            naturally provides the FIFO ordering needed to process the current
            level before moving deeper.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
            <p className="text-xs font-semibold text-indigo-600">BFS FLOW</p>

            <div className="mt-6 space-y-3">
              {[
                ["01", "Start from a source node"],
                ["02", "Mark it visited"],
                ["03", "Push it into the Queue"],
                ["04", "Remove the Front node"],
                ["05", "Add its unvisited neighbors"],
                ["06", "Continue until the Queue is empty"],
              ].map(([number, text]) => (
                <div
                  key={number}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center">
                    {number}
                  </span>

                  <span className="text-sm text-slate-700">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 rounded-3xl p-7 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold text-slate-500">
                BFS QUEUE STATE
              </span>

              <span className="text-xs font-mono text-indigo-300">FIFO</span>
            </div>

            <div className="flex items-center gap-2 overflow-hidden">
              {["A", "B", "C", "D"].map((node, index) => (
                <div
                  key={node}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold border ${
                    index === 0
                      ? "bg-indigo-500/15 border-indigo-400/40 text-indigo-300"
                      : "bg-white/5 border-white/10 text-slate-300"
                  }`}
                >
                  {node}
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm text-slate-400 leading-6">
                The node at the Front is processed first. Newly discovered nodes
                join at the Rear, preserving level-by-level exploration.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-indigo-50 border border-indigo-100 p-5">
          <div className="flex gap-3">
            <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0" />

            <p className="text-sm text-indigo-900 leading-6">
              <strong>Pattern recognition:</strong> When a problem asks you to
              explore states level-by-level, think about BFS and ask whether a
              Queue can maintain the required order.
            </p>
          </div>
        </div>
      </section>
      {/* 8. Deque */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-sky-600 text-sm font-semibold mb-3">
            <ArrowLeft className="w-4 h-4" />
            Advanced Queue Variant
          </div>

          <h2 className="text-3xl font-bold text-slate-950">
            Deque — Double-Ended Queue
          </h2>

          <p className="mt-3 max-w-3xl text-slate-500 leading-7">
            A Deque allows insertion and removal from both ends. It gives you
            more control than a standard FIFO Queue and becomes especially
            useful in sliding-window problems.
          </p>

          <div className="mt-8 bg-slate-950 rounded-2xl p-6">
            <div className="flex items-center justify-between text-xs font-semibold mb-5">
              <span className="text-emerald-400">FRONT</span>
              <span className="text-sky-400">REAR</span>
            </div>

            <div className="flex gap-2 max-w-2xl mx-auto">
              {[10, 20, 30, 40].map((value) => (
                <div
                  key={value}
                  className="flex-1 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 font-bold"
                >
                  {value}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5 max-w-2xl mx-auto">
              <div className="text-center text-xs text-slate-400">
                add / remove ←
              </div>

              <div className="text-center text-xs text-slate-400">
                → add / remove
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {["push_front", "pop_front", "push_back", "pop_back"].map(
              (operation) => (
                <div
                  key={operation}
                  className="rounded-xl bg-slate-50 border border-slate-200 p-4"
                >
                  <code className="text-sm text-slate-700">{operation}()</code>

                  <p className="text-xs text-slate-400 mt-2">End operation</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
      {/* 9. Priority Queue */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-violet-600 text-sm font-semibold mb-3">
              <Trophy className="w-4 h-4" />
              Priority-Based Processing
            </div>

            <h2 className="text-3xl font-bold text-slate-950">
              Priority Queue
            </h2>

            <p className="mt-3 text-slate-500 leading-7">
              Unlike a standard Queue, the next element is selected according to
              priority rather than simply according to arrival order.
            </p>

            <div className="mt-6 space-y-3">
              {[
                ["Task A", "Low", "text-slate-500"],
                ["Task B", "High", "text-red-600"],
                ["Task C", "Medium", "text-amber-600"],
              ].map(([task, priority, color]) => (
                <div
                  key={task}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <span className="font-semibold text-slate-700">{task}</span>

                  <span className={`text-xs font-bold ${color}`}>
                    {priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 rounded-3xl p-7 sm:p-8">
            <p className="text-xs font-semibold text-slate-500">
              KEY DIFFERENCE
            </p>

            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-500">Standard Queue</p>

                <p className="text-white font-semibold mt-1">
                  Arrival order decides removal.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-400/20">
                <p className="text-xs text-violet-300">Priority Queue</p>

                <p className="text-white font-semibold mt-1">
                  Priority decides removal.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 mt-6 leading-6">
              Priority queues are commonly associated with heap-based
              implementations and appear in scheduling and graph algorithms.
            </p>
          </div>
        </div>
      </section>
      {/* 10. Monotonic Queue */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-7 sm:p-8">
            <div className="flex items-center gap-2 text-pink-600 text-sm font-semibold mb-3">
              <Target className="w-4 h-4" />
              Interview Pattern
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
              Monotonic Queue
            </h2>

            <p className="mt-3 max-w-3xl text-slate-500 leading-7">
              A monotonic queue maintains elements in a chosen increasing or
              decreasing order. This turns certain sliding-window problems into
              efficient linear-time solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 border-t border-slate-200">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-semibold text-slate-400 mb-5">
                DECREASING ORDER EXAMPLE
              </p>

              <div className="flex items-end gap-3">
                {[9, 7, 5, 3].map((value) => (
                  <div key={value} className="flex flex-col items-center gap-2">
                    <div
                      className="w-14 rounded-lg bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-700 font-bold"
                      style={{ height: `${value * 5}px` }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-slate-500 mt-6 leading-6">
                The front contains the candidate needed for the current window.
                Smaller values can be removed from the back when a larger value
                arrives.
              </p>
            </div>

            <div className="bg-slate-950 p-7 sm:p-8">
              <p className="text-xs font-semibold text-slate-500 mb-5">
                SLIDING WINDOW MAXIMUM
              </p>

              <div className="space-y-3 font-mono text-sm">
                <div className="p-3 rounded-lg bg-white/5 text-slate-300">
                  nums[i] enters
                </div>

                <div className="text-center text-slate-600">↓</div>

                <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-400/20 text-pink-300">
                  Remove smaller elements from back
                </div>

                <div className="text-center text-slate-600">↓</div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/20 text-emerald-300">
                  Front = current maximum
                </div>
              </div>

              <p className="text-sm text-slate-400 mt-6 leading-6">
                Each element enters and leaves the deque at most once, giving
                the common O(n) solution pattern.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 11. Complexity */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Zap className="w-4 h-4" />
            Performance
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
            Queue Complexity
          </h2>

          <p className="mt-3 text-slate-500">
            Know the cost of every fundamental operation before moving to
            implementation questions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              operation: "Enqueue",
              complexity: "O(1)",
              explanation: "Add an element at the Rear.",
            },
            {
              operation: "Dequeue",
              complexity: "O(1)",
              explanation: "Remove the element from the Front.",
            },
            {
              operation: "Peek / Front",
              complexity: "O(1)",
              explanation: "Read the first element without removing it.",
            },
          ].map((item) => (
            <div
              key={item.operation}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-500">
                {item.operation}
              </p>

              <p className="text-3xl font-black text-emerald-600 mt-3 font-mono">
                {item.complexity}
              </p>

              <p className="text-sm text-slate-500 mt-3 leading-6">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 bg-slate-950 rounded-3xl p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <Cpu className="w-5 h-5 text-indigo-300 mt-0.5" />

            <div>
              <p className="font-semibold text-white">
                Complexity mental model
              </p>

              <p className="text-sm text-slate-400 mt-2 leading-6">
                A well-designed Queue does not shift every remaining element
                when removing the Front. The implementation should maintain
                enough information to make Front and Rear operations efficient.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 12. Common Mistakes */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-red-600 text-sm font-semibold mb-3">
            <AlertTriangle className="w-4 h-4" />
            Interview Preparation
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
            Common Queue Mistakes
          </h2>

          <p className="mt-3 text-slate-500">
            These are the details that often separate a memorized definition
            from a real understanding of the data structure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              title: "Confusing Front and Rear",
              text: "Insertion happens at the Rear while removal happens at the Front in a standard Queue.",
            },
            {
              title: "Using shift() blindly",
              text: "In JavaScript, shift() is O(n), so it may not provide the expected Queue performance.",
            },
            {
              title: "Ignoring Empty Queue",
              text: "Always consider what happens when Dequeue or Peek is attempted on an empty Queue.",
            },
            {
              title: "Ignoring Circular Reuse",
              text: "Array-based queues can waste previously freed positions if the implementation does not reuse space.",
            },
            {
              title: "Mixing Queue and Stack",
              text: "Stack follows LIFO while Queue follows FIFO. Their ordering rules are fundamentally different.",
            },
            {
              title: "Knowing BFS but not why",
              text: "Don't just memorize BFS code. Understand that FIFO ordering is what produces level-by-level traversal.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>

                  <p className="text-sm text-slate-500 mt-2 leading-6">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <div className="flex gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />

            <p className="text-sm text-amber-900 leading-6">
              <strong>Interview habit:</strong> Before writing code, state what
              enters where, what leaves where, and what data structure
              guarantees that ordering.
            </p>
          </div>
        </div>
      </section>
      {/* 13. Problem-Solving Patterns */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Target className="w-4 h-4" />
            Problem-Solving Patterns
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
            How to Recognize Queue Problems
          </h2>

          <p className="mt-3 max-w-3xl text-slate-500 leading-7">
            Instead of memorizing individual problems, learn to identify the
            situations where Queue-based thinking naturally fits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Level-by-Level Processing",
              clue: "Explore states one layer at a time.",
              structure: "BFS / Queue",
            },
            {
              title: "First-Come Processing",
              clue: "Earlier work must be processed first.",
              structure: "FIFO Queue",
            },
            {
              title: "Sliding Window",
              clue: "Maintain candidates while a window moves.",
              structure: "Deque / Monotonic Queue",
            },
            {
              title: "Task Scheduling",
              clue: "Work arrives and waits for processing.",
              structure: "Queue",
            },
            {
              title: "Multiple Priorities",
              clue: "Some work must be processed before other work.",
              structure: "Priority Queue",
            },
            {
              title: "Reusable Array Space",
              clue: "Front moves while the backing array remains fixed.",
              structure: "Circular Queue",
            },
          ].map((pattern) => (
            <div
              key={pattern.title}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              <p className="text-xs font-semibold text-indigo-600">
                {pattern.structure}
              </p>

              <h3 className="text-lg font-bold text-slate-900 mt-2">
                {pattern.title}
              </h3>

              <p className="text-sm text-slate-500 mt-3 leading-6">
                {pattern.clue}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-slate-950 rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-semibold text-indigo-300">
            QUICK DECISION GUIDE
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mt-5">
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-white font-semibold">FIFO?</p>
              <p className="text-sm text-slate-400 mt-1">Think Queue.</p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-white font-semibold">Level order?</p>
              <p className="text-sm text-slate-400 mt-1">Think BFS + Queue.</p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-white font-semibold">Window maximum?</p>
              <p className="text-sm text-slate-400 mt-1">
                Think Monotonic Deque.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 14. Mastery Roadmap */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
            <Trophy className="w-4 h-4" />
            Practice Roadmap
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
            From Beginner to Advanced
          </h2>

          <p className="mt-3 max-w-3xl text-slate-500 leading-7">
            Start with implementation and basic operations, then move toward
            graph traversal, scheduling, sliding windows, and advanced Queue
            design problems.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-xs font-semibold text-emerald-600">STAGE 01</p>
            <h3 className="font-bold text-slate-900 mt-1">Foundation</h3>
            <p className="text-xs text-slate-500 mt-2">
              Understand Queue operations and implementations.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-xs font-semibold text-amber-600">STAGE 02</p>
            <h3 className="font-bold text-slate-900 mt-1">Patterns</h3>
            <p className="text-xs text-slate-500 mt-2">
              Apply Queue variants and problem-solving techniques.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-xs font-semibold text-violet-600">STAGE 03</p>
            <h3 className="font-bold text-slate-900 mt-1">Advanced</h3>
            <p className="text-xs text-slate-500 mt-2">
              Combine queues with graphs and complex algorithms.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {Object.entries(problems).map(([level, qs], idx) => {
            const config = [
              {
                label: "LEVEL 01",
                icon: CheckCircle2,
                classes: {
                  header: "bg-emerald-50/60 border-emerald-100",
                  label: "text-emerald-600",
                  icon: "bg-white border-emerald-100 text-emerald-600",
                  number: "bg-emerald-50 text-emerald-700",
                },
              },
              {
                label: "LEVEL 02",
                icon: Target,
                classes: {
                  header: "bg-amber-50/60 border-amber-100",
                  label: "text-amber-600",
                  icon: "bg-white border-amber-100 text-amber-600",
                  number: "bg-amber-50 text-amber-700",
                },
              },
              {
                label: "LEVEL 03",
                icon: Trophy,
                classes: {
                  header: "bg-violet-50/60 border-violet-100",
                  label: "text-violet-600",
                  icon: "bg-white border-violet-100 text-violet-600",
                  number: "bg-violet-50 text-violet-700",
                },
              },
            ][idx];

            const Icon = config.icon;

            return (
              <div
                key={level}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm"
              >
                <div className={`px-6 py-5 border-b ${config.classes.header}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-xs font-semibold ${config.classes.label}`}
                      >
                        {config.label}
                      </p>

                      <h3 className="text-xl font-bold text-slate-900 capitalize mt-1">
                        {level}
                      </h3>
                    </div>

                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center ${config.classes.icon}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  {qs.map((question, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${config.classes.number}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm text-slate-700 leading-5">
                        {question}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-slate-950 rounded-3xl p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />

            <div>
              <p className="font-semibold text-white">How to practice</p>

              <p className="text-sm text-slate-400 mt-2 leading-6">
                Don't rush directly to Hard problems. First make Enqueue,
                Dequeue, Front/Rear handling, Circular Queue, BFS, and Deque
                behavior comfortable. Then use harder problems to test whether
                you can recognize the underlying pattern.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 15. Queue Visualizer */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 sm:px-10 py-10 sm:py-12">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 mb-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Queue Fundamentals Complete
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Ready to visualize Enqueue and Dequeue?
              </h2>

              <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl leading-6">
                Take everything you've learned into the interactive Queue
                visualizer and watch Front, Rear, Enqueue, and Dequeue
                operations happen step by step.
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
                  FIFO
                </span>

                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
                  Front
                </span>

                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
                  Rear
                </span>

                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
                  Enqueue / Dequeue
                </span>
              </div>
            </div>

            <button
              onClick={() => (window.location.href = "/visualizer/queue")}
              className="group shrink-0 inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-indigo-950/20"
            >
              Open Queue Visualizer
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QueuePage;
