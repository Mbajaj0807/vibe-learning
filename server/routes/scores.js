const express = require('express');
const router = express.Router();
const Score = require('../models/score');

// Submit or update quiz score
router.post('/submit', async (req, res) => {
  try {
    let { enrollment, score, quizId } = req.body;

    if (!enrollment || score === undefined) {
      return res.status(400).json({ error: 'Enrollment and score are required' });
    }

    enrollment = enrollment.toUpperCase();
    quizId = quizId;

    // Upsert: update if exists, else create
    const updatedScore = await Score.findOneAndUpdate(
      { enrollment, quizId }, // filter
      { 
        $set: { 
          score, 
          completedAt: new Date() 
        
        },
        $setOnInsert: { enrollment, quizId } // for new documents
      },
      { new: true, upsert: true } // return the updated doc, create if not exists
    );

    res.status(200).json({ message: 'Score submitted successfully', data: updatedScore });
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
      quizId,
    })
      .sort({ score: -1 })
      .select('score completedAt -_id');

    res.json(bestScore || { score: 0 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user score', details: error.message });
  }
});

module.exports = router;
