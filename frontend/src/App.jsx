import React, { useState } from "react";
import SeatMap from "./components/SeatMap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TOTAL_SEATS = 80;
const SEATS_PER_ROW = 7;
const TOTAL_ROWS = 12;

const App = () => {
  const [seats, setSeats] = useState(Array(TOTAL_SEATS).fill(false));
  const [numSeats, setNumSeats] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [lastBookedRow, setLastBookedRow] = useState(-1);

  const handleBookSeats = () => {
    const toBook = parseInt(numSeats);

    if (!toBook || toBook <= 0 || toBook > 7) {
      toast.error("Please enter a number between 1 and 7");
      return;
    }

    const available = seats.filter((s) => !s).length;
    if (available < toBook) {
      toast.error("Not enough available seats.");
      return;
    }

    const updatedSeats = [...seats];
    let booked = [];
    let rowTried = 0;
    let rowIndex = (lastBookedRow + 1) % TOTAL_ROWS;

    while (rowTried < TOTAL_ROWS) {
      const start = rowIndex * SEATS_PER_ROW;
      const rowSize = rowIndex === TOTAL_ROWS - 1 ? 3 : SEATS_PER_ROW;

      for (let j = 0; j <= rowSize - toBook; j++) {
        const rangeStart = start + j;
        const rangeEnd = rangeStart + toBook;
        if (rangeEnd <= start + rowSize) {
          const slice = updatedSeats.slice(rangeStart, rangeEnd);
          if (slice.every((s) => !s)) {
            for (let i = rangeStart; i < rangeEnd; i++) {
              updatedSeats[i] = true;
              booked.push(i);
            }
            setSeats(updatedSeats);
            setBookedSeats(booked);
            setLastBookedRow(rowIndex);
            setNumSeats("");
            toast.success("Seats Booked Successfully!");
            return;
          }
        }
      }

      rowIndex = (rowIndex + 1) % TOTAL_ROWS;
      rowTried++;
    }

    for (let i = 0; i < TOTAL_SEATS && booked.length < toBook; i++) {
      if (!updatedSeats[i]) {
        updatedSeats[i] = true;
        booked.push(i);
      }
    }

    if (booked.length === toBook) {
      setSeats(updatedSeats);
      setBookedSeats(booked);
      setLastBookedRow(Math.floor(booked[booked.length - 1] / SEATS_PER_ROW));
      setNumSeats("");
      toast.success("Seats Booked Successfully!");
      return;
    }

    toast.error("Could not book the required number of seats.");
  };

  const handleReset = () => {
    setSeats(Array(TOTAL_SEATS).fill(false));
    setBookedSeats([]);
    setNumSeats("");
    setLastBookedRow(-1);
    toast.info("Booking reset.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Train Ticket Booking</h1>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-7xl px-6">
        {/* Left: Seat Chart */}
        <div className="w-full lg:w-1/2 lg:ml-[-40px]">
          <h2 className="text-xl font-bold mb-4 text-center lg:text-left">Seat Layout</h2>
          <SeatMap seats={seats} />

          <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="bg-yellow-300 px-4 py-2 rounded font-semibold">
              Booked Seats: {seats.filter(Boolean).length}
            </div>
            <div className="bg-green-400 px-4 py-2 rounded font-semibold">
              Available Seats: {TOTAL_SEATS - seats.filter(Boolean).length}
            </div>
          </div>
        </div>

        {/* Right: Booking Panel */}
        <div className="w-full lg:w-1/2 flex flex-col items-end gap-4 lg:pr-12">

          {/* Header + booked icons in same row */}
          <div className="w-64 flex justify-between items-center">
            <h2 className="text-xl font-bold">Book Your Seats</h2>
            {bookedSeats.length > 0 && (
              <div className="flex gap-1 flex-wrap justify-end">
                {bookedSeats.map((seat) => (
                  <div
                    key={seat}
                    className="w-8 h-8 flex items-center justify-center rounded bg-yellow-300 text-black font-semibold"
                  >
                    {seat + 1}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input and Book button in same line */}
          <div className="flex gap-4 w-64">
            <input
              type="number"
              placeholder="Enter number of seats"
              className="border rounded px-3 py-2 w-3/4"
              value={numSeats}
              onChange={(e) => setNumSeats(e.target.value)}
              min="1"
              max="7"
            />
            <button
              onClick={handleBookSeats}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-1/4"
            >
              Book
            </button>
          </div>

          {/* Reset button below */}
          <button
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded w-64"
          >
            Reset Booking
          </button>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default App;
