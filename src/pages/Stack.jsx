import React from "react";
import { useEffect } from "react";
import { auth } from "../firebase";

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
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-24 font-sans selection:bg-blue-500/30">
      {/* 1. Header */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-6xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
          Stack Data Structure 📚
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          The "Last-In-First-Out" (LIFO) powerhouse used in recursion,
          compilers, and undo-redo systems.
        </p>
      </div>

      {/* 2. Core Principle & Visual */}
      <div className="max-w-6xl mx-auto mb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-500/20 pb-2 inline-block">
            The LIFO Principle
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            A Stack is a linear structure where all insertions and deletions are
            restricted to
            <strong> one end only</strong>, called the{" "}
            <span className="text-blue-400 font-bold">Top</span>.
          </p>
          <div className="bg-blue-900/10 border border-blue-500/20 p-6 rounded-2xl">
            <h4 className="text-blue-300 font-bold mb-2 text-lg">
              Real-World Analogy:
            </h4>
            <p className="text-gray-400 text-lg italic">
              "A stack of dinner plates or browser history. The last page you
              visit is the first one you leave when clicking 'Back'."
            </p>
          </div>
        </div>

        {/* Dynamic Stack Visual */}
        <div className="flex flex-col items-center">
          {/* The Container (Beaker) */}
          <div className="w-48 border-x-4 border-b-4 border-gray-600 rounded-b-3xl p-4 flex flex-col gap-3 bg-gray-800/30 shadow-2xl relative">
            {/* Label for TOP */}
            <div className="absolute -left-16 top-6 text-blue-400 font-mono font-bold text-lg animate-bounce">
              TOP →
            </div>

            {/* 
        We reverse the array [10, 20, 30] so 30 is rendered first (at the top).
        i === 0 now refers to the top-most element (30).
    */}
            {[30, 20, 10].map((val, i) => (
              <div
                key={i}
                className={`h-14 w-full rounded-xl flex items-center justify-center font-black text-2xl shadow-lg transition-transform hover:scale-105 
          ${
            i === 0
              ? "bg-linear-to-r from-blue-500 to-purple-500 ring-2 ring-blue-300"
              : "bg-gray-700 text-gray-400 opacity-80"
          }`}
              >
                {val}
              </div>
            ))}
          </div>

          {/* Bottom Label */}
          <p className="mt-6 text-gray-500 font-mono font-bold text-lg uppercase tracking-widest">
            Bottom of Stack
          </p>
        </div>
      </div>

      {/* 3. The "Hidden" Section: The Call Stack & Recursion (NEW) */}
      <div className="max-w-6xl mx-auto mb-24 bg-blue-900/10 border border-blue-500/30 p-10 rounded-3xl">
        <h2 className="text-3xl font-bold mb-6 text-blue-300">
          ⚙️ Systems Deep Dive: The Call Stack
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 text-lg text-gray-300">
            <p>
              Every time you call a function, the computer uses an internal{" "}
              <strong>Call Stack</strong> to remember where to return.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-base text-gray-400">
              <li>
                <strong>Stack Frame:</strong> Stores local variables,
                parameters, and return addresses.
              </li>
              <li>
                <strong>Recursion:</strong> Each recursive call pushes a new
                frame. Once the base case hits, frames "pop" back.
              </li>
              <li>
                <strong className="text-red-400">Stack Overflow:</strong> Occurs
                when too many functions are called (e.g., infinite recursion),
                filling up the allocated memory.
              </li>
            </ul>
          </div>
          <div className="bg-black/40 p-6 rounded-2xl border border-gray-700 font-mono text-sm leading-relaxed">
            <p className="text-gray-500 mb-2">
              // How Recursion Looks In Memory
            </p>
            <div className="space-y-1">
              <div className="bg-blue-600/30 p-2 border-l-4 border-blue-500">
                factorial(1) // Base Case (Pops)
              </div>
              <div className="bg-blue-700/30 p-2 border-l-4 border-blue-500 opacity-80">
                factorial(2)
              </div>
              <div className="bg-blue-800/30 p-2 border-l-4 border-blue-500 opacity-60">
                factorial(3)
              </div>
              <div className="bg-blue-900/30 p-2 border-l-4 border-blue-500 opacity-40 italic text-gray-500">
                ...Main Loop...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Comparison: Array vs Linked List Stack (NEW) */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-bold mb-8 text-green-400">
          Implementation Strategies
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-gray-800/40 p-8 rounded-3xl border border-gray-700">
            <h3 className="text-2xl font-bold text-gray-100 mb-4">
              Array Implementation
            </h3>
            <p className="text-gray-400 mb-4 text-base">
              Uses contiguous memory. Fast but can overflow if size is fixed.
            </p>
            <ul className="text-sm space-y-2 text-gray-500">
              <li>✅ Faster access due to cache locality.</li>
              <li>❌ Fixed capacity (Overflow risk).</li>
              <li>❌ Resizing is expensive (O(n)).</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 p-8 rounded-3xl border border-gray-700">
            <h3 className="text-2xl font-bold text-gray-100 mb-4">
              Linked List Implementation
            </h3>
            <p className="text-gray-400 mb-4 text-base">
              Dynamic growth. Each element is a node with a pointer.
            </p>
            <ul className="text-sm space-y-2 text-gray-500">
              <li>✅ Truly dynamic size (No overflow).</li>
              <li>✅ Efficient memory usage (only uses what's needed).</li>
              <li>❌ Extra memory per node for pointers.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Complexity Matrix */}
      <div className="max-w-6xl mx-auto mb-24 overflow-x-auto rounded-3xl border border-gray-700 bg-gray-800/20 shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-gray-800/80 text-gray-400 text-lg uppercase tracking-widest">
            <tr>
              <th className="p-8">Operation</th>
              <th className="p-8">Description</th>
              <th className="p-8">Complexity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-xl text-gray-300">
            <tr className="hover:bg-blue-500/5 transition">
              <td className="p-8 font-mono text-blue-400 font-bold text-2xl">
                Push(x)
              </td>
              <td className="p-8">Add to Top</td>
              <td className="p-8 text-green-400 font-bold">O(1)</td>
            </tr>
            <tr className="hover:bg-blue-500/5 transition">
              <td className="p-8 font-mono text-blue-400 font-bold text-2xl">
                Pop()
              </td>
              <td className="p-8">Remove Top</td>
              <td className="p-8 text-green-400 font-bold">O(1)</td>
            </tr>
            <tr className="hover:bg-blue-500/5 transition">
              <td className="p-8 font-mono text-blue-400 font-bold text-2xl">
                Peek/Top
              </td>
              <td className="p-8">View Top</td>
              <td className="p-8 text-green-400 font-bold">O(1)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 6. Interview "Trap" Corner (NEW) */}
      <div className="max-w-6xl mx-auto mb-24 bg-red-950/20 border border-red-500/20 p-10 rounded-3xl">
        <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
          ⚠️ Interview Pitfalls to Avoid
        </h3>
        <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-300">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Underflow Check:</strong> Always check{" "}
              <code>isEmpty()</code> before calling <code>pop()</code> or{" "}
              <code>peek()</code>.
            </li>
            <li>
              <strong>Space Complexity:</strong> Remember that recursive calls
              use memory on the internal stack (O(Depth)).
            </li>
          </ul>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Random Access:</strong> Stacks do <strong>not</strong>{" "}
              support O(1) access to middle elements.
            </li>
            <li>
              <strong>Null Pointer:</strong> Be careful of "Null Pointer
              Exceptions" when implementing with Linked Lists.
            </li>
          </ul>
        </div>
      </div>

      {/* 7. Practice Roadmap */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-4xl font-black mb-12 text-center bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-orange-500 uppercase tracking-tighter">
          Mastery Roadmap 🎯
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(problems).map(([level, qs], idx) => (
            <div
              key={level}
              className={`bg-gray-800/40 border border-${idx === 0 ? "green" : idx === 1 ? "yellow" : "red"}-500/20 rounded-3xl p-10 hover:shadow-2xl transition`}
            >
              <h3
                className={`capitalize text-3xl font-bold mb-8 text-${idx === 0 ? "green" : idx === 1 ? "yellow" : "red"}-400 flex justify-between items-center`}
              >
                {level}{" "}
                <span className="text-sm bg-white/5 px-3 py-1 rounded-full opacity-60">
                  10 Qs
                </span>
              </h3>
              <ul className="space-y-5 text-lg md:text-xl text-gray-400">
                {qs.map((q, i) => (
                  <li
                    key={i}
                    className="hover:text-white transition cursor-default flex gap-3 items-start leading-tight"
                  >
                    <span className="opacity-30 font-mono text-base">
                      {i + 1}.
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 8. CTA */}
      <div className="text-center">
        <p className="text-gray-500 mb-8 text-xl italic tracking-wide">
          Ready to visualize Push and Pop operations?
        </p>
        <button
          onClick={() => (window.location.href = "/visualizer/stack")}
          className="px-20 py-8 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-3xl font-black text-3xl hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all transform hover:scale-105 active:scale-95"
        >
          OPEN STACK VISUALIZER 🚀
        </button>
      </div>
    </div>
  );
};

export default StackPage;
