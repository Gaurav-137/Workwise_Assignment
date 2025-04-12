const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  number: Number,
  isBooked: { type: Boolean, default: false }
});

module.exports = mongoose.model('Seat', seatSchema);
