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
        collection(db, "quizzes", activeTab, "items"),
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
    .filter((u) => getQuizScore(u, activeTab, selectedQuizId))
    .sort((a, b) => {
      const aScore = getQuizScore(a, activeTab, selectedQuizId);

      const bScore = getQuizScore(b, activeTab, selectedQuizId);

      return (bScore?.score || 0) - (aScore?.score || 0);
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-6 py-24 font-sans selection:bg-purple-500/30">
      {/* 1. Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 tracking-tighter">
          Hall of Fame 🏆
        </h1>
        <p className="text-gray-400 text-lg uppercase tracking-[0.3em] font-light">
          Global Leaderboard
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* 2. DATA STRUCTURE TABS */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {["array", "stack", "queue", "linkedlist"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-2xl capitalize font-bold transition-all duration-300 border-2 ${
                activeTab === tab
                  ? "bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] scale-105"
                  : "bg-gray-900/50 border-white/5 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 3. QUIZ SELECTOR */}
        {quizList.length > 0 && (
          <div className="flex justify-center gap-3 mb-12 flex-wrap animate-fadeIn">
            {quizList.map((quiz, index) => (
              <button
                key={quiz.id}
                onClick={() => setSelectedQuizId(quiz.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  selectedQuizId === quiz.id
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                    : "bg-white/5 text-gray-500 hover:bg-white/10"
                }`}
              >
                Quiz {index + 1}
              </button>
            ))}
          </div>
        )}

        {/* 4. LEADERBOARD LIST */}
        <div className="space-y-4 relative">
          {/* Decorative Glow behind list */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/5 blur-[120px] pointer-events-none"></div>

          {sortedUsers.map((user, index) => {
            const scoreData = getQuizScore(user, activeTab, selectedQuizId);
            const isTopThree = index < 3;

            return (
              <div
                key={user.id}
                className={`relative group flex justify-between items-center p-5 md:p-6 rounded-[2rem] border transition-all duration-500 backdrop-blur-md ${
                  isTopThree
                    ? "bg-white/10 border-yellow-500/30 shadow-xl shadow-yellow-900/5"
                    : "bg-gray-900/40 border-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-6">
                  {/* Rank Icon/Number */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${
                      index === 0
                        ? "bg-gradient-to-br from-yellow-300 to-yellow-600 text-gray-900 shadow-yellow-400/50"
                        : index === 1
                          ? "bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900"
                          : index === 2
                            ? "bg-gradient-to-br from-orange-400 to-orange-700 text-gray-900"
                            : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* User Name */}
                  <div className="flex flex-col">
                    <span
                      className={`text-lg font-bold tracking-tight ${isTopThree ? "text-white" : "text-gray-300"}`}
                    >
                      {user.name || "Anonymous User"}
                    </span>
                    {index === 0 && (
                      <span className="text-[10px] text-yellow-500 font-black uppercase tracking-widest">
                        Master of {activeTab}
                      </span>
                    )}
                  </div>
                </div>

                {/* Score Display */}
                <div className="text-right">
                  <div
                    className={`text-2xl font-black italic ${isTopThree ? "text-purple-400" : "text-gray-400"}`}
                  >
                    {scoreData?.score ?? 0}
                    <span className="text-sm font-normal opacity-40 not-italic ml-1">
                      / {scoreData?.total ?? 0}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">
                    Points Earned
                  </p>
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {sortedUsers.length === 0 && (
            <div className="text-center py-20 bg-gray-900/30 rounded-[3rem] border border-dashed border-white/10">
              <div className="text-5xl mb-4">🔭</div>
              <p className="text-gray-500 font-medium italic">
                No legends have claimed the {activeTab} board yet...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
