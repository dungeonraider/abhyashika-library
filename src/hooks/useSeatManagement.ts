import { useState } from 'react';
import { Seat, TimeRange, SlotType } from '../types/seat';

export const useSeatManagement = () => {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeRange | null>(null);
  const [selectedSlotType, setSelectedSlotType] = useState<SlotType | null>(null);

  const checkSeatAvailability = (seat: Seat, timeRange: TimeRange) => {
    // Check if the seat is available for the selected time range
    const conflictingBookings = seat.bookings.filter(booking => {
      const bookingStart = new Date(`2024-01-01T${booking.timeRange.start}`);
      const bookingEnd = new Date(`2024-01-01T${booking.timeRange.end}`);
      const requestStart = new Date(`2024-01-01T${timeRange.start}`);
      const requestEnd = new Date(`2024-01-01T${timeRange.end}`);

      return (
        (requestStart >= bookingStart && requestStart < bookingEnd) ||
        (requestEnd > bookingStart && requestEnd <= bookingEnd) ||
        (requestStart <= bookingStart && requestEnd >= bookingEnd)
      );
    });

    return conflictingBookings.length === 0;
  };

  const bookSeat = async (seat: Seat, userId: string) => {
    if (!selectedTimeSlot || !selectedSlotType) {
      throw new Error('Please select a time slot and slot type');
    }

    // Implement booking logic here
    // This would typically involve an API call
    console.log('Booking seat:', {
      seatId: seat.id,
      userId,
      timeSlot: selectedTimeSlot,
      slotType: selectedSlotType,
    });
  };

  return {
    selectedSeat,
    selectedTimeSlot,
    selectedSlotType,
    setSelectedSeat,
    setSelectedTimeSlot,
    setSelectedSlotType,
    checkSeatAvailability,
    bookSeat,
  };
};