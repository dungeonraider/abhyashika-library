import React from 'react';
import { SLOT_TYPES } from '../../constants/seats';

interface PlanSelectorProps {
  selectedPlan: string;
  onPlanChange: (plan: string) => void;
}

export default function PlanSelector({ selectedPlan, onPlanChange }: PlanSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {SLOT_TYPES.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onPlanChange(type.id)}
            className={`
              p-4 rounded-lg text-center transition-colors
              ${selectedPlan === type.id
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 hover:bg-blue-100 text-blue-900'}
            `}
          >
            <div className="font-medium">{type.name}</div>
            <div className="mt-2">
              <span className="text-lg font-bold">₹{type.basePrice}</span>
              <span className="text-sm">/month</span>
            </div>
            <div className="mt-2 text-sm">
              {type.duration} hours per day
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}