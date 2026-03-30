import { useParams } from "react-router-dom";
import { quizData } from "../data/quizData";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const Quiz = () => {
  const { type } = useParams();

  const questions = quizData[type] || [];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

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
          quizzes: {
            [type]: finalScore,
          },
        },
        { merge: true },
      );
    } catch (error) {
      console.error(error);
    }
  };

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
