import React from 'react';
import { UserSubscription } from '../../../types/subscription';
import { daysUntil } from '../../../utils/date';

interface RenewalStatusProps {
  subscription: UserSubscription;
}

export default function RenewalStatus({ subscription }: RenewalStatusProps) {
  const daysToExpiry = daysUntil(subscription.endDate);
  const showRenewal = daysToExpiry <= 30; // Show renewal option in last 30 days

  if (!showRenewal) return null;

  return (
    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
      <p className="text-yellow-800">
        Your subscription will expire in {daysToExpiry} days. Consider renewing to keep your preferred seat.
      </p>
    </div>
  );
}