import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

const structures = ["array", "stack", "queue", "linkedlist"];

const Progress = () => {
  const navigate = useNavigate();

  const [quizScores, setQuizScores] = useState({});
  const [availableQuizzes, setAvailableQuizzes] = useState({});
  const user = auth.currentUser;
  const userId = user?.uid;
  const [attempts, setAttempts] = useState({});

  const [progressState, setProgressState] = useState({
    array: [false, false, false, false],
    stack: [false, false, false, false],
    queue: [false, false, false, false],
    linkedlist: [false, false, false, false],
  });

  const handleCheck = (type, index) => {
    const updated = { ...progressState };
    updated[type][index] = !updated[type][index];

    setProgressState(updated);

    // 🔥 SAVE FULL ARRAY
    saveProgress(type, updated[type]);
  };

  const saveProgress = async (type, stepsArray) => {
    const user = auth.currentUser;

    if (!user) return;

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          progress: {
            [type]: stepsArray,
          },
        },
        { merge: true },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const loadAvailableQuizzes = async () => {
    const types = ["array", "stack", "queue", "linkedlist"];

    const quizMap = {};

    try {
      for (let type of types) {
        const snapshot = await getDocs(
          collection(db, "quizzes", type, "items"),
        );

        quizMap[type] = !snapshot.empty; // ✅ if quiz exists
      }

      setAvailableQuizzes(quizMap);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProgress = async () => {
    const user = auth.currentUser;

    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.progress) {
          const newState = { ...progressState };

          Object.keys(newState).forEach((type) => {
            if (data.progress[type]) {
              newState[type] = data.progress[type];
            }
          });

          if (data.attempts) {
            setAttempts(data.attempts);
          }

          setProgressState(newState);
        }
        if (data.quizzes) {
          setQuizScores(data.quizzes);
        }
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  };

  const isVisited = (type, index) => {
    const visited =
      JSON.parse(localStorage.getItem(`visitedSteps_${userId}`)) || {};

    return visited[type]?.[index];
  };

  useEffect(() => {
    loadProgress();
    loadAvailableQuizzes();
  }, []);

  const stepLabels = ["Intro", "Implementation", "Visualization", "Practice"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-6 py-24 font-sans selection:bg-purple-500/30 overflow-hidden">
      {/* 1. Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-6xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 tracking-tighter">
          Your Mastery Hub 🚀
        </h1>
        <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
          Track your journey from a beginner to a{" "}
          <span className="text-purple-400 font-semibold">
            Data Structures expert
          </span>
          .
        </p>
      </div>

      {/* 2. Structures Grid */}
      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {structures.map((type) => {
          const checkedArray = progressState[type];
          const completedSteps = checkedArray.filter(Boolean).length;
          const progress = completedSteps * 25;

          return (
            <div
              key={type}
              className="group relative bg-gray-900/50 border border-white/10 rounded-[2.5rem] p-8 md:p-10 hover:border-purple-500/40 transition-all duration-500 shadow-2xl backdrop-blur-sm flex flex-col"
            >
              {/* Decorative Background Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/10 blur-[80px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700"></div>

              {/* Header: Title & Leaderboard */}
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter text-white group-hover:text-purple-400 transition-colors duration-300">
                    {type}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                    <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em]">
                      Interactive Roadmap
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/leaderboard")}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  Leaderboard 🏆
                </button>
              </div>

              {/* Roadmap Steps */}
              <div className="space-y-4 mb-10 relative z-10 flex-grow">
                {checkedArray.map((checked, i) => {
                  const isLocked = i !== 0 && !checkedArray[i - 1];
                  const isCheckboxDisabled = isLocked || !isVisited(type, i);

                  return (
                    <div
                      key={i}
                      disabled={isCheckboxDisabled}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border ${
                        checked
                          ? "bg-emerald-500/5 border-emerald-500/20"
                          : isLocked
                            ? "bg-black/20 border-white/5 opacity-50"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {/* Checkbox implementation */}
                      <div className="relative flex items-center justify-center shrink-0">
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={isLocked}
                          onChange={() => handleCheck(type, i)}
                          className={`w-7 h-7 rounded-lg border-2 transition-all appearance-none cursor-pointer disabled:cursor-not-allowed ${
                            checked
                              ? "bg-emerald-500 border-emerald-500"
                              : "bg-gray-800 border-gray-600"
                          }`}
                        />
                        {checked && (
                          <span className="absolute text-white font-bold pointer-events-none text-base">
                            ✓
                          </span>
                        )}
                      </div>

                      {/* Navigation Link */}
                      <span
                        onClick={() => {
                          if (!isLocked) {
                            if (i === 0) navigate(`/learn/${type}`);
                            else if (i === 1) navigate(`/learn/${type}`);
                            else if (i === 2) navigate(`/visualizer/${type}`);
                            else if (i === 3) navigate(`/quiz/${type}`);
                          }
                        }}
                        className={`text-lg font-bold transition-all ${
                          isLocked
                            ? "text-gray-600 cursor-not-allowed"
                            : checked
                              ? "text-emerald-400"
                              : "text-gray-300 hover:text-white cursor-pointer hover:translate-x-1"
                        }`}
                      >
                        {stepLabels[i]}
                        {isLocked && (
                          <span className="ml-3 text-[10px] opacity-50 italic font-medium tracking-wide">
                            LOCKED 🔒
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress & History Section */}
              <div className="relative z-10 pt-8 border-t border-white/10">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">
                    Mastery Progress
                  </span>
                  <span
                    className={`text-3xl font-black italic ${progress === 100 ? "text-emerald-400" : "text-purple-400"}`}
                  >
                    {progress}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-black/40 h-3.5 rounded-full overflow-hidden border border-white/5 p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      progress === 100
                        ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        : "bg-gradient-to-r from-purple-600 to-blue-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Score & History Footer */}
                <div className="mt-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* RESTORED: Quiz Scores */}
                    {quizScores[type] !== undefined && (
                      <div className="bg-yellow-400/5 border border-yellow-400/20 p-4 rounded-2xl flex flex-col justify-center">
                        <p className="text-[10px] text-yellow-600 uppercase font-black tracking-widest mb-1 text-center">
                          Practice Score
                        </p>
                        <p className="text-2xl font-black text-yellow-400 text-center">
                          {quizScores[type]?.score}{" "}
                          <span className="text-sm font-light text-yellow-600/60">
                            / {quizScores[type]?.total}
                          </span>
                        </p>
                      </div>
                    )}

                    {/* RESTORED: History Attempts */}
                    {attempts[type] && (
                      <div className="bg-blue-400/5 border border-blue-400/20 p-4 rounded-2xl max-h-24 overflow-y-auto scrollbar-hide">
                        <p className="text-[10px] text-blue-500 uppercase font-black tracking-widest mb-2">
                          Previous Attempts
                        </p>
                        <div className="space-y-1">
                          {Object.entries(attempts[type]).map(
                            ([id, attempt]) => (
                              <div
                                key={id}
                                className="text-xs text-blue-300/70 font-medium flex justify-between"
                              >
                                <span>Attempt {id.slice(-2)}:</span>
                                <span className="text-blue-400 font-bold">
                                  {attempt.score}/{attempt.total}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Admin Panel Button */}
                  {availableQuizzes[type] && progress === 100 && (
                    <button
                      onClick={() => navigate(`/quiz/${type}/admin`)}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-emerald-900/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 uppercase tracking-wider"
                    >
                      New Test Available 🚀
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;
