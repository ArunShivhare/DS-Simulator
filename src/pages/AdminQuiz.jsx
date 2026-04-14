import { useState } from "react";
import { db, auth } from "../firebase";
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
    return <div className="text-white p-10 text-center">Access Denied ❌</div>;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-6 py-24 font-sans">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 tracking-tighter">
          Quiz Architect 🛠️
        </h1>
        <p className="text-gray-500 uppercase tracking-[0.3em] text-xs font-bold italic">
          Admin Control Center
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10">
        {/* LEFT SIDE: CREATION FORM (Col span 3) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-gray-900/50 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-3 p-3 opacity-10">
              <span className="text-4xl font-black italic uppercase tracking-tighter">
                New
              </span>
            </div>

            <div className="space-y-5 relative z-10">
              {/* SELECT DATA STRUCTURE */}
              <div>
                <label className="text-[10px] uppercase font-black tracking-widest text-emerald-500 ml-2 mb-2 block">
                  Target Structure
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:border-emerald-500/50 focus:ring-0 transition-all outline-none text-gray-300 font-bold appearance-none cursor-pointer"
                >
                  <option value="array">Array Structure</option>
                  <option value="stack">Stack Structure</option>
                  <option value="queue">Queue Structure</option>
                  <option value="linkedlist">LinkedList Structure</option>
                </select>
              </div>

              {/* QUESTION INPUT */}
              <div>
                <label className="text-[10px] uppercase font-black tracking-widest text-emerald-500 ml-2 mb-2 block">
                  Question Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. What is the time complexity of..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:border-emerald-500/50 transition-all outline-none placeholder:text-gray-700"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-black tracking-widest text-emerald-500 ml-2 mb-2 block">
                  Time Limit (seconds)
                </label>
                <input
                  type="number"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 outline-none"
                />
              </div>

              {/* OPTIONS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((opt, i) => (
                  <div key={i}>
                    <label className="text-[10px] uppercase font-bold text-gray-600 ml-2 mb-1 block">
                      Option {i + 1}
                    </label>
                    <input
                      type="text"
                      placeholder={`Choice ${i + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(e.target.value, i)}
                      className="w-full p-3 rounded-xl bg-black/20 border border-white/5 focus:border-blue-500/50 transition-all outline-none text-sm"
                    />
                  </div>
                ))}
              </div>

              {/* CORRECT ANSWER */}
              <div className="pt-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-yellow-500 ml-2 mb-2 block">
                  Validation Key (Correct Answer)
                </label>
                <input
                  type="text"
                  placeholder="Must match one of the options exactly"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 focus:border-yellow-500/50 transition-all outline-none text-yellow-100 placeholder:text-yellow-900/40 font-medium"
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={handleAddQuestion}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Stage Question ➕
                </button>
                <button
                  onClick={handlePublish}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
                >
                  Publish Quiz 🚀
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: QUEUE PREVIEW (Col span 2) */}
        <div className="lg:col-span-2">
          <div className="bg-black/20 border border-white/5 rounded-[2.5rem] p-6 h-full min-h-[400px] flex flex-col">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Staged Questions ({questionsList.length})
            </h3>

            <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2 scrollbar-hide">
              {questionsList.map((q, i) => (
                <div
                  key={i}
                  className="group p-4 bg-gray-900/80 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all"
                >
                  <div className="flex justify-between items-start gap-3">
                    <span className="text-[10px] font-black text-blue-500 mt-1 italic">
                      Q.0{i + 1}
                    </span>
                    <p className="text-sm font-medium text-gray-300 leading-relaxed flex-grow">
                      {q.question}
                    </p>
                  </div>
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {q.options.map((o, idx) => (
                      <span
                        key={idx}
                        className={`text-[9px] px-2 py-0.5 rounded-md border whitespace-nowrap ${o === q.answer ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/5 text-gray-600"}`}
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {questionsList.length === 0 && (
                <div className="flex-grow flex flex-col items-center justify-center opacity-20 py-20">
                  <div className="text-4xl mb-2">📁</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-center">
                    No questions in
                    <br />
                    queue yet
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
