import React from 'react';
import { seatService } from '../../services/seatService';
import { Seat } from '../../types/seat';
import SeatGrid from './SeatGrid';
import { SeatMapSkeleton } from '../skeletons/SeatMapSkeleton';

interface SeatMapProps {
  selectedTimeSlot: { start: string; end: string } | null;
  selectedSeatId: number | null;
  onSeatSelect: (seatId: number) => void;
  planType: string;
  loading?: boolean;
}

export default function SeatMap({ 
  selectedTimeSlot, 
  selectedSeatId, 
  onSeatSelect, 
  planType,
  loading = false
}: SeatMapProps) {
  if (loading) {
    return <SeatMapSkeleton />;
  }

  const seats: Seat[] = Array.from({ length: 150 }, (_, index) => {
    const seatId = index + 1;
    const status = selectedTimeSlot 
      ? (seatService.isSeatAvailable(
          seatId,
          selectedTimeSlot,
          new Date().toISOString(),
          new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
        ) ? 'available' : 'booked')
      : seatService.getSeatStatus(seatId);

    return {
      id: seatId,
      status,
      bookings: []
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Select Your Seat</h2>
      <SeatGrid
        seats={seats}
        selectedSeatId={selectedSeatId}
        onSeatSelect={onSeatSelect}
      />
    </div>
  );
}