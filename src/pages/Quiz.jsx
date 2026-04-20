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

  useEffect(() => {
    if (quizId) {
      checkAttempt();
    }
  }, [quizId]);

  const handleAnswer = (selected) => {
    const isCorrect = selected === questions[current].answer;

    let newScore = score;

    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    const next = current + 1;

    if (next < questions.length) {
      setCurrent(next);
    } else {
      saveScore(newScore); // ✅ PASS CORRECT VALUE
      setShowResult(true);
    }
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
      setQuestions(adminQuestions); // 🔥 only admin quiz
      setQuizId(latestQuiz?.id);
      setTimeLeft(latestQuiz?.timeLimit || 60); // default to 60 sec if not set
    } else {
      setQuestions(baseQuestions); // 🔥 only predefined
    }
  }, [type]);

  useEffect(() => {
    const handleSecurityBreach = () => {
      if (
        document.visibilityState === "hidden" &&
        !showResult &&
        questions.length > 0
      ) {
        saveScore(score);
        setShowResult(true);
        alert(
          "Security Violation: Tab switching is not allowed. Quiz submitted.",
        );
      }
    };

    document.addEventListener("visibilitychange", handleSecurityBreach);

    return () => {
      document.removeEventListener("visibilitychange", handleSecurityBreach);
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
    <div className="h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      {/* Static Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Compact Top Bar */}
      <div className="w-full max-w-xl flex justify-between items-center mb-4 z-20 mt-20">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
          Question {current + 1} / {questions.length}
        </span>
        <div
          className={`px-3 py-1 rounded-lg border text-xs font-mono ${timeLeft < 10 ? "bg-red-500/10 border-red-500/50 text-red-400 animate-pulse" : "bg-white/5 border-white/10 text-gray-400"}`}
        >
           {formattedTime}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-xl">
        {/* Minimal Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            {type} Challenge
          </h1>
        </div>

        {/* Scaled Down Quiz Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-[2rem] blur-sm"></div>

          <div className="relative bg-black/60 border border-white/10 rounded-[2rem] p-6 md:p-8 backdrop-blur-xl shadow-2xl">
            {/* Question - Clamped text to prevent overflow */}
            <h2 className="text-xl md:text-2xl font-bold leading-tight text-white mb-6 line-clamp-3">
              <span className="text-purple-500 mr-2 opacity-50">Q.</span>
              {questions[current].question}
            </h2>

            {/* Options Grid - Denser layout */}
            <div className="grid gap-2.5">
              {questions[current].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="group/opt relative flex items-center w-full p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all duration-200 text-left active:scale-[0.98]"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-gray-500 font-mono text-xs font-bold mr-3 group-hover/opt:bg-purple-600 group-hover/opt:text-white transition-all">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-base font-medium text-gray-300 group-hover/opt:text-white transition-colors">
                    {opt}
                  </span>
                </button>
              ))}
            </div>

            {/* Minimal Progress Bar */}
            <div className="mt-8">
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                  style={{
                    width: `${((current + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Footer Hint */}
        <p className="text-center mt-6 text-gray-600 text-[9px] font-black uppercase tracking-[0.5em] opacity-40">
          Click to Advance
        </p>
      </div>
    </div>
  );
};

export default Quiz;
