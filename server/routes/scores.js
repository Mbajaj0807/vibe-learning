const express = require('express');
const router = express.Router();
const Score = require('../models/score');

// Submit quiz score
router.post('/submit', async (req, res) => {
  try {
    const { enrollment, score, quizId } = req.body;
    
    if (!enrollment || score === undefined) {
      return res.status(400).json({ error: 'Enrollment and score are required' });
    }

    const newScore = new Score({
      enrollment: enrollment.toUpperCase(),
      score,
      quizId: quizId || 'cset381'
    });

    await newScore.save();
    res.status(201).json({ message: 'Score submitted successfully', data: newScore });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit score', details: error.message });
  }
});

// Get leaderboard for a specific quiz
router.get('/leaderboard/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    const leaderboard = await Score.find({ quizId })
      .sort({ score: -1, completedAt: 1 })
      .limit(limit)
      .select('enrollment score completedAt -_id');

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard', details: error.message });
  }
});

// Get user's best score for a quiz
router.get('/user/:enrollment/:quizId', async (req, res) => {
  try {
    const { enrollment, quizId } = req.params;
    
    const bestScore = await Score.findOne({ 
      enrollment: enrollment.toUpperCase(), 
      quizId 
    })
    .sort({ score: -1 })
    .select('score completedAt -_id');

    res.json(bestScore || { score: 0 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user score', details: error.message });
  }
});

module.exports = router;