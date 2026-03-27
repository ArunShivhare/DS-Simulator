import React from "react";

const LinkedListPage = () => {
  const problems = {
    easy: ["Reverse Linked List", "Find Middle Node", "Detect Cycle", "Merge Two Lists", "Delete Node", "Remove Duplicates", "Intersection of Lists", "Nth Node from End", "Palindrome Linked List", "Linked List Length"],
    medium: ["Add Two Numbers", "Reorder List", "Partition List", "Rotate List", "Flatten Linked List", "Swap Nodes in Pairs", "Sort List", "Odd Even Linked List", "Remove Nth Node", "Copy List with Random Pointer"],
    hard: ["Merge K Sorted Lists", "Reverse Nodes in K Group", "LRU Cache", "Flatten Multilevel List", "Clone Graph", "Intersection Detection (Optimized)", "Cycle Detection (Floyd)", "Palindrome O(1) Space", "Split List Parts", "Critical Points"],
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-24 font-sans selection:bg-pink-500/30">
      
      {/* 1. Header */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-6xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400">
          Linked List 🔗
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          The ultimate dynamic structure where data lives in scattered memory, connected by the power of pointers.
        </p>
      </div>

      {/* 2. Core Principle & Visual */}
      <div className="max-w-6xl mx-auto mb-24 grid md:grid-cols-2 gap-12 items-center overflow-x-auto">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-pink-400 border-b border-pink-500/20 pb-2 inline-block">The Pointer Concept</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Unlike Arrays, a Linked List stores elements in <strong>non-contiguous</strong> memory. Each "Node" contains your data and the <strong>address</strong> of the next node.
          </p>
          <div className="bg-pink-900/10 border border-pink-500/20 p-8 rounded-3xl shadow-inner">
            <h4 className="text-pink-300 font-bold mb-2 text-xl uppercase tracking-tighter">Key Advantage:</h4>
            <p className="text-gray-400 text-lg italic leading-relaxed">
              "No pre-allocated size needed. It grows and shrinks perfectly as you add or remove nodes."
            </p>
          </div>
        </div>

        {/* Dynamic Linked List Visual */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4 bg-gray-800/30 p-10 rounded-3xl border border-gray-700 shadow-2xl overflow-x-auto w-full justify-center">
            <div className="text-pink-400 font-bold text-lg animate-pulse">HEAD →</div>
            {[10, 20, 30].map((val, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="group relative">
                  <div className="w-20 h-16 bg-linear-to-br from-pink-500 to-purple-600 rounded-xl flex flex-col items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <span className="text-2xl font-black">{val}</span>
                    <span className="text-[10px] opacity-50 font-mono">Next*</span>
                  </div>
                </div>
                <div className="text-gray-600 font-black text-2xl">→</div>
              </div>
            ))}
            <div className="text-gray-500 font-bold text-lg font-mono">NULL</div>
          </div>
        </div>
      </div>

           {/* 3. Hardware Insight: No Cache Locality (NEW) */}
      <div className="max-w-6xl mx-auto mb-24">
        <div className="bg-red-900/10 border border-red-500/30 p-10 rounded-3xl">
          <h2 className="text-3xl font-bold mb-6 text-red-400">⚠️ The Hardware Trade-off</h2>
          <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-300">
            <div className="space-y-4 text-base">
              <p>Linked Lists suffer from <strong>Cache Misses</strong>. Because nodes are scattered in memory, the CPU cannot "predict" where the next element is.</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li><strong>Arrays:</strong> Predictable (Contiguous) = Fast.</li>
                <li><strong>Lists:</strong> Unpredictable (Pointers) = Slower Traversal.</li>
              </ul>
            </div>
            <div className="bg-black/40 p-6 rounded-2xl border border-gray-700 flex flex-col justify-center">
               <p className="text-xs font-mono text-red-400 mb-4">// Scrambled RAM Visualization</p>
               <div className="grid grid-cols-4 gap-2 opacity-50">
                  <div className="h-8 bg-pink-500/80 rounded-sm"></div><div className="h-8 bg-gray-700 rounded-sm"></div>
                  <div className="h-8 bg-gray-700 rounded-sm"></div><div className="h-8 bg-pink-500/40 rounded-sm"></div>
                  <div className="h-8 bg-pink-500/60 rounded-sm"></div><div className="h-8 bg-gray-700 rounded-sm"></div>
                  <div className="h-8 bg-gray-700 rounded-sm"></div><div className="h-8 bg-pink-500 rounded-sm animate-pulse"></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NEW: The Decision Matrix (Array vs List) */}
      <div className="max-w-6xl mx-auto mb-24 grid md:grid-cols-2 gap-10">
        <div className="bg-gray-800/40 p-10 rounded-3xl border border-gray-700">
          <h2 className="text-2xl font-bold text-indigo-400 mb-6 uppercase">Use Linked Lists When:</h2>
          <ul className="space-y-4 text-lg text-gray-300">
            <li className="flex items-start gap-3">✅ <span>You need <strong>constant time O(1)</strong> insertions at the head.</span></li>
            <li className="flex items-start gap-3">✅ <span>The data size is unknown and changes frequently.</span></li>
            <li className="flex items-start gap-3">✅ <span>Implementing stacks or queues where size varies.</span></li>
          </ul>
        </div>
        <div className="bg-gray-800/40 p-10 rounded-3xl border border-gray-700">
          <h2 className="text-2xl font-bold text-pink-400 mb-6 uppercase">Avoid When:</h2>
          <ul className="space-y-4 text-lg text-gray-300">
            <li className="flex items-start gap-3">❌ <span>You need <strong>Random Access O(1)</strong> (e.g., getting the 50th element).</span></li>
            <li className="flex items-start gap-3">❌ <span>Memory is extremely tight (Pointers use extra bytes).</span></li>
            <li className="flex items-start gap-3">❌ <span>High-performance traversal is required (Cache Misses).</span></li>
          </ul>
        </div>
      </div>

      {/* 4. NEW: The "Dummy Node" Pro-Tip */}
      <div className="max-w-6xl mx-auto mb-24 bg-indigo-900/10 border border-indigo-500/30 p-10 rounded-3xl">
        <h2 className="text-3xl font-bold mb-6 text-indigo-300">💡 Interview Pro-Tip: The Dummy Node</h2>
        <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-300">
          <p className="leading-relaxed">
            When merging or reordering lists, always create a <strong>Dummy Node</strong> (a fake head). It handles edge cases like "empty lists" or "head changes" automatically so you don't need 50 <code>if</code> statements.
          </p>
          <div className="bg-black/40 p-6 rounded-xl font-mono text-indigo-400 border border-indigo-900/50">
            Node dummy = new Node(0); <br/>
            Node curr = dummy; <br/>
            // ... link your real nodes to curr ... <br/>
            return dummy.next;
          </div>
        </div>
      </div>

            {/* 5. Solving Pattern: Fast & Slow Pointers (NEW) */}
      <div className="max-w-6xl mx-auto mb-24 bg-indigo-900/10 border border-indigo-500/30 p-10 rounded-3xl">
        <h2 className="text-3xl font-bold mb-6 text-indigo-300 font-mono tracking-tighter">🐢 Hare & Tortoise Pattern</h2>
        <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-300">
          <p>
            The most famous Linked List algorithm. Use two pointers: one moves <strong>1 step</strong>, the other moves <strong>2 steps</strong>.
          </p>
          <ul className="space-y-4 text-base text-indigo-200">
            <li>✅ <strong>Detect Cycle:</strong> If they ever meet, there is a loop.</li>
            <li>✅ <strong>Find Middle:</strong> When fast hits the end, slow is at the middle.</li>
          </ul>
        </div>
      </div>

      {/* 6. Specialized Types */}
      <div className="max-w-6xl mx-auto mb-24 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-gray-800/40 p-10 rounded-3xl border border-gray-700 shadow-xl group">
          <h3 className="text-2xl font-bold mb-4 text-pink-300 group-hover:text-pink-400 transition">Singly</h3>
          <p className="text-lg text-gray-400 leading-relaxed">The classic unidirectional chain. <code>(Data | Next)</code></p>
        </div>
        <div className="bg-gray-800/40 p-10 rounded-3xl border border-gray-700 shadow-xl group">
          <h3 className="text-2xl font-bold mb-4 text-purple-300 group-hover:text-purple-400 transition">Doubly</h3>
          <p className="text-lg text-gray-400 leading-relaxed">Can go backwards. <code>(Prev | Data | Next)</code></p>
        </div>
        <div className="bg-gray-800/40 p-10 rounded-3xl border border-gray-700 shadow-xl group">
          <h3 className="text-2xl font-bold mb-4 text-indigo-300 group-hover:text-indigo-400 transition">Circular</h3>
          <p className="text-lg text-gray-400 leading-relaxed">No NULL. Last node points back to the Head node.</p>
        </div>
      </div>

      {/* 5. Complexity Table */}
      <div className="max-w-6xl mx-auto mb-24 overflow-x-auto rounded-3xl border border-gray-700 bg-gray-800/20 shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-gray-800/80 text-gray-400 text-lg uppercase tracking-widest">
            <tr>
              <th className="p-8">Operation</th>
              <th className="p-8">Time Complexity</th>
              <th className="p-8">Technical Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-xl text-gray-300">
            <tr className="hover:bg-pink-500/5 transition">
              <td className="p-8 font-mono text-pink-400 font-bold text-2xl">Search</td>
              <td className="p-8 text-red-400 font-bold">O(n)</td>
              <td>Linear scan from Head to Tail</td>
            </tr>
            <tr className="hover:bg-pink-500/5 transition">
              <td className="p-8 font-mono text-pink-400 font-bold text-2xl">Insert @ Head</td>
              <td className="p-8 text-green-400 font-bold">O(1)</td>
              <td>Just update the <code>new_node.next</code> pointer</td>
            </tr>
            <tr className="hover:bg-pink-500/5 transition">
              <td className="p-8 font-mono text-pink-400 font-bold text-2xl">Delete @ Known Node</td>
              <td className="p-8 text-green-400 font-bold">O(1)</td>
              <td>Update <code>prev.next = node.next</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 6. Solving Patterns Card */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-400">Expert Solving Patterns</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Fast & Slow", desc: "For cycles/middle node.", icon: "🏃‍♂️🐢" },
            { title: "Reverse In-Place", desc: "Modify pointers as you go.", icon: "🔄" },
            { title: "Two Pointers", desc: "For Nth node from end.", icon: "📏" },
            { title: "Recursive", desc: "For sub-problem merging.", icon: "📂" }
          ].map((p, i) => (
            <div key={i} className="p-6 bg-gray-800/40 border border-gray-700 rounded-2xl hover:border-purple-500 transition text-center shadow-lg">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h4 className="font-bold text-lg mb-2">{p.title}</h4>
              <p className="text-sm text-gray-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Practice Roadmap */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-4xl font-black mb-12 text-center bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-orange-500 uppercase tracking-tighter">
          The Mastery Roadmap 🎯
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(problems).map(([level, qs], idx) => (
            <div key={level} className={`bg-gray-800/40 border border-${idx===0?'green':idx===1?'yellow':'red'}-500/20 rounded-3xl p-10 hover:shadow-2xl transition`}>
              <h3 className={`capitalize text-3xl font-bold mb-8 text-${idx===0?'green':idx===1?'yellow':'red'}-400 flex justify-between items-center`}>
                {level} <span className="text-sm opacity-50 bg-white/5 px-3 py-1 rounded-full uppercase">10 Qs</span>
              </h3>
              <ul className="space-y-5 text-lg md:text-xl text-gray-400">
                {qs.map((q, i) => (
                  <li key={i} className="hover:text-white transition cursor-default flex gap-3 items-start leading-tight">
                    <span className="opacity-30 font-mono text-base">{i + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Final CTA */}
      <div className="text-center pb-20">
        <p className="text-gray-500 mb-8 text-xl italic tracking-wide font-medium">Want to watch pointers move in real-time?</p>
        <button
          onClick={() => (window.location.href = "/visualizer/linkedlist")}
          className="px-20 py-8 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 text-white rounded-3xl font-black text-3xl hover:shadow-[0_0_60px_rgba(219,39,119,0.4)] transition-all transform hover:scale-105 active:scale-95"
        >
          OPEN LINKED LIST VISUALIZER 🚀
        </button>
      </div>

    </div>
  );
};

export default LinkedListPage;
