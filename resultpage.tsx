import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

const ResultPage: React.FC = () => {
  const [results, setResults] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("completedSubjects") || "{}");
    setResults(data);
  }, []);

  // Combine all questions from all subjects
  const allQuestions = Object.values(results).flatMap((res: any) =>
    res.questions.map((q: any) => ({
      ...q,
      userAnswer: res.answers[q.id],
      subject: res.subject,
    }))
  );

  const totalQuestions = allQuestions.length;
  const correctAnswers = allQuestions.filter((q: any) => q.userAnswer === q.correct_answer).length;
  const skippedAnswers = allQuestions.filter((q: any) => q.userAnswer === undefined).length;

  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-white px-4 py-10 flex flex-col items-center">
      {/* Final Score Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Quiz Completed!</h2>
        <p className="text-2xl text-gray-800 font-semibold">
          ✅ Correct: {correctAnswers} / {totalQuestions}
        </p>
        <p className="text-xl text-yellow-600 mb-1">⚠️ Skipped: {skippedAnswers}</p>
        <p className="text-xl text-gray-600">🎯 Percentage: {percentage}%</p>
      </div>

      {/* All Questions Section */}
      <div className="w-full max-w-3xl space-y-8">
        {allQuestions.map((q: any, index: number) => {
          const isCorrect = q.userAnswer === q.correct_answer;
          const isSkipped = q.userAnswer === undefined;

          return (
            <div
              key={`${q.subject}-${q.id}`}
              className="border rounded-xl p-5 shadow-sm bg-gray-50"
            >
              <p className="font-semibold mb-3 text-lg">
                {index + 1}. [{q.subject.toUpperCase()}] {q.question}
              </p>

              <div className="grid gap-2">
                {q.options.map((opt: string) => {
                  const isUserAnswer = q.userAnswer === opt;
                  const isCorrectAnswer = q.correct_answer === opt;

                  let optionStyle = "bg-white border";
                  let icon = null;

                  if (isSkipped && isCorrectAnswer) {
                    optionStyle = "bg-yellow-100 border-yellow-400";
                    icon = <AlertCircle className="text-yellow-600 w-5 h-5 ml-2 inline" />;
                  } else if (isCorrectAnswer) {
                    optionStyle = "bg-green-100 border-green-400";
                    icon = <CheckCircle className="text-green-600 w-5 h-5 ml-2 inline" />;
                  }

                  if (isUserAnswer && !isCorrectAnswer) {
                    optionStyle = "bg-red-100 border-red-400";
                    icon = <XCircle className="text-red-600 w-5 h-5 ml-2 inline" />;
                  }

                  return (
                    <div
                      key={opt}
                      className={`p-3 rounded-lg border flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {icon}
                    </div>
                  );
                })}
              </div>

              {isSkipped && (
                <p className="mt-2 text-yellow-700 font-medium flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  You skipped this question.
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        className="mt-12 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        onClick={() => {
          localStorage.removeItem("completedSubjects");
          navigate("/dashboard");
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ResultPage;

