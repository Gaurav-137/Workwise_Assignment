import React from "react";

const SeatMap = ({ seats }) => {
  return (
    <div className="grid grid-cols-7 gap-2 justify-center">
      {seats.map((isBooked, index) => (
        <div
          key={index}
          className={`w-10 h-10 flex items-center justify-center rounded 
            text-black font-semibold border 
            ${isBooked ? "bg-yellow-300 border-yellow-500" : "bg-green-400 border-green-600"}`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default SeatMap;
