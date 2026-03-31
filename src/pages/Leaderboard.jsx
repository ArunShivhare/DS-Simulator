import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("array");

  // 🔥 NEW STATES
  const [quizList, setQuizList] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  // ✅ FETCH USERS
  const fetchLeaderboard = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ FETCH QUIZZES (PER DS)
  const fetchQuizzes = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "quizzes", activeTab, "items")
      );

      const quizzes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // const sorted = quizzes.sort((a, b) => b.createdAt - a.createdAt);
      const sorted = quizzes.sort((a, b) => a.createdAt - b.createdAt);

      setQuizList(sorted);
      setSelectedQuizId(sorted[sorted.length - 1]?.id || null); // latest quiz default
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, [activeTab]);

  // ✅ QUIZ-SPECIFIC SCORE (NEW)
  const getQuizScore = (user, type, quizId) => {
    return user.attempts?.[type]?.[quizId] || null;
  };

  // 🔥 SORT LOGIC (SWITCH BASED ON QUIZ SELECTION)
  const sortedUsers = users
    .filter((u) => getQuizScore(u, activeTab, selectedQuizId)
    )
    .sort((a, b) => {
      const aScore = getQuizScore(a, activeTab, selectedQuizId)

      const bScore = getQuizScore(b, activeTab, selectedQuizId)

      return (bScore?.score || 0) - (aScore?.score || 0);
    });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 py-24">
      <h1 className="text-3xl text-center mb-10">Leaderboard 🏆</h1>

      {/* ✅ DATA STRUCTURE TABS */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {["array", "stack", "queue", "linkedlist"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize transition ${
              activeTab === tab
                ? "bg-purple-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔥 QUIZ SELECTOR (NEW) */}
      {quizList.length > 0 && (
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {quizList.map((quiz, index) => (
            <button
              key={quiz.id}
              onClick={() => setSelectedQuizId(quiz.id)}
              className={`px-3 py-1 rounded ${
                selectedQuizId === quiz.id
                  ? "bg-purple-500"
                  : "bg-gray-700"
              }`}
            >
              Quiz {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* ✅ LEADERBOARD LIST */}
      <div className="max-w-3xl mx-auto space-y-4">
        {sortedUsers.map((user, index) => {
          const scoreData = getQuizScore(user, activeTab, selectedQuizId)

          return (
            <div
              key={user.id}
              className="bg-gray-800 p-4 rounded-xl flex justify-between items-center"
            >
              {/* Rank */}
              <span className="text-xl font-bold text-yellow-400">
                #{index + 1}
              </span>

              {/* User */}
              <span className="text-gray-300">
                {user.name || "Anonymous"}
              </span>

              {/* Score */}
              <span className="text-purple-400 font-semibold">
                {scoreData?.score} / {scoreData?.total}
              </span>
            </div>
          );
        })}

        {sortedUsers.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            No data available for {activeTab} yet 🚀
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;