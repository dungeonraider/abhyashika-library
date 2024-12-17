import { UserSubscription } from '../types/subscription';
import { seatService } from './seatService';
import { SLOT_TYPES } from '../constants/seats';

const DB_KEYS = {
  SUBSCRIPTIONS: 'abhyashika_subscriptions',
};

export const subscriptionService = {
  getAllSubscriptions(): UserSubscription[] {
    return JSON.parse(localStorage.getItem(DB_KEYS.SUBSCRIPTIONS) || '[]');
  },

  createSubscription(data: Omit<UserSubscription, 'id' | 'status'>): UserSubscription {
    const subscriptions = this.getAllSubscriptions();
    
    // Check seat availability
    const isSeatAvailable = seatService.isSeatAvailable(
      data.seatNumber,
      data.timeSlot,
      data.startDate,
      data.endDate
    );

    if (!isSeatAvailable) {
      throw new Error('Selected seat is not available for the chosen time slot');
    }

    const newSubscription: UserSubscription = {
      id: crypto.randomUUID(),
      ...data,
      status: 'active'
    };

    subscriptions.push(newSubscription);
    localStorage.setItem(DB_KEYS.SUBSCRIPTIONS, JSON.stringify(subscriptions));
    return newSubscription;
  },

  modifySubscription(
    subscriptionId: string,
    modification: { timeSlot?: { start: string; end: string }; seatNumber?: number }
  ): UserSubscription {
    const subscriptions = this.getAllSubscriptions();
    const index = subscriptions.findIndex(sub => sub.id === subscriptionId);
    
    if (index === -1) throw new Error('Subscription not found');
    if (subscriptions[index].status !== 'active') {
      throw new Error('Cannot modify inactive subscription');
    }

    const updatedSubscription = {
      ...subscriptions[index],
      ...modification,
      modifiedAt: new Date().toISOString()
    };

    // Check seat availability if seat is being changed
    if (modification.seatNumber && modification.seatNumber !== subscriptions[index].seatNumber) {
      const isSeatAvailable = seatService.isSeatAvailable(
        modification.seatNumber,
        updatedSubscription.timeSlot,
        updatedSubscription.startDate,
        updatedSubscription.endDate
      );

      if (!isSeatAvailable) {
        throw new Error('Selected seat is not available for the chosen time slot');
      }
    }

    subscriptions[index] = updatedSubscription;
    localStorage.setItem(DB_KEYS.SUBSCRIPTIONS, JSON.stringify(subscriptions));
    return updatedSubscription;
  },

  upgradeSubscription(
    subscriptionId: string,
    newPlanType: string,
    newTimeSlot: { start: string; end: string },
    newSeatNumber: number
  ): UserSubscription {
    const subscriptions = this.getAllSubscriptions();
    const oldSubscription = subscriptions.find(sub => sub.id === subscriptionId);
    
    if (!oldSubscription) throw new Error('Subscription not found');
    if (oldSubscription.status !== 'active') {
      throw new Error('Cannot upgrade inactive subscription');
    }

    // Check if within 5 days of expiry
    const daysToExpiry = Math.ceil(
      (new Date(oldSubscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysToExpiry > 5) {
      throw new Error('Plan modifications are only allowed within 5 days of subscription expiry');
    }

    // Create upgraded subscription
    const upgradedSubscription: UserSubscription = {
      ...oldSubscription,
      id: crypto.randomUUID(),
      planType: newPlanType,
      timeSlot: newTimeSlot,
      seatNumber: newSeatNumber,
      status: 'active',
      modifiedAt: new Date().toISOString(),
      upgradedFrom: subscriptionId
    };

    // Mark old subscription as upgraded
    const updatedSubscriptions = subscriptions.map(sub => {
      if (sub.id === subscriptionId) {
        return { ...sub, status: 'upgraded', modifiedAt: new Date().toISOString() };
      }
      return sub;
    });

    updatedSubscriptions.push(upgradedSubscription);
    localStorage.setItem(DB_KEYS.SUBSCRIPTIONS, JSON.stringify(updatedSubscriptions));
    return upgradedSubscription;
  },

  downgradeSubscription(
    subscriptionId: string,
    newPlanType: string,
    newTimeSlot: { start: string; end: string },
    newSeatNumber: number
  ): UserSubscription {
    const subscriptions = this.getAllSubscriptions();
    const oldSubscription = subscriptions.find(sub => sub.id === subscriptionId);
    
    if (!oldSubscription) throw new Error('Subscription not found');
    if (oldSubscription.status !== 'active') {
      throw new Error('Cannot downgrade inactive subscription');
    }

    // Check if within 5 days of expiry
    const daysToExpiry = Math.ceil(
      (new Date(oldSubscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysToExpiry > 5) {
      throw new Error('Plan modifications are only allowed within 5 days of subscription expiry');
    }

    // Create downgraded subscription
    const downgradedSubscription: UserSubscription = {
      ...oldSubscription,
      id: crypto.randomUUID(),
      planType: newPlanType,
      timeSlot: newTimeSlot,
      seatNumber: newSeatNumber,
      status: 'active',
      modifiedAt: new Date().toISOString(),
      modifiedFrom: subscriptionId
    };

    // Mark old subscription as modified
    const updatedSubscriptions = subscriptions.map(sub => {
      if (sub.id === subscriptionId) {
        return { ...sub, status: 'modified', modifiedAt: new Date().toISOString() };
      }
      return sub;
    });

    updatedSubscriptions.push(downgradedSubscription);
    localStorage.setItem(DB_KEYS.SUBSCRIPTIONS, JSON.stringify(updatedSubscriptions));
    return downgradedSubscription;
  },

  cancelSubscription(subscriptionId: string): void {
    const subscriptions = this.getAllSubscriptions();
    const updatedSubscriptions = subscriptions.map(sub => {
      if (sub.id === subscriptionId) {
        return {
          ...sub,
          status: 'cancelled',
          cancelledAt: new Date().toISOString()
        };
      }
      return sub;
    });

    localStorage.setItem(DB_KEYS.SUBSCRIPTIONS, JSON.stringify(updatedSubscriptions));
  },

  modifySubscriptionStatus(subscriptionId: string, newStatus: string): void {
    const subscriptions = this.getAllSubscriptions();
    const updatedSubscriptions = subscriptions.map(sub => {
      if (sub.id === subscriptionId) {
        return {
          ...sub,
          status: newStatus,
          modifiedAt: new Date().toISOString()
        };
      }
      return sub;
    });

    localStorage.setItem(DB_KEYS.SUBSCRIPTIONS, JSON.stringify(updatedSubscriptions));
  }
};