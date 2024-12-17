import React from 'react';
import { UserSubscription } from '../../../types/subscription';
import { formatDate } from '../../../utils/date';

interface SubscriptionHistoryProps {
  history: UserSubscription[];
}

export default function SubscriptionHistory({ history }: SubscriptionHistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Subscription History</h2>
      <div className="space-y-6">
        {history.map((subscription) => (
          <div 
            key={subscription.id}
            className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  subscription.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  subscription.status === 'modified' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                </span>
                <p className="mt-2 text-sm text-gray-500">
                  {subscription.status === 'cancelled' && subscription.cancelledAt && 
                    `Cancelled on ${formatDate(subscription.cancelledAt)}`}
                  {subscription.status === 'modified' && subscription.modifiedAt &&
                    `Modified on ${formatDate(subscription.modifiedAt)}`}
                  {subscription.status === 'expired' &&
                    `Expired on ${formatDate(subscription.endDate)}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">₹{subscription.totalAmount}</p>
                <p className="text-sm text-gray-500">{subscription.duration} month(s)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-sm">
                  {formatDate(subscription.startDate)} - {formatDate(subscription.endDate)}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-sm">
                  {subscription.timeSlot.start} - {subscription.timeSlot.end}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-sm">Seat #{subscription.seatNumber}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}