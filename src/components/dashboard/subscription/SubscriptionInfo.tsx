import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { UserSubscription } from '../../../types/subscription';
import { formatDate } from '../../../utils/date';

interface SubscriptionInfoProps {
  subscription: UserSubscription;
}

export default function SubscriptionInfo({ subscription }: SubscriptionInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-gray-600">
        <Calendar className="w-5 h-5" />
        <span>
          Valid from {formatDate(subscription.startDate)} to {formatDate(subscription.endDate)}
        </span>
      </div>
      <div className="flex items-center space-x-2 text-gray-600">
        <Clock className="w-5 h-5" />
        <span>
          {subscription.timeSlot.start} - {subscription.timeSlot.end}
        </span>
      </div>
      <div className="flex items-center space-x-2 text-gray-600">
        <MapPin className="w-5 h-5" />
        <span>Seat #{subscription.seatNumber}</span>
      </div>
    </div>
  );
}