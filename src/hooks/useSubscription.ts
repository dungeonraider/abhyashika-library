import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserSubscription } from '../types/subscription';

export const useSubscription = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [history, setHistory] = useState<UserSubscription[]>([]);

  const fetchSubscriptions = () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const subscriptions = JSON.parse(localStorage.getItem('abhyashika_subscriptions') || '[]');
      
      // Get active subscription
      const activeSubscription = subscriptions.find(
        (sub: UserSubscription) => 
          sub.userId === user.id && 
          sub.status === 'active'
      );

      // Get subscription history (cancelled, modified, expired)
      const subscriptionHistory = subscriptions
        .filter((sub: UserSubscription) => 
          sub.userId === user.id && 
          ['cancelled', 'modified', 'expired', 'upgraded'].includes(sub.status)
        )
        .sort((a: UserSubscription, b: UserSubscription) => {
          const dateA = new Date(a.modifiedAt || a.cancelledAt || a.endDate);
          const dateB = new Date(b.modifiedAt || b.cancelledAt || b.endDate);
          return dateB.getTime() - dateA.getTime();
        });

      setSubscription(activeSubscription || null);
      setHistory(subscriptionHistory);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [user]);

  return {
    subscription,
    history,
    loading,
    refetchSubscriptions: fetchSubscriptions
  };
};