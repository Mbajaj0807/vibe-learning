import { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import ExitConfirmationModal from './ExitConfirmationModal';
import api from '../utils/api';

const QuizPage = ({ quizId, quizConfig, questions, onComplete, enrollment }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quizConfig.timePerQuestion);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    if (isCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(false);
          return quizConfig.timePerQuestion;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, isCompleted, quizConfig.timePerQuestion]);

  const finishQuiz = async (finalScore) => {
    setIsCompleted(true);
    try {
      await api.submitScore(enrollment, finalScore, quizId);
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
    onComplete(finalScore);
  };

  const handleAnswer = (isCorrect) => {
    const updatedScore = isCorrect ? score + 1 : score;

    if (currentQuestionIndex < questions.length - 1) {
      setScore(updatedScore);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(quizConfig.timePerQuestion);
    } else {
      finishQuiz(updatedScore);
    }
  };

  const handleExitClick = () => {
    setShowExitModal(true);
  };

  const handleExitConfirm = () => {
    finishQuiz(score);
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  if (isCompleted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 p-4 pt-8">
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <div className="bg-gradient-to-r from-gray-900 to-blue-950 px-6 py-3 rounded-full shadow-lg border border-blue-700">
          <span className="text-blue-300 font-medium">Score: </span>
          <span className="text-blue-400 font-bold text-xl">{score}</span>
        </div>
        <button
          onClick={handleExitClick}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
        >
          Exit Quiz
        </button>
      </div>

      <QuestionCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        timeLeft={timeLeft}
      />

      {showExitModal && (
        <ExitConfirmationModal
          onConfirm={handleExitConfirm}
          onCancel={handleExitCancel}
          currentScore={score}
        />
      )}
    </div>
  );
};

export default QuizPage;
