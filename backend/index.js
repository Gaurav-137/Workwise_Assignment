const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const seatRoutes = require('../routes/seats');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

// Routes
app.use('/seats', seatRoutes);

app.get('/', (req, res) => {
  res.send('🚆 Train Seat Reservation Backend Running');
});

module.exports = app;
