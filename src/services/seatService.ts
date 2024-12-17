import { Seat, TimeRange, BookingStatus } from '../types/seat';
import { UserSubscription } from '../types/subscription';
import { doTimeSlotsOverlap } from '../utils/timeSlots';

const DB_KEYS = {
  SUBSCRIPTIONS: 'abhyashika_subscriptions',
  BLOCKED_SEATS: 'blockedSeats'
};

export const seatService = {
  getActiveSubscriptions(): UserSubscription[] {
    return JSON.parse(localStorage.getItem(DB_KEYS.SUBSCRIPTIONS) || '[]')
      .filter((sub: UserSubscription) => sub.status === 'active');
  },

  getBlockedSeats(): number[] {
    return JSON.parse(localStorage.getItem(DB_KEYS.BLOCKED_SEATS) || '[]');
  },

  isSeatAvailable(
    seatId: number,
    timeSlot: TimeRange,
    startDate: string,
    endDate: string,
    excludeSubscriptionId?: string
  ): boolean {
    // Check if seat is blocked by admin
    const blockedSeats = this.getBlockedSeats();
    if (blockedSeats.includes(seatId)) {
      return false;
    }

    const activeSubscriptions = this.getActiveSubscriptions()
      .filter(sub => 
        sub.seatNumber === seatId && 
        (excludeSubscriptionId ? sub.id !== excludeSubscriptionId : true)
      );

    // For full day booking requests, check if there are any existing bookings
    if (timeSlot.start === '07:00' && timeSlot.end === '23:00') {
      return activeSubscriptions.length === 0;
    }

    // Check if seat has a full day booking
    const hasFullDayBooking = activeSubscriptions.some(sub => 
      sub.planType === '12hours' &&
      new Date(sub.startDate) <= new Date(endDate) &&
      new Date(sub.endDate) >= new Date(startDate)
    );

    if (hasFullDayBooking) return false;

    // Check for time slot conflicts
    return !activeSubscriptions.some(sub => {
      const subStart = new Date(sub.startDate);
      const subEnd = new Date(sub.endDate);
      const newStart = new Date(startDate);
      const newEnd = new Date(endDate);

      // Check date overlap
      if (newStart <= subEnd && newEnd >= subStart) {
        // Check time slot overlap
        return doTimeSlotsOverlap(timeSlot, sub.timeSlot);
      }
      return false;
    });
  },

  getSeatStatus(seatId: number, excludeSubscriptionId?: string): Seat['status'] {
    // Check if seat is blocked by admin
    const blockedSeats = this.getBlockedSeats();
    if (blockedSeats.includes(seatId)) {
      return 'booked';
    }

    const activeSubscriptions = this.getActiveSubscriptions()
      .filter(sub => 
        sub.seatNumber === seatId && 
        (excludeSubscriptionId ? sub.id !== excludeSubscriptionId : true)
      );

    if (activeSubscriptions.length === 0) return 'available';
    
    // If there's a full day booking, seat is fully booked
    if (activeSubscriptions.some(sub => sub.planType === '12hours')) {
      return 'booked';
    }

    // If there are some bookings but not full day, seat is partially booked
    return activeSubscriptions.length > 0 ? 'partially-booked' : 'available';
  }
};