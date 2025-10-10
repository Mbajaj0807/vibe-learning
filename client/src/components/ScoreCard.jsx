import { Trophy, Home } from 'lucide-react';


const ScoreCard = ({ score, totalQuestions, onHome, quizTitle }) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(1);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-black rounded-2xl shadow-2xl p-12 max-w-md w-full text-center border border-blue-800">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h1>
        <p className="text-blue-300 mb-8">{quizTitle}</p>
        
        <div className="bg-blue-950 rounded-xl p-6 mb-8 border border-blue-800">
          <div className="text-6xl font-bold text-blue-400 mb-2">
            {score}/{totalQuestions}
          </div>
          <div className="text-2xl text-blue-300">{percentage}%</div>
        </div>

        <button
          onClick={onHome}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ScoreCard;