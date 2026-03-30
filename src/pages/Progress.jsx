import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const structures = ["array", "stack", "queue", "linkedlist"];

const Progress = () => {
  const navigate = useNavigate();

  const [quizScores, setQuizScores] = useState({});

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

  useEffect(() => {
    loadProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 py-24">
      <h1 className="text-3xl text-center mb-10">Your Progress 🚀</h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {structures.map((type) => {
          const checkedArray = progressState[type];
          const progress = checkedArray.filter(Boolean).length * 25;

          return (
            <div key={type} className="bg-gray-800 p-6 rounded-xl shadow">
              <h2 className="text-xl mb-4 uppercase text-purple-400">{type}</h2>

              {/* CHECKBOXES */}
              <div className="space-y-2">
                {checkedArray.map((checked, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCheck(type, i)}
                    />
                    Step {i + 1}
                  </label>
                ))}
              </div>

              {/* PROGRESS */}
              <div className="w-full bg-gray-700 h-3 rounded mt-2">
                <div
                  className="bg-purple-500 h-3 rounded transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {progress === 100 && (
                <div className="mt-3 text-green-400 font-bold">
                  Completed ✅
                </div>
              )}
              {quizScores[type] !== undefined && (
                <div className="mt-2 text-yellow-400 text-sm">
                  Score: {quizScores[type]}
                </div>
              )}
              {progress === 100 && (
                <button
                  onClick={() => navigate(`/quiz/${type}`)}
                  className="mt-4 w-full bg-green-500 hover:bg-green-600 transition p-2 rounded-lg font-semibold"
                >
                  Take Quiz 🚀
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;
