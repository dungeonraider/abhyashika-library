import React from 'react';
import { SubscriptionSkeleton } from './SubscriptionSkeleton';

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <SubscriptionSkeleton />
      </div>
    </div>
  );
}