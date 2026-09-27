import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Layers3,
  LockKeyhole,
  Play,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const Login = ({ user }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <div className="min-h-screen grid lg:grid-cols-[1.1fr_0.9fr]">

        {/* =====================================================
            LEFT — LEARNING VISUAL
        ====================================================== */}
        <div className="relative hidden lg:flex items-center justify-center overflow-hidden px-12 xl:px-20">

          {/* subtle background details */}
          <div className="absolute inset-0">
            <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />
            <div className="absolute bottom-[-120px] right-[-100px] h-80 w-80 rounded-full bg-violet-100/50 blur-3xl" />

            {/* grid */}
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
                backgroundSize: "42px 42px",
                maskImage:
                  "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-xl">

            {/* small label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 flex items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
                <Layers3 size={16} />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                DSAVerse Learning Hub
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="max-w-lg text-5xl font-black tracking-[-0.045em] text-slate-950 xl:text-6xl"
            >
              Learn how
              <span className="block text-indigo-600">
                data moves.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 max-w-md text-base leading-7 text-slate-500"
            >
              Build a strong foundation in Data Structures & Algorithms
              through visual learning, interactive simulations, and practice.
            </motion.p>

            {/* =================================================
                VISUAL DATA STRUCTURE CARD
            ================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="relative mt-12"
            >
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.25)]">

                {/* card header */}
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Interactive View
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      Linked List
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-600">
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* nodes */}
                <div className="flex items-center justify-center gap-2 sm:gap-4">
                  {["10", "24", "37", "52"].map((value, index) => (
                    <div
                      key={value}
                      className="flex items-center gap-2 sm:gap-4"
                    >
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          delay: index * 0.25,
                          ease: "easeInOut",
                        }}
                        className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-sm font-bold text-indigo-600"
                      >
                        {value}
                      </motion.div>

                      {index < 3 && (
                        <motion.div
                          animate={{ width: ["18px", "28px", "18px"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                          className="h-px bg-indigo-300"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* footer */}
                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-xs text-slate-400">
                    Nodes connected
                  </span>

                  <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
                    <Play size={11} fill="currentColor" />
                    Explore the flow
                  </span>
                </div>
              </div>

              {/* floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 -top-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg"
              >
                <CheckCircle2
                  size={17}
                  className="text-emerald-500"
                />

                <div>
                  <p className="text-[10px] font-bold text-slate-800">
                    Visual Learning
                  </p>
                  <p className="text-[9px] text-slate-400">
                    Understand, don't memorize
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* =====================================================
            RIGHT — LOGIN
        ====================================================== */}
        <div className="relative flex items-center justify-center px-6 py-12 sm:px-10">

          {/* mobile background accent */}
          <div className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl lg:hidden" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 w-full max-w-md"
          >

            {/* logo */}
            <div className="mb-10 flex justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  width={48}
                  alt="DSAVerse Logo"
                  className="object-contain"
                />

                <div>
                  <p className="text-lg font-black tracking-tight text-slate-900">
                    DSA<span className="text-indigo-600">Verse</span>
                  </p>

                  <p className="text-[10px] font-medium text-slate-400">
                    Learn • Visualize • Master
                  </p>
                </div>
              </div>
            </div>

            {/* heading */}
            <div className="mb-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5">
                <Sparkles size={13} className="text-indigo-600" />

                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-600">
                  Welcome back
                </span>
              </div>

              <h2 className="text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Continue your
                <span className="block text-indigo-600">
                  mastery journey.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Sign in to continue learning Data Structures through
                interactive visualizations and practice.
              </p>
            </div>

            {/* login card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)] sm:p-8">

              <button
                onClick={handleLogin}
                className="
                  group relative flex w-full items-center
                  justify-center gap-3 overflow-hidden
                  rounded-xl border border-slate-200
                  bg-white px-5 py-4
                  text-sm font-bold text-slate-700
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-slate-300
                  hover:shadow-md
                  active:translate-y-0
                "
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-5 w-5"
                />

                <span>Sign in with Google</span>

                <ArrowRight
                  size={17}
                  className="
                    absolute right-5
                    text-slate-300
                    transition-all duration-300
                    group-hover:translate-x-1
                    group-hover:text-indigo-600
                  "
                />
              </button>

              {/* security */}
              <div className="mt-7 flex items-center justify-center gap-2">
                <LockKeyhole
                  size={13}
                  className="text-emerald-500"
                />

                <p className="text-[10px] font-medium text-slate-400">
                  Secure Firebase Authentication
                </p>
              </div>
            </div>

            {/* footer */}
            <p className="mt-7 text-center text-[10px] leading-5 text-slate-400">
              By continuing, you agree to the learning protocols.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;