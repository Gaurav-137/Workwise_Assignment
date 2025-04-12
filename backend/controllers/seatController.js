// File: backend/controllers/seatController.js

const Seat = require('../models/Seat'); // MongoDB model for seats

// Controller to get all seats
exports.getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find().sort('seatNumber');
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching seats', error: err });
  }
};

// Controller to book consecutive seats
exports.bookSeats = async (req, res) => {
  const { count } = req.body;

  if (!count || count <= 0) {
    return res.status(400).json({ message: 'Invalid seat count' });
  }

  try {
    const availableSeats = await Seat.find({ isBooked: false }).sort('seatNumber');

    // Find the first block of `count` consecutive seats
    for (let i = 0; i <= availableSeats.length - count; i++) {
      const block = availableSeats.slice(i, i + count);
      const expected = block.map((_, idx) => block[0].seatNumber + idx);
      const actual = block.map(s => s.seatNumber);

      if (JSON.stringify(expected) === JSON.stringify(actual)) {
        // Mark those as booked
        const booked = [];
        for (let seat of block) {
          seat.isBooked = true;
          await seat.save();
          booked.push(seat);
        }
        return res.json({ booked });
      }
    }

    res.status(400).json({ message: 'No consecutive seats available' });
  } catch (err) {
    res.status(500).json({ message: 'Error booking seats', error: err });
  }
};

// Controller to reset seats (clear bookings)
exports.resetSeats = async (req, res) => {
  try {
    await Seat.updateMany({}, { isBooked: false });
    res.json({ message: 'All seats reset' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting seats', error: err });
  }
};
