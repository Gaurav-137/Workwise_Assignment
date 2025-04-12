
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const seatRoutes = require('../backend/routes/seats'); // Your existing seat routes

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection using environment variable (MONGO_URI)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// API Routes
app.use('/seats', seatRoutes);

// Vercel expects a handler, so we need to export the serverless function
module.exports = (req, res) => {
  app(req, res); // Forward the request and response to the Express app
};
