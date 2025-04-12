const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env (if needed)
dotenv.config();

const seatRoutes = require('./routes/seats'); // ✅ Using your existing file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Cleaned MongoDB connection (no deprecated options)
mongoose
  .connect('mongodb://127.0.0.1:27017/train-reservation')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// API Routes
app.use('/seats', seatRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('🚆 Train Seat Reservation Backend Running');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
