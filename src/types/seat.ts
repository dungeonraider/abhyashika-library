export type SeatStatus = 'available' | 'booked' | 'partially-booked';

export interface TimeRange {
  start: string;
  end: string;
}

export interface BookingStatus {
  timeSlot: TimeRange;
  startDate: string;
  endDate: string;
  planType: string;
}

export interface Seat {
  id: number;
  status: SeatStatus;
  bookings: BookingStatus[];
}