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
      });

      alert("Quiz Published 🚀");

      setQuestionsList([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 py-24">
      <h1 className="text-3xl text-center mb-10">Admin Quiz Panel 🛠️</h1>

      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl space-y-4">
        {/* SELECT DS */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        >
          <option value="array">Array</option>
          <option value="stack">Stack</option>
          <option value="queue">Queue</option>
          <option value="linkedlist">LinkedList</option>
        </select>

        {/* QUESTION */}
        <input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        />

        {/* OPTIONS */}
        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(e.target.value, i)}
            className="w-full p-2 rounded bg-gray-700"
          />
        ))}

        {/* ANSWER */}
        <input
          type="text"
          placeholder="Correct Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        />

        <button onClick={handleAddQuestion}>Add Question ➕</button>

        <button onClick={handlePublish}>Publish Quiz 🚀</button>
      </div>
      <div className="mt-4 space-y-2">
        {questionsList.map((q, i) => (
          <div key={i} className="bg-gray-700 p-2 rounded text-sm">
            {i + 1}. {q.question}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminQuiz;
