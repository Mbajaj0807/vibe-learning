import { useState } from 'react';
import HomePage from './components/Homepage';
import QuizPage from './components/QuizPage';
import Leaderboard from './components/LeaderBoard';
import EnrollmentModal from './components/EnrollmentModal';
import ScoreCard from './components/ScoreCard';
import QUIZ_CONFIGS from './config/quizzes';

// IMPORTANT: Make sure your quiz data JSON is in the public/data/ folder
// e.g., public/data/cset381.json

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'quiz', 'leaderboard', 'score'
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [enrollment, setEnrollment] = useState('');
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [pendingAction, setPendingAction] = useState(null); // 'startQuiz' or null

  const handleStartQuiz = async (quizId) => {
    setSelectedQuizId(quizId);
    
    if (!enrollment) {
      setPendingAction('startQuiz');
      setShowEnrollmentModal(true);
      return;
    }

    // Load quiz questions
    try {
      const quizConfig = QUIZ_CONFIGS[quizId];
      const response = await fetch(`/data/${quizConfig.dataFile}.json`);
      const data = await response.json();
      // Extract quiz array from the JSON structure
      const questions = data.quiz || data;
      setQuizQuestions(questions);
      setCurrentView('quiz');
    } catch (error) {
      console.error('Failed to load quiz questions:', error);
      alert('Failed to load quiz. Please try again.');
    }
  };

  const handleViewLeaderboard = (quizId) => {
    setSelectedQuizId(quizId);
    setCurrentView('leaderboard');
  };

  const handleEnrollmentSubmit = async (enrollmentNumber) => {
    setEnrollment(enrollmentNumber);
    setShowEnrollmentModal(false);

    // If there was a pending action, execute it
    if (pendingAction === 'startQuiz' && selectedQuizId) {
      try {
        const quizConfig = QUIZ_CONFIGS[selectedQuizId];
        const response = await fetch(`/data/${quizConfig.dataFile}.json`);
        const data = await response.json();
        // Extract quiz array from the JSON structure
        const questions = data.quiz || data;
        setQuizQuestions(questions);
        setCurrentView('quiz');
      } catch (error) {
        console.error('Failed to load quiz questions:', error);
        alert('Failed to load quiz. Please try again.');
      }
    }
    setPendingAction(null);
  };

  const handleEnrollmentClose = () => {
    setShowEnrollmentModal(false);
    setPendingAction(null);
    setSelectedQuizId(null);
  };

  const handleQuizComplete = (score) => {
    setFinalScore(score);
    setCurrentView('score');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedQuizId(null);
    setQuizQuestions([]);
    setFinalScore(0);
  };

  const handleRetryQuiz = async () => {
    if (selectedQuizId) {
      try {
        const quizConfig = QUIZ_CONFIGS[selectedQuizId];
        const response = await fetch(`/data/${quizConfig.dataFile}.json`);
        const data = await response.json();
        // Extract quiz array from the JSON structure
        const questions = data.quiz || data;
        setQuizQuestions(questions);
        setCurrentView('quiz');
      } catch (error) {
        console.error('Failed to load quiz questions:', error);
        alert('Failed to load quiz. Please try again.');
      }
    }
  };

  return (
    <>
      {currentView === 'home' && (
        <HomePage
          onStartQuiz={handleStartQuiz}
          onViewLeaderboard={handleViewLeaderboard}
          quizzesConfig={QUIZ_CONFIGS}
        />
      )}

      {currentView === 'quiz' && selectedQuizId && quizQuestions.length > 0 && (
        <QuizPage
          quizId={selectedQuizId}
          quizConfig={QUIZ_CONFIGS[selectedQuizId]}
          questions={quizQuestions}
          onComplete={handleQuizComplete}
          enrollment={enrollment}
        />
      )}

      {currentView === 'leaderboard' && selectedQuizId && (
        <Leaderboard
          quizId={selectedQuizId}
          quizConfig={QUIZ_CONFIGS[selectedQuizId]}
          onBack={handleBackToHome}
        />
      )}

      {currentView === 'score' && selectedQuizId && (
        <ScoreCard
          score={finalScore}
          totalQuestions={quizQuestions.length}
          onHome={handleBackToHome}
          quizTitle={`${QUIZ_CONFIGS[selectedQuizId].title} - ${QUIZ_CONFIGS[selectedQuizId].subtitle}`}
        />
      )}

      {showEnrollmentModal && (
        <EnrollmentModal
          onSubmit={handleEnrollmentSubmit}
          onClose={handleEnrollmentClose}
          initialEnrollment={enrollment}
        />
      )}
    </>
  );
}

export default App;