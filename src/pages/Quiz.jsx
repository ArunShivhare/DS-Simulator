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
import {
  Clock3,
  CheckCircle2,
  Circle,
  Flag,
  ChevronLeft,
  ChevronRight,
  Send,
  Trophy,
  Target,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

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
  const percentage = Math.round(
    (score / questions.length) * 100
  );

  const isPerfect = score === questions.length;
  const isPassed = score >= questions.length / 2;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center py-24 px-4 sm:px-6 py-10 font-sans">

      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-7">
          <div
            className={`mx-auto h-16 w-16 rounded-2xl flex items-center justify-center border shadow-sm ${
              isPerfect
                ? "bg-amber-50 border-amber-200"
                : isPassed
                ? "bg-emerald-50 border-emerald-200"
                : "bg-indigo-50 border-indigo-200"
            }`}
          >
            {isPerfect ? (
              <Trophy
                size={28}
                className="text-amber-500"
              />
            ) : isPassed ? (
              <CheckCircle2
                size={28}
                className="text-emerald-500"
              />
            ) : (
              <BookOpen
                size={28}
                className="text-indigo-500"
              />
            )}
          </div>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">
            Assessment Complete
          </p>

          <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
            Quiz Results
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Your performance summary is ready.
          </p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Score Section */}
          <div className="p-7 sm:p-9 text-center border-b border-slate-100">

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Final Score
            </p>

            <div className="mt-3 flex items-baseline justify-center">
              <span className="text-6xl sm:text-7xl font-black tracking-tight text-slate-950">
                {score}
              </span>

              <span className="ml-2 text-2xl font-bold text-slate-300">
                / {questions.length}
              </span>
            </div>

            {/* Percentage */}
            <div className="mt-5 flex justify-center">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${
                  isPerfect
                    ? "bg-amber-50 border-amber-200 text-amber-700"
                    : isPassed
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-rose-50 border-rose-200 text-rose-600"
                }`}
              >
                <Target size={13} />
                {percentage}% Accuracy
              </div>
            </div>

            {/* Progress */}
            <div className="mt-7 max-w-md mx-auto">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isPerfect
                      ? "bg-amber-500"
                      : isPassed
                      ? "bg-emerald-500"
                      : "bg-indigo-600"
                  }`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="p-6 sm:p-7">

            <div
              className={`rounded-xl border p-4 ${
                isPerfect
                  ? "bg-amber-50 border-amber-100"
                  : isPassed
                  ? "bg-emerald-50 border-emerald-100"
                  : "bg-indigo-50 border-indigo-100"
              }`}
            >
              <div className="flex items-start gap-3">

                <div
                  className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isPerfect
                      ? "bg-white text-amber-500"
                      : isPassed
                      ? "bg-white text-emerald-500"
                      : "bg-white text-indigo-500"
                  }`}
                >
                  {isPerfect ? (
                    <Trophy size={17} />
                  ) : isPassed ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    <BookOpen size={17} />
                  )}
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {isPerfect
                      ? "Perfect accuracy"
                      : isPassed
                      ? "Solid performance"
                      : "Keep building your foundation"}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {isPerfect
                      ? "You answered every question correctly."
                      : isPassed
                      ? "You answered at least half of the questions correctly."
                      : "Review the concepts and try the assessment again."}
                  </p>
                </div>

              </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-3 mt-5">

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Correct
                </p>

                <p className="mt-1 text-xl font-black text-emerald-600">
                  {score}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Questions
                </p>

                <p className="mt-1 text-xl font-black text-slate-800">
                  {questions.length}
                </p>
              </div>

            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">

              <button
                onClick={() => window.location.reload()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm"
              >
                <BookOpen size={15} />
                Retry Quiz
              </button>

              <button
                onClick={() => (window.location.href = "/progress")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 active:scale-[0.98] transition-all"
              >
                Exit
              </button>

            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-medium text-slate-400">
          <ShieldCheck
            size={13}
            className="text-emerald-500"
          />
          Assessment completed securely
        </div>

      </div>
    </div>
  );
}

  if (isAdminQuiz && alreadyAttempted) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 sm:px-6 py-10 font-sans">

      <div className="w-full max-w-md">

        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shadow-sm">
            <AlertTriangle
              size={28}
              className="text-amber-500"
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="p-7 sm:p-8 text-center border-b border-slate-100">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
              <ShieldCheck
                size={12}
                className="text-emerald-500"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                Assessment Status
              </span>
            </div>

            <h2 className="mt-5 text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              Attempt Already Used
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Our records show that you have already completed this assessment.
              A second attempt is not available.
            </p>

          </div>

          {/* Details */}
          <div className="p-6 sm:p-7">

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <div className="flex items-start gap-3">

                <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center shrink-0">
                  <AlertTriangle
                    size={16}
                    className="text-amber-500"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Attempt limit reached
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    This quiz can only be submitted once. Your previous
                    submission has already been recorded.
                  </p>
                </div>

              </div>
            </div>

            {/* Quiz Type */}
            <div className="mt-4 flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Assessment
              </span>

              <span className="text-xs font-bold capitalize text-slate-700">
                {type}
              </span>
            </div>

            {/* Action */}
            <button
              onClick={() => navigate("/progress")}
              className="mt-6 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 active:scale-[0.98] transition-all"
            >
              <ChevronLeft size={16} />
              Return to Progress
            </button>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-medium text-slate-400">
          <CheckCircle2
            size={13}
            className="text-emerald-500"
          />
          Previous attempt securely recorded
        </div>

      </div>
    </div>
  );
}

  return (
  <div className="min-h-screen bg-slate-50 text-slate-900 px-4 sm:px-6 pt-28 pb-10 font-sans">
    <div className="w-full max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <BookOpen size={15} className="text-indigo-600" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                Assessment
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              {type.charAt(0).toUpperCase() + type.slice(1)}
              <span className="text-indigo-600"> Challenge</span>
            </h1>

            <p className="mt-1.5 text-sm text-slate-500">
              Question {current + 1} of {questions.length}
            </p>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border font-mono text-sm font-bold transition-all ${
              timeLeft < 10
                ? "bg-red-50 border-red-200 text-red-600 animate-pulse"
                : "bg-white border-slate-200 text-slate-700 shadow-sm"
            }`}
          >
            <Clock3 size={16} />

            <span>{formattedTime}</span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Question Navigator */}
        <aside className="lg:col-span-4 order-2 lg:order-1">

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm lg:sticky lg:top-24">

            {/* Navigator Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Question Map
                </h3>

                <p className="text-[11px] text-slate-400 mt-1">
                  Navigate through the assessment
                </p>
              </div>

              <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                <Flag size={14} className="text-slate-400" />
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-5 text-[10px] font-medium text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Current
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Answered
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Marked
              </div>
            </div>

            {/* Question Grid */}
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((_, index) => {
                const isActive = current === index;
                const isMarked = marked[index];
                const isAnswered = answers[index];

                let stateStyles =
                  "bg-slate-50 border-slate-200 text-slate-400";

                if (isMarked) {
                  stateStyles =
                    "bg-amber-50 border-amber-200 text-amber-600";
                } else if (isAnswered) {
                  stateStyles =
                    "bg-emerald-50 border-emerald-200 text-emerald-600";
                }

                return (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`relative aspect-square rounded-xl flex items-center justify-center text-xs font-semibold border transition-all duration-200 ${stateStyles} ${
                      isActive
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-sm scale-[1.04] z-10"
                        : "hover:border-indigo-200 hover:bg-indigo-50"
                    }`}
                  >
                    {index + 1}

                    {isActive && (
                      <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Progress Summary */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-500">
                  Completion
                </span>

                <span className="text-[11px] font-bold text-slate-700">
                  {Object.keys(answers).length}/{questions.length}
                </span>
              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (Object.keys(answers).length / questions.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-5 pt-5 border-t border-slate-100">
              <button
                onClick={calculateScore}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm"
              >
                <Send size={15} />
                Submit Quiz
              </button>

              <p className="mt-2 text-center text-[10px] text-slate-400">
                Make sure you've reviewed your answers.
              </p>
            </div>
          </div>
        </aside>

        {/* Question Area */}
        <main className="lg:col-span-8 order-1 lg:order-2">

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* Question Header */}
            <div className="px-5 sm:px-7 py-4 border-b border-slate-100 flex items-center justify-between">

              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">
                  {current + 1}
                </span>

                <span className="text-xs font-semibold text-slate-500">
                  Question
                </span>
              </div>

              {marked[current] && (
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  <Flag size={12} />
                  Marked for review
                </div>
              )}
            </div>

            {/* Question Content */}
            <div className="p-5 sm:p-8">

              <h2 className="text-xl sm:text-2xl font-bold leading-relaxed text-slate-900 mb-7">
                {questions[current].question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {questions[current].options.map((opt, i) => {
                  const selected = answers[current] === opt;

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      className={`group flex items-center w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                        selected
                          ? "bg-indigo-50 border-indigo-500 shadow-sm"
                          : "bg-white border-slate-200 hover:border-indigo-200 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 mr-4 text-xs font-bold border transition-all ${
                          selected
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "bg-slate-50 border-slate-200 text-slate-500 group-hover:border-indigo-200 group-hover:text-indigo-600"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>

                      <span
                        className={`text-sm sm:text-base font-medium ${
                          selected
                            ? "text-indigo-900"
                            : "text-slate-700"
                        }`}
                      >
                        {opt}
                      </span>

                      <div className="ml-auto">
                        {selected ? (
                          <CheckCircle2
                            size={19}
                            className="text-indigo-600"
                          />
                        ) : (
                          <Circle
                            size={19}
                            className="text-slate-300 group-hover:text-indigo-300"
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mt-8 pt-6 border-t border-slate-100">

                <button
                  disabled={current === 0}
                  onClick={() => setCurrent(current - 1)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <button
                  onClick={() =>
                    setMarked((prev) => ({
                      ...prev,
                      [current]: !prev[current],
                    }))
                  }
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    marked[current]
                      ? "bg-amber-50 border-amber-300 text-amber-700"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600"
                  }`}
                >
                  <Flag size={15} />
                  {marked[current]
                    ? "Marked for Review"
                    : "Mark for Review"}
                </button>

                <button
                  disabled={current === questions.length - 1}
                  onClick={() => setCurrent(current + 1)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Question Progress */}
              <div className="mt-7">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Question Progress
                  </span>

                  <span className="text-[10px] font-bold text-slate-500">
                    {Math.round(
                      ((current + 1) / questions.length) * 100
                    )}
                    %
                  </span>
                </div>

                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        ((current + 1) / questions.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-medium text-slate-400">
            <ShieldCheck size={13} className="text-emerald-500" />
            Assessment session is securely monitored
          </div>
        </main>
      </div>
    </div>
  </div>
);
};

export default Quiz;
