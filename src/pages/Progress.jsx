import { useState, useEffect } from "react";
import {
  Trophy,
  Target,
  CheckCircle2,
  Circle,
  LockKeyhole,
  ArrowRight,
  BarChart3,
  Clock3,
  BookOpen,
  Layers3,
  ChevronRight,
  Sparkles,
} from "lucide-react";
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

  const totalSteps = structures.length * stepLabels.length;

  const completedSteps = structures.reduce(
    (total, type) => total + progressState[type].filter(Boolean).length,
    0,
  );

  const overallProgress = Math.round((completedSteps / totalSteps) * 100);

  const completedStructures = structures.filter((type) =>
    progressState[type].every(Boolean),
  ).length;

  const quizTypes = structures.filter((type) => quizScores[type] !== undefined);

  const averageQuizScore =
    quizTypes.length > 0
      ? Math.round(
          quizTypes.reduce((sum, type) => {
            const quiz = quizScores[type];

            if (!quiz || !quiz.total) return sum;

            return sum + (quiz.score / quiz.total) * 100;
          }, 0) / quizTypes.length,
        )
      : null;

  const nextLearningStep = structures
    .map((type) => {
      const index = progressState[type].findIndex((step) => !step);

      return {
        type,
        index,
      };
    })
    .find((item) => item.index !== -1);

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
      overflow-hidden
    "
    >
      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="
                h-9 w-9
                rounded-xl
                bg-indigo-50
                border border-indigo-100
                flex items-center justify-center
              "
              >
                <BarChart3 size={17} className="text-indigo-600" />
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
                Learning Progress
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
              Your DSA Journey
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
              Track what you've learned, continue where you left off, and build
              your mastery one step at a time.
            </p>
          </div>

          {/* LEADERBOARD */}
          <button
            onClick={() => navigate("/leaderboard")}
            className="
            self-start
            md:self-auto
            inline-flex
            items-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            bg-white
            border border-slate-200
            hover:border-indigo-200
            hover:text-indigo-600
            text-xs
            font-bold
            text-slate-600
            shadow-sm
            transition-all
            active:scale-[0.98]
          "
          >
            <Trophy size={15} />
            Leaderboard
            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>

      {/* ===================================================== */}
      {/* OVERALL PROGRESS */}
      {/* ===================================================== */}

      <div className="max-w-6xl mx-auto mb-8">
        <div
          className="
          bg-white
          border border-slate-200
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
        >
          <div className="p-5 sm:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center gap-7">
              {/* LEFT */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p
                      className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-slate-400
                    "
                    >
                      Overall mastery
                    </p>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span
                        className="
                        text-3xl
                        sm:text-4xl
                        font-black
                        tracking-tight
                        text-slate-900
                      "
                      >
                        {overallProgress}%
                      </span>

                      <span className="text-xs text-slate-400">completed</span>
                    </div>
                  </div>

                  <div
                    className="
                    hidden sm:flex
                    h-11 w-11
                    rounded-xl
                    bg-indigo-50
                    border border-indigo-100
                    items-center
                    justify-center
                  "
                  >
                    <Target size={19} className="text-indigo-600" />
                  </div>
                </div>

                {/* MAIN PROGRESS BAR */}
                <div
                  className="
                  h-3
                  w-full
                  bg-slate-100
                  rounded-full
                  overflow-hidden
                "
                >
                  <div
                    className="
                    h-full
                    rounded-full
                    bg-indigo-600
                    transition-all
                    duration-700
                  "
                    style={{
                      width: `${overallProgress}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-slate-400">
                    {completedSteps} of {totalSteps} milestones
                  </span>

                  <span className="text-[10px] font-semibold text-indigo-500">
                    {completedStructures}/4 structures complete
                  </span>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="hidden lg:block h-20 w-px bg-slate-100" />

              {/* STATS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 gap-3 lg:w-[380px]">
                {/* COMPLETED */}
                <div
                  className="
                  p-3.5
                  rounded-xl
                  bg-slate-50
                  border border-slate-100
                "
                >
                  <CheckCircle2 size={15} className="text-emerald-500 mb-2" />

                  <p className="text-lg font-black text-slate-800">
                    {completedSteps}
                  </p>

                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Completed
                  </p>
                </div>

                {/* QUIZZES */}
                <div
                  className="
                  p-3.5
                  rounded-xl
                  bg-slate-50
                  border border-slate-100
                "
                >
                  <BookOpen size={15} className="text-indigo-500 mb-2" />

                  <p className="text-lg font-black text-slate-800">
                    {quizTypes.length}
                  </p>

                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Quizzes
                  </p>
                </div>

                {/* AVERAGE */}
                <div
                  className="
                  p-3.5
                  rounded-xl
                  bg-slate-50
                  border border-slate-100
                  col-span-2
                  sm:col-span-1
                "
                >
                  <Trophy size={15} className="text-amber-500 mb-2" />

                  <p className="text-lg font-black text-slate-800">
                    {averageQuizScore !== null ? `${averageQuizScore}%` : "—"}
                  </p>

                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Quiz Average
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* NEXT STEP */}
          {nextLearningStep && (
            <div
              className="
              border-t border-slate-100
              px-5 sm:px-7
              py-3.5
              bg-slate-50/60
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
            "
            >
              <div className="flex items-center gap-2.5">
                <Sparkles size={15} className="text-indigo-500" />

                <p className="text-xs text-slate-500">
                  Next up:
                  <span className="font-bold text-slate-700 ml-1">
                    {structures
                      .find((type) => type === nextLearningStep.type)
                      ?.toUpperCase()}{" "}
                    — {stepLabels[nextLearningStep.index]}
                  </span>
                </p>
              </div>

              <button
                onClick={() => {
                  const type = nextLearningStep.type;
                  const i = nextLearningStep.index;

                  if (i === 0 || i === 1) {
                    navigate(`/learn/${type}`);
                  } else if (i === 2) {
                    navigate(`/visualizer/${type}`);
                  } else if (i === 3) {
                    navigate(`/quiz/${type}`);
                  }
                }}
                className="
                inline-flex
                items-center
                gap-1.5
                text-xs
                font-bold
                text-indigo-600
                hover:text-indigo-700
                transition-colors
              "
              >
                Continue
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===================================================== */}
      {/* LEARNING PATHS */}
      {/* ===================================================== */}

      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p
              className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-indigo-500
              mb-1
            "
            >
              Your curriculum
            </p>

            <h2
              className="
              text-xl
              sm:text-2xl
              font-black
              tracking-tight
              text-slate-900
            "
            >
              Learning paths
            </h2>
          </div>

          <span className="text-[10px] text-slate-400">
            4 structures · 16 milestones
          </span>
        </div>

        {/* STRUCTURE GRID */}
        <div className="grid lg:grid-cols-2 gap-5">
          {structures.map((type) => {
            const checkedArray = progressState[type];

            const completedSteps = checkedArray.filter(Boolean).length;

            const progress = completedSteps * 25;

            const currentStep = checkedArray.findIndex((step) => !step);

            return (
              <div
                key={type}
                className="
                group
                bg-white
                border border-slate-200
                hover:border-indigo-200
                rounded-2xl
                shadow-sm
                hover:shadow-md
                transition-all
                duration-300
                overflow-hidden
              "
              >
                {/* CARD HEADER */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                        h-10 w-10
                        rounded-xl
                        bg-indigo-50
                        border border-indigo-100
                        flex items-center justify-center
                        shrink-0
                      "
                      >
                        <Layers3 size={18} className="text-indigo-600" />
                      </div>

                      <div>
                        <h3
                          className="
                          text-lg
                          font-black
                          tracking-tight
                          text-slate-900
                        "
                        >
                          {type === "linkedlist"
                            ? "Linked List"
                            : type.charAt(0).toUpperCase() + type.slice(1)}
                        </h3>

                        <p
                          className="
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-slate-400
                          mt-0.5
                        "
                        >
                          Interactive roadmap
                        </p>
                      </div>
                    </div>

                    {/* PERCENT */}
                    <div className="text-right">
                      <span
                        className={`
                        text-xl
                        font-black
                        ${
                          progress === 100
                            ? "text-emerald-500"
                            : "text-indigo-600"
                        }
                      `}
                      >
                        {progress}%
                      </span>

                      <p className="text-[9px] text-slate-400">mastery</p>
                    </div>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="mt-5">
                    <div
                      className="
                      h-2
                      bg-slate-100
                      rounded-full
                      overflow-hidden
                    "
                    >
                      <div
                        className={`
                        h-full
                        rounded-full
                        transition-all
                        duration-700
                        ${progress === 100 ? "bg-emerald-500" : "bg-indigo-500"}
                      `}
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* ROADMAP */}
                <div className="px-5 sm:px-6 pb-5">
                  <div className="space-y-1">
                    {checkedArray.map((checked, i) => {
                      const isLocked = i !== 0 && !checkedArray[i - 1];

                      const isCheckboxDisabled =
                        isLocked || !isVisited(type, i);

                      const isCurrent = !checked && !isLocked;

                      return (
                        <div
                          key={i}
                          className={`
                          flex
                          items-center
                          gap-3
                          px-3
                          py-3
                          rounded-xl
                          transition-all
                          duration-200

                          ${
                            checked
                              ? "bg-emerald-50/70"
                              : isLocked
                                ? "opacity-50"
                                : "hover:bg-slate-50"
                          }
                        `}
                        >
                          {/* STATUS */}
                          <div className="relative shrink-0">
                            <input
                              type="checkbox"
                              checked={checked}
                              disabled={isLocked}
                              onChange={() => handleCheck(type, i)}
                              className="
                              peer
                              appearance-none
                              w-5
                              h-5
                              rounded-md
                              border
                              border-slate-300
                              bg-white
                              checked:bg-emerald-500
                              checked:border-emerald-500
                              cursor-pointer
                              disabled:cursor-not-allowed
                              transition-all
                            "
                            />

                            {checked && (
                              <CheckCircle2
                                size={13}
                                className="
                                absolute
                                pointer-events-none
                                top-1
                                left-1
                                text-white
                              "
                              />
                            )}
                          </div>

                          {/* STEP */}
                          <button
                            type="button"
                            disabled={isLocked}
                            onClick={() => {
                              if (isLocked) return;

                              if (i === 0) {
                                navigate(`/learn/${type}`);
                              } else if (i === 1) {
                                navigate(`/learn/${type}`);
                              } else if (i === 2) {
                                navigate(`/visualizer/${type}`);
                              } else if (i === 3) {
                                navigate(`/quiz/${type}`);
                              }
                            }}
                            className={`
                            flex-1
                            text-left
                            flex
                            items-center
                            justify-between
                            gap-3
                            ${
                              isLocked ? "cursor-not-allowed" : "cursor-pointer"
                            }
                          `}
                          >
                            <div>
                              <p
                                className={`
                                text-sm
                                font-bold
                                ${
                                  checked
                                    ? "text-emerald-600"
                                    : isLocked
                                      ? "text-slate-400"
                                      : "text-slate-700"
                                }
                              `}
                              >
                                {stepLabels[i]}
                              </p>

                              {isCurrent && (
                                <p className="text-[9px] text-indigo-400 mt-0.5">
                                  Continue learning
                                </p>
                              )}
                            </div>

                            {isLocked ? (
                              <LockKeyhole
                                size={14}
                                className="text-slate-300"
                              />
                            ) : (
                              <ChevronRight
                                size={14}
                                className={`
                                transition-transform
                                ${
                                  checked
                                    ? "text-emerald-400"
                                    : "text-slate-300 group-hover:translate-x-0.5"
                                }
                              `}
                              />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* QUIZ + HISTORY */}
                  {(quizScores[type] !== undefined || attempts[type]) && (
                    <div
                      className="
                      mt-4
                      pt-4
                      border-t
                      border-slate-100
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      gap-3
                    "
                    >
                      {/* SCORE */}
                      {quizScores[type] !== undefined && (
                        <div
                          className="
                          p-3
                          rounded-xl
                          bg-amber-50
                          border border-amber-100
                        "
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Trophy size={13} className="text-amber-500" />

                            <span
                              className="
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-wider
                              text-amber-600
                            "
                            >
                              Practice Score
                            </span>
                          </div>

                          <p className="text-lg font-black text-amber-700">
                            {quizScores[type]?.score}

                            <span
                              className="
                              text-xs
                              font-medium
                              text-amber-400
                              ml-1
                            "
                            >
                              / {quizScores[type]?.total}
                            </span>
                          </p>
                        </div>
                      )}

                      {/* ATTEMPTS */}
                      {attempts[type] && (
                        <div
                          className="
                          p-3
                          rounded-xl
                          bg-sky-50
                          border border-sky-100
                          max-h-24
                          overflow-y-auto
                          scrollbar-hide
                        "
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Clock3 size={13} className="text-sky-500" />

                            <span
                              className="
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-wider
                              text-sky-600
                            "
                            >
                              Attempts
                            </span>
                          </div>

                          <div className="space-y-1">
                            {Object.entries(attempts[type]).map(
                              ([id, attempt]) => (
                                <div
                                  key={id}
                                  className="
                                  flex
                                  justify-between
                                  text-[10px]
                                  text-sky-500
                                "
                                >
                                  <span>Attempt {id.slice(-2)}</span>

                                  <span className="font-bold">
                                    {attempt.score}/{attempt.total}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* NEW TEST */}
                  {availableQuizzes[type] && progress === 100 && (
                    <button
                      onClick={() => navigate(`/quiz/${type}/admin`)}
                      className="
                        mt-4
                        w-full
                        bg-emerald-600
                        hover:bg-emerald-700
                        text-white
                        py-3
                        rounded-xl
                        font-bold
                        text-xs
                        transition-all
                        active:scale-[0.98]
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >
                      <Sparkles size={14} />
                      New Test Available
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Progress;
