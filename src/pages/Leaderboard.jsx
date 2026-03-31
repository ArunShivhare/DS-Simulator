import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("array");

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

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // 🔥 SORT USERS (ARRAY QUIZ FOR NOW)
  const sortedUsers = users
    .filter((u) => u.quizzes?.[activeTab]?.score !== undefined)
    .sort((a, b) => b.quizzes[activeTab].score - a.quizzes[activeTab].score);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 py-24">
      <h1 className="text-3xl text-center mb-10">Leaderboard 🏆</h1>
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

      <div className="max-w-3xl mx-auto space-y-4">
        {sortedUsers.map((user, index) => (
          <div
            key={user.id}
            className="bg-gray-800 p-4 rounded-xl flex justify-between items-center"
          >
            {/* Rank */}
            <span className="text-xl font-bold text-yellow-400">
              #{index + 1}
            </span>

            {/* User */}
            <span className="text-gray-300">{user.name || "Anonymous"}</span>

            {/* Score */}
            <span className="text-purple-400 font-semibold">
              {user.quizzes[activeTab].score} /{" "}
              {user.quizzes[activeTab].total}
            </span>
          </div>
        ))}
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
