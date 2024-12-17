import React from 'react';
import { Seat } from '../../types/seat';
import { STATUS_INDICATORS } from '../../constants/seats';

interface SeatGridProps {
  seats: Seat[];
  selectedSeatId: number | null;
  onSeatSelect: (seatId: number) => void;
}

export default function SeatGrid({ seats, selectedSeatId, onSeatSelect }: SeatGridProps) {
  const getStatusColor = (status: Seat['status'], isSelected: boolean) => {
    if (isSelected) return 'bg-blue-500 text-white';
    switch (status) {
      case 'available':
        return 'bg-green-100 hover:bg-green-200';
      case 'partially-booked':
        return 'bg-yellow-100 hover:bg-yellow-200';
      case 'booked':
        return 'bg-red-100 cursor-not-allowed';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div>
      <div className="mb-4 flex gap-4">
        {STATUS_INDICATORS.map((indicator) => (
          <div key={indicator.status} className="flex items-center gap-2">
            <div className={`w-4 h-4 ${indicator.color} rounded`}></div>
            <span className="text-sm">{indicator.status}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-10 gap-2">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => seat.status !== 'booked' && onSeatSelect(seat.id)}
            disabled={seat.status === 'booked'}
            className={`
              p-2 rounded-md text-sm font-medium transition-colors
              ${getStatusColor(seat.status, seat.id === selectedSeatId)}
            `}
          >
            {seat.id}
          </button>
        ))}
      </div>
    </div>
  );
}