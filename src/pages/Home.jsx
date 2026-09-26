import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = ({ user }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Navbar user={user} />

        {/* Hero Section */}
        <main className="relative overflow-hidden pt-[72px]">
          {/* Very subtle background details */}
          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-[-180px] w-[360px] h-[360px] bg-slate-100 rounded-full blur-3xl pointer-events-none" />

          <section className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 md:py-28 lg:py-32">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-20 items-center">

              {/* Left Content */}
              <div className="text-center lg:text-left">

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-50 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
                  </span>

                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Next-Gen Learning Hub
                  </span>
                </div>

                {/* Heading */}
                <h1 className="mt-7 text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold leading-[0.98] tracking-[-0.045em] text-slate-950">
                  Master Data
                  <br />

                  <span className="relative inline-block text-indigo-600">
                    Structures
                    <span className="absolute left-0 bottom-1 w-full h-[7px] bg-indigo-100 -z-10 rounded-full" />
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-7 text-base sm:text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Stop memorizing code. Understand how data flows internally
                  with{" "}
                  <span className="text-slate-800 font-semibold">
                    interactive simulations
                  </span>{" "}
                  and{" "}
                  <span className="text-slate-800 font-semibold">
                    visual mastery paths
                  </span>
                  .
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start mt-9">
                  <button
                    onClick={() =>
                      navigate(user ? "/dashboard" : "/login")
                    }
                    className="
                      group
                      px-7 py-3.5
                      bg-indigo-600
                      text-white
                      rounded-xl
                      font-semibold
                      text-sm
                      transition-all duration-200
                      hover:bg-indigo-700
                      hover:-translate-y-0.5
                      active:translate-y-0
                      shadow-sm
                      hover:shadow-lg
                      hover:shadow-indigo-200
                    "
                  >
                    <span className="inline-flex items-center gap-2">
                      Start Learning
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>

                  <button
                    onClick={() => navigate("/explore")}
                    className="
                      px-7 py-3.5
                      bg-white
                      border border-slate-200
                      text-slate-700
                      rounded-xl
                      font-semibold
                      text-sm
                      transition-all duration-200
                      hover:bg-slate-50
                      hover:border-slate-300
                      hover:-translate-y-0.5
                      active:translate-y-0
                      shadow-sm
                    "
                  >
                    Explore Features
                  </button>
                </div>

                {/* Mini Stats Footer */}
                <div className="flex items-center gap-7 mt-10 justify-center lg:justify-start">
                  <div className="text-left">
                    <p className="text-2xl font-bold tracking-tight text-slate-900">
                      20+
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] font-semibold text-slate-400">
                      Animations
                    </p>
                  </div>

                  <div className="h-9 w-px bg-slate-200" />

                  <div className="text-left">
                    <p className="text-2xl font-bold tracking-tight text-slate-900">
                      100%
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] font-semibold text-slate-400">
                      Interactive
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative flex items-center justify-center min-h-[390px]">

                {/* Background grid */}
                <div
                  className="
                    absolute
                    w-[330px] h-[330px]
                    opacity-50
                    pointer-events-none
                  "
                  style={{
                    backgroundImage:
                      "linear-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(90deg, #CBD5E1 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                    maskImage:
                      "radial-gradient(circle, black 35%, transparent 72%)",
                  }}
                />

                {/* Main visualization card */}
                <div
                  className="
                    relative z-10
                    w-[310px] sm:w-[360px]
                    bg-white
                    border border-slate-200
                    rounded-2xl
                    shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]
                    p-6
                    transition-transform duration-500
                    hover:-translate-y-2
                  "
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-7">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-slate-400">
                        Interactive View
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800">
                        Data Structure
                      </p>
                    </div>

                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    </div>
                  </div>

                  {/* Nodes */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:text-indigo-600">
                      10
                    </div>

                    <div className="text-slate-300 text-xl">
                      →
                    </div>

                    <div className="w-16 h-16 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-lg font-bold text-indigo-600 transition-all duration-300 hover:-translate-y-1">
                      20
                    </div>

                    <div className="text-slate-300 text-xl">
                      →
                    </div>

                    <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:text-indigo-600">
                      30
                    </div>
                  </div>

                  {/* Connection line */}
                  <div className="relative h-16 mt-2">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 h-10 border-l border-dashed border-indigo-300" />

                    <div className="absolute left-1/2 -translate-x-1/2 top-9 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-md">
                      <span className="text-[10px] font-semibold text-indigo-600">
                        Explore the flow
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Nodes connected
                    </span>

                    <span className="text-xs font-semibold text-emerald-600">
                      ● Active
                    </span>
                  </div>
                </div>

                {/* Small floating detail */}
                <div
                  className="
                    absolute
                    z-20
                    -top-2
                    right-0
                    sm:right-3
                    bg-white
                    border border-slate-200
                    rounded-xl
                    px-3.5 py-2.5
                    shadow-lg
                    transition-transform duration-300
                    hover:-translate-y-1
                  "
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <span className="text-emerald-600 text-sm">
                        ✓
                      </span>
                    </div>

                    <div>
                      <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                        Verified Content
                      </p>

                      <p className="text-[11px] font-semibold text-slate-700">
                        Algorithmically Correct
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;