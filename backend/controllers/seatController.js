const Seat = require('../models/Seat');

exports.getAllSeats = async (req, res) => {
  const seats = await Seat.find().sort('seatNumber');
  res.json(seats);
};

exports.bookSeats = async (req, res) => {
  const { count } = req.body;

  if (!count || count <= 0) {
    return res.status(400).json({ message: 'Invalid seat count' });
  }

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
};

exports.resetSeats = async (req, res) => {
  await Seat.updateMany({}, { isBooked: false });
  res.json({ message: 'All seats reset' });
};
