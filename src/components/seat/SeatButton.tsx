import React from 'react';
import { Seat, SeatStatus } from '../../types/seat';

interface SeatButtonProps {
  seat: Seat;
  onSelect: (seat: Seat) => void;
  isSelected: boolean;
}

const getStatusColor = (status: SeatStatus, isSelected: boolean) => {
  if (isSelected) return 'bg-blue-500 text-white hover:bg-blue-600';
  
  switch (status) {
    case 'available':
      return 'bg-green-100 hover:bg-green-200';
    case 'booked':
      return 'bg-red-100 cursor-not-allowed';
    case 'partially-booked':
      return 'bg-yellow-100 hover:bg-yellow-200';
    default:
      return 'bg-gray-100';
  }
};

export default function SeatButton({ seat, onSelect, isSelected }: SeatButtonProps) {
  return (
    <button
      onClick={() => onSelect(seat)}
      disabled={seat.status === 'booked'}
      className={`
        p-2 rounded-md text-sm font-medium transition-colors
        ${getStatusColor(seat.status, isSelected)}
      `}
    >
      {seat.id}
    </button>
  );
}