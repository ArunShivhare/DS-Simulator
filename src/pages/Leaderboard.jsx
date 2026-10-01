import { useEffect, useState } from "react";
import {
  Trophy,
  BarChart3,
  Layers3,
  ChevronDown,
  Medal,
  Users,
  Target,
  Crown,
  Search,
} from "lucide-react";import { collection, getDocs } from "firebase/firestore";
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
  <div
    className="
      min-h-screen
      bg-slate-50
      text-slate-900
      px-4
      sm:px-6
      pt-28
      pb-14
      font-sans
    "
  >

    {/* ===================================================== */}
    {/* HEADER */}
    {/* ===================================================== */}

    <div className="max-w-5xl mx-auto mb-8">

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

        <div>

          <div className="flex items-center gap-2.5 mb-3">

            <div
              className="
                h-9 w-9
                rounded-xl
                bg-amber-50
                border border-amber-100
                flex items-center justify-center
              "
            >
              <Trophy
                size={17}
                className="text-amber-500"
              />
            </div>

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-indigo-500
              "
            >
              Competitive Learning
            </span>

          </div>

          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-black
              tracking-tight
              text-slate-950
            "
          >
            Leaderboard
          </h1>

          <p
            className="
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-slate-500
            "
          >
            See how learners are performing across each
            data structure and quiz.
          </p>

        </div>


        {/* PARTICIPANTS */}
        <div
          className="
            self-start
            md:self-auto
            inline-flex
            items-center
            gap-2.5
            px-4
            py-2.5
            rounded-xl
            bg-white
            border border-slate-200
            shadow-sm
          "
        >

          <Users
            size={15}
            className="text-slate-400"
          />

          <div>

            <p className="text-sm font-black text-slate-800">
              {sortedUsers.length}
            </p>

            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-wider
                text-slate-400
              "
            >
              Participants
            </p>

          </div>

        </div>

      </div>

    </div>


    {/* ===================================================== */}
    {/* CONTROLS */}
    {/* ===================================================== */}

    <div className="max-w-5xl mx-auto mb-6">

      <div
        className="
          bg-white
          border border-slate-200
          rounded-2xl
          shadow-sm
          p-3
        "
      >

        {/* STRUCTURE TABS */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">

          {["array", "stack", "queue", "linkedlist"].map((tab) => {

            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  shrink-0
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  text-xs
                  font-bold
                  transition-all

                  ${
                    isActive
                      ? `
                        bg-indigo-600
                        text-white
                        shadow-sm
                      `
                      : `
                        text-slate-500
                        hover:text-slate-800
                        hover:bg-slate-50
                      `
                  }
                `}
              >

                <Layers3 size={13} />

                {tab === "linkedlist"
                  ? "Linked List"
                  : tab.charAt(0).toUpperCase() +
                    tab.slice(1)}

              </button>
            );

          })}

        </div>


        {/* QUIZ SELECTOR */}
        {quizList.length > 0 && (
          <div
            className="
              mt-3
              pt-3
              border-t
              border-slate-100
              flex
              flex-wrap
              items-center
              gap-2
            "
          >

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-wider
                text-slate-400
                mr-1
              "
            >
              Quiz
            </span>

            {quizList.map((quiz, index) => {

              const isSelected =
                selectedQuizId === quiz.id;

              return (
                <button
                  key={quiz.id}
                  onClick={() =>
                    setSelectedQuizId(quiz.id)
                  }
                  className={`
                    px-3
                    py-1.5
                    rounded-lg
                    text-[10px]
                    font-bold
                    transition-all
                    border

                    ${
                      isSelected
                        ? `
                          bg-indigo-50
                          border-indigo-200
                          text-indigo-600
                        `
                        : `
                          bg-white
                          border-slate-200
                          text-slate-400
                          hover:text-slate-600
                          hover:border-slate-300
                        `
                    }
                  `}
                >
                  Quiz {index + 1}
                </button>
              );

            })}

          </div>
        )}

      </div>

    </div>


    {/* ===================================================== */}
    {/* CURRENT QUIZ SUMMARY */}
    {/* ===================================================== */}

    <div className="max-w-5xl mx-auto mb-6">

      <div
        className="
          bg-white
          border border-slate-200
          rounded-2xl
          shadow-sm
          px-5
          sm:px-6
          py-5
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              h-10
              w-10
              rounded-xl
              bg-indigo-50
              border border-indigo-100
              flex
              items-center
              justify-center
            "
          >
            <Target
              size={18}
              className="text-indigo-600"
            />
          </div>

          <div>

            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-slate-400
              "
            >
              Current ranking
            </p>

            <h2 className="text-base font-black text-slate-800">
              {activeTab === "linkedlist"
                ? "Linked List"
                : activeTab.charAt(0).toUpperCase() +
                  activeTab.slice(1)}{" "}
              {selectedQuizId
                ? "Quiz"
                : "Assessment"}
            </h2>

          </div>

        </div>


        <div className="flex items-center gap-5">

          <div className="text-right">

            <p className="text-xl font-black text-slate-900">
              {sortedUsers.length}
            </p>

            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-wider
                text-slate-400
              "
            >
              Ranked
            </p>

          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div className="flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span
              className="
                text-[10px]
                font-semibold
                text-slate-400
              "
            >
              Live results
            </span>

          </div>

        </div>

      </div>

    </div>


    {/* ===================================================== */}
    {/* LEADERBOARD */}
    {/* ===================================================== */}

    <div className="max-w-5xl mx-auto">

      {sortedUsers.length > 0 && (

        <div className="space-y-2.5">

          {sortedUsers.map((user, index) => {

            const scoreData = getQuizScore(
              user,
              activeTab,
              selectedQuizId,
            );

            const isFirst = index === 0;
            const isSecond = index === 1;
            const isThird = index === 2;

            return (
              <div
                key={user.id}
                className={`
                  group
                  relative
                  flex
                  items-center
                  justify-between
                  gap-4
                  px-4
                  sm:px-5
                  py-4
                  rounded-xl
                  border
                  bg-white
                  transition-all
                  duration-200

                  ${
                    isFirst
                      ? `
                        border-amber-200
                        shadow-sm
                      `
                      : `
                        border-slate-200
                        hover:border-indigo-200
                        hover:shadow-sm
                      `
                  }
                `}
              >

                {/* LEFT */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">

                  {/* RANK */}
                  <div
                    className={`
                      h-10
                      w-10
                      sm:h-11
                      sm:w-11
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      shrink-0
                      font-black
                      text-sm

                      ${
                        isFirst
                          ? `
                            bg-amber-50
                            border border-amber-200
                            text-amber-600
                          `
                          : isSecond
                            ? `
                              bg-slate-100
                              border border-slate-200
                              text-slate-500
                            `
                            : isThird
                              ? `
                                bg-orange-50
                                border border-orange-200
                                text-orange-600
                              `
                              : `
                                bg-slate-50
                                border border-slate-200
                                text-slate-400
                              `
                      }
                    `}
                  >

                    {isFirst ? (
                      <Crown size={17} />
                    ) : (
                      index + 1
                    )}

                  </div>


                  {/* USER */}
                  <div className="min-w-0">

                    <div className="flex items-center gap-2">

                      <span
                        className="
                          text-sm
                          sm:text-base
                          font-bold
                          text-slate-800
                          truncate
                        "
                      >
                        {user.name || "Anonymous User"}
                      </span>

                      {isFirst && (
                        <Medal
                          size={14}
                          className="text-amber-500 shrink-0"
                        />
                      )}

                    </div>


                    {isFirst ? (
                      <p
                        className="
                          mt-0.5
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-amber-500
                        "
                      >
                        Highest score
                      </p>
                    ) : (
                      <p
                        className="
                          mt-0.5
                          text-[9px]
                          text-slate-400
                        "
                      >
                        Ranked participant
                      </p>
                    )}

                  </div>

                </div>


                {/* SCORE */}
                <div className="text-right shrink-0">

                  <div
                    className={`
                      text-xl
                      sm:text-2xl
                      font-black
                      tracking-tight

                      ${
                        isFirst
                          ? "text-amber-600"
                          : "text-slate-800"
                      }
                    `}
                  >

                    {scoreData?.score ?? 0}

                    <span
                      className="
                        text-xs
                        font-medium
                        text-slate-300
                        ml-1
                      "
                    >
                      / {scoreData?.total ?? 0}
                    </span>

                  </div>

                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Score
                  </p>

                </div>

              </div>
            );

          })}

        </div>

      )}


      {/* ===================================================== */}
      {/* EMPTY STATE */}
      {/* ===================================================== */}

      {sortedUsers.length === 0 && (
        <div
          className="
            bg-white
            border border-dashed
            border-slate-200
            rounded-2xl
            py-20
            px-6
            text-center
          "
        >

          <div
            className="
              mx-auto
              h-14
              w-14
              rounded-2xl
              bg-slate-50
              border border-slate-200
              flex
              items-center
              justify-center
            "
          >
            <Trophy
              size={24}
              className="text-slate-300"
            />
          </div>

          <h3
            className="
              mt-5
              text-sm
              font-bold
              text-slate-700
            "
          >
            No scores yet
          </h3>

          <p
            className="
              mt-1
              text-xs
              text-slate-400
              max-w-sm
              mx-auto
              leading-5
            "
          >
            No learners have submitted this quiz yet.
            Complete the assessment to appear on the board.
          </p>

        </div>
      )}

    </div>

  </div>
);
};

export default Leaderboard;
