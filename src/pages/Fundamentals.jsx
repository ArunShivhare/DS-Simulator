import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  BookOpen,
  Zap,
  Code2,
} from "lucide-react";

const Fundamentals = () => {
  const coreModules = [
    {
      id: "01",
      title: "Time & Space Complexity",
      desc: "Master Big O notation, analyze runtime loops, and optimize memory footprints systematically.",
      count: "12 Lessons",
      badge: "Core",
      color: "indigo",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: "02",
      title: "Memory Mechanics & Arrays",
      desc: "Understand contiguous memory, pointer manipulation, and static vs dynamic allocations.",
      count: "18 Lessons",
      badge: "Essential",
      color: "violet",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 002-2h2a2 2 0 002 2"
          />
        </svg>
      ),
    },
    {
      id: "03",
      title: "Recursion Mechanics",
      desc: "Deconstruct the call stack, design base cases, and map complex execution recursion trees.",
      count: "15 Lessons",
      badge: "Intermediate",
      color: "emerald",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.213 6H16"
          />
        </svg>
      ),
    },
  ];

  const journey = [
    {
      title: "Understand",
      desc: "Learn the concept",
      number: "01",
    },
    {
      title: "Visualize",
      desc: "See it in action",
      number: "02",
    },
    {
      title: "Practice",
      desc: "Test your knowledge",
      number: "03",
    },
    {
      title: "Master",
      desc: "Apply what you learned",
      number: "04",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 md:py-20">

        {/* HEADER */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mb-14 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />

            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-indigo-600">
              Core Curriculum
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-slate-950 mb-6">
            Build{" "}
            <span className="text-indigo-600">
              Fundamentals
            </span>
          </h1>

          <p className="text-slate-500 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl">
            Construct a bulletproof foundation in Data Structures & Algorithms.
            Bridge the gap between raw theory and real-world visualization
            through structured, interactive engineering labs.
          </p>
        </motion.section>

       {/* FEATURE HIGHLIGHTS */}
<motion.section
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="mb-16"
>
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
    {[
      {
        label: "Interactive Visuals",
        sub: "See concepts in motion",
        icon: Eye,
      },
      {
        label: "Deep-Dive Theory",
        sub: "Understand the why",
        icon: BookOpen,
      },
      {
        label: "Gamified Quizzes",
        sub: "Test your knowledge",
        icon: Zap,
      },
      {
        label: "Hands-on Coding",
        sub: "Learn by doing",
        icon: Code2,
      },
    ].map((feat, i) => {
      const Icon = feat.icon;

      return (
        <motion.div
          key={feat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.15 + i * 0.08,
          }}
          whileHover={{ y: -4 }}
          className="
            group relative overflow-hidden
            rounded-2xl
            border border-slate-200
            bg-white
            p-4 sm:p-5
            shadow-sm
            transition-shadow duration-300
            hover:shadow-lg hover:shadow-slate-200/60
          "
        >
          {/* subtle hover accent */}
          <div
            className="
              absolute inset-x-0 top-0 h-[2px]
              bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
            "
          />

          <div className="flex items-start justify-between gap-3">
            {/* Icon container */}
            <div
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl
                bg-indigo-50
                text-indigo-600
                ring-1 ring-indigo-100
                transition-all duration-300
                group-hover:bg-indigo-600
                group-hover:text-white
                group-hover:scale-105
              "
            >
              <Icon size={19} strokeWidth={1.8} />
            </div>

            {/* tiny indicator */}
            <div
              className="
                mt-1 h-1.5 w-1.5 rounded-full
                bg-slate-300
                transition-all duration-300
                group-hover:bg-indigo-500
                group-hover:scale-125
              "
            />
          </div>

          <div className="mt-4">
            <h3
              className="
                text-sm font-semibold text-slate-800
                transition-colors duration-200
                group-hover:text-indigo-600
              "
            >
              {feat.label}
            </h3>

            <p className="mt-1 text-[11px] sm:text-xs text-slate-400">
              {feat.sub}
            </p>
          </div>

          {/* Bottom progress line */}
          <div className="mt-4 h-px w-full bg-slate-100 overflow-hidden">
            <motion.div
              className="h-full w-0 bg-indigo-500"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.45 }}
            />
          </div>
        </motion.div>
      );
    })}
  </div>
