import React from 'react';
import { SUBSCRIPTION_PLANS } from '../../constants/subscriptions';

interface SubscriptionDurationProps {
  selectedDuration: string;
  onDurationChange: (duration: string) => void;
  basePrice: number;
}

export default function SubscriptionDuration({ 
  selectedDuration, 
  onDurationChange,
  basePrice 
}: SubscriptionDurationProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Select Subscription Duration</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const totalPrice = basePrice * plan.months;
          const discountedPrice = totalPrice - (totalPrice * plan.discount / 100);
          
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onDurationChange(plan.id)}
              className={`
                p-4 rounded-lg text-center transition-colors
                ${selectedDuration === plan.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-900'}
              `}
            >
              <div className="font-medium">{plan.name}</div>
              {plan.discount > 0 && (
                <div className="text-sm mt-1">
                  <span className={selectedDuration === plan.id ? 'text-blue-200' : 'text-green-600'}>
                    Save {plan.discount}%
                  </span>
                </div>
              )}
              <div className="mt-2">
                <span className="text-lg font-bold">₹{Math.round(discountedPrice)}</span>
                {plan.discount > 0 && (
                  <span className={`text-sm line-through ml-2 ${
                    selectedDuration === plan.id ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    ₹{totalPrice}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}