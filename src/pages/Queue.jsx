import React from "react";

const QueuePage = () => {
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

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-24 font-sans selection:bg-green-500/30">
      {/* 1. Header */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-6xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-r from-green-400 via-blue-400 to-purple-400">
          Queue (FIFO) 🚶‍♂️🚶‍♀️
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          The "First-In-First-Out" engine powering CPU scheduling, asynchronous
          buffers, and BFS graph traversals.
        </p>
      </div>

      {/* 2. Core Principle & Correct Horizontal Visual */}
      <div className="max-w-6xl mx-auto mb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-green-400 border-b border-green-500/20 pb-2 inline-block">
            The FIFO Principle
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            A Queue is a linear structure where elements are added at the{" "}
            <strong>Rear</strong> and removed from the <strong>Front</strong>.
          </p>
          <div className="bg-green-900/10 border border-green-500/20 p-8 rounded-3xl shadow-inner">
            <h4 className="text-green-300 font-bold mb-2 text-xl">
              Real-World Analogy:
            </h4>
            <p className="text-gray-400 text-lg italic leading-relaxed">
              "A ticket counter line. The first person to arrive is the first to
              be served and leave the line."
            </p>
          </div>
        </div>

        {/* Dynamic Queue Visual */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-md h-36 border-y-4 border-gray-600 flex items-center px-6 bg-gray-800/30 rounded-lg shadow-2xl overflow-visible">
            {/* Front Indicator - Exit Point */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-green-400 font-black text-3xl">
              ←
            </div>
            <div className="absolute -top-12 left-0 text-green-400 font-mono font-bold text-lg animate-pulse">
              FRONT (Exit)
            </div>

            <div className="flex gap-4 w-full">
              {[10, 20, 30].map((val, i) => (
                <div
                  key={i}
                  className={`h-16 flex-1 rounded-xl flex items-center justify-center font-black text-2xl shadow-lg transition-all hover:scale-110 ${i === 0 ? "bg-linearto-br from-green-500 to-emerald-600 ring-4 ring-green-300" : "bg-gray-700 text-gray-300 opacity-80"}`}
                >
                  {val}
                </div>
              ))}
            </div>

            {/* Rear Indicator - Entry Point */}
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-blue-400 font-black text-3xl">
              ←
            </div>
            <div className="absolute -bottom-12 right-0 text-blue-400 font-mono font-bold text-lg animate-pulse">
              REAR (Entry)
            </div>
          </div>
        </div>
      </div>

      {/* 3. New Technical Deep Dive: The Two-Pointer Implementation */}
      <div className="max-w-6xl mx-auto mb-24 grid md:grid-cols-2 gap-10">
        <div className="bg-gray-800/40 p-10 rounded-3xl border border-gray-700">
          <h2 className="text-2xl font-bold text-blue-400 mb-6 uppercase tracking-widest">
            How it's built
          </h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            In an array implementation, we maintain two pointers:
            <span className="text-green-400"> Front</span> and{" "}
            <span className="text-blue-400"> Rear</span>.
          </p>
          <ul className="space-y-4 text-base text-gray-400">
            <li>• Initially, both are set to -1.</li>
            <li>
              • <strong>Enqueue:</strong> Increment <code>Rear</code> and place
              the element.
            </li>
            <li>
              • <strong>Dequeue:</strong> Return element at <code>Front</code>{" "}
              and increment <code>Front</code>.
            </li>
          </ul>
        </div>
        <div className="bg-red-900/10 border border-red-500/30 p-10 rounded-3xl">
          <h2 className="text-2xl font-bold text-red-400 mb-6 uppercase tracking-widest">
            ⚠️ Interview Trap
          </h2>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Many beginners use <code>array.shift()</code> in JavaScript for
            Dequeue.
          </p>
          <p className="text-base text-gray-400 border-l-2 border-red-500 pl-4">
            <strong>Warning:</strong> In JS, <code>shift()</code> is{" "}
            <strong>O(n)</strong> because the engine must re-index every
            remaining element. In a real Queue, Dequeue must be{" "}
            <strong>O(1)</strong>.
          </p>
        </div>
      </div>

      {/* 3. System Design: Message Queues (NEW) */}
      <div className="max-w-6xl mx-auto mb-24">
        <div className="bg-blue-900/10 border border-blue-500/30 p-10 rounded-3xl">
          <h2 className="text-3xl font-bold mb-6 text-blue-300">
            🌍 Large-Scale Use: Message Queues
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-300">
            <div className="space-y-4">
              <p>
                In modern apps (like Amazon or Instagram), queues act as{" "}
                <strong>Buffers</strong> between services.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-gray-400">
                <li>
                  <strong>Decoupling:</strong> The "Order Service" doesn't have
                  to wait for the "Email Service" to finish. It just drops a
                  message in the queue.
                </li>
                <li>
                  <strong>Load Leveling:</strong> If 1 million users buy at
                  once, the queue holds the requests so servers don't crash.
                </li>
              </ul>
            </div>
            <div className="bg-black/40 p-6 rounded-2xl border border-gray-700 flex flex-col justify-center">
              <div className="flex items-center justify-between text-xs font-mono text-blue-400 mb-2">
                <span>Producer (App)</span>
                <span>Consumer (Worker)</span>
              </div>
              <div className="h-10 border-y-2 border-dashed border-blue-500 flex items-center justify-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-sm animate-ping"></div>
                <div className="w-6 h-6 bg-blue-500/50 rounded-sm"></div>
                <div className="w-6 h-6 bg-blue-500/20 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Specialized Variants Card */}
      <div className="max-w-6xl mx-auto mb-24 grid md:grid-cols-3 gap-8">
        <div className="bg-gray-800/40 p-10 rounded-3xl border border-gray-700 shadow-xl group">
          <h3 className="text-2xl font-bold mb-4 text-purple-300 group-hover:text-purple-400 transition">
            Priority Queue
          </h3>
          <p className="text-lg text-gray-400">
            Each element has a weight. The highest priority leaves first,
            regardless of arrival order. Often implemented via{" "}
            <strong>Heaps</strong>.
          </p>
        </div>
        <div className="bg-gray-800/40 p-10 rounded-3xl border border-gray-700 shadow-xl group">
          <h3 className="text-2xl font-bold mb-4 text-pink-300 group-hover:text-pink-400 transition">
            Deque
          </h3>
          <p className="text-lg text-gray-400">
            "Double-Ended Queue." Allows adding and removing from{" "}
            <strong>both ends</strong>. Used in undo-redo and sliding windows.
          </p>
        </div>
        <div className="bg-gray-800/40 p-10 rounded-3xl border border-gray-700 shadow-xl group">
          <h3 className="text-2xl font-bold mb-4 text-emerald-300 group-hover:text-emerald-400 transition">
            Circular Queue
          </h3>
          <p className="text-lg text-gray-400">
            Connects end back to start. Solves the "false full" problem in
            array-based queues by reusing vacated space.
          </p>
        </div>
      </div>

      {/* 5. Deep Dive: Circular Queue (Interviewer's Choice) */}
      <div className="max-w-6xl mx-auto mb-24 bg-purple-900/10 border border-purple-500/30 p-10 rounded-3xl">
        <h2 className="text-3xl font-bold mb-6 text-purple-300">
          💡 Why Circular Queues?
        </h2>
        <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-300">
          <p>
            In a normal array-based queue, once the Rear reaches the end, you
            can't insert anymore—even if the Front is empty!
            <strong> Circular Queues</strong> solve this by "wrapping around"
            using the modulo operator:
          </p>
          <div className="bg-black/40 p-6 rounded-xl font-mono text-purple-400 flex items-center justify-center">
            rear = (rear + 1) % capacity;
          </div>
        </div>
      </div>

      {/* 6. Language Implementation */}
      <div className="max-w-6xl mx-auto mb-24 grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-700">
          <h4 className="text-green-400 font-bold mb-4 text-xl">
            JavaScript (Queue)
          </h4>
          <pre className="text-lg font-mono text-gray-300">
            let q = []; <br />
            q.push(10); &nbsp; // Enqueue <br />
            q.shift(); &nbsp; // Dequeue (O(n) in JS)
          </pre>
        </div>
        <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-700">
          <h4 className="text-blue-400 font-bold mb-4 text-xl">
            C++ (STL Queue)
          </h4>
          <pre className="text-lg font-mono text-gray-300">
            queue&lt;int&gt; q; <br />
            q.push(10); <br />
            q.pop();
          </pre>
        </div>
      </div>

      {/* 5. Complexity Table */}
      <div className="max-w-6xl mx-auto mb-24 overflow-hidden rounded-3xl border border-gray-700 bg-gray-800/20 shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-gray-800/80 text-gray-400 text-lg uppercase tracking-widest">
            <tr>
              <th className="p-8">Operation</th>
              <th className="p-8">Description</th>
              <th className="p-8">Time Complexity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-xl text-gray-300">
            <tr className="hover:bg-green-500/5 transition">
              <td className="p-8 font-mono text-green-400 font-bold text-2xl">
                Enqueue
              </td>
              <td className="p-8">Add to the back (Rear)</td>
              <td className="p-8 text-green-400 font-bold">O(1)</td>
            </tr>
            <tr className="hover:bg-green-500/5 transition">
              <td className="p-8 font-mono text-green-400 font-bold text-2xl">
                Dequeue
              </td>
              <td className="p-8">Remove from the front (Front)</td>
              <td className="p-8 text-green-400 font-bold">O(1)</td>
            </tr>
            <tr className="hover:bg-green-500/5 transition">
              <td className="p-8 font-mono text-green-400 font-bold text-2xl">
                Peek/Front
              </td>
              <td className="p-8">View the first element</td>
              <td className="p-8 text-green-400 font-bold">O(1)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 6. Interview Secret: Monotonic Queue (NEW) */}
      <div className="max-w-6xl mx-auto mb-24 bg-pink-900/10 border border-pink-500/30 p-10 rounded-3xl">
        <h2 className="text-3xl font-bold mb-6 text-pink-300">
          💡 Interview Pattern: Monotonic Queue
        </h2>
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          Similar to a Monotonic Stack, this queue keeps elements in{" "}
          <strong>strictly decreasing/increasing order</strong>. It is the
          optimal O(N) solution for the famous{" "}
          <span className="text-pink-400 font-bold">
            Sliding Window Maximum
          </span>{" "}
          problem.
        </p>
        <div className="bg-black/40 p-6 rounded-xl font-mono text-pink-400 text-base border border-pink-950">
          // Deque-based approach <br />
          if (deque.front() == i - k) &#123; deque.pop_front(); &#125; <br />
          while (!deque.empty() && nums[deque.back()] &lt; nums[i]) &#123;
          deque.pop_back(); &#125;
        </div>
      </div>

      {/* 7. Mastery Roadmap */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-4xl font-black mb-12 text-center bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-orange-500 uppercase tracking-tighter">
          Queue Practice Roadmap 🎯
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
          Ready to visualize the Enqueue/Dequeue flow?
        </p>
        <button
          onClick={() => (window.location.href = "/visualizer/queue")}
          className="px-20 py-8 bg-linear-to-r from-green-600 via-blue-600 to-purple-600 text-white rounded-3xl font-black text-3xl hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] transition-all transform hover:scale-105 active:scale-95"
        >
          OPEN QUEUE VISUALIZER 🚀
        </button>
      </div>
    </div>
  );
};

export default QueuePage;
