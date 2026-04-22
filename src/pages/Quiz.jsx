import { useParams } from "react-router-dom";
import { quizData } from "../data/quizData";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const isAdminQuiz = location.pathname.includes("admin");

  const baseQuestions = quizData[type] || [];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const user = auth.currentUser;
  const userId = user?.uid;
  const [quizId, setQuizId] = useState(null);
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [visited, setVisited] = useState({});

  {
    /* 1. Calculate the time units */
  }
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  {
    /* 2. Format as 00:00:00 */
  }
  const formattedTime = [hours, minutes, seconds]
    .map((v) => v.toString().padStart(2, "0"))
    .join(":");

  const checkAttempt = async () => {
    const user = auth.currentUser;
    if (!user || !quizId) return;

    const docRef = doc(db, "users", user.uid);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data();

      if (data.attempts?.[type]?.[quizId]) {
        setAlreadyAttempted(true);
      }
    }
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const shuffleQuestions = (questions) => {
    return shuffleArray(
      questions.map((q) => {
        const shuffledOptions = shuffleArray(q.options);

        return {
          ...q,
          options: shuffledOptions,
        };
      }),
    );
  };

  useEffect(() => {
    if (quizId) {
      checkAttempt();
    }
  }, [quizId]);

  const handleAnswer = (selected) => {
    setAnswers((prev) => ({
      ...prev,
      [current]: selected,
    }));

    setVisited((prev) => ({
      ...prev,
      [current]: true,
    }));
  };

  const calculateScore = () => {
    let newScore = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        newScore++;
      }
    });

    setScore(newScore);
    saveScore(newScore);
    setShowResult(true);
  };

  const saveScore = async (finalScore) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const baseUserData = {
        name: user.displayName || "Anonymous",
        email: user.email,
      };

      if (isAdminQuiz) {
        await setDoc(
          doc(db, "users", user.uid),
          {
            ...baseUserData, // ✅ ADD THIS
            attempts: {
              [type]: {
                [quizId]: {
                  score: finalScore,
                  total: questions.length,
                  timestamp: Date.now(),
                },
              },
            },
          },
          { merge: true },
        );
      } else {
        await setDoc(
          doc(db, "users", user.uid),
          {
            ...baseUserData, // ✅ ADD THIS
            quizzes: {
              [type]: {
                score: finalScore,
                total: questions.length,
                timestamp: Date.now(),
              },
            },
          },
          { merge: true },
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchQuiz = useCallback(async () => {
    const snapshot = await getDocs(collection(db, "quizzes", type, "items"));

    const allQuizzes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const latestQuiz = allQuizzes.sort((a, b) => b.createdAt - a.createdAt)[0];

    const adminQuestions = latestQuiz?.questions || [];

    // 🔥 MERGE BOTH
    if (isAdminQuiz) {
      setQuestions(shuffleQuestions(adminQuestions)); // 🔥 only admin quiz
      setQuizId(latestQuiz?.id);
      setTimeLeft(latestQuiz?.timeLimit || 60); // default to 60 sec if not set
    } else {
      setQuestions(shuffleQuestions(baseQuestions)); // 🔥 only predefined
    }
  }, [type]);

  useEffect(() => {
    const handleSecurityBreach = (reason) => {
      if (!showResult && questions.length > 0) {
        saveScore(score);
        setShowResult(true);
        alert(`Security Violation: ${reason}. Quiz submitted.`);
      }
    };

    // 1. Detect Tab Switching (Visibility)
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        handleSecurityBreach("Tab switching or minimizing");
      }
    };

    // 2. Detect Focus Loss (Clicking outside, opening Copilot/Sidebars)
    const handleBlur = () => {
      handleSecurityBreach(
        "Window focus lost (possible split-screen or external tool)",
      );
    };

    // 3. Detect Resize (Snapping windows or opening side-panels)
    const handleResize = () => {
      // Optional: Only trigger if the width becomes too small (e.g., < 600px)
      if (window.innerWidth > 600) {
        handleSecurityBreach("Screen resized or split-screen activated");
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("resize", handleResize);
    };
  }, [score, showResult, questions.length]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  useEffect(() => {
    const visited =
      JSON.parse(localStorage.getItem(`visitedSteps_${userId}`)) || {};

    if (!visited[type]) visited[type] = [];

    visited[type][3] = true; // Practice

    localStorage.setItem(`visitedSteps_${userId}`, JSON.stringify(visited));
  }, [type]);

  useEffect(() => {
    if (!timeLeft || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          // 🔥 AUTO SUBMIT
          saveScore(score);
          setShowResult(true);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult]);

  if (questions.length === 0) {
    return <div className="text-white p-10">No questions found</div>;
  }

  if (showResult) {
    return (
      <div className="h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-sans overflow-hidden">
        {/* Consistent Background Glows */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10 w-full max-w-lg text-center">
          {/* Decorative Icon */}
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 shadow-2xl">
            <span className="text-4xl">
              {score === questions.length
                ? "👑"
                : score >= questions.length / 2
                  ? "⭐"
                  : "🎯"}
            </span>
          </div>

          {/* Title Section */}
          <h1 className="text-4xl font-black uppercase italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 mb-2">
            Mission Briefing
          </h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-8">
            Challenge Results Compiled
          </p>

          {/* Results Card */}
          <div className="relative group mb-8">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-[2rem] blur-md"></div>

            <div className="relative bg-black/60 border border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl">
              <div className="flex flex-col items-center">
                <span className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">
                  Final Score
                </span>
                <div className="text-7xl font-black tracking-tighter text-white flex items-baseline">
                  {score}
                  <span className="text-2xl text-gray-600 ml-2">
                    / {questions.length}
                  </span>
                </div>

                {/* Feedback Tag */}
                <div className="mt-6">
                  {score === questions.length && (
                    <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/50 text-green-400 text-xs font-bold uppercase tracking-widest">
                      Perfect Accuracy 🔥
                    </span>
                  )}
                  {score >= questions.length / 2 &&
                    score < questions.length && (
                      <span className="px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 text-xs font-bold uppercase tracking-widest">
                        Elite Performance 👍
                      </span>
                    )}
                  {score < questions.length / 2 && (
                    <span className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/50 text-red-400 text-xs font-bold uppercase tracking-widest">
                      System Reboot Required 💪
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-transform active:scale-95"
            >
              Retry Mission
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-transform active:scale-95"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isAdminQuiz && alreadyAttempted) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
        {/* Background Decorative Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600/5 blur-[120px] rounded-full"></div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-gray-900/60 border border-red-500/20 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden group">
            {/* Warning Icon Section */}
            <div className="mb-8 flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-red-500/10 border-2 border-red-500/30 rounded-full flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-pulse">
                  🚫
                </div>
              </div>

              <h2 className="text-3xl font-black tracking-tighter uppercase italic text-red-400">
                Access <span className="text-white">Denied</span>
              </h2>
              <div className="h-1 w-12 bg-red-600 mt-3 rounded-full opacity-50"></div>
            </div>

            {/* Message Body */}
            <div className="space-y-4 mb-10">
              <p className="text-gray-300 text-lg font-bold leading-tight">
                Attempt Limit Reached ❌
              </p>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-[0.2em] leading-relaxed">
                Our records show you have already <br />
                completed this evaluation module.
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate("/progress")}
              className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all active:scale-95 flex items-center justify-center gap-3 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              Return to Progress Page
            </button>

            {/* Terminal Detail */}
            <div className="mt-8 flex items-center justify-center gap-2 opacity-20">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                Validation Error: 0xRE_ATTEMPT_LOCKED
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-4 md:p-8 font-sans">
      {/* Static Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-12 mt-24">
        {/* Left Column: Stats & Grid */}
        <div className="lg:col-span-4 order-2 lg:order-1 mt-18">
          <div className="relative group">
            {/* Subtle outer glow to match the right side */}
            <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-[2rem] blur-sm"></div>

            <div className="relative bg-black/40 border border-white/10 rounded-[2rem] p-6 backdrop-blur-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                  Neural Map
                </h3>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-purple-500 animate-pulse"></div>
                  <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse delay-75"></div>
                </div>
              </div>

              {/* Grid with glass tiles */}
              <div className="grid grid-cols-5 gap-3">
                {questions.map((_, index) => {
                  const isActive = current === index;
                  const isMarked = marked[index];
                  const isAnswered = answers[index];

                  let stateStyles =
                    "border-white/5 bg-white/[0.03] text-gray-500";
                  if (isMarked)
                    stateStyles =
                      "border-yellow-500/50 bg-yellow-500/10 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.1)]";
                  else if (isAnswered)
                    stateStyles =
                      "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]";

                  return (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`relative w-full aspect-square rounded-xl flex items-center justify-center text-[11px] font-mono transition-all duration-300 border ${stateStyles} ${
                        isActive
                          ? "ring-1 ring-purple-500 border-purple-500/50 scale-110 z-10 bg-white/10 text-white"
                          : "hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      {index + 1}
                      {isActive && (
                        <div className="absolute -bottom-1 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_5px_#a855f7]"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Sleeker Submit Button */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <button
                  onClick={calculateScore}
                  className="group/btn relative w-full overflow-hidden rounded-xl p-[1px] transition-all active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all group-hover/btn:opacity-90"></div>
                  <div className="relative bg-black/20 backdrop-blur-md py-3 rounded-[11px] flex items-center justify-center gap-2 transition-all group-hover/btn:bg-transparent">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-50">
                      Terminate Session
                    </span>
                    <svg
                      className="w-4 h-4 text-emerald-400 group-hover/btn:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quiz Card */}
        <div className="lg:col-span-8 order-1 lg:order-2">
          {/* Header Info */}
          <div className="flex justify-between items-end mb-4 px-2">
            <div>
              <h1 className="text-2xl font-black uppercase italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                {type} Challenge
              </h1>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                Progress: {current + 1} / {questions.length}
              </span>
            </div>
            <div
              className={`px-4 py-2 rounded-xl border text-sm font-mono transition-all ${
                timeLeft < 10
                  ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse"
                  : "bg-white/5 border-white/10 text-gray-400"
              }`}
            >
              {formattedTime}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-[2rem] blur-sm"></div>
            <div className="relative bg-black/60 border border-white/10 rounded-[2rem] p-6 md:p-10 backdrop-blur-xl shadow-2xl">
              <h2 className="text-xl md:text-2xl font-bold leading-tight text-white mb-8 min-h-[2rem]">
                <span className="text-purple-500 mr-2 opacity-50">Q.</span>
                {questions[current].question}
              </h2>

              <div className="grid gap-3">
                {questions[current].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    className={`group/opt relative flex items-center w-full p-4 rounded-xl transition-all duration-200 text-left active:scale-[0.99] border ${
                      answers[current] === opt
                        ? "bg-purple-600/20 border-purple-500"
                        : "bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-gray-500 font-mono text-xs font-bold mr-4 group-hover/opt:bg-purple-600 group-hover/opt:text-white">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-base font-medium text-gray-300 group-hover/opt:text-white">
                      {opt}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 justify-between mt-10">
                <div className="flex gap-2">
                  <button
                    disabled={current === 0}
                    onClick={() => setCurrent(current - 1)}
                    className="px-6 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 rounded-lg text-sm font-bold transition-all"
                  >
                    ← Prev
                  </button>
                  <button
                    disabled={current === questions.length - 1}
                    onClick={() => setCurrent(current + 1)}
                    className="px-6 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 rounded-lg text-sm font-bold transition-all"
                  >
                    Next →
                  </button>
                </div>

                <button
                  onClick={() =>
                    setMarked((prev) => ({
                      ...prev,
                      [current]: !prev[current],
                    }))
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                    marked[current]
                      ? "bg-yellow-500 text-black border-yellow-500"
                      : "bg-yellow-500/10 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/20"
                  }`}
                >
                  {marked[current] ? "★ Marked" : "☆ Mark for Review"}
                </button>
              </div>

              <div className="mt-8 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                  style={{
                    width: `${((current + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
