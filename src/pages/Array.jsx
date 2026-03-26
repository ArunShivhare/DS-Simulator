import React from "react";

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

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-24 font-sans">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-blue-400 to-green-400">
          Arrays & Vectors 📦
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          The ultimate guide to linear data structures, from hardware memory to
          expert patterns.
        </p>
      </div>

      {/* Structural Overview */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-purple-400 text-center">
          Types of Arrays
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-2xl hover:bg-gray-800 transition">
            <h3 className="font-bold mb-2 text-purple-300">1D Array</h3>
            <p className="text-sm text-gray-400">
              Linear collection: [10, 20, 30]. Simplest form of data storage.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-2xl hover:bg-gray-800 transition">
            <h3 className="font-bold mb-2 text-blue-300">2D Array / Matrix</h3>
            <p className="text-sm text-gray-400">
              Grid structure (Rows & Columns). Essential for images and graphs.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-2xl hover:bg-gray-800 transition">
            <h3 className="font-bold mb-2 text-green-300">Dynamic Array</h3>
            <p className="text-sm text-gray-400">
              Resizable containers like Vectors (C++) or ArrayLists (Java).
            </p>
          </div>
        </div>
      </div>

      {/* Hardware Deep Dive (NEW) */}
      <div className="max-w-5xl mx-auto mb-20">
        <div className="bg-blue-900/10 border border-blue-500/30 p-8 rounded-3xl">
          <h2 className="text-3xl font-bold mb-4 text-blue-300 flex items-center gap-3">
            🚀 Why Arrays Rule: Cache Locality
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="text-gray-300 space-y-4">
              <p>
                Unlike Linked Lists, arrays store data in{" "}
                <strong>contiguous blocks</strong>. This triggers
                <span className="text-blue-400 font-semibold">
                  {" "}
                  Spatial Locality
                </span>
                .
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                <li>
                  When the CPU fetches <code>arr[0]</code>, it also grabs{" "}
                  <code>arr[1..7]</code> into the **L1 Cache**.
                </li>
                <li>
                  Accessing the next element results in a{" "}
                  <strong>Cache Hit</strong> (nanoseconds).
                </li>
                <li>
                  This is why iterating through an array is often 10x faster
                  than a Linked List.
                </li>
              </ul>
            </div>
            <div className="bg-black/50 p-6 rounded-2xl font-mono text-sm border border-gray-700">
              <div className="text-gray-500 mb-2">
                // Hardware Visualization
              </div>
              <div className="flex gap-1">
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                  1
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                  2
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                  3
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                  4
                </div>
                <div className="w-10 h-10 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <p className="mt-4 text-xs text-blue-400">
                Fetched in one "Cache Line" (usually 64 bytes)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Static vs Dynamic Comparison */}
     <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        {/* Static Array Section */}
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Static Array</h2>
          <p className="text-gray-300 mb-4">
            A collection of elements stored in <span className="text-purple-300">contiguous memory</span>. 
            The size is determined at compile-time and cannot be changed.
          </p>
           <p className="text-sm text-gray-300 mb-4 font-mono">
            int arr[5]; // Fixed size
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center">✅ Low memory overhead</li>
            <li className="flex items-center">✅ Predictable performance</li>
            <li className="flex items-center text-red-400">❌ Fixed capacity (Risk of overflow)</li>
          </ul>
        </div>

        {/* Vector Section */}
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Vector (Dynamic)</h2>
          <p className="text-gray-300 mb-4">
            A wrapper around a static array that <span className="text-blue-300">automatically resizes</span> itself 
            when it runs out of space, typically doubling in capacity.
          </p>
          <p className="text-sm text-gray-300 mb-4 font-mono">
            vector&lt;int&gt; v; // Resizable
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center">✅ Flexible sizing</li>
            <li className="flex items-center">✅ Amortized O(1) insertions</li>
            <li className="flex items-center text-red-400">❌ Higher memory usage (Overhead)</li>
          </ul>
        </div>
      </div>
            <div className="max-w-5xl mx-auto my-15 grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-green-900/20 border border-green-900/50 rounded-xl">
          <h3 className="text-lg font-bold text-green-400 mb-2">Use Arrays When:</h3>
          <ul className="list-disc pl-5 text-sm text-gray-300">
            <li>The dataset size is known and fixed.</li>
            <li>Memory is extremely constrained (Embedded systems).</li>
            <li>You need maximum performance with zero overhead.</li>
          </ul>
        </div>
        <div className="p-6 bg-blue-900/20 border border-blue-900/50 rounded-xl">
          <h3 className="text-lg font-bold text-blue-400 mb-2">Use Vectors When:</h3>
          <ul className="list-disc pl-5 text-sm text-gray-300">
            <li>The number of elements is dynamic or unknown.</li>
            <li>Ease of use (built-in methods) is a priority.</li>
            <li>You are working in high-level app development.</li>
          </ul>
        </div>
      </div>

      {/* Mechanics: How it Grows */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-gray-900/60 border border-purple-500/20 p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-blue-400">⚙️</span> Growth Mechanism (The 2x
            Rule)
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-gray-300">
              <p>
                When a Vector reaches its <strong>Capacity</strong>:
              </p>
              <ul className="list-decimal pl-5 space-y-2 text-sm">
                <li>
                  A new memory block{" "}
                  <span className="text-blue-400">twice the size</span> is
                  reserved.
                </li>
                <li>
                  Existing elements are{" "}
                  <span className="text-purple-400">copied</span> to the new
                  block.
                </li>
                <li>The old pointer is deleted to prevent memory leaks.</li>
                <li>
                  This results in{" "}
                  <span className="text-green-400 italic">Amortized O(1)</span>{" "}
                  time.
                </li>
              </ul>
            </div>
            <div className="bg-black/40 p-4 rounded-lg font-mono text-xs text-green-400 border border-gray-700">
              <p>// Resize Simulation</p>
              <p>Capacity 2 → [1, 2]</p>
              <p className="text-yellow-500">Pushing 3... (Resize!)</p>
              <p>Capacity 4 → [1, 2, 3, _]</p>
            </div>
          </div>
        </div>
      </div>

      {/* Complexity Matrix */}
      <div className="max-w-5xl mx-auto mb-16 overflow-hidden rounded-xl border border-gray-700 bg-gray-800/20">
        <table className="w-full text-left">
          <thead className="bg-gray-800/80 text-gray-400 text-sm">
            <tr>
              <th className="p-4">Operation</th>
              <th className="p-4">Time Complexity</th>
              <th className="p-4">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
            <tr>
              <td className="p-4 font-mono text-purple-400">Access</td>
              <td className="p-4 text-green-400 font-bold">O(1)</td>
              <td>Instant via index offset</td>
            </tr>
            <tr>
              <td className="p-4 font-mono text-purple-400">Push Back</td>
              <td className="p-4 text-yellow-400 font-bold">Amortized O(1)</td>
              <td>Rare O(n) when resizing</td>
            </tr>
            <tr>
              <td className="p-4 font-mono text-purple-400">Insert/Delete</td>
              <td className="p-4 text-red-400 font-bold">O(n)</td>
              <td>Must shift elements manually</td>
            </tr>
            <tr>
              <td className="p-4 font-mono text-purple-400">Binary Search</td>
              <td className="p-4 text-blue-400 font-bold">O(log n)</td>
              <td>Only works on sorted arrays</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Language Snippets (NEW) */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl text-center font-bold mb-6 text-yellow-400">
          Language Specifics
        </h2>
        <div className="grid md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="bg-black/40 p-5 rounded-xl border border-gray-700">
            <p className="text-gray-500 mb-2">// C++ STL</p>
            <p className="text-blue-400">
              vector&lt;int&gt; v = &#123;1, 2&#125;;
            </p>
            <p>v.push_back(3);</p>
          </div>
          <div className="bg-black/40 p-5 rounded-xl border border-gray-700">
            <p className="text-gray-500 mb-2">// Java ArrayList</p>
            <p className="text-purple-400">
              List&lt;Integer&gt; l = new ArrayList&lt;&gt;();
            </p>
            <p>l.add(1);</p>
          </div>
          <div className="bg-black/40 p-5 rounded-xl border border-gray-700">
            <p className="text-gray-500 mb-2">// Python List</p>
            <p className="text-green-400">arr = [1, 2]</p>
            <p>arr.append(3)</p>
          </div>
        </div>
      </div>

      {/* Solving Patterns (NEW) */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl text-center font-bold mb-8 text-purple-400">
          Essential Solving Patterns
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Two Pointers",
              desc: "Use for sorted arrays to find pairs or triplets.",
              icon: "↔️",
            },
            {
              title: "Sliding Window",
              desc: "Best for contiguous subarrays or substrings.",
              icon: "🪟",
            },
            {
              title: "Prefix Sum",
              desc: "Precompute sums for lightning-fast range queries.",
              icon: "➕",
            },
            {
              title: "Dutch Flag",
              desc: "Optimized 3-way partitioning (e.g., sorting 0, 1, 2).",
              icon: "🇳🇱",
            },
          ].map((pattern, idx) => (
            <div
              key={idx}
              className="p-5 bg-gray-800/40 border border-gray-700 rounded-2xl hover:border-purple-500/50 transition text-center"
            >
              <div className="text-2xl mb-2">{pattern.icon}</div>
              <h4 className="font-bold mb-1">{pattern.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {pattern.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Roadmap */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-orange-500">
          The 30-Day Practice Roadmap 🎯
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Easy */}
          <div className="bg-gray-800/30 border border-green-500/20 rounded-2xl p-6 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition">
            <h3 className="text-green-400 font-bold mb-4 flex items-center justify-between">
              Easy <span>10 Qs</span>
            </h3>
            <ul className="text-xs space-y-3 text-gray-400">
              {problems.easy.map((q, i) => (
                <li
                  key={i}
                  className="hover:text-white transition cursor-default flex gap-2"
                >
                  <span className="opacity-40">{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
          {/* Medium */}
          <div className="bg-gray-800/30 border border-yellow-500/20 rounded-2xl p-6 hover:shadow-[0_0_15px_rgba(234,179,8,0.1)] transition">
            <h3 className="text-yellow-400 font-bold mb-4 flex items-center justify-between">
              Medium <span>10 Qs</span>
            </h3>
            <ul className="text-xs space-y-3 text-gray-400">
              {problems.medium.map((q, i) => (
                <li
                  key={i}
                  className="hover:text-white transition cursor-default flex gap-2"
                >
                  <span className="opacity-40">{i + 11}.</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
          {/* Hard */}
          <div className="bg-gray-800/30 border border-red-500/20 rounded-2xl p-6 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition">
            <h3 className="text-red-400 font-bold mb-4 flex items-center justify-between">
              Hard <span>10 Qs</span>
            </h3>
            <ul className="text-xs space-y-3 text-gray-400">
              {problems.hard.map((q, i) => (
                <li
                  key={i}
                  className="hover:text-white transition cursor-default flex gap-2"
                >
                  <span className="opacity-40">{i + 21}.</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interview "Trap" Questions */}
      <div className="max-w-5xl mx-auto mb-20 bg-orange-950/20 border border-orange-500/20 p-8 rounded-2xl">
        <h3 className="text-orange-400 font-bold mb-4">
          ⚠️ Common Interview Pitfalls
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-400">
          <p>
            • <strong>The "0-index" why:</strong> It's actually a memory offset
            from the start address. <code>base_addr + (index * size)</code>.
          </p>
          <p>
            • <strong>Shrinking:</strong> Most vectors grow automatically, but
            they rarely shrink memory automatically to avoid "thrashing."
          </p>
        </div>
      </div>

      {/* Final Insights */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16 opacity-80">
        <div className="p-6 border-l-4 border-yellow-500 bg-yellow-500/5 rounded-r-xl">
          <h4 className="font-bold text-yellow-500 mb-1 italic">Pro Tip:</h4>
          <p className="text-xs text-gray-400">
            Always check if the array is sorted. If it is, Binary Search (O(log
            n)) should be your first thought.
          </p>
        </div>
        <div className="p-6 border-l-4 border-pink-500 bg-pink-500/5 rounded-r-xl">
          <h4 className="font-bold text-pink-500 mb-1 italic">
            Interview Trap:
          </h4>
          <p className="text-xs text-gray-400">
            Remember that "Accessing" an element is O(1), but "Searching" for a
            value is O(n) unless sorted.
          </p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-500 mb-6 text-sm italic">
          Ready to see it in action?
        </p>
        <button
         onClick={() => (window.location.href = "/visualizer/array")}
         className="px-10 py-5 cursor-pointer bg-linear-to-r from-purple-500 to-indigo-500 font-black text-xl rounded-2xl shadow-xl hover:shadow-purple-500/20 transition-all active:scale-95">
          OPEN VISUALIZER 🚀
        </button>
      </div>
    </div>
  );
};

export default ArrayPage;
