import { useParams } from "react-router-dom";
import { quizData } from "../data/quizData";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";

const Quiz = () => {
  const { type } = useParams();

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
        { merge: true }
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
        { merge: true }
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
    } else {
      setQuestions(baseQuestions); // 🔥 only predefined
    }
  }, [type]);

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

  if (questions.length === 0) {
    return <div className="text-white p-10">No questions found</div>;
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-4">Quiz Completed 🎉</h1>

        <p className="text-xl mb-6">
          Your Score: {score} / {questions.length}
        </p>

        {/* FEEDBACK */}
        {score === questions.length && (
          <p className="text-green-400">Perfect Score 🔥</p>
        )}

        {score >= questions.length / 2 && score < questions.length && (
          <p className="text-yellow-400">Good Job 👍</p>
        )}

        {score < questions.length / 2 && (
          <p className="text-red-400">Keep Practicing 💪</p>
        )}
      </div>
    );
  }

  if (isAdminQuiz && alreadyAttempted) {
    return (
      <div className="text-center text-white p-10 min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-red-400">
          You already attempted this test ❌
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col items-center justify-center p-6 py-24 font-sans">
      {/* Decorative Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            {type} Challenge
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gray-700"></div>
            <span className="text-gray-500 font-mono text-sm uppercase tracking-widest">
              Question {current + 1} of {questions.length}
            </span>
            <div className="h-px w-12 bg-gray-700"></div>
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-gray-900/60 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-md">
          {/* Question Text */}
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-10 text-gray-100">
            <span className="text-purple-500 font-black mr-2 opacity-50">
              #
            </span>
            {questions[current].question}
          </h2>

          {/* Options Grid */}
          <div className="grid gap-4">
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="group relative flex items-center w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 text-left active:scale-[0.98]"
              >
                {/* Index Badge */}
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 text-gray-400 text-xs font-bold mr-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  {String.fromCharCode(65 + i)}
                </span>

                {/* Option Text */}
                <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                  {opt}
                </span>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/10 to-transparent pointer-events-none transition-opacity"></div>
              </button>
            ))}
          </div>

          {/* Progress Footer */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Exit Hint */}
        <p className="text-center mt-8 text-gray-600 text-sm font-medium uppercase tracking-widest italic opacity-50">
          Select an answer to proceed automatically
        </p>
      </div>
    </div>
  );
};

export default Quiz;
