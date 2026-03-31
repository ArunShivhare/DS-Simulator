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
      await setDoc(
        doc(db, "users", user.uid),
        {
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl mb-6 uppercase">{type} Quiz</h1>

      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
        <h2 className="mb-4">
          {current + 1}. {questions[current].question}
        </h2>

        <div className="space-y-2">
          {questions[current].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className="w-full bg-purple-500 hover:bg-purple-600 p-2 rounded"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
