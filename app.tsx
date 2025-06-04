import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";
import Header from "./components/Header";


const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz/:subject" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
