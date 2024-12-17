import React from 'react';
import { Skeleton } from '../ui/Skeleton';

export function SeatMapSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: 50 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}