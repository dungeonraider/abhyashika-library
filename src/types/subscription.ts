export interface UserSubscription {
  id: string;
  userId: string;
  planType: string;
  seatNumber: number;
  startDate: string;
  endDate: string;
  timeSlot: {
    start: string;
    end: string;
  };
  status: 'active' | 'expired' | 'cancelled' | 'pending' | 'modified' | 'upgraded';
  duration: number;
  totalAmount: number;
  createdAt: string;
  modifiedAt?: string;
  cancelledAt?: string;
  modifiedFrom?: string;
  upgradedFrom?: string;
}

export interface SubscriptionModification {
  seatNumber?: number;
  timeSlot?: {
    start: string;
    end: string;
  };
}