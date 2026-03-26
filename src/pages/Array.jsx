import React from 'react';

const ArrayPage = () => {
  const problems = {
    easy: ["Find Maximum Element", "Reverse an Array", "Check if Sorted", "Find Missing Number", "Remove Duplicates", "Linear Search", "Count Occurrences", "Move Zeros to End", "Find Second Largest", "Array Sum"],
    medium: ["Rotate Array by K", "Two Sum (Sorted)", "Kadane's Algorithm", "Next Permutation", "Dutch National Flag", "Maximum Subarray Product", "Rearrange Pos/Neg", "Longest Consecutive Sequence", "Subarray Sum Equals K", "Merge Sorted Arrays"],
    hard: ["Median of Two Sorted Arrays", "Rain Water Trapping", "Largest Rectangle in Histogram", "Reverse Nodes in K-Group", "Maximum Path Sum", "Count Inversions", "Sliding Window Maximum", "First Missing Positive", "Minimum Window Substring", "Burst Balloons"]
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-24 font-sans">
      
      {/* 1. Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-blue-400 to-green-400">
          Arrays & Vectors 📦
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          The ultimate guide to linear data structures, from hardware memory to expert patterns.
        </p>
      </div>

      {/* 2. Structural Overview */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-purple-400">Structural Overview</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl hover:bg-gray-800 transition">
            <h3 className="font-bold mb-2 text-purple-300">1D Array</h3>
            <p className="text-sm text-gray-400">Linear collection in contiguous memory. Best for simple lists.</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl hover:bg-gray-800 transition">
            <h3 className="font-bold mb-2 text-blue-300">2D Array</h3>
            <p className="text-sm text-gray-400">Matrix structure (rows/cols). Used for grids, images, and maps.</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-xl hover:bg-gray-800 transition">
            <h3 className="font-bold mb-2 text-green-300">Dynamic (Vector)</h3>
            <p className="text-sm text-gray-400">Resizable container that handles memory allocation automatically.</p>
          </div>
        </div>
      </div>

      {/* 3. Hardware Deep Dive (NEW) */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-blue-900/10 border border-blue-500/30 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-300 flex items-center gap-3">
            🚀 Why Arrays Rule: Cache Locality
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="text-gray-300 space-y-4">
              <p className="text-sm">
                Unlike Linked Lists, arrays store data in <strong>contiguous blocks</strong>. This triggers 
                <span className="text-blue-400 font-semibold"> Spatial Locality</span>.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-gray-400">
                <li>CPU fetches one element and pre-loads the next few into the <strong>L1 Cache</strong>.</li>
                <li>Accessing <code>arr[i+1]</code> is nearly instant (Cache Hit).</li>
                <li>This hardware optimization makes arrays significantly faster for traversal.</li>
              </ul>
            </div>
            <div className="bg-black/50 p-6 rounded-2xl font-mono text-sm border border-gray-700">
              <div className="text-gray-500 mb-2 text-xs">// Memory Layout</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(v => <div key={v} className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">{v}</div>)}
                <div className="w-10 h-10 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <p className="mt-4 text-[10px] text-blue-400">Fetched in one "Cache Line" (64 bytes)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Static vs Dynamic Comparison */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700">
          <h2 className="text-xl font-bold text-purple-400 mb-4">Static Array</h2>
          <p className="text-sm text-gray-300 mb-4 font-mono">int arr[5]; // Fixed size</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>✅ Zero memory overhead</li>
            <li>✅ Allocated on Stack (faster)</li>
            <li>❌ Size must be known at compile time</li>
          </ul>
        </div>
        <div className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700">
          <h2 className="text-xl font-bold text-blue-400 mb-4">Vector / Dynamic</h2>
          <p className="text-sm text-gray-300 mb-4 font-mono">vector&lt;int&gt; v; // Resizable</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>✅ Grows automatically via 2x Resize</li>
            <li>✅ Allocated on Heap memory</li>
            <li>❌ Slight overhead during reallocation</li>
          </ul>
        </div>
      </div>

      {/* 5. Solving Patterns (NEW) */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-green-400">Essential Coding Patterns</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Two Pointers", desc: "For sorted arrays & pairs.", icon: "↔️" },
            { title: "Sliding Window", desc: "For sub-array sums/limits.", icon: "🪟" },
            { title: "Prefix Sum", desc: "For range query optimization.", icon: "➕" },
            { title: "Dutch Flag", desc: "For 3-way partitioning.", icon: "🇳🇱" }
          ].map((p, i) => (
            <div key={i} className="p-4 bg-gray-800/40 border border-gray-700 rounded-xl hover:border-green-500/50 transition text-center">
              <div className="text-xl mb-1">{p.icon}</div>
              <h4 className="font-bold text-xs mb-1">{p.title}</h4>
              <p className="text-[10px] text-gray-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Complexity Matrix */}
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
            <tr><td className="p-4 font-mono text-purple-400">Access</td><td className="p-4 text-green-400 font-bold">O(1)</td><td>Instant via index offset</td></tr>
            <tr><td className="p-4 font-mono text-purple-400">Push Back</td><td className="p-4 text-yellow-400 font-bold">Amortized O(1)</td><td>Rare O(n) when resizing</td></tr>
            <tr><td className="p-4 font-mono text-purple-400">Insert/Delete</td><td className="p-4 text-red-400 font-bold">O(n)</td><td>Must shift elements manually</td></tr>
            <tr><td className="p-4 font-mono text-purple-400">Binary Search</td><td className="p-4 text-blue-400 font-bold">O(log n)</td><td>Only works on sorted arrays</td></tr>
          </tbody>
        </table>
      </div>

      {/* 7. Language Snippets (NEW) */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">Language Specifics</h2>
        <div className="grid md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="bg-black/40 p-5 rounded-xl border border-gray-700">
            <p className="text-gray-500 mb-2">// C++ STL</p>
            <p className="text-blue-400">vector&lt;int&gt; v = &#123;1, 2&#125;;</p>
            <p>v.push_back(3);</p>
          </div>
          <div className="bg-black/40 p-5 rounded-xl border border-gray-700">
            <p className="text-gray-500 mb-2">// Java ArrayList</p>
            <p className="text-purple-400">List&lt;Integer&gt; l = new ArrayList&lt;&gt;();</p>
            <p>l.add(1);</p>
          </div>
          <div className="bg-black/40 p-5 rounded-xl border border-gray-700">
            <p className="text-gray-500 mb-2">// Python List</p>
            <p className="text-green-400">arr = [1, 2]</p>
            <p>arr.append(3)</p>
          </div>
        </div>
      </div>

      {/* 8. Practice Roadmap */}
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
              {problems.easy.map((q, i) => <li key={i} className="hover:text-white transition cursor-default flex gap-2"><span className="opacity-40">{i+1}.</span>{q}</li>)}
            </ul>
          </div>
          {/* Medium */}
          <div className="bg-gray-800/30 border border-yellow-500/20 rounded-2xl p-6 hover:shadow-[0_0_15px_rgba(234,179,8,0.1)] transition">
            <h3 className="text-yellow-400 font-bold mb-4 flex items-center justify-between">
              Medium <span>10 Qs</span>
            </h3>
            <ul className="text-xs space-y-3 text-gray-400">
              {problems.medium.map((q, i) => <li key={i} className="hover:text-white transition cursor-default flex gap-2"><span className="opacity-40">{i+11}.</span>{q}</li>)}
            </ul>
          </div>
          {/* Hard */}
          <div className="bg-gray-800/30 border border-red-500/20 rounded-2xl p-6 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition">
            <h3 className="text-red-400 font-bold mb-4 flex items-center justify-between">
              Hard <span>10 Qs</span>
            </h3>
            <ul className="text-xs space-y-3 text-gray-400">
              {problems.hard.map((q, i) => <li key={i} className="hover:text-white transition cursor-default flex gap-2"><span className="opacity-40">{i+21}.</span>{q}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* 9. Final Insights */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16 opacity-80">
        <div className="p-6 border-l-4 border-yellow-500 bg-yellow-500/5 rounded-r-xl">
          <h4 className="font-bold text-yellow-500 mb-1 italic">Pro Tip:</h4>
          <p className="text-xs text-gray-400">Always check if the array is sorted. If it is, Binary Search (O(log n)) should be your first thought.</p>
        </div>
        <div className="p-6 border-l-4 border-pink-500 bg-pink-500/5 rounded-r-xl">
          <h4 className="font-bold text-pink-500 mb-1 italic">Interview Trap:</h4>
          <p className="text-xs text-gray-400">Remember that "Accessing" an element is O(1), but "Searching" for a value is O(n) unless sorted.</p>
        </div>
      </div>

      <div className="text-center">
        <button className="px-10 py-4 bg-white text-black rounded-2xl font-black text-lg hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl">
          Try Visualizer 🚀
        </button>
      </div>
    </div>
  );
};

export default ArrayPage;
