import React from 'react';
import { SubscriptionPlan } from '../../types/subscription';
import { calculateDiscountedPrice } from '../../constants/subscriptions';

interface SubscriptionSelectorProps {
  plans: SubscriptionPlan[];
  selectedPlan: string;
  onPlanSelect: (planId: string) => void;
  basePrice: number;
}

export default function SubscriptionSelector({
  plans,
  selectedPlan,
  onPlanSelect,
  basePrice
}: SubscriptionSelectorProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Select Subscription Duration</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {plans.map((plan) => {
          const monthlyPrice = basePrice;
          const totalPrice = monthlyPrice * plan.months;
          const finalPrice = calculateDiscountedPrice(totalPrice, plan.discount);

          return (
            <button
              key={plan.id}
              onClick={() => onPlanSelect(plan.id)}
              className={`
                p-4 rounded-lg text-center transition-colors
                ${selectedPlan === plan.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-900'}
              `}
            >
              <div className="font-medium">{plan.name}</div>
              {plan.discount > 0 && (
                <div className="text-sm text-green-600">
                  {plan.discount}% discount
                </div>
              )}
              <div className="mt-2">
                <span className="text-lg font-bold">₹{finalPrice}</span>
                {plan.discount > 0 && (
                  <span className="text-sm line-through ml-2">₹{totalPrice}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}