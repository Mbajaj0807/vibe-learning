import { useState, useRef ,useEffect} from 'react';
import QuestionCard from './QuestionCard';
import ExitConfirmationModal from './ExitConfirmationModal';
import api from '../utils/api';

const QuizPage = ({ quizId, quizConfig, questions, onComplete, enrollment }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const trackerRef = useRef(null);

  const [questionStatus, setQuestionStatus] = useState(
    questions.map(() => ({ status: 'unattempted', selectedOption: null }))
  );

    useEffect(() => {
    const initScore = async () => {
      try {
        await api.submitScore(enrollment, 0, quizId);
      } catch (err) {
        console.error('Failed to initialize leaderboard entry:', err);
      }
    };
    initScore();
  }, [enrollment, quizId]);

  const finishQuiz = async (finalScore) => {
    setIsCompleted(true);
    try {
      await api.submitScore(enrollment, finalScore, quizId);
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
    onComplete(finalScore);
  };

  const handleAnswer = (isCorrect, selectedOption) => {
    const updatedStatus = [...questionStatus];
    updatedStatus[currentQuestionIndex] = { status: isCorrect ? 'correct' : 'incorrect', selectedOption };
    setQuestionStatus(updatedStatus);

    if (isCorrect) setScore(score + 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz(score + (isCorrect ? 1 : 0));
    }
  };

  const handleExitClick = () => setShowExitModal(true);
  const handleExitConfirm = () => finishQuiz(score);
  const handleExitCancel = () => setShowExitModal(false);

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  // Tracker sliding
  const scrollTracker = (direction) => {
    if (!trackerRef.current) return;
    const scrollAmount = 120; // adjust based on bubble size + gap
    trackerRef.current.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  if (isCompleted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 p-4 pt-8">
      {/* Score & Exit */}
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

      {/* Tracker with left/right buttons */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center gap-2">
        <button
          onClick={() => scrollTracker('left')}
          className="px-3 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
        >
          ◀
        </button>

        <div className="flex overflow-x-hidden gap-2 flex-1" ref={trackerRef}>
          {questions.map((_, index) => {
            const q = questionStatus[index];
            let bgColor = 'bg-gray-600';
            if (q.status === 'correct') bgColor = 'bg-green-500';
            if (q.status === 'incorrect') bgColor = 'bg-red-500';
            if (index === currentQuestionIndex) bgColor += ' ring-2 ring-blue-400';

            return (
              <div
                key={index}
                className={`${bgColor} w-10 h-10 flex items-center justify-center rounded-full text-white font-bold cursor-pointer flex-shrink-0`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scrollTracker('right')}
          className="px-3 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
        >
          ▶
        </button>
      </div>

      {/* Question Card */}
      <QuestionCard
  question={questions[currentQuestionIndex]}
  onAnswer={handleAnswer}
  currentQuestion={currentQuestionIndex + 1}
  totalQuestions={questions.length}
  statusObj={questionStatus[currentQuestionIndex]}
/>


      {/* Next / Previous Buttons */}
      <div className="flex justify-between max-w-4xl mx-auto mt-4">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="bg-gray-700 text-white px-6 py-2 rounded-full disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={goToNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
          className="bg-gray-700 text-white px-6 py-2 rounded-full disabled:opacity-50"
        >
          Next
        </button>
      </div>

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
