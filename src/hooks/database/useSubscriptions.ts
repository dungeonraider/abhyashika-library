import { useState, useEffect } from 'react';
import { UserSubscription } from '../../types/subscription';
import { SubscriptionService } from '../../services/database/subscription.service';

export const useSubscriptions = (userId?: string) => {
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSubscriptions = async () => {
    try {
      const data = userId 
        ? await SubscriptionService.getUserSubscriptions(userId)
        : await SubscriptionService.getAllSubscriptions();
      setSubscriptions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch subscriptions'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [userId]);

  return { subscriptions, loading, error, refetch: fetchSubscriptions };
};