const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  enrollment: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 150
  },
  totalQuestions: {
    type: Number,
    default: 150
  },
  quizId: {
    type: String,
    required: true,
    default: 'cset381'
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for efficient leaderboard queries
scoreSchema.index({ quizId: 1, score: -1 });

module.exports = mongoose.model('Score', scoreSchema);