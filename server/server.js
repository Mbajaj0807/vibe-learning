require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const scoresRouter = require('./routes/scores');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
app.use
// Middleware
app.use(cors(
  {
    origin: ['http://localhost:3000', 'https://vibe-learning.vercel.app'],
    credentials: true
  }
));
app.use(express.json());

// Routes
app.use('/api/scores', scoresRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});