import React from "react";
import { useEffect } from "react";
import { auth } from "../firebase";
import {
  Link2,
  ArrowRight,
  ArrowLeft,
  Layers3,
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
  RotateCcw,
} from "lucide-react";

const LinkedListPage = () => {
  const user = auth.currentUser;
const userId = user?.uid;

  const problems = {
    easy: ["Reverse Linked List", "Find Middle Node", "Detect Cycle", "Merge Two Lists", "Delete Node", "Remove Duplicates", "Intersection of Lists", "Nth Node from End", "Palindrome Linked List", "Linked List Length"],
    medium: ["Add Two Numbers", "Reorder List", "Partition List", "Rotate List", "Flatten Linked List", "Swap Nodes in Pairs", "Sort List", "Odd Even Linked List", "Remove Nth Node", "Copy List with Random Pointer"],
    hard: ["Merge K Sorted Lists", "Reverse Nodes in K Group", "LRU Cache", "Flatten Multilevel List", "Clone Graph", "Intersection Detection (Optimized)", "Cycle Detection (Floyd)", "Palindrome O(1) Space", "Split List Parts", "Critical Points"],
  };

  useEffect(() => {
  const visited =
    JSON.parse(localStorage.getItem(`visitedSteps_${userId}`)) || {};

  if (!visited["linkedlist"]) visited["linkedlist"] = [];

  visited["linkedlist"][0] = true; // Intro
  visited["linkedlist"][1] = true; // Implementation

  localStorage.setItem(`visitedSteps_${userId}`, JSON.stringify(visited));
}, []);

  return (
<div className="min-h-screen bg-slate-50 text-slate-900 px-4 sm:px-6 pb-20 font-sans relative overflow-hidden">     {/* Background Accents */}
  {/* 1. Header */}
<section className="max-w-6xl mx-auto pt-28 pb-16">
  <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 sm:px-10 py-10 sm:py-12 shadow-sm">

    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
    <div className="absolute -bottom-28 -left-20 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

    <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">

      <div>
        <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-4">
          <Link2 className="w-4 h-4" />
          <span>Data Structures · 04</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950">
          Linked List
        </h1>

        <p className="mt-5 max-w-3xl text-base sm:text-lg text-slate-500 leading-7">
          A dynamic structure where nodes are connected through pointers
          instead of relying on contiguous memory.
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
            Nodes
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200">
            Pointers
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200">
            Traversal
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200">
            Dynamic Structure
          </span>
        </div>
      </div>

      <div className="w-full lg:w-64 bg-slate-950 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          Foundation Track
        </div>

        <p className="text-lg font-bold mt-3">
          Linked List Fundamentals
        </p>

        <div className="h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
          <div className="h-full w-2/3 bg-indigo-500 rounded-full" />
        </div>

        <p className="text-xs text-slate-400 mt-3">
          Understand → Implement → Master
        </p>
      </div>

    </div>
  </div>
</section>

     {/* 2. Node + Pointer Mental Model */}
<section className="max-w-6xl mx-auto mb-20">
  <div className="grid lg:grid-cols-2 gap-6 items-stretch">

    <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 shadow-sm">

      <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-4">
        <Link2 className="w-4 h-4" />
        Core Concept
      </div>

      <h2 className="text-3xl font-bold text-slate-950">
        Think in Nodes, Not Positions
      </h2>

      <p className="mt-4 text-slate-500 leading-7">
        Unlike an Array, a Linked List does not require its nodes to occupy
        consecutive memory locations. Each node stores its data together
        with a reference to another node.
      </p>

      <div className="mt-6 rounded-2xl bg-indigo-50 border border-indigo-100 p-5">
        <p className="text-xs font-semibold text-indigo-600">
          NODE MODEL
        </p>

        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1 rounded-xl bg-white border border-slate-200 p-4 text-center">
            <p className="text-xs text-slate-400">DATA</p>
            <p className="font-bold text-slate-800 mt-1">10</p>
          </div>

          <ArrowRight className="w-5 h-5 text-indigo-500 shrink-0" />

          <div className="flex-1 rounded-xl bg-white border border-slate-200 p-4 text-center">
            <p className="text-xs text-slate-400">NEXT</p>
            <p className="font-bold text-indigo-600 mt-1">
              address
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-500 mt-5 leading-6">
        The list itself is usually accessed through a starting reference
        called the <strong className="text-slate-800">Head</strong>.
      </p>
    </div>

    <div className="bg-slate-950 rounded-3xl p-7 sm:p-8 overflow-hidden">

      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-semibold text-indigo-300">
          HEAD
        </span>

        <ArrowRight className="w-4 h-4 text-slate-600" />

        <span className="text-xs text-slate-500">
          traversal direction
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-3">

        {[10, 20, 30].map((value, index) => (
          <React.Fragment key={value}>
            <div className="min-w-[88px] rounded-xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="px-3 py-2 text-center border-b border-white/10">
                <span className="text-lg font-bold text-white">
                  {value}
                </span>
              </div>

              <div className="px-3 py-2 text-center">
                <span className="text-[10px] font-mono text-slate-500">
                  NEXT
                </span>
              </div>
            </div>

            {index < 2 && (
              <ArrowRight className="w-5 h-5 text-indigo-400 shrink-0" />
            )}
          </React.Fragment>
        ))}

        <div className="min-w-[60px] text-center text-xs font-mono text-slate-500">
          NULL
        </div>

      </div>

      <div className="mt-8 pt-5 border-t border-white/10">
        <p className="text-sm text-slate-400 leading-6">
          Traversal follows the pointers. You don't jump directly to an
          arbitrary node the way you can with an indexed Array.
        </p>
      </div>
    </div>

  </div>
</section>

     {/* 3. Memory + Hardware Trade-off */}
<section className="max-w-6xl mx-auto mb-20">
  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">

    <div className="p-7 sm:p-8">
      <div className="flex items-center gap-2 text-red-600 text-sm font-semibold mb-3">
        <Cpu className="w-4 h-4" />
        Hardware Insight
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
        Flexibility Comes With a Cost
      </h2>

      <p className="mt-3 max-w-3xl text-slate-500 leading-7">
        Linked Lists can grow without requiring one contiguous block of
        memory, but pointer-based traversal can be less cache-friendly than
        contiguous structures such as Arrays.
      </p>
    </div>

    <div className="grid md:grid-cols-2 border-t border-slate-200">

      <div className="p-7 sm:p-8">
        <p className="text-xs font-semibold text-indigo-600 mb-5">
          CONTIGUOUS MEMORY
        </p>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex-1 h-12 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-700"
            >
              {item}
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-500 mt-5 leading-6">
          Arrays place elements next to one another, which generally gives
          traversal good spatial locality.
        </p>
      </div>

      <div className="p-7 sm:p-8 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200">
        <p className="text-xs font-semibold text-violet-600 mb-5">
          POINTER-BASED MEMORY
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          {[10, 30, 20, 50].map((item) => (
            <div
              key={item}
              className="px-4 py-3 rounded-lg bg-white border border-violet-100 text-sm font-bold text-violet-700"
            >
              Node {item}
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-500 mt-5 leading-6">
          Linked List nodes may live in different memory locations and are
          connected through pointers.
        </p>
      </div>

    </div>

    <div className="px-7 sm:px-8 py-5 bg-slate-950">
      <p className="text-sm text-slate-400 leading-6">
        <strong className="text-white">Key idea:</strong> Linked Lists trade
        contiguous storage and convenient indexing for pointer-based
        flexibility.
      </p>
    </div>
  </div>
</section>

   {/* 4. Fundamental Operations */}
<section className="max-w-6xl mx-auto mb-20">

  <div className="mb-8">
    <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
      <Code2 className="w-4 h-4" />
      Fundamental Operations
    </div>

    <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
      Learn the Pointer Moves
    </h2>

    <p className="mt-3 max-w-3xl text-slate-500 leading-7">
      Most Linked List problems are combinations of a small number of
      pointer operations. Master these before solving complex problems.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

    {[
      {
        title: "Traverse",
        complexity: "O(n)",
        desc: "Move from Head through each next pointer.",
      },
      {
        title: "Insert at Head",
        complexity: "O(1)",
        desc: "Point the new node to the current Head.",
      },
      {
        title: "Search",
        complexity: "O(n)",
        desc: "Follow pointers until the target is found.",
      },
      {
        title: "Delete",
        complexity: "O(1)*",
        desc: "Reconnect neighboring pointers when the position is known.",
      },
    ].map((item) => (
      <div
        key={item.title}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <p className="text-sm font-semibold text-slate-500">
          {item.title}
        </p>

        <p className="text-2xl font-black font-mono text-indigo-600 mt-3">
          {item.complexity}
        </p>

        <p className="text-sm text-slate-500 mt-3 leading-6">
          {item.desc}
        </p>
      </div>
    ))}

  </div>

  <div className="mt-5 rounded-2xl bg-amber-50 border border-amber-100 p-5">
    <div className="flex gap-3">
      <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />

      <p className="text-sm text-amber-900 leading-6">
        <strong>*Important:</strong> O(1) deletion assumes the required node
        or its predecessor is already known. Finding that position can still
        require O(n) traversal.
      </p>
    </div>
  </div>

</section>

    {/* 5. Singly Linked List */}
<section className="max-w-6xl mx-auto mb-20">
  <div className="grid lg:grid-cols-2 gap-6">

    <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 shadow-sm">

      <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
        <Link2 className="w-4 h-4" />
        Type 01
      </div>

      <h2 className="text-3xl font-bold text-slate-950">
        Singly Linked List
      </h2>

      <p className="mt-3 text-slate-500 leading-7">
        Each node stores its data and one pointer to the next node.
        Traversal normally proceeds in one direction.
      </p>

      <div className="mt-6 flex items-center gap-2 overflow-x-auto">
        {[10, 20, 30].map((value, index) => (
          <React.Fragment key={value}>
            <div className="min-w-[82px] rounded-xl bg-indigo-50 border border-indigo-100 p-4 text-center">
              <p className="font-bold text-indigo-700">{value}</p>
              <p className="text-[10px] text-indigo-400 mt-1">NEXT</p>
            </div>

            {index < 2 && (
              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>

    <div className="bg-slate-950 rounded-3xl p-7 sm:p-8">
      <p className="text-xs font-semibold text-slate-500">
        NODE SHAPE
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="p-5 text-center border-r border-white/10">
            <p className="text-xs text-slate-500">
              DATA
            </p>
            <p className="text-xl font-bold text-white mt-2">
              value
            </p>
          </div>

          <div className="p-5 text-center">
            <p className="text-xs text-slate-500">
              NEXT
            </p>
            <p className="text-xl font-bold text-indigo-300 mt-2">
              Node*
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-400 mt-6 leading-6">
        This is the classic Linked List structure and the foundation for
        most Linked List interview problems.
      </p>
    </div>

  </div>
</section>

       {/* 6. Doubly + Circular Lists */}
<section className="max-w-6xl mx-auto mb-20">

  <div className="mb-8">
    <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
      <Layers3 className="w-4 h-4" />
      Structural Variants
    </div>

    <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
      Know the Three Main Forms
    </h2>
  </div>

  <div className="grid md:grid-cols-3 gap-5">

    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <span className="text-xs font-semibold text-indigo-600">
        SINGLY
      </span>

      <h3 className="text-xl font-bold text-slate-900 mt-2">
        One Direction
      </h3>

      <div className="mt-5 font-mono text-sm text-indigo-600">
        Data → Next
      </div>

      <p className="text-sm text-slate-500 mt-4 leading-6">
        Each node points to the next node.
      </p>
    </div>

    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <span className="text-xs font-semibold text-violet-600">
        DOUBLY
      </span>

      <h3 className="text-xl font-bold text-slate-900 mt-2">
        Two Directions
      </h3>

      <div className="mt-5 font-mono text-sm text-violet-600">
        Prev ← Data → Next
      </div>

      <p className="text-sm text-slate-500 mt-4 leading-6">
        Each node can point both forward and backward.
      </p>
    </div>

    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <span className="text-xs font-semibold text-emerald-600">
        CIRCULAR
      </span>

      <h3 className="text-xl font-bold text-slate-900 mt-2">
        Closed Loop
      </h3>

      <div className="mt-5 font-mono text-sm text-emerald-600">
        Tail → Head
      </div>

      <p className="text-sm text-slate-500 mt-4 leading-6">
        The final node points back toward the beginning instead of NULL.
      </p>
    </div>

  </div>

</section>

    {/* 8. Dummy Node */}
<section className="max-w-6xl mx-auto mb-20">

  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">

    <div className="p-7 sm:p-8">
      <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
        <Braces className="w-4 h-4" />
        Interview Technique
      </div>

      <h2 className="text-3xl font-bold text-slate-950">
        Dummy Nodes Simplify Pointer Logic
      </h2>

      <p className="mt-3 max-w-3xl text-slate-500 leading-7">
        A dummy node is a temporary node placed before the real Head. It can
        make insertion, deletion, merging, and reordering logic easier by
        reducing special cases around the Head.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 border-t border-slate-200">

      <div className="p-7 sm:p-8">
        <p className="text-xs font-semibold text-slate-400">
          WITHOUT DUMMY
        </p>

        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600">
            What if the list is empty?
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600">
            What if the Head changes?
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600">
            What if the first node is deleted?
          </div>
        </div>
      </div>

      <div className="bg-slate-950 p-7 sm:p-8">

        <p className="text-xs font-semibold text-indigo-300">
          WITH DUMMY
        </p>

        <pre className="mt-5 text-sm leading-7 text-slate-300 font-mono overflow-x-auto">
{`Node dummy = new Node(0);
Node curr = dummy;

// connect real nodes...

return dummy.next;`}
        </pre>

        <div className="mt-5 pt-5 border-t border-white/10">
          <p className="text-sm text-slate-400 leading-6">
            The dummy node gives your algorithm a stable starting point,
            making Head-changing cases easier to handle.
          </p>
        </div>

      </div>

    </div>
  </div>

</section>

     {/* 9. Fast + Slow Pointers */}
<section className="max-w-6xl mx-auto mb-20">

  <div className="mb-8">
    <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
      <Target className="w-4 h-4" />
      Core Problem-Solving Pattern
    </div>

    <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
      Fast & Slow Pointers
    </h2>

    <p className="mt-3 max-w-3xl text-slate-500 leading-7">
      Maintain two pointers that move at different speeds. This simple idea
      unlocks several classic Linked List problems.
    </p>
  </div>

  <div className="grid lg:grid-cols-2 gap-6">

    <div className="bg-slate-950 rounded-3xl p-7 sm:p-8">

      <p className="text-xs font-semibold text-slate-500">
        TWO POINTERS
      </p>

      <div className="mt-8 flex items-center gap-2">
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <div
            key={value}
            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-slate-300"
          >
            {value}
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2 text-sm font-mono">
        <p className="text-emerald-400">
          slow → 1 step
        </p>

        <p className="text-indigo-300">
          fast → 2 steps
        </p>
      </div>

    </div>

    <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 shadow-sm">

      <div className="space-y-4">

        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
          <p className="font-bold text-indigo-800">
            Find Middle
          </p>

          <p className="text-sm text-indigo-700/70 mt-1">
            When Fast reaches the end, Slow is around the middle.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
          <p className="font-bold text-emerald-800">
            Detect Cycle
          </p>

          <p className="text-sm text-emerald-700/70 mt-1">
            If Fast and Slow eventually meet, the pointers are moving around
            a cycle.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-violet-50 border border-violet-100">
          <p className="font-bold text-violet-800">
            Find Cycle Entry
          </p>

          <p className="text-sm text-violet-700/70 mt-1">
            After detecting a cycle, pointer repositioning can identify where
            the cycle begins.
          </p>
        </div>

      </div>

    </div>

  </div>
</section>

      {/* 10. Reverse Linked List */}
<section className="max-w-6xl mx-auto mb-20">

  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">

    <div className="p-7 sm:p-8">
      <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
        <RotateCcw className="w-4 h-4" />
        Core Algorithm
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
        Reverse a Linked List
      </h2>

      <p className="mt-3 max-w-3xl text-slate-500 leading-7">
        Reversal is one of the most important pointer-manipulation patterns.
        Instead of creating a new list, redirect each node's pointer toward
        the previous node.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 border-t border-slate-200">

      <div className="p-7 sm:p-8">

        <p className="text-xs font-semibold text-slate-400">
          BEFORE
        </p>

        <div className="flex items-center gap-2 mt-5">
          {[1, 2, 3, 4].map((value, index) => (
            <React.Fragment key={value}>
              <div className="w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                {value}
              </div>

              {index < 3 && (
                <ArrowRight className="w-4 h-4 text-slate-300" />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>

      <div className="bg-slate-950 p-7 sm:p-8">

        <p className="text-xs font-semibold text-indigo-300">
          POINTER STATE
        </p>

        <div className="mt-5 space-y-3 font-mono text-sm">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-slate-300">
            prev = null
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-indigo-300">
            next = curr.next
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-emerald-300">
            curr.next = prev
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-slate-300">
            move prev / curr forward
          </div>
        </div>

      </div>

    </div>

    <div className="px-7 sm:px-8 py-5 bg-slate-50 border-t border-slate-200">
      <p className="text-sm text-slate-600 leading-6">
        <strong>Key habit:</strong> Save the next pointer before changing
        <code className="mx-1 px-1.5 py-0.5 bg-white border border-slate-200 rounded">
          curr.next
        </code>
        or you can lose access to the remaining list.
      </p>
    </div>

  </div>

</section>

      {/* 11. Complexity + Comparison */}
<section className="max-w-6xl mx-auto mb-20">

  <div className="mb-8">
    <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-3">
      <Zap className="w-4 h-4" />
      Performance
    </div>

    <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
      Linked List Complexity
    </h2>
  </div>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="px-6 py-5 border-b border-slate-200">
        <h3 className="font-bold text-slate-900">
          Linked List
        </h3>
      </div>

      <div className="divide-y divide-slate-100">
        {[
          ["Access by index", "O(n)"],
          ["Search", "O(n)"],
          ["Insert at Head", "O(1)"],
          ["Delete at known node", "O(1)*"],
        ].map(([operation, complexity]) => (
          <div
            key={operation}
            className="flex justify-between items-center px-6 py-4"
          >
            <span className="text-sm text-slate-600">
              {operation}
            </span>

            <code className="text-sm font-bold text-indigo-600">
              {complexity}
            </code>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-slate-950 rounded-3xl overflow-hidden">
      <div className="px-6 py-5 border-b border-white/10">
        <h3 className="font-bold text-white">
          Array
        </h3>
      </div>

      <div className="divide-y divide-white/10">
        {[
          ["Access by index", "O(1)"],
          ["Search", "O(n)"],
          ["Insert at beginning", "O(n)"],
          ["Delete at beginning", "O(n)"],
        ].map(([operation, complexity]) => (
          <div
            key={operation}
            className="flex justify-between items-center px-6 py-4"
          >
            <span className="text-sm text-slate-400">
              {operation}
            </span>

            <code className="text-sm font-bold text-emerald-400">
              {complexity}
            </code>
          </div>
        ))}
      </div>
    </div>

  </div>

  <div className="mt-5 rounded-2xl bg-amber-50 border border-amber-100 p-5">
    <p className="text-sm text-amber-900 leading-6">
      <strong>Remember:</strong> Linked Lists are not automatically faster
      than Arrays. Their strengths come from pointer-based insertion and
      flexible structure, while Arrays excel at indexed access and
      contiguous traversal.
    </p>
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
      Common Linked List Mistakes
    </h2>
  </div>

  <div className="grid md:grid-cols-2 gap-5">

    {[
      {
        title: "Losing the Next Pointer",
        text: "Save curr.next before redirecting curr.next during pointer manipulation.",
      },
      {
        title: "Forgetting NULL",
        text: "Traversal and termination conditions depend on knowing when a pointer reaches NULL.",
      },
      {
        title: "Head Edge Cases",
        text: "Insertion or deletion can change the Head, especially when the list has zero or one node.",
      },
      {
        title: "Confusing O(1) Deletion",
        text: "Deleting a known node can be O(1), but finding that node may still require O(n).",
      },
      {
        title: "Cycle Without a Stop Condition",
        text: "Circular structures require different traversal logic because NULL may never be reached.",
      },
      {
        title: "Overusing Linked Lists",
        text: "A Linked List is not automatically the best choice. Consider access patterns, memory overhead, and cache behavior.",
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
            <h3 className="font-bold text-slate-900">
              {item.title}
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-6">
              {item.text}
            </p>
          </div>

        </div>
      </div>
    ))}

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
      Recognize the Pattern
    </h2>

    <p className="mt-3 max-w-3xl text-slate-500 leading-7">
      Strong Linked List problem solving comes from recognizing pointer
      patterns instead of memorizing individual solutions.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

    {[
      {
        title: "Fast + Slow",
        desc: "Cycles, middle node, cycle entry.",
        icon: "01",
      },
      {
        title: "Reverse In-Place",
        desc: "Redirect pointers without creating another list.",
        icon: "02",
      },
      {
        title: "Two Pointers",
        desc: "Nth node from end and distance-based problems.",
        icon: "03",
      },
      {
        title: "Dummy Node",
        desc: "Simplify head changes, merging, and deletion.",
        icon: "04",
      },
      {
        title: "Recursive",
        desc: "Useful for recursive list processing and merging.",
        icon: "05",
      },
      {
        title: "Merge Lists",
        desc: "Compare nodes and connect them in sorted order.",
        icon: "06",
      },
      {
        title: "Pointer Rewiring",
        desc: "Change links while preserving access to the rest of the list.",
        icon: "07",
      },
      {
        title: "Cycle Reasoning",
        desc: "Understand repeated traversal and termination.",
        icon: "08",
      },
    ].map((pattern) => (
      <div
        key={pattern.title}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all"
      >
        <span className="text-xs font-bold text-indigo-500 font-mono">
          {pattern.icon}
        </span>

        <h3 className="font-bold text-slate-900 mt-4">
          {pattern.title}
        </h3>

        <p className="text-sm text-slate-500 mt-2 leading-6">
          {pattern.desc}
        </p>
      </div>
    ))}

  </div>

  <div className="mt-6 bg-slate-950 rounded-3xl p-6 sm:p-8">

    <p className="text-xs font-semibold text-indigo-300">
      QUICK DECISION GUIDE
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-white font-semibold">
          Cycle?
        </p>
        <p className="text-sm text-slate-400 mt-1">
          Fast + Slow
        </p>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-white font-semibold">
          Reverse?
        </p>
        <p className="text-sm text-slate-400 mt-1">
          Rewire pointers
        </p>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-white font-semibold">
          Merge?
        </p>
        <p className="text-sm text-slate-400 mt-1">
          Dummy + traversal
        </p>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-white font-semibold">
          Nth from end?
        </p>
        <p className="text-sm text-slate-400 mt-1">
          Two pointers
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
      Beginner → Advanced
    </h2>

    <p className="mt-3 max-w-3xl text-slate-500 leading-7">
      Build your confidence progressively. Start with basic traversal and
      reversal, then move toward pointer-heavy interview problems and
      advanced list design.
    </p>

  </div>

  <div className="grid sm:grid-cols-3 gap-4 mb-6">

    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <p className="text-xs font-semibold text-emerald-600">
        STAGE 01
      </p>

      <h3 className="font-bold text-slate-900 mt-1">
        Foundation
      </h3>

      <p className="text-xs text-slate-500 mt-2">
        Traversal, insertion, deletion, reversal and basic pointer logic.
      </p>
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <p className="text-xs font-semibold text-amber-600">
        STAGE 02
      </p>

      <h3 className="font-bold text-slate-900 mt-1">
        Patterns
      </h3>

      <p className="text-xs text-slate-500 mt-2">
        Fast/slow pointers, two pointers, merging and reordering.
      </p>
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <p className="text-xs font-semibold text-violet-600">
        STAGE 03
      </p>

      <h3 className="font-bold text-slate-900 mt-1">
        Advanced
      </h3>

      <p className="text-xs text-slate-500 mt-2">
        K-way merging, complex pointer manipulation and advanced design.
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

          <div
            className={`px-6 py-5 border-b ${config.classes.header}`}
          >
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
        <p className="font-semibold text-white">
          Don't memorize the solutions.
        </p>

        <p className="text-sm text-slate-400 mt-2 leading-6">
          Before coding, identify the pointer relationship the problem is
          asking you to manipulate. Once you recognize the pattern, the
          implementation becomes much easier to reason about.
        </p>
      </div>
    </div>

  </div>

</section>

{/* 15. Final CTA */}
<section className="max-w-6xl mx-auto mb-20">

  <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 sm:px-10 py-10 sm:py-12">

    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

    <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

      <div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 mb-4">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Linked List Fundamentals Complete
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Ready to watch the pointers move?
        </h2>

        <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl leading-6">
          Take the concepts from this learning hub into the interactive
          visualizer and see nodes, pointers, insertion, deletion, and
          traversal come together.
        </p>

        <div className="flex flex-wrap gap-2 mt-5">

          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
            Nodes
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
            Pointers
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
            Traversal
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
            Reversal
          </span>

        </div>

      </div>

      <button
        onClick={() => (window.location.href = "/visualizer/linkedlist")}
        className="group shrink-0 inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-indigo-950/20"
      >
        Open Linked List Visualizer
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

    </div>
  </div>

</section>

    </div>
  );
};

export default LinkedListPage;
