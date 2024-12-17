import React from 'react';
import { Clock } from 'lucide-react';
import CheckIcon from './CheckIcon';

interface PlanCardProps {
  name: string;
  originalPrice: number;
  discountedPrice: number;
  features: string[];
  featured?: boolean;
}

export default function PlanCard({
  name,
  originalPrice,
  discountedPrice,
  features,
  featured = false,
}: PlanCardProps) {
  return (
    <div
      className={`rounded-lg shadow-lg overflow-hidden ${
        featured ? 'ring-2 ring-blue-600' : ''
      }`}
    >
      <div className="bg-white px-6 py-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-gray-900">{name}</h3>
          <Clock className="h-6 w-6 text-blue-600" />
        </div>
        <div className="mt-4 flex items-baseline">
          <span className="text-2xl font-extrabold text-gray-900">
            ₹{discountedPrice}
          </span>
          <span className="ml-2 text-lg line-through text-gray-500">
            ₹{originalPrice}
          </span>
          <span className="ml-2 text-sm text-gray-500">/month</span>
        </div>
        <ul className="mt-6 space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start">
              <CheckIcon />
              <p className="ml-3 text-base text-gray-700">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-4 bg-gray-50">
        <a
          href="#book"
          className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Pre-book Now
        </a>
      </div>
    </div>
  );
}