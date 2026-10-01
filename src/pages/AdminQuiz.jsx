import { useState } from "react";
import {
  ShieldCheck,
  ClipboardPlus,
  Layers3,
  Clock3,
  ListChecks,
  Send,
  Plus,
  CircleCheck,
  FileQuestion,
} from "lucide-react";import { db, auth } from "../firebase";
// import { doc, setDoc, getDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const ADMIN_EMAIL = "simplesabanda07@gmail.com"; // 🔥 replace with your email

const AdminQuiz = () => {
  const user = auth.currentUser;

  const [type, setType] = useState("array");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [questionsList, setQuestionsList] = useState([]);
  const [timeLimit, setTimeLimit] = useState(60); // default 60 sec

 if (!user || user.email !== ADMIN_EMAIL) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-sm w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">

        <div className="mx-auto h-12 w-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center">
          <ShieldCheck size={22} className="text-rose-500" />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          Access Denied
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          You don't have permission to access the Quiz Architect.
        </p>

      </div>
    </div>
  );
}

  const handleOptionChange = (value, index) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddQuestion = () => {
    if (!question || !answer) return alert("Fill all fields");

    const newQ = {
      question,
      options,
      answer,
    };

    setQuestionsList((prev) => [...prev, newQ]);

    // reset
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
  };

  const handlePublish = async () => {
    try {
      if (questionsList.length === 0) return alert("Add at least one question");

      await addDoc(collection(db, "quizzes", type, "items"), {
        questions: questionsList,
        createdAt: Date.now(),
        timeLimit,
      });

      alert("Quiz Published 🚀");

      setQuestionsList([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
<div className="min-h-screen bg-slate-50 text-slate-900 px-4 sm:px-6 pt-28 sm:pt-32 pb-10 sm:pb-14 font-sans">
    {/* PAGE HEADER */}
    <div className="max-w-6xl mx-auto mb-8 sm:mb-10">

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

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
              <ClipboardPlus
                size={17}
                className="text-indigo-600"
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
              Admin Control Center
            </span>

          </div>

          <h1
            className="
              text-3xl
              sm:text-4xl
              font-black
              tracking-tight
              text-slate-950
            "
          >
            Quiz Architect
          </h1>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
              max-w-xl
            "
          >
            Create, stage, and publish structured quizzes for
            the DSAVerse learning experience.
          </p>

        </div>


        {/* ADMIN STATUS */}
        <div
          className="
            inline-flex
            items-center
            gap-2
            self-start
            md:self-auto
            px-3.5
            py-2
            rounded-full
            bg-white
            border border-slate-200
            text-xs
            font-semibold
            text-slate-500
            shadow-sm
          "
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          Architect Access
        </div>

      </div>

    </div>


    {/* MAIN WORKSPACE */}
    <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-5 lg:gap-6">

      {/* ===================================================== */}
      {/* LEFT — QUIZ CREATION */}
      {/* ===================================================== */}

      <div className="lg:col-span-3">

        <div
          className="
            bg-white
            border border-slate-200
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
        >

          {/* CARD HEADER */}
          <div
            className="
              px-5 sm:px-6
              py-5
              border-b border-slate-100
              flex
              items-center
              justify-between
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  h-9 w-9
                  rounded-lg
                  bg-indigo-50
                  border border-indigo-100
                  flex items-center justify-center
                "
              >
                <FileQuestion
                  size={17}
                  className="text-indigo-600"
                />
              </div>

              <div>

                <h2 className="text-sm font-bold text-slate-800">
                  Create Quiz
                </h2>

                <p className="text-[10px] text-slate-400 mt-0.5">
                  Build your question set
                </p>

              </div>

            </div>

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-wider
                text-slate-400
              "
            >
              New
            </span>

          </div>


          {/* FORM */}
          <div className="p-5 sm:p-6 space-y-6">

            {/* TARGET STRUCTURE */}
            <div>

              <label
                className="
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-slate-400
                  mb-2
                "
              >
                <Layers3 size={12} />
                Target Structure
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="
                  w-full
                  px-4
                  py-3.5
                  rounded-xl
                  bg-slate-50
                  border border-slate-200
                  focus:border-indigo-400
                  focus:ring-4
                  focus:ring-indigo-50
                  transition-all
                  outline-none
                  text-slate-700
                  font-semibold
                  text-sm
                  appearance-none
                  cursor-pointer
                "
              >
                <option value="array">Array Structure</option>
                <option value="stack">Stack Structure</option>
                <option value="queue">Queue Structure</option>
                <option value="linkedlist">LinkedList Structure</option>
              </select>

            </div>


            {/* QUESTION */}
            <div>

              <label
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-slate-400
                  mb-2
                  block
                "
              >
                Question Title
              </label>

              <input
                type="text"
                placeholder="e.g. What is the time complexity of..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="
                  w-full
                  px-4
                  py-3.5
                  rounded-xl
                  bg-slate-50
                  border border-slate-200
                  focus:border-indigo-400
                  focus:ring-4
                  focus:ring-indigo-50
                  transition-all
                  outline-none
                  text-sm
                  text-slate-700
                  placeholder:text-slate-300
                "
              />

            </div>


            {/* TIME LIMIT */}
            <div>

              <label
                className="
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-slate-400
                  mb-2
                "
              >
                <Clock3 size={12} />
                Time Limit (seconds)
              </label>

              <input
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className="
                  w-full
                  px-4
                  py-3.5
                  rounded-xl
                  bg-slate-50
                  border border-slate-200
                  focus:border-indigo-400
                  focus:ring-4
                  focus:ring-indigo-50
                  transition-all
                  outline-none
                  text-sm
                  font-mono
                  text-slate-700
                "
              />

            </div>


            {/* OPTIONS */}
            <div>

              <div className="flex items-center justify-between mb-3">

                <label
                  className="
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-slate-400
                  "
                >
                  <ListChecks size={12} />
                  Answer Options
                </label>

                <span className="text-[10px] text-slate-300">
                  4 choices
                </span>

              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {options.map((opt, i) => (
                  <div key={i}>

                    <label
                      className="
                        text-[9px]
                        font-semibold
                        text-slate-400
                        ml-1
                        mb-1.5
                        block
                      "
                    >
                      Option {i + 1}
                    </label>

                    <input
                      type="text"
                      placeholder={`Choice ${i + 1}`}
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(e.target.value, i)
                      }
                      className="
                        w-full
                        px-3.5
                        py-3
                        rounded-xl
                        bg-slate-50
                        border border-slate-200
                        focus:border-indigo-400
                        focus:ring-4
                        focus:ring-indigo-50
                        transition-all
                        outline-none
                        text-sm
                        text-slate-700
                        placeholder:text-slate-300
                      "
                    />

                  </div>
                ))}

              </div>

            </div>


            {/* CORRECT ANSWER */}
            <div>

              <label
                className="
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-slate-400
                  mb-2
                "
              >
                <CircleCheck size={12} />
                Validation Key (Correct Answer)
              </label>

              <input
                type="text"
                placeholder="Must match one of the options exactly"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="
                  w-full
                  px-4
                  py-3.5
                  rounded-xl
                  bg-amber-50/50
                  border border-amber-200
                  focus:border-amber-400
                  focus:ring-4
                  focus:ring-amber-50
                  transition-all
                  outline-none
                  text-sm
                  font-medium
                  text-amber-800
                  placeholder:text-amber-300
                "
              />

            </div>


            {/* ACTIONS */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
                pt-2
              "
            >

              <button
                onClick={handleAddQuestion}
                className="
                  flex-1
                  bg-white
                  hover:bg-slate-50
                  border border-slate-200
                  hover:border-indigo-200
                  py-3.5
                  rounded-xl
                  font-bold
                  text-xs
                  text-slate-600
                  hover:text-indigo-600
                  transition-all
                  active:scale-[0.98]
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <Plus size={15} />
                Stage Question
              </button>


              <button
                onClick={handlePublish}
                className="
                  flex-1
                  bg-indigo-600
                  hover:bg-indigo-700
                  py-3.5
                  rounded-xl
                  font-bold
                  text-xs
                  text-white
                  shadow-sm
                  shadow-indigo-200
                  transition-all
                  active:scale-[0.98]
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <Send size={15} />
                Publish Quiz
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* ===================================================== */}
      {/* RIGHT — STAGED QUESTIONS */}
      {/* ===================================================== */}

      <div className="lg:col-span-2">

        <div
          className="
            bg-white
            border border-slate-200
            rounded-2xl
            shadow-sm
            p-5
            h-full
            min-h-[500px]
            flex
            flex-col
          "
        >

          {/* HEADER */}
          <div
            className="
              flex
              items-center
              justify-between
              pb-4
              border-b border-slate-100
              mb-4
            "
          >

            <div className="flex items-center gap-2.5">

              <div className="relative">

                <div
                  className="
                    h-8 w-8
                    rounded-lg
                    bg-indigo-50
                    border border-indigo-100
                    flex items-center justify-center
                  "
                >
                  <ListChecks
                    size={15}
                    className="text-indigo-600"
                  />
                </div>

              </div>

              <div>

                <h3 className="text-sm font-bold text-slate-800">
                  Staged Questions
                </h3>

                <p className="text-[10px] text-slate-400 mt-0.5">
                  Ready for publishing
                </p>

              </div>

            </div>


            <span
              className="
                min-w-7
                h-7
                px-2
                rounded-lg
                bg-slate-100
                text-slate-600
                text-xs
                font-bold
                flex
                items-center
                justify-center
              "
            >
              {questionsList.length}
            </span>

          </div>


          {/* QUESTION LIST */}
          <div
            className="
              space-y-3
              overflow-y-auto
              max-h-[620px]
              pr-1
              scrollbar-hide
              flex-1
            "
          >

            {questionsList.map((q, i) => (
              <div
                key={i}
                className="
                  group
                  p-4
                  bg-slate-50
                  border border-slate-200
                  rounded-xl
                  hover:border-indigo-200
                  hover:bg-white
                  transition-all
                "
              >

                <div className="flex items-start gap-3">

                  <span
                    className="
                      shrink-0
                      text-[9px]
                      font-bold
                      text-indigo-500
                      bg-indigo-50
                      border border-indigo-100
                      px-2
                      py-1
                      rounded-md
                    "
                  >
                    Q.{String(i + 1).padStart(2, "0")}
                  </span>

                  <p
                    className="
                      text-sm
                      font-medium
                      text-slate-700
                      leading-6
                    "
                  >
                    {q.question}
                  </p>

                </div>


                {/* OPTIONS */}
                <div
                  className="
                    mt-3
                    flex
                    flex-wrap
                    gap-1.5
                  "
                >

                  {q.options.map((o, idx) => (
                    <span
                      key={idx}
                      className={`
                        text-[9px]
                        px-2.5
                        py-1
                        rounded-md
                        border
                        whitespace-nowrap

                        ${
                          o === q.answer
                            ? `
                              bg-emerald-50
                              border-emerald-200
                              text-emerald-600
                            `
                            : `
                              bg-white
                              border-slate-200
                              text-slate-400
                            `
                        }
                      `}
                    >
                      {o}
                    </span>
                  ))}

                </div>

              </div>
            ))}


            {/* EMPTY STATE */}
            {questionsList.length === 0 && (
              <div
                className="
                  flex-1
                  flex
                  flex-col
                  items-center
                  justify-center
                  py-20
                "
              >

                <div
                  className="
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
                  <FileQuestion
                    size={23}
                    className="text-slate-300"
                  />
                </div>

                <p
                  className="
                    mt-4
                    text-xs
                    font-bold
                    text-slate-400
                  "
                >
                  No questions in queue yet
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-slate-300
                    text-center
                  "
                >
                  Stage a question to see it here.
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>

  </div>
);
};

export default AdminQuiz;
