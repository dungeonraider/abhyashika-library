import React from 'react';
import PlanCard from './ui/PlanCard';

const plans = [
  {
    name: '4 Hours Slot',
    originalPrice: 649,
    discountedPrice: 499,
    features: [
      'Fixed 4-hour daily slot',
      'All amenities included',
      'Monthly subscription',
      'Flexible timing selection'
    ],
  },
  {
    name: '6 Hours Slot',
    originalPrice: 849,
    discountedPrice: 599,
    features: [
      'Fixed 6-hour daily slot',
      'All amenities included',
      'Monthly subscription',
      'Prime study hours available'
    ],
  },
  {
    name: '8 Hours Slot',
    originalPrice: 999,
    discountedPrice: 699,
    features: [
      'Fixed 8-hour daily slot',
      'All amenities included',
      'Monthly subscription',
      'Extended study sessions'
    ],
  },
  {
    name: '12 Hours Access',
    originalPrice: 1499,
    discountedPrice: 999,
    features: [
      'Flexible full day 12-hour access',
      'All amenities included',
      'Monthly subscription',
      'Premium facilities access'
    ],
    featured: true,
  },
];

export default function Pricing() {
  return (
    <div id="plans" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Subscription Plans
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Special Launch Offer: 30% off on all plans
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}