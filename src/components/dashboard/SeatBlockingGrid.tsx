import React from 'react';

interface SeatBlockingGridProps {
  blockedSeats: number[];
  onSeatToggle: (seatNumber: number) => void;
}

export default function SeatBlockingGrid({ blockedSeats, onSeatToggle }: SeatBlockingGridProps) {
  return (
    <div className="p-4">
      <p className="text-sm text-gray-500 mb-4">
        Click on seats to block/unblock them. Blocked seats will not be available for booking.
      </p>
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: 150 }, (_, i) => i + 1).map(seatNumber => (
          <button
            key={seatNumber}
            onClick={() => onSeatToggle(seatNumber)}
            className={`
              p-2 rounded-md text-sm font-medium transition-colors
              ${blockedSeats.includes(seatNumber)
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-100 hover:bg-gray-200'}
            `}
          >
            {seatNumber}
          </button>
        ))}
      </div>
    </div>
  );
}