import { useNavigate } from "react-router-dom";
import { FaLayerGroup } from "react-icons/fa";
import { GiStack } from "react-icons/gi";
import { MdQueue } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Navbar from "../components/Navbar";
import Fundamentals from "../pages/Fundamentals";

const structures = [
  {
    name: "Array",
    path: "array",
    icon: <FaLayerGroup size={44} />,
    desc: "Fast access, contiguous memory, powerful searching.",
    tag: "O(1) Access",
  },
  {
    name: "Stack",
    path: "stack",
    icon: <GiStack size={44} />,
    desc: "LIFO structure used in recursion & undo operations.",
    tag: "LIFO Logic",
  },
  {
    name: "Queue",
    path: "queue",
    icon: <MdQueue size={44} />,
    desc: "FIFO structure used in scheduling & buffering.",
    tag: "FIFO Logic",
  },
  {
    name: "Linked List",
    path: "linkedlist",
    icon: <TbListDetails size={44} />,
    desc: "Dynamic memory, efficient insert/delete operations.",
    tag: "Dynamic",
  },
];

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar user={user} />

      <main className="pt-[72px]">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-16 md:pt-20 pb-14">

            <div className="max-w-4xl mx-auto text-center">

              <div className="inline-flex items-center gap-2 px-3.5 py-2 mb-6 bg-white border border-slate-200 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />

                <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-slate-500">
                  Learning Dashboard
                </span>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5">

                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.045em] text-slate-950">
                  Master Data
                </h2>

                <img
                  width={70}
                  src="/logo.png"
                  alt="Logo"
                  className="w-14 sm:w-16 md:w-[70px] object-contain transition-transform duration-300 hover:scale-105"
                />

                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.045em] text-slate-950">
                  Structures
                </h2>

              </div>

              <p className="mt-6 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                The ultimate environment to{" "}
                <span className="text-indigo-600 font-semibold">
                  visualize
                </span>
                ,
                <span className="text-slate-800 font-semibold ml-1">
                  simulate
                </span>
                , and master core concepts.
              </p>

            </div>
          </div>
        </section>

        {/* MODULE TITLE */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

          <div className="flex items-center gap-5 mb-7">

            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-indigo-600 mb-1">
                Start here
              </p>

              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                Choose Module
              </h3>
            </div>

            <div className="h-px flex-1 bg-slate-200 mt-5" />

          </div>

        </section>

        {/* FUNDAMENTALS */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mb-16">

          <div
            onClick={() => navigate("/fundamentals")}
            className="
              group
              cursor-pointer
              bg-white
              border border-slate-200
              rounded-2xl
              p-6 md:p-8
              flex flex-col md:flex-row
              items-start md:items-center
              justify-between
              gap-6
              shadow-sm

              transition-all
              duration-300

              hover:border-indigo-200
              hover:shadow-[0_12px_35px_-15px_rgba(79,70,229,0.25)]
              hover:-translate-y-0.5
            "
          >

            {/* Left */}
            <div className="flex items-start gap-5">

              <div
                className="
                  shrink-0
                  w-14 h-14
                  rounded-xl
                  bg-indigo-50
                  border border-indigo-100
                  flex items-center justify-center
                  text-2xl
                  transition-transform duration-300
                  group-hover:scale-105
                "
              >
                📚
              </div>

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-600 mb-1.5">
                  Build Fundamentals
                </p>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  Learn DSA From Scratch
                </h3>

                <p className="text-sm md:text-base text-slate-500 mt-2 max-w-3xl leading-relaxed">
                  Master Arrays, Linked Lists, Stacks, Queues, Trees, Graphs,
                  Recursion and Problem Solving with structured lessons.
                </p>

              </div>

            </div>

            {/* Right */}
            <div
              className="
                shrink-0
                flex items-center gap-2
                px-5 py-3
                bg-indigo-600
                text-white
                rounded-lg
                text-sm
                font-semibold

                transition-all duration-200
                group-hover:bg-indigo-700
                group-hover:shadow-md
              "
            >
              Start Learning

              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>

          </div>

        </section>

        {/* FEATURE STRIP */}
        <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pb-16">

          <div className="grid md:grid-cols-3 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

            {[
              {
                title: "Visual Learning",
                desc: "Interactive simulations for every step.",
                color: "bg-indigo-600",
              },
              {
                title: "Code + Theory",
                desc: "Real-world implementations & deep dives.",
                color: "bg-sky-600",
              },
              {
                title: "Practice Ready",
                desc: "Solve problems and track your score.",
                color: "bg-emerald-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`
                  relative p-6 sm:p-7
                  ${i !== 2 ? "border-b md:border-b-0 md:border-r border-slate-200" : ""}
                  transition-colors duration-200
                  hover:bg-slate-50
                `}
              >
                <div className={`w-2 h-2 rounded-full ${item.color} mb-4`} />

                <h3 className="font-bold text-sm text-slate-800 mb-1.5">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* STRUCTURES */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-24">

          <div className="flex items-end justify-between mb-7">

            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-indigo-600 mb-1">
                Interactive learning
              </p>

              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                Data Structures
              </h3>
            </div>

            <span className="hidden sm:block text-xs text-slate-400">
              Choose a structure to explore
            </span>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {structures.map((item) => (
              <div
                key={item.name}
                onClick={() => navigate(`/visualizer/${item.path}`)}
                className="
                  group
                  relative
                  bg-white
                  border border-slate-200
                  rounded-2xl
                  p-6
                  cursor-pointer
                  overflow-hidden

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-indigo-200
                  hover:shadow-[0_15px_35px_-18px_rgba(79,70,229,0.28)]
                "
              >

                {/* Small accent */}
                <div
                  className="
                    absolute
                    top-0 left-0
                    w-full h-1
                    bg-indigo-600
                    scale-x-0
                    origin-left
                    group-hover:scale-x-100
                    transition-transform duration-300
                  "
                />

                {/* Icon */}
                <div
                  className="
                    w-14 h-14
                    rounded-xl
                    bg-slate-50
                    border border-slate-100
                    flex items-center justify-center
                    text-slate-500

                    transition-all
                    duration-300

                    group-hover:bg-indigo-50
                    group-hover:border-indigo-100
                    group-hover:text-indigo-600
                    group-hover:-translate-y-0.5
                  "
                >
                  {item.icon}
                </div>

                {/* Tag */}
                <p className="mt-6 text-[10px] font-bold text-indigo-600 uppercase tracking-[0.15em]">
                  {item.tag}
                </p>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mt-1.5">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mt-3 min-h-[63px]">
                  {item.desc}
                </p>

                {/* Action */}
                <div
                  className="
                    mt-6
                    pt-4
                    border-t border-slate-100
                    text-xs
                    font-semibold
                    text-slate-400

                    transition-colors
                    duration-200

                    group-hover:text-indigo-600
                  "
                >
                  Launch Visualizer

                  <span className="inline-block ml-1 transition-transform duration-200 group-hover:translate-x-1">
                    →
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

export default Dashboard;