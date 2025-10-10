import { Trophy, TrendingUp } from 'lucide-react';

const HomePage = ({ onStartQuiz, onViewLeaderboard, quizzesConfig }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 flex flex-col items-center justify-center p-6">
      <div className="max-w-6xl w-full flex-1">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Vibe Learning
          </h1>
          <p className="text-xl text-blue-300">
            Master your exams with interactive quizzes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(quizzesConfig).map((quiz) => (
            <div
              key={quiz.id}
              className="bg-gradient-to-br from-gray-900 via-blue-950 to-black rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300 border border-blue-800"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white">{quiz.title}</h2>
                  <p className="text-blue-300 text-lg">{quiz.subtitle}</p>
                </div>
                <Trophy className="w-12 h-12 text-yellow-500" />
              </div>

              <div className="bg-blue-950 p-4 rounded-lg border border-blue-800 mb-6">
                <p className="text-sm text-blue-200 mb-2 flex items-center gap-2">
                  <span className="text-2xl">📚</span>
                  <span className="font-medium">{quiz.questions} Questions</span>
                </p>
                <p className="text-sm text-blue-200 flex items-center gap-2">
                  <span className="text-2xl">⏱️</span>
                  <span className="font-medium">{quiz.timePerQuestion} sec/question</span>
                </p>
              </div>

              <button
                onClick={() => onStartQuiz(quiz.id)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg mb-3"
              >
                Start Quiz
              </button>

              <button
                onClick={() => onViewLeaderboard(quiz.id)}
                className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 rounded-xl font-semibold text-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                View Leaderboard
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Credits Section */}
      <footer className="mt-12 text-center text-blue-300 text-sm">
        Created by <strong>Manan Bajaj</strong> 
      </footer>
    </div>
  );
};

export default HomePage;
