// backend/seed.js
const mongoose = require('mongoose');
const Seat = require('./models/Seat');

mongoose.connect('mongodb://127.0.0.1:27017/train-reservation')
  .then(async () => {
    await Seat.deleteMany({});
    const seats = Array.from({ length: 80 }, (_, i) => ({
      seatNumber: i + 1,
      isBooked: false,
    }));
    await Seat.insertMany(seats);
    console.log('✅ Seeded 80 seats!');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error connecting to DB:', err);
    process.exit(1);
  });
