import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

import {
  Layers3,
  Route,
  TerminalSquare,
  Sprout,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    title: "Interactive Visualization",
    desc: "Watch data structures come to life with smooth, logic-driven animations.",
    icon: Layers3,
    number: "01",
    accent: "indigo",
  },
  {
    title: "Step-by-Step Simulation",
    desc: "Understand each operation clearly with granular control over every step.",
    icon: Route,
    number: "02",
    accent: "violet",
  },
  {
    title: "Code Preview",
    desc: "View high-performance implementations in multiple languages instantly.",
    icon: TerminalSquare,
    number: "03",
    accent: "sky",
  },
  {
    title: "Beginner Friendly",
    desc: "Designed to take students from zero to DSA mastery with ease.",
    icon: Sprout,
    number: "04",
    accent: "emerald",
  },
];

const structures = [
  { name: "Array", path: "/learn/array", complexity: "O(1) Access" },
  { name: "Stack", path: "/learn/stack", complexity: "LIFO Logic" },
  { name: "Queue", path: "/learn/queue", complexity: "FIFO Logic" },
  {
    name: "Linked List",
    path: "/learn/linkedlist",
    complexity: "Dynamic Nodes",
  },
];

// Decorative illustrations only. No additional functionality.
const StructureIllustration = ({ name }) => {
  const node =
    "flex h-10 w-10 items-center justify-center rounded-lg border " +
    "border-indigo-200 bg-white text-xs font-semibold text-indigo-700";

  if (name === "Array") {
    return (
      <div className="flex items-end gap-1.5">
        {[10, 20, 30, 40].map((value, index) => (
          <div key={value} className="text-center">
            <div className={node}>{value}</div>
            <span className="mt-1 block text-[10px] text-slate-400">
              {index}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (name === "Stack") {
    return (
      <div className="flex flex-col items-center gap-1">
        {[30, 20, 10].map((value, index) => (
          <div
            key={value}
            className={
              node + (index === 0 ? " border-indigo-400 bg-indigo-100" : "")
            }
          >
            {value}
          </div>
        ))}
      </div>
    );
  }

  if (name === "Queue") {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-indigo-400">→</span>
        {[10, 20, 30].map((value) => (
          <div key={value} className={node}>
            {value}
          </div>
        ))}
        <span className="text-indigo-400">→</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {[10, 20, 30].map((value, index) => (
        <div key={value} className="flex items-center gap-1">
          <div className={node}>{value}</div>
          {index !== 2 && <span className="text-indigo-400">→</span>}
        </div>
      ))}
    </div>
  );
};

const Explore = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar user={user} />

      <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 lg:px-10">
        {/* HERO SECTION */}
        <section className="mx-auto mb-20 max-w-3xl text-center md:mb-24">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span className="text-xs font-semibold tracking-wide text-indigo-700">
              DSAVerse
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl md:text-7xl">
              Explore
            </h1>

            <img
              width={72}
              src="/logo.png"
              alt="Logo"
              className="h-14 w-14 object-contain sm:h-[72px] sm:w-[72px]"
            />

            <h1 className="text-5xl font-bold tracking-tight text-indigo-600 sm:text-6xl md:text-7xl">
              Features
            </h1>
          </div>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            A high-performance visual environment designed to bridge the gap
            between <span className="font-semibold text-slate-800">theory</span>{" "}
            and{" "}
            <span className="font-semibold text-indigo-600">
              implementation
            </span>
            .
          </p>
        </section>

        {/* SUPPORTED MODULES */}
        <section className="mb-20 md:mb-28">
          <div className="mb-8 flex items-center gap-5">
            <h2 className="shrink-0 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Supported Modules
            </h2>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {structures.map((ds, index) => (
              <div
                key={index}
                onClick={() => navigate(ds.path)}
                className="
                  group relative cursor-pointer overflow-hidden
                  rounded-2xl border border-slate-200 bg-white
                  p-5 transition-all duration-300
                  hover:-translate-y-1 hover:border-indigo-200
                  hover:shadow-[0_14px_35px_-18px_rgba(79,70,229,0.25)]
                  sm:p-6
                "
              >
                {/* Decorative structure illustration */}
                <div
                  className="
                    mb-6 flex h-44 items-center justify-center
                    overflow-hidden rounded-xl border border-indigo-100
                    bg-indigo-50/70 px-3
                    transition-colors duration-300
                    group-hover:bg-indigo-50
                  "
                >
                  <div className="transition-transform duration-300 group-hover:scale-105">
                    <StructureIllustration name={ds.name} />
                  </div>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  {ds.name}
                </h3>

                <p className="mt-2 text-xs font-semibold tracking-wide text-indigo-600">
                  {ds.complexity}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold text-slate-500 transition-colors group-hover:text-indigo-600">
                    Enter Module
                  </span>

                  <span className="text-lg text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-indigo-600">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="mb-20 md:mb-28">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500">
                Built for understanding
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                More than just visualizations.
              </h2>
            </div>

            <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Designed around learning
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  onClick={() => navigate("/dashboard")}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.07,
                  }}
                  whileHover={{ y: -4 }}
                  className="
            group relative cursor-pointer overflow-hidden
            rounded-2xl border border-slate-200
            bg-white p-6 sm:p-7
            transition-shadow duration-300
            hover:border-slate-300
            hover:shadow-[0_18px_40px_-20px_rgba(15,23,42,0.25)]
          "
                >
                  {/* background number */}
                  <span
                    className="
              pointer-events-none absolute
              -right-2 -top-7
              text-[110px] font-black
              leading-none text-slate-50
              transition-colors duration-300
              group-hover:text-indigo-50
            "
                  >
                    {item.number}
                  </span>

                  <div className="relative z-10 flex items-start justify-between">
                    {/* icon */}
                    <div
                      className="
                flex h-12 w-12 items-center justify-center
                rounded-xl border border-slate-200
                bg-slate-50 text-slate-600
                transition-all duration-300
                group-hover:border-indigo-100
                group-hover:bg-indigo-50
                group-hover:text-indigo-600
                group-hover:scale-105
              "
                    >
                      <Icon size={21} strokeWidth={1.8} />
                    </div>

                    {/* arrow */}
                    <div
                      className="
                flex h-9 w-9 items-center justify-center
                rounded-full border border-slate-200
                text-slate-300
                transition-all duration-300
                group-hover:border-indigo-200
                group-hover:bg-indigo-50
                group-hover:text-indigo-600
              "
                    >
                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>

                  <div className="relative z-10 mt-8 max-w-md">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-[0.18em] text-slate-400">
                        {item.number}
                      </span>

                      <span className="h-px w-6 bg-slate-200 transition-all duration-300 group-hover:w-10 group-hover:bg-indigo-300" />
                    </div>

                    <h3
                      className="
                text-lg font-bold tracking-tight text-slate-900
                transition-colors duration-200
                group-hover:text-indigo-600
              "
                    >
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.desc}
                    </p>
                  </div>

                  {/* bottom interaction line */}
                  <div className="relative z-10 mt-7 h-px w-full overflow-hidden bg-slate-100">
                    <motion.div
                      className="h-full bg-indigo-500"
                      initial={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.45 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-indigo-100 bg-indigo-50 px-6 py-12 text-center sm:px-12 sm:py-16">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-indigo-200/60" />
          <div className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full border border-indigo-200/60" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full border border-indigo-200/40" />

          <div className="relative z-10">
            <h2 className="mx-auto mb-8 max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Ready to optimize your learning?
            </h2>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => navigate(user ? "/dashboard" : "/login")}
                className="
                  rounded-xl bg-indigo-600 px-8 py-3.5
                  text-sm font-semibold text-white shadow-sm
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-indigo-700
                  hover:shadow-md active:translate-y-0
                "
              >
                Start Learning Now
              </button>

              <button
                onClick={() => navigate("/")}
                className="
                  rounded-xl border border-slate-200 bg-white
                  px-8 py-3.5 text-sm font-semibold text-slate-700
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:border-slate-300
                  hover:bg-slate-50 active:translate-y-0
                "
              >
                Back To Home
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Explore;
