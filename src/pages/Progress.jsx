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
    <div className="min-h-screen bg-gray-900 text-white p-8 py-24">
      <h1 className="text-3xl text-center mb-10">Your Progress 🚀</h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {structures.map((type) => {
          const checkedArray = progressState[type];
          const progress = checkedArray.filter(Boolean).length * 25;

          return (
            <div key={type} className="bg-gray-800 p-6 rounded-xl shadow">
              <h2 className="text-xl mb-4 uppercase text-purple-400">{type}</h2>
              <button onClick={() => navigate("/leaderboard")}>
                View Leaderboard 🏆
              </button>

              {/* CHECKBOXES */}
              <div className="space-y-2 ">
                {checkedArray.map((checked, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={
                        (!checkedArray[i - 1] && i !== 0) || !isVisited(type, i)
                      }
                      onChange={() => handleCheck(type, i)}
                    />

                    <span
                      onClick={() => {
                        if (!isVisited(type, i)) {
                          // 🔥 redirect user to correct page
                          if (i === 0)
                            navigate(`/learn/${type}`); // intro page
                          else if (i === 1)
                            navigate(`/learn/${type}`); // same page (implementation)
                          else if (i === 2) navigate(`/visualizer/${type}`);
                          else if (i === 3) navigate(`/quiz/${type}`);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      {stepLabels[i]}
                    </span>
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
               {/* HISTORY */}
              {attempts[type] && (
                <div className="mt-2 text-xs text-gray-400">
                  <p className="font-semibold text-gray-300">Attempts:</p>

                  {Object.entries(attempts[type]).map(([id, attempt]) => (
                    <div key={id}>
                      Score: {attempt.score}/{attempt.total}
                    </div>
                  ))}
                </div>
              )}
              {quizScores[type] !== undefined && (
                <div className="mt-2 text-yellow-400 text-sm">
                  Score: {quizScores[type]?.score} / {quizScores[type]?.total}
                </div>
              )}
              {/* ADMIN QUIZ */}
              {availableQuizzes[type] && progress === 100 && (
                <button
                  onClick={() => navigate(`/quiz/${type}/admin`)}
                  className="mt-2 w-full bg-green-500 hover:bg-green-600 p-2 rounded-lg"
                >
                  New Test Available 🚀
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
