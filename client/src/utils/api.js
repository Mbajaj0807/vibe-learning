const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  submitScore: async (enrollment, score, quizId) => {
    const response = await fetch(`${API_BASE_URL}/scores/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enrollment, score, quizId })
    });
    if (!response.ok) throw new Error('Failed to submit score');
    return response.json();
  },
  
  getLeaderboard: async (quizId, limit = 50) => {
    const response = await fetch(`${API_BASE_URL}/scores/leaderboard/${quizId}?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return response.json();
  },
  
  getUserScore: async (enrollment, quizId) => {
    const response = await fetch(`${API_BASE_URL}/scores/user/${enrollment}/${quizId}`);
    if (!response.ok) throw new Error('Failed to fetch user score');
    return response.json();
  }
};

export default api;
