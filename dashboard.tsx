import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const goToQuiz = (subject: string) => {
    navigate(`/quiz/${subject}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Subject Buttons Row */}
      <div className="flex justify-center space-x-6 flex-wrap mb-8">
        {["Java", "SQL", "Python", "GK"].map((subject) => (
          <button
            key={subject}
            onClick={() => goToQuiz(subject.toLowerCase())}
            className="bg-blue-500 text-white py-4 px-10 rounded-xl hover:bg-blue-600 text-lg font-semibold"
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Two-column layout: text left, image right */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Left: Welcome Text */}
        <div className="text-center md:text-left max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Learn Peak!
          </h1>
          <p className="text-xl text-gray-600">
            Complete Quiz and Improve Learning
          </p>
        </div>

        {/* Right: Image */}
        <div>
          <img
            src="/learn-peak.png" // Ensure the image is placed inside public folder with this name
            alt="Learning Never Ends"
            className="w-full max-w-sm rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
