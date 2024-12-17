import React from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { Link } from 'react-router-dom';
import SubscriptionDetails from './subscription/SubscriptionDetails';
import SubscriptionHistory from './subscription/SubscriptionHistory';
import { DashboardSkeleton } from '../skeletons/DashboardSkeleton';

export default function UserDashboard() {
  const { subscription, history, loading, refetchSubscriptions } = useSubscription();

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          {!subscription && (
            <Link
              to="/seat-management"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Book a Seat
            </Link>
          )}
        </div>

        {subscription ? (
          <SubscriptionDetails 
            subscription={subscription} 
            onUpdate={refetchSubscriptions}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900">No Active Subscription</h3>
            <p className="mt-2 text-gray-600">
              You don't have an active subscription. Book a seat to get started!
            </p>
          </div>
        )}

        {history.length > 0 && (
          <SubscriptionHistory history={history} />
        )}
      </div>
    </div>
  );
}