</motion.section>

        {/* =====================================================
            NEW VISUAL MODULE — LEARNING JOURNEY
        ====================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mb-20"
        >
          <div
            className="
              relative overflow-hidden
              rounded-3xl
              border border-slate-200
              bg-white
              shadow-sm
            "
          >

            {/* Subtle decorative circle */}
            <div className="
              absolute
              -top-28
              -right-28
              w-64 h-64
              rounded-full
              border border-indigo-100
              pointer-events-none
            " />

            <div className="
              absolute
              -bottom-32
              -left-32
              w-72 h-72
              rounded-full
              border border-slate-100
              pointer-events-none
            " />

            <div className="relative z-10 p-6 sm:p-8 md:p-10">

              {/* Module heading */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">

                <div>
                  <p className="text-[10px] uppercase tracking-[0.17em] font-bold text-indigo-600 mb-2">
                    How you learn
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    Your DSA Foundation
                  </h2>
                </div>

                <p className="text-sm text-slate-400 max-w-sm leading-relaxed md:text-right">
                  A simple path from understanding a concept to actually being
                  able to use it.
                </p>

              </div>

              {/* Desktop Journey */}
              <div className="hidden md:block relative">

                {/* Base line */}
                <div className="
                  absolute
                  left-[12.5%]
                  right-[12.5%]
                  top-[25px]
                  h-px
                  bg-slate-200
                " />

                {/* Animated progress line */}
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "75%" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.4,
                    delay: 0.35,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    left-[12.5%]
                    top-[25px]
                    h-px
                    bg-indigo-500
                  "
                />

                <div className="grid grid-cols-4 gap-5">

                  {journey.map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + index * 0.15,
                      }}
                      className="relative text-center"
                    >

                      {/* Node */}
                      <div className="relative z-10 mx-auto mb-6 flex items-center justify-center">

                        <div
                          className="
                            w-[50px]
                            h-[50px]
                            rounded-full
                            bg-white
                            border-2
                            border-indigo-500
                            flex items-center justify-center
                            shadow-sm
                            transition-all duration-300
                            hover:scale-110
                            hover:shadow-md
                            hover:shadow-indigo-100
                          "
                        >
                          <span className="text-xs font-bold text-indigo-600">
                            {step.number}
                          </span>
                        </div>

                      </div>

                      <h3 className="text-sm font-bold text-slate-900">
                        {step.title}
                      </h3>

                      <p className="mt-1.5 text-xs text-slate-400">
                        {step.desc}
                      </p>

                    </motion.div>
                  ))}

                </div>

                {/* Moving attention indicator */}
                <motion.div
                  initial={{ left: "12.5%" }}
                  animate={{ left: ["12.5%", "37.5%", "62.5%", "87.5%"] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    top-[19px]
                    w-3
                    h-3
                    rounded-full
                    bg-indigo-500
                    ring-4
                    ring-indigo-100
                    -translate-x-1/2
                    pointer-events-none
                  "
                />

              </div>

              {/* Mobile Journey */}
              <div className="md:hidden space-y-3">

                {journey.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.1,
                    }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >

                    <div className="
                      shrink-0
                      w-10 h-10
                      rounded-full
                      bg-indigo-50
                      border border-indigo-100
                      flex items-center justify-center
                    ">
                      <span className="text-xs font-bold text-indigo-600">
                        {step.number}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {step.title}
                      </h3>

                      <p className="text-xs text-slate-400 mt-0.5">
                        {step.desc}
                      </p>
                    </div>

                  </motion.div>
                ))}

              </div>

            </div>
          </div>
        </motion.section>

        {/* LEARNING PATHS */}
        <section>

          <div className="
            flex flex-col sm:flex-row
            sm:items-end
            justify-between
            gap-3
            border-b border-slate-200
            pb-4
            mb-6
          ">

            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-indigo-600 mb-1">
                Start building your foundation
              </p>

              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                Learning Paths
              </h2>
            </div>

            <span className="text-xs text-slate-400 font-medium">
              3 Core Modules Available
            </span>

          </div>

          {/* Module Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {coreModules.map((module) => (

              <div
                key={module.id}
                className="
                  group
                  relative
                  flex flex-col
                  justify-between
                  min-h-[320px]
                  p-6
                  rounded-2xl
                  bg-white
                  border border-slate-200
                  cursor-pointer
                  overflow-hidden

                  transition-all duration-300

                  hover:-translate-y-1
                  hover:shadow-[0_16px_35px_-18px_rgba(79,70,229,0.25)]
                "
              >

                {/* Top accent */}
                <div
                  className={`
                    absolute top-0 left-0
                    w-full h-1
                    transition-transform duration-300
                    origin-left scale-x-0
                    group-hover:scale-x-100
                    ${
                      module.color === "indigo"
                        ? "bg-indigo-600"
                        : module.color === "violet"
                        ? "bg-violet-600"
                        : "bg-emerald-600"
                    }
                  `}
                />

                <div>

                  <div className="flex items-center justify-between mb-7">

                    <div
                      className={`
                        w-11 h-11
                        rounded-xl
                        flex items-center justify-center
                        border
                        transition-all duration-300
                        ${
                          module.color === "indigo"
                            ? "bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-100"
                            : module.color === "violet"
                            ? "bg-violet-50 border-violet-100 text-violet-600 group-hover:bg-violet-100"
                            : "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-100"
                        }
                      `}
                    >
                      {module.icon}
                    </div>

                    <span className="text-xs font-mono font-semibold text-slate-300 group-hover:text-slate-400 transition-colors">
                      #{module.id}
                    </span>

                  </div>

                  <h3
                    className="
                      text-xl font-bold
                      text-slate-900
                      mb-3
                      tracking-tight
                      transition-colors duration-200
                      group-hover:text-indigo-600
                    "
                  >
                    {module.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    {module.desc}
                  </p>

                </div>

                <div className="flex items-center justify-between pt-5 mt-8 border-t border-slate-100">

                  <div className="flex items-center gap-2">

                    <span className="text-xs text-slate-500 font-medium">
                      {module.count}
                    </span>

                    <span className="w-1 h-1 rounded-full bg-slate-300" />

                    <span className="text-[10px] px-2 py-1 rounded-md bg-slate-50 text-slate-500 border border-slate-200 font-semibold">
                      {module.badge}
                    </span>

                  </div>

                  <span
                    className="
                      text-slate-300
                      group-hover:text-indigo-600
                      group-hover:translate-x-1
                      transition-all duration-200
                    "
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>
    </div>
  );
};

export default Fundamentals;