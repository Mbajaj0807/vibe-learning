import { useState, useEffect } from 'react';
import { Trophy, Home } from 'lucide-react';
import api from '../utils/api'; // Adjust path as needed


const Leaderboard = ({ quizId, quizConfig, onBack }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await api.getLeaderboard(quizId, 10);
        setLeaderboard(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [quizId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 p-4">
      <div className="max-w-5xl mx-auto pt-8">
        <div className="text-center mb-10">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-blue-300 text-lg">
            {quizConfig.title} - {quizConfig.subtitle}
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-black rounded-2xl shadow-2xl overflow-hidden border border-blue-800">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto"></div>
              <p className="text-blue-300 mt-4">Loading leaderboard...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-400">
              <p>{error}</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="p-12 text-center">
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-blue-300 text-lg">No scores yet. Be the first to take the quiz!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-900 to-blue-800">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-white">Rank</th>
                    <th className="px-6 py-4 text-left font-semibold text-white">Enrollment</th>
                    <th className="px-6 py-4 text-right font-semibold text-white">Score</th>
                    <th className="px-6 py-4 text-right font-semibold text-white">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-800 transition-colors hover:bg-blue-950/50 ${
                        index % 2 === 0 ? 'bg-gray-900/50' : 'bg-gray-900/30'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {index === 0 && <Trophy className="w-6 h-6 text-yellow-500" />}
                          {index === 1 && <Trophy className="w-6 h-6 text-gray-400" />}
                          {index === 2 && <Trophy className="w-6 h-6 text-orange-600" />}
                          <span className="font-bold text-lg text-white">{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-blue-200">{entry.enrollment}</td>
                      <td className="px-6 py-4 text-right font-bold text-blue-400 text-lg">
                        {entry.score}
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-400">
                        {new Date(entry.completedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg inline-flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;