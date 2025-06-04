import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, } from "lucide-react";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
};

type QuestionData = Record<string, Question[]>;

const questionData: QuestionData = {
  java: [
    { id: 1, question: "Which is not a Java keyword?", options: ["static", "Boolean", "void", "private"], correct_answer: "Boolean" },
    { id: 2, question: "How to create object in Java?", options: ["new", "class", "this", "create"], correct_answer: "new" },
    { id: 3, question: "Which company developed Java?", options: ["Oracle", "Sun Microsystems", "Google", "Microsoft"], correct_answer: "Sun Microsystems" },
    { id: 4, question: "Which method is entry point in Java?", options: ["main", "start", "run", "init"], correct_answer: "main" },
    { id: 5, question: "What does JVM stand for?", options: ["Java Very Machine", "Java Virtual Machine", "Joint Virtual Memory", "Java Verified Module"], correct_answer: "Java Virtual Machine" }
  ],
  sql: [
    { id: 6, question: "Which SQL statement fetches data?", options: ["GET", "OPEN", "SELECT", "EXTRACT"], correct_answer: "SELECT" },
    { id: 7, question: "Which keyword is used for conditions?", options: ["IF", "WHERE", "WHEN", "CASE"], correct_answer: "WHERE" },
    { id: 8, question: "What does JOIN do?", options: ["Combines rows", "Deletes data", "Sorts data", "Indexes table"], correct_answer: "Combines rows" },
    { id: 9, question: "Which SQL keyword removes duplicates?", options: ["UNIQUE", "DISTINCT", "REMOVE", "ONLY"], correct_answer: "DISTINCT" },
    { id: 10, question: "Which function gives row count?", options: ["COUNT", "SUM", "TOTAL", "SIZE"], correct_answer: "COUNT" }
  ],
  python: [
    { id: 11, question: "What is type([])?", options: ["<class 'list'>", "<type 'list'>", "<list>", "list"], correct_answer: "<class 'list'>" },
    { id: 12, question: "Which keyword defines function?", options: ["func", "def", "function", "lambda"], correct_answer: "def" },
    { id: 13, question: "What does len() return?", options: ["Length", "Value", "Type", "Name"], correct_answer: "Length" },
    { id: 14, question: "Which symbol is used for comment?", options: ["#", "//", "--", "/* */"], correct_answer: "#" },
    { id: 15, question: "What is output of 2**3?", options: ["6", "8", "9", "5"], correct_answer: "8" }
  ],
  gk: [
    { id: 16, question: "Red planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], correct_answer: "Mars" },
    { id: 17, question: "Capital of France?", options: ["Berlin", "Paris", "Madrid", "London"], correct_answer: "Paris" },
    { id: 18, question: "Largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct_answer: "Pacific" },
    { id: 19, question: "Who invented telephone?", options: ["Newton", "Edison", "Bell", "Tesla"], correct_answer: "Bell" },
    { id: 20, question: "Currency of Japan?", options: ["Yuan", "Yen", "Won", "Ringgit"], correct_answer: "Yen" }
  ]
};


const QuizPage: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const questions = questionData[subject || ""] || [];

  const [answers, setAnswers] = useState<{ [id: number]: string }>({});
  const [phase, setPhase] = useState<"in-progress" | "skipped" | "submitted">("in-progress");

  const allSubjects = ["java", "sql", "python", "gk"];

  useEffect(() => {
    setAnswers({});
    setPhase("in-progress");
  }, [subject]);

  const handleChange = (questionId: number, option: string) => {
    if (phase !== "submitted") {
      setAnswers((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = () => {
  const skipped = questions.filter((q) => !answers[q.id]);

  if (skipped.length > 0 && phase === "in-progress") {
    setPhase("skipped");
  } else {
    // Final submission — no score or review needed
    const completedSubjects = JSON.parse(localStorage.getItem("completedSubjects") || "{}");
    completedSubjects[subject!] = {
      subject,
      questions,
      answers,
    };
    localStorage.setItem("completedSubjects", JSON.stringify(completedSubjects));

    // Go to next subject directly
    const currentIndex = allSubjects.indexOf(subject!);
    const nextSubject = allSubjects[currentIndex + 1];

    if (nextSubject) {
      navigate(`/quiz/${nextSubject}`);
    } else {
      navigate("/result");
    }
  }
};


  

  const handleNextSubject = () => {
    const currentIndex = allSubjects.indexOf(subject!);
    const nextSubject = allSubjects[currentIndex + 1];
    if (nextSubject) {
      navigate(`/quiz/${nextSubject}`);
    } else {
      navigate("/result");
    }
  };

  // For skipped phase, show only unanswered questions
  const displayedQuestions =
    phase === "skipped"
      ? questions.filter((q) => !answers[q.id])
      : questions;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4 overflow-y-auto">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8 capitalize">
          {subject} Quiz
        </h2>

        {displayedQuestions.map((q) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correct_answer;
          const isSkipped = !userAnswer;

          return (
            <div
              key={q.id}
              className={`mb-6 p-4 rounded-lg border ${
                phase === "skipped"
                  ? "bg-yellow-100 border-yellow-400"
                  : phase === "submitted"
                  ? isSkipped
                    ? "bg-yellow-100 border-yellow-300"
                    : isCorrect
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                  : "bg-white border-gray-200"
              }`}
            >
              <p className="font-medium mb-3">
                {q.question}
                {phase === "submitted" && userAnswer && (
                  <span className="inline-block ml-2 align-middle">
                    {isCorrect ? (
                      <CheckCircle className="inline text-green-600 w-5 h-5" />
                    ) : (
                      <XCircle className="inline text-red-600 w-5 h-5" />
                    )}
                  </span>
                )}
              </p>

              <div className="grid gap-2">
                {q.options.map((opt) => {
                  const isSelected = answers[q.id] === opt;
                  const isRightAnswer = opt === q.correct_answer;

                  let optionStyle = "bg-gray-100 hover:bg-gray-200";
                  if (phase === "submitted") {
                    if (isSelected && isCorrect) optionStyle = "bg-green-500 text-white";
                    else if (isSelected && !isCorrect) optionStyle = "bg-red-400 text-white";
                    else if (!isSelected && isRightAnswer) optionStyle = "bg-green-200";
                  } else if (isSelected) {
                    optionStyle = "bg-blue-500 text-white";
                  }

                  return (
                    <label
                      key={opt}
                      className={`cursor-pointer border rounded-lg px-4 py-2 transition ${optionStyle}`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={opt}
                        checked={isSelected}
                        onChange={() => handleChange(q.id, opt)}
                        className="hidden"
                      />
                      {opt}
                    </label>
                  );
                })}
              </div>

              {phase === "submitted" && !isCorrect && userAnswer && (
                <p className="mt-2 text-sm text-gray-600">
                  Correct Answer: <strong>{q.correct_answer}</strong>
                </p>
              )}

              {phase === "submitted" && isSkipped && (
                <p className="mt-2 text-sm text-yellow-700 font-semibold">
                  You skipped this question.
                </p>
              )}
            </div>
          );
        })}

        <div className="text-center mt-10">
  <button
    onClick={handleSubmit}
    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
  >
    {phase === "in-progress" ? "Submit" : "Submit Skipped"}
  </button>
</div>


       
      </div>
    </div>
  );
};

export default QuizPage;